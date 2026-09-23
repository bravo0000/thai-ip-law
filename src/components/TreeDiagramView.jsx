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
  Lightbulb,
  ExternalLink,
  ArrowRight,
  Target
} from 'lucide-react';
import { ipLawTreeData } from '../data/treeData';

export default function TreeDiagramView({ onNavigateToCategory, onOpenArticleModal, onPlayAudio }) {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all'); // 'all', 'node-q1', 'node-q2', 'node-q3'
  
  // State for tracking expanded/collapsed nodes
  const [expandedNodes, setExpandedNodes] = useState({
    'root': true,
    'node-q1': true,
    'node-q2': true,
    'node-q3': true,
    'node-q1-requirements': true,
    'node-q1-enforcement': true,
    'node-q2-design-req': true,
    'node-q2-employee-opp': true,
    'node-q3-gatekeepers': true,
    'node-q3-rights-cancellation': true
  });

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const expandAll = () => {
    const all = { 'root': true };
    ipLawTreeData.children.forEach(branch => {
      all[branch.id] = true;
      if (branch.children) {
        branch.children.forEach(sub => {
          all[sub.id] = true;
          if (sub.children) {
            sub.children.forEach(leaf => all[leaf.id] = true);
          }
        });
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
                  ผังตรรกะเชื่อมโยง 3 ข้อสอบ (Interactive Mind Map)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  แผนภูมิความเชื่อมโยงของ 23 มาตราแม่บท พร้อมปุ่มคลิกข้ามไปยังข้อสอบนั้นได้ทันที
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
              🌳 แสดงผังทั้ง 3 ข้อสอบ
            </button>
            <button
              onClick={() => setSelectedBranch('node-q1')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedBranch === 'node-q1'
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              🥇 ข้อ 1: สิทธิบัตรการประดิษฐ์
            </button>
            <button
              onClick={() => setSelectedBranch('node-q2')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedBranch === 'node-q2'
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              🥈 ข้อ 2: การออกแบบ & สัญญาจ้าง
            </button>
            <button
              onClick={() => setSelectedBranch('node-q3')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedBranch === 'node-q3'
                  ? 'bg-rose-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              🥉 ข้อ 3: เครื่องหมายการค้า
            </button>
          </div>

          {/* Search inside Tree */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="ค้นหาจุดสำคัญ เช่น 'Grace Period', 'ม. 11'..."
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

        {/* Level 1: Main Branches (ข้อ 1, ข้อ 2, ข้อ 3) */}
        {expandedNodes['root'] && (
          <div className="space-y-10 relative z-10">
            {branchesToRender.map((branch) => {
              const bStyle = getColorStyles(branch.color);
              const isBranchExpanded = expandedNodes[branch.id];

              return (
                <div key={branch.id} className="relative space-y-4">
                  
                  {/* Branch Node Header Card */}
                  <div className="flex items-center gap-3">
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

                      {/* Quick Navigate Button */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={(e) => handleNavigate(e, branch.targetCategory)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl ${bStyle.btn} transition-all duration-200 shadow-sm hover:scale-105`}
                        >
                          <span>เปิดข้อสอบนี้</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Level 2: Sub-branches */}
                  {isBranchExpanded && branch.children && (
                    <div className="ml-5 sm:ml-8 pl-4 sm:pl-6 border-l-2 border-slate-300 dark:border-slate-700 space-y-4">
                      {branch.children.map((subNode) => {
                        const sStyle = getColorStyles(subNode.color || branch.color);
                        const isSubExpanded = expandedNodes[subNode.id];

                        return (
                          <div key={subNode.id} className="space-y-3">
                            <div 
                              onClick={() => toggleNode(subNode.id)}
                              className={`cursor-pointer glass-card p-4 rounded-xl border ${sStyle.border} ${sStyle.bg} hover:border-slate-400 transition-all`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <div className={`p-1.5 rounded-lg bg-white dark:bg-slate-800 ${sStyle.text}`}>
                                    {isSubExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                  </div>
                                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                                    {subNode.title}
                                  </h5>
                                </div>

                                <div className="flex items-center gap-1">
                                  {subNode.articles && subNode.articles.map((art, aIdx) => (
                                    <span 
                                      key={aIdx}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onOpenArticleModal && onOpenArticleModal(art);
                                      }}
                                      className="text-[11px] px-2 py-0.5 rounded bg-white dark:bg-slate-800 font-mono text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 border border-slate-200 dark:border-slate-700"
                                    >
                                      {art}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {isSubExpanded && subNode.keyPoints && (
                                <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                                  {subNode.keyPoints.map((pt, pIdx) => (
                                    <div key={pIdx} className="flex items-start gap-2">
                                      <span className="text-indigo-500 font-bold">•</span>
                                      <span className="leading-relaxed">{pt}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
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
        )}

      </div>
    </div>
  );
}
