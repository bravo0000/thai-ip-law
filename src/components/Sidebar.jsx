import React from 'react';
import { 
  Lightbulb, 
  Wrench, 
  Palette, 
  Tag,
  TableProperties, 
  Layers, 
  HelpCircle, 
  FileText, 
  Flame,
  Award,
  CheckCircle2,
  BookOpen,
  GitFork
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  completedSteps, 
  patentCategories,
  notesCount
}) {
  const mainNavItems = [
    {
      id: 'invention',
      label: 'สิทธิบัตรการประดิษฐ์',
      labelEn: 'Invention Patent',
      badge: '20 ปี',
      icon: Lightbulb,
      color: 'text-indigo-500',
      activeColor: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
    },
    {
      id: 'petty',
      label: 'อนุสิทธิบัตร',
      labelEn: 'Petty Patent',
      badge: '6-10 ปี',
      icon: Wrench,
      color: 'text-emerald-500',
      activeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    },
    {
      id: 'design',
      label: 'สิทธิบัตรการออกแบบ',
      labelEn: 'Design Patent',
      badge: '10 ปี',
      icon: Palette,
      color: 'text-amber-500',
      activeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    },
    {
      id: 'trademark',
      label: 'เครื่องหมายการค้า',
      labelEn: 'Trademark Law',
      badge: '10ปี ต่อได้เรื่อยๆ',
      icon: Tag,
      color: 'text-rose-500',
      activeColor: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
    },
    {
      id: 'copyright',
      label: 'กฎหมายลิขสิทธิ์ (พ.ร.บ. 2537)',
      labelEn: 'Copyright Law',
      badge: 'ตลอดชีพ+50ปี',
      icon: BookOpen,
      color: 'text-purple-500',
      activeColor: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
    }
  ];

  const toolNavItems = [
    {
      id: 'tree',
      label: 'แผนภูมิต้นไม้ (Mind Map)',
      labelEn: 'IP Law Tree Diagram',
      icon: GitFork,
      color: 'text-indigo-500',
      badge: 'Interactive'
    },
    {
      id: 'comparison',
      label: 'ตารางเปรียบเทียบแม่บท',
      labelEn: 'Comparison Matrix',
      icon: TableProperties,
      color: 'text-blue-500'
    },
    {
      id: 'flashcards',
      label: 'Flashcards ท่องจำ',
      labelEn: 'Study Flashcards',
      icon: Layers,
      color: 'text-purple-500'
    },
    {
      id: 'quiz',
      label: 'แบบทดสอบ Mini Quiz',
      labelEn: 'Knowledge Test',
      icon: HelpCircle,
      color: 'text-pink-500'
    },
    {
      id: 'exam-tips',
      label: 'แนวฎีกา & ข้อสอบตุ๊กตา IRAC',
      labelEn: 'Exam Tips & IRAC Drills',
      icon: Flame,
      color: 'text-rose-500'
    },
    {
      id: 'notes',
      label: 'สมุดจดโน้ตส่วนตัว',
      labelEn: 'Personal Notes',
      icon: FileText,
      color: 'text-cyan-500',
      badge: notesCount > 0 ? `${notesCount}` : null
    }
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      
      {/* Main Categories Section */}
      <div className="glass-card rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            หมวดหมู่กฎหมายหลัก (IP Modules)
          </span>
          <span className="text-[11px] text-slate-500">สิทธิบัตร • เครื่องหมาย • ลิขสิทธิ์</span>
        </div>

        <nav className="space-y-1.5">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            // Calculate completed steps for this specific category
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
                    ? `${item.activeColor} shadow-sm font-semibold border-l-4` 
                    : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm">{item.label}</div>
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
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
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

      {/* Study & Exam Tools Section */}
      <div className="glass-card rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            เครื่องมือทบทวน & สอบ
          </span>
          <span className="text-[11px] text-indigo-500 font-medium flex items-center gap-1">
            <Award className="w-3 h-3" /> Exam Ready
          </span>
        </div>

        <nav className="space-y-1.5">
          {toolNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left border transition-all duration-200 group ${
                  isActive 
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 shadow-sm font-semibold border-l-4' 
                    : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm">{item.label}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                      {item.labelEn}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Law Reference Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-200/50 dark:border-indigo-800/50 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <div className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          กฎหมายทรัพย์สินทางปัญญาที่เกี่ยวข้อง
        </div>
        <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-500 dark:text-slate-400">
          <li>พ.ร.บ. สิทธิบัตร พ.ศ. 2522 (ม.1–88)</li>
          <li>พ.ร.บ. เครื่องหมายการค้า พ.ศ. 2534 (ม.1–132)</li>
          <li>พ.ร.บ. ลิขสิทธิ์ พ.ศ. 2537 (ม.1–78)</li>
          <li>พ.ร.บ. ความลับทางการค้า พ.ศ. 2545</li>
        </ul>
      </div>

    </aside>
  );
}
