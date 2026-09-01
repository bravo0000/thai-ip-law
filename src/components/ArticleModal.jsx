import React from 'react';
import { X, BookOpen, Scale, ArrowRight } from 'lucide-react';

export default function ArticleModal({ article, onClose, onSelectCategory }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
            <Scale className="w-5 h-5" />
            <span>คำอธิบายบทบัญญัติ {article}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
          <p>
            มาตรา <strong>{article}</strong> เป็นบทบัญญัติหลักในพระราชบัญญัติสิทธิบัตร พ.ศ. 2522 ซึ่งกำหนดหลักเกณฑ์ เงื่อนไข และขอบเขตความคุ้มครองทางทรัพย์สินทางปัญญา
          </p>
          <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-xs space-y-1">
            <div className="font-semibold text-indigo-900 dark:text-indigo-300">💡 คำแนะนำสำหรับการสอบ:</div>
            <p className="text-slate-600 dark:text-slate-300">
              จดจำองค์ประกอบของมาตรานี้ให้แม่นยำ โดยเฉพาะข้อยกเว้นและข้อกำหนดเรื่องระยะเวลา เพราะมักเป็นจุดตัดคะแนนในการวินิจฉัยข้อสอบ
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
}
