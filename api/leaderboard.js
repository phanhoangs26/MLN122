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
      const { name, xp, round } = req.body;
      
      if (!name || typeof xp !== 'number' || typeof round !== 'number') {
        return res.status(400).json({ error: 'Missing name, xp, or round' });
      }

      const headers = { Authorization: `Bearer ${KV_TOKEN}` };
      const userKey = `mln_user_scores:${encodeURIComponent(name)}`;
      
      // 1. Get the current high score for this round
      const getScoreUrl = `${KV_URL}/hget/${userKey}/round_${round}`;
      const getRes = await fetch(getScoreUrl, { headers });
      const getData = await getRes.json();
      const currentScore = Number(getData.result) || 0;

      // 2. If new score is higher, update hash and leaderboard
      if (xp > currentScore) {
        const diff = xp - currentScore;

        // Update the hash with the new high score
        await fetch(`${KV_URL}/hset/${userKey}/round_${round}/${xp}`, { headers });

        // Update the leaderboard sorted set by adding the difference
        const zincrbyUrl = `${KV_URL}/zincrby/mln_leaderboard/${diff}/${encodeURIComponent(name)}`;
        const zincrbyRes = await fetch(zincrbyUrl, { headers });
        const zincrbyData = await zincrbyRes.json();

        return res.status(200).json({ success: true, updated: true, newHighScore: xp, result: zincrbyData.result });
      }

      // If new score is not higher, just return success without updating
      return res.status(200).json({ success: true, updated: false, currentHighScore: currentScore });
      
    } catch (error) {
      console.error('Leaderboard POST error:', error);
      return res.status(500).json({ error: 'Failed to update score' });
    }
  }

  // Handle unsupported methods
  return res.status(405).json({ error: 'Method not allowed' });
}
