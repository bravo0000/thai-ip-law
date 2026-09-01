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
  Scale
} from 'lucide-react';
import { 
  comparisonRows, 
  threePillarsRows, 
  patentComparisonRows 
} from '../data/comparisonData';

export default function ComparisonTable() {
  const [viewMode, setViewMode] = useState('three-pillars'); // 'three-pillars', 'patent-types', 'all'
  const [filterQuery, setFilterQuery] = useState('');

  // Select rows based on view mode
  const getCurrentRows = () => {
    if (viewMode === 'three-pillars') return threePillarsRows;
    if (viewMode === 'patent-types') return patentComparisonRows;
    return comparisonRows;
  };

  const currentRows = getCurrentRows();

  const filteredRows = currentRows.filter(row => {
    const q = filterQuery.toLowerCase();
    return Object.values(row).some(val => 
      typeof val === 'string' && val.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Bar */}
      <div className="glass-card rounded-2xl p-6 border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                <TableProperties className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                ตารางเปรียบเทียบแม่บท (Comparison Matrix)
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              สลับมุมมองเปรียบเทียบ 3 เสาหลัก (เครื่องหมายการค้า vs สิทธิบัตร vs ลิขสิทธิ์) หรือ สิทธิบัตร 3 ประเภท
            </p>
          </div>

          {/* View Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setViewMode('three-pillars')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'three-pillars'
                  ? 'bg-rose-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              🏆 แม่บท 3 เสาหลัก (TM vs Patent vs CR)
            </button>
            <button
              onClick={() => setViewMode('patent-types')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'patent-types'
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              🛡️ สิทธิบัตร 3 ประเภท (ประดิษฐ์/อนุ/ออกแบบ)
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'all'
                  ? 'bg-purple-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              📊 ตารางรวมทุกมิติ (All Columns)
            </button>
          </div>
        </div>

        {/* Search inside table */}
        <div className="mt-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="ค้นหา เช่น 'ความใหม่', 'อายุ', 'อาญาแผ่นดิน', '12 เดือน'..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="glass-card rounded-2xl border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/70">
                <th className="p-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider min-w-[200px]">
                  หัวข้อเปรียบเทียบ
                </th>

                {/* Mode: Three Pillars */}
                {viewMode === 'three-pillars' && (
                  <>
                    <th className="p-4 text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider min-w-[240px] bg-rose-50/50 dark:bg-rose-950/30 border-l border-slate-200 dark:border-slate-800">
                      🏷️ เครื่องหมายการค้า (Trademark)
                    </th>
                    <th className="p-4 text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider min-w-[240px] bg-indigo-50/50 dark:bg-indigo-950/30 border-l border-slate-200 dark:border-slate-800">
                      🛡️ สิทธิบัตร (Patent)
                    </th>
                    <th className="p-4 text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider min-w-[240px] bg-purple-50/50 dark:bg-purple-950/30 border-l border-slate-200 dark:border-slate-800">
                      ©️ ลิขสิทธิ์ (Copyright)
                    </th>
                  </>
                )}

                {/* Mode: Patent Types */}
                {viewMode === 'patent-types' && (
                  <>
                    <th className="p-4 text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider min-w-[230px] bg-indigo-50/50 dark:bg-indigo-950/30 border-l border-slate-200 dark:border-slate-800">
                      1. สิทธิบัตรการประดิษฐ์ (ม. 5)
                    </th>
                    <th className="p-4 text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider min-w-[230px] bg-emerald-50/50 dark:bg-emerald-950/30 border-l border-slate-200 dark:border-slate-800">
                      2. อนุสิทธิบัตร (ม. 65 ทวิ)
                    </th>
                    <th className="p-4 text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider min-w-[230px] bg-amber-50/50 dark:bg-amber-950/30 border-l border-slate-200 dark:border-slate-800">
                      3. สิทธิบัตรการออกแบบ (ม. 56)
                    </th>
                  </>
                )}

                {/* Mode: All Columns */}
                {viewMode === 'all' && (
                  <>
                    <th className="p-4 text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider min-w-[200px] bg-indigo-50/50 dark:bg-indigo-950/30 border-l border-slate-200 dark:border-slate-800">
                      การประดิษฐ์
                    </th>
                    <th className="p-4 text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider min-w-[200px] bg-emerald-50/50 dark:bg-emerald-950/30 border-l border-slate-200 dark:border-slate-800">
                      อนุสิทธิบัตร
                    </th>
                    <th className="p-4 text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider min-w-[200px] bg-amber-50/50 dark:bg-amber-950/30 border-l border-slate-200 dark:border-slate-800">
                      การออกแบบ
                    </th>
                    <th className="p-4 text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider min-w-[200px] bg-rose-50/50 dark:bg-rose-950/30 border-l border-slate-200 dark:border-slate-800">
                      เครื่องหมายการค้า
                    </th>
                    <th className="p-4 text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider min-w-[200px] bg-purple-50/50 dark:bg-purple-950/30 border-l border-slate-200 dark:border-slate-800">
                      ลิขสิทธิ์
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm">
              {filteredRows.map((row, index) => (
                <tr 
                  key={index}
                  className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                >
                  {/* Criteria */}
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 align-top">
                    {row.criteria}
                  </td>

                  {/* Mode: Three Pillars */}
                  {viewMode === 'three-pillars' && (
                    <>
                      <td className="p-4 text-slate-700 dark:text-slate-300 align-top border-l border-slate-200 dark:border-slate-800 leading-relaxed bg-rose-50/10 dark:bg-rose-950/10">
                        {row.trademark}
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 align-top border-l border-slate-200 dark:border-slate-800 leading-relaxed bg-indigo-50/10 dark:bg-indigo-950/10">
                        {row.patent}
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 align-top border-l border-slate-200 dark:border-slate-800 leading-relaxed bg-purple-50/10 dark:bg-purple-950/10">
                        {row.copyright}
                      </td>
                    </>
                  )}

                  {/* Mode: Patent Types */}
                  {viewMode === 'patent-types' && (
                    <>
                      <td className="p-4 text-slate-700 dark:text-slate-300 align-top border-l border-slate-200 dark:border-slate-800 leading-relaxed bg-indigo-50/10 dark:bg-indigo-950/10">
                        {row.invention}
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 align-top border-l border-slate-200 dark:border-slate-800 leading-relaxed bg-emerald-50/10 dark:bg-emerald-950/10">
                        {row.petty}
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 align-top border-l border-slate-200 dark:border-slate-800 leading-relaxed bg-amber-50/10 dark:bg-amber-950/10">
                        {row.design}
                      </td>
                    </>
                  )}

                  {/* Mode: All Columns */}
                  {viewMode === 'all' && (
                    <>
                      <td className="p-4 text-slate-700 dark:text-slate-300 align-top border-l border-slate-200 dark:border-slate-800 leading-relaxed bg-indigo-50/10 dark:bg-indigo-950/10">
                        {row.invention}
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 align-top border-l border-slate-200 dark:border-slate-800 leading-relaxed bg-emerald-50/10 dark:bg-emerald-950/10">
                        {row.petty}
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 align-top border-l border-slate-200 dark:border-slate-800 leading-relaxed bg-amber-50/10 dark:bg-amber-950/10">
                        {row.design}
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 align-top border-l border-slate-200 dark:border-slate-800 leading-relaxed bg-rose-50/10 dark:bg-rose-950/10">
                        {row.trademark}
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 align-top border-l border-slate-200 dark:border-slate-800 leading-relaxed bg-purple-50/10 dark:bg-purple-950/10">
                        {row.copyright}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
