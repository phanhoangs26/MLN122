fetch('https://mln-navy.vercel.app/api/leaderboard', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'TestUser', xp: 150 })
}).then(r => r.text()).then(console.log).catch(console.error);
