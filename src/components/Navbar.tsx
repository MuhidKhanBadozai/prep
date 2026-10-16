import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Eye,
  Flame, 
  HelpCircle, 
  Layers, 
  RotateCcw, 
  Shuffle,
  Trophy, 
  Zap 
} from 'lucide-react';

export type NavTab = 'all-answers' | 'final-test' | 'prep' | 'test' | 'flashcards' | 'progress';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  stats: {
    totalQuestions: number;
    masteredCount: number;
    reviewingCount: number;
    learningCount: number;
    masteryPercentage: number;
    testsCount: number;
    averageScore: number;
  };
  onResetProgress: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  stats,
  onResetProgress
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('all-answers')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-600 flex items-center justify-center text-white shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  FullStack<span className="text-emerald-600">Interview</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Pakistani Market Ready
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                200+ Curated Q&A • MERN • Next.js • GSAP • Mock Tests
              </p>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden xl:flex items-center space-x-4 bg-slate-50 py-1.5 px-3.5 rounded-full border border-slate-200 text-xs">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-slate-600">Mastered:</span>
              <span className="font-bold text-slate-900">{stats.masteredCount}/{stats.totalQuestions}</span>
              <span className="text-emerald-600 font-semibold">({stats.masteryPercentage}%)</span>
            </div>
            <div className="h-3 w-px bg-slate-300" />
            <div className="flex items-center space-x-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-slate-600">Avg Score:</span>
              <span className="font-bold text-slate-900">{stats.testsCount > 0 ? `${stats.averageScore}%` : 'N/A'}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-1.5">
            {/* Section 1: All Answers Visible */}
            <button
              id="tab-all-answers-btn"
              onClick={() => setActiveTab('all-answers')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'all-answers'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">All Answers Visible</span>
              <span className="sm:hidden">All Answers</span>
            </button>

            {/* Section 2: 200 Final Test (Randomizer & Score) */}
            <button
              id="tab-final-test-btn"
              onClick={() => setActiveTab('final-test')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all relative ${
                activeTab === 'final-test'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200'
              }`}
            >
              <Shuffle className="w-4 h-4 text-amber-400" />
              <span>200 Final Test</span>
              <span className="hidden lg:inline-block text-[10px] uppercase font-black px-1.5 py-0.2 rounded bg-amber-400/30 text-amber-900 ml-0.5">
                Randomizer
              </span>
            </button>

            {/* Collapsible Question Bank */}
            <button
              id="tab-prep-btn"
              onClick={() => setActiveTab('prep')}
              className={`flex items-center space-x-1.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'prep'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">Question Bank</span>
              <span className="md:hidden">Bank</span>
            </button>

            {/* Rapid Flashcards */}
            <button
              id="tab-flashcards-btn"
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center space-x-1.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="hidden md:inline">Rapid Cards</span>
              <span className="md:hidden">Cards</span>
            </button>

            {/* Progress & Analytics */}
            <button
              id="tab-progress-btn"
              onClick={() => setActiveTab('progress')}
              className={`flex items-center space-x-1.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'progress'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden md:inline">Progress</span>
            </button>

            {/* Reset button */}
            <button
              onClick={onResetProgress}
              title="Reset progress data"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-0.5"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
