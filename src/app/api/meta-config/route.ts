import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!; // must be exactly 32 chars
const ALGORITHM = "aes-256-cbc";

function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, "utf8"),
    iv
  );
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    encryptedToken: encrypted.toString("hex"),
  };
}

function decrypt(encryptedToken: string, iv: string) {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, "utf8"),
    Buffer.from(iv, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedToken, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

// POST — save or update meta config for a game
export async function POST(req: Request) {
  try {
    const { gameName, pixelId, capiToken } = await req.json();

    if (!gameName || !pixelId || !capiToken) {
      return NextResponse.json(
        { error: "gameName, pixelId and capiToken are required" },
        { status: 400 }
      );
    }

    const { iv, encryptedToken } = encrypt(capiToken);

    const client = await clientPromise;
    const db = client.db("landing-pages");

    await db.collection("meta_config").updateOne(
      { gameName },
      {
        $set: {
          gameName,
          pixelId,
          encryptedToken,
          iv,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("META CONFIG SAVE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to save meta config", details: String(err) },
      { status: 500 }
    );
  }
}

// GET — fetch config by gameName (used server-side by landing page)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const gameName = searchParams.get("gameName");

    if (!gameName) {
      return NextResponse.json({ error: "Missing gameName" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("landing-pages");

    const config = await db.collection("meta_config").findOne({ gameName });

    if (!config) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const capiToken = decrypt(config.encryptedToken, config.iv);

    return NextResponse.json({
      pixelId: config.pixelId,
      capiToken,
    });
  } catch (err) {
    console.error("META CONFIG FETCH ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch meta config", details: String(err) },
      { status: 500 }
    );
  }
}