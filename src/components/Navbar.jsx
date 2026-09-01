import React from 'react';
import { 
  BookOpen, 
  Search, 
  Sun, 
  Moon, 
  Printer, 
  BookmarkCheck, 
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ 
  darkMode, 
  setDarkMode, 
  searchQuery, 
  setSearchQuery, 
  completedSteps, 
  totalSteps,
  activeTab,
  setActiveTab
}) {
  const progressPercent = Math.round((completedSteps.length / totalSteps) * 100) || 0;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Title */}
          <div 
            onClick={() => setActiveTab('invention')} 
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 dark:from-indigo-400 dark:via-purple-400 dark:to-rose-400 bg-clip-text text-transparent">
                  Thai IP Law Master
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  สิทธิบัตร • เครื่องหมาย • ลิขสิทธิ์
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                ระบบสรุปเข้มติวสอบกฎหมายทรัพย์สินทางปัญญา (นิติศาสตรบัณฑิต)
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาเลขมาตรา (เช่น ม. 6, ม. 13, ม. 36) หรือคำค้น..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700"
                >
                  ล้าง
                </button>
              )}
            </div>
          </div>

          {/* Action buttons & Stats */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Progress Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs">
              <BookmarkCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-slate-600 dark:text-slate-300">อ่านแล้ว:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {completedSteps.length}/{totalSteps} ({progressPercent}%)
              </span>
              <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden ml-1">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Print Button */}
            <button
              onClick={() => window.print()}
              title="พิมพ์เอกสาร / บันทึก PDF"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>

        </div>

        {/* Mobile Search input */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาเลขมาตรา เช่น ม. 6, ม. 13, ม. 36..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700"
              >
                ล้าง
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
