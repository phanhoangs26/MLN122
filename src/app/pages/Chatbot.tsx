import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Send, Settings, User, Sparkles, X, KeyRound } from 'lucide-react';
import clsx from 'clsx';
import { TopBar } from '../components/TopBar';
import { StateBackground } from '../components/StateBackground';
import { answerFromKB, buildContext, suggestedQuestions } from '../data/knowledge';

type Msg = { role: 'user' | 'bot'; text: string; offline?: boolean };

const KEY_LS = 'mln_api_key';
const MODEL_LS = 'mln_model';
const DEFAULT_MODEL = 'claude-3-5-haiku-latest';

const SYSTEM_PROMPT = `Bạn là trợ lý học tập tên "Trợ lý Nhà nước", chỉ trả lời quanh chủ đề lý thuyết về NHÀ NƯỚC theo triết học Mác – Lênin (Chương III: Nhà nước và Cách mạng xã hội), bám sát luận điểm của Lênin: "Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được". Trả lời ngắn gọn, chính xác, bằng tiếng Việt, có thể dùng gạch đầu dòng. Nếu câu hỏi nằm ngoài chủ đề nhà nước, hãy lịch sự từ chối và gợi ý hỏi đúng chủ đề. Dưới đây là kiến thức nền để bạn dựa vào:\n\n${buildContext()}`;

async function askLLM(apiKey: string, model: string, history: Msg[]): Promise<string> {
  const messages = history
    .filter((m) => m.text.trim())
    .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }));

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: model || DEFAULT_MODEL,
      max_tokens: 700,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${detail.slice(0, 200)}`);
  }
  const data = await res.json();
  const text = data?.content?.[0]?.text;
  if (!text) throw new Error('Phản hồi rỗng từ API.');
  return text;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'bot',
      text: 'Xin chào! Mình là trợ lý về chủ đề Nhà nước (triết học Mác – Lênin). Hãy hỏi mình về nguồn gốc, bản chất, đặc trưng, các kiểu nhà nước, hay Nhà nước pháp quyền XHCN Việt Nam nhé.',
      offline: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState(DEFAULT_MODEL);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setApiKey(localStorage.getItem(KEY_LS) || '');
    setModel(localStorage.getItem(MODEL_LS) || DEFAULT_MODEL);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const saveSettings = () => {
    localStorage.setItem(KEY_LS, apiKey.trim());
    localStorage.setItem(MODEL_LS, model.trim() || DEFAULT_MODEL);
    setShowSettings(false);
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const userMsg: Msg = { role: 'user', text: q };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');

    const key = (localStorage.getItem(KEY_LS) || '').trim();

    if (!key) {
      // Chế độ offline
      const { answer } = answerFromKB(q);
      setMessages((m) => [...m, { role: 'bot', text: answer, offline: true }]);
      return;
    }

    // Chế độ API
    setLoading(true);
    try {
      const reply = await askLLM(key, model, next);
      setMessages((m) => [...m, { role: 'bot', text: reply }]);
    } catch (err: any) {
      const { answer } = answerFromKB(q);
      setMessages((m) => [
        ...m,
        { role: 'bot', text: `⚠️ Không gọi được API (${err.message}). Mình trả lời bằng kho kiến thức nội bộ:\n\n${answer}`, offline: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const usingApi = !!apiKey.trim();

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-red-950/50 to-slate-900 text-white">
      <StateBackground />
      <TopBar />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6 min-h-0">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-3 rounded-3xl border border-amber-300/20 bg-slate-950/70 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/30 bg-gradient-to-br from-red-600/30 to-amber-400/20 text-amber-200">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-black leading-tight">Trợ lý Nhà nước</div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className={clsx('h-2 w-2 rounded-full', usingApi ? 'bg-emerald-400' : 'bg-amber-400')} />
                {usingApi ? `Chế độ AI (${model})` : 'Chế độ offline · kho kiến thức nội bộ'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowSettings((s) => !s)}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Cấu hình AI</span>
          </button>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-3xl border border-amber-300/20 bg-slate-950/80 p-5 backdrop-blur"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-amber-200">
                <KeyRound className="h-4 w-4" />
                Bật chế độ AI (tuỳ chọn)
              </div>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mb-3 text-xs leading-5 text-slate-400">
              Để trống thì chatbox chạy offline bằng kho kiến thức nội bộ. Nhập Anthropic API key để trả lời linh hoạt hơn.
              Lưu ý: key lưu trong trình duyệt của bạn và có thể bị lộ trên web tĩnh — chỉ dùng để demo/học tập.
            </p>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-..."
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/40"
              />
              <input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder={DEFAULT_MODEL}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/40 sm:w-56"
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={saveSettings} className="rounded-2xl bg-amber-400 px-5 py-2.5 text-sm font-black text-slate-950 hover:scale-[1.02]">
                Lưu
              </button>
              <button
                onClick={() => { setApiKey(''); localStorage.removeItem(KEY_LS); }}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                Xoá key (về offline)
              </button>
            </div>
          </motion.div>
        )}

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/40 p-4 backdrop-blur min-h-0">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx('flex gap-3', m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
            >
              <div
                className={clsx(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border',
                  m.role === 'user' ? 'border-white/10 bg-white/10 text-white' : 'border-amber-300/30 bg-amber-400/10 text-amber-200',
                )}
              >
                {m.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div
                className={clsx(
                  'max-w-[80%] whitespace-pre-wrap rounded-2xl border px-4 py-3 text-sm leading-6',
                  m.role === 'user'
                    ? 'border-white/10 bg-white/10 text-white'
                    : 'border-amber-300/15 bg-slate-900/70 text-slate-100',
                )}
              >
                {m.text}
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Bot className="h-5 w-5 text-amber-200" />
              <span className="inline-flex gap-1">
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}>●</motion.span>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>●</motion.span>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>●</motion.span>
              </span>
            </div>
          )}
        </div>

        {/* Suggested questions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestedQuestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-50"
            >
              <Sparkles className="h-3 w-3 text-amber-300" />
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="mt-3 flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-950/70 p-2 backdrop-blur"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi về nhà nước, giai cấp, đặc trưng, Nhà nước Việt Nam…"
            className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 px-5 py-2.5 font-black text-slate-950 transition-transform hover:scale-[1.02] disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
