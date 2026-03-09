/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, User, ChevronRight, ChevronLeft, RefreshCw, Moon, Star, Compass } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { TAROT_CARDS, TarotCard } from './constants';

// --- Types ---
type Step = 'intro' | 'input' | 'selection' | 'loading' | 'interpretation' | 'fortune';

interface UserData {
  name: string;
  gender: string;
  question: string;
}

interface SelectedCard {
  card: TarotCard;
  isReversed: boolean;
}

// --- Components ---

const StarryBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#0f0a1f] overflow-hidden">
      {/* Aurora Glows */}
      <motion.div 
        animate={{ 
          x: ['-25%', '25%', '-25%'],
          y: ['-15%', '15%', '-15%'],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] aurora-glow animate-aurora"
      />
      <motion.div 
        animate={{ 
          x: ['25%', '-25%', '25%'],
          y: ['15%', '-15%', '15%'],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] -right-[20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.25),transparent_70%)] blur-[120px]"
      />
      
      {/* Floating Mysterious Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 border border-purple-500/5 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              scale: 0.5 + Math.random()
            }}
            animate={{ 
              rotate: 360,
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 50 + i * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-25" />

      {/* Animated Stars */}
      {Array.from({ length: 150 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: Math.random() * 0.4 + 0.1,
            opacity: Math.random() * 0.8 + 0.2,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: '1.5px',
            height: '1.5px',
          }}
        />
      ))}
    </div>
  );
};

const IntroSection = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "“欢迎来到小汤的神奇塔罗屋”",
    "“塔罗：连接潜意识与宇宙的桥梁”",
    "“不只是占卜，更是心灵的镜子”",
    "“通过78张神秘图腾，洞察过去、现在与未来”",
    "“现在，请深呼吸，放空杂念...”",
    "“准备好开启你的命运之门了吗？”"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => {
        if (prev === texts.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6 bg-purple-900/10 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        key={textIndex}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <h1 className="text-xl md:text-2xl font-serif font-light text-white leading-relaxed tracking-[0.6em] uppercase">
          {texts[textIndex]}
        </h1>
      </motion.div>
      <div className="absolute bottom-24">
        <motion.div 
          animate={{ height: [0, 40, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-[1px] bg-white/40 rounded-full"
        />
      </div>
    </motion.div>
  );
};

const InputForm = ({ onSubmit }: { onSubmit: (data: UserData) => void, key?: string }) => {
  const [formData, setFormData] = useState<UserData>({ name: '', gender: 'UNKNOWN', question: '' });

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-md bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-2xl font-serif text-white tracking-[0.4em] mb-2">命运的交汇</h2>
          <p className="text-[10px] text-purple-400 tracking-[0.6em] uppercase">Intersection of Fate</p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mt-6" />
        </div>
        
        <div className="space-y-10">
          <div>
            <label className="block text-sm font-light text-white mb-4 tracking-[0.2em]">你的称呼</label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border-b border-white/30 px-4 py-3 text-base text-white focus:outline-none focus:border-purple-400 transition-all placeholder:text-white/20"
              placeholder="如何称呼迷途的灵魂..."
            />
          </div>

          <div>
            <label className="block text-sm font-light text-white mb-4 tracking-[0.2em]">你的能量属性</label>
            <div className="flex gap-4">
              {['阳性', '阴性', '中性'].map((g) => (
                <button
                  key={g}
                  onClick={() => setFormData({ ...formData, gender: g })}
                  className={`flex-1 py-3 text-xs tracking-[0.3em] transition-all rounded-xl border ${
                    formData.gender === g 
                    ? 'bg-purple-500/30 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' 
                    : 'bg-transparent border-white/10 text-white/40 hover:border-white/30'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-light text-white mb-4 tracking-[0.2em]">你此刻的困惑</label>
            <textarea 
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-base text-white focus:outline-none focus:border-purple-400 transition-all h-36 resize-none placeholder:text-white/20"
              placeholder="向星空诉说你的迷茫..."
            />
          </div>

          <button
            onClick={() => formData.name && formData.question && onSubmit(formData)}
            disabled={!formData.name || !formData.question}
            className="w-full group relative overflow-hidden bg-purple-600/20 border border-purple-500/40 py-5 rounded-2xl text-sm tracking-[0.8em] uppercase text-white hover:bg-purple-500 hover:text-black transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(139,92,246,0.2)]"
          >
            开启命运之门
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CardSelection = ({ onSelect }: { onSelect: (cards: SelectedCard[]) => void, key?: string }) => {
  const [isShuffling, setIsShuffling] = useState(true);
  const [selectedIds, setSelectedIds] = useState<{id: number, isReversed: boolean}[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShuffling(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const toggleCard = (id: number) => {
    if (isShuffling) return;
    if (selectedIds.find(item => item.id === id)) {
      setSelectedIds(selectedIds.filter(item => item.id !== id));
    } else if (selectedIds.length < 3) {
      // Randomly decide if the card is reversed (50% chance)
      const isReversed = Math.random() > 0.5;
      setSelectedIds([...selectedIds, { id, isReversed }]);
    }
  };

  useEffect(() => {
    if (selectedIds.length === 3) {
      setTimeout(() => {
        const selected = selectedIds.map(item => ({
          card: TAROT_CARDS.find(c => c.id === item.id)!,
          isReversed: item.isReversed
        }));
        onSelect(selected);
      }, 1000);
    }
  }, [selectedIds]);

  const CardBack = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#0a0514] to-[#2d1b4d] rounded-xl overflow-hidden border border-purple-400/40 shadow-[0_0_20px_rgba(139,92,246,0.3)] ${className}`}>
      <div className="absolute inset-0 opacity-40">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Intricate Geometric Pattern */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-36 h-36 border border-purple-500/10 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-28 h-28 border border-purple-400/20 rounded-full"
          />
          <div className="absolute w-20 h-20 border border-purple-300/30 rounded-full" />
          
          {/* Cross lines */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent rotate-45" />
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent -rotate-45" />
          <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          
          {/* Corner Ornaments */}
          {[0, 90, 180, 270].map(deg => (
            <div key={deg} style={{ transform: `rotate(${deg}deg) translateY(-80px)` }} className="absolute">
              <Star className="w-2 h-2 text-purple-400/40" />
            </div>
          ))}

          {/* Center Sigil */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 border border-purple-400/50 rotate-45" 
            />
            <Moon className="text-purple-300 w-6 h-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
          </div>
        </div>
      </div>
      
      {/* Decorative Border */}
      <div className="absolute inset-2 border border-purple-500/10 rounded-lg pointer-events-none" />
      
      <div className="absolute bottom-4 left-0 right-0 text-center text-[7px] font-mono text-purple-400/40 uppercase tracking-[0.6em]">
        ARCANE REVELATION
      </div>
    </div>
  );

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center mb-16 relative z-20">
        <h2 className="text-xs font-mono text-white/60 tracking-[0.8em] uppercase mb-4">
          {isShuffling ? "频率校准中" : "选择三张牌"}
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-white/10" />
          <span className="text-[10px] font-mono text-white/30 tracking-widest">
            {isShuffling ? "稳定中..." : `数据点: ${selectedIds.length} / 3`}
          </span>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>
      </div>

      <div className="relative w-full flex items-center justify-center h-[450px] cursor-grab active:cursor-grabbing">
        <AnimatePresence mode="wait">
          {isShuffling ? (
            <motion.div 
              key="shuffling-deck"
              className="relative w-40 h-64"
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{ x: 0, y: 0, rotate: 0 }}
                  animate={{ 
                    x: [0, (i % 2 === 0 ? 220 : -220), 0],
                    y: [0, (i % 3 === 0 ? 80 : -80), 0],
                    rotate: [0, (i % 2 === 0 ? 45 : -45), 0],
                    zIndex: [i, 30, i]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.08,
                    ease: "easeInOut"
                  }}
                >
                  <CardBack className="shadow-[0_0_20px_rgba(168,85,247,0.15)]" />
                  {/* Shuffling Sparkle Effect */}
                  <motion.div 
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400/30" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="selection-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full flex items-center"
            >
              <motion.div 
                drag="x"
                dragConstraints={{ left: -16000, right: 0 }}
                className="flex gap-8 px-[50vw] items-center"
                style={{ touchAction: 'none' }}
              >
                {TAROT_CARDS.map((card) => (
                  <motion.div
                    key={card.id}
                    onClick={() => toggleCard(card.id)}
                    whileHover={{ y: -15, scale: 1.02 }}
                    className={`flex-shrink-0 w-40 h-64 rounded-xl cursor-pointer relative transition-all duration-500 ${
                      selectedIds.find(item => item.id === card.id) 
                      ? 'ring-2 ring-purple-400 shadow-[0_0_50px_rgba(168,85,247,0.6)] scale-105 -translate-y-4' 
                      : 'ring-1 ring-white/10 hover:ring-purple-500/40'
                    }`}
                  >
                    <CardBack />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const MagicBallLoading = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen">
      <div className="relative w-64 h-64">
        {/* Outer Glow - Enhanced */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-purple-600/30 rounded-full blur-[60px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-4 bg-purple-400/20 rounded-full blur-[40px]"
        />
        
        {/* Magic Ball Sphere */}
        <div className="absolute inset-0 rounded-full border border-white/30 bg-black/60 backdrop-blur-xl overflow-hidden shadow-[inset_0_0_80px_rgba(168,85,247,0.5),0_0_40px_rgba(168,85,247,0.3)]">
          {/* Internal Swirling Energy - Plasma Style */}
          <div className="absolute inset-0">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20%] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.4),transparent_60%)] opacity-60"
            />
            <motion.div
              animate={{ 
                rotate: [360, 0],
                scale: [1.2, 1, 1.2],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20%] bg-[conic-gradient(from_0deg,transparent,rgba(139,92,246,0.3),transparent,rgba(192,132,252,0.2),transparent)] opacity-50"
            />
          </div>
          
          {/* Core Pulsing Light */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.9, 0.4],
                boxShadow: [
                  '0 0 20px rgba(168,85,247,0.3)',
                  '0 0 60px rgba(168,85,247,0.6)',
                  '0 0 20px rgba(168,85,247,0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 bg-white/10 rounded-full blur-xl border border-white/20"
            />
          </div>

          {/* Liquid Flow Effect */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              animate={{ 
                x: ['-10%', '10%', '-10%'],
                y: ['-5%', '5%', '-5%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/water.png')] filter invert"
            />
          </div>

          {/* Surface Reflection */}
          <div className="absolute top-6 left-10 w-16 h-8 bg-white/20 rounded-[50%] rotate-[-35deg] blur-[3px]" />
        </div>
        
        {/* Orbiting Rings - More dynamic */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 6, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
          className="absolute -inset-6 border border-purple-500/20 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.08, 1] }}
          transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }}
          className="absolute -inset-12 border border-white/10 rounded-full"
        />
      </div>
      
      <motion.p 
        animate={{ opacity: [0.4, 1, 0.4], letterSpacing: ['0.6em', '1em', '0.6em'] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mt-20 text-purple-300 font-mono tracking-[0.8em] uppercase text-[11px] drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
      >
        宇宙数据同步中...
      </motion.p>
    </div>
  );
};

const InterpretationView = ({ userData, selectedCards, onNext }: { userData: UserData, selectedCards: SelectedCard[], onNext: () => void, key?: string }) => {
  const [interpretation, setInterpretation] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const getSuitColor = (suit?: string) => {
    switch (suit) {
      case 'Wands': return 'text-orange-400';
      case 'Cups': return 'text-blue-400';
      case 'Swords': return 'text-slate-300';
      case 'Pentacles': return 'text-emerald-400';
      default: return 'text-purple-400';
    }
  };

  useEffect(() => {
    const fetchInterpretation = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
        const prompt = `
          你是一位精通宇宙奥秘的高级占卜师。
          求问者：${userData.name}，能量属性：${userData.gender}
          求问事项：${userData.question}
          所选牌阵（按过去、现在、未来的顺序）：
          ${selectedCards.map((item, i) => `${i+1}. ${item.card.name} (${item.isReversed ? '逆位' : '正位'}) - 核心含义：${item.card.meaning}`).join('\n')}

          请针对求问者的具体问题“${userData.question}”，提供深度且具有启发性的解读。
          
          要求：
          1. 必须根据牌面的正逆位进行解读。逆位通常代表能量的阻塞、内在的转化或延迟。
          2. 解读必须紧扣求问者的问题，给出实质性的建议。
          
          结构：
          一、 牌阵解析（过去、现在、未来）
             - 逐一解读每张牌，明确说明正逆位，并结合求问者的问题解释其深层含义。
          二、 综合解读与问题回答
             - 综合三张牌的能量，直接回答求问者的困惑。
          三、 宇宙启示与建议
             - 给出具体的行动指南。

          语气：神秘、客观、专业且富有同理心。
          重要：仅使用纯文本。禁止使用任何 Markdown 符号（如 *、#、-、> 等）。
          使用清晰的换行符来分隔段落。
          语言：中文。
        `;

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
        });

        // Clean up any stray markdown symbols
        const cleanText = (response.text || 'Connection lost...').replace(/[*#\-_~`]/g, '');
        setInterpretation(cleanText);
      } catch (error) {
        console.error(error);
        setInterpretation('Data corruption detected. Unable to retrieve cosmic insights.');
      } finally {
        setLoading(false);
      }
    };

    fetchInterpretation();
  }, []);

  if (loading) return <MagicBallLoading />;

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center min-h-screen px-6 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl w-full">
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
          <div className="flex flex-col">
            <h2 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-2">分析报告</h2>
            <h1 className="text-lg font-serif text-white tracking-[0.2em] uppercase">宇宙综合分析</h1>
          </div>
          <div className="text-right">
            <div className="text-[8px] font-mono text-white/20 uppercase">时间戳: {new Date().toISOString()}</div>
            <div className="text-[8px] font-mono text-white/20 uppercase">主体: {userData.name}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {selectedCards.map((item, idx) => (
            <motion.div 
              key={item.card.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="relative group p-1 ring-1 ring-white/10 bg-black/40 backdrop-blur-sm">
                <motion.img 
                  src={item.card.image} 
                  alt={item.card.name} 
                  referrerPolicy="no-referrer"
                  initial={{ rotate: item.isReversed ? 180 : 0 }}
                  className="w-32 h-52 object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 rounded-sm"
                />
                <div className="absolute -top-2 -left-2 text-[8px] font-mono bg-black px-1 text-white/40 border border-white/10">
                  0{idx + 1}
                </div>
                {item.isReversed && (
                  <div className="absolute bottom-2 right-2 text-[8px] font-mono bg-purple-900/80 px-1 text-purple-200 border border-purple-500/30">
                    REVERSED
                  </div>
                )}
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-[10px] font-mono text-white tracking-[0.3em] uppercase mb-1">{item.card.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className={`text-[8px] font-mono uppercase tracking-widest ${getSuitColor(item.card.suit)}`}>
                    {item.card.arcana === 'Major' ? 'Major Arcana' : item.card.suit}
                  </span>
                  <span className="text-[8px] text-white/20">|</span>
                  <span className={`text-[8px] font-mono uppercase tracking-widest ${item.isReversed ? 'text-purple-400' : 'text-blue-300'}`}>
                    {item.isReversed ? '逆位' : '正位'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white/[0.02] border border-white/5 p-12 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
          
          <div className="interpretation-text text-white/80 whitespace-pre-wrap text-xs md:text-sm leading-relaxed">
            {interpretation}
          </div>
          
          <div className="mt-16 flex justify-center">
            <button
              onClick={onNext}
              className="group relative overflow-hidden border border-purple-500/30 px-12 py-4 text-[10px] tracking-[0.5em] uppercase text-white hover:bg-purple-500 hover:text-black transition-all shadow-[0_0_20px_rgba(139,92,246,0.1)]"
            >
              获取最终启示
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FortuneQuote = () => {
  const [quote, setQuote] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bgSeed, setBgSeed] = useState(Math.floor(Math.random() * 1000));

  const revealQuote = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate a single, powerful, and mysterious tarot-style fortune quote (one sentence). Language: Chinese. No markdown.",
      });
      setQuote(response.text?.replace(/[*#\-_~`]/g, '') || '星辰在寂静中低语。');
      setIsRevealed(true);
    } catch (error) {
      console.error(error);
      setQuote('命运的丝线，始终握在你自己手中。');
      setIsRevealed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen px-6 overflow-hidden">
      {isRevealed && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-110"
            style={{ 
              backgroundImage: `url('https://picsum.photos/seed/galaxy-${bgSeed}/1920/1080?blur=2')`,
              filter: 'hue-rotate(280deg) brightness(0.8)' // Shift towards purple
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a1f]/80 via-transparent to-[#0f0a1f]/80" />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="ball"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="flex flex-col items-center relative z-10"
          >
            <h2 className="text-sm font-serif text-white tracking-[0.5em] mb-12">触碰命运的终章</h2>
            <button 
              onClick={revealQuote}
              className="relative w-48 h-48 group"
            >
              <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-all" />
              <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-spin-slow" />
              <div className="absolute inset-6 rounded-full border border-purple-500/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-20 h-20 bg-purple-500/5 rounded-full flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/40 transition-all ${loading ? 'animate-pulse' : ''}`}>
                  <Sparkles className="text-purple-400/60 w-8 h-8" />
                </div>
              </div>
            </button>
            <p className="mt-12 text-[10px] font-mono text-purple-400/40 tracking-[0.8em] uppercase">灵魂共鸣中</p>
          </motion.div>
        ) : (
          <motion.div
            key="quote"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl relative z-10"
          >
            <div className="mb-12 flex justify-center">
              <div className="h-[1px] w-32 bg-purple-500/20" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif text-white tracking-[0.3em] leading-relaxed mb-16 px-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              “{quote}”
            </h3>
            <div className="h-[1px] w-32 bg-purple-500/20 mx-auto mb-16" />
            
            <button 
              onClick={() => window.location.reload()}
              className="bg-purple-500/20 border border-purple-500/40 px-12 py-4 rounded-full text-xs tracking-[0.5em] uppercase text-white hover:bg-purple-500 hover:text-black transition-all flex items-center gap-3 mx-auto shadow-[0_0_30px_rgba(139,92,246,0.3)] backdrop-blur-md"
            >
              <RefreshCw className="w-4 h-4" /> 再次启程
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [step, setStep] = useState<Step>('intro');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
      <StarryBackground />
      
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <IntroSection key="intro" onComplete={() => setStep('input')} />
        )}
        
        {step === 'input' && (
          <InputForm 
            key="input" 
            onSubmit={(data) => {
              setUserData(data);
              setStep('selection');
            }} 
          />
        )}
        
        {step === 'selection' && (
          <CardSelection 
            key="selection" 
            onSelect={(cards) => {
              setSelectedCards(cards);
              setStep('loading');
              setTimeout(() => setStep('interpretation'), 4000);
            }} 
          />
        )}
        
        {step === 'loading' && (
          <MagicBallLoading key="loading" />
        )}
        
        {step === 'interpretation' && userData && (
          <InterpretationView 
            key="interpretation" 
            userData={userData} 
            selectedCards={selectedCards} 
            onNext={() => setStep('fortune')}
          />
        )}

        {step === 'fortune' && (
          <FortuneQuote key="fortune" />
        )}
      </AnimatePresence>

      {/* NASA-style HUD elements */}
      <div className="fixed top-6 left-6 z-50 pointer-events-none opacity-40 hidden md:block">
        <div className="text-[10px] font-mono tracking-tighter text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
            <span>系统状态：正常</span>
          </div>
          <div>坐标: 37.7749° N, 122.4194° W</div>
          <div>信号强度: 98.4%</div>
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none opacity-40 hidden md:block">
        <div className="text-[10px] font-mono tracking-tighter text-white/60 text-right">
          <div>神秘引擎_V3.0</div>
          <div>数据流：已加密</div>
          <div>时间戳: {new Date().toISOString()}</div>
        </div>
      </div>
    </div>
  );
}
