import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send } from 'lucide-react';
import clsx from 'clsx';
import { TopBar } from '../components/TopBar';
import { answerFromKB, buildContext, suggestedQuestions } from '../data/knowledge';

type Msg = { role: 'user' | 'bot'; text: string; source?: 'offline' | 'ai' };

import ReactMarkdown from 'react-markdown';
import { pipeline } from '@huggingface/transformers';

let generator: any = null;

async function getLocalModel() {
  if (!generator) {
    generator = await pipeline(
      'text-generation',
      'Qwen/Qwen2.5-0.5B-Instruct'
    );
  }
  return generator;
}

// Gọi serverless function — system prompt + giáo trình nằm hoàn toàn ở server
async function askAI(history: Msg[]): Promise<string> {
  const contents = history
    .filter((m) => m.text.trim())
    .map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }));
  while (contents.length && contents[0].role === 'model') contents.shift();

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ contents }),
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

    // Dùng local offline như fallback khi API lỗi
    const kb = answerFromKB(q);

    setLoading(true);
    try {
      const reply = await askAI(next);
      setMessages((m) => [...m, { role: 'bot', text: reply, source: 'ai' }]);
    } catch (err: any) {
      // Chỉ chạy Qwen fallback nặng nề khi thực sự bị giới hạn API (403, 429)
      if (err.status === 403 || err.status === 429) {
        try {
          // Fallback sử dụng Qwen model chạy local trên trình duyệt
          const gen = await getLocalModel();
          const prompt = `Bạn là Trợ lý Triết học Mác - Lênin.\nNgười dùng hỏi: ${q}\nTrả lời:`;
          const result = await gen(prompt, { max_new_tokens: 300 });
          
          let fallbackReply = result[0].generated_text;
          if (fallbackReply.startsWith(prompt)) {
            fallbackReply = fallbackReply.slice(prompt.length).trim();
          }
          
          setMessages((m) => [
            ...m,
            { role: 'bot', text: fallbackReply + '\n\n_(Đã dùng Qwen local fallback do API quá tải/bị chặn)_', source: 'offline' },
          ]);
        } catch (fallbackErr) {
          const fallbackText = kb.score > 0 ? kb.answer : 'Rất tiếc, hiện tại API đang quá tải và không thể kết nối.';
          setMessages((m) => [
            ...m,
            { role: 'bot', text: fallbackText, source: 'offline' },
          ]);
        }
      } else {
        // Các lỗi mạng khác hoặc 500 thì dùng fallback text cơ bản ngay lập tức
        const fallbackText = kb.score > 0 ? kb.answer : 'Rất tiếc, hiện tại mình không thể kết nối tới máy chủ AI.';
        setMessages((m) => [
          ...m,
          { role: 'bot', text: fallbackText, source: 'offline' },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white text-slate-950">
      <TopBar />

      {/* Messages — scrollable */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-5 px-4 py-6">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={clsx('flex gap-3', m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
              >
                {/* Avatar */}
                <div
                  className={clsx(
                    'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-xs font-black',
                    m.role === 'user'
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-red-600 text-white',
                  )}
                >
                  {m.role === 'user' ? 'Bạn' : 'TL'}
                </div>

                {/* Bubble */}
                <div className={clsx('max-w-[78%]', m.role === 'user' ? 'items-end' : 'items-start')}>
                  <div
                    className={clsx(
                      'px-4 py-3 text-sm leading-6',
                      m.role === 'user'
                        ? 'whitespace-pre-wrap bg-slate-100 text-slate-900'
                        : 'border border-red-100 bg-red-50 text-slate-900',
                    )}
                  >
                    {m.role === 'user' ? (
                      m.text
                    ) : (
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => <p className="mb-3 last:mb-0" {...props} />,
                          ul: ({ node, ...props }) => <ul className="mb-3 ml-4 list-disc space-y-1 last:mb-0" {...props} />,
                          ol: ({ node, ...props }) => <ol className="mb-3 ml-4 list-decimal space-y-1 last:mb-0" {...props} />,
                          li: ({ node, ...props }) => <li {...props} />,
                          strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
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

          {/* Loading dots */}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-red-600 text-xs font-black text-white">
                TL
              </div>
              <div className="flex gap-1 px-4 py-3 border border-red-100 bg-red-50">
                {[0, 0.15, 0.3].map((delay, i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-red-400"
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

      {/* Sticky input area */}
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-3 space-y-2">
          {/* Suggested questions — 1 hàng, scroll ngang trên mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {suggestedQuestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={loading}
                className="shrink-0 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border border-slate-200 bg-white focus-within:border-red-400"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về nhà nước, giai cấp, Việt Nam…"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="m-1 flex h-9 w-9 items-center justify-center bg-red-600 text-white transition-colors hover:bg-red-700 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
