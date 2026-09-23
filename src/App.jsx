import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PatentSection from './components/PatentSection';
import TreeDiagramView from './components/TreeDiagramView';
import ComparisonTable from './components/ComparisonTable';
import FlashcardViewer from './components/FlashcardViewer';
import QuizView from './components/QuizView';
import ExamTipsView from './components/ExamTipsView';
import NoteEditor from './components/NoteEditor';
import ArticleModal from './components/ArticleModal';
import SearchResults from './components/SearchResults';
import AudioPlayerBar from './components/AudioPlayerBar';
import StudyScheduleView from './components/StudyScheduleView';
import { patentCategories } from './data/patentData';
import { BookOpen, Sparkles, Target } from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('patent_dark_mode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Active navigation tab (Default to Question 1)
  const [activeTab, setActiveTab] = useState('q1');

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Article Modal state
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Completed steps (for study progress tracking)
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('patent_completed_steps');
    return saved ? JSON.parse(saved) : [];
  });

  // Notes per category (localStorage)
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('patent_user_notes');
    return saved ? JSON.parse(saved) : {};
  });

  // Text-to-Speech (TTS) state
  const [currentPlayingText, setCurrentPlayingText] = useState(null);
  const [currentTitle, setCurrentTitle] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const utteranceRef = useRef(null);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('patent_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Persist completed steps
  useEffect(() => {
    localStorage.setItem('patent_completed_steps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  // Handle SpeechSynthesis
  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentPlayingText(null);
    setCurrentTitle('');
  };

  const playAudio = (text, title = '') => {
    if (!('speechSynthesis' in window)) {
      alert('ขออภัย เบราว์เซอร์ของคุณไม่รองรับ Web Speech API');
      return;
    }

    window.speechSynthesis.cancel(); // Stop any currently playing audio

    const cleanText = text
      .replace(/[#*`_]/g, '')
      .replace(/[\n\r]+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'th-TH';
    utterance.rate = playbackRate;

    // Try to find a Thai voice if available
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find(v => v.lang.startsWith('th') || v.name.includes('Thai'));
    if (thaiVoice) {
      utterance.voice = thaiVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentPlayingText(null);
      setCurrentTitle('');
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    setCurrentPlayingText(cleanText);
    setCurrentTitle(title);

    window.speechSynthesis.speak(utterance);
  };

  const pauseAudio = () => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeAudio = () => {
    if ('speechSynthesis' in window && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  // Change playback speed during or before playback
  useEffect(() => {
    if (isPlaying && currentPlayingText) {
      playAudio(currentPlayingText, currentTitle);
    }
  }, [playbackRate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Persist notes
  const saveNote = (categoryId, text) => {
    const updated = { ...notes, [categoryId]: text };
    setNotes(updated);
    localStorage.setItem('patent_user_notes', JSON.stringify(updated));
  };

  const deleteNote = (categoryId) => {
    const updated = { ...notes };
    delete updated[categoryId];
    setNotes(updated);
    localStorage.setItem('patent_user_notes', JSON.stringify(updated));
  };

  // Toggle step completion
  const toggleStepComplete = (stepKey) => {
    setCompletedSteps(prev => {
      if (prev.includes(stepKey)) {
        return prev.filter(k => k !== stepKey);
      } else {
        return [...prev, stepKey];
      }
    });
  };

  // Categories state for 3 exam pillars (initialized from patentCategories with localStorage backup)
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('patent_custom_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 3) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading custom categories from localStorage', e);
    }
    return patentCategories;
  });

  const [saveStatus, setSaveStatus] = useState({ state: 'idle', message: '' }); // 'idle' | 'saving' | 'success' | 'error'

  const handleUpdateCategory = async (updatedCategory) => {
    // 1. Update React state immediately
    const nextCategories = categories.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    );
    setCategories(nextCategories);

    // 2. Persist to localStorage for fallback
    try {
      localStorage.setItem('patent_custom_categories', JSON.stringify(nextCategories));
    } catch (err) {
      console.error('LocalStorage save error:', err);
    }

    // 3. Send to Vite backend API to write directly to code files on disk
    setSaveStatus({ state: 'saving', message: 'กำลังบันทึกข้อมูลลงไฟล์โค้ดบนเครื่อง...' });
    try {
      const res = await fetch('/api/save-pillar-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: updatedCategory.id,
          categoryData: updatedCategory,
          allCategories: nextCategories
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      setSaveStatus({ 
        state: 'success', 
        message: data.message || 'บันทึกข้อมูลลงไฟล์โค้ดสำเร็จเรียบร้อยแล้ว!' 
      });
      setTimeout(() => setSaveStatus({ state: 'idle', message: '' }), 4000);
      return { success: true };
    } catch (err) {
      console.warn('API save to disk error (may be running in static preview):', err);
      setSaveStatus({ 
        state: 'success', 
        message: 'บันทึกข้อมูลสำเร็จเรียบร้อย (บันทึกใน LocalStorage สำรอง)' 
      });
      setTimeout(() => setSaveStatus({ state: 'idle', message: '' }), 4000);
      return { success: true, localOnly: true };
    }
  };

  const handleResetCategories = async () => {
    if (!window.confirm('คุณต้องการคืนค่าเนื้อหาทั้งหมดกลับเป็นค่าเริ่มต้นจากระบบใช่หรือไม่?')) {
      return;
    }
    localStorage.removeItem('patent_custom_categories');
    setCategories(patentCategories);
    setSaveStatus({ state: 'success', message: 'คืนค่าเริ่มต้นสำเร็จเรียบร้อยแล้ว' });
    setTimeout(() => setSaveStatus({ state: 'idle', message: '' }), 3000);
  };

  // Calculate total steps across 3 exam categories
  const totalSteps = categories.reduce((acc, cat) => acc + cat.steps.length, 0);

  // Find active exam category
  const currentCategory = categories.find(c => c.id === activeTab);

  // Count non-empty notes
  const notesCount = Object.values(notes).filter(n => n && n.trim().length > 0).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200 pb-20">
      
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        completedSteps={completedSteps}
        totalSteps={totalSteps}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* If user is searching, display search results */}
        {searchQuery.trim().length > 0 ? (
          <SearchResults
            query={searchQuery}
            onSelectResult={(catId) => {
              setActiveTab(catId);
              setSearchQuery('');
            }}
            onClose={() => setSearchQuery('')}
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Sidebar Navigation */}
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              completedSteps={completedSteps}
              patentCategories={categories}
              notesCount={notesCount}
            />

            {/* Main Content Area */}
            <div className="flex-1 w-full min-w-0">
              {currentCategory && (
                <PatentSection
                  category={currentCategory}
                  completedSteps={completedSteps}
                  toggleStepComplete={toggleStepComplete}
                  onOpenArticleModal={(art) => setSelectedArticle(art)}
                  onPlayAudio={playAudio}
                  onUpdateCategory={handleUpdateCategory}
                  onResetCategory={handleResetCategories}
                  saveStatus={saveStatus}
                />
              )}

              {activeTab === 'schedule' && (
                <StudyScheduleView onNavigateTab={(tab) => setActiveTab(tab)} />
              )}
              {activeTab === 'tree' && (
                <TreeDiagramView
                  onNavigateToCategory={(catId) => setActiveTab(catId)}
                  onOpenArticleModal={(art) => setSelectedArticle(art)}
                  onPlayAudio={playAudio}
                />
              )}
              {activeTab === 'comparison' && <ComparisonTable />}
              {activeTab === 'flashcards' && <FlashcardViewer onPlayAudio={playAudio} />}
              {activeTab === 'quiz' && <QuizView />}
              {activeTab === 'exam-tips' && <ExamTipsView />}
              {activeTab === 'notes' && (
                <NoteEditor
                  notes={notes}
                  saveNote={saveNote}
                  deleteNote={deleteNote}
                />
              )}
            </div>

          </div>
        )}

      </main>

      {/* Floating Text-to-Speech Audio Player Bar */}
      <AudioPlayerBar
        currentPlayingText={currentPlayingText}
        currentTitle={currentTitle}
        isPlaying={isPlaying}
        isPaused={isPaused}
        onPlay={resumeAudio}
        onPause={pauseAudio}
        onResume={resumeAudio}
        onStop={stopAudio}
        playbackRate={playbackRate}
        setPlaybackRate={setPlaybackRate}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 mt-12 text-center text-xs text-slate-500 dark:text-slate-400 glass-panel no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-500" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              คู่มือเตรียมสอบกฎหมายทรัพย์สินทางปัญญา สอบ 26 ก.ย. 69
            </span>
            <span className="text-slate-400">|</span>
            <span>3 เสาหลักข้อสอบ (23 มาตราแม่บท)</span>
          </div>
          <div>
            พัฒนาด้วย React 19 + Tailwind CSS พร้อมระบบเสียงอ่าน TTS และ IRAC Drills
          </div>
        </div>
      </footer>

      {/* Pop-up Article Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

    </div>
  );
}
