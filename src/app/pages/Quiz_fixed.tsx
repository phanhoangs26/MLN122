import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Sparkles, AlertTriangle } from 'lucide-react';
import { useGameStore, EquipmentItem } from '../store';
import { TopBar } from '../components/TopBar';
import clsx from 'clsx';
import confetti from 'canvas-confetti';

const quizData: Record<string, { title: string, reward: EquipmentItem | null, isBoss?: boolean, questions: any[] }> = {
  "1": {
    title: "Rừng Tri Thức",
    reward: "sword",
    questions: [
      { q: "Nguyên tắc cơ bản của chủ nghĩa duy vật biện chứng là gì?", options: ["Tính ưu việt của ý tưởng", "Tính ưu việt của vật chất trên ý thức", "Bình đẳng của vật chất và tâm trí", "Sự tách biệt giữa tâm trí và cơ thể"], a: 1, explanation: "Chủ nghĩa Mác khẳng định vật chất tồn tại độc lập với ý thức." }
    ]
  },
  "2": {
    title: "Núi Khôn Ngoan",
    reward: "shield",
    questions: [
      { q: "Luật cơ bản của biện chứng là gì?", options: ["Sự thống nhất và đấu tranh của các đối lập", "Sự cân bằng vĩnh viễn", "Sự chắc chắn tuyệt đối", "Sự trì trệ của các lực lịch sử"], a: 0, explanation: "Mâu thuẫn là gốc rễ của mọi chuyển động và sức sống." }
    ]
  },
  "3": {
    title: "Thung Lũng Biện Chứng",
    reward: "helmet",
    questions: [
      { q: "Chủ nghĩa duy vật lịch sử xem sự phát triển của xã hội như thế nào?", options: ["Do các nhân vật tầm vóc lớn dẫn dắt", "Do ý chí thần thánh", "Do đấu tranh giai cấp và các yếu tố kinh tế", "Hoàn toàn ngẫu nhiên"], a: 2, explanation: "Cơ sở kinh tế tạo nên kết cấu của phần còn lại của xã hội." }
    ]
  },
  "4": {
    title: "Pháo Đài Cổ Xưa",
    reward: "armor",
    questions: [
      { q: "Mối quan hệ giữa 'cơ sở' và 'tầng trên tạo' là gì?", options: ["Tầng trên tạo quyết định cơ sở", "Cơ sở quyết định tầng trên tạo", "Chúng độc lập với nhau", "Chúng giống hệt nhau"], a: 1, explanation: "Cơ sở kinh tế quyết định tầng trên tạo ý thức hình thái." }
    ]
  },
  "5": {
    title: "Nhà Ngựa Hoàng Gia",
    reward: "horse",
    questions: [
      { q: "Theo Marx, 'thuốc phiện của nhân dân' là gì?", options: ["Truyền hình", "Tiền bạc", "Tôn giáo", "Quyền lực"], a: 2, explanation: "Marx dùng câu nói này để mô tả cách tôn giáo làm dịu cơn đau của áp bức." }
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

export default function Quiz() {
  const navigate = useNavigate();
  const { stageId } = useParams();
  const stageNum = stageId || "1";
  const stageNumber = parseInt(stageNum);
  
  const stage = quizData[stageNum];
  const isBoss = stage?.isBoss;

  const { hearts, loseHeart, addXp, unlockItem, completeStage, currentStage } = useGameStore();
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'reward' | 'gameover' | 'victory' | 'defeat'>('idle');
  
  const [dragonHp, setDragonHp] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);

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
      setDragonHp(h => Math.max(0, h - 1));
      setTimeout(() => {
          if (dragonHp - 1 <= 0) {
            completeStage(stageNumber);
            setStatus('victory');
            confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
            return;
        } else {
           if (currentQIndex < stage.questions.length - 1) {
             setCurrentQIndex(q => q + 1);
             setStatus('idle');
             setSelectedAns(null);
             setTimeLeft(30);
           }
        }
      }, 2000);
    } else {
      setTimeout(() => {
        if (stage.reward) unlockItem(stage.reward);
        setStatus('reward');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }, 1500);
    }
  };

  const handleWrong = () => {
    setStatus('wrong');
    loseHeart();
    setTimeout(() => {
       if (hearts > 1) {
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
    if (currentStage === parseInt(stageNum)) {
      completeStage(stageNumber);
    }
    navigate('/map');
  };

  if (status === 'gameover') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center text-white p-6">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-6xl mb-4"
        >
          💔
        </motion.div>
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-500 mb-4">Hết Sinh Mạng!</h1>
        <p className="text-slate-300 mb-8 text-lg">Vương quốc cần bạn học tập chăm chỉ hơn.</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/map')} 
          className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
        >
          Quay Lại Bản Đồ
        </motion.button>
      </div>
    );
  }

  if (status === 'victory') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center text-white p-6">
        <motion.div initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="text-8xl mb-4">🤴👸</motion.div>
        <h1 className="text-4xl font-black text-emerald-200 mb-4">Chúc mừng — Bạn đã giải cứu công chúa!</h1>
        <p className="text-slate-200 mb-8">Vương quốc được cứu. Cảm ơn anh hùng!</p>
        <div className="text-6xl mb-6">❤️</div>
        <div className="flex gap-4">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => navigate('/map')} className="px-6 py-3 rounded-xl bg-emerald-500 font-bold">Quay lại bản đồ</motion.button>
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => { useGameStore.getState().resetGame(); navigate('/'); }} className="px-6 py-3 rounded-xl bg-slate-800 border border-emerald-400 font-bold">Chơi lại</motion.button>
        </div>
      </div>
    );
  }

  if (status === 'defeat') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center text-white p-6">
        <motion.div initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="text-8xl mb-4">💔🤴👸</motion.div>
        <h1 className="text-4xl font-black text-rose-200 mb-4">Rất tiếc — Bạn đã thất bại</h1>
        <p className="text-slate-200 mb-8">Công chúa chưa được cứu lần này. Thử lại nhé!</p>
        <div className="text-6xl mb-6">💔</div>
        <div className="flex gap-4">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => navigate('/map')} className="px-6 py-3 rounded-xl bg-rose-500 font-bold">Quay lại bản đồ</motion.button>
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => { useGameStore.getState().resetGame(); navigate('/'); }} className="px-6 py-3 rounded-xl bg-slate-800 border border-rose-400 font-bold">Thử lại</motion.button>
        </div>
      </div>
    );
  }

  if (status === 'reward') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-600 via-amber-500 to-orange-600 flex flex-col items-center justify-center text-white p-6 overflow-hidden">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-8xl mb-6"
        >
          {stage.reward === 'sword' && '⚔️'}
          {stage.reward === 'shield' && '🛡️'}
          {stage.reward === 'helmet' && '⛑️'}
          {stage.reward === 'armor' && '🎽'}
          {stage.reward === 'horse' && '🐎'}
        </motion.div>
        <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">Vượt Qua Cấp!</h1>
        <p className="text-2xl text-amber-100 font-bold mb-12">Bạn đã mở khóa {stage.reward}!</p>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(251, 146, 60, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={finishStage} 
          className="bg-gradient-to-r from-amber-800 to-orange-800 text-amber-100 px-10 py-5 rounded-3xl font-black text-2xl shadow-xl hover:shadow-2xl transition-all uppercase tracking-wider border-2 border-amber-700"
        >
          Tiếp Tục Hành Trình
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col font-sans text-white relative">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <TopBar />
      
      <div className="flex-1 w-full max-w-3xl mx-auto p-4 flex flex-col relative z-10">
        
        {/* Header Area */}
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 uppercase tracking-wider">{stage.title}</h2>
           <motion.div 
             className={clsx(
               "flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xl",
               timeLeft < 10 ? "bg-gradient-to-r from-rose-500 to-rose-600 shadow-lg shadow-rose-500/50 animate-pulse" : "bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-blue-500/40 shadow-lg shadow-blue-500/20"
             )}
           >
             <Clock className="w-6 h-6" />
             {timeLeft}g
           </motion.div>
        </div>

        {/* Battle Arena View (if boss) */}
        {isBoss && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-6 mb-6 flex justify-between items-end relative overflow-hidden shadow-2xl shadow-blue-500/30 border-2 border-blue-500/40 h-48"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620023425028-2f7413a2e70e?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-20 mix-blend-overlay" />
            
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
                    className={clsx("w-8 h-8 rounded-full border-2 transition-all", i < dragonHp ? "bg-gradient-to-b from-rose-400 to-rose-600 border-rose-700 shadow-lg shadow-rose-500/50" : "bg-slate-700 border-slate-600")} 
                  />
                ))}
              </div>
              <motion.div 
                className="text-8xl drop-shadow-lg"
                animate={status === 'correct' ? { x: 30, rotate: 15, filter: 'brightness(1.2)', scale: 0.8 } : status === 'wrong' ? { scale: 1.15, skewX: 10 } : { y: [0, 15, 0], rotate: [-5, 5, -5] }}
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
            className="w-full h-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-full mb-8 overflow-hidden border-2 border-blue-500/40 shadow-lg"
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 w-full" 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}

        {/* Question Card */}
        <motion.div 
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl shadow-blue-500/30 border-2 border-blue-500/40 flex-1 flex flex-col"
          animate={status === 'wrong' ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
           <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-8 leading-snug">
             {question.q}
           </h3>

           <div className="space-y-3 flex-1">
             {question.options.map((opt: string, idx: number) => {
               const isSelected = selectedAns === idx;
               const isCorrectAnswer = idx === question.a;
               let btnClass = "border-blue-500/40 hover:border-blue-400 hover:bg-blue-500/10 text-slate-200";
               
               if (status !== 'idle') {
                 if (isCorrectAnswer) {
                   btnClass = "border-emerald-500 bg-emerald-500/20 text-emerald-300";
                 } else if (isSelected) {
                   btnClass = "border-rose-500 bg-rose-500/20 text-rose-300";
                 } else {
                   btnClass = "border-slate-700 bg-slate-700/20 text-slate-500 opacity-50";
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
                     "w-full text-left p-6 rounded-2xl border-2 font-bold text-lg transition-all flex items-center gap-4 group focus:outline-none",
                     btnClass,
                     status === 'idle' && "cursor-pointer"
                   )}
                 >
                   <div className={clsx(
                     "w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-base flex-shrink-0",
                     status === 'idle' ? "border-blue-400 group-hover:border-cyan-400 text-blue-400 group-hover:text-cyan-400" :
                     isCorrectAnswer ? "border-emerald-500 bg-emerald-500 text-white" :
                     isSelected ? "border-rose-500 bg-rose-500 text-white" : "border-slate-600"
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
                   "mt-8 p-6 rounded-2xl flex items-start gap-4",
                   status === 'correct' ? "bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500/40" : "bg-rose-500/20 text-rose-300 border-2 border-rose-500/40"
                 )}
               >
                 {status === 'correct' ? <Sparkles className="w-8 h-8 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-8 h-8 text-rose-400 shrink-0" />}
                 <div>
                   <h4 className="font-black text-xl mb-1">{status === 'correct' ? 'Tuyệt Vời!' : 'Ôi Không!'}</h4>
                   <p className="font-medium opacity-90">{question.explanation}</p>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
           
        </motion.div>
      </div>
    </div>
  );
}
