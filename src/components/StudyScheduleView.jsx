import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Target, 
  Award, 
  ArrowRight,
  BookOpen,
  Sparkles,
  Flame,
  HelpCircle,
  Layers,
  FileText
} from 'lucide-react';

export default function StudyScheduleView({ onNavigateTab }) {
  const defaultSchedule = [
    {
      day: 1,
      dateLabel: "วันที่ 1 (D-6)",
      title: "ข้อ 1: สิทธิบัตรการประดิษฐ์ (Invention Patent)",
      articles: "ม.5, 6, 7, 8, 28, 31, 35 ทวิ, 36, 54",
      color: "indigo",
      tasks: [
        { id: "d1-t1", text: "ท่องจำ Flashcards ข้อ 1 (9 ใบ) ให้จำสูตร 'ใหม่-ขั้นสูง-อุตสาหกรรม' ได้แม่นยำ", linkTab: "flashcards" },
        { id: "d1-t2", text: "ทำความเข้าใจงานที่ปรากฏอยู่แล้ว 5 ข้อ และ Grace Period 12 เดือน (ม.6 วรรคท้าย)", linkTab: "q1" },
        { id: "d1-t3", text: "จำข้อยกเว้นการละเมิด 7 ประการตาม ม.36 วรรคสอง (โดยเฉพาะวิจัยและจำหน่ายต่อ)", linkTab: "q1" },
        { id: "d1-t4", text: "ทดสอบทำ Mini Quiz ข้อ 1 ให้ได้คะแนนเต็ม 100%", linkTab: "quiz" }
      ],
      goal: "ท่องสูตรจำ 9 มาตราของข้อ 1 ได้ขึ้นใจ และเข้าใจเหตุเพิกถอนสิทธิบัตร ม.54"
    },
    {
      day: 2,
      dateLabel: "วันที่ 2 (D-5)",
      title: "ข้อ 2: การออกแบบผลิตภัณฑ์ & สัญญาลูกจ้าง",
      articles: "ม.10, 11, 31, 56, 57, 58, 65",
      color: "amber",
      tasks: [
        { id: "d2-t1", text: "ท่องจำ Flashcards ข้อ 2 (7 ใบ) สิทธิของผู้ออกแบบและสัญญาลูกจ้าง", linkTab: "flashcards" },
        { id: "d2-t2", text: "ทำความเข้าใจหัวใจ ม.65 บทอนุโลม (ดึง ม.10, 11, 31 มาใช้กับการออกแบบ)", linkTab: "q2" },
        { id: "d2-t3", text: "จำจุดตายข้อสอบ: สิทธิบัตรการออกแบบ 'ไม่มี Grace period 12 เดือน'!", linkTab: "q2" },
        { id: "d2-t4", text: "ทำความเข้าใจขั้นตอนนายจ้างยื่นคัดค้าน ม.31 ภายใน 90 วันนับแต่วันประกาศโฆษณา", linkTab: "q2" }
      ],
      goal: "จำแม่นว่าการออกแบบไม่ต้องมีขั้นสูง ไม่มีผ่อนผัน 12 เดือน และสัญญาจ้างสิทธิตกนายจ้าง"
    },
    {
      day: 3,
      dateLabel: "วันที่ 3 (D-4)",
      title: "ทบทวนสิทธิบัตร (ข้อ 1 + ข้อ 2) ด้วยโจทย์ตุ๊กตา",
      articles: "ม.5–8, 10–11, 28, 31, 35 ทวิ, 36, 54, 56–58, 65",
      color: "blue",
      tasks: [
        { id: "d3-t1", text: "ศึกษาและซ้อมเขียนตอบข้อสอบตุ๊กตา 1: คดี Sea Walker (ฎีกา 934/2549)", linkTab: "exam-tips" },
        { id: "d3-t2", text: "ศึกษาข้อสอบตุ๊กตา 2: ความคุ้มครองชั่วคราวช่วงประกาศโฆษณา ม.35 ทวิ", linkTab: "exam-tips" },
        { id: "d3-t3", text: "ฝึกเขียนตอบข้อสอบตุ๊กตา 3 และ 4: ลูกจ้างแอบนำแบบไปจด และการคัดค้าน 90 วัน", linkTab: "exam-tips" },
        { id: "d3-t4", text: "ดูผัง Mind Map เปรียบเทียบ ข้อ 1 vs ข้อ 2 ผ่านตาราง Matrix", linkTab: "comparison" }
      ],
      goal: "เขียนตอบข้อสอบอัตนัยตามสูตร IRAC (Issue, Rule, Application, Conclusion) ได้คล่องแคล่ว"
    },
    {
      day: 4,
      dateLabel: "วันที่ 4 (D-3)",
      title: "ข้อ 3: พ.ร.บ. เครื่องหมายการค้า (Trademark Act)",
      articles: "ม.6, 7, 8, 13, 44, 46, 61, 67",
      color: "rose",
      tasks: [
        { id: "d4-t1", text: "ท่องจำ Flashcards ข้อ 3 (8 ใบ) ประตู 3 ชั้น และผลของการไม่จดทะเบียน", linkTab: "flashcards" },
        { id: "d4-t2", text: "ทำความเข้าใจ ม.7: บ่งเฉพาะในตัวเอง vs บ่งเฉพาะจากการใช้จนแพร่หลาย (รสดี/OISHI)", linkTab: "q3" },
        { id: "d4-t3", text: "จำลักษณะต้องห้าม ม.8 (13 อนุมาตรา โดยเฉพาะธงชาติ และ Well-Known Mark)", linkTab: "q3" },
        { id: "d4-t4", text: "ทดสอบทำ Mini Quiz ข้อ 3 ให้ได้คะแนนเต็ม", linkTab: "quiz" }
      ],
      goal: "เข้าใจประตู 3 ชั้น และท่องจำหลัก 'ไม่จดทะเบียนห้ามฟ้องละเมิด แต่วรรคสองฟ้องลวงขายได้'"
    },
    {
      day: 5,
      dateLabel: "วันที่ 5 (D-2)",
      title: "ทบทวนเครื่องหมายการค้า (ข้อ 3) & ข้อสอบตุ๊กตา",
      articles: "ม.6, 7, 8, 13, 44, 46, 61, 67",
      color: "pink",
      tasks: [
        { id: "d5-t1", text: "ฝึกเขียนตอบข้อสอบตุ๊กตา 5: คดีแย่งจดเครื่องหมาย และฟ้องลวงขาย ม.46", linkTab: "exam-tips" },
        { id: "d5-t2", text: "ฝึกเขียนตอบข้อสอบตุ๊กตา 6: คำเล็งถึงลักษณะสินค้า แต่จดได้เพราะ ม.7 วรรคสาม", linkTab: "exam-tips" },
        { id: "d5-t3", text: "จำอายุความ ม.67: ฟ้องเพิกถอนเพราะสิทธิดีกว่าใน 5 ปี / ฟ้องขัด ม.8 ได้ตลอดเวลา", linkTab: "q3" },
        { id: "d5-t4", text: "ทบทวนความเหมือนคล้าย ม.13 ทั้ง 4 มิติ (สายตา สำเนียง ความหมาย สภาพสินค้า)", linkTab: "q3" }
      ],
      goal: "ตอบประเด็น ม.44, 46, 61, 67 ได้อย่างแม่นยำ ไม่สับสนระหว่างคดีละเมิดกับคดีลวงขาย"
    },
    {
      day: 6,
      dateLabel: "วันที่ 6 (D-1)",
      title: "ทดลองสอบจำลองรวม 3 ข้อ (Mock Exam Drill)",
      articles: "ครอบคลุมครบ 23 มาตราแม่บท",
      color: "purple",
      tasks: [
        { id: "d6-t1", text: "ทำข้อสอบ Mini Quiz รวมทุกหมวดจับเวลา (ผ่านเกณฑ์ 90% ขึ้นไป)", linkTab: "quiz" },
        { id: "d6-t2", text: "เขียนตอบข้อสอบตุ๊กตา IRAC จำลอง 3 ข้อ รวดเดียว ภายในเวลา 90 นาที", linkTab: "exam-tips" },
        { id: "d6-t3", text: "สแกนทบทวนตารางเปรียบเทียบแม่บท 7 มิติ เพื่อเก็บตกจุดต่าง", linkTab: "comparison" },
        { id: "d6-t4", text: "ตรวจทานสมุดจดโน้ตสรุปส่วนตัว และเคลียร์ข้อสงสัยทั้งหมด", linkTab: "notes" }
      ],
      goal: "สร้างความมั่นใจเสมือนนั่งทำข้อสอบจริง บริหารเวลาได้ดี และปรับบทกฎหมายได้ถูกต้อง"
    },
    {
      day: 7,
      dateLabel: "วันที่ 7 (วันก่อนสอบ)",
      title: "ทบทวนจุดตาย & สูตรช่วยจำ 23 มาตรา (Final Polish)",
      articles: "23 มาตราแม่บท (เตรียมพร้อมเข้าห้องสอบ)",
      color: "emerald",
      tasks: [
        { id: "d7-t1", text: "กวาดสายตาดู Mind Map ความเชื่อมโยงของทั้ง 3 ข้อสอบ 1 รอบใหญ่", linkTab: "tree" },
        { id: "d7-t2", text: "เปิด Flashcards กวาดสายตาทบทวนเฉพาะ 'สูตรจำสั้น' ทั้ง 24 ใบ", linkTab: "flashcards" },
        { id: "d7-t3", text: "ทบทวนฎีกาหลัก: 934/2549 (Sea Walker), 608/2545 (JAVACAFE)", linkTab: "exam-tips" },
        { id: "d7-t4", text: "เข้านอนแต่หัวค่ำ พักผ่อนให้เต็มที่ จิตใจแจ่มใส พร้อมคว้าคะแนนเต็ม 26 ก.ย. 69!", linkTab: "schedule" }
      ],
      goal: "สภาพร่างกายและจิตใจพร้อม 100% จำตัวเลขและมาตราหลักได้แม่นยำ ไม่มีตื่นเต้น"
    }
  ];

  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('exam_7day_schedule');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('exam_7day_schedule', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => {
      if (prev.includes(taskId)) {
        return prev.filter(id => id !== taskId);
      } else {
        return [...prev, taskId];
      }
    });
  };

  const totalTasks = defaultSchedule.reduce((acc, d) => acc + d.tasks.length, 0);
  const progressPercent = Math.round((completedTasks.length / totalTasks) * 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden border border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-purple-950/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-600 text-white tracking-wide uppercase">
                7-Day Countdown Plan
              </span>
              <span className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold flex items-center gap-1">
                <Target className="w-3.5 h-3.5" /> สอบ 26 ก.ย. 69
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              แผนติวเข้ม 7 วันสู่ชัยชนะในห้องสอบ
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              ตารางเรียนรู้และทบทวนอย่างเป็นระบบวันต่อวัน ครอบคลุม 3 เสาหลักข้อสอบ (23 มาตราแม่บท) เช็คความพร้อมและบันทึกความก้าวหน้าอัตโนมัติ
            </p>
          </div>

          {/* Progress Gauge */}
          <div className="flex flex-col items-center sm:items-end justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-4 border border-indigo-100 dark:border-slate-700 shadow-sm min-w-[200px]">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">ความพร้อมก่อนสอบ</div>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{progressPercent}%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">({completedTasks.length}/{totalTasks} ภารกิจ)</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden mt-1">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Days Timeline */}
      <div className="space-y-6">
        {defaultSchedule.map((dayPlan) => {
          const dayTasksCompleted = dayPlan.tasks.filter(t => completedTasks.includes(t.id)).length;
          const isDayDone = dayTasksCompleted === dayPlan.tasks.length;

          return (
            <div 
              key={dayPlan.day}
              className={`glass-card rounded-2xl p-6 border transition-all duration-200 ${
                isDayDone 
                  ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900/60'
              }`}
            >
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-sm ${
                    isDayDone 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                  }`}>
                    {isDayDone ? <CheckCircle2 className="w-6 h-6" /> : `D${dayPlan.day}`}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {dayPlan.dateLabel}
                      </span>
                      {isDayDone && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> สำเร็จแล้ว
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {dayPlan.title}
                    </h3>
                  </div>
                </div>

                <div className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono flex items-center gap-1.5 self-start sm:self-auto">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{dayPlan.articles}</span>
                </div>
              </div>

              {/* Tasks List */}
              <div className="mt-4 space-y-2.5">
                {dayPlan.tasks.map((task) => {
                  const isChecked = completedTasks.includes(task.id);
                  return (
                    <div 
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`flex items-start justify-between gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40 text-slate-500 dark:text-slate-400' 
                          : 'bg-white/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <button 
                          type="button"
                          className="mt-0.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                          )}
                        </button>
                        <span className={`text-sm leading-relaxed ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                          {task.text}
                        </span>
                      </div>

                      {task.linkTab && onNavigateTab && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateTab(task.linkTab);
                          }}
                          className="text-xs px-2.5 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 dark:text-indigo-300 font-medium flex items-center gap-1 transition-colors whitespace-nowrap"
                        >
                          <span>ไปที่เครื่องมือ</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Goal Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">เป้าหมายประจำวัน:</span>
                  <span>{dayPlan.goal}</span>
                </div>
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  {dayTasksCompleted}/{dayPlan.tasks.length} สำเร็จ
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
