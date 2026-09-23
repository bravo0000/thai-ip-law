import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles,
  ArrowRight,
  BookOpen,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { quizQuestions } from '../data/quizData';

export default function QuizView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { qId: optionId }
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter questions based on category
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return quizQuestions;
    return quizQuestions.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);

  const handleSelectOption = (qId, optionId) => {
    if (isSubmitted) return; // Prevent changing after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionId
    }));
  };

  const calculateScore = () => {
    let score = 0;
    filteredQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    if (score >= filteredQuestions.length * 0.7) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = filteredQuestions.length > 0 && filteredQuestions.every(q => selectedAnswers[q.id]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header & Result Banner */}
      <div className="glass-card rounded-2xl p-6 border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Mini Quiz: แบบทดสอบเจาะลึก 3 เสาหลักข้อสอบ
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              แบบทดสอบคัดเลือกประเด็นหลอกยอดฮิต เพื่อเตรียมพร้อมเข้าห้องสอบ 26 ก.ย. 69
            </p>
          </div>

          {isSubmitted && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" /> ทำใหม่อีกครั้ง
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          {[
            { id: 'all', label: `ทั้งหมด (${quizQuestions.length} ข้อ)` },
            { id: 'q1', label: `ข้อ 1: สิทธิบัตรการประดิษฐ์ (${quizQuestions.filter(q => q.category === 'q1').length} ข้อ)` },
            { id: 'q2', label: `ข้อ 2: การออกแบบ & สัญญาจ้าง (${quizQuestions.filter(q => q.category === 'q2').length} ข้อ)` },
            { id: 'q3', label: `ข้อ 3: เครื่องหมายการค้า (${quizQuestions.filter(q => q.category === 'q3').length} ข้อ)` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedCategory(tab.id);
                setIsSubmitted(false);
              }}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedCategory === tab.id
                  ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Score Summary Box (when submitted) */}
        {isSubmitted && (
          <div className={`mt-6 p-6 rounded-2xl border ${
            score >= filteredQuestions.length * 0.7 
              ? 'bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border-emerald-300 dark:border-emerald-700' 
              : 'bg-amber-500/10 border-amber-300 dark:border-amber-700'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Award className="w-6 h-6 text-emerald-500" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    ผลการทดสอบ: {score} / {filteredQuestions.length} คะแนน ({Math.round((score / filteredQuestions.length) * 100)}%)
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {score === filteredQuestions.length 
                    ? "🎉 ยอดเยี่ยมมาก! ท่านเข้าใจหลักเกณฑ์และประเด็นสำคัญครบถ้วน 100%" 
                    : score >= filteredQuestions.length * 0.7
                    ? "👍 ทำได้ดีมาก! ผ่านเกณฑ์ความพร้อม แนะนำให้อ่านคำอธิบายในข้อที่ตอบผิดเพิ่มเติม"
                    : "📖 ควรทบทวนเนื้อหาและ Flashcards อีกครั้ง โดยเฉพาะประเด็นข้อสังเกตและตัวบทมาตรา"}
                </p>
              </div>

              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md"
              >
                ลองทำใหม่อีกครั้ง
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const isAnswered = !!selectedAnswers[q.id];
          const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

          return (
            <div 
              key={q.id}
              className={`glass-card rounded-2xl p-6 border transition-all ${
                isSubmitted 
                  ? isCorrect 
                    ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/20 dark:bg-emerald-950/20' 
                    : 'border-rose-300 dark:border-rose-800/80 bg-rose-50/20 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {q.categoryLabel}
                  </span>
                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                    {q.articleRef}
                  </span>
                </div>

                {isSubmitted && (
                  <div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> ถูกต้อง
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                        <XCircle className="w-4 h-4" /> ไม่ถูกต้อง
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Question Body */}
              <p className="text-base font-semibold text-slate-900 dark:text-white mb-5 leading-relaxed">
                {q.question}
              </p>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((option) => {
                  const isSelected = selectedAnswers[q.id] === option.id;
                  const isThisOptionCorrect = option.id === q.correctAnswer;

                  let optionStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60';
                  
                  if (!isSubmitted && isSelected) {
                    optionStyle = 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 font-medium';
                  }

                  if (isSubmitted) {
                    if (isThisOptionCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-medium';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-rose-500 bg-rose-100/70 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 line-through';
                    } else {
                      optionStyle = 'opacity-60 border-slate-200 dark:border-slate-800';
                    }
                  }

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(q.id, option.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border text-sm cursor-pointer transition-all ${optionStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected 
                          ? isSubmitted 
                            ? isThisOptionCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                            : 'bg-indigo-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {option.id}
                      </span>
                      <span className="flex-1 leading-relaxed">
                        {option.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Explanation (revealed after submission) */}
              {isSubmitted && (
                <div className="mt-5 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 animate-fadeIn">
                  <div className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>คำอธิบายเฉลยและหลักกฎหมาย ({q.articleRef})</span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-line">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button Bar */}
      {!isSubmitted && (
        <div className="flex items-center justify-between p-4 glass-card rounded-2xl border">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            ตอบแล้ว {Object.keys(selectedAnswers).length} / {filteredQuestions.length} ข้อ
          </span>
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all ${
              allAnswered 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20 cursor-pointer' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            ส่งคำตอบและตรวจผล
          </button>
        </div>
      )}

    </div>
  );
}
