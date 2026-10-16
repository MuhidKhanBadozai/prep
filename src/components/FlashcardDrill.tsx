import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Eye, 
  Flame, 
  HelpCircle, 
  RefreshCw, 
  Shuffle, 
  Sparkles 
} from 'lucide-react';
import { Question, Category, MasteryStatus } from '../types';
import { ALL_QUESTIONS, CATEGORIES } from '../data/allQuestions';

interface FlashcardDrillProps {
  onSetStatus: (id: string, status: MasteryStatus) => void;
  progressStatuses: Record<string, MasteryStatus>;
}

export const FlashcardDrill: React.FC<FlashcardDrillProps> = ({
  onSetStatus,
  progressStatuses
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [deck, setDeck] = useState<Question[]>(ALL_QUESTIONS);

  // Re-filter and reset deck when category changes
  useEffect(() => {
    let list = ALL_QUESTIONS;
    if (selectedCategory !== 'All') {
      list = list.filter(q => q.category === selectedCategory);
    }
    setDeck(list);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedCategory]);

  const currentCard = deck[currentIndex] || deck[0];

  const handleNext = () => {
    if (currentIndex + 1 < deck.length) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => 0.5 - Math.random());
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Keyboard navigation: space to flip, left/right to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, deck]);

  if (!currentCard) {
    return null;
  }

  const currentStatus = progressStatuses[currentCard.id] || 'unread';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Title & Category Bar */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span>Rapid Interview Flashcards</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Speed Memorization Drill
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Tap card or press Spacebar to flip between question and model answer.
        </p>
      </div>

      {/* Category selector & Shuffle control */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {CATEGORIES.slice(0, 6).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={handleShuffle}
          className="flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Shuffle</span>
        </button>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Card {currentIndex + 1} of {deck.length}</span>
        <span className="font-semibold text-indigo-700">{currentCard.category}</span>
      </div>

      {/* Interactive Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="min-h-[320px] sm:min-h-[360px] bg-white rounded-2xl border-2 border-slate-200 hover:border-indigo-400 shadow-md p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 relative select-none"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">
              Q{currentCard.number}
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
              {currentCard.category}
            </span>
          </div>

          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
            {isFlipped ? 'Model Answer' : 'Question (Tap to Reveal)'}
          </span>
        </div>

        {/* Card Body */}
        <div className="my-auto py-6">
          {!isFlipped ? (
            <div className="space-y-4 text-center">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {currentCard.question}
              </h3>
              {currentCard.frequentlyAskedBy && (
                <p className="text-xs text-slate-500">
                  Targeted by: {currentCard.frequentlyAskedBy.join(', ')}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in duration-200">
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                {currentCard.answer}
              </p>

              {currentCard.keyPoints && (
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 block">Core takeaways:</span>
                  {currentCard.keyPoints.map((kp, idx) => (
                    <div key={idx} className="flex items-start space-x-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{kp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Status: <strong className="text-slate-700 capitalize">{currentStatus}</strong></span>
          <span className="hidden sm:inline">Spacebar: Flip • Left/Right: Navigate</span>
        </div>
      </div>

      {/* Navigation and Quick Rating Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 bg-white disabled:opacity-40 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center space-x-1.5 shadow-2xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Quick Rate */}
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSetStatus(currentCard.id, 'reviewing');
              handleNext();
            }}
            className="py-2.5 px-3.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded-xl border border-amber-300 transition-colors"
          >
            ⚠️ Review Later
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSetStatus(currentCard.id, 'mastered');
              handleNext();
            }}
            className="py-2.5 px-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-300 transition-colors"
          >
            ✅ I Know This
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex + 1 >= deck.length}
          className="p-3 bg-white disabled:opacity-40 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center space-x-1.5 shadow-2xs transition-all"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
