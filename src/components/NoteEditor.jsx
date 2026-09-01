import React, { useState } from 'react';
import { 
  FileText, 
  Save, 
  Trash2, 
  Download, 
  Plus, 
  Clock, 
  Check,
  StickyNote
} from 'lucide-react';

export default function NoteEditor({ notes, saveNote, deleteNote }) {
  const [activeNoteCategory, setActiveNoteCategory] = useState('invention');
  const [currentText, setCurrentText] = useState(notes[activeNoteCategory] || '');
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  const categories = [
    { id: 'invention', label: 'โน้ต: สิทธิบัตรการประดิษฐ์' },
    { id: 'petty', label: 'โน้ต: อนุสิทธิบัตร' },
    { id: 'design', label: 'โน้ต: สิทธิบัตรการออกแบบ' },
    { id: 'copyright', label: 'โน้ต: กฎหมายลิขสิทธิ์' },
    { id: 'general', label: 'โน้ต: ข้อสังเกตทั่วไป / คำศัพท์' },
  ];

  const handleCategorySwitch = (catId) => {
    setActiveNoteCategory(catId);
    setCurrentText(notes[catId] || '');
    setIsSavedRecently(false);
  };

  const handleSave = () => {
    saveNote(activeNoteCategory, currentText);
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 2000);
  };

  const handleDelete = () => {
    if (window.confirm('คุณต้องการลบโน้ตในหมวดนี้หรือไม่?')) {
      deleteNote(activeNoteCategory);
      setCurrentText('');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([currentText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patent-note-${activeNoteCategory}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400">
                <StickyNote className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                สมุดจดโน้ตส่วนตัว (Personal Study Notes)
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              จดบันทึกสรุปย่อหรือประเด็นที่ต้องการเน้น ระบบจะบันทึกลงในเครื่องของคุณอัตโนมัติ (localStorage)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              title="ดาวน์โหลดเป็นไฟล์ .txt"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> ส่งออก .txt
            </button>
            <button
              onClick={handleDelete}
              title="ลบโน้ตนี้"
              className="p-2 text-xs rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 hover:bg-rose-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {categories.map((cat) => {
            const hasContent = notes[cat.id] && notes[cat.id].trim().length > 0;
            const isActive = activeNoteCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySwitch(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                {hasContent && (
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-cyan-500'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Textarea Editor */}
      <div className="glass-card rounded-2xl p-6 border space-y-4">
        <textarea
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="พิมพ์สรุปย่อหรือโน้ตของคุณที่นี่..."
          rows={12}
          className="w-full p-4 rounded-xl text-sm bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-slate-100 leading-relaxed font-sans"
        />

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-400">
            จำนวนตัวอักษร: {currentText.length} ตัวอักษร
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20 transition-all"
          >
            {isSavedRecently ? (
              <>
                <Check className="w-4 h-4" /> บันทึกเรียบร้อยแล้ว!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> บันทึกโน้ต
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
