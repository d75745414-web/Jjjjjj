import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    const ids = await kv.smembers("games:list");

    const games = [];

    for (const id of ids) {
        const game = await kv.get("game:" + id);
        if (game) {
            games.push(game);
        }
    }

    res.status(200).json(games);
}
