import crypto from "crypto";

function hash(value: any) {
    return crypto.createHash("sha256").update(value).digest("hex");
}

function getFbcFromCookie() {
    const match = document.cookie.match(/_fbc=([^;]+)/);
    return match ? match[1] : null;
}

export async function POST(req: Request) {
    // if(req.method !== 'POST'){
    //     return res.status(405).json({error: "only post requests allowed"});
    // }
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
   
    try {
        const {eventName, userData, userAgent, fbc} = await req.json();
        console.log("token", process.env.FB_PIXEL_ID_BOB);
        const response = await fetch(`https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID_BOB}/events?access_token=${process.env.FB_ACCESS_TOKEN_BOB}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data:[{
                    event_name: eventName,
                    event_time: Math.floor(Date.now()/1000),
                    user_data: {
                        em:userData?.email?[hash(userData.email)] : [],
                        client_ip_address: clientIP,
                        client_user_agent: userAgent,
                        fbc: fbc,
                        
                    },
                    action_source: "website",
                },],
                test_event_code: "TEST40784",
            }),
        });

        const result = await response.json();
        return Response.json(result);
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Server error"});
    }
}