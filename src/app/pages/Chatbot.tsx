import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send } from 'lucide-react';
import clsx from 'clsx';
import { TopBar } from '../components/TopBar';
import { answerFromKB, buildContext, suggestedQuestions } from '../data/knowledge';

type Msg = { role: 'user' | 'bot'; text: string; source?: 'offline' | 'ai' };

import ReactMarkdown from 'react-markdown';

async function askAI(history: Msg[], kbContext: string = '', mode: 'qa' | 'debate' = 'qa') {
  const payload = history
    .filter((m) => m.text.trim())
    .map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

  while (payload.length && payload[0].role === 'model') payload.shift();

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ contents: payload, kbContext, mode }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const error = new Error(data?.error || `HTTP ${res.status}`);
    (error as any).status = res.status;
    throw error;
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
  const [mode, setMode] = useState<'qa' | 'debate'>('qa');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const userMsg: Msg = { role: 'user', text: q };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');

    const kb = answerFromKB(q, messages);
    const kbContext = kb.score > 0 ? kb.answer : '';

    setLoading(true);
    try {
      const reply = await askAI(next, kbContext, mode);
      setMessages((m) => [...m, { role: 'bot', text: reply, source: 'ai' }]);
    } catch (err: any) {
      const fallbackText = kb.score > 0 
        ? kb.answer 
        : 'Rất tiếc, hiện tại mình không thể kết nối tới máy chủ AI và câu hỏi này cũng chưa có trong kho dữ liệu offline.';
      
      setMessages((m) => [
        ...m,
        { role: 'bot', text: fallbackText, source: 'offline' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="theory-page flex h-screen flex-col">
      <TopBar />

      <div className="flex justify-center border-b-2 border-[#2a201c] bg-[#ece0c8] py-3">
        <div className="flex bg-[#171210] p-1 shadow-[4px_4px_0_#c8281e]">
          <button
            onClick={() => setMode('qa')}
            className={clsx(
              'px-6 py-2 text-sm font-bold uppercase tracking-widest font-["Oswald"] transition-colors',
              mode === 'qa' ? 'bg-[#c8281e] text-white' : 'text-[#f3ead7] hover:bg-[rgba(255,255,255,0.1)]'
            )}
          >
            Chế độ Ôn thi
          </button>
          <button
            onClick={() => setMode('debate')}
            className={clsx(
              'px-6 py-2 text-sm font-bold uppercase tracking-widest font-["Oswald"] transition-colors',
              mode === 'debate' ? 'bg-[#c8281e] text-white' : 'text-[#f3ead7] hover:bg-[rgba(255,255,255,0.1)]'
            )}
          >
            Chế độ Phản biện
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto bg-[#f3ead7]">
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={clsx('flex gap-4', m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
              >
                <div
                  className={clsx(
                    'mt-1 flex h-10 w-10 shrink-0 items-center justify-center text-sm font-black border-2 border-[#171210]',
                    m.role === 'user'
                      ? 'bg-[#ece0c8] text-[#171210]'
                      : 'bg-[#c8281e] text-white',
                  )}
                >
                  {m.role === 'user' ? 'USER' : 'BOT'}
                </div>

                <div className={clsx('max-w-[80%]', m.role === 'user' ? 'items-end' : 'items-start')}>
                  <div
                    className={clsx(
                      'px-5 py-4 text-base leading-7 border-2 border-[#171210]',
                      m.role === 'user'
                        ? 'bg-white shadow-[4px_4px_0_#171210]'
                        : 'bg-[#ece0c8] shadow-[4px_4px_0_#c8281e]',
                    )}
                  >
                    {m.role === 'user' ? (
                      <div className="whitespace-pre-wrap">{m.text}</div>
                    ) : (
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
                          ul: ({ node, ...props }) => <ul className="mb-4 ml-6 list-disc space-y-2 last:mb-0" {...props} />,
                          ol: ({ node, ...props }) => <ol className="mb-4 ml-6 list-decimal space-y-2 last:mb-0" {...props} />,
                          li: ({ node, ...props }) => <li {...props} />,
                          strong: ({ node, ...props }) => <strong className="font-bold text-[#8f1410]" {...props} />,
                          em: ({ node, ...props }) => <em className="italic" {...props} />,
                        }}
                      >
                        {m.text}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#171210] bg-[#c8281e] text-sm font-black text-white">
                BOT
              </div>
              <div className="flex gap-2 px-5 py-4 border-2 border-[#171210] bg-[#ece0c8] shadow-[4px_4px_0_#c8281e]">
                {[0, 0.15, 0.3].map((delay, i) => (
                  <motion.span
                    key={i}
                    className="h-2 w-2 rounded-full bg-[#c8281e]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      <div className="border-t-4 border-[#2a201c] bg-[#ece0c8]">
        <div className="mx-auto max-w-3xl px-4 py-4 space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {suggestedQuestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={loading}
                className="shrink-0 border-2 border-[#2a201c] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#171210] transition-colors hover:bg-[#171210] hover:text-white disabled:opacity-40 font-['Oswald'] shadow-[2px_2px_0_#c8281e]"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-2 border-[#2a201c] bg-white shadow-[4px_4px_0_#171210] focus-within:shadow-[4px_4px_0_#c8281e] transition-shadow"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về nhà nước, giai cấp, Việt Nam…"
              className="flex-1 bg-transparent px-5 py-4 text-base outline-none placeholder:text-[#6b5d4f]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="m-1.5 flex h-12 w-12 items-center justify-center bg-[#c8281e] text-white transition-colors hover:bg-[#8f1410] disabled:opacity-40"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
