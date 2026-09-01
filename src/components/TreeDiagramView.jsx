import React, { useState } from 'react';
import { 
  GitFork, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  BookOpen, 
  Scale, 
  Volume2, 
  CheckCircle2,
  Maximize2,
  Minimize2,
  Flame,
  HelpCircle,
  Tag,
  Palette,
  Wrench,
  Lightbulb,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { ipLawTreeData } from '../data/treeData';

export default function TreeDiagramView({ onNavigateToCategory, onOpenArticleModal, onPlayAudio }) {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all'); // 'all', 'patent-branch', 'trademark-branch', 'copyright-branch'
  
  // State for tracking expanded/collapsed nodes
  const [expandedNodes, setExpandedNodes] = useState({
    'root': true,
    'patent-branch': true,
    'trademark-branch': true,
    'copyright-branch': true,
    'node-invention': true,
    'node-petty': true,
    'node-design': true,
    'node-patent-common': false,
    'node-tm-types': true,
    'node-tm-gatekeepers': true,
    'node-tm-flow-rights': false,
    'node-cr-works': true,
    'node-cr-rights-exceptions': true
  });

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const expandAll = () => {
    const all = { 'root': true, 'patent-branch': true, 'trademark-branch': true, 'copyright-branch': true };
    ipLawTreeData.children.forEach(branch => {
      all[branch.id] = true;
      if (branch.children) {
        branch.children.forEach(sub => all[sub.id] = true);
      }
    });
    setExpandedNodes(all);
  };

  const collapseAll = () => {
    setExpandedNodes({ 'root': true });
  };

  // Color config helper
  const getColorStyles = (color) => {
    switch (color) {
      case 'indigo':
        return {
          bg: 'bg-indigo-50/70 dark:bg-indigo-950/40',
          border: 'border-indigo-200 dark:border-indigo-800',
          hoverBorder: 'hover:border-indigo-400 dark:hover:border-indigo-600',
          text: 'text-indigo-700 dark:text-indigo-300',
          badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/80 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700',
          line: 'border-indigo-500/50 dark:border-indigo-500/40',
          dot: 'bg-indigo-500 ring-indigo-200 dark:ring-indigo-900',
          btn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50/70 dark:bg-emerald-950/40',
          border: 'border-emerald-200 dark:border-emerald-800',
          hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-600',
          text: 'text-emerald-700 dark:text-emerald-300',
          badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
          line: 'border-emerald-500/50 dark:border-emerald-500/40',
          dot: 'bg-emerald-500 ring-emerald-200 dark:ring-emerald-900',
          btn: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
        };
      case 'amber':
        return {
          bg: 'bg-amber-50/70 dark:bg-amber-950/40',
          border: 'border-amber-200 dark:border-amber-800',
          hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-600',
          text: 'text-amber-700 dark:text-amber-300',
          badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/80 dark:text-amber-300 border-amber-200 dark:border-amber-700',
          line: 'border-amber-500/50 dark:border-amber-500/40',
          dot: 'bg-amber-500 ring-amber-200 dark:ring-amber-900',
          btn: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
        };
      case 'rose':
      case 'red':
      case 'pink':
        return {
          bg: 'bg-rose-50/70 dark:bg-rose-950/40',
          border: 'border-rose-200 dark:border-rose-800',
          hoverBorder: 'hover:border-rose-400 dark:hover:border-rose-600',
          text: 'text-rose-700 dark:text-rose-300',
          badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/80 dark:text-rose-300 border-rose-200 dark:border-rose-700',
          line: 'border-rose-500/50 dark:border-rose-500/40',
          dot: 'bg-rose-500 ring-rose-200 dark:ring-rose-900',
          btn: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
        };
      case 'purple':
      case 'fuchsia':
        return {
          bg: 'bg-purple-50/70 dark:bg-purple-950/40',
          border: 'border-purple-200 dark:border-purple-800',
          hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-600',
          text: 'text-purple-700 dark:text-purple-300',
          badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/80 dark:text-purple-300 border-purple-200 dark:border-purple-700',
          line: 'border-purple-500/50 dark:border-purple-500/40',
          dot: 'bg-purple-500 ring-purple-200 dark:ring-purple-900',
          btn: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20'
        };
      default:
        return {
          bg: 'bg-slate-50/70 dark:bg-slate-900/40',
          border: 'border-slate-200 dark:border-slate-800',
          hoverBorder: 'hover:border-slate-400 dark:hover:border-slate-600',
          text: 'text-slate-700 dark:text-slate-300',
          badge: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
          line: 'border-slate-400 dark:border-slate-600',
          dot: 'bg-slate-500 ring-slate-200 dark:ring-slate-900',
          btn: 'bg-slate-800 hover:bg-slate-700 text-white shadow-slate-800/20'
        };
    }
  };

  const branchesToRender = selectedBranch === 'all' 
    ? ipLawTreeData.children 
    : ipLawTreeData.children.filter(b => b.id === selectedBranch);

  const handleReadNode = (e, node) => {
    e.stopPropagation();
    if (!onPlayAudio) return;
    const pointsText = node.keyPoints ? node.keyPoints.join('. ') : '';
    const fullText = `${node.title}. ${node.subtitle}. ${pointsText}`;
    onPlayAudio(fullText, node.title);
  };

  const handleNavigate = (e, targetCat) => {
    e.stopPropagation();
    if (onNavigateToCategory && targetCat) {
      onNavigateToCategory(targetCat);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls Bar */}
      <div className="glass-card rounded-2xl p-6 border shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 text-white shadow-md shadow-indigo-500/20">
                <GitFork className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  แผนภูมิต้นไม้เชื่อมโยงกฎหมาย (Interactive Mind Map & Tree Flow)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  ผังเส้นโยงเชื่อมโยงตัวบทมาตรา 3 เสาหลัก พร้อมคลิก <strong>'ไปยังหมวดกฎหมายหลัก'</strong> ได้ทันที
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={expandAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Maximize2 className="w-3.5 h-3.5" /> ขยายทุกกิ่ง
            </button>
            <button
              onClick={collapseAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Minimize2 className="w-3.5 h-3.5" /> ยุบกิ่งก้าน
            </button>
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedBranch('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedBranch === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              🌳 แสดงผังทั้ง 3 เสาหลัก
            </button>
            <button
              onClick={() => setSelectedBranch('patent-branch')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedBranch === 'patent-branch'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              🛡️ สิทธิบัตร 3 ประเภท
            </button>
            <button
              onClick={() => setSelectedBranch('trademark-branch')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedBranch === 'trademark-branch'
                  ? 'bg-rose-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              🏷️ เครื่องหมายการค้า
            </button>
            <button
              onClick={() => setSelectedBranch('copyright-branch')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedBranch === 'copyright-branch'
                  ? 'bg-purple-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              📖 ลิขสิทธิ์
            </button>
          </div>

          {/* Search inside Tree */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="ค้นหาจุดสำคัญ เช่น '12 เดือน', 'อาญาแผ่นดิน'..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Tree Visualization Canvas with Connected Branches */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6 relative overflow-hidden">
        
        {/* Background decorative grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* Level 0: Root Node */}
        <div className="flex flex-col items-center relative z-10">
          <div 
            onClick={() => toggleNode('root')}
            className="cursor-pointer group glass-card p-5 rounded-2xl border-2 border-indigo-500 bg-gradient-to-r from-indigo-50/90 via-purple-50/90 to-rose-50/90 dark:from-indigo-950/80 dark:via-purple-950/80 dark:to-rose-950/80 hover:shadow-xl hover:scale-[1.01] transition-all text-center max-w-xl w-full relative"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-600 text-white shadow-sm shadow-indigo-600/30">
                {ipLawTreeData.badge}
              </span>
              <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                {expandedNodes['root'] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1.5">
              {ipLawTreeData.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              {ipLawTreeData.subtitle}
            </p>
          </div>

          {/* Central Trunk Vertical Stem Line */}
          {expandedNodes['root'] && (
            <div className="w-0.5 h-8 bg-gradient-to-b from-indigo-500 via-purple-500 to-slate-400 dark:to-slate-600" />
          )}
        </div>

        {/* Level 1: Main Branches (สิทธิบัตร, เครื่องหมายการค้า, ลิขสิทธิ์) */}
        {expandedNodes['root'] && (
          <div className="space-y-10 relative z-10">
            {branchesToRender.map((branch, bIndex) => {
              const bStyle = getColorStyles(branch.color);
              const isBranchExpanded = expandedNodes[branch.id];

              return (
                <div key={branch.id} className="relative space-y-4">
                  
                  {/* Branch Node Header Card with Tree Connecting Trunk */}
                  <div className="flex items-center gap-3">
                    {/* Visual branch node indicator point */}
                    <div className={`w-3.5 h-3.5 rounded-full ${bStyle.dot} ring-4 shrink-0 shadow-sm`} />

                    <div 
                      onClick={() => toggleNode(branch.id)}
                      className={`flex-1 cursor-pointer glass-card p-4 sm:p-5 rounded-2xl border-2 ${bStyle.border} ${bStyle.bg} ${bStyle.hoverBorder} hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group`}
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm ${bStyle.text} shrink-0`}>
                          {isBranchExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                              {branch.title}
                            </h4>
                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${bStyle.badge}`}>
                              {branch.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                            {branch.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Quick Navigate to Category Button */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={(e) => handleNavigate(e, branch.targetCategory)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl ${bStyle.btn} transition-all duration-200 shadow-sm hover:scale-105`}
                        >
                          <span>เปิดหมวดนี้</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Level 2: Sub-Nodes with Tree Connector Line Branches */}
                  {isBranchExpanded && branch.children && (
                    <div className="relative ml-1.5 sm:ml-2 pl-4 sm:pl-7 border-l-2 border-dashed border-slate-300 dark:border-slate-700 space-y-4 pt-1">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {branch.children.map((sub) => {
                          const subStyle = getColorStyles(sub.color);
                          const isSubExpanded = expandedNodes[sub.id];

                          // Search filter matching
                          const matchesQuery = filterQuery === '' || 
                            sub.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
                            sub.subtitle.toLowerCase().includes(filterQuery.toLowerCase()) ||
                            (sub.articles && sub.articles.some(a => a.toLowerCase().includes(filterQuery.toLowerCase()))) ||
                            (sub.keyPoints && sub.keyPoints.some(p => p.toLowerCase().includes(filterQuery.toLowerCase())));

                          if (!matchesQuery) return null;

                          return (
                            <div 
                              key={sub.id}
                              className={`glass-card rounded-2xl p-5 border ${subStyle.border} ${subStyle.bg} ${subStyle.hoverBorder} hover:shadow-lg transition-all space-y-3.5 relative group`}
                            >
                              {/* Horizontal connector stem arm from left border */}
                              <div className="hidden sm:block absolute -left-7 top-7 w-5 h-0.5 border-t-2 border-dashed border-slate-300 dark:border-slate-700" />
                              <div className="hidden sm:block absolute -left-2.5 top-6 w-2 h-2 rounded-full bg-indigo-400 dark:bg-indigo-600" />

                              {/* Sub-node Card Header */}
                              <div className="flex items-start justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800/70 pb-3">
                                <div>
                                  <h5 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                                    {sub.title}
                                  </h5>
                                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                                    {sub.subtitle}
                                  </p>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className={`text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold border ${subStyle.badge}`}>
                                    {sub.badge}
                                  </span>
                                  {onPlayAudio && (
                                    <button
                                      onClick={(e) => handleReadNode(e, sub)}
                                      title="ฟังเสียงสรุป"
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-2xs"
                                    >
                                      <Volume2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Core Articles with Click-to-Jump Link */}
                              {sub.articles && (
                                <div className="space-y-1.5">
                                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <Scale className="w-3.5 h-3.5 text-indigo-500" />
                                    <span>มาตราอ้างอิงหลัก (คลิกเพื่อกระโดดไปยังหมวดนี้):</span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    {sub.articles.map((art, aIdx) => (
                                      <button
                                        key={aIdx}
                                        onClick={(e) => handleNavigate(e, sub.targetCategory)}
                                        title={`คลิกเพื่อไปยัง ${sub.categoryName} (${art})`}
                                        className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono font-semibold border border-indigo-200 dark:border-indigo-800 shadow-xs hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all transform hover:-translate-y-0.5"
                                      >
                                        {art} ↗
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Key Points Bullet List */}
                              {sub.keyPoints && (
                                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xs">
                                  {sub.keyPoints.map((point, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-2">
                                      <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* Direct Jump Button to Main Law Category */}
                              <div className="pt-1 flex justify-end">
                                <button
                                  onClick={(e) => handleNavigate(e, sub.targetCategory)}
                                  className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold ${subStyle.btn} transition-all shadow-sm`}
                                >
                                  <span>📖 อ่านเนื้อหาเต็มในหมวด {sub.categoryName}</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>
                              </div>

                            </div>
                          );
                        })}
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
}
