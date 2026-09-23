import React, { useState } from 'react';
import { 
  TableProperties, 
  Sparkles, 
  Search, 
  Check, 
  X, 
  ArrowRight,
  HelpCircle,
  Download,
  Layers,
  Scale,
  Target
} from 'lucide-react';
import { comparisonDimensions } from '../data/comparisonData';

export default function ComparisonTable() {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredDimensions = comparisonDimensions.filter(dim => {
    const q = filterQuery.toLowerCase();
    return (
      dim.title.toLowerCase().includes(q) ||
      dim.invention.toLowerCase().includes(q) ||
      dim.design.toLowerCase().includes(q) ||
      dim.trademark.toLowerCase().includes(q) ||
      dim.summary.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header & Filter Bar */}
      <div className="glass-card rounded-2xl p-6 border border-blue-100 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40 dark:from-blue-950/30 dark:via-slate-900 dark:to-indigo-950/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                <TableProperties className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                ตารางเปรียบเทียบจุดตัด 3 เสาหลักข้อสอบ (Comparison Matrix)
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              เปรียบเทียบจุดตัดที่มักออกสอบ: ข้อ 1 (สิทธิบัตรการประดิษฐ์) vs ข้อ 2 (การออกแบบผลิตภัณฑ์) vs ข้อ 3 (เครื่องหมายการค้า)
            </p>
          </div>

        </div>

        {/* Search inside table */}
        <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="ค้นหาจุดตัด เช่น Grace period, สัญญาจ้าง, คัดค้าน, เพิกถอน..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="glass-card rounded-2xl border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/80">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/4">
                  มิติเปรียบเทียบ
                </th>
                <th className="p-4 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/40 w-1/4 border-l border-r border-slate-200 dark:border-slate-800">
                  🥇 ข้อ 1: สิทธิบัตรการประดิษฐ์
                  <div className="text-[10px] font-normal text-slate-500 font-mono mt-0.5">ม.5, 6, 7, 8, 28, 31, 35 ทวิ, 36, 54</div>
                </th>
                <th className="p-4 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-950/40 w-1/4 border-r border-slate-200 dark:border-slate-800">
                  🥈 ข้อ 2: การออกแบบ & สัญญาจ้าง
                  <div className="text-[10px] font-normal text-slate-500 font-mono mt-0.5">ม.10, 11, 31, 56, 57, 58, 65</div>
                </th>
                <th className="p-4 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50/50 dark:bg-rose-950/40 w-1/4">
                  🥉 ข้อ 3: เครื่องหมายการค้า
                  <div className="text-[10px] font-normal text-slate-500 font-mono mt-0.5">ม.6, 7, 8, 13, 44, 46, 61, 67</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredDimensions.map((dim) => (
                <tr key={dim.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-white align-top space-y-1">
                    <div>{dim.title}</div>
                    <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                      {dim.summary}
                    </div>
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300 align-top whitespace-pre-line leading-relaxed bg-indigo-50/20 dark:bg-indigo-950/20 border-l border-r border-slate-200 dark:border-slate-800">
                    {dim.invention}
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300 align-top whitespace-pre-line leading-relaxed bg-amber-50/20 dark:bg-amber-950/20 border-r border-slate-200 dark:border-slate-800">
                    {dim.design}
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300 align-top whitespace-pre-line leading-relaxed bg-rose-50/20 dark:bg-rose-950/20">
                    {dim.trademark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Note */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
        <Target className="w-4 h-4 text-indigo-500 shrink-0" />
        <span>
          <strong>คำแนะนำในการสอบ:</strong> จุดตัดที่ออกข้อสอบบ่อยที่สุดคือ <strong>ระยะเวลาผ่อนผัน 12 เดือน</strong> (การประดิษฐ์มี ม.6 วรรคท้าย แต่การออกแบบไม่มี ม.65 ไม่ดึงมาใช้) และ <strong>ผลของการไม่จดทะเบียนเครื่องหมายการค้า</strong> (ม.46 ห้ามฟ้องละเมิด แต่ฟ้องลวงขายได้เสมอ)
        </span>
      </div>

    </div>
  );
}
