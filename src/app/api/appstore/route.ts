import { NextResponse } from "next/server";
import fetch from "node-fetch";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const appId = searchParams.get("appId");

    if (!appId) {
      return NextResponse.json(
        { error: "Missing appId" },
        { status: 400 }
      );
    }

    const url = `https://itunes.apple.com/lookup?id=${appId}&country=us`;

    const appleRes = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    const text = await appleRes.text();

    // Apple sometimes sends invalid JSON on error
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Apple raw response:", text);
      return NextResponse.json(
        { error: "Invalid Apple response" },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("App Store API error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
