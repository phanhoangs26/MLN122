import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { TopBar } from '../components/TopBar';
import { OutlineLayout } from '../components/PageOutline';
import {
  academicCommentary,
  academicConclusion,
  adminReformMeta,
  congressXIVStateFocus,
  history,
  kpiBrief,
  organizingPrinciples,
  pageIntro,
  practiceExamples,
  references,
  theoryBridge,
  type SourceRef,
} from '../data/vietnamContent';

const outline = [
  { id: 'mo-dau', label: 'Mở đầu' },
  { id: 'co-so', label: 'Cơ sở lý luận' },
  { id: 'lich-su', label: 'Dòng lịch sử' },
  { id: 'van-dung-ly-luan', label: 'Vận dụng vào Việt Nam' },
  { id: 'van-dung', label: 'NNPQ XHCN VN' },
  { id: 'dai-hoi', label: 'Đại hội XIV' },
  { id: 'thuc-tien', label: 'Thực tiễn' },
  { id: 'nhan-xet', label: 'Nhận xét' },
  { id: 'lien-he', label: 'Liên hệ Lênin' },
  { id: 'ket-luan', label: 'Kết luận' },
  { id: 'tai-lieu', label: 'Tài liệu tham khảo' },
];

export default function VietnamState() {
  // Gộp tất cả nguồn, loại trùng theo href
  const allRefs: SourceRef[] = [];
  const seen = new Set<string>();
  for (const group of [references.theory, references.congress, references.admin, references.digital]) {
    for (const r of group) {
      if (!seen.has(r.href)) { seen.add(r.href); allRefs.push(r); }
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <TopBar />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3">
            <div className="flex items-center gap-3 text-lg font-serif text-slate-700">
              <span className="font-sans text-xl text-red-600">•</span>
              <span>{pageIntro.subtitle}</span>
            </div>
            <Link to="/theory" className="inline-flex items-center gap-1 text-sm font-bold text-red-600 hover:underline">
              ← Lý luận Chương III
            </Link>
          </div>
        </div>
      </div>

      <OutlineLayout items={outline}>
        <article>
          {/* Mở đầu */}
          <motion.section id="mo-dau" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="border-b-4 border-red-600 bg-white pb-7">
            <div className="text-sm font-black uppercase tracking-widest text-red-600">Cộng hòa xã hội chủ nghĩa Việt Nam · Chương III</div>
            <h1 className="mt-3 max-w-4xl font-serif text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">{pageIntro.purpose}</p>
          </motion.section>

          {/* Cơ sở lý luận */}
          <motion.section id="co-so" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }} className="border-b border-slate-200 py-7">
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600">Cơ sở lý luận</h2>
            <div className="mt-4 max-w-3xl space-y-4">
              {theoryBridge.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-8 text-slate-700">{p}</p>
              ))}
            </div>
          </motion.section>

          {/* Dòng lịch sử nhà nước Việt Nam */}
          <motion.section id="lich-su" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }} className="border-b border-slate-200 py-7">
            <h2 className="mb-6 text-sm font-black uppercase tracking-widest text-red-600">Dòng lịch sử nhà nước Việt Nam</h2>
            <div className="relative border-l-2 border-red-200 pl-6 space-y-6">
              {history.map((h, i) => (
                <div key={h.title} className="relative">
                  <span className="absolute -left-[1.85rem] top-1 flex h-4 w-4 items-center justify-center bg-white">
                    <span className={`h-3 w-3 ${i === history.length - 1 ? 'bg-red-600' : 'border-2 border-red-600 bg-white'}`} />
                  </span>
                  <div className="border border-slate-200 bg-white p-4">
                    <span className="text-xs font-black uppercase tracking-widest text-red-600">{h.year}</span>
                    <div className="mt-0.5 font-black text-slate-950">{h.title}</div>
                    <p className="mt-1 text-sm leading-6 text-slate-700">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Vận dụng vào Việt Nam hiện nay — bảng đối chiếu lý luận */}
          <motion.section id="van-dung-ly-luan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }} className="border-b border-slate-200 py-7">
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600">Vận dụng vào Việt Nam hiện nay</h2>
            <div className="mt-6 overflow-hidden border border-slate-200">
              <div className="grid grid-cols-2 border-b border-slate-200 bg-red-600 text-xs font-black uppercase tracking-widest text-white">
                <div className="px-4 py-3">Nội dung lý luận</div>
                <div className="border-l border-red-500 px-4 py-3">Vận dụng vào Việt Nam hiện nay</div>
              </div>
              {theoryBridge.mappings.map((m, i) => (
                <div key={i} className={`grid grid-cols-2 border-b border-slate-200 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <div className="px-4 py-4 text-sm leading-6 text-slate-900 border-r border-slate-200">
                    {m.theory.includes(':') ? (
                      <>
                        <span className="font-semibold">{m.theory.split(':')[0]}:</span>
                        <span className="font-normal">{m.theory.split(':').slice(1).join(':')}</span>
                      </>
                    ) : (
                      <span className="font-semibold">{m.theory}</span>
                    )}
                  </div>
                  <div className="px-4 py-4 text-sm leading-6 text-slate-700">
                    {m.bullets ? (
                      <ul className="space-y-1.5">
                        {m.bullets.map((b, k) => (
                          <li key={k} className="flex gap-2">
                            <span className="shrink-0 font-black text-red-600">–</span>
                            <span>
                              {b.parts.map((part, j) =>
                                part.href ? (
                                  <a key={j} href={part.href} target="_blank" rel="noopener noreferrer"
                                    className="font-semibold text-red-600 underline hover:text-red-700">{part.text}</a>
                                ) : part.bold ? (
                                  <span key={j} className="font-bold text-slate-900">{part.text}</span>
                                ) : <span key={j}>{part.text}</span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : m.parts ? (
                      m.parts.map((part, j) =>
                        part.href ? (
                          <a key={j} href={part.href} target="_blank" rel="noopener noreferrer"
                            className="font-semibold text-red-600 underline hover:text-red-700">{part.text}</a>
                        ) : <span key={j}>{part.text}</span>
                      )
                    ) : m.applyLink ? (
                      <>{m.apply}
                        <a href={m.applyLink.href} target="_blank" rel="noopener noreferrer"
                          className="font-semibold text-red-600 underline hover:text-red-700">{m.applyLink.text}</a>
                        {m.applySuffix}</>
                    ) : m.apply}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Vận dụng VN */}
          <motion.section id="van-dung" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} className="border-b border-slate-200 py-7">
            <h2 className="text-lg font-black text-slate-950">Nhà nước pháp quyền XHCN Việt Nam</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {organizingPrinciples.map((p) => (
                <div key={p.title} className="border border-slate-200 p-5">
                  <h3 className="font-bold text-slate-950">{p.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{p.text}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Đại hội XIV */}
          <motion.section id="dai-hoi" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }} className="border-b border-slate-200 py-7">
            <h2 className="mb-4 text-lg font-black text-slate-950">Đại hội XIV và hoàn thiện Nhà nước pháp quyền</h2>
            <ul className="space-y-3">
              {congressXIVStateFocus.map((item, i) => (
                <li key={i} className="flex gap-3 rounded border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700">
                  <span className="font-black text-red-600">▸</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm italic leading-7 text-slate-600">{kpiBrief}</p>
          </motion.section>

          {/* Thực tiễn */}
          <motion.section id="thuc-tien" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }} className="border-b border-slate-200 py-7">
            <h2 className="mb-6 text-lg font-black text-slate-950">Dẫn chứng thực tiễn nổi bật</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {practiceExamples.map((ex, i) => (
                <div key={ex.title} className="flex flex-col border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-black text-red-600">{i + 1}</span>
                    <h3 className="text-base font-black text-slate-950">{ex.title}</h3>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-700">{ex.text}</p>
                  <a href={ex.href} target="_blank" rel="noopener noreferrer"
                    className="mt-3 inline-flex w-fit rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-100">
                    {ex.tag} ↗
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">
              {adminReformMeta.resolution}, hiệu lực {adminReformMeta.effectiveDate}.
            </p>
          </motion.section>

          {/* Nhận xét */}
          <motion.section id="nhan-xet" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }} className="border-b border-slate-200 py-7">
            <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-red-600">Nhận xét</h2>
            <p className="max-w-3xl text-base leading-8 text-slate-800">{academicCommentary}</p>
          </motion.section>

          {/* Liên hệ trực tiếp với nhận định của Lênin */}
          <motion.section id="lien-he" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }} className="border-b border-slate-200 py-7">
            <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-red-600">Liên hệ trực tiếp với nhận định của Lênin</h2>
            <div className="border-l-4 border-red-600 bg-red-50 px-5 py-5">
              <p className="text-base leading-8 text-slate-800">
                Theo quan điểm của chủ nghĩa Mác – Lênin, nhà nước là sản phẩm của những mâu thuẫn xã hội và giai cấp trong những điều kiện lịch sử nhất định. Sự tồn tại của Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam cho thấy nhà nước không phải là một tổ chức đứng ngoài xã hội mà là một thiết chế chính trị thực hiện chức năng quản lý, điều tiết các quan hệ xã hội và bảo đảm ổn định xã hội. Những cải cách về tổ chức bộ máy, kiểm soát quyền lực, phát huy dân chủ và chuyển đổi số hiện nay phản ánh quá trình hoàn thiện nhà nước nhằm đáp ứng yêu cầu phát triển của đất nước trong giai đoạn mới.
              </p>
            </div>
          </motion.section>

          {/* Kết luận */}
          <motion.section id="ket-luan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }} className="border-b border-slate-200 py-7">
            <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-red-600">Kết luận</h2>
            <p className="max-w-3xl text-base leading-8 text-slate-800">{academicConclusion}</p>
            <div className="mt-8 text-center">
              <div className="text-sm font-black uppercase tracking-widest text-red-600">Mục tiêu xây dựng đất nước</div>
              <div className="mt-3 text-2xl font-black text-slate-950 md:text-3xl">
                Dân giàu – Nước mạnh – Dân chủ – Công bằng – Văn minh
              </div>
            </div>
          </motion.section>

          {/* Tài liệu tham khảo — tập hợp tất cả nguồn */}
          <motion.section id="tai-lieu" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }} className="border-b-4 border-red-600 py-7">
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600">Tài liệu tham khảo</h2>
            <ol className="mt-4 space-y-3">
              {allRefs.map((r, i) => (
                <li key={r.href} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="shrink-0 font-black text-red-600">{i + 1}.</span>
                  {r.href.startsWith('/') ? (
                    <Link to={r.href} className="text-red-600 hover:underline">{r.label}</Link>
                  ) : (
                    <a href={r.href} target="_blank" rel="noopener noreferrer"
                      className="text-red-600 hover:underline">{r.label}</a>
                  )}
                </li>
              ))}
            </ol>
          </motion.section>
        </article>
      </OutlineLayout>
    </div>
  );
}
