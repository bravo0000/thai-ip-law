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
  Volume2,
  Edit3,
  Save,
  X,
  RotateCcw,
  AlertCircle,
  Loader2,
  CheckCheck
} from 'lucide-react';

export default function PatentSection({ 
  category, 
  completedSteps, 
  toggleStepComplete,
  onOpenArticleModal,
  onPlayAudio,
  onUpdateCategory,
  onResetCategory,
  saveStatus
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

  // Edit Mode state
  const [isEditMode, setIsEditMode] = useState(false);

  // Editing specific detail: `${stepNum}-${detailIdx}`
  const [editingDetailKey, setEditingDetailKey] = useState(null);
  const [editDetailTitle, setEditDetailTitle] = useState('');
  const [editDetailContent, setEditDetailContent] = useState('');

  // Editing specific step header: step number
  const [editingStepNum, setEditingStepNum] = useState(null);
  const [editStepName, setEditStepName] = useState('');
  const [editStepArticle, setEditStepArticle] = useState('');
  const [editStepSummary, setEditStepSummary] = useState('');

  // Editing Category description
  const [editingCategoryDesc, setEditingCategoryDesc] = useState(false);
  const [editCategoryDescText, setEditCategoryDescText] = useState('');

  const toggleAccordion = (stepNum) => {
    // Prevent collapsing when clicking inside inputs/buttons during edit
    if (editingStepNum === stepNum) return;
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

  const handleReadDetail = (e, detail) => {
    e.stopPropagation();
    if (!onPlayAudio) return;
    onPlayAudio(`${detail.title}. ${detail.content}`, detail.title);
  };

  // --- Category Description Edit Handlers ---
  const handleStartEditDesc = () => {
    setEditCategoryDescText(category.description || '');
    setEditingCategoryDesc(true);
  };

  const handleCancelEditDesc = () => {
    setEditingCategoryDesc(false);
  };

  const handleSaveDesc = () => {
    if (!onUpdateCategory) return;
    const updated = {
      ...category,
      description: editCategoryDescText
    };
    onUpdateCategory(updated);
    setEditingCategoryDesc(false);
  };

  // --- Step Header Edit Handlers ---
  const handleStartEditStep = (e, step) => {
    e.stopPropagation();
    setEditingStepNum(step.step);
    setEditStepName(step.stepName);
    setEditStepArticle(step.article);
    setEditStepSummary(step.summary);
  };

  const handleCancelEditStep = (e) => {
    if (e) e.stopPropagation();
    setEditingStepNum(null);
  };

  const handleSaveStep = (e, stepNum) => {
    if (e) e.stopPropagation();
    if (!onUpdateCategory) return;
    const updatedSteps = category.steps.map(s => {
      if (s.step !== stepNum) return s;
      return {
        ...s,
        stepName: editStepName,
        article: editStepArticle,
        summary: editStepSummary
      };
    });
    const updatedCategory = { ...category, steps: updatedSteps };
    onUpdateCategory(updatedCategory);
    setEditingStepNum(null);
  };

  // --- Detail Card Edit Handlers ---
  const handleStartEditDetail = (stepNum, detailIdx, detail) => {
    setEditingDetailKey(`${stepNum}-${detailIdx}`);
    setEditDetailTitle(detail.title);
    setEditDetailContent(detail.content);
  };

  const handleCancelEditDetail = () => {
    setEditingDetailKey(null);
  };

  const handleSaveDetail = (stepNum, detailIdx) => {
    if (!onUpdateCategory) return;
    const updatedSteps = category.steps.map(s => {
      if (s.step !== stepNum) return s;
      const updatedDetails = s.details.map((d, idx) => {
        if (idx !== detailIdx) return d;
        return {
          ...d,
          title: editDetailTitle,
          content: editDetailContent
        };
      });
      return { ...s, details: updatedDetails };
    });
    const updatedCategory = { ...category, steps: updatedSteps };
    onUpdateCategory(updatedCategory);
    setEditingDetailKey(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast / Status Notification for Saving */}
      {saveStatus && saveStatus.state !== 'idle' && (
        <div className={`p-4 rounded-2xl flex items-center justify-between gap-3 shadow-lg border transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${
          saveStatus.state === 'saving'
            ? 'bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200'
            : saveStatus.state === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200'
            : 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200'
        }`}>
          <div className="flex items-center gap-3">
            {saveStatus.state === 'saving' && (
              <Loader2 className="w-5 h-5 animate-spin text-amber-600 dark:text-amber-400 shrink-0" />
            )}
            {saveStatus.state === 'success' && (
              <CheckCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            )}
            {saveStatus.state === 'error' && (
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            )}
            <div>
              <p className="font-semibold text-sm">{saveStatus.message}</p>
              <p className="text-xs opacity-80">
                {saveStatus.state === 'saving' ? 'กำลังบันทึกลงไฟล์โค้ดบนดิสก์และแคชเบราว์เซอร์' : 'ข้อมูลได้รับการบันทึกถาวรเรียบร้อยแล้ว'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden border">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {category.title}
              </h2>
              <span className={`text-xs px-3 py-1 font-semibold rounded-full border ${category.badgeColor}`}>
                {category.badge}
              </span>

              {isEditMode && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-0.5 font-bold rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                  โหมดแก้ไขข้อความเปิดอยู่
                </span>
              )}
            </div>

            {/* Description or Edit Description Form */}
            {editingCategoryDesc ? (
              <div className="space-y-2 pt-1 max-w-3xl">
                <textarea
                  value={editCategoryDescText}
                  onChange={(e) => setEditCategoryDescText(e.target.value)}
                  rows={2}
                  className="w-full text-sm p-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="คำอธิบายภาพรวมของเสาหลักนี้..."
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveDesc}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    บันทึกลงโค้ด
                  </button>
                  <button
                    onClick={handleCancelEditDesc}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    ยกเลิก
                  </button>
                </div>
              </div>
            ) : (
              <div className="group relative">
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                  {category.description}
                  {isEditMode && (
                    <button
                      onClick={handleStartEditDesc}
                      className="ml-2 inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      <Edit3 className="w-3 h-3" />
                      แก้ไขคำอธิบาย
                    </button>
                  )}
                </p>
              </div>
            )}

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

          {/* Action Control Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
            
            {/* Edit Mode Toggle Button */}
            <button
              onClick={() => {
                setIsEditMode(prev => !prev);
                setEditingDetailKey(null);
                setEditingStepNum(null);
                setEditingCategoryDesc(false);
              }}
              title="เปิด/ปิดโหมดแก้ไขข้อความในหัวข้อนี้"
              className={`flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-xl font-semibold border transition-all ${
                isEditMode
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditMode ? 'ปิดโหมดแก้ไข' : 'แก้ไขข้อความ'}</span>
            </button>

            {/* Reset to Default Button (if modified) */}
            {onResetCategory && (
              <button
                onClick={onResetCategory}
                title="คืนค่าเนื้อหาทั้งหมดกลับเป็นค่าเริ่มต้นเดิม"
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">รีเซ็ต</span>
              </button>
            )}

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

        {/* Tip for Edit Mode */}
        {isEditMode && (
          <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-amber-700 dark:text-amber-300">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <strong>คำแนะนำ:</strong> คลิกปุ่ม <strong>แก้ไข</strong> บนการ์ดเนื้อหาหรือหัวข้อขั้นตอนด้านล่าง เมื่อพิมพ์เสร็จแล้วกด <strong>บันทึกข้อมูล</strong> ระบบจะบันทึกข้อความลงในไฟล์โค้ดบนเครื่องของคุณทันที
            </span>
          </div>
        )}
      </div>

      {/* 6 Steps Content Flow */}
      <div className="space-y-4">
        {category.steps.map((step) => {
          const stepKey = `${category.id}-step-${step.step}`;
          const isCompleted = completedSteps.includes(stepKey);
          const isExpanded = expandedSteps[step.step];
          const isEditingThisStep = editingStepNum === step.step;

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
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Step Number Badge */}
                  <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-sm shadow-sm ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300'
                  }`}>
                    {step.step}
                  </div>

                  {/* Header Title or Step Header Edit Mode */}
                  {isEditingThisStep ? (
                    <div 
                      className="space-y-3 flex-1 bg-white dark:bg-slate-900 p-4 rounded-xl border border-indigo-300 dark:border-indigo-700 shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1">
                          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                            ชื่อขั้นตอน:
                          </label>
                          <input
                            type="text"
                            value={editStepName}
                            onChange={(e) => setEditStepName(e.target.value)}
                            className="w-full text-sm font-bold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="w-full sm:w-44">
                          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                            เลขมาตรา:
                          </label>
                          <input
                            type="text"
                            value={editStepArticle}
                            onChange={(e) => setEditStepArticle(e.target.value)}
                            className="w-full text-sm font-mono px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                          สรุปสาระสำคัญ:
                        </label>
                        <input
                          type="text"
                          value={editStepSummary}
                          onChange={(e) => setEditStepSummary(e.target.value)}
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={(e) => handleSaveStep(e, step.step)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
                        >
                          <Save className="w-3.5 h-3.5" />
                          บันทึกหัวข้อขั้นตอน
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleCancelEditStep(e)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          ยกเลิก
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                          {step.stepName}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono border border-indigo-100 dark:border-indigo-900">
                          {step.article}
                        </span>

                        {isEditMode && (
                          <button
                            type="button"
                            onClick={(e) => handleStartEditStep(e, step)}
                            title="แก้ไขหัวข้อและมาตราขั้นตอนนี้"
                            className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {step.summary}
                      </p>
                    </div>
                  )}
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
                    const isEditingThisDetail = editingDetailKey === `${step.step}-${idx}`;

                    return (
                      <div 
                        key={idx}
                        className={`p-4 rounded-xl transition-all duration-150 border space-y-2 relative group ${
                          isEditingThisDetail
                            ? 'bg-white dark:bg-slate-900 border-indigo-400 dark:border-indigo-600 shadow-md ring-2 ring-indigo-500/10'
                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60'
                        }`}
                      >
                        {isEditingThisDetail ? (
                          /* INLINE EDIT FORM FOR THIS DETAIL */
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                                <Edit3 className="w-3.5 h-3.5" />
                                แก้ไขเนื้อหากล่องนี้
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                Step {step.step} • ข้อ {idx + 1}
                              </span>
                            </div>

                            {/* Title Input */}
                            <div>
                              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                                หัวข้อย่อย (Title):
                              </label>
                              <input
                                type="text"
                                value={editDetailTitle}
                                onChange={(e) => setEditDetailTitle(e.target.value)}
                                className="w-full text-sm font-semibold px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="พิมพ์หัวข้อย่อย..."
                              />
                            </div>

                            {/* Content Textarea */}
                            <div>
                              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                                รายละเอียดเนื้อหา / ตัวบท / ข้อสังเกต (Content):
                              </label>
                              <textarea
                                value={editDetailContent}
                                onChange={(e) => setEditDetailContent(e.target.value)}
                                rows={7}
                                className="w-full text-sm leading-relaxed px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                                placeholder="พิมพ์รายละเอียดเนื้อหา สามารถขึ้นบรรทัดใหม่ได้..."
                              />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                                กดบันทึกเพื่ออัปเดตลงไฟล์โค้ดทันที
                              </span>

                              <div className="flex items-center gap-2 self-end sm:self-auto">
                                <button
                                  type="button"
                                  onClick={handleCancelEditDetail}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  ยกเลิก
                                </button>
                                
                                <button
                                  type="button"
                                  onClick={() => handleSaveDetail(step.step, idx)}
                                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                  บันทึกข้อมูล
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* NORMAL DETAIL CARD VIEW */
                          <>
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                <Scale className="w-4 h-4 text-indigo-500 shrink-0" />
                                {detail.title}
                              </h4>

                              <div className="flex items-center gap-1">
                                
                                {/* Edit single detail button */}
                                <button
                                  type="button"
                                  onClick={() => handleStartEditDetail(step.step, idx, detail)}
                                  title="แก้ไขข้อความกล่องนี้"
                                  className={`p-1.5 rounded-lg transition-all ${
                                    isEditMode
                                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800'
                                      : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100'
                                  }`}
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                {/* Read single detail button */}
                                <button
                                  type="button"
                                  onClick={(e) => handleReadDetail(e, detail)}
                                  title="อ่านออกเสียงเฉพาะข้อนี้"
                                  className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>

                                {/* Copy button */}
                                <button
                                  type="button"
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
                          </>
                        )}
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
