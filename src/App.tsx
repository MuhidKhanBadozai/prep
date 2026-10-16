/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { AllAnswersSection } from './components/AllAnswersSection';
import { FinalExamSection } from './components/FinalExamSection';
import { PrepSection } from './components/PrepSection';
import { TestSession } from './components/TestSession';
import { ProgressDashboard } from './components/ProgressDashboard';
import { FlashcardDrill } from './components/FlashcardDrill';
import { useInterviewProgress } from './hooks/useInterviewProgress';
import { Question } from './types';
import { ALL_QUESTIONS } from './data/allQuestions';
import { Sparkles, Trophy, CheckCircle2, Zap, Eye, Shuffle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('all-answers');
  const [presetTestQuestion, setPresetTestQuestion] = useState<Question | null>(null);

  const {
    progress,
    setQuestionStatus,
    toggleBookmark,
    saveQuestionNote,
    addTestResult,
    resetAllProgress,
    stats,
    getCategoryStats
  } = useInterviewProgress();

  const handleStartSingleTest = (question: Question) => {
    setPresetTestQuestion(question);
    setActiveTab('test');
  };

  const handleNavigateToPrepWithCategory = (categoryFilter?: string, statusFilter?: string) => {
    setActiveTab('prep');
  };

  const handleStartTestWithCategory = (category: string) => {
    setActiveTab('final-test');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
        onResetProgress={resetAllProgress}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Section 1: All Answers Already Visible */}
        {activeTab === 'all-answers' && (
          <AllAnswersSection
            progressStatuses={progress.statuses}
            bookmarks={progress.bookmarks}
            onToggleBookmark={toggleBookmark}
            onStartSingleTest={handleStartSingleTest}
          />
        )}

        {/* Section 2: 200 Questions Final Test with Randomizer & Score */}
        {activeTab === 'final-test' && (
          <FinalExamSection
            onCompleteTest={addTestResult}
            onNavigateToStudyGuide={() => setActiveTab('all-answers')}
            progressStatuses={progress.statuses}
          />
        )}

        {/* Collapsible Question Bank / Practice Prep */}
        {activeTab === 'prep' && (
          <PrepSection
            progressStatuses={progress.statuses}
            bookmarks={progress.bookmarks}
            notes={progress.notes}
            onSetStatus={setQuestionStatus}
            onToggleBookmark={toggleBookmark}
            onSaveNote={saveQuestionNote}
            onStartSingleTest={handleStartSingleTest}
          />
        )}

        {/* Quick Custom Test Session */}
        {activeTab === 'test' && (
          <TestSession
            onCompleteTest={addTestResult}
            onNavigateToPrep={handleNavigateToPrepWithCategory}
            progressStatuses={progress.statuses}
            presetQuestion={presetTestQuestion}
            onClearPresetQuestion={() => setPresetTestQuestion(null)}
          />
        )}

        {/* Flashcard Drill */}
        {activeTab === 'flashcards' && (
          <FlashcardDrill
            onSetStatus={setQuestionStatus}
            progressStatuses={progress.statuses}
          />
        )}

        {/* Progress Dashboard */}
        {activeTab === 'progress' && (
          <ProgressDashboard
            stats={stats}
            getCategoryStats={getCategoryStats}
            testHistory={progress.testHistory}
            progressStatuses={progress.statuses}
            onNavigateToPrep={handleNavigateToPrepWithCategory}
            onStartTestWithCategory={handleStartTestWithCategory}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">Full Stack Interview Preparation Platform</span>
            <span>•</span>
            <span>Systems Limited, Devsinc, Netsol, 10Pearls, Arbisoft, pieCyfer</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('all-answers')}
              className="text-slate-700 hover:text-emerald-700 font-semibold"
            >
              📖 All Answers View ({ALL_QUESTIONS.length})
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveTab('final-test')} 
              className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center space-x-1"
            >
              <span>🎲 Launch 200 Final Exam →</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
