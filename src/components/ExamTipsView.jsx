import React, { useState } from 'react';
import { 
  Flame, 
  AlertTriangle, 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  CheckCircle,
  Lightbulb
} from 'lucide-react';
import { caseStudies, examTipsList } from '../data/examTipsData';

export default function ExamTipsView() {
  const [revealedCases, setRevealedCases] = useState({});

  const toggleCase = (id) => {
    setRevealedCases(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 border">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
            <Flame className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            แนวคำพิพากษาฎีกา & ข้อสังเกตสำหรับการสอบ
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          วิเคราะห์ข้อเท็จจริงจำลอง (Hypothetical Cases) และระวังกับดักข้อสอบที่มักออกเป็นประจำ
        </p>
      </div>

      {/* Common Exam Traps */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          จุดหลอกและประเด็นต้องระวังในข้อสอบ (Exam Traps)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examTipsList.map((tip, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-2xl p-5 border border-amber-200 dark:border-amber-900/50 bg-amber-50/20 dark:bg-amber-950/20 space-y-2.5"
            >
              <div className="font-bold text-sm text-amber-900 dark:text-amber-300">
                {tip.title}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {tip.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-500" />
          กรณีศึกษาจำลองเทียบเคียงแนวฎีกา (Case Studies)
        </h3>

        <div className="space-y-4">
          {caseStudies.map((item) => {
            const isRevealed = revealedCases[item.id];

            return (
              <div 
                key={item.id}
                className="glass-card rounded-2xl p-6 border hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Scenario text */}
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl space-y-2">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">ข้อเท็จจริง: </span>
                    {item.scenario}
                  </div>
                  <div className="pt-2 text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    ประเด็นวินิจฉัย: {item.question}
                  </div>
                </div>

                {/* Reveal button */}
                <div>
                  <button
                    onClick={() => toggleCase(item.id)}
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                  >
                    {isRevealed ? (
                      <>
                        <ChevronUp className="w-4 h-4" /> ซ่อนแนวคำวินิจฉัย
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" /> แตะเพื่อดูแนวคำวินิจฉัย & เหตุผลทางกฎหมาย
                      </>
                    )}
                  </button>
                </div>

                {/* Revealed Answer Box */}
                {isRevealed && (
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm space-y-3">
                    <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300">
                      <CheckCircle className="w-4 h-4" />
                      ธงคำตอบ: {item.verdict}
                    </div>

                    <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong>เหตุผลและการปรับใช้บทกฎหมาย:</strong> {item.reasoning}
                    </div>

                    <div className="flex items-center gap-1.5 pt-1 text-[11px]">
                      <span className="font-semibold text-slate-500">มาตราที่เกี่ยวข้อง:</span>
                      {item.keyArticles.map((art, idx) => (
                        <span key={idx} className="font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                          {art}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
