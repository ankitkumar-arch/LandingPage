import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors()); // allow your static frontend

app.get("/appstore", async (req, res) => {
  try {
    const { appId, country = "us" } = req.query;

    if (!appId) {
      return res.status(400).json({ error: "Missing appId" });
    }

    const url = `https://itunes.apple.com/lookup?id=${appId}&country=${country}`;

    const appleRes = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    const data = await appleRes.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch App Store data" });
  }
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});