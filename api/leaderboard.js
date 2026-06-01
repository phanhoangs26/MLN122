export default async function handler(req, res) {
  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  if (!KV_URL || !KV_TOKEN) {
    return res.status(500).json({ error: 'Database credentials missing' });
  }

  // Handle GET request to fetch leaderboard
  if (req.method === 'GET') {
    try {
      // Fetch top 50 users from the sorted set, descending order, with scores
      const fetchUrl = `${KV_URL}/zrevrange/mln_leaderboard/0/49/WITHSCORES`;
      const response = await fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Upstash returned ${response.status}`);
      }

      const data = await response.json();
      
      // Upstash returns data in the format: ["Alice", 150, "Bob", 120, "Charlie", 90]
      // We want to map it to an array of objects: [{ name: "Alice", xp: 150 }, ...]
      const rawList = data.result || [];
      const leaderboard = [];
      
      for (let i = 0; i < rawList.length; i += 2) {
        leaderboard.push({
          name: rawList[i],
          xp: Number(rawList[i + 1])
        });
      }

      return res.status(200).json({ leaderboard });
    } catch (error) {
      console.error('Leaderboard GET error:', error);
      return res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  }

  // Handle POST request to update score
  if (req.method === 'POST') {
    try {
      const { name, xp } = req.body;
      
      if (!name || typeof xp !== 'number') {
        return res.status(400).json({ error: 'Missing name or xp' });
      }

      // We use ZINCRBY to update the score incrementally. If the name exists, its score is increased by xp.
      // This allows the user to accumulate points across rounds and across login sessions.
      const fetchUrl = `${KV_URL}/zincrby/mln_leaderboard/${xp}/${encodeURIComponent(name)}`;
      const response = await fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Upstash returned ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json({ success: true, result: data.result });
      
    } catch (error) {
      console.error('Leaderboard POST error:', error);
      return res.status(500).json({ error: 'Failed to update score' });
    }
  }

  // Handle unsupported methods
  return res.status(405).json({ error: 'Method not allowed' });
}
