import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  AlertTriangle, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  CheckCircle2,
  Lightbulb,
  FileText,
  Target
} from 'lucide-react';
import { caseStudies, examTipsList } from '../data/examTipsData';

export default function ExamTipsView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [revealedCases, setRevealedCases] = useState({
    "irac-q1-sea-walker": true,
    "irac-q2-grace-period-trap": true
  });

  const filteredCases = useMemo(() => {
    if (selectedCategory === 'all') return caseStudies;
    return caseStudies.filter(c => c.category === selectedCategory);
  }, [selectedCategory]);

  const toggleCase = (id) => {
    setRevealedCases(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-rose-100 dark:border-rose-900/50 bg-gradient-to-br from-rose-50/60 via-white to-orange-50/40 dark:from-rose-950/30 dark:via-slate-900 dark:to-orange-950/20">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
            <Flame className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            ข้อสอบตุ๊กตา IRAC & แนวคำพิพากษาศาลฎีกา
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          ฝึกเขียนตอบข้อสอบอัตนัย 4 ย่อหน้า: I - Issue (ประเด็น) ➔ R - Rule (หลักกฎหมาย) ➔ A - Application (ปรับบท) ➔ C - Conclusion (ฟันธง)
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800">
          {[
            { id: 'all', label: `ทุกข้อสอบ (${caseStudies.length} ข้อ)` },
            { id: 'q1', label: `ข้อ 1: สิทธิบัตรการประดิษฐ์ (${caseStudies.filter(c => c.category === 'q1').length} ข้อ)` },
            { id: 'q2', label: `ข้อ 2: การออกแบบ & สัญญาจ้าง (${caseStudies.filter(c => c.category === 'q2').length} ข้อ)` },
            { id: 'q3', label: `ข้อ 3: เครื่องหมายการค้า (${caseStudies.filter(c => c.category === 'q3').length} ข้อ)` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedCategory === tab.id
                  ? 'bg-rose-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Common Exam Traps */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          จุดหลอกและประเด็นต้องระวังในข้อสอบ (Exam Traps)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examTipsList.map((tip, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-2xl p-5 border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/20 space-y-2"
            >
              <div className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{tip.title}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {tip.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies & IRAC Answers */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-500" />
          ข้อสอบตุ๊กตาจำลองเทียบเคียงแนวฎีกา & โครงสร้าง IRAC
        </h3>

        <div className="space-y-6">
          {filteredCases.map((item) => {
            const isRevealed = revealedCases[item.id];

            return (
              <div 
                key={item.id}
                className="glass-card rounded-2xl p-6 border transition-all space-y-4 border-slate-200 dark:border-slate-800"
              >
                {/* Case Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-semibold">
                      {item.categoryLabel}
                    </span>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-1 self-start sm:self-auto">
                    {item.keyArticles.map((art, aIdx) => (
                      <span key={aIdx} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                        {art}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scenario */}
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800/60">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">ข้อเท็จจริงในโจทย์: </span>
                    {item.scenario}
                  </div>
                  <div className="pt-2 text-indigo-700 dark:text-indigo-300 font-semibold flex items-center gap-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                    <Target className="w-4 h-4 text-indigo-500" />
                    <span>คำถาม: {item.question}</span>
                  </div>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => toggleCase(item.id)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 dark:text-indigo-300 text-xs font-bold transition-colors"
                >
                  <span>{isRevealed ? "ซ่อนแนวการเขียนตอบแบบ IRAC" : "ดูแนวการเขียนตอบข้อสอบอัตนัยตามสูตร IRAC (ธงคำตอบ)"}</span>
                  {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* IRAC Breakdown */}
                {isRevealed && item.irac && (
                  <div className="space-y-3 pt-2 animate-fadeIn">
                    
                    {/* I - Issue */}
                    <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-1">
                      <div className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[11px]">I</span>
                        <span>Issue (การตั้งประเด็นข้อพิพาท)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed pl-6">
                        {item.irac.issue}
                      </p>
                    </div>

                    {/* R - Rule */}
                    <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 space-y-1">
                      <div className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[11px]">R</span>
                        <span>Rule (การยกหลักตัวบทกฎหมาย)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed pl-6 whitespace-pre-line">
                        {item.irac.rule}
                      </p>
                    </div>

                    {/* A - Application */}
                    <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-1">
                      <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[11px]">A</span>
                        <span>Application (การปรับบทกฎหมายเข้ากับข้อเท็จจริง)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed pl-6 whitespace-pre-line">
                        {item.irac.application}
                      </p>
                    </div>

                    {/* C - Conclusion */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
                      <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[11px]">C</span>
                        <span>Conclusion (บทสรุป / ฟันธงคำตอบ)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold leading-relaxed pl-6">
                        {item.irac.conclusion}
                      </p>
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
