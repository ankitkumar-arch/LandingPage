// import crypto from "crypto";

// function hash(value: any) {
//     return crypto.createHash("sha256").update(value).digest("hex");
// }

// function getFbcFromCookie() {
//     const match = document.cookie.match(/_fbc=([^;]+)/);
//     return match ? match[1] : null;
// }

// export async function POST(req: Request) {
//     // if(req.method !== 'POST'){
//     //     return res.status(405).json({error: "only post requests allowed"});
//     // }
//     const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
   
//     try {
//         const {eventName, userData, userAgent, fbc} = await req.json();
//         console.log("token", process.env.FB_PIXEL_ID_BOB);
//         const response = await fetch(`https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID_BOB}/events?access_token=${process.env.FB_ACCESS_TOKEN_BOB}`,{
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 data:[{
//                     event_name: eventName,
//                     event_time: Math.floor(Date.now()/1000),
//                     user_data: {
//                         em:userData?.email?[hash(userData.email)] : [],
//                         client_ip_address: clientIP,
//                         client_user_agent: userAgent,
//                         fbc: fbc,
                        
//                     },
//                     action_source: "website",
//                 },],
//                 test_event_code: "TEST40784",
//             }),
//         });

//         const result = await response.json();
//         return Response.json(result);
//     } catch (err) {
//         console.error(err);
//         return Response.json({ error: "Server error"});
//     }
// }


import crypto from "crypto";
import clientPromise from "@/lib/mongodb";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;
const ALGORITHM = "aes-256-cbc";

function hash(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function decrypt(encryptedToken: string, iv: string): string {
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

export async function POST(req: Request) {
  try {
    const { eventName, gameName, userData } = await req.json();

    if (!gameName) {
      return Response.json(
        { error: "gameName is required" },
        { status: 400 }
      );
    }

    // Fetch pixel config for this game from MongoDB
    const client = await clientPromise;
    const db = client.db("landing-pages");
    const config = await db.collection("meta_config").findOne({ gameName });

    if (!config) {
      return Response.json(
        { error: `No meta config found for game: ${gameName}` },
        { status: 404 }
      );
    }

    const pixelId = config.pixelId;
    const capiToken = decrypt(config.encryptedToken, config.iv);

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${capiToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: eventName,
              event_time: Math.floor(Date.now() / 1000),
              event_id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              action_source: "website",
              user_data: {
                em: userData?.email ? [hash(userData.email)] : [],
              },
            },
          ],
          test_event_code: process.env.META_TEST_EVENT_CODE, // set in .env, remove in prod
        }),
      }
    );

    const result = await response.json();
    return Response.json(result);
  } catch (err) {
    console.error("META CONVERSION ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}