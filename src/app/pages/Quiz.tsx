import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Sparkles, AlertTriangle, Shield } from 'lucide-react';
import { useGameStore, EquipmentItem } from '../store';
import { TopBar } from '../components/TopBar';
import clsx from 'clsx';
import confetti from 'canvas-confetti';

const quizData: Record<string, { title: string, reward: EquipmentItem | null, isBoss?: boolean, questions: any[] }> = {
  "1": {
    title: "Rừng Tri Thức",
    reward: "sword",
    questions: [
      { q: "Nguyên tắc cơ bản của chủ nghĩa duy vật biện chứng là gì?", options: ["Tính ưu việt của ý tưởng", "Tính ưu việt của vật chất trên ý thức", "Bình đẳng của vật chất và tâm trí", "Sự tách biệt giữa tâm trí và cơ thể"], a: 1, explanation: "Chủ nghĩa Mác khẳng định vật chất tồn tại độc lập với ý thức." },
      { q: "Theo phép biện chứng, sự phát triển diễn ra chủ yếu như thế nào?", options: ["Theo đường thẳng bất biến", "Do các lực siêu nhiên quyết định", "Thông qua mâu thuẫn và vận động nội tại", "Hoàn toàn ngẫu nhiên"], a: 2, explanation: "Mâu thuẫn nội tại là động lực của vận động và phát triển." },
      { q: "Trong nhận thức luận, thực tiễn có vai trò gì?", options: ["Không liên quan đến tri thức", "Là tiêu chuẩn kiểm tra chân lý", "Chỉ dùng để quan sát", "Thay thế hoàn toàn lý luận"], a: 1, explanation: "Thực tiễn là cơ sở, động lực và tiêu chuẩn kiểm tra chân lý." }
    ]
  },
  "2": {
    title: "Núi Khôn Ngoan",
    reward: "shield",
    questions: [
      { q: "Luật cơ bản của biện chứng là gì?", options: ["Sự thống nhất và đấu tranh của các đối lập", "Sự cân bằng vĩnh viễn", "Sự chắc chắn tuyệt đối", "Sự trì trệ của các lực lịch sử"], a: 0, explanation: "Mâu thuẫn là gốc rễ của mọi chuyển động và sức sống." },
      { q: "Quy luật chuyển hóa từ lượng thành chất nói rằng gì?", options: ["Mọi thay đổi đều đột ngột", "Tích lũy dần về lượng có thể dẫn đến biến đổi về chất", "Chất không bao giờ thay đổi", "Lượng và chất không liên hệ"], a: 1, explanation: "Sự tích lũy về lượng đến một ngưỡng sẽ tạo ra bước nhảy về chất." },
      { q: "Phủ định của phủ định được hiểu đúng nhất là gì?", options: ["Xóa bỏ sạch mọi cái cũ", "Quay lại điểm xuất phát y nguyên", "Kế thừa cái tích cực ở trình độ cao hơn", "Không có sự phát triển nào"], a: 2, explanation: "Biện chứng không phủ định sạch trơn mà kế thừa và nâng cao." }
    ]
  },
  "3": {
    title: "Thung Lũng Biện Chứng",
    reward: "helmet",
    questions: [
      { q: "Chủ nghĩa duy vật lịch sử xem sự phát triển của xã hội như thế nào?", options: ["Do các nhân vật tầm vóc lớn dẫn dắt", "Do ý chí thần thánh", "Do đấu tranh giai cấp và các yếu tố kinh tế", "Hoàn toàn ngẫu nhiên"], a: 2, explanation: "Cơ sở kinh tế tạo nên kết cấu của phần còn lại của xã hội." },
      { q: "Lực lượng sản xuất bao gồm những gì?", options: ["Tư tưởng và đạo đức", "Người lao động, công cụ và tri thức sản xuất", "Pháp luật và tôn giáo", "Chỉ có máy móc"], a: 1, explanation: "Lực lượng sản xuất là sự kết hợp giữa con người, tư liệu và tri thức." },
      { q: "Quan hệ sản xuất phản ánh điều gì?", options: ["Quan hệ giữa người với người trong quá trình sản xuất", "Quan hệ giữa con người và tự nhiên", "Quan hệ giữa nhà nước và cá nhân", "Quan hệ giữa quá khứ và tương lai"], a: 0, explanation: "Quan hệ sản xuất là quan hệ xã hội nảy sinh trong sản xuất vật chất." }
    ]
  },
  "4": {
    title: "Pháo Đài Cổ Xưa",
    reward: "armor",
    questions: [
      { q: "Mối quan hệ giữa 'cơ sở' và 'tầng trên' là gì?", options: ["Tầng trên quyết định cơ sở", "Cơ sở quyết định tầng trên", "Chúng độc lập với nhau", "Chúng giống hệt nhau"], a: 1, explanation: "Cơ sở kinh tế quyết định tầng trên về bản chất, dù tác động qua lại là hai chiều." },
      { q: "'Tầng trên' thường bao gồm những yếu tố nào?", options: ["Chỉ công nghệ", "Chính trị, pháp luật, tư tưởng", "Chỉ thị trường", "Chỉ văn hóa đại chúng"], a: 1, explanation: "Tầng trên gồm các thiết chế chính trị, pháp luật và đời sống tinh thần xã hội." },
      { q: "Vì sao cơ sở và tầng trên có thể tác động qua lại?", options: ["Vì tầng trên không có vai trò gì", "Vì mọi thành phần xã hội đều vận động liên hệ với nhau", "Vì kinh tế luôn đứng yên", "Vì lịch sử không có quy luật"], a: 1, explanation: "Tầng trên có tính độc lập tương đối và có thể tác động trở lại cơ sở." }
    ]
  },
  "5": {
    title: "Nhà Ngựa Hoàng Gia",
    reward: "horse",
    questions: [
      { q: "Theo Marx, 'thuốc phiện của nhân dân' là gì?", options: ["Truyền hình", "Tiền bạc", "Tôn giáo", "Quyền lực"], a: 2, explanation: "Marx dùng câu nói này để mô tả cách tôn giáo làm dịu cơn đau của áp bức." },
      { q: "Giá trị thặng dư được tạo ra từ đâu?", options: ["Từ máy móc", "Từ lao động sống của công nhân", "Từ may mắn thị trường", "Từ quảng cáo"], a: 1, explanation: "Giá trị thặng dư sinh ra từ phần lao động không được trả công đầy đủ." },
      { q: "Trong tư bản chủ nghĩa, bản chất của hàng hóa là gì?", options: ["Vật chỉ có giá trị sử dụng", "Sản phẩm có cả giá trị sử dụng và giá trị", "Chỉ là biểu tượng", "Không liên quan lao động"], a: 1, explanation: "Hàng hóa có hai thuộc tính cơ bản: giá trị sử dụng và giá trị." }
    ]
  },
  "6": {
    title: "Lâu Đài Rồng - Trận Chiến Cuối Cùng",
    reward: null,
    isBoss: true,
    questions: [
      { q: "Giá trị thặng dư được tạo ra như thế nào trong hệ thống tư bản?", options: ["Từ máy móc", "Từ lao động không được trả công của công nhân", "Từ đầu tư thông minh", "Từ cung cầu"], a: 1, explanation: "Giá trị thặng dư đến từ lao động được thực hiện vượt quá mức cần thiết để trả lương." },
      { q: "Mục tiêu cuối cùng của chủ nghĩa cộng sản theo chủ nghĩa Mác là gì?", options: ["Xã hội không nhà nước, không giai cấp", "Lương bằng nhau cho tất cả mọi người", "Nhà nước sở hữu tất cả tài sản", "Nền kinh tế thị trường được điều tiết chặt chẽ"], a: 0, explanation: "Chủ nghĩa cộng sản hướng tới một xã hội không có giai cấp hoặc nhà nước." },
      { q: "Khái niệm 'tính cách xa lạ' (alienation) trong ý nghĩa của Marx là gì?", options: ["Cảm thấy cô đơn", "Công nhân mất quyền kiểm soát công việc và sản phẩm của họ", "Bị trục xuất khỏi một đất nước", "Ghét người giàu"], a: 1, explanation: "Công nhân bị tách biệt khỏi sản phẩm của lao động của họ." },
    ]
  }
};

const equipmentMeta: Record<EquipmentItem, { icon: string; label: string }> = {
  sword: { icon: '⚔️', label: 'Kiếm' },
  shield: { icon: '🛡️', label: 'Khiên' },
  helmet: { icon: '⛑️', label: 'Mũ' },
  armor: { icon: '🎽', label: 'Giáp' },
  horse: { icon: '🐎', label: 'Ngựa' },
};

export default function Quiz() {
  const navigate = useNavigate();
  const { stageId } = useParams();
  const stageNum = stageId || "1";
  const stageNumber = parseInt(stageNum);
  
  const stage = quizData[stageNum];
  const isBoss = stage?.isBoss;

  const { hearts, loseHeart, addXp, unlockItem, completeStage, currentStage, inventory } = useGameStore();
  const unlockedEquipment = Object.entries(inventory)
    .filter(([, unlocked]) => unlocked)
    .map(([item]) => item as EquipmentItem);
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'shielded' | 'reward' | 'gameover' | 'victory' | 'defeat'>('idle');
  
  const [dragonHp, setDragonHp] = useState(3);
  const [bossShields, setBossShields] = useState(() => unlockedEquipment.length);
  const [bossInitialEquipment, setBossInitialEquipment] = useState<EquipmentItem[]>(() => unlockedEquipment.slice());
  const [bossShieldItems, setBossShieldItems] = useState<EquipmentItem[]>(() => unlockedEquipment.slice());
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    // Initialize or update boss shields only when entering boss or inventory changes.
    if (!isBoss) return;
    const items = Object.entries(inventory).filter(([, v]) => v).map(([k]) => k as EquipmentItem);
    setBossInitialEquipment(items);
    setBossShieldItems(items.slice());
    setBossShields(items.length);
  }, [isBoss, inventory]);

  useEffect(() => {
    if (status === 'idle' && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(l => l - 1), 1000);
      return () => clearTimeout(t);
    } else if (timeLeft === 0 && status === 'idle') {
      handleWrong();
    }
  }, [timeLeft, status]);

  useEffect(() => {
    if (hearts <= 0) {
      setStatus('defeat');
    }
  }, [hearts]);

  const question = stage?.questions[currentQIndex];

  if (!stage) return <div className="p-8 text-white">Cấp không tìm thấy.</div>;

  const handleCorrect = () => {
    setStatus('correct');
    addXp(50);
    
    if (isBoss) {
      const nextHp = Math.max(0, dragonHp - 1);
      setDragonHp(nextHp);
      setTimeout(() => {
        if (nextHp <= 0) {
          completeStage(stageNumber);
          setStatus('victory');
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
          return;
        }

        if (currentQIndex < stage.questions.length - 1) {
          setCurrentQIndex(q => q + 1);
          setStatus('idle');
          setSelectedAns(null);
          setTimeLeft(30);
        }
      }, 2000);
    } else {
      setTimeout(() => {
        if (currentQIndex < stage.questions.length - 1) {
          setCurrentQIndex(q => q + 1);
          setStatus('idle');
          setSelectedAns(null);
          setTimeLeft(30);
          return;
        }

        if (stage.reward) unlockItem(stage.reward);
        setStatus('reward');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }, 1500);
    }
  };

  const handleWrong = () => {
    if (isBoss && bossShieldItems.length > 0) {
      // consume the last shield item
      setBossShieldItems(prev => {
        const next = prev.slice(0, -1);
        setBossShields(next.length);
        return next;
      });
      setStatus('shielded');
      setTimeout(() => {
        setStatus('idle');
        setSelectedAns(null);
        setTimeLeft(30);
      }, 1400);
      return;
    }

    setStatus('wrong');
    loseHeart();
    setTimeout(() => {
      const currentHearts = useGameStore.getState().hearts;
      if (currentHearts <= 0) {
        setStatus('defeat');
      } else {
        setStatus('idle');
        setSelectedAns(null);
        setTimeLeft(30);
      }
    }, 2500);
  };

  const submitAnswer = (idx: number) => {
    if (status !== 'idle') return;
    setSelectedAns(idx);
    if (idx === question.a) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  const finishStage = () => {
    if (currentStage === stageNumber) {
      completeStage(stageNumber);
    }
    navigate('/map');
  };

  if (status === 'gameover') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.12),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(15,118,110,0.08),transparent_28%)]" />
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative z-10 text-6xl mb-4"
        >
          💔
        </motion.div>
        <h1 className="relative z-10 text-4xl font-black text-white mb-4">Hết sinh mạng</h1>
        <p className="relative z-10 text-slate-300 mb-8 text-lg max-w-md text-center">Bạn đã cần ôn lại nội dung trước khi tiếp tục chặng này.</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/map')} 
          className="relative z-10 bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold text-lg transition-transform hover:scale-[1.02]"
        >
          Quay Lại Bản Đồ
        </motion.button>
      </div>
    );
  }

  if (status === 'victory') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-emerald-800 flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_70%_0%,rgba(6,95,70,0.12),transparent_26%)]" />
        <motion.div initial={{ scale: 0.7, rotate: -6 }} animate={{ scale: 1, rotate: 0 }} className="relative z-10 text-9xl mb-2">👑</motion.div>
        <motion.h1 initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10 text-4xl font-extrabold text-white mb-2">Chiến thắng huy hoàng</motion.h1>
        <p className="relative z-10 text-slate-200 mb-6 text-center max-w-lg">Bạn đã đánh bại Lâu Đài Rồng và hoàn thành hành trình. Những trang bị thu thập sẽ theo bạn trong tương lai.</p>

        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-6 mb-6 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs text-emerald-200 font-black uppercase">Kết quả</div>
              <div className="text-lg font-extrabold mt-1">Lâu Đài Rồng đã bị khuất phục</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-emerald-100">Điểm kinh nghiệm</div>
              <div className="font-black text-2xl">{useGameStore.getState().xp}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            {unlockedEquipment.map(item => (
              <div key={item} className="flex items-center gap-3 bg-emerald-900/20 px-4 py-3 rounded-2xl border border-emerald-400/10">
                <div className="text-2xl">{equipmentMeta[item].icon}</div>
                <div>
                  <div className="font-black">{equipmentMeta[item].label}</div>
                  <div className="text-xs text-emerald-200/80">Thu thập từ chặng</div>
                </div>
              </div>
            ))}
            {unlockedEquipment.length === 0 && (
              <div className="px-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-slate-300">Bạn chưa thu thập trang bị nào.</div>
            )}
          </div>
        </motion.div>

        <div className="flex gap-4 z-20">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => navigate('/map')} className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold">Xem bản đồ</motion.button>
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => { useGameStore.getState().resetGame(); navigate('/'); }} className="px-6 py-3 rounded-xl bg-transparent border border-white/20 font-bold text-white">Chơi lại</motion.button>
        </div>
      </div>
    );
  }

  if (status === 'defeat') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-rose-950 to-slate-900 flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.12),transparent_30%),radial-gradient(circle_at_70%_0%,rgba(15,118,110,0.08),transparent_26%)]" />
        <motion.div initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="relative z-10 text-8xl mb-4">💔🤴👸</motion.div>
        <h1 className="relative z-10 text-4xl font-black text-white mb-4">Chưa hoàn thành chặng</h1>
        <p className="relative z-10 text-slate-300 mb-8 text-center max-w-md">Bạn có thể quay lại bản đồ và thử lại sau khi ôn thêm.</p>
        <div className="relative z-10 text-5xl mb-6">✕</div>
        <div className="flex gap-4">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => { useGameStore.getState().resetGame(); navigate('/map'); }} className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold">Quay lại bản đồ</motion.button>
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => { useGameStore.getState().resetGame(); navigate('/'); }} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-white">Thử lại</motion.button>
        </div>
      </div>
    );
  }

  if (status === 'reward') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-white p-6 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.10),transparent_28%),radial-gradient(circle_at_70%_0%,rgba(15,118,110,0.10),transparent_26%)]" />
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative z-10 text-7xl mb-6"
        >
          {stage.reward === 'sword' && '⚔️'}
          {stage.reward === 'shield' && '🛡️'}
          {stage.reward === 'helmet' && '⛑️'}
          {stage.reward === 'armor' && '🎽'}
          {stage.reward === 'horse' && '🐎'}
        </motion.div>
        <h1 className="relative z-10 text-4xl font-black text-white mb-2">Mở khóa thành công</h1>
        <p className="relative z-10 text-slate-300 font-medium mb-12 text-center">Bạn đã nhận được {stage.reward} và có thể tiếp tục chặng mới.</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={finishStage} 
          className="relative z-10 bg-white text-slate-950 px-10 py-4 rounded-2xl font-black text-lg transition-transform hover:scale-[1.02]"
        >
          Tiếp Tục Hành Trình
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col font-sans text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.10),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(15,118,110,0.08),transparent_26%)]" />

      <TopBar />
      
      <div className="flex-1 w-full max-w-3xl mx-auto p-4 flex flex-col relative z-10">
        
        {/* Header Area */}
        <div className="flex items-center justify-between gap-4 mb-6 rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-black/10 backdrop-blur">
           <div>
             <div className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">Cấp {stageNum}</div>
             <h2 className="mt-2 text-3xl font-black text-white">{stage.title}</h2>
           </div>
           <div className="flex items-center gap-3 flex-wrap justify-end">
             <motion.div 
               className={clsx(
                 "flex items-center gap-2 px-4 py-3 rounded-2xl font-black text-lg border",
                 timeLeft < 10 ? "bg-rose-500/10 border-rose-400/20 text-rose-100" : "bg-white/5 border-white/10 text-slate-100"
               )}
             >
               <Clock className="w-6 h-6" />
               {timeLeft}s
             </motion.div>
             {isBoss && (
               <div className="flex items-center gap-2 px-4 py-3 rounded-2xl font-black text-lg border bg-amber-400/10 border-amber-300/20 text-amber-100">
                <Shield className="w-6 h-6" />
                {bossShieldItems.length}
              </div>
             )}
           </div>
        </div>

        {isBoss && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-black/10 backdrop-blur"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">Trang bị đã mở</div>
                <h3 className="mt-2 text-xl font-black text-white">Khiên boss sẽ dùng số trang bị này</h3>
              </div>
              <div className="text-right text-sm text-slate-300">
                <div className="font-black text-white">{unlockedEquipment.length} món</div>
                <div>{bossShields} khiên còn lại</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {bossInitialEquipment.map(item => {
                const active = bossShieldItems.includes(item);
                return (
                  <div
                    key={item}
                    className={clsx(
                      "flex items-center gap-3 rounded-2xl px-4 py-3",
                      active ? "border border-emerald-400/15 bg-emerald-400/10 text-emerald-50" : "border border-white/10 bg-white/5 text-slate-400/70"
                    )}
                  >
                    <div className="text-2xl">{equipmentMeta[item].icon}</div>
                    <div>
                      <div className="font-black">{equipmentMeta[item].label}</div>
                      <div className="text-xs">{active ? 'Đã sẵn sàng cho boss' : 'Đã tiêu'}</div>
                    </div>
                  </div>
                );
              })}
              {bossInitialEquipment.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">Chưa có trang bị nào được mở.</div>
              )}
            </div>
          </motion.div>
        )}

        {/* Battle Arena View (if boss) */}
        {isBoss && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-950/70 rounded-3xl p-6 mb-6 flex justify-between items-end relative overflow-hidden shadow-2xl shadow-black/20 border border-white/10 h-48 backdrop-blur"
          >
            {/* Prince */}
            <motion.div 
              className="text-7xl z-10"
              animate={status === 'correct' ? { x: 50, rotate: 15, scale: 1.1 } : status === 'wrong' ? { x: -20, rotate: -15, opacity: 0.5, scale: 0.9 } : { y: [0, -8, 0] }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              🤴
            </motion.div>

            {/* Attack FX */}
            <AnimatePresence>
              {status === 'correct' && (
                <motion.div 
                  initial={{ x: 0, opacity: 1, scale: 1 }} 
                  animate={{ x: 200, opacity: 0, scale: 0.5 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.8 }}
                  className="absolute left-32 bottom-12 text-5xl z-20"
                >
                  ⚔️
                </motion.div>
              )}
              {status === 'wrong' && (
                <motion.div 
                  initial={{ x: 200, opacity: 1, scale: 1 }} 
                  animate={{ x: 0, opacity: 0, scale: 0.5 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute right-32 bottom-12 text-5xl z-20"
                >
                  🔥
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dragon */}
            <div className="flex flex-col items-center z-10">
              <div className="flex gap-2 mb-3">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ scale: i < dragonHp ? [1, 1.2, 1] : [1, 0.8, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className={clsx("w-8 h-8 rounded-full border transition-all", i < dragonHp ? "bg-slate-100 border-slate-300" : "bg-slate-700 border-slate-600")} 
                  />
                ))}
              </div>
              <motion.div 
                className="text-8xl"
                animate={status === 'correct' ? { x: 20, rotate: 10, scale: 0.9 } : status === 'wrong' ? { scale: 1.05, skewX: 6 } : { y: [0, 10, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                🐉
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Progress Bar (if not boss) */}
        {!isBoss && (
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="w-full h-4 bg-white/5 rounded-full mb-8 overflow-hidden border border-white/10 shadow-lg"
          >
            <motion.div 
              className="h-full bg-slate-200 w-full" 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}

        {/* Question Card */}
        <motion.div 
          className="bg-slate-950/70 rounded-3xl p-8 shadow-2xl shadow-black/20 border border-white/10 flex-1 flex flex-col backdrop-blur"
          animate={status === 'wrong' ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
           <h3 className="text-2xl font-black text-white mb-8 leading-snug">
             {question.q}
           </h3>

           <div className="space-y-3 flex-1">
             {question.options.map((opt: string, idx: number) => {
               const isSelected = selectedAns === idx;
               const isCorrectAnswer = idx === question.a;
               let btnClass = "border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-200";
               
               if (status !== 'idle') {
                 if (isCorrectAnswer) {
                   btnClass = "border-emerald-400/20 bg-emerald-400/10 text-emerald-100";
                 } else if (isSelected) {
                   btnClass = "border-rose-400/20 bg-rose-400/10 text-rose-100";
                 } else {
                   btnClass = "border-white/5 bg-white/[0.02] text-slate-500 opacity-50";
                 }
               }

               return (
                 <motion.button
                   key={idx}
                   onClick={() => submitAnswer(idx)}
                   disabled={status !== 'idle'}
                   whileHover={status === 'idle' ? { scale: 1.02, x: 5 } : {}}
                   whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                   className={clsx(
                     "w-full text-left p-5 rounded-2xl border font-semibold text-base transition-all flex items-center gap-4 group focus:outline-none",
                     btnClass,
                     status === 'idle' && "cursor-pointer"
                   )}
                 >
                   <div className={clsx(
                     "w-10 h-10 rounded-full border flex items-center justify-center font-black text-base flex-shrink-0",
                     status === 'idle' ? "border-white/15 text-slate-200 group-hover:border-white/25" :
                     isCorrectAnswer ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100" :
                     isSelected ? "border-rose-400/20 bg-rose-400/10 text-rose-100" : "border-white/10 text-slate-500"
                   )}>
                     {String.fromCharCode(65 + idx)}
                   </div>
                   {opt}
                 </motion.button>
               );
             })}
           </div>
           
           {/* Feedback Area */}
           <AnimatePresence>
             {status !== 'idle' && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={clsx(
                   "mt-8 p-6 rounded-2xl flex items-start gap-4 border",
                   status === 'correct' ? "bg-emerald-400/10 text-emerald-100 border-emerald-400/20" : "bg-rose-400/10 text-rose-100 border-rose-400/20"
                 )}
               >
                  {status === 'correct' ? <Sparkles className="w-8 h-8 text-emerald-100 shrink-0" /> : status === 'shielded' ? <Shield className="w-8 h-8 text-amber-100 shrink-0" /> : <AlertTriangle className="w-8 h-8 text-rose-100 shrink-0" />}
                 <div>
                   <h4 className="font-black text-xl mb-1">{status === 'correct' ? 'Đúng' : status === 'shielded' ? 'Khiên chặn đòn' : 'Sai'}</h4>
                   <p className="font-medium opacity-90">
                     {status === 'shielded'
                       ? 'Trang bị đã bảo vệ bạn khỏi một lần mất mạng.'
                       : question.explanation}
                   </p>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
           
        </motion.div>
      </div>
    </div>
  );
}
