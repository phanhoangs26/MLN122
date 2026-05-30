import React from 'react';
import { motion } from 'motion/react';
import { TopBar } from '../components/TopBar';
import { OutlineLayout } from '../components/PageOutline';

const outline = [
  { id: 'hinh-thuc', label: 'Các hình thức' },
  { id: 'ban-chat', label: 'Bản chất & đặc điểm' },
  { id: 'thuc-tien', label: 'Thực tiễn đương đại' },
  { id: 'so-sanh', label: 'So sánh tư sản – vô sản' },
  { id: 'lien-he', label: 'Liên hệ' },
];

const forms = [
  { title: 'Cộng hòa đại nghị', text: 'Quyền lực hành pháp gắn với nghị viện; chính phủ do đảng chiếm đa số trong nghị viện lập ra và chịu trách nhiệm trước nghị viện (Ví dụ: Đức, Italy).' },
  { title: 'Cộng hòa tổng thống', text: 'Tổng thống do dân bầu, vừa là nguyên thủ quốc gia vừa đứng đầu cơ quan hành pháp, độc lập tương đối với nghị viện lập pháp (Ví dụ: Mỹ).' },
  { title: 'Cộng hòa thủ tướng (hỗn hợp)', text: 'Thủ tướng đứng đầu chính phủ nắm thực quyền hành pháp, chia sẻ quyền lực với tổng thống do dân bầu (Ví dụ: Pháp).' },
  { title: 'Quân chủ lập hiến', text: 'Vẫn duy trì ngôi vua/nữ hoàng (mang tính biểu tượng), nhưng quyền lực thực tế thuộc về nghị viện và chính phủ (Ví dụ: Anh, Nhật Bản).' },
  { title: 'Nhà nước liên bang', text: 'Quyền lực phân chia giữa chính quyền trung ương (liên bang) và các bang thành viên; mỗi bang có hiến pháp, pháp luật riêng trong khuôn khổ liên bang (Ví dụ: Mỹ, Đức).' },
];

const traits = [
  {
    title: 'Bản chất: Nền chuyên chính tư sản',
    text: 'Giáo trình khẳng định, dù tồn tại dưới hình thức nào, nhà nước tư sản bản chất vẫn là công cụ thống trị của thiểu số giai cấp tư sản nắm tư liệu sản xuất, dùng để bảo vệ chế độ tư bản chủ nghĩa.',
  },
  {
    title: 'Cai trị thông qua đảng chính trị và lợi ích nhóm',
    text: 'Các tập đoàn tư bản không trực tiếp cai trị mà thông qua các đảng chính trị, tổ chức vận động hành lang (lobby) để chi phối bộ máy nhà nước và ban hành luật pháp bảo vệ lợi ích cốt lõi của họ.',
  },
  {
    title: 'Dân chủ tư sản: Nền dân chủ của số ít',
    text: 'Đề cao tự do cá nhân và dân chủ phổ thông đầu phiếu. Tuy nhiên, theo V.I. Lênin, thực chất đó là "nền dân chủ của số ít những người có quyền, có tiền, có địa vị, thế lực trong xã hội".',
  },
];

const modernPractices = [
  {
    title: 'Bầu cử Mỹ 2024: Kỷ lục chi tiêu của tỷ phú',
    text: 'Trong cuộc bầu cử Mỹ năm 2024, chỉ khoảng 100 gia đình tỷ phú đã chi con số kỷ lục 2,6 tỷ USD (chiếm gần 20% tổng số tiền tài trợ liên bang). Các tỷ phú như Elon Musk không chỉ tài trợ hàng trăm triệu USD mà còn trực tiếp tham gia chiến dịch và đảm nhận vị trí trong chính phủ (DOGE), cho thấy quyền lực chính trị thực tế nằm trong tay thiểu số tư bản tài chính.',
    tag: 'Quyền lực của đồng tiền',
  },
  {
    title: 'Bất bình đẳng kỷ lục và làn sóng phản kháng',
    text: 'Theo báo cáo của Oxfam, tài sản của giới siêu giàu Mỹ tăng vọt, trong khi hàng triệu người đối mặt với lạm phát. Sự bất mãn gia tăng dẫn đến các cuộc biểu tình "No Kings" tại Mỹ hay các làn sóng bãi công đòi quyền lợi lao động. Điều này minh chứng cho nhận định của Lênin: nhà nước tư sản không thể xoa dịu được mâu thuẫn giai cấp ngày càng sâu sắc.',
    tag: 'Mâu thuẫn giai cấp không thể điều hòa',
  },
  {
    title: 'Sự trỗi dậy của chủ nghĩa dân túy',
    text: 'Sự bất lực của giới tinh hoa truyền thống trong giải quyết lạm phát và khủng hoảng kinh tế dẫn đến sự trỗi dậy của các khuynh hướng cực hữu và dân túy. Đây là biểu hiện của khủng hoảng niềm tin sâu sắc vào thiết chế nhà nước tư bản truyền thống.',
    tag: 'Khủng hoảng thiết chế nhà nước',
  },
];

const compareRows = [
  ['Cơ sở kinh tế', 'Dựa trên chế độ tư hữu tư bản chủ nghĩa', 'Dựa trên chế độ công hữu về tư liệu sản xuất chủ yếu'],
  ['Giai cấp nắm quyền', 'Giai cấp tư sản (thiểu số trong xã hội)', 'Nhân dân lao động do giai cấp công nhân lãnh đạo (đại đa số)'],
  ['Bản chất dân chủ', 'Dân chủ tư sản (hình thức, bị tư bản chi phối)', 'Dân chủ vô sản (thực chất, phục vụ số đông Nhân dân)'],
  ['Mục tiêu', 'Bảo vệ quyền sở hữu tư nhân, tối đa hóa lợi nhuận', 'Dân giàu, nước mạnh, dân chủ, công bằng, văn minh'],
];

export default function CapitalistState() {

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

          {/* Thực tiễn đương đại */}
          <motion.section
            id="thuc-tien"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="border-b border-slate-200 py-7"
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">Thực tiễn nhà nước tư bản đương đại</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {modernPractices.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 inline-flex w-fit rounded bg-slate-800 px-2 py-1 text-xs font-bold text-white">
                    {p.tag}
                  </div>
                  <h3 className="text-lg font-black leading-tight text-slate-950">{p.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">{p.text}</p>
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
              <div className="text-sm font-black uppercase tracking-widest text-red-600">Liên hệ Việt Nam</div>
              <div className="mt-4 text-3xl font-black text-slate-950 md:text-4xl">
                Từ nhà nước tư sản đến nhà nước kiểu mới
              </div>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-700">
                Học thuyết Mác - Lênin và thực tiễn hiện nay chứng minh mô hình nhà nước tư sản không thể khắc phục được lũng đoạn từ tư bản tài chính và phân hóa giàu nghèo. Rút ra bài học từ đó, Việt Nam kiên định xây dựng <span className="font-bold text-slate-950">Nhà nước pháp quyền XHCN</span>, nơi quyền lực được kiểm soát chặt chẽ phục vụ đại đa số Nhân dân lao động, kiên quyết chống lại lợi ích nhóm.
              </p>
              <div className="mt-6">
                <a href="/vietnam" className="inline-flex items-center gap-2 rounded bg-red-600 px-6 py-3 font-bold text-white transition-colors hover:bg-red-700">
                  Tìm hiểu về Nhà nước Việt Nam hiện nay
                </a>
              </div>
            </div>
          </motion.section>
        </article>
      </OutlineLayout>
    </div>
  );
}
