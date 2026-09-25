import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Volume2, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Target, 
  Scale, 
  Flame, 
  Printer, 
  Search, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  FileText,
  Lightbulb,
  ExternalLink,
  Award
} from 'lucide-react';
import { rapidExamTopics } from '../data/rapidExamData';

export default function RapidExamView({ 
  topicId = 'rapid_q1', 
  onSelectTopic, 
  onPlayAudio 
}) {
  const currentTopic = rapidExamTopics[topicId] || rapidExamTopics['rapid_q1'];

  // Sub-tabs: 'all' | 'mindmap' | 'keywords' | 'sections' | 'exams'
  const [activeSubTab, setActiveSubTab] = useState('all');

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // Expanded sections accordion state
  const [expandedSections, setExpandedSections] = useState(() => {
    // Default open all
    const all = {};
    currentTopic.sections.forEach(s => { all[s.id] = true; });
    return all;
  });

  // Active mock exam tab index
  const [activeExamIndex, setActiveExamIndex] = useState(0);

  // Copy feedback state
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const all = {};
    currentTopic.sections.forEach(s => { all[s.id] = true; });
    setExpandedSections(all);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  // Filter sections based on search
  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return currentTopic.sections;
    const q = searchTerm.toLowerCase();
    return currentTopic.sections.filter(s => 
      s.article.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.summaryFormula.toLowerCase().includes(q) ||
      s.statuteText.toLowerCase().includes(q) ||
      s.applicationPhrasings.some(ap => ap.content.toLowerCase().includes(q))
    );
  }, [currentTopic, searchTerm]);

  // Read entire topic audio summary
  const handleReadFullSummary = () => {
    const speechText = `สรุปเร่งรัด ${currentTopic.title} ขอบเขตมาตรา ${currentTopic.articlesBadge} ` +
      currentTopic.sections.map(s => `${s.number} ${s.article} ${s.title}. ${s.summaryFormula}`).join('. ');
    onPlayAudio(speechText, `สรุปเร่งรัด ${currentTopic.title}`);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* 1. Header Banner & Topic Navigation Pills */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Top 3 Rapid Question Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-1.5 bg-white/10 backdrop-blur-md rounded-2xl w-fit border border-white/10">
            {Object.values(rapidExamTopics).map((t) => {
              const isSelected = t.id === topicId;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelectTopic(t.id);
                    setActiveExamIndex(0);
                    setSearchTerm('');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-white text-slate-950 shadow-md font-bold scale-[1.02]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-indigo-600 animate-ping' : 'bg-white/40'}`} />
                  <span>{t.title}</span>
                </button>
              );
            })}
          </div>

          {/* Title & Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                สอบ 26 ก.ย. 69
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-400/20 text-indigo-300 border border-indigo-400/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {currentTopic.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/15">
                {currentTopic.articlesBadge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>{currentTopic.title}</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              {currentTopic.description}
            </p>

            <div className="text-xs text-indigo-200/70 pt-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>แหล่งอ้างอิง: {currentTopic.reference}</span>
            </div>
          </div>

          {/* Global Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleReadFullSummary}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md shadow-indigo-500/25 flex items-center gap-2 transition-transform hover:scale-105"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 ฟังเสียงสรุปทั้งข้อ (TTS)</span>
              </button>

              <button
                onClick={() => {
                  const fullText = `# ${currentTopic.title}\n${currentTopic.description}\n\n` +
                    currentTopic.sections.map(s => `## ${s.number} ${s.article}: ${s.title}\n${s.summaryFormula}\n\n### ตัวบท:\n${s.statuteText}\n`).join('\n');
                  handleCopy(fullText, 'full_topic');
                }}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center gap-1.5 transition-colors"
              >
                {copiedId === 'full_topic' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === 'full_topic' ? 'คัดลอกทั้งข้อแล้ว!' : 'คัดลอกเนื้อหาทั้งหมด'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center gap-1.5 transition-colors no-print"
              >
                <Printer className="w-4 h-4" />
                <span>พิมพ์หน้านี้ (Print)</span>
              </button>

              <a
                href="./ip-law-exam-summary-bw.pdf"
                download="ตารางสรุป_Keyword_และสูตรจำเร็ว_ขาวดำ.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1.5 transition-all hover:scale-105 no-print"
                title="ดาวน์โหลดตารางสรุปขาว-ดำ สำหรับพิมพ์ A4"
              >
                <FileText className="w-4 h-4" />
                <span>📄 โหลด PDF ขาว-ดำ (พร้อมพิมพ์)</span>
              </a>
            </div>

            {/* Sub-tab view switchers */}
            <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10 text-xs">
              {[
                { id: 'all', label: 'ทั้งหมด' },
                { id: 'mindmap', label: '🧭 ผังตรรกะ' },
                { id: 'keywords', label: '🔑 ตารางสูตรจำ' },
                { id: 'sections', label: '📜 8 ตอนเจาะลึก' },
                { id: 'exams', label: '🎯 ธงคำตอบ 4 ท่อน' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubTab(sub.id)}
                  className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                    activeSubTab === sub.id 
                      ? 'bg-indigo-600 text-white shadow font-semibold' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 2. Search & Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 glass-card rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหามาตรา, คีย์เวิร์ด, หรือสำนวนปรับบทในข้อนี้..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ล้าง
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
          >
            ขยายทั้งหมด
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
          >
            ย่อทั้งหมด
          </button>
        </div>
      </div>

      {/* 3. Logical Mind Map Section */}
      {(activeSubTab === 'all' || activeSubTab === 'mindmap') && (
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
                🧭
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  แผนผังตรรกะเชื่อมโยง (Logical Step-by-Step Flow)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ลำดับความคิดการวินิจฉัยข้อสอบ ตั้งแต่ต้นจนจบคำวินิจฉัย
                </p>
              </div>
            </div>

            <button
              onClick={() => onPlayAudio(currentTopic.mindmap, `แผนผังตรรกะ ${currentTopic.title}`)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 transition-colors"
              title="ฟังเสียงผังตรรกะ"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-900 text-indigo-200 rounded-2xl p-5 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed border border-slate-800 shadow-inner">
            <pre className="whitespace-pre">{currentTopic.mindmap}</pre>
          </div>
        </section>
      )}

      {/* 4. Quick Keywords Table Section */}
      {(activeSubTab === 'all' || activeSubTab === 'keywords') && (
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                🔑
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  ตาราง Keyword & สูตรท่องจำเร็วแม่บท
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  สรุปรวบรัดคำหัวใจสำคัญที่ต้องปรากฏในสมุดคำตอบข้อสอบ
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4 w-28">มาตรา</th>
                  <th className="py-3 px-4 w-44">หัวข้อ</th>
                  <th className="py-3 px-4 w-60 text-indigo-600 dark:text-indigo-400">🎯 สูตร Keyword ท่องจำขึ้นใจ</th>
                  <th className="py-3 px-4">นัยสำคัญในการปรับบทข้อสอบ</th>
                  <th className="py-3 px-3 w-16 text-center">เสียง</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900/50">
                {currentTopic.quickKeywords.map((kw, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">
                      {kw.article}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {kw.topic}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/20">
                      {kw.formula}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                      {kw.significance}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => onPlayAudio(`${kw.article} ${kw.topic}. สูตรจำคือ ${kw.formula}. นัยสำคัญคือ ${kw.significance}`, `${kw.article}`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="ฟังเสียง"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 5. The 8 In-Depth Sections (Statutes + Phrasings + Prose) */}
      {(activeSubTab === 'all' || activeSubTab === 'sections') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                เจาะลึก 8 ตอนสำคัญ: ตัวบท + สูตรจำ + สำนวนการปรับบทกฎหมาย
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              พบ {filteredSections.length} ตอน
            </span>
          </div>

          <div className="space-y-4">
            {filteredSections.map((sec) => {
              const isOpen = expandedSections[sec.id] !== false;
              return (
                <div 
                  key={sec.id}
                  className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-700"
                >
                  {/* Card Header Accordion Toggle */}
                  <div 
                    onClick={() => toggleSection(sec.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none bg-slate-50/80 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 pr-4">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 shrink-0">
                        {sec.number}
                      </span>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                            {sec.article}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">
                            {sec.title}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlayAudio(`${sec.number} ${sec.article} ${sec.title}. ${sec.summaryFormula}. ตัวบทว่า ${sec.statuteText}`, `${sec.article}`);
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                        title="ฟังเสียงมาตรานี้"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div className="p-1 rounded-lg text-slate-400">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  {isOpen && (
                    <div className="p-5 sm:p-6 space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
                      
                      {/* 1. Summary Formula */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          <Lightbulb className="w-4 h-4" />
                          <span>1. สรุปหลักการ & สูตรจำแม่นยำ</span>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 text-amber-950 dark:text-amber-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                          {sec.summaryFormula}
                        </div>
                      </div>

                      {/* 2. Statute Text */}
                      <div className="pt-5 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            <Scale className="w-4 h-4" />
                            <span>2. ถ้อยคำตัวบทสำหรับเขียนในข้อสอบ (หลักกฎหมาย)</span>
                          </div>
                          <button
                            onClick={() => handleCopy(sec.statuteText, `statute_${sec.id}`)}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 flex items-center gap-1 transition-colors"
                          >
                            {copiedId === `statute_${sec.id}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === `statute_${sec.id}` ? 'คัดลอกแล้ว!' : 'คัดลอกตัวบท'}</span>
                          </button>
                        </div>
                        <blockquote className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border-l-4 border-indigo-500 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed italic whitespace-pre-line">
                          {sec.statuteText}
                        </blockquote>
                      </div>

                      {/* 2.1 Comparison Table (if exists) */}
                      {sec.comparisonTable && (
                        <div className="pt-5 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                            <Scale className="w-4 h-4" />
                            <span>ตารางเปรียบเทียบแม่บท</span>
                          </div>
                          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                            <table className="w-full text-xs sm:text-sm text-left">
                              <thead className="bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-300 font-bold border-b border-purple-200 dark:border-purple-800">
                                <tr>
                                  <th className="py-2.5 px-4 w-1/4">ประเด็น</th>
                                  <th className="py-2.5 px-4 w-3/8">ฝั่งที่ 1</th>
                                  <th className="py-2.5 px-4 w-3/8">ฝั่งที่ 2</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {sec.comparisonTable.map((row, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">{row.point}</td>
                                    <td className="py-2.5 px-4 text-slate-700 dark:text-slate-300">{row.col1}</td>
                                    <td className="py-2.5 px-4 text-slate-700 dark:text-slate-300">{row.col2}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* 3. Application Phrasings */}
                      <div className="pt-5 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                          <Flame className="w-4 h-4" />
                          <span>3. รูปแบบภาษาเขียนการปรับบทกฎหมาย (Application Phrasing)</span>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {sec.applicationPhrasings.map((ap, apIdx) => (
                            <div 
                              key={apIdx}
                              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs sm:text-sm text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                                  <span>{ap.type}</span>
                                  <span>{ap.header}</span>
                                </span>
                                <button
                                  onClick={() => handleCopy(ap.content, `ap_${sec.id}_${apIdx}`)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                                  title="คัดลอกสำนวนปรับบท"
                                >
                                  {copiedId === `ap_${sec.id}_${apIdx}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                {ap.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 4. Sample Prose (if exists) */}
                      {sec.sampleProse && (
                        <div className="pt-5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                              <FileText className="w-4 h-4" />
                              <span>4. ตัวอย่างสำนวนร้อยแก้วสำหรับปรับบทในห้องสอบ</span>
                            </span>
                            <button
                              onClick={() => handleCopy(sec.sampleProse, `prose_${sec.id}`)}
                              className="px-2 py-1 rounded text-xs text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 flex items-center gap-1"
                            >
                              {copiedId === `prose_${sec.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === `prose_${sec.id}` ? 'คัดลอกแล้ว' : 'คัดลอกร้อยแก้ว'}</span>
                            </button>
                          </div>
                          <div className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                            {sec.sampleProse}
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Blueprint 4-Step Answer Architecture */}
      {(activeSubTab === 'all' || activeSubTab === 'exams') && (
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
              ✍️
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                พิมพ์เขียวสูตรการเขียนตอบข้อสอบอุทาหรณ์มาตรฐาน 4 ท่อน
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                สูตรสำเร็จโครงสร้างการเขียนตอบที่คว้าคะแนนระดับเกียรตินิยม
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentTopic.blueprint.map((bp, bIdx) => (
              <div 
                key={bIdx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 relative overflow-hidden"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow">
                  {bIdx + 1}
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {bp.step}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {bp.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Complete Mock Exam Scenarios & 4-Step Model Answers */}
      {(activeSubTab === 'all' || activeSubTab === 'exams') && (
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
                🎯
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  ตัวอย่างการเขียนตอบข้อสอบเก็งฉบับสมบูรณ์ (พร้อมใช้ในห้องสอบ)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  อุทาหรณ์ตุ๊กตาจำลองข้อสอบจริง พร้อมแนวธงคำตอบ 4 ท่อนครบทุกมิติ
                </p>
              </div>
            </div>

            {/* Exam Scenarios Switcher Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              {currentTopic.mockExams.map((exam, idx) => (
                <button
                  key={exam.id}
                  onClick={() => setActiveExamIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeExamIndex === idx
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  ข้อสอบเก็งที่ {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Exam Card */}
          {currentTopic.mockExams[activeExamIndex] && (() => {
            const exam = currentTopic.mockExams[activeExamIndex];
            const fullExamSpeech = `ข้อสอบเก็งที่ ${activeExamIndex + 1}: ${exam.title}. ` +
              `ข้อเท็จจริง: ${exam.facts}. คำถาม: ${exam.question}. ` +
              `ท่อนที่ 1 ประเด็น: ${exam.fourSteps.issue}. ` +
              `ท่อนที่ 2 หลักกฎหมาย: ${exam.fourSteps.rules}. ` +
              `ท่อนที่ 3 ปรับบท: ${exam.fourSteps.application}. ` +
              `ท่อนที่ 4 สรุปฟันธง: ${exam.fourSteps.conclusion}`;

            return (
              <div className="space-y-6">
                
                {/* Scenario Header Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-4 shadow-lg border border-indigo-500/20">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-sm">
                        {exam.title}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/15">
                        มาตราที่ปรับใช้: {exam.articlesUsed}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPlayAudio(fullExamSpeech, `${exam.title}`)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>ฟังเสียงคำตอบ</span>
                      </button>
                      <button
                        onClick={() => {
                          const answerText = `### ${exam.title}\n**ข้อเท็จจริง:**\n${exam.facts}\n\n**คำถาม:**\n${exam.question}\n\n` +
                            `**1. ประเด็นแห่งคดี:**\n${exam.fourSteps.issue}\n\n` +
                            `**2. หลักกฎหมายที่เกี่ยวข้อง:**\n${exam.fourSteps.rules}\n\n` +
                            `**3. การปรับบทกฎหมายเข้ากับข้อเท็จจริง:**\n${exam.fourSteps.application}\n\n` +
                            `**4. สรุปคำวินิจฉัย:**\n${exam.fourSteps.conclusion}`;
                          handleCopy(answerText, `exam_ans_${exam.id}`);
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
                      >
                        {copiedId === `exam_ans_${exam.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === `exam_ans_${exam.id}` ? 'คัดลอกธงแล้ว!' : 'คัดลอกคำตอบ'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                    <p className="leading-relaxed">
                      <strong className="text-amber-400">ข้อเท็จจริง: </strong>
                      {exam.facts}
                    </p>
                    <p className="leading-relaxed font-semibold text-rose-300">
                      <strong>คำถาม: </strong>
                      {exam.question}
                    </p>
                  </div>
                </div>

                {/* 4-Step Answer Blocks */}
                <div className="space-y-4">
                  
                  {/* Step 1: Issue */}
                  <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border-l-4 border-purple-500 shadow-sm space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">1</span>
                      <span>ประเด็นแห่งคดี (Issue)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-medium">
                      {exam.fourSteps.issue}
                    </p>
                  </div>

                  {/* Step 2: Rules */}
                  <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border-l-4 border-indigo-500 shadow-sm space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
                      <span>หลักกฎหมายที่เกี่ยวข้อง (Rules)</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-mono bg-white/60 dark:bg-slate-900/60 p-3.5 rounded-xl border border-indigo-200/50 dark:border-indigo-900/30">
                      {exam.fourSteps.rules}
                    </div>
                  </div>

                  {/* Step 3: Application */}
                  <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border-l-4 border-amber-500 shadow-sm space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                      <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">3</span>
                      <span>การปรับบทกฎหมายเข้ากับข้อเท็จจริง (Application)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                      {exam.fourSteps.application}
                    </p>
                  </div>

                  {/* Step 4: Conclusion */}
                  <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border-l-4 border-emerald-500 shadow-sm space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">4</span>
                      <span>สรุปคำวินิจฉัยและฟันธง (Conclusion)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 font-bold leading-relaxed whitespace-pre-line">
                      {exam.fourSteps.conclusion}
                    </p>
                  </div>

                </div>

              </div>
            );
          })()}

        </section>
      )}

      {/* Bottom Floating Navigation for Next / Prev Topic */}
      <div className="flex items-center justify-between p-4 glass-card rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          {topicId === 'rapid_q2' && (
            <button
              onClick={() => onSelectTopic('rapid_q1')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <span>← ย้อนกลับ: ข้อ 1 สิทธิบัตรการประดิษฐ์</span>
            </button>
          )}
          {topicId === 'rapid_q3' && (
            <button
              onClick={() => onSelectTopic('rapid_q2')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <span>← ย้อนกลับ: ข้อ 2 สิทธิลูกจ้างนายจ้าง & ออกแบบ</span>
            </button>
          )}
        </div>

        <div>
          {topicId === 'rapid_q1' && (
            <button
              onClick={() => onSelectTopic('rapid_q2')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2 shadow"
            >
              <span>ถัดไป: ข้อ 2 สิทธิลูกจ้างนายจ้าง & ออกแบบ →</span>
            </button>
          )}
          {topicId === 'rapid_q2' && (
            <button
              onClick={() => onSelectTopic('rapid_q3')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 text-white hover:bg-rose-700 flex items-center gap-2 shadow"
            >
              <span>ถัดไป: ข้อ 3 เครื่องหมายการค้า & คดีปังชา →</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
