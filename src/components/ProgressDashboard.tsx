import React from 'react';
import { 
  AlertCircle,
  Award, 
  BarChart3, 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  Flame, 
  GraduationCap, 
  HelpCircle, 
  Lightbulb, 
  MapPin, 
  Play, 
  Sparkles, 
  Trophy, 
  Zap 
} from 'lucide-react';
import { Category, TestResult, MasteryStatus, Question } from '../types';
import { ALL_QUESTIONS, CATEGORIES } from '../data/allQuestions';
import { COMPANY_PROFILES } from '../data/companyTips';

interface ProgressDashboardProps {
  stats: {
    totalQuestions: number;
    masteredCount: number;
    reviewingCount: number;
    learningCount: number;
    unreadCount: number;
    masteryPercentage: number;
    testsCount: number;
    averageScore: number;
  };
  getCategoryStats: (category: Category) => { total: number; mastered: number; reviewing: number; percentage: number };
  testHistory: TestResult[];
  progressStatuses: Record<string, MasteryStatus>;
  onNavigateToPrep: (category?: string, statusFilter?: string) => void;
  onStartTestWithCategory: (category: string) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  stats,
  getCategoryStats,
  testHistory,
  progressStatuses,
  onNavigateToPrep,
  onStartTestWithCategory
}) => {
  const reviewingQuestions = ALL_QUESTIONS.filter(q => progressStatuses[q.id] === 'reviewing');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Mastery */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Interview Mastery</div>
            <div className="text-2xl font-black text-slate-900">{stats.masteryPercentage}%</div>
            <div className="text-xs text-slate-600 font-medium">
              {stats.masteredCount} of {stats.totalQuestions} questions
            </div>
          </div>
        </div>

        {/* Card 2: Needs Review */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Needs Review</div>
            <div className="text-2xl font-black text-slate-900">{stats.reviewingCount}</div>
            <button 
              onClick={() => onNavigateToPrep(undefined, 'reviewing')}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold underline"
            >
              View marked questions →
            </button>
          </div>
        </div>

        {/* Card 3: Test Average */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Average Test Score</div>
            <div className="text-2xl font-black text-slate-900">
              {stats.testsCount > 0 ? `${stats.averageScore}%` : 'N/A'}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Across {stats.testsCount} test session{stats.testsCount === 1 ? '' : 's'}
            </div>
          </div>
        </div>

        {/* Card 4: Learning in Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Active Learning</div>
            <div className="text-2xl font-black text-slate-900">{stats.learningCount}</div>
            <div className="text-xs text-slate-500 font-medium">
              {stats.unreadCount} unread questions remaining
            </div>
          </div>
        </div>
      </div>

      {/* Category Mastery Progress Bars */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span>Technology Readiness by Category</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Track your mastery across each segment tested in Pakistani technical interviews.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.filter(c => c !== 'All').map((cat) => {
            const catStats = getCategoryStats(cat as Category);
            return (
              <div key={cat} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800">{cat}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">{catStats.percentage}%</span>
                    <span className="text-xs text-slate-400">({catStats.mastered}/{catStats.total})</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      catStats.percentage >= 75
                        ? 'bg-emerald-500'
                        : catStats.percentage >= 40
                        ? 'bg-indigo-600'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${catStats.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-slate-500">
                    {catStats.reviewing > 0 && (
                      <span className="text-amber-600 font-semibold">{catStats.reviewing} need review</span>
                    )}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onNavigateToPrep(cat)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Study Topic
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      onClick={() => onStartTestWithCategory(cat)}
                      className="text-emerald-600 hover:text-emerald-800 font-semibold flex items-center space-x-0.5"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Test</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Questions Needing Review Quick List */}
      {reviewingQuestions.length > 0 && (
        <div className="bg-amber-50/60 rounded-2xl border border-amber-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-amber-950 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>Priority Questions Needing Review ({reviewingQuestions.length})</span>
            </h3>
            <button
              onClick={() => onNavigateToPrep(undefined, 'reviewing')}
              className="text-xs text-amber-800 hover:text-amber-950 font-bold underline"
            >
              Open in Question Bank
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {reviewingQuestions.slice(0, 6).map(q => (
              <div
                key={q.id}
                onClick={() => onNavigateToPrep(q.category)}
                className="p-3 bg-white rounded-xl border border-amber-200/80 shadow-2xs hover:border-amber-400 cursor-pointer transition-colors text-xs"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded text-[10px]">
                    {q.category}
                  </span>
                  <span className="text-slate-400">Q{q.number}</span>
                </div>
                <div className="font-bold text-slate-900 line-clamp-1">{q.question}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test History Log */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Recent Test Session Log</span>
        </h3>

        {testHistory.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs sm:text-sm">
            No test sessions completed yet. Launch a test session to track your score progression over time!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Mode</th>
                  <th className="pb-3">Questions</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Breakdown</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testHistory.slice(0, 10).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 font-medium text-slate-600">{t.date}</td>
                    <td className="py-3 font-semibold text-indigo-700">{t.categoryFilter}</td>
                    <td className="py-3 text-slate-600 capitalize">{t.mode}</td>
                    <td className="py-3 text-slate-700 font-bold">{t.totalQuestions} Qs</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded font-black text-xs ${
                        t.scorePercentage >= 80
                          ? 'bg-emerald-100 text-emerald-800'
                          : t.scorePercentage >= 60
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {t.scorePercentage}%
                      </span>
                    </td>
                    <td className="py-3 text-slate-500">
                      <span className="text-emerald-600 font-medium">{t.correctCount}✓</span>{' '}
                      <span className="text-amber-600 font-medium">{t.partialCount}~</span>{' '}
                      <span className="text-rose-600 font-medium">{t.missedCount}✗</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pakistan Software Houses & Market Guide */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Pakistani Tech Ecosystem Insights</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Pakistani Software House Interview Roadmaps
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Real hiring formats, tech stack demands, and insider interview expectations for leading companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMPANY_PROFILES.map((comp) => (
            <div 
              key={comp.name}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-base text-slate-900">{comp.name}</h4>
                    <span className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{comp.location}</span>
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    Tier 1
                  </span>
                </div>

                {/* Stacks */}
                <div className="flex flex-wrap gap-1">
                  {comp.focusStack.map(stack => (
                    <span key={stack} className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-700">
                      {stack}
                    </span>
                  ))}
                </div>

                {/* Interview Steps */}
                <div className="text-xs space-y-1 pt-1">
                  <span className="font-bold text-slate-700 block">Interview Rounds:</span>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600">
                    {comp.interviewProcess.map((step, idx) => (
                      <li key={idx} className="leading-tight">{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Insider Tip */}
                <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 leading-relaxed">
                  <strong className="block text-emerald-950 font-bold mb-0.5 flex items-center space-x-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>Insider Tip:</span>
                  </strong>
                  {comp.insiderTip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STAR Method & Live Coding Prep Guide */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
        <h4 className="text-lg font-bold flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Top 5 Golden Rules for Pakistani Technical Rounds</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1">
            <strong className="text-white font-bold block">1. Practice Writing Code on Paper</strong>
            <p className="leading-relaxed">
              Companies like Systems Limited and pieCyfer frequently conduct written initial rounds. Practice writing closures, recursion, array reverse, and Mongoose schemas without IDE syntax highlighting.
            </p>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1">
            <strong className="text-white font-bold block">2. Verbalize Architectural Trade-offs</strong>
            <p className="leading-relaxed">
              Don't just recite definitions. Explain <em>why</em> you chose SSR over SSG for an eCommerce cart, or why you chose MongoDB over PostgreSQL for an invoice system with flexible line items.
            </p>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1">
            <strong className="text-white font-bold block">3. Use the STAR Framework</strong>
            <p className="leading-relaxed">
              When asked about past projects or bug investigations: Situation, Task, Action (what YOU did specifically), and Result (quantified metrics like 40% reduced bundle size).
            </p>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1">
            <strong className="text-white font-bold block">4. Master the JavaScript Event Loop</strong>
            <p className="leading-relaxed">
              Almost every technical round in Pakistan will include predicting the output order of synchronous code vs microtasks (Promises) vs macrotasks (setTimeout). Know the phases inside out!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
