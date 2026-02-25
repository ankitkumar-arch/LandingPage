// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     if (!body.slug) {
//       return NextResponse.json(
//         { error: "Missing slug" },
//         { status: 400 }
//       );
//     }

//     const dir = path.join(process.cwd(), "data/games");

//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     const filePath = path.join(dir, `${body.slug}.json`);

//     fs.writeFileSync(
//       filePath,
//       JSON.stringify(body, null, 2),
//       "utf-8"
//     );

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to save game" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("landing-pages");

    await db
      .collection("games")
      .updateOne({ slug: body.slug }, { $set: body }, { upsert: true });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SAVE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to save game", details: String(err) },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("landing-pages");

    const game = await db.collection("games").findOne({ slug });

    if (!game) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch game", details: String(err) },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("landing-pages");

    const result = await db.collection("games").updateOne(
      { slug: body.slug },
      { $set: body },
      // no upsert here — we only want to update existing pages
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update game", details: String(err) },
      { status: 500 },
    );
  }
}
