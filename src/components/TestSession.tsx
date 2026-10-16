import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  Check, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Flame, 
  HelpCircle, 
  Layers, 
  Play, 
  RefreshCw, 
  RotateCcw, 
  Sparkles, 
  Timer, 
  Trophy, 
  X, 
  XCircle, 
  Zap 
} from 'lucide-react';
import { Question, Category, TestResult, TestAnswerRecord, MasteryStatus } from '../types';
import { ALL_QUESTIONS, CATEGORIES } from '../data/allQuestions';

interface TestSessionProps {
  onCompleteTest: (result: TestResult) => void;
  onNavigateToPrep: (categoryFilter?: string) => void;
  progressStatuses: Record<string, MasteryStatus>;
  presetQuestion?: Question | null;
  onClearPresetQuestion?: () => void;
}

export const TestSession: React.FC<TestSessionProps> = ({
  onCompleteTest,
  onNavigateToPrep,
  progressStatuses,
  presetQuestion,
  onClearPresetQuestion
}) => {
  // Setup configuration state
  const [phase, setPhase] = useState<'setup' | 'testing' | 'results'>('setup');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [testMode, setTestMode] = useState<'flashcard' | 'quiz'>('flashcard');
  const [onlyReviewingPool, setOnlyReviewingPool] = useState<boolean>(false);

  // Active testing state
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userRecords, setUserRecords] = useState<TestAnswerRecord[]>([]);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [userScratchpad, setUserScratchpad] = useState<string>('');
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isOptionSubmitted, setIsOptionSubmitted] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [latestResult, setLatestResult] = useState<TestResult | null>(null);

  const timerRef = useRef<number | null>(null);

  // Handle preset single question test launch from Prep Section
  useEffect(() => {
    if (presetQuestion) {
      setActiveQuestions([presetQuestion]);
      setCurrentIndex(0);
      setUserRecords([]);
      setIsAnswerRevealed(false);
      setUserScratchpad('');
      setElapsedSeconds(0);
      setSelectedQuizOption(null);
      setIsOptionSubmitted(false);
      setPhase('testing');
      if (onClearPresetQuestion) onClearPresetQuestion();
    }
  }, [presetQuestion]);

  // Timer effect
  useEffect(() => {
    if (phase === 'testing') {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // Start Test Generator
  const handleStartTest = (customQuestionPool?: Question[]) => {
    let pool = customQuestionPool || [...ALL_QUESTIONS];

    // Category filter
    if (selectedCategory !== 'All' && !customQuestionPool) {
      pool = pool.filter(q => q.category === selectedCategory);
    }

    // Filter to only questions marked for review
    if (onlyReviewingPool && !customQuestionPool) {
      pool = pool.filter(q => progressStatuses[q.id] === 'reviewing');
    }

    if (pool.length === 0) {
      alert('No questions match the selected criteria. Try selecting All Categories.');
      return;
    }

    // Shuffle pool using Fisher-Yates
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const count = Math.min(questionCount, shuffled.length);
    const selected = shuffled.slice(0, count);

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setUserRecords([]);
    setIsAnswerRevealed(false);
    setUserScratchpad('');
    setSelectedQuizOption(null);
    setIsOptionSubmitted(false);
    setElapsedSeconds(0);
    setPhase('testing');
  };

  // Current Question
  const currentQuestion = activeQuestions[currentIndex];

  // Record answer in Flashcard (Self-Score) mode
  const handleScoreAnswer = (rating: 'correct' | 'partial' | 'missed') => {
    const scoreMap = { correct: 100, partial: 50, missed: 0 };
    const record: TestAnswerRecord = {
      questionId: currentQuestion.id,
      userScore: scoreMap[rating],
      rating,
      userNotes: userScratchpad.trim() || undefined
    };

    const nextRecords = [...userRecords, record];
    setUserRecords(nextRecords);

    // If more questions remain, advance; else calculate results
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswerRevealed(false);
      setUserScratchpad('');
    } else {
      finishTest(nextRecords);
    }
  };

  // Handle Multiple Choice selection
  const handleSelectOption = (index: number) => {
    if (isOptionSubmitted) return;
    setSelectedQuizOption(index);
  };

  const handleConfirmQuizAnswer = () => {
    if (selectedQuizOption === null) return;
    setIsOptionSubmitted(true);
    setIsAnswerRevealed(true);

    const option = currentQuestion.quizOptions?.[selectedQuizOption];
    const isCorrect = !!option?.isCorrect;

    const record: TestAnswerRecord = {
      questionId: currentQuestion.id,
      userScore: isCorrect ? 100 : 0,
      rating: isCorrect ? 'correct' : 'missed',
      selectedOptionIndex: selectedQuizOption
    };

    const nextRecords = [...userRecords, record];
    setUserRecords(nextRecords);
  };

  const handleNextQuizQuestion = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswerRevealed(false);
      setSelectedQuizOption(null);
      setIsOptionSubmitted(false);
      setUserScratchpad('');
    } else {
      finishTest(userRecords);
    }
  };

  // Finish test and calculate scores
  const finishTest = (records: TestAnswerRecord[]) => {
    const total = records.length;
    const correctCount = records.filter(r => r.rating === 'correct').length;
    const partialCount = records.filter(r => r.rating === 'partial').length;
    const missedCount = records.filter(r => r.rating === 'missed').length;

    const totalScorePoints = records.reduce((acc, r) => acc + r.userScore, 0);
    const scorePercentage = total > 0 ? Math.round(totalScorePoints / total) : 0;

    const result: TestResult = {
      id: 'test-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      mode: testMode,
      categoryFilter: selectedCategory,
      totalQuestions: total,
      scorePercentage,
      correctCount,
      partialCount,
      missedCount,
      durationSeconds: elapsedSeconds,
      records
    };

    setLatestResult(result);
    onCompleteTest(result);
    setPhase('results');

    // Confetti on high score
    if (scorePercentage >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback if blocked
      }
    }
  };

  // Retest only missed / partial questions
  const handleRetestMissed = () => {
    if (!latestResult) return;
    const missedIds = latestResult.records
      .filter(r => r.rating === 'missed' || r.rating === 'partial')
      .map(r => r.questionId);

    const missedQuestions = ALL_QUESTIONS.filter(q => missedIds.includes(q.id));
    if (missedQuestions.length === 0) {
      alert('You got 100% on the previous test! No missed questions to retry.');
      return;
    }

    handleStartTest(missedQuestions);
  };

  // Keyboard shortcut listener during active flashcard testing
  useEffect(() => {
    if (phase !== 'testing' || testMode !== 'flashcard') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in textarea
      if (document.activeElement?.tagName === 'TEXTAREA') return;

      if (e.key === ' ' && !isAnswerRevealed) {
        e.preventDefault();
        setIsAnswerRevealed(true);
      } else if (isAnswerRevealed) {
        if (e.key === '1') handleScoreAnswer('correct');
        if (e.key === '2') handleScoreAnswer('partial');
        if (e.key === '3') handleScoreAnswer('missed');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, isAnswerRevealed, testMode, currentIndex, activeQuestions]);

  // =========================================================================
  // RENDER: SETUP PHASE
  // =========================================================================
  if (phase === 'setup') {
    const reviewingCount = Object.values(progressStatuses).filter(s => s === 'reviewing').length;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Interactive Interview Simulation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Start a Mock Interview Test Session
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Test your knowledge under timed conditions with randomized questions and instant score analytics.
          </p>
        </div>

        {/* Configuration Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Question Count Selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              1. Select Test Length (Number of Questions):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[5, 10, 15, 20].map(count => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    questionCount === count
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 shadow-2xs font-bold ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-xl font-black">{count}</div>
                  <div className="text-xs text-slate-500 font-medium">Questions</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    ~{Math.round(count * 1.5)} mins
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Test Format Selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              2. Choose Test Format:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setTestMode('flashcard')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  testMode === 'flashcard'
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 shadow-2xs ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-sm">Active Recall & Self-Score</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-indigo-200 text-indigo-800 rounded">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Real interview simulation: Read the question, formulate your response, reveal model answer, and rate your mastery.
                </p>
              </button>

              <button
                onClick={() => setTestMode('quiz')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  testMode === 'quiz'
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 shadow-2xs ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-sm">Multiple Choice Rapid Quiz</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  4 options per question with automated scoring and instant conceptual explanations.
                </p>
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              3. Technology Category:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Smart Filter: Only Questions marked for review */}
          {reviewingCount > 0 && (
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-amber-900 font-medium">
                  You have <strong className="font-bold">{reviewingCount}</strong> questions marked for review.
                </span>
              </div>
              <button
                onClick={() => setOnlyReviewingPool(!onlyReviewingPool)}
                className={`text-xs px-3 py-1 rounded-md font-semibold border transition-all ${
                  onlyReviewingPool
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white text-amber-800 border-amber-300 hover:bg-amber-100'
                }`}
              >
                {onlyReviewingPool ? 'Testing Reviewing Only ✓' : 'Test Only These'}
              </button>
            </div>
          )}

          {/* Start Button */}
          <button
            id="start-test-btn"
            onClick={() => handleStartTest()}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-base shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Launch Test Session ({questionCount} Questions)</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: ACTIVE TEST PHASE
  // =========================================================================
  if (phase === 'testing' && currentQuestion) {
    const progressPercent = Math.round(((currentIndex + 1) / activeQuestions.length) * 100);

    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Header Bar: Progress, Timer, Quit */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 text-sm">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {currentQuestion.category}
              </span>
              <span className="text-slate-500 hidden sm:inline">
                ({currentQuestion.difficulty})
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 font-mono text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-bold">{formatTime(elapsedSeconds)}</span>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to end this test session early?')) {
                    finishTest(userRecords);
                  }
                }}
                className="text-slate-400 hover:text-rose-600 font-medium transition-colors"
              >
                End Test
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-indigo-600 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {/* Question Title */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Interview Question:
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {currentQuestion.question}
            </h2>
            {currentQuestion.frequentlyAskedBy && (
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <span>Frequently asked by:</span>
                <span className="font-medium text-slate-700">{currentQuestion.frequentlyAskedBy.join(', ')}</span>
              </p>
            )}
          </div>

          {/* Mode 1: Active Recall (Flashcard) */}
          {testMode === 'flashcard' && (
            <div className="space-y-4">
              {/* Scratchpad to practice answer */}
              {!isAnswerRevealed && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500">
                    💡 Optional Scratchpad (formulate your answer or speak aloud):
                  </label>
                  <textarea
                    value={userScratchpad}
                    onChange={(e) => setUserScratchpad(e.target.value)}
                    placeholder="Type key technical points, keywords, or trade-offs you would say to the interviewer..."
                    rows={3}
                    className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="text-[11px] text-slate-400 text-right">
                    Press <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-700 font-mono">Space</kbd> or click below to reveal answer
                  </div>
                </div>
              )}

              {/* Reveal Answer Button */}
              {!isAnswerRevealed ? (
                <button
                  id="reveal-answer-btn"
                  onClick={() => setIsAnswerRevealed(true)}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Reveal Model Answer & Key Points</span>
                </button>
              ) : (
                /* Revealed Answer & Self-Scoring */
                <div className="space-y-5 pt-2 animate-in fade-in duration-200">
                  {/* Model Answer Box */}
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Model Answer:</span>
                    </div>
                    <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                      {currentQuestion.answer}
                    </p>

                    {currentQuestion.keyPoints && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <span className="text-xs font-bold text-slate-600 block mb-1">Key Points Evaluated:</span>
                        <ul className="text-xs text-slate-700 space-y-1">
                          {currentQuestion.keyPoints.map((kp, idx) => (
                            <li key={idx} className="flex items-start space-x-1.5">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{kp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {currentQuestion.codeSnippet && (
                      <div className="mt-3 bg-slate-900 rounded-lg p-3 text-xs font-mono text-emerald-300 overflow-x-auto">
                        <pre><code>{currentQuestion.codeSnippet}</code></pre>
                      </div>
                    )}
                  </div>

                  {/* Self-Rating Buttons */}
                  <div className="space-y-2">
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 text-center">
                      Grade Your Answer Honestly:
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => handleScoreAnswer('missed')}
                        className="py-3 px-3 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-800 font-bold text-xs sm:text-sm flex flex-col items-center justify-center space-y-1 transition-all"
                      >
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>Missed / Blank</span>
                        <span className="text-[10px] text-rose-600 font-normal">0% (Needs Review) [3]</span>
                      </button>

                      <button
                        onClick={() => handleScoreAnswer('partial')}
                        className="py-3 px-3 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-amber-800 font-bold text-xs sm:text-sm flex flex-col items-center justify-center space-y-1 transition-all"
                      >
                        <HelpCircle className="w-5 h-5 text-amber-600" />
                        <span>Partially Correct</span>
                        <span className="text-[10px] text-amber-600 font-normal">50% (Minor gaps) [2]</span>
                      </button>

                      <button
                        onClick={() => handleScoreAnswer('correct')}
                        className="py-3 px-3 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm flex flex-col items-center justify-center space-y-1 transition-all"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Nailed It!</span>
                        <span className="text-[10px] text-emerald-600 font-normal">100% (Interview Ready) [1]</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Multiple Choice Quiz */}
          {testMode === 'quiz' && (
            <div className="space-y-4">
              <div className="space-y-2.5">
                {currentQuestion.quizOptions?.map((option, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  let optionStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                  if (isOptionSubmitted) {
                    if (option.isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                    } else if (isSelected && !option.isCorrect) {
                      optionStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-semibold';
                    } else {
                      optionStyle = 'border-slate-200 opacity-60 text-slate-500';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-medium ring-2 ring-indigo-500/20';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isOptionSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start space-x-3 ${optionStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full border border-current shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Submit Choice / Next Button */}
              {!isOptionSubmitted ? (
                <button
                  disabled={selectedQuizOption === null}
                  onClick={handleConfirmQuizAnswer}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-bold text-sm transition-all"
                >
                  Confirm Answer
                </button>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className={`p-4 rounded-xl text-xs sm:text-sm border ${
                    currentQuestion.quizOptions?.[selectedQuizOption!]?.isCorrect
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border-rose-200'
                  }`}>
                    <span className="font-bold block mb-1">
                      {currentQuestion.quizOptions?.[selectedQuizOption!]?.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                    </span>
                    <p>{currentQuestion.answer}</p>
                  </div>

                  <button
                    onClick={handleNextQuizQuestion}
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2"
                  >
                    <span>{currentIndex + 1 < activeQuestions.length ? 'Next Question' : 'View Test Results'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: RESULTS PHASE
  // =========================================================================
  if (phase === 'results' && latestResult) {
    const score = latestResult.scorePercentage;
    const isHigh = score >= 80;
    const isMedium = score >= 60 && score < 80;

    let grade = { title: 'Senior Ready 🚀', desc: 'Outstanding performance! You displayed comprehensive full-stack depth.' };
    if (score < 50) {
      grade = { title: 'Needs More Practice 📖', desc: 'Solid starting attempt! Focus on revising the questions you missed.' };
    } else if (score < 70) {
      grade = { title: 'Mid-Level Foundation 💪', desc: 'Good core grasp! Review the edge-cases and deeper architecture concepts.' };
    } else if (score < 85) {
      grade = { title: 'Strong Candidate 🌟', desc: 'Very solid readiness for top Pakistani software house rounds.' };
    }

    // Category breakdown
    const categoryStats: Record<string, { total: number; scoreSum: number }> = {};
    latestResult.records.forEach(rec => {
      const q = ALL_QUESTIONS.find(item => item.id === rec.questionId);
      if (q) {
        if (!categoryStats[q.category]) {
          categoryStats[q.category] = { total: 0, scoreSum: 0 };
        }
        categoryStats[q.category].total += 1;
        categoryStats[q.category].scoreSum += rec.userScore;
      }
    });

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Results Hero Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 text-center space-y-5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Test Completed Successfully</span>
          </div>

          {/* Big Score Meter */}
          <div className="flex flex-col items-center">
            <div className={`w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center shadow-inner ${
              isHigh
                ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800'
                : isMedium
                ? 'border-blue-500 bg-blue-50/50 text-blue-800'
                : 'border-amber-500 bg-amber-50/50 text-amber-800'
            }`}>
              <span className="text-3xl sm:text-4xl font-black">{score}%</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Score</span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mt-4">
              {grade.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-1">
              {grade.desc}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded-xl">
              <div className="text-xs text-slate-500 font-medium">Questions</div>
              <div className="text-lg font-bold text-slate-900">{latestResult.totalQuestions}</div>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl">
              <div className="text-xs text-emerald-700 font-medium">Correct (100%)</div>
              <div className="text-lg font-bold text-emerald-800">{latestResult.correctCount}</div>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl">
              <div className="text-xs text-amber-700 font-medium">Partial (50%)</div>
              <div className="text-lg font-bold text-amber-800">{latestResult.partialCount}</div>
            </div>
            <div className="bg-rose-50 p-3 rounded-xl">
              <div className="text-xs text-rose-700 font-medium">Missed (0%)</div>
              <div className="text-lg font-bold text-rose-800">{latestResult.missedCount}</div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="pt-4 border-t border-slate-100 text-left space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Score Breakdown by Technology:
            </h4>
            <div className="space-y-2">
              {Object.entries(categoryStats).map(([catName, stats]) => {
                const catScore = Math.round(stats.scoreSum / stats.total);
                return (
                  <div key={catName} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700">{catName} ({stats.total} questions)</span>
                      <span className="font-bold text-slate-900">{catScore}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          catScore >= 75 ? 'bg-emerald-500' : catScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${catScore}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
            {latestResult.missedCount + latestResult.partialCount > 0 && (
              <button
                onClick={handleRetestMissed}
                className="w-full sm:w-auto py-2.5 px-5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retest Missed ({latestResult.missedCount + latestResult.partialCount})</span>
              </button>
            )}

            <button
              onClick={() => setPhase('setup')}
              className="w-full sm:w-auto py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Take Another Test</span>
            </button>

            <button
              onClick={() => onNavigateToPrep(latestResult.categoryFilter !== 'All' ? latestResult.categoryFilter : undefined)}
              className="w-full sm:w-auto py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-all"
            >
              <span>Review in Question Bank</span>
            </button>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h4 className="text-sm font-bold text-slate-900">
            Question-by-Question Detailed Review:
          </h4>
          <div className="space-y-3">
            {latestResult.records.map((rec, i) => {
              const q = ALL_QUESTIONS.find(item => item.id === rec.questionId);
              if (!q) return null;

              return (
                <div 
                  key={rec.questionId}
                  className={`p-4 rounded-xl border text-left text-xs sm:text-sm space-y-2 ${
                    rec.rating === 'correct'
                      ? 'border-emerald-200 bg-emerald-50/40'
                      : rec.rating === 'partial'
                      ? 'border-amber-200 bg-amber-50/40'
                      : 'border-rose-200 bg-rose-50/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-slate-900">
                      <span className="text-slate-500 mr-2">Q{i + 1}.</span>
                      {q.question}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold shrink-0 ${
                      rec.rating === 'correct'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.rating === 'partial'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {rec.rating === 'correct' ? '100%' : rec.rating === 'partial' ? '50%' : '0%'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Answer:</strong> {q.answer}
                  </p>

                  {rec.userNotes && (
                    <div className="text-[11px] text-slate-600 bg-white/80 p-2 rounded border border-slate-200">
                      <strong>Your answer notes:</strong> {rec.userNotes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
