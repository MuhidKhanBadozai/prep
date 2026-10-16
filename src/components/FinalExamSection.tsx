import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  Bookmark, 
  Check, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Flag, 
  Flame, 
  Grid, 
  HelpCircle, 
  Layers, 
  Play, 
  RefreshCw, 
  RotateCcw, 
  Search, 
  Shuffle, 
  Sparkles, 
  Timer, 
  Trophy, 
  X, 
  XCircle, 
  Zap 
} from 'lucide-react';
import { Question, TestResult, TestAnswerRecord, MasteryStatus } from '../types';
import { ALL_QUESTIONS } from '../data/allQuestions';

interface FinalExamSectionProps {
  onCompleteTest: (result: TestResult) => void;
  onNavigateToStudyGuide: () => void;
  progressStatuses: Record<string, MasteryStatus>;
}

export const FinalExamSection: React.FC<FinalExamSectionProps> = ({
  onCompleteTest,
  onNavigateToStudyGuide,
  progressStatuses
}) => {
  // Phase state: 'setup' | 'exam' | 'score'
  const [phase, setPhase] = useState<'setup' | 'exam' | 'score'>('setup');
  
  // Configuration
  const [examQuestionCount, setExamQuestionCount] = useState<number>(200);
  const [examMode, setExamMode] = useState<'quiz' | 'flashcard'>('quiz');
  const [randomSeed, setRandomSeed] = useState<number>(Date.now());
  
  // Active exam state
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Answers recorded map: questionId -> { score: number, rating: 'correct'|'partial'|'missed', selectedIndex?: number }
  const [answersMap, setAnswersMap] = useState<Record<string, {
    score: number;
    rating: 'correct' | 'partial' | 'missed';
    selectedOptionIndex?: number;
    notes?: string;
  }>>({});
  
  // Flagged for review set of question IDs
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  
  // UI toggles
  const [showMatrixModal, setShowMatrixModal] = useState<boolean>(false);
  const [showConfirmFinishModal, setShowConfirmFinishModal] = useState<boolean>(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [scratchpad, setScratchpad] = useState<string>('');
  
  // Timer state
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<number | null>(null);
  
  // Completed result state
  const [finalScoreResult, setFinalScoreResult] = useState<TestResult | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'missed' | 'correct' | 'flagged'>('all');

  // Randomizer utility (Fisher-Yates)
  const getRandomizedQuestions = (count: number): Question[] => {
    const pool = [...ALL_QUESTIONS];
    // Fisher-Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const targetCount = Math.min(count, pool.length);
    const selected = pool.slice(0, targetCount);

    // Also randomize quiz options for each question so the correct answer isn't predictable
    return selected.map(q => {
      if (q.quizOptions && q.quizOptions.length > 0) {
        const shuffledOptions = [...q.quizOptions].sort(() => 0.5 - Math.random());
        return {
          ...q,
          quizOptions: shuffledOptions
        };
      }
      return q;
    });
  };

  // Launch the randomized 200 exam
  const handleStartExam = (overrideCount?: number) => {
    const count = overrideCount || examQuestionCount;
    const questions = getRandomizedQuestions(count);
    setExamQuestions(questions);
    setCurrentIndex(0);
    setAnswersMap({});
    setFlaggedIds(new Set());
    setIsAnswerRevealed(false);
    setScratchpad('');
    setElapsedSeconds(0);
    setFinalScoreResult(null);
    setPhase('exam');
  };

  // Timer loop
  useEffect(() => {
    if (phase === 'exam') {
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

  // Format seconds -> mm:ss or hh:mm:ss
  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins}m ${s < 10 ? '0' : ''}${s}s`;
    }
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const currentQ = examQuestions[currentIndex];
  const currentAnswer = currentQ ? answersMap[currentQ.id] : undefined;

  // Toggle flag for review
  const toggleFlag = (id: string) => {
    setFlaggedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Handle quiz option selection
  const handleSelectQuizOption = (optionIndex: number) => {
    if (!currentQ || !currentQ.quizOptions) return;
    const selectedOption = currentQ.quizOptions[optionIndex];
    const isCorrect = selectedOption.isCorrect;
    
    setAnswersMap(prev => ({
      ...prev,
      [currentQ.id]: {
        score: isCorrect ? 100 : 0,
        rating: isCorrect ? 'correct' : 'missed',
        selectedOptionIndex: optionIndex
      }
    }));
  };

  // Handle self-score rating in oral/flashcard mode
  const handleSelfScore = (rating: 'correct' | 'partial' | 'missed') => {
    if (!currentQ) return;
    const scoreMap = { correct: 100, partial: 50, missed: 0 };
    setAnswersMap(prev => ({
      ...prev,
      [currentQ.id]: {
        score: scoreMap[rating],
        rating,
        notes: scratchpad.trim() || undefined
      }
    }));
    
    // Auto advance to next question
    if (currentIndex + 1 < examQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswerRevealed(false);
      setScratchpad('');
    }
  };

  // Jump to specific index
  const handleJumpToQuestion = (index: number) => {
    if (index >= 0 && index < examQuestions.length) {
      setCurrentIndex(index);
      setIsAnswerRevealed(false);
      setScratchpad('');
      setShowMatrixModal(false);
    }
  };

  // Finish exam and calculate score
  const handleFinishExam = () => {
    setShowConfirmFinishModal(false);
    
    const records: TestAnswerRecord[] = examQuestions.map(q => {
      const ans = answersMap[q.id];
      if (ans) {
        return {
          questionId: q.id,
          userScore: ans.score,
          rating: ans.rating,
          userNotes: ans.notes,
          selectedOptionIndex: ans.selectedOptionIndex
        };
      }
      // If unanswered, mark as missed (0 points)
      return {
        questionId: q.id,
        userScore: 0,
        rating: 'missed'
      };
    });

    const totalQuestions = examQuestions.length;
    const correctCount = records.filter(r => r.rating === 'correct').length;
    const partialCount = records.filter(r => r.rating === 'partial').length;
    const missedCount = records.filter(r => r.rating === 'missed').length;

    const totalPointsEarned = records.reduce((acc, r) => acc + r.userScore, 0);
    const scorePercentage = Math.round(totalPointsEarned / totalQuestions);

    const result: TestResult = {
      id: `final-exam-${Date.now()}`,
      date: new Date().toISOString(),
      mode: examMode,
      categoryFilter: `Final Exam (${totalQuestions} Questions - Randomized)`,
      totalQuestions,
      scorePercentage,
      correctCount,
      partialCount,
      missedCount,
      durationSeconds: elapsedSeconds,
      records
    };

    setFinalScoreResult(result);
    onCompleteTest(result);
    setPhase('score');

    // Trigger celebratory confetti if passed
    if (scorePercentage >= 70) {
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  // Compute how many answered
  const answeredCount = useMemo(() => {
    return Object.keys(answersMap).length;
  }, [answersMap]);

  // =========================================================================
  // VIEW 1: SETUP & LAUNCHER VIEW
  // =========================================================================
  if (phase === 'setup') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
            <Shuffle className="w-4 h-4 text-amber-600 animate-spin-slow" />
            <span>Randomized Full Stack Assessment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            200-Question Final Exam
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            The ultimate benchmark test for full-stack engineering interviews. Shuffles all 200+ curated technical questions across MERN, Next.js, Node, GSAP, and System Design with instantaneous final scoring and comprehensive diagnostic feedback.
          </p>
        </div>

        {/* Exam Configuration Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Question Count Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              1. Select Exam Question Count:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[200, 100, 50, 25].map(count => (
                <button
                  key={count}
                  onClick={() => setExamQuestionCount(count)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    examQuestionCount === count
                      ? 'border-indigo-600 bg-indigo-50/90 text-indigo-950 font-bold ring-2 ring-indigo-500/20 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="text-2xl font-black">{count}</div>
                  <div className="text-xs font-semibold text-slate-600">
                    {count === 200 ? 'Full Final Exam' : 'Questions'}
                  </div>
                  <div className="text-[10px] text-indigo-600 font-medium mt-1">
                    {count === 200 ? '⭐ Recommended' : `~${Math.round(count * 1.2)} mins`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Test Format Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              2. Choose Exam Mode:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setExamMode('quiz')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  examMode === 'quiz'
                    ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-500/20 shadow-2xs font-medium'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-sm">Interactive Quiz (Auto-Graded)</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-200 text-emerald-800 rounded">
                    Popular
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multiple-choice format with randomized answers. Select your choice for each question with instant correctness tracking and automated score calculation.
                </p>
              </button>

              <button
                onClick={() => setExamMode('flashcard')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  examMode === 'flashcard'
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20 shadow-2xs font-medium'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1.5">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-sm">Interview Oral Drill & Self-Rating</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Real interview setting: Read question, formulate technical response aloud or in notes, reveal model answer, and self-grade your performance (100% / 50% / 0%).
                </p>
              </button>
            </div>
          </div>

          {/* Randomizer Engine Summary Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
                <Shuffle className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">True Randomization Active</span>
                <span>Questions are randomized every attempt so no two exam sessions are ever in the same order.</span>
              </div>
            </div>
            <div className="text-[11px] font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
              Total Pool: {ALL_QUESTIONS.length} Questions
            </div>
          </div>

          {/* Start Action */}
          <div className="pt-2">
            <button
              onClick={() => handleStartExam(examQuestionCount)}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold text-base rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center space-x-3"
            >
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span>Launch {examQuestionCount}-Question Final Exam (Randomized)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Review Tips */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2 text-xs text-slate-600">
          <span className="font-bold uppercase tracking-wider text-slate-700 block">
            💡 Final Exam Strategy:
          </span>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>You can jump between questions anytime using the <strong>Question Matrix (1..200)</strong> button.</li>
            <li>Use <strong>Flag for Review</strong> on questions you are unsure about and want to inspect before finishing.</li>
            <li>At the end, you'll receive your total score (e.g. 186/200), percentage, software house readiness rating, and a question-by-question review of all correct and missed answers.</li>
          </ul>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ACTIVE EXAM VIEW (1..200)
  // =========================================================================
  if (phase === 'exam' && currentQ) {
    const isCurrentFlagged = flaggedIds.has(currentQ.id);
    const progressPercent = Math.round(((currentIndex + 1) / examQuestions.length) * 100);

    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Sticky Exam Top Bar */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            {/* Left: Counter & Flag */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-sm font-extrabold text-slate-900">
                Question <span className="text-emerald-600">{currentIndex + 1}</span> of {examQuestions.length}
              </span>
              <span className="text-xs text-slate-400">({progressPercent}%)</span>

              <button
                onClick={() => toggleFlag(currentQ.id)}
                title="Flag question to review later"
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors ${
                  isCurrentFlagged 
                    ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span className="hidden sm:inline">{isCurrentFlagged ? 'Flagged' : 'Flag for Review'}</span>
              </button>
            </div>

            {/* Right: Timer & Matrix Drawer & Finish Early */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-mono font-bold">
                <Timer className="w-3.5 h-3.5 text-indigo-600" />
                <span>{formatTime(elapsedSeconds)}</span>
              </div>

              {/* 200 Question Matrix Button */}
              <button
                onClick={() => setShowMatrixModal(true)}
                className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold flex items-center space-x-1 border border-indigo-200 transition-colors"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">200 Matrix</span>
                <span>({answeredCount}/{examQuestions.length})</span>
              </button>

              {/* Finish Button */}
              <button
                onClick={() => setShowConfirmFinishModal(true)}
                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Finish Exam
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-indigo-600 h-full transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Active Question Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Question Meta Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-black bg-slate-900 text-white">
                Exam #{currentIndex + 1}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {currentQ.category}
              </span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${
                currentQ.difficulty === 'Beginner'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : currentQ.difficulty === 'Intermediate'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-purple-50 text-purple-700 border-purple-200'
              }`}>
                {currentQ.difficulty}
              </span>
            </div>

            {currentQ.frequentlyAskedBy && (
              <span className="text-xs text-slate-500 font-medium">
                🏢 Frequently asked by {currentQ.frequentlyAskedBy.slice(0, 2).join(', ')}
              </span>
            )}
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
            {currentQ.question}
          </h2>

          {/* MODE 1: INTERACTIVE QUIZ (MULTIPLE CHOICE) */}
          {examMode === 'quiz' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Select the correct answer:
              </div>

              {currentQ.quizOptions && currentQ.quizOptions.length > 0 ? (
                <div className="space-y-2.5">
                  {currentQ.quizOptions.map((opt, idx) => {
                    const isSelected = currentAnswer?.selectedOptionIndex === idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectQuizOption(idx)}
                        className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start space-x-3 ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/90 text-indigo-950 font-semibold ring-2 ring-indigo-500/20 shadow-2xs'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Fallback if question doesn't have options */
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <p className="text-xs text-slate-600">This question evaluates deep conceptual knowledge. View answer below to self-evaluate:</p>
                  {!isAnswerRevealed ? (
                    <button
                      onClick={() => setIsAnswerRevealed(true)}
                      className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-lg shadow-xs"
                    >
                      Show Solution & Self-Score
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-800 bg-white p-3 rounded-lg border border-slate-200">{currentQ.answer}</p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleSelfScore('correct')}
                          className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                        >
                          I Knew It (Correct)
                        </button>
                        <button
                          onClick={() => handleSelfScore('missed')}
                          className="px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg"
                        >
                          I Missed It
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* MODE 2: ORAL DRILL & SELF-RATING */}
          {examMode === 'flashcard' && (
            <div className="space-y-4">
              {!isAnswerRevealed && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500">
                    💡 Formulate your answer or speak aloud (scratchpad optional):
                  </label>
                  <textarea
                    value={scratchpad}
                    onChange={e => setScratchpad(e.target.value)}
                    placeholder="Type key trade-offs, keywords, or points you would communicate to the interviewer..."
                    rows={3}
                    className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => setIsAnswerRevealed(true)}
                    className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Reveal Model Answer & Grade Yourself</span>
                  </button>
                </div>
              )}

              {isAnswerRevealed && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Model Answer:</span>
                    </span>
                    <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                      {currentQ.answer}
                    </p>

                    {currentQ.keyPoints && (
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-xs font-bold text-slate-600 block mb-1">Key Evaluation Criteria:</span>
                        <ul className="text-xs text-slate-700 space-y-1">
                          {currentQ.keyPoints.map((kp, idx) => (
                            <li key={idx} className="flex items-start space-x-1.5">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{kp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 text-center">
                      Grade Your Answer:
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => handleSelfScore('missed')}
                        className={`py-3 px-2 rounded-xl border font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all ${
                          currentAnswer?.rating === 'missed'
                            ? 'bg-rose-100 border-rose-400 text-rose-900 ring-2 ring-rose-400/20'
                            : 'bg-rose-50/70 border-rose-200 text-rose-800 hover:bg-rose-100'
                        }`}
                      >
                        <XCircle className="w-5 h-5 text-rose-600 mb-1" />
                        <span>Missed</span>
                        <span className="text-[10px] font-normal">0%</span>
                      </button>

                      <button
                        onClick={() => handleSelfScore('partial')}
                        className={`py-3 px-2 rounded-xl border font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all ${
                          currentAnswer?.rating === 'partial'
                            ? 'bg-amber-100 border-amber-400 text-amber-900 ring-2 ring-amber-400/20'
                            : 'bg-amber-50/70 border-amber-200 text-amber-800 hover:bg-amber-100'
                        }`}
                      >
                        <HelpCircle className="w-5 h-5 text-amber-600 mb-1" />
                        <span>Partial</span>
                        <span className="text-[10px] font-normal">50%</span>
                      </button>

                      <button
                        onClick={() => handleSelfScore('correct')}
                        className={`py-3 px-2 rounded-xl border font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all ${
                          currentAnswer?.rating === 'correct'
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-900 ring-2 ring-emerald-400/20'
                            : 'bg-emerald-50/70 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
                        <span>Nailed It</span>
                        <span className="text-[10px] font-normal">100%</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(prev => prev - 1);
                  setIsAnswerRevealed(false);
                }
              }}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Answered {answeredCount} of {examQuestions.length}
            </span>

            {currentIndex + 1 < examQuestions.length ? (
              <button
                onClick={() => {
                  setCurrentIndex(prev => prev + 1);
                  setIsAnswerRevealed(false);
                }}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center space-x-1.5"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmFinishModal(true)}
                className="px-5 py-2 text-xs font-extrabold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <Trophy className="w-4 h-4" />
                <span>Submit & See Score</span>
              </button>
            )}
          </div>
        </div>

        {/* 200 QUESTION MATRIX MODAL */}
        {showMatrixModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Exam Question Matrix ({examQuestions.length} Questions)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click any question number to instantly jump to it.
                  </p>
                </div>
                <button
                  onClick={() => setShowMatrixModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Legend */}
              <div className="px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center gap-3 text-[11px] font-semibold">
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
                  <span>Answered ({answeredCount})</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded bg-slate-200 inline-block" />
                  <span>Unanswered ({examQuestions.length - answeredCount})</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
                  <span>Flagged ({flaggedIds.size})</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded bg-indigo-600 inline-block" />
                  <span>Current (# {currentIndex + 1})</span>
                </span>
              </div>

              {/* Matrix Grid of 200 Questions */}
              <div className="p-4 sm:p-5 overflow-y-auto flex-1 grid grid-cols-5 sm:grid-cols-10 gap-2">
                {examQuestions.map((q, idx) => {
                  const isAnswered = !!answersMap[q.id];
                  const isFlagged = flaggedIds.has(q.id);
                  const isCurrent = idx === currentIndex;

                  let colorClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
                  if (isCurrent) {
                    colorClass = 'bg-indigo-600 text-white font-black ring-2 ring-indigo-500/40 border-indigo-700';
                  } else if (isFlagged) {
                    colorClass = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
                  } else if (isAnswered) {
                    colorClass = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(idx)}
                      className={`h-9 rounded-lg text-xs border flex items-center justify-center transition-all ${colorClass}`}
                      title={`Question ${idx + 1}: ${q.question.slice(0, 40)}...`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <button
                  onClick={() => setShowMatrixModal(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Close Matrix
                </button>
                <button
                  onClick={() => {
                    setShowMatrixModal(false);
                    setShowConfirmFinishModal(true);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                >
                  Submit Exam
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CONFIRM FINISH MODAL */}
        {showConfirmFinishModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-extrabold text-lg text-slate-900">
                  Ready to Submit Your Final Exam?
                </h3>
                <p className="text-xs text-slate-500">
                  You have answered <strong>{answeredCount}</strong> out of <strong>{examQuestions.length}</strong> questions.
                  {examQuestions.length - answeredCount > 0 && (
                    <span className="text-amber-600 block mt-1 font-semibold">
                      ⚠️ Note: {examQuestions.length - answeredCount} unanswered questions will be marked as 0 points.
                    </span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmFinishModal(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  Keep Reviewing
                </button>
                <button
                  onClick={handleFinishExam}
                  className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Yes, Calculate My Score
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: COMPREHENSIVE SCORE & ANALYTICS REPORT
  // =========================================================================
  if (phase === 'score' && finalScoreResult) {
    const score = finalScoreResult.scorePercentage;
    const isHigh = score >= 80;
    const isMedium = score >= 60 && score < 80;

    let grade = {
      title: '🏆 Principal / Lead Tier Candidate',
      badge: 'Systems Limited & 10Pearls Ready',
      desc: 'Mastery across MERN, Next.js, GSAP, and System Design. Outstanding full-stack depth!'
    };
    if (score < 50) {
      grade = {
        title: '📖 Junior / Foundation Needed',
        badge: 'Needs Dedicated Revision',
        desc: 'Good initial effort! Review the missed questions in the study guide to build core confidence.'
      };
    } else if (score < 70) {
      grade = {
        title: '💪 Associate to Mid-Level Candidate',
        badge: 'Interview Eligible',
        desc: 'Solid core foundation. Focus on advanced MongoDB aggregation, React 19 hooks, and Next.js ISR.'
      };
    } else if (score < 85) {
      grade = {
        title: '🌟 Senior Full-Stack Engineer',
        badge: 'Top Tier Pakistani Market',
        desc: 'Impressive command over system design, event loop, middleware pipelines, and animation engines.'
      };
    }

    // Category breakdown
    const categoryStats: Record<string, { total: number; scoreSum: number; correct: number }> = {};
    finalScoreResult.records.forEach(rec => {
      const q = ALL_QUESTIONS.find(item => item.id === rec.questionId);
      if (q) {
        if (!categoryStats[q.category]) {
          categoryStats[q.category] = { total: 0, scoreSum: 0, correct: 0 };
        }
        categoryStats[q.category].total += 1;
        categoryStats[q.category].scoreSum += rec.userScore;
        if (rec.rating === 'correct') categoryStats[q.category].correct += 1;
      }
    });

    // Filter review questions
    const reviewQuestions = examQuestions.filter(q => {
      const ans = answersMap[q.id];
      if (reviewFilter === 'missed') return !ans || ans.rating === 'missed';
      if (reviewFilter === 'correct') return ans?.rating === 'correct';
      if (reviewFilter === 'flagged') return flaggedIds.has(q.id);
      return true; // 'all'
    });

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Scorecard Hero */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Final Exam Official Scorecard</span>
          </div>

          {/* Big Score Gauge */}
          <div className="flex flex-col items-center">
            <div className={`w-36 h-36 rounded-full border-8 flex flex-col items-center justify-center shadow-inner ${
              isHigh
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                : isMedium
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-amber-500 bg-amber-50 text-amber-900'
            }`}>
              <span className="text-4xl sm:text-5xl font-black">{score}%</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Score
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800">
                {grade.badge}
              </span>
              <h2 className="text-2xl font-black text-slate-900">{grade.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {grade.desc}
              </p>
            </div>
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 p-3.5 rounded-xl text-center">
              <div className="text-xs text-slate-500 font-medium">Total Questions</div>
              <div className="text-xl font-black text-slate-900">{finalScoreResult.totalQuestions}</div>
            </div>
            <div className="bg-emerald-50 p-3.5 rounded-xl text-center">
              <div className="text-xs text-emerald-700 font-medium">Correct (100%)</div>
              <div className="text-xl font-black text-emerald-800">{finalScoreResult.correctCount}</div>
            </div>
            <div className="bg-amber-50 p-3.5 rounded-xl text-center">
              <div className="text-xs text-amber-700 font-medium">Partial (50%)</div>
              <div className="text-xl font-black text-amber-800">{finalScoreResult.partialCount}</div>
            </div>
            <div className="bg-rose-50 p-3.5 rounded-xl text-center">
              <div className="text-xs text-rose-700 font-medium">Missed (0%)</div>
              <div className="text-xl font-black text-rose-800">{finalScoreResult.missedCount}</div>
            </div>
          </div>

          {/* Time & Pace stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-2">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Time Elapsed: <strong>{formatTime(finalScoreResult.durationSeconds)}</strong></span>
            </span>
            <span>•</span>
            <span>
              Avg Pace: <strong>{Math.round(finalScoreResult.durationSeconds / finalScoreResult.totalQuestions)}s</strong> per question
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleStartExam(examQuestionCount)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-2"
            >
              <Shuffle className="w-4 h-4" />
              <span>Retake {examQuestionCount} Exam (Fresh Randomization)</span>
            </button>

            <button
              onClick={onNavigateToStudyGuide}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Review in All Answers Section</span>
            </button>
          </div>
        </div>

        {/* Technical Domain Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">
            Performance Breakdown by Technical Domain:
          </h3>
          <div className="space-y-3">
            {Object.entries(categoryStats).map(([catName, stats]) => {
              const catPercent = Math.round(stats.scoreSum / stats.total);
              return (
                <div key={catName} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800">{catName}</span>
                    <span className="text-slate-600">
                      {stats.correct}/{stats.total} correct ({catPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        catPercent >= 80 ? 'bg-emerald-500' : catPercent >= 60 ? 'bg-indigo-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question-by-Question Review */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Detailed Question Review ({reviewQuestions.length} Questions)
              </h3>
              <p className="text-xs text-slate-500">
                Inspect every answer and explanation to solidify your learning.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  reviewFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All ({examQuestions.length})
              </button>
              <button
                onClick={() => setReviewFilter('missed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  reviewFilter === 'missed'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                }`}
              >
                Missed ({finalScoreResult.missedCount})
              </button>
              <button
                onClick={() => setReviewFilter('correct')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  reviewFilter === 'correct'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                Correct ({finalScoreResult.correctCount})
              </button>
              {flaggedIds.size > 0 && (
                <button
                  onClick={() => setReviewFilter('flagged')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    reviewFilter === 'flagged'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  Flagged ({flaggedIds.size})
                </button>
              )}
            </div>
          </div>

          {/* List of reviewed questions */}
          <div className="space-y-4">
            {reviewQuestions.map((q, idx) => {
              const ans = answersMap[q.id];
              const isCorrect = ans?.rating === 'correct';
              const isPartial = ans?.rating === 'partial';

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-xl border space-y-3 transition-all ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : isPartial
                      ? 'border-amber-200 bg-amber-50/30'
                      : 'border-rose-200 bg-rose-50/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-black text-slate-700">Q#{q.number}</span>
                        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                          {q.category}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          isCorrect 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : isPartial 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isCorrect ? '✓ Correct (100%)' : isPartial ? '⚠️ Partial (50%)' : '✗ Missed (0%)'}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">{q.question}</h4>
                    </div>
                  </div>

                  {/* Model Answer */}
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-2 text-xs sm:text-sm text-slate-800">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                      Model Answer:
                    </span>
                    <p className="leading-relaxed">{q.answer}</p>
                    {q.keyPoints && (
                      <div className="pt-2 border-t border-slate-100 space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Key Takeaways:</span>
                        {q.keyPoints.map((kp, kIdx) => (
                          <div key={kIdx} className="text-xs text-slate-700 flex items-start space-x-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{kp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
