import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { TopBar } from '../components/TopBar';

export default function CapitalistState() {
  return (
    <div className="theory-page min-h-screen">
      <TopBar />

      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="wrap">
          <div className="hero-tag">MỘT KIỂU NHÀ NƯỚC TRONG LỊCH SỬ</div>
          <h1>Nhà nước <em>Tư sản</em></h1>
          
          <div className="quote-block mt-8">
            <p>“Những hình thức của các nhà nước tư sản thì hết sức khác nhau, nhưng thực chất chỉ là một: chung quy lại, tất cả những hình thức nhà nước ấy, vô luận thế nào, cũng tất nhiên phải là nền chuyên chính tư sản.”</p>
            <cite>— V.I. LÊNIN, NHÀ NƯỚC VÀ CÁCH MẠNG</cite>
          </div>
          
          <div className="scroll-cue mt-12">CUỘN ĐỂ TÌM HIỂU ↓</div>
        </div>
        <div className="star">★</div>
      </motion.section>

      {/* BẢN CHẤT */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="wrap">
          <div className="kicker">01. BẢN CHẤT GIAI CẤP</div>
          <h2>Công cụ thống trị của thiểu số</h2>
          <p className="lead mt-4">Theo quan điểm Mác – Lênin, nhà nước tư sản ra đời cùng phương thức sản xuất tư bản chủ nghĩa, là công cụ thống trị chính trị của giai cấp tư sản. Bản chất này thể hiện qua 3 phương diện cốt lõi.</p>
          
          <div className="feat-grid mt-10">
            <div className="feat">
              <div className="fn">01</div>
              <h3>Kinh tế</h3>
              <p className="muted">Dựa trên chế độ tư hữu tư bản về tư liệu sản xuất. Giai cấp tư sản nắm giữ các nguồn lực cốt lõi (tài chính, công nghệ, nhà máy) và bóc lột giá trị thặng dư.</p>
            </div>
            <div className="feat">
              <div className="fn">02</div>
              <h3>Xã hội</h3>
              <p className="muted">Duy trì sự đối kháng lợi ích giữa giai cấp tư sản (thiểu số cầm quyền) và giai cấp vô sản (đa số bán sức lao động), cùng các tầng lớp trung gian khác.</p>
            </div>
            <div className="feat">
              <div className="fn">03</div>
              <h3>Tư tưởng</h3>
              <p className="muted">Hệ tư tưởng tư sản chi phối đời sống tinh thần. Các thiết chế giáo dục, truyền thông được dùng để bảo vệ và hợp thức hóa trật tự tư bản chủ nghĩa.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* HÌNH THỨC VÀ BỘ MÁY */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="wrap">
          <div className="kicker">02. BỘ MÁY VÀ HÌNH THỨC</div>
          <h2>Đa dạng vỏ bọc, một bản chất</h2>
          <p className="lead mt-4">Dù tổ chức dưới hình thức cộng hòa hay quân chủ, bộ máy nhà nước tư sản hiện đại thường vận hành theo cơ chế <strong>Tam quyền phân lập</strong> (Phân công - Kiểm soát - Đối trọng).</p>
          
          <div className="real-grid mt-12">
            <div className="case">
              <div className="tag">CỘNG HÒA TỔNG THỐNG</div>
              <h3>Hoa Kỳ</h3>
              <p>Tổng thống do cử tri bầu (qua đại cử tri), vừa là nguyên thủ quốc gia vừa đứng đầu hành pháp, độc lập với Nghị viện. Tam quyền phân lập triệt để.</p>
            </div>
            <div className="case">
              <div className="tag">QUÂN CHỦ LẬP HIẾN</div>
              <h3>Vương quốc Anh</h3>
              <p>Vẫn duy trì Vua/Nữ hoàng mang tính biểu tượng. Quyền hành pháp thực tế thuộc về Thủ tướng và nội các (đảng chiếm đa số trong Nghị viện).</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CHỨC NĂNG */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="wrap">
          <div className="kicker">03. CHỨC NĂNG</div>
          <h2>Bảo vệ tư hữu và Điều tiết xã hội</h2>
          
          <div className="tier mt-8">
            <div className="n">1</div>
            <div>
              <h3>Chức năng Đối nội</h3>
              <p className="muted mt-2 text-lg">
                <strong>Chính trị:</strong> Bảo vệ chế độ tư hữu và đàn áp sự phản kháng của giai cấp bị bóc lột.<br/>
                <strong>Kinh tế:</strong> Dùng thuế, tiền tệ, luật pháp để điều tiết và cứu vãn các cuộc khủng hoảng của kinh tế thị trường tư bản.<br/>
                <strong>Xã hội:</strong> Cung cấp y tế, giáo dục, an sinh xã hội nhằm xoa dịu mâu thuẫn giai cấp, duy trì lực lượng lao động.
              </p>
            </div>
          </div>
          
          <div className="tier">
            <div className="n">2</div>
            <div>
              <h3>Chức năng Đối ngoại</h3>
              <p className="muted mt-2 text-lg">
                Bảo vệ lợi ích quốc gia và lợi ích của tập đoàn tư bản độc quyền trên trường quốc tế. Mở rộng ảnh hưởng, tìm kiếm thị trường, nhân công và tài nguyên (thông qua hợp tác, cạnh tranh hoặc bá quyền).
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SO SÁNH */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="wrap">
          <div className="kicker">04. ĐỐI CHIẾU</div>
          <h2>Nhà nước Tư sản vs Nhà nước Vô sản</h2>
          
          <div className="appx mt-8">
            <table>
              <thead>
                <tr>
                  <th>Tiêu chí</th>
                  <th>Nhà nước Tư sản</th>
                  <th>Nhà nước Vô sản (XHCN)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Cơ sở kinh tế</strong></td>
                  <td>Dựa trên chế độ <strong>tư hữu</strong> tư bản chủ nghĩa về tư liệu sản xuất.</td>
                  <td>Dựa trên chế độ <strong>công hữu</strong> về tư liệu sản xuất chủ yếu.</td>
                </tr>
                <tr>
                  <td><strong>Giai cấp nắm quyền</strong></td>
                  <td>Giai cấp tư sản (thiểu số).</td>
                  <td>Giai cấp công nhân và nhân dân lao động (đa số).</td>
                </tr>
                <tr>
                  <td><strong>Bản chất dân chủ</strong></td>
                  <td>Dân chủ tư sản (chịu sự chi phối của sức mạnh tư bản, bảo vệ thiểu số).</td>
                  <td>Dân chủ XHCN (dân chủ rộng rãi cho quần chúng nhân dân).</td>
                </tr>
                <tr>
                  <td><strong>Mục tiêu</strong></td>
                  <td>Duy trì sự bóc lột và bảo vệ trật tự tư bản chủ nghĩa.</td>
                  <td>Xóa bỏ áp bức, bóc lột, xây dựng xã hội bình đẳng.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="pledge">
            <strong>Tiểu kết:</strong> Dân chủ tư sản là một bước tiến lịch sử so với chế độ phong kiến. Tuy nhiên, theo Ph. Ăngghen: <em>"Nhà nước chẳng qua chỉ là một bộ máy của một giai cấp này dùng để trấn áp một giai cấp khác, điều đó, trong chế độ cộng hòa dân chủ cũng hoàn toàn giống như trong chế độ quân chủ."</em>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="end"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="wrap">
          <h2>HIỂU BẢN CHẤT <em>TƯ SẢN</em> ĐỂ XÂY DỰNG <em>NHÀ NƯỚC XHCN</em></h2>
          <p className="fade-line">Khép lại nội dung Chương III — Nhận diện đúng bản chất các kiểu nhà nước trong lịch sử.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/theory" className="inline-block border-2 border-red-600 px-6 py-3 font-bold text-cream hover:bg-red-600 transition-colors uppercase tracking-wider text-sm font-['Oswald']">
              ← Về Lý luận Lênin
            </Link>
            <Link to="/game" className="inline-block bg-red-600 px-6 py-3 font-bold text-cream hover:bg-red-700 transition-colors uppercase tracking-wider text-sm font-['Oswald']">
              Ôn tập ngay →
            </Link>
          </div>
        </div>
      </motion.section>

      <footer>
        <div className="wrap">
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM • TRIẾT HỌC MÁC - LÊNIN • 2026
        </div>
      </footer>
    </div>
  );
}
