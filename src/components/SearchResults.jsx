import React from 'react';
import { Search, ArrowRight, Scale, BookOpen, ChevronRight } from 'lucide-react';
import { patentCategories } from '../data/patentData';

export default function SearchResults({ 
  query, 
  onSelectResult,
  onClose
}) {
  if (!query || query.trim() === '') return null;

  const q = query.toLowerCase().trim();

  // Search across patent categories steps and details
  const results = [];

  patentCategories.forEach((cat) => {
    cat.steps.forEach((step) => {
      // Check step title or article
      const stepMatch = 
        step.stepName.toLowerCase().includes(q) || 
        step.article.toLowerCase().includes(q) ||
        step.summary.toLowerCase().includes(q);

      // Check details
      step.details.forEach((detail) => {
        if (
          stepMatch || 
          detail.title.toLowerCase().includes(q) || 
          detail.content.toLowerCase().includes(q)
        ) {
          results.push({
            categoryId: cat.id,
            categoryTitle: cat.title,
            stepNum: step.step,
            stepName: step.stepName,
            article: step.article,
            title: detail.title,
            snippet: detail.content.slice(0, 160) + '...'
          });
        }
      });
    });
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
          <Search className="w-4 h-4 text-indigo-500" />
          <span>ผลการค้นหาสำหรับ: <strong className="text-indigo-600 dark:text-indigo-400">"{query}"</strong></span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            พบ {results.length} รายการ
          </span>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center text-slate-500 border space-y-2">
          <div className="text-3xl">🔍</div>
          <div className="font-semibold text-slate-700 dark:text-slate-300">ไม่พบข้อมูลที่ตรงกับคำค้นหา</div>
          <p className="text-xs text-slate-400">ลองค้นหาด้วยเลขมาตรา เช่น "ม. 9", "ม. 36" หรือคำว่า "ความใหม่", "ข้อยกเว้น"</p>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectResult(item.categoryId)}
              className="glass-card rounded-2xl p-4 border hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    {item.categoryTitle}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {item.article}
                  </span>
                </div>
                <div className="text-xs text-indigo-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  ไปยังหมวดนี้ <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-indigo-500 shrink-0" />
                {item.title}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {item.snippet}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
