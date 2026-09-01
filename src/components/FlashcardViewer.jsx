import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  CheckCircle2, 
  RotateCcw, 
  Lightbulb,
  Sparkles,
  Volume2
} from 'lucide-react';
import { flashcardsData } from '../data/flashcardsData';

export default function FlashcardViewer({ onPlayAudio }) {
  const [cards, setCards] = useState(flashcardsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState({}); // { cardId: true/false }

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const markKnown = (isKnown) => {
    setKnownCards(prev => ({
      ...prev,
      [currentCard.id]: isKnown
    }));
    handleNext();
  };

  const resetProgress = () => {
    setKnownCards({});
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handlePlayCardAudio = (e) => {
    e.stopPropagation();
    if (!onPlayAudio) return;
    const textToRead = isFlipped
      ? `เฉลยและหลักเกณฑ์ มาตรา ${currentCard.article}. ${currentCard.back}. ${currentCard.tip ? 'ข้อสังเกต: ' + currentCard.tip : ''}`
      : `คำถาม: ${currentCard.front}. มาตราที่เกี่ยวข้อง ${currentCard.article}`;
    onPlayAudio(textToRead, `Flashcard: ${currentCard.categoryLabel}`);
  };

  const knownCount = Object.values(knownCards).filter(v => v === true).length;
  const reviewCount = Object.values(knownCards).filter(v => v === false).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header & Stats */}
      <div className="glass-card rounded-2xl p-6 border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Flashcards ท่องจำหลักเกณฑ์ & มาตราสำคัญ
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              คลิกที่การ์ดเพื่อพลิกดูเฉลย หรือกดปุ่มลำโพงเพื่อฟังเสียงอ่านฝึกความจำ
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" /> สับการ์ด
            </button>
            <button
              onClick={resetProgress}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ต
            </button>
          </div>
        </div>

        {/* Progress Counters */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
          <div className="text-slate-500">
            การ์ดที่ <span className="font-bold text-slate-900 dark:text-white">{currentIndex + 1}</span> จาก {cards.length}
          </div>
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> จำได้แล้ว: {knownCount}
          </div>
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
            <RotateCw className="w-3.5 h-3.5" /> ต้องทบทวน: {reviewCount}
          </div>
        </div>
      </div>

      {/* Interactive 3D Card */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-80 sm:h-96 cursor-pointer perspective-1000 select-none group relative"
      >
        <div className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front of Card */}
          <div className="absolute inset-0 backface-hidden glass-card rounded-3xl p-8 flex flex-col justify-between border-2 border-indigo-200 dark:border-indigo-800/80 shadow-lg bg-gradient-to-br from-white via-indigo-50/20 to-white dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
            <div className="flex items-center justify-between">
              <span className="text-xs px-3 py-1 font-semibold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {currentCard.categoryLabel} ({currentCard.article})
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayCardAudio}
                  title="ฟังเสียงอ่านคำถาม"
                  className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" /> แตะเพื่อพลิก
                </span>
              </div>
            </div>

            <div className="text-center px-4 space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-500">คำถาม / ประเด็นทดสอบ</span>
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentCard.front}
              </h3>
            </div>

            <div className="text-center text-xs text-slate-400">
              💡 คลิกเพื่อดูคำตอบและหลักมาตรา
            </div>
          </div>

          {/* Back of Card (Flipped) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-3xl p-8 flex flex-col justify-between border-2 border-emerald-300 dark:border-emerald-700/80 shadow-lg bg-gradient-to-br from-white via-emerald-50/20 to-white dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30">
            <div className="flex items-center justify-between">
              <span className="text-xs px-3 py-1 font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                เฉลยและหลักเกณฑ์ ({currentCard.article})
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayCardAudio}
                  title="ฟังเสียงอ่านเฉลย"
                  className="p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" /> แตะเพื่อพลิกกลับ
                </span>
              </div>
            </div>

            <div className="space-y-4 my-auto overflow-y-auto max-h-48 pr-2">
              <div className="text-sm sm:text-base text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed font-medium">
                {currentCard.back}
              </div>

              {currentCard.tip && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                  <span><strong>Tip สอบ:</strong> {currentCard.tip}</span>
                </div>
              )}
            </div>

            <div className="text-center text-xs text-slate-400">
              มาตราอ้างอิง: {currentCard.article}
            </div>
          </div>

        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> ก่อนหน้า
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            ถัดไป <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Self-Assessment Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => markKnown(false)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950 dark:hover:bg-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 transition-colors"
          >
            ยังจำไม่ได้ (ทบทวนอีกครั้ง)
          </button>
          <button
            onClick={() => markKnown(true)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all"
          >
            จำได้แล้วแม่นยำ ✅
          </button>
        </div>
      </div>

    </div>
  );
}
