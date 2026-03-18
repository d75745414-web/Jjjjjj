let games = []

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' })

  const { key, name, placeId } = req.body

  if (key !== 'a89xkJa') return res.status(401).json({ error: 'Invalid key' })

  if (!name || !placeId) return res.status(400).json({ error: 'Missing name or placeId' })

  const exists = games.find(g => g.placeId === placeId)
  if (!exists) {
    games.push({ name, placeId })
  }

  return res.status(200).json({ success: true, game: { name, placeId }, totalGames: games.length })
}
