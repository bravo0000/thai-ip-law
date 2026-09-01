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
import { patentCategories } from './data/patentData';
import { BookOpen, Sparkles, Award } from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('patent_dark_mode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('invention');

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

  // Calculate total steps across categories
  const totalSteps = patentCategories.reduce((acc, cat) => acc + cat.steps.length, 0);

  // Find active patent category
  const currentCategory = patentCategories.find(c => c.id === activeTab);

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
              patentCategories={patentCategories}
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
                />
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
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Interactive Thai Patent & Copyright Law Study System</span>
          </div>
          <div>
            พัฒนาด้วย React 19 + Tailwind CSS เพื่อการทบทวนเตรียมสอบทรัพย์สินทางปัญญา
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
