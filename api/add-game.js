let games = [];

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const body = req.body;

    if (!body || body.key !== "a89xkJa") {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const exists = games.find(g => g.placeId == body.placeId);

    if (!exists) {
        games.push({
            name: body.name,
            placeId: body.placeId
        });
    }

    res.status(200).json({ success: true });
}
