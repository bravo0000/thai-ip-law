import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  BookOpen, 
  Scale, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Volume2
} from 'lucide-react';

export default function PatentSection({ 
  category, 
  completedSteps, 
  toggleStepComplete,
  onOpenArticleModal,
  onPlayAudio
}) {
  const [expandedSteps, setExpandedSteps] = useState({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
    6: false
  });
  const [copiedId, setCopiedId] = useState(null);

  const toggleAccordion = (stepNum) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  const expandAll = () => {
    const all = {};
    category.steps.forEach(s => all[s.step] = true);
    setExpandedSteps(all);
  };

  const collapseAll = () => {
    const none = {};
    category.steps.forEach(s => none[s.step] = false);
    setExpandedSteps(none);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to compile step text for reading
  const handleReadStep = (e, step) => {
    e.stopPropagation();
    if (!onPlayAudio) return;
    const allDetails = step.details.map(d => `${d.title} ${d.content}`).join('. ');
    const fullText = `${step.stepName}. มาตรา ${step.article}. ${step.summary}. ${allDetails}`;
    onPlayAudio(fullText, `${category.title}: ${step.stepName}`);
  };

  const handleReadDetail = (e, detail, stepName) => {
    e.stopPropagation();
    if (!onPlayAudio) return;
    onPlayAudio(`${detail.title}. ${detail.content}`, detail.title);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden border">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {category.title}
              </h2>
              <span className={`text-xs px-3 py-1 font-semibold rounded-full border ${category.badgeColor}`}>
                {category.badge}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {category.description}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">มาตราหลัก:</span>
              {category.coreArticles.map((art, idx) => (
                <span 
                  key={idx}
                  onClick={() => onOpenArticleModal && onOpenArticleModal(art)}
                  className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
                >
                  {art}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={expandAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              ขยายทั้งหมด
            </button>
            <button
              onClick={collapseAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              ย่อทั้งหมด
            </button>
          </div>
        </div>
      </div>

      {/* 6 Steps Content Flow */}
      <div className="space-y-4">
        {category.steps.map((step) => {
          const stepKey = `${category.id}-step-${step.step}`;
          const isCompleted = completedSteps.includes(stepKey);
          const isExpanded = expandedSteps[step.step];

          return (
            <div 
              key={step.step}
              className={`glass-card rounded-2xl transition-all duration-200 border ${
                isCompleted 
                  ? 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/20 dark:bg-emerald-950/10' 
                  : 'hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Accordion Header */}
              <div 
                className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                onClick={() => toggleAccordion(step.step)}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Step Number Badge */}
                  <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-sm shadow-sm ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300'
                  }`}>
                    {step.step}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                        {step.stepName}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono border border-indigo-100 dark:border-indigo-900">
                        {step.article}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {step.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  
                  {/* Audio Listen Button for the whole step */}
                  <button
                    type="button"
                    onClick={(e) => handleReadStep(e, step)}
                    title="อ่านออกเสียงทั้งขั้นตอนนี้"
                    className="p-2 rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Mark as Complete Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStepComplete(stepKey);
                    }}
                    title={isCompleted ? "ทำเครื่องหมายว่ายังไม่ได้อ่าน" : "ทำเครื่องหมายว่าอ่านจบแล้ว"}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="hidden sm:inline">อ่านแล้ว</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5 text-slate-400" />
                        <span className="hidden sm:inline">ยังไม่ได้อ่าน</span>
                      </>
                    )}
                  </button>

                  <div className="p-1 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  
                  {step.details.map((detail, idx) => {
                    const detailId = `${stepKey}-detail-${idx}`;
                    const isCopied = copiedId === detailId;

                    return (
                      <div 
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <Scale className="w-4 h-4 text-indigo-500 shrink-0" />
                            {detail.title}
                          </h4>

                          <div className="flex items-center gap-1">
                            {/* Read single detail button */}
                            <button
                              onClick={(e) => handleReadDetail(e, detail, step.stepName)}
                              title="อ่านออกเสียงเฉพาะข้อนี้"
                              className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>

                            {/* Copy button */}
                            <button
                              onClick={() => handleCopy(`${detail.title}\n\n${detail.content}`, detailId)}
                              title="คัดลอกเนื้อหา"
                              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        <div className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed text-sm">
                          {detail.content}
                        </div>
                      </div>
                    );
                  })}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
