import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Send } from 'lucide-react';
import clsx from 'clsx';
import { TopBar } from '../components/TopBar';
import { answerFromKB, buildContext, suggestedQuestions } from '../data/knowledge';

type Msg = { role: 'user' | 'bot'; text: string; source?: 'offline' | 'ai' };

const SYSTEM_PROMPT = `Bạn là trợ lý học tập tên "Trợ lý Nhà nước", chỉ trả lời quanh chủ đề lý thuyết về NHÀ NƯỚC theo triết học Mác – Lênin (Chương III: Nhà nước và Cách mạng xã hội), bám sát luận điểm của Lênin: "Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được". Trả lời ngắn gọn, chính xác, bằng tiếng Việt, có thể dùng gạch đầu dòng. Nếu câu hỏi nằm ngoài chủ đề nhà nước, hãy lịch sự từ chối và gợi ý hỏi đúng chủ đề. Dưới đây là kiến thức nền để bạn dựa vào:\n\n${buildContext()}`;

// Gọi serverless function (/api/chat) — function giữ GEMINI_API_KEY ở phía server.
async function askAI(history: Msg[]): Promise<string> {
  const contents = history
    .filter((m) => m.text.trim())
    .map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }));
  while (contents.length && contents[0].role === 'model') contents.shift();

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ system: SYSTEM_PROMPT, contents }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || `HTTP ${res.status}`);
  }
  const data = await res.json();
  if (!data?.text) throw new Error('Phản hồi rỗng');
  return data.text;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'bot',
      text: 'Xin chào! Mình là trợ lý về chủ đề Nhà nước (triết học Mác – Lênin). Hãy hỏi mình về nguồn gốc, bản chất, đặc trưng, các kiểu nhà nước, hay Nhà nước pháp quyền XHCN Việt Nam nhé.',
      source: 'offline',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const userMsg: Msg = { role: 'user', text: q };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');

    // 1) Ưu tiên trả lời từ kho kiến thức nội bộ (nhanh, miễn phí).
    const kb = answerFromKB(q);
    if (kb.score > 0) {
      setMessages((m) => [...m, { role: 'bot', text: kb.answer, source: 'offline' }]);
      return;
    }

    // 2) Kho không có câu khớp → nhờ Gemini (qua serverless function).
    setLoading(true);
    try {
      const reply = await askAI(next);
      setMessages((m) => [...m, { role: 'bot', text: reply, source: 'ai' }]);
    } catch (err: any) {
      setMessages((m) => [
        ...m,
        { role: 'bot', text: `${kb.answer}\n\n(Chưa gọi được AI: ${err.message})`, source: 'offline' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <TopBar />

      {/* Intro band */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <div className="text-sm font-black uppercase tracking-widest text-red-600">Hỏi đáp</div>
          <h1 className="mt-2 font-serif text-3xl font-black leading-tight text-slate-950 md:text-4xl">
            Trợ lý Nhà nước
          </h1>
          <p className="mt-2 text-base leading-7 text-slate-700">
            Hỏi câu hỏi về lý thuyết nhà nước, giai cấp, các kiểu nhà nước và Nhà nước pháp quyền XHCN Việt Nam.
          </p>
        </div>
      </div>

      {/* Messages */}
      <main className="flex-1">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx('flex gap-3', m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
            >
              <div
                className={clsx(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded border text-xs font-black',
                  m.role === 'user' ? 'border-slate-300 bg-slate-100 text-slate-700' : 'border-red-200 bg-red-50 text-red-700',
                )}
              >
                {m.role === 'user' ? 'Bạn' : 'TL'}
              </div>
              <div className="max-w-[80%]">
                <div
                  className={clsx(
                    'whitespace-pre-wrap rounded-lg border px-4 py-3 text-sm leading-6 shadow-sm',
                    m.role === 'user'
                      ? 'border-slate-200 bg-slate-50 text-slate-900'
                      : 'border-red-200 bg-red-50 text-slate-900',
                  )}
                >
                  {m.text}
                </div>
                {m.role === 'bot' && m.source === 'ai' && (
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-red-500">Trả lời bằng AI</div>
                )}
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Bot className="h-5 w-5 text-red-600" />
              <span className="inline-flex gap-1">
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}>•</motion.span>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>•</motion.span>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>•</motion.span>
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Sticky input area */}
      <div className="sticky bottom-0 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-3xl space-y-3 px-4 py-4">
          {/* Suggested questions */}
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={loading}
                className="rounded border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm focus-within:border-red-300"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về nhà nước, giai cấp, Việt Nam…"
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex items-center gap-2 rounded bg-red-600 px-4 py-2 font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
