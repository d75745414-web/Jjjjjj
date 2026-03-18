import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const body = req.body;

    if (!body || body.key !== "a89xkJa") {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const placeId = String(body.placeId);
    const name = String(body.name || "Unknown");

    if (!placeId) {
        return res.status(400).json({ error: "Missing placeId" });
    }

    const exists = await kv.get("game:" + placeId);

    if (!exists) {
        await kv.set("game:" + placeId, {
            name: name,
            placeId: placeId
        });

        await kv.sadd("games:list", placeId);
    }

    await kv.set("game:" + placeId + ":lastSeen", Date.now());

    res.status(200).json({ success: true });
          }
