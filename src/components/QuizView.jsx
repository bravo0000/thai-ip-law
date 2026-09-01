import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { quizQuestions } from '../data/quizData';

export default function QuizView() {
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { qId: optionId }
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (qId, optionId) => {
    if (isSubmitted) return; // Prevent changing after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionId
    }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    if (score >= quizQuestions.length * 0.7) {
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
  const allAnswered = quizQuestions.every(q => selectedAnswers[q.id]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header & Result Banner */}
      <div className="glass-card rounded-2xl p-6 border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Mini Quiz: ประเมินความเข้าใจกฎหมายสิทธิบัตร
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              แบบทดสอบประเมินความรู้ 6 ข้อ คัดเลือกจากประเด็นที่มักออกข้อสอบบ่อยครั้ง
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

        {/* Score Summary Box (when submitted) */}
        {isSubmitted && (
          <div className={`mt-6 p-6 rounded-2xl border ${
            score >= quizQuestions.length * 0.7 
              ? 'bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border-emerald-300 dark:border-emerald-700' 
              : 'bg-amber-500/10 border-amber-300 dark:border-amber-700'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Award className="w-6 h-6 text-emerald-500" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    ผลการทดสอบของคุณ: {score} / {quizQuestions.length} คะแนน
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {score === quizQuestions.length 
                    ? '🎉 ยอดเยี่ยมมาก! คุณเข้าใจหลักเกณฑ์ พ.ร.บ. สิทธิบัตรอย่างถ่องแท้' 
                    : score >= 4 
                    ? '👍 เกณฑ์ดีมาก! ทบทวนจุดที่ตอบผิดอีกนิดเพื่อความแม่นยำเต็มร้อย' 
                    : '📖 ลองกลับไปอ่านสรุปและทบทวน Flashcards อีกครั้งเพื่อความเข้าใจที่ดียิ่งขึ้น'}
                </p>
              </div>

              <div className="text-2xl font-black px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border text-indigo-600 dark:text-indigo-400 font-mono">
                {Math.round((score / quizQuestions.length) * 100)}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quiz Question List */}
      <div className="space-y-6">
        {quizQuestions.map((q, index) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div 
              key={q.id}
              className={`glass-card rounded-2xl p-6 border transition-all ${
                isSubmitted
                  ? isCorrect 
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/10' 
                    : 'border-rose-300 dark:border-rose-800 bg-rose-50/10'
                  : 'hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Question Title */}
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {q.question}
                  </h3>
                  <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900">
                    อ้างอิง: {q.articleRef}
                  </span>
                </div>
              </div>

              {/* Options */}
              <div className="mt-4 space-y-2.5 pl-0 sm:pl-10">
                {q.options.map((option) => {
                  const isSelected = userAnswer === option.id;
                  const isThisCorrect = q.correctAnswer === option.id;

                  let optionStyle = "border-slate-200 dark:border-slate-800 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-300";
                  
                  if (isSelected && !isSubmitted) {
                    optionStyle = "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium ring-2 ring-indigo-500/20";
                  }

                  if (isSubmitted) {
                    if (isThisCorrect) {
                      optionStyle = "border-emerald-500 bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-semibold ring-2 ring-emerald-500/30";
                    } else if (isSelected && !isThisCorrect) {
                      optionStyle = "border-rose-500 bg-rose-100/80 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 font-semibold";
                    } else {
                      optionStyle = "opacity-50 border-slate-200 dark:border-slate-800";
                    }
                  }

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(q.id, option.id)}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {option.id}
                        </span>
                        <span>{option.text}</span>
                      </div>

                      {isSubmitted && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation (shown after submission) */}
              {isSubmitted && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-1 sm:pl-10">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    คำอธิบายเฉลย ({q.articleRef}):
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-100 dark:bg-slate-800/60 p-3 rounded-xl">
                    {q.explanation}
                  </p>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Submit Action */}
      {!isSubmitted && (
        <div className="sticky bottom-6 glass-panel p-4 rounded-2xl border shadow-xl flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            ตอบแล้ว <span className="font-bold text-slate-900 dark:text-white">{Object.keys(selectedAnswers).length}</span> จาก {quizQuestions.length} ข้อ
          </div>

          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition-all ${
              allAnswered
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            ส่งคำตอบเพื่อตรวจผล <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
