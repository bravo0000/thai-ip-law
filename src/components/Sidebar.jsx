import React from 'react';
import { 
  Lightbulb, 
  Palette, 
  Tag,
  TableProperties, 
  Layers, 
  HelpCircle, 
  FileText, 
  Flame,
  CheckCircle2, 
  GitFork,
  Calendar,
  Sparkles,
  Target,
  Zap,
  BookCheck
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  completedSteps, 
  patentCategories,
  notesCount
}) {
  // 3 Brand New Rapid Exam Topics (directly from the 3 summary markdown documents)
  const rapidNavItems = [
    {
      id: 'rapid_q1',
      label: 'ข้อ 1: สิทธิบัตรการประดิษฐ์',
      labelEn: 'Invention Patent Rapid',
      badge: '9 มาตรา + 4 ท่อน',
      icon: Zap,
      color: 'text-indigo-500',
      activeColor: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700 border-l-4 shadow-sm'
    },
    {
      id: 'rapid_q2',
      label: 'ข้อ 2: ลูกจ้างนายจ้าง & ออกแบบ',
      labelEn: 'Design & Employee Rapid',
      badge: '10 มาตรา + 4 ท่อน',
      icon: Zap,
      color: 'text-amber-500',
      activeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 border-l-4 shadow-sm'
    },
    {
      id: 'rapid_q3',
      label: 'ข้อ 3: เครื่องหมายการค้า & ปังชา',
      labelEn: 'Trademark & Pang Cha Rapid',
      badge: '8 มาตรา + 4 ท่อน',
      icon: Zap,
      color: 'text-rose-500',
      activeColor: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700 border-l-4 shadow-sm'
    }
  ];

  const mainNavItems = [
    {
      id: 'q1',
      label: 'ข้อ 1: สิทธิบัตรการประดิษฐ์',
      labelEn: 'Invention Patent (Detail)',
      badge: '9 มาตรา',
      icon: Lightbulb,
      color: 'text-indigo-500',
      activeColor: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 border-l-4 shadow-sm'
    },
    {
      id: 'q2',
      label: 'ข้อ 2: การออกแบบ & สัญญาจ้าง',
      labelEn: 'Design & Employee (Detail)',
      badge: '7 มาตรา',
      icon: Palette,
      color: 'text-amber-500',
      activeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 border-l-4 shadow-sm'
    },
    {
      id: 'q3',
      label: 'ข้อ 3: พ.ร.บ. เครื่องหมายการค้า',
      labelEn: 'Trademark Law (Detail)',
      badge: '8 มาตรา',
      icon: Tag,
      color: 'text-rose-500',
      activeColor: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800 border-l-4 shadow-sm'
    }
  ];

  const toolNavItems = [
    {
      id: 'schedule',
      label: 'แผนติวเข้ม 7 วัน (Countdown)',
      labelEn: '7-Day Study Plan',
      icon: Calendar,
      color: 'text-emerald-500',
      badge: 'เป้าหมาย 26 ก.ย.'
    },
    {
      id: 'flashcards',
      label: 'Flashcards ท่องจำ 3 ข้อ',
      labelEn: 'Study Flashcards',
      icon: Layers,
      color: 'text-purple-500',
      badge: '24 ใบ'
    },
    {
      id: 'tree',
      label: 'ผังตรรกะเชื่อมโยง (Mind Map)',
      labelEn: 'Exam Logic Mind Map',
      icon: GitFork,
      color: 'text-indigo-500',
      badge: 'Interactive'
    },
    {
      id: 'exam-tips',
      label: 'ข้อสอบตุ๊กตา IRAC & ฎีกา',
      labelEn: 'IRAC Drills & Precedents',
      icon: Flame,
      color: 'text-rose-500',
      badge: 'ธงคำตอบ'
    },
    {
      id: 'quiz',
      label: 'แบบทดสอบ Mini Quiz',
      labelEn: 'Practice Quiz',
      icon: HelpCircle,
      color: 'text-cyan-500'
    },
    {
      id: 'comparison',
      label: 'ตารางเปรียบเทียบ 3 เสาหลัก',
      labelEn: 'Comparison Matrix',
      icon: TableProperties,
      color: 'text-blue-500'
    },
    {
      id: 'notes',
      label: 'สมุดเลกเชอร์สรุปส่วนตัว',
      labelEn: 'Personal Notes',
      icon: FileText,
      color: 'text-amber-500',
      badge: notesCount > 0 ? `${notesCount}` : null
    }
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      
      {/* 🚀 Dedicated Highlight Section: 3 Brand New Rapid Summary Topics */}
      <div className="glass-card rounded-2xl p-4 shadow-sm border-2 border-indigo-500/30 dark:border-indigo-500/40 relative overflow-hidden bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/40 dark:from-indigo-950/20 dark:via-slate-900/60 dark:to-purple-950/20">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
            สรุปเร่งรัด & ธงคำตอบ (3 ข้อ)
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/40">
            NEW
          </span>
        </div>

        <nav className="space-y-1.5">
          {rapidNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left border transition-all duration-200 group ${
                  isActive 
                    ? `${item.activeColor} font-bold shadow-md` 
                    : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs group-hover:scale-110 transition-transform ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold leading-tight">{item.label}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                      {item.labelEn}
                    </div>
                  </div>
                </div>

                <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-100/80 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium shrink-0">
                  {item.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Categories Section: The 3 Exam Pillars (Detailed View) */}
      <div className="glass-card rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-500" />
            3 เสาหลักข้อสอบ (แบบละเอียด)
          </span>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">รวม 24 มาตรา</span>
        </div>

        <nav className="space-y-1.5">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            // Calculate completed steps for this specific question
            const categoryData = patentCategories.find(c => c.id === item.id);
            const categorySteps = categoryData?.steps || [];
            const finishedInCat = categorySteps.filter(s => 
              completedSteps.includes(`${item.id}-step-${s.step}`)
            ).length;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left border transition-all duration-200 group ${
                  isActive 
                    ? `${item.activeColor} font-semibold shadow-sm` 
                    : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                      {item.labelEn}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                    {item.badge}
                  </span>
                  {finishedInCat > 0 && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 font-medium">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {finishedInCat}/{categorySteps.length}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Interactive Study Tools Section */}
      <div className="glass-card rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            เครื่องมือเสริมทักษะ 4 มิติ
          </span>
          <span className="text-[10px] text-slate-400">จำแม่น • วิเคราะห์คม</span>
        </div>

        <nav className="space-y-1">
          {toolNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left border transition-all duration-200 group ${
                  isActive
                    ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold border-purple-200 dark:border-purple-800 border-l-4 shadow-sm'
                    : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium">{item.label}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500">
                      {item.labelEn}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    item.id === 'schedule' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Exam Countdown Card */}
      <div className="rounded-2xl p-4 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200/60 dark:border-indigo-800/60 text-center space-y-2">
        <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-1">
          <Calendar className="w-3.5 h-3.5" /> สอบ 26 กันยายน 2569
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          จำกัดขอบเขตตรงเป๊ะ 24 มาตราตามคำชี้แจงสอบ ท่องจำทีละข้อเพื่อชัยชนะในการสอบ!
        </p>
        <button
          onClick={() => setActiveTab('schedule')}
          className="w-full text-xs font-bold py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
        >
          เปิดแผนติว 7 วัน
        </button>
      </div>

    </aside>
  );
}
