import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { OutlineLayout } from '../components/PageOutline';

const outline = [
  { id: 'hinh-thuc', label: 'Các hình thức' },
  { id: 'ban-chat', label: 'Bản chất & đặc điểm' },
  { id: 'so-sanh', label: 'So sánh tư sản – vô sản' },
  { id: 'lien-he', label: 'Liên hệ' },
];

const forms = [
  { title: 'Cộng hòa đại nghị', text: 'Quyền lực hành pháp gắn với nghị viện; chính phủ do đảng chiếm đa số trong nghị viện lập ra và chịu trách nhiệm trước nghị viện.' },
  { title: 'Cộng hòa tổng thống', text: 'Tổng thống do dân bầu, vừa là nguyên thủ quốc gia vừa đứng đầu hành pháp, độc lập tương đối với nghị viện.' },
  { title: 'Cộng hòa thủ tướng', text: 'Thủ tướng đứng đầu chính phủ nắm thực quyền hành pháp; phân chia quyền lực giữa tổng thống, thủ tướng và nội các.' },
  { title: 'Quân chủ lập hiến', text: 'Vẫn duy trì ngôi vua/nữ hoàng nhưng quyền lực thực tế thuộc nghị viện và chính phủ; nhà vua trị vì nhưng không cai trị.' },
  { title: 'Nhà nước liên bang', text: 'Quyền lực phân chia giữa chính quyền liên bang và các bang thành viên; mỗi bang có hiến pháp, luật pháp riêng trong khuôn khổ liên bang.' },
];

const traits = [
  {
    title: 'Bản chất là nền chuyên chính tư sản',
    text: 'Dù tồn tại dưới hình thức nào, về bản chất nhà nước tư sản đều là công cụ thống trị của giai cấp tư sản đối với các giai cấp, tầng lớp khác trong xã hội.',
  },
  {
    title: 'Các tập đoàn tư bản cầm quyền qua đảng chính trị',
    text: 'Các tập đoàn tư bản thông qua tổ chức đảng chính trị để thực hiện quyền lãnh đạo, bảo vệ địa vị thống trị và quyền lợi của giai cấp, tập đoàn mình.',
  },
  {
    title: 'Nền dân chủ có giới hạn',
    text: 'Đề cao quyền tự do, dân chủ cho mọi người, nhưng thực chất là nền dân chủ của số ít những người có quyền, có tiền, có địa vị và thế lực trong xã hội.',
  },
];

const compareRows = [
  ['Giai cấp nắm quyền', 'Giai cấp tư sản', 'Nhân dân lao động do giai cấp công nhân lãnh đạo'],
  ['Quan hệ thống trị', 'Số ít thống trị số đông', 'Số đông thống trị số ít'],
  ['Bản chất dân chủ', 'Dân chủ tư sản — có giới hạn cho số ít', 'Dân chủ vô sản — dân chủ kiểu mới của số đông'],
  ['Mục tiêu', 'Duy trì quan hệ sản xuất tư bản chủ nghĩa', 'Xóa bỏ áp bức, bóc lột; tiến tới xã hội cộng sản'],
];

export default function CapitalistState() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <TopBar />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 md:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 bg-white px-4 py-3 text-lg font-serif text-slate-700">
            <span className="font-sans text-xl text-red-600">•</span>
            <span>Nhà nước tư sản (tư bản chủ nghĩa)</span>
          </div>
          <div className="flex items-center gap-6 bg-white px-4 py-3 text-sm font-bold text-slate-700">
            <span className="text-red-600">•</span>
            <span>Phân tích từ triết học Mác - Lênin</span>
          </div>
        </div>
      </div>

      <OutlineLayout items={outline}>
        <article>
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b-4 border-red-600 bg-white pb-7"
          >
            <div className="text-sm font-black uppercase tracking-widest text-red-600">Một kiểu nhà nước trong lịch sử</div>
            <h1 className="mt-3 max-w-4xl font-serif text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Nhà nước tư sản
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
              Nhà nước tư sản là kiểu nhà nước thứ ba trong lịch sử, ra đời cùng phương thức sản xuất tư bản chủ nghĩa. Nó tồn tại dưới rất nhiều hình thức khác nhau, nhưng theo Lênin, “thực chất chỉ là một”.
            </p>

            <figure className="mt-6 border-l-4 border-red-600 bg-slate-50 px-5 py-4">
              <blockquote className="font-serif text-2xl font-black leading-9 text-red-700 md:text-3xl">
                “Những hình thức của các nhà nước tư sản thì hết sức khác nhau, nhưng thực chất chỉ là một: chung quy lại, tất cả những hình thức nhà nước ấy, vô luận thế nào, cũng tất nhiên phải là nền chuyên chính tư sản.”
              </blockquote>
              <figcaption className="mt-2 text-sm font-bold text-slate-600">- V.I. Lênin, Nhà nước và Cách mạng</figcaption>
            </figure>
          </motion.section>

          {/* Các hình thức */}
          <motion.section
            id="hinh-thuc"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Các hình thức nhà nước tư sản</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {forms.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="border-l-4 border-red-600 bg-slate-50 p-5"
                >
                  <h3 className="text-xl font-black text-slate-950">{f.title}</h3>
                  <p className="mt-2 text-base leading-7 text-slate-700">{f.text}</p>
                </motion.div>
              ))}
            </div>
            <p className="mt-5 max-w-4xl text-base leading-7 text-slate-700">
              Các hình thức này khác nhau về chế độ bầu cử, chế độ một hay hai viện, nhiệm kỳ và quyền lực của tổng thống, thủ tướng, sự phân chia quyền lực giữa tổng thống – thủ tướng – nội các… song về bản chất đều là <span className="font-bold text-slate-950">nền chuyên chính tư sản</span>.
            </p>
          </motion.section>

          {/* Bản chất & đặc điểm */}
          <motion.section
            id="ban-chat"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Bản chất & đặc điểm</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {traits.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="border border-slate-200 bg-slate-50 p-6"
                >
                  <h3 className="text-lg font-black text-slate-950">{t.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">{t.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* So sánh với nhà nước vô sản */}
          <motion.section
            id="so-sanh"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">So sánh nhà nước tư sản và nhà nước vô sản</h2>
            <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left text-base">
                  <thead className="bg-red-600 text-sm uppercase tracking-wide text-white">
                    <tr>
                      <th className="px-5 py-4">Tiêu chí</th>
                      <th className="px-5 py-4">Nhà nước tư sản</th>
                      <th className="px-5 py-4">Nhà nước vô sản</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map(([crit, bourgeois, proletarian]) => (
                      <tr key={crit} className="border-t border-slate-200">
                        <td className="px-5 py-4 font-black text-slate-950">{crit}</td>
                        <td className="px-5 py-4 text-slate-700">{bourgeois}</td>
                        <td className="px-5 py-4 text-slate-700">{proletarian}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            id="lien-he"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-b-4 border-red-600 py-7"
          >
            <div className="text-center">
              <div className="text-sm font-black uppercase tracking-widest text-red-600">Liên hệ</div>
              <div className="mt-4 text-3xl font-black text-slate-950 md:text-4xl">
                Từ nhà nước tư sản đến nhà nước kiểu mới
              </div>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-700">
                Khác với nhà nước tư sản — nhà nước của số ít thống trị số đông, nhà nước vô sản mà Việt Nam xây dựng là nhà nước của số đông nhân dân lao động.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => navigate('/vietnam')}
                  className="inline-flex items-center gap-2 rounded bg-red-600 px-6 py-3 font-black text-white transition-colors hover:bg-red-700"
                >
                  Nhà nước pháp quyền XHCN Việt Nam
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate('/game')}
                  className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-6 py-3 font-black text-slate-800 transition-colors hover:bg-slate-50"
                >
                  Ôn tập qua trò chơi
                </button>
              </div>
            </div>
          </motion.section>
        </article>
      </OutlineLayout>
    </div>
  );
}
