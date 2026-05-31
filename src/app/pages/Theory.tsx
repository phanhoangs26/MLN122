import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import {
  centralThesis,
  evidenceNotes,
  features,
  formsIntro,
  originFlow,
  proletarianState,
  stateForms,
  theoryBlocks,
  stateNature,
  theorySource,
  typeRows,
} from '../data/theoryContent';

const outline = [
  { id: 'luan-diem', label: 'Luận điểm' },
  { id: 'nguon-goc', label: 'Nguồn gốc nhà nước' },
  { id: 'khai-niem', label: 'Khái niệm nhà nước' },
  { id: 'ban-chat', label: 'Bản chất nhà nước' },
  { id: 'chuc-nang', label: 'Chức năng nhà nước' },
  { id: 'dac-trung', label: 'Đặc trưng nhà nước' },
  { id: 'kieu-nha-nuoc', label: 'Kiểu nhà nước' },
  { id: 'hinh-thuc', label: 'Hình thức nhà nước' },
  { id: 'vo-san', label: 'Nhà nước vô sản và sự tiêu vong' },
];

export default function Theory() {
  const [outlineOpen, setOutlineOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <TopBar />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 md:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 bg-white px-4 py-3 text-lg font-serif text-slate-700">
            <span className="font-sans text-xl text-red-600">•</span>
            <span>Hệ thống kiến thức về nhà nước trong triết học Mác - Lênin</span>
          </div>
          <div className="flex items-center gap-6 bg-white px-4 py-3 text-sm font-bold text-slate-700">
            <span className="text-red-600">•</span>
            <span>{theorySource.book}</span>
          </div>
        </div>
      </div>

      <main
        className={`mx-auto grid max-w-6xl gap-7 px-4 py-7 ${
          outlineOpen ? 'lg:grid-cols-[14rem_minmax(0,1fr)]' : 'lg:grid-cols-[4rem_minmax(0,1fr)]'
        }`}
      >
        <aside className="hidden lg:block">
          <div className="sticky top-6 border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              {outlineOpen && <div className="text-sm font-black uppercase tracking-widest text-red-600">Mục lục</div>}
              <button
                type="button"
                onClick={() => setOutlineOpen((open) => !open)}
                aria-label={outlineOpen ? 'Thu gọn mục lục' : 'Mở mục lục'}
                className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
            {outlineOpen && (
              <nav className="divide-y divide-slate-100">
                {outline.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-red-600"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </aside>

        <article>
          <motion.section
            id="luan-diem"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b-4 border-red-600 bg-white pb-7"
          >
            <div className="text-sm font-black uppercase tracking-widest text-red-600">{theorySource.title}</div>
            <h1 className="mt-3 max-w-4xl font-serif text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Lý luận về nhà nước
            </h1>
            <p className="mt-1 text-sm font-bold text-slate-500">{theorySource.book}</p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{centralThesis.explanation}</p>

            <figure className="mt-6 border-l-4 border-red-600 bg-slate-50 px-5 py-4">
              <blockquote className="font-serif text-2xl font-black leading-9 text-red-700 md:text-3xl">
                “{centralThesis.quote}”
              </blockquote>
              <figcaption className="mt-2 text-sm font-bold text-slate-600">- {centralThesis.source}</figcaption>
            </figure>
          </motion.section>

          <section id="nguon-goc" className="mt-8">
            <div className="border-b border-slate-200 pb-3">
              <div className="text-sm font-black uppercase tracking-widest text-red-600">Mạch hình thành</div>
              <h2 className="mt-2 font-serif text-3xl font-black text-slate-950">
                Từ xã hội nguyên thủy đến sự ra đời của nhà nước
              </h2>
            </div>
            <div className="mt-5 divide-y divide-slate-200 border border-slate-200">
              {originFlow.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="grid gap-4 bg-white p-4 md:grid-cols-[4rem_1fr]"
                >
                  <div className="font-serif text-3xl font-black text-red-600">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <h3 className="text-xl font-black text-slate-950">{step.title}</h3>
                    <p className="mt-1 text-base leading-7 text-slate-700">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* KHÁI NIỆM NHÀ NƯỚC */}
          <section id="khai-niem" className="mt-8 border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            {(() => {
              const block = theoryBlocks.find(b => b.id === 'definition');
              if (!block) return null;
              return (
                <div>
                  <div className="border-b border-slate-200 pb-3 mb-6">
                    <div className="text-sm font-black uppercase tracking-widest text-red-600">Khái niệm</div>
                    <h2 className="mt-2 font-serif text-3xl font-black text-slate-950">Khái niệm nhà nước</h2>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-50 border border-slate-200 p-5 lg:p-8"
                  >
                    <h3 className="font-serif text-2xl font-black leading-tight text-slate-950">{block.title}</h3>
                    <p className="mt-4 text-base leading-7 text-slate-700">{block.body}</p>
                    <ul className="mt-4 space-y-2">
                      {block.points.map((point) => (
                        <li key={point} className="flex gap-2 text-base leading-7 text-slate-700">
                          <span className="shrink-0 text-red-600">-</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })()}
          </section>

          {/* BẢN CHẤT NHÀ NƯỚC */}
          <section id="ban-chat" className="mt-8 border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="border-b border-slate-200 pb-3 mb-6">
              <div className="text-sm font-black uppercase tracking-widest text-red-600">Bản chất</div>
              <h2 className="mt-2 font-serif text-3xl font-black text-slate-950">
                Bản chất nhà nước: Tính giai cấp và tính xã hội
              </h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {stateNature.map((n, i) => (
                <motion.div
                  key={n.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="border-l-4 border-red-600 bg-red-50 p-6"
                >
                  <h3 className="text-xl font-black text-slate-950">{n.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">{n.text}</p>
                  <figure className="mt-4 border-l-2 border-red-300 pl-4">
                    <blockquote className="text-sm italic leading-6 text-red-700">
                      &ldquo;{n.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-1 text-xs font-bold text-slate-500">— {n.source}</figcaption>
                  </figure>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CHỨC NĂNG NHÀ NƯỚC */}
          <section id="chuc-nang" className="mt-8 border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            {(() => {
              const block = theoryBlocks.find(b => b.id === 'functions');
              if (!block) return null;
              return (
                <div>
                  <div className="border-b border-slate-200 pb-3 mb-6">
                    <div className="text-sm font-black uppercase tracking-widest text-red-600">Chức năng</div>
                    <h2 className="mt-2 font-serif text-3xl font-black text-slate-950">Chức năng nhà nước</h2>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-50 border border-slate-200 p-5 lg:p-8"
                  >
                    <h3 className="font-serif text-2xl font-black leading-tight text-slate-950">{block.title}</h3>
                    <p className="mt-4 text-base leading-7 text-slate-700">{block.body}</p>
                    <ul className="mt-4 space-y-2">
                      {block.points.map((point) => (
                        <li key={point} className="flex gap-2 text-base leading-7 text-slate-700">
                          <span className="shrink-0 text-red-600">-</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })()}
          </section>

          <section id="dac-trung" className="mt-8 border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="border-b border-slate-200 pb-3">
              <div className="text-sm font-black uppercase tracking-widest text-red-600">Đặc trưng</div>
              <h2 className="mt-2 font-serif text-3xl font-black text-slate-950">
                Đặc trưng nhà nước
              </h2>
              <p className="mt-2 max-w-4xl text-base leading-7 text-slate-700">
                V.I. Lênin nhắc lại quan điểm của Ph. Ăngghen: nhà nước có ba đặc trưng cơ bản phân biệt với các tổ chức xã hội thông thường.
              </p>
            </div>

            <div className="mt-5 divide-y divide-slate-200 border border-slate-200">
              {features.map((feature, index) => (
                <div key={feature.title} className="grid gap-4 bg-white p-5 md:grid-cols-[3rem_1fr]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-red-600 font-serif text-xl font-black text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-slate-950">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-700">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="kieu-nha-nuoc" className="mt-8">
            <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-black uppercase tracking-widest text-red-600">Các kiểu nhà nước</div>
                <h2 className="mt-2 font-serif text-3xl font-black text-slate-950">So sánh theo giai cấp nắm quyền</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left text-base">
                  <thead className="bg-red-600 text-sm uppercase tracking-wide text-white">
                    <tr>
                      <th className="px-5 py-4">Kiểu</th>
                      <th className="px-5 py-4">Giai cấp đại diện</th>
                      <th className="px-5 py-4">Ý nghĩa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {typeRows.map(([type, actor, meaning]) => (
                      <tr key={type} className="border-t border-slate-200">
                        <td className="px-5 py-4 font-black text-slate-950">{type}</td>
                        <td className="px-5 py-4 text-slate-700">{actor}</td>
                        <td className="px-5 py-4 text-slate-700">{meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="hinh-thuc" className="mt-8 border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="border-b border-slate-200 pb-3">
              <div className="text-sm font-black uppercase tracking-widest text-red-600">Hình thức nhà nước</div>
              <h2 className="mt-2 font-serif text-3xl font-black text-slate-950">Kiểu khác hình thức như thế nào?</h2>
              <p className="mt-2 max-w-4xl text-base leading-7 text-slate-700">{formsIntro}</p>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {stateForms.map((item) => (
                <div key={item.type} className="border border-slate-200 bg-white">
                  {/* Header */}
                  <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                    <div className="text-xs font-black uppercase tracking-widest text-red-600">{item.eyebrow}</div>
                    <h3 className="mt-1 text-xl font-black text-slate-950">{item.type}</h3>
                  </div>
                  {/* Sub-items */}
                  <div className="divide-y divide-slate-100">
                    {item.items.map((sub) => (
                      <div key={sub.name} className="px-5 py-4">
                        <div className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 shrink-0 bg-red-600" />
                          <div>
                            <div className="font-black text-slate-950">{sub.name}</div>
                            <p className="mt-1 text-sm leading-6 text-slate-700">{sub.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Summary */}
                  <div className="border-t border-slate-200 bg-red-50 px-5 py-3">
                    <p className="text-sm leading-6 text-slate-700 italic">{item.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="vo-san" className="mt-8 border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="border-b border-slate-200 pb-3">
              <div className="text-sm font-black uppercase tracking-widest text-red-600">{proletarianState.eyebrow}</div>
              <h2 className="mt-2 font-serif text-3xl font-black text-slate-950">{proletarianState.title}</h2>
              <p className="mt-2 max-w-4xl text-base leading-7 text-slate-700">{proletarianState.intro}</p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {proletarianState.functions.map((fn, index) => (
                <div key={fn.title} className="border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-2xl font-black text-red-600">{index + 1}</span>
                    <h3 className="text-lg font-black leading-tight text-slate-950">{fn.title}</h3>
                  </div>
                  <p className="mt-2 text-base leading-7 text-slate-700">{fn.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-l-4 border-red-600 bg-red-50 p-5">
              <div className="text-sm font-black uppercase tracking-widest text-red-700">Nhà nước tiêu vong</div>
              <p className="mt-2 text-base leading-7 text-slate-700">{proletarianState.withering}</p>
            </div>
          </section>

          <section className="mt-8 border border-slate-200 bg-slate-50 p-5 shadow-sm md:p-6">
            <div className="text-sm font-black uppercase tracking-widest text-red-600">Ghi chú nguồn</div>
            <h3 className="mt-2 font-serif text-2xl font-black text-slate-950">{theorySource.label}</h3>
            <p className="mt-2 max-w-4xl text-base leading-7 text-slate-700">
              Nội dung được hệ thống hóa từ{' '}
              <a
                href="https://www.thuviendientutriethocc500.edu.vn/wp-content/uploads/2025/09/1.Gtrinh-Triet-hoc-Mac-Lenin-ko-chuyen-2021.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-red-600 underline hover:text-red-700"
              >
                {theorySource.book}
              </a>
              , phần Chương III: Nhà nước và cách mạng xã hội.
            </p>
            <div className="mt-4 grid gap-2 md:grid-cols-3">
              {evidenceNotes.map((note) => (
                <div key={note} className="flex gap-2 border-l-4 border-red-600 bg-white p-4 text-base leading-7 text-slate-700">
                  <span className="shrink-0 text-red-600">-</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
