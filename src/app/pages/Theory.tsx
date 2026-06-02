import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TopBar } from '../components/TopBar';
import { ContradictionResolver } from '../components/games/ContradictionResolver';
import { StateSimulation } from '../components/StateSimulation';
import { ClassContradictionIntro } from '../components/ClassContradictionIntro';

import clsx from 'clsx';

const stages = [
  { min: 0, no: 'GIAI ĐOẠN 01', name: 'Xã hội nguyên thủy', desc: 'Thị tộc, bộ lạc tự quản. Chưa tư hữu, chưa giai cấp, chưa cần bộ máy quyền lực tách khỏi nhân dân.' },
  { min: 25, no: 'GIAI ĐOẠN 02', name: 'Sản phẩm dư thừa', desc: 'Năng suất tăng, xuất hiện của cải dư thừa tương đối — tiền đề kinh tế cho chế độ tư hữu.' },
  { min: 50, no: 'GIAI ĐOẠN 03', name: 'Tư hữu & phân hóa', desc: 'Tư liệu sản xuất rơi vào tay thiểu số. Quan hệ bình đẳng bị thay bằng quan hệ áp bức, bóc lột.' },
  { min: 75, no: 'GIAI ĐOẠN 04', name: 'Mâu thuẫn không thể điều hòa', desc: 'Giai cấp thống trị và bị trị có lợi ích đối lập. Đấu tranh giai cấp trở nên gay gắt.' },
  { min: 100, no: 'GIAI ĐOẠN 05', name: 'Nhà nước ra đời', desc: 'Một lực lượng đứng trên xã hội xuất hiện để giữ xung đột trong vòng "trật tự" — trật tự bảo đảm địa vị giai cấp thống trị.' }
];

const prodLabels = [
  'Cộng đồng săn bắt, hái lượm',
  'Bắt đầu canh tác, chăn nuôi',
  'Tích lũy của cải',
  'Phân tầng rõ rệt',
  'Xã hội có giai cấp đối kháng'
];

export default function Theory() {
  // SIMULATION STATE
  const [prod, setProd] = useState(0);

  const clamp = (v: number) => Math.max(0, Math.min(100, v));
  const surplus = clamp((prod - 15) * 1.3);
  const property = clamp((prod - 35) * 1.5);
  const cls = clamp((prod - 50) * 1.8);
  const conflict = clamp((prod - 60) * 2.1);

  let currentStage = stages[0];
  for (const st of stages) {
    if (prod >= st.min) currentStage = st;
  }
  const li = Math.min(4, Math.floor(prod / 25));


  // FLIP CARD STATE
  const [isFlipped, setIsFlipped] = useState(false);

  // FEATURES CARD STATE
  const [openFeats, setOpenFeats] = useState<Set<number>>(new Set());
  const toggleFeat = (id: number) => {
    setOpenFeats(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="theory-page">
      <TopBar />
      
      {/* HERO */}
      <header className="hero relative">
        <svg className="star" viewBox="0 0 100 100"><polygon fill="var(--red)" points="50,2 61,38 98,38 68,60 79,96 50,74 21,96 32,60 2,38 39,38"/></svg>
        <div className="wrap relative z-10">
          <div className="hero-tag">CHUYÊN ĐỀ · TRIẾT HỌC MÁC – LÊNIN</div>
          <h1>NHÀ NƯỚC VÀ<br /><em>MÀU THUẪN GIAI CẤP</em></h1>
          <div className="quote-block">
            <p>"Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được."</p>
            <cite>— V.I. LÊNIN, <i>Nhà nước và Cách mạng</i></cite>
          </div>
          <div className="scroll-cue">↓ KÉO THANH BÊN DƯỚI ĐỂ TỰ TAY DỰNG NÊN NHÀ NƯỚC</div>
        </div>
      </header>

      {/* TẦNG 0: CLASS CONTRADICTION INTRO */}
      <ClassContradictionIntro />

      {/* SIM: TẦNG 1 */}
      <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}>
        <div className="wrap">
          <div className="kicker">Tầng 1 — Nhà nước là SẢN PHẨM</div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 46px)' }}>Bạn không thể dựng nhà nước<br />nếu chưa có mâu thuẫn giai cấp</h2>
          <p className="lead muted">Kéo thanh <b>Lực lượng sản xuất</b>. Hãy quan sát: nhà nước <em>không</em> xuất hiện vì bạn ra lệnh — nó chỉ xuất hiện như một <em>tất yếu</em> khi chuỗi nhân quả hoàn tất.</p>

          <div className="sim-grid">
            <div className="dial">
              <label htmlFor="prod">⚙️ LỰC LƯỢNG SẢN XUẤT</label>
              <input 
                type="range" 
                id="prod" 
                min="0" max="100" 
                value={prod} 
                onChange={(e) => setProd(Number(e.target.value))} 
              />
              <div className="readout">Trình độ: {prod}% — {prodLabels[li]}</div>
              <div className="bars">
                <div className="bar-row">
                  <div className="bl"><span>Sản phẩm dư thừa</span><span>{Math.round(surplus)}%</span></div>
                  <div className="bar-track"><div className="bar-fill surplus" style={{ width: `${surplus}%` }}></div></div>
                </div>
                <div className="bar-row">
                  <div className="bl"><span>Chế độ tư hữu</span><span>{Math.round(property)}%</span></div>
                  <div className="bar-track"><div className="bar-fill prop" style={{ width: `${property}%` }}></div></div>
                </div>
                <div className="bar-row">
                  <div className="bl"><span>Phân hóa giai cấp</span><span>{Math.round(cls)}%</span></div>
                  <div className="bar-track"><div className="bar-fill" style={{ width: `${cls}%` }}></div></div>
                </div>
                <div className="bar-row">
                  <div className="bl"><span>Mâu thuẫn lợi ích đối kháng</span><span>{Math.round(conflict)}%</span></div>
                  <div className="bar-track"><div className="bar-fill conflict" style={{ width: `${conflict}%` }}></div></div>
                </div>
              </div>
            </div>

            <div>
              <div className="stage">
                <div className="st-no">{currentStage.no}</div>
                <div className="st-name">{currentStage.name}</div>
                <div className="st-desc">{currentStage.desc}</div>
              </div>
              <div className={clsx("verdict", prod >= 100 && "show")}>
                ⚑ NHÀ NƯỚC RA ĐỜI — như một tất yếu lịch sử, không phải do thần thánh hay ý chí cá nhân sắp đặt.
              </div>
              <p className="src-note">Mạch nhân quả: dư thừa → tư hữu → phân hóa giai cấp → mâu thuẫn không thể điều hòa → nhà nước. (Giáo trình Triết học Mác–Lênin 2021, Ch.III)</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* TẦNG 2: STATE SIMULATION */}
      <StateSimulation />

      {/* TẦNG 3: CONTRADICTION RESOLVER */}
      <ContradictionResolver />

      {/* TẦNG 4: FLIP */}
      <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}>
        <div className="wrap">
          <div className="kicker">Tầng 4 — Hai mặt bản chất</div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 46px)' }}>Một khuôn mặt cho tất cả,<br />một bản chất cho thiểu số</h2>
          <div className="flip-wrap" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={clsx("flip", isFlipped && "flipped")}>
              <div className="face front">
                <div className="ft">MẶT NHÌN THẤY · TÍNH XÃ HỘI</div>
                <h3>"Đại diện lợi ích chung"</h3>
                <p>Nhà nước làm giáo dục, y tế, hạ tầng, an ninh, môi trường — những chức năng xã hội cần thiết để duy trì ổn định. Ăngghen: chức năng xã hội là <em>cơ sở</em> của sự thống trị chính trị.</p>
                <div className="flip-hint">↻ BẤM ĐỂ LẬT — XEM MẶT CÒN LẠI</div>
              </div>
              <div className="face back">
                <div className="ft">BẢN CHẤT QUYẾT ĐỊNH · TÍNH GIAI CẤP</div>
                <h3>Công cụ chuyên chính</h3>
                <p>Xét đến cùng, nhà nước là công cụ chính trị của giai cấp thống trị. Chức năng xã hội phục vụ một trật tự có lợi cho giai cấp đó; thống trị chính trị mới là chức năng quyết định. "Không có nhà nước đứng trên hoặc ngoài giai cấp."</p>
                <div className="flip-hint">↻ LẬT LẠI</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ĐẶC TRƯNG */}
      <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}>
        <div className="wrap">
          <div className="kicker">Dấu hiệu nhận diện</div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 46px)' }}>3 đặc trưng phân biệt nhà nước<br />với mọi tổ chức xã hội khác</h2>
          <p className="lead muted">Bấm vào từng thẻ để mở rộng.</p>
          <div className="feat-grid">
            {[
              { id: 1, title: 'Quản lý cư dân theo lãnh thổ', more: 'Khác thị tộc dựa trên huyết thống, nhà nước phân chia & quản lý dân cư theo đơn vị lãnh thổ; quyền lực có hiệu lực với mọi thành viên trong biên giới.', src: '— Lênin, Nhà nước và Cách mạng' },
              { id: 2, title: 'Bộ máy cưỡng chế chuyên nghiệp', more: '"Những đội vũ trang đặc biệt" — quân đội, cảnh sát, tòa án, nhà tù & bộ máy hành chính — buộc mọi thành viên phục tùng ý chí giai cấp cầm quyền.', src: '— Lênin' },
              { id: 3, title: 'Thuế khóa', more: 'Để nuôi quyền lực công cộng đặt trên xã hội, nhà nước phải có thuế và quốc trái. "Cần phải có sự đóng góp của công dân, đó là thuế má."', src: '— Ph. Ăngghen' }
            ].map((f) => (
              <div key={f.id} className={clsx("feat", openFeats.has(f.id) && "open")} onClick={() => toggleFeat(f.id)}>
                <div className="fn">0{f.id}</div>
                <h3>{f.title}</h3>
                <div className="more">{f.more}</div>
                <span className="src">{f.src}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* THỰC TIỄN */}
      <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}>
        <div className="wrap">
          <div className="kicker">Tầng thực tiễn — 2024-2026</div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 46px)' }}>Luận điểm 1917 đọc tin tức hôm nay</h2>
          <p className="lead muted">Mâu thuẫn giai cấp ngày nay ít khi là đối đầu trực diện kiểu thế kỷ XIX — nhưng nhà nước vẫn không ngừng phải <em>điều tiết</em> xung đột lợi ích. Đó chính là tính thời sự của luận điểm.</p>
          <div className="real-grid">
            <div className="case">
              <div className="tag">LAO ĐỘNG ↔ NỀN TẢNG</div>
              <h3>Tài xế công nghệ & "gig economy"</h3>
              <p>Tranh chấp về địa vị lao động, bảo hiểm, mức chiết khấu giữa tài xế và các nền tảng (Grab, Uber, Be...). Nhà nước buộc phải can thiệp bằng luật lao động, thuế & an sinh — điều tiết mâu thuẫn lợi ích mới.</p>
            </div>
            <div className="case">
              <div className="tag">VỐN ↔ XÃ HỘI</div>
              <h3>Thuế & phân phối lại</h3>
              <p>Tranh luận toàn cầu về thuế tối thiểu doanh nghiệp, thuế tài sản, lương tối thiểu. Bộ máy thuế khóa (đặc trưng #3) chính là công cụ nhà nước cân bằng tích lũy tư bản với áp lực xã hội.</p>
            </div>
            <div className="case">
              <div className="tag">CÔNG NGHỆ ↔ QUYỀN LỰC</div>
              <h3>AI, dữ liệu & việc làm</h3>
              <p>Tự động hóa và AI làm dịch chuyển quan hệ sở hữu "tư liệu sản xuất" sang dữ liệu & thuật toán, làm dấy lên xung đột mới về việc làm và phân phối. Nhà nước ra quy định (AI Act, luật dữ liệu) để giữ xung đột "trong vòng trật tự".</p>
            </div>
            <div className="case">
              <div className="tag">QUỐC GIA ↔ BIG TECH</div>
              <h3>Big Tech & Chủ quyền số</h3>
              <p>Các chính phủ liên tục ban hành quy định đối với Google, Meta, TikTok nhằm kiểm soát dữ liệu và ảnh hưởng xã hội. Khi doanh nghiệp công nghệ sở hữu quyền lực kinh tế khổng lồ, nhà nước phải can thiệp bằng luật pháp để bảo vệ chủ quyền quốc gia.</p>
            </div>
          </div>

          <div className="vn">
            <div className="vn-head">
              <span className="vn-flag">★</span>
              <div>
                <div className="vn-kick">LIÊN HỆ VIỆT NAM · 2025–2026</div>
                <h3>Nhà nước pháp quyền XHCN — lý thuyết Chương III soi vào thực tiễn</h3>
              </div>
            </div>
            <p className="vn-intro">Nhà nước pháp quyền XHCN Việt Nam là <em>hình thức nhà nước của thời kỳ quá độ</em> lên CNXH dưới sự lãnh đạo của Đảng. Vận dụng sáng tạo học thuyết Mác–Lênin: <b>"của Nhân dân, do Nhân dân, vì Nhân dân"</b> — nền tảng là liên minh công–nông–trí, ưu tiên chức năng tổ chức, xây dựng hơn chức năng trấn áp.</p>

            <div className="vn-grid">
              <div className="vn-card"><div className="vt">ĐẶC TRƯNG #1 · QUẢN LÝ LÃNH THỔ</div><div className="vnum">34</div><div className="vlab">tỉnh, thành phố</div><p>Từ 1/7/2025 vận hành chính quyền địa phương <b>hai cấp (tỉnh–xã)</b>: 34 tỉnh/thành và 3.321 xã, phường, đặc khu (NQ 202/2025/QH15, hiệu lực 12/6/2025) — quản lý thống nhất toàn lãnh thổ.</p></div>
              <div className="vn-card"><div className="vt">ĐẶC TRƯNG #2 · CƯỠNG CHẾ CHUYÊN NGHIỆP</div><div className="vnum">3</div><div className="vlab">cấp công an</div><p>Năm 2025 công an chuyển sang mô hình <b>ba cấp (Bộ–tỉnh–xã)</b>, chấm dứt công an cấp huyện — củng cố hệ thống cơ quan quyền lực công cộng đặc biệt ngay tại cơ sở.</p></div>
              <div className="vn-card"><div className="vt">ĐẶC TRƯNG #3 · THUẾ KHÓA</div><div className="vnum">Tối ưu</div><div className="vlab">ngân sách quốc gia</div><p>Thuế là nguồn tài chính chủ yếu nuôi bộ máy; do đó cải cách hành chính, tinh giản biên chế ("Tinh–Gọn–Mạnh") chính là biện pháp giảm gánh nặng ngân sách, sử dụng hiệu quả tiền thuế của Nhân dân.</p></div>
              <div className="vn-card"><div className="vt">CHỨC NĂNG XÃ HỘI · ĐỐI NỘI</div><div className="vnum">&gt;99%</div><div className="vlab">hồ sơ đúng hạn (2025)</div><p>Cải cách hành chính gắn chuyển đổi số (Đề án 06, Cổng Dịch vụ công quốc gia): nhiều địa phương giải quyết hồ sơ đúng hạn trên 99%, mở rộng dịch vụ công trực tuyến.</p></div>
            </div>

            <p className="vn-link"><b>Liên hệ trực tiếp luận điểm Lênin:</b> sự tồn tại và liên tục hoàn thiện của Nhà nước (kiểm soát quyền lực, chống tham nhũng, phát huy dân chủ XHCN theo NQ 27-NQ/TW & Đại hội XIV) cho thấy nhà nước <em>không đứng ngoài xã hội</em> mà là thiết chế điều tiết các quan hệ, mâu thuẫn xã hội — đúng với mạch lý luận Chương III.</p>
          </div>

          <p className="src-note">Nguồn: NQ 202/2025/QH15; NQ 27-NQ/TW; Văn kiện Đại hội XIV; Cổng TTĐT Chính phủ; Báo Nhân Dân, VOV (2025). Mỗi ca trên xác nhận: vai trò điều tiết của nhà nước gắn trực tiếp với xử lý mâu thuẫn xã hội → luận điểm Lênin vẫn nguyên tính thời sự.</p>
        </div>
      </motion.section>

      {/* TIÊU VONG */}
      <motion.section className="end" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}>
        <div className="wrap">
          <div className="kicker" style={{ color: 'var(--gold)' }}>Tầng 5 — Hệ quả logic</div>
          <h2>NẾU MÂU THUẪN MẤT ĐI<br /><em>NHÀ NƯỚC TỰ TIÊU VONG</em></h2>
          <p className="fade-line">Nhà nước là sản phẩm của mâu thuẫn giai cấp — nên khi giai cấp bị xóa bỏ hoàn toàn, nhà nước mất lý do tồn tại. Theo Mác–Lênin, điều đó không xảy ra ngay sau cách mạng, mà qua thời kỳ quá độ dưới hình thức <b>nhà nước vô sản</b>: trấn áp lực lượng chống đối + tổ chức xây dựng xã hội mới, rồi <em>dần tiêu vong</em>.</p>
          <p className="fade-line muted">"Nhà nước là một phạm trù lịch sử: có ra đời thì có mất đi."</p>
        </div>
      </motion.section>



      <footer>★ CỖ MÁY NHÀ NƯỚC — Sản phẩm tương tác · Chương III: Nhà nước và Cách mạng xã hội ★</footer>
    </div>
  );
}
