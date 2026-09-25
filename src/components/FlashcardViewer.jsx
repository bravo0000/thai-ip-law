import React, { useState, useMemo } from 'react';
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
  Volume2,
  Filter
} from 'lucide-react';
import { flashcardsData } from '../data/flashcardsData';

export default function FlashcardViewer({ onPlayAudio }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState({}); // { cardId: true/false }

  // Filter cards
  const filteredCards = useMemo(() => {
    if (selectedFilter === 'all') return flashcardsData;
    return flashcardsData.filter(c => c.category === selectedFilter);
  }, [selectedFilter]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filteredCards.length));
  };

  const markKnown = (isKnown) => {
    if (!currentCard) return;
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
    if (!onPlayAudio || !currentCard) return;
    const textToRead = isFlipped
      ? `เฉลยและหลักเกณฑ์ มาตรา ${currentCard.article}. ${currentCard.back}. ${currentCard.tip ? 'สูตรจำ: ' + currentCard.tip : ''}`
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
                Flashcards ท่องจำ 3 เสาหลักข้อสอบ (24 มาตราตามคำชี้แจงสอบ)
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              คลิกที่การ์ดเพื่อพลิกดูเฉลยและสูตรช่วยจำ หรือกดปุ่มลำโพงเพื่อฟังเสียงอ่านภาษาไทย
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" /> สุ่มการ์ด
            </button>
            <button
              onClick={resetProgress}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ต
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          {[
            { id: 'all', label: 'ทั้งหมด (24 ใบ)' },
            { id: 'q1', label: 'ข้อ 1: สิทธิบัตรการประดิษฐ์ (9 ใบ)' },
            { id: 'q2', label: 'ข้อ 2: การออกแบบ & สัญญาจ้าง (7 ใบ)' },
            { id: 'q3', label: 'ข้อ 3: เครื่องหมายการค้า (8 ใบ)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedFilter(tab.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedFilter === tab.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Learning Stats Bar */}
        <div className="flex items-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" /> จำได้แล้ว: {knownCount}
          </div>
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
            <RotateCw className="w-4 h-4" /> ต้องทบทวนซ้ำ: {reviewCount}
          </div>
          <div className="text-slate-400 dark:text-slate-500 ml-auto font-mono">
            การ์ดที่ {filteredCards.length > 0 ? currentIndex + 1 : 0} / {filteredCards.length}
          </div>
        </div>
      </div>

      {/* 3D Flashcard Container */}
      {currentCard && (
        <div className="perspective-1000">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full min-h-[360px] glass-card rounded-3xl p-8 cursor-pointer relative transition-all duration-300 transform-style-3d border shadow-lg hover:shadow-xl flex flex-col justify-between select-none ${
              isFlipped 
                ? 'border-purple-300 dark:border-purple-800/80 bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/70 dark:from-purple-950/40 dark:via-slate-900 dark:to-indigo-950/40' 
                : 'border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90'
            }`}
          >
            {/* Card Top Banner */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  {currentCard.categoryLabel}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {currentCard.article}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {onPlayAudio && (
                  <button
                    onClick={handlePlayCardAudio}
                    title="ฟังเสียงอ่านข้อความในการ์ด"
                    className="p-2 rounded-xl text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                )}
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" /> คลิกเพื่อพลิก
                </span>
              </div>
            </div>

            {/* Card Content Area */}
            <div className="my-8 flex flex-col justify-center items-center text-center px-4">
              {!isFlipped ? (
                <div className="space-y-4 animate-fadeIn">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    คำถามสำคัญ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug max-w-2xl">
                    {currentCard.front}
                  </h3>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    เฉลย & สาระสำคัญ
                  </span>
                  <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 whitespace-pre-line leading-relaxed max-w-2xl font-medium">
                    {currentCard.back}
                  </p>
                  {currentCard.tip && (
                    <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-center gap-2 text-left">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{currentCard.tip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Card Footer Indicators */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
              <span>{isFlipped ? "💡 ด้านหลัง (คำตอบ/สูตรจำ)" : "❓ ด้านหน้า (โจทย์คำถาม)"}</span>
              <span className="font-mono">{currentIndex + 1} / {filteredCards.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => markKnown(false)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCw className="w-4 h-4" /> ยังจำไม่ได้ (ทบทวนซ้ำ)
          </button>
          <button
            onClick={() => markKnown(true)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" /> จำได้แม่นยำแล้ว
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
            {currentIndex + 1} / {filteredCards.length}
          </span>
          <button
            onClick={handleNext}
            className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-md shadow-indigo-500/20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
}
