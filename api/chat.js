// Vercel Serverless Function: relay tới Google Gemini, giữ API key ở phía server.
// Đọc GEMINI_API_KEY từ Environment Variables của Vercel (không lộ ra client).

const DEFAULT_MODEL = 'gemini-3.1-flash-lite';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server thiếu GEMINI_API_KEY' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { contents, system, model } = body;

    if (!Array.isArray(contents) || contents.length === 0) {
      res.status(400).json({ error: 'Thiếu contents' });
      return;
    }

    const m = model || DEFAULT_MODEL;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(m)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: system ? { parts: [{ text: system }] } : undefined,
        contents,
        generationConfig: { maxOutputTokens: 700, temperature: 0.4 },
      }),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: data?.error?.message || 'Lỗi gọi Gemini' });
      return;
    }

    const text = (data?.candidates?.[0]?.content?.parts || []).map((p) => p?.text || '').join('');
    if (!text.trim()) {
      res.status(502).json({ error: 'Phản hồi rỗng từ Gemini' });
      return;
    }

    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({ error: err?.message || 'Lỗi không xác định' });
  }
}
