import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  FastForward, 
  Sparkles,
  Radio
} from 'lucide-react';

export default function AudioPlayerBar({ 
  currentPlayingText, 
  currentTitle, 
  isPlaying, 
  isPaused,
  onPlay, 
  onPause, 
  onResume, 
  onStop, 
  playbackRate, 
  setPlaybackRate 
}) {
  if (!currentPlayingText) return null;

  const speedOptions = [0.8, 1.0, 1.25, 1.5];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="glass-card rounded-2xl p-4 border-2 border-indigo-500/50 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Title & Animated Playing Indicator */}
        <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-500/30">
            {isPlaying && !isPaused ? (
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
                <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_300ms] h-3/4" />
                <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_200ms] h-full" />
              </div>
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                {isPlaying && !isPaused ? 'กำลังอ่านออกเสียง...' : isPaused ? 'หยุดชั่วคราว' : 'พร้อมเล่น'}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5">
              {currentTitle || 'เนื้อหากฎหมาย'}
            </h4>
          </div>
        </div>

        {/* Controls & Speed */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          
          {/* Speed Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            {speedOptions.map(speed => (
              <button
                key={speed}
                onClick={() => setPlaybackRate(speed)}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  playbackRate === speed
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Play/Pause & Stop buttons */}
          <div className="flex items-center gap-1.5">
            {isPlaying && !isPaused ? (
              <button
                onClick={onPause}
                title="หยุดชั่วคราว"
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 transition-all"
              >
                <Pause className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onResume}
                title="เล่นต่อ"
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all"
              >
                <Play className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onStop}
              title="หยุดและปิดเครื่องเล่น"
              className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 text-rose-600 dark:text-rose-300 transition-all"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
