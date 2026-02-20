import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.slug) {
      return NextResponse.json(
        { error: "Missing slug" },
        { status: 400 }
      );
    }

    const dir = path.join(process.cwd(), "data/games");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, `${body.slug}.json`);

    fs.writeFileSync(
      filePath,
      JSON.stringify(body, null, 2),
      "utf-8"
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save game" },
      { status: 500 }
    );
  }
}
