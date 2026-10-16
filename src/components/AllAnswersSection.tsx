import React, { useState, useMemo } from 'react';
import { 
  Bookmark, 
  BookmarkCheck, 
  Check, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Code2, 
  Copy, 
  ExternalLink, 
  Eye, 
  Filter, 
  Layers, 
  Play, 
  Printer, 
  Search, 
  Sparkles, 
  X,
  Zap
} from 'lucide-react';
import { Question, Category, Difficulty, MasteryStatus } from '../types';
import { ALL_QUESTIONS, CATEGORIES } from '../data/allQuestions';

interface AllAnswersSectionProps {
  progressStatuses: Record<string, MasteryStatus>;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onStartSingleTest: (question: Question) => void;
}

const PAKISTAN_COMPANIES = [
  'All Companies',
  'Systems Limited',
  'Devsinc',
  'Netsol',
  '10Pearls',
  'Arbisoft',
  'pieCyfer',
  'VentureDive'
] as const;

export const AllAnswersSection: React.FC<AllAnswersSectionProps> = ({
  progressStatuses,
  bookmarks,
  onToggleBookmark,
  onStartSingleTest
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All Companies');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  
  // Notice: We track collapsed IDs instead of expanded IDs, so by default ALL answers are visible!
  const [collapsedIds, setCollapsedIds] = useState<Record<string, boolean>>({});

  const toggleCollapse = (id: string) => {
    setCollapsedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCollapseAll = () => {
    const updated: Record<string, boolean> = {};
    filteredQuestions.forEach(q => {
      updated[q.id] = true;
    });
    setCollapsedIds(updated);
  };

  const handleExpandAll = () => {
    setCollapsedIds({});
  };

  const handleCopyAnswer = (question: Question) => {
    const textToCopy = `Question: ${question.question}\n\nAnswer: ${question.answer}${
      question.keyPoints ? `\n\nKey Points:\n${question.keyPoints.map(p => `• ${p}`).join('\n')}` : ''
    }${question.codeSnippet ? `\n\nCode:\n${question.codeSnippet}` : ''}`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(question.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Filtered question set
  const filteredQuestions = useMemo(() => {
    return ALL_QUESTIONS.filter(q => {
      if (selectedCategory !== 'All' && q.category !== selectedCategory) {
        return false;
      }
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) {
        return false;
      }
      if (selectedCompany !== 'All Companies') {
        if (!q.frequentlyAskedBy || !q.frequentlyAskedBy.some(c => c.toLowerCase().includes(selectedCompany.toLowerCase()))) {
          return false;
        }
      }
      if (onlyBookmarked && !bookmarks.includes(q.id)) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuestion = q.question.toLowerCase().includes(query);
        const matchesAnswer = q.answer.toLowerCase().includes(query);
        const matchesCategory = q.category.toLowerCase().includes(query);
        const matchesCode = q.codeSnippet?.toLowerCase().includes(query) || false;
        const matchesCompany = q.frequentlyAskedBy?.some(c => c.toLowerCase().includes(query)) || false;
        const matchesNumber = `q${q.number}` === query || `${q.number}` === query;
        if (!matchesQuestion && !matchesAnswer && !matchesCategory && !matchesCode && !matchesCompany && !matchesNumber) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, selectedCompany, onlyBookmarked, searchQuery, bookmarks]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: ALL_QUESTIONS.length };
    ALL_QUESTIONS.forEach(q => {
      counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl text-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
            <Eye className="w-3.5 h-3.5 text-indigo-300" />
            <span>Complete Question & Answer Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            All Interview Questions & Answers — <span className="text-emerald-400">Already Visible</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Every question, comprehensive model answer, architectural explanation, code snippet, and key evaluation criteria are completely revealed below for uninterrupted study and reference.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-medium text-slate-300">
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{ALL_QUESTIONS.length} Questions & Detailed Answers</span>
            </span>
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
              ⚡ Instant Search & Copy Ready
            </span>
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
              🇵🇰 Pakistan Software House Tags
            </span>
          </div>
        </div>
      </div>

      {/* Technology Filter Pills */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Filter by Domain:</span>
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredQuestions.length}</strong> of {ALL_QUESTIONS.length}
          </span>
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(cat => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Secondary Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search concepts, code, answers, companies (e.g. Next.js, index, Systems)..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">🟢 Beginner</option>
              <option value="Intermediate">🔵 Intermediate</option>
              <option value="Advanced">🟣 Advanced</option>
            </select>
          </div>

          {/* Company Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedCompany}
              onChange={e => setSelectedCompany(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {PAKISTAN_COMPANIES.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>

          {/* Bookmarked Filter */}
          <div className="lg:col-span-2 flex items-center">
            <button
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                onlyBookmarked
                  ? 'bg-amber-50 text-amber-800 border-amber-300 font-semibold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${onlyBookmarked ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
              <span>Saved ({bookmarks.length})</span>
            </button>
          </div>
        </div>

        {/* Toolbar Footer: Question counter & Expand/Collapse toggle */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700">
              {filteredQuestions.length} Questions Displayed
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-600 font-medium">
              ✓ All Answers & Solutions Fully Visible
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExpandAll}
              className="hover:text-indigo-600 font-semibold transition-colors flex items-center space-x-1"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Expand All</span>
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={handleCollapseAll}
              className="hover:text-indigo-600 font-medium transition-colors flex items-center space-x-1"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Collapse All</span>
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => window.print()}
              className="hover:text-indigo-600 font-medium transition-colors flex items-center space-x-1"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Study Sheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Questions & Answers List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Search className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No questions found matching your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your technology category, difficulty, or search term to see more questions.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSelectedCompany('All Companies');
                setSearchQuery('');
                setOnlyBookmarked(false);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isCollapsed = !!collapsedIds[q.id];
            const isBookmarked = bookmarks.includes(q.id);
            const status = progressStatuses[q.id] || 'unread';

            return (
              <article
                key={q.id}
                id={`q-${q.number}`}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all duration-150 overflow-hidden"
              >
                {/* Card Header & Question */}
                <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      {/* Badges Row */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-black bg-slate-900 text-white shadow-2xs">
                          #{q.number}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {q.category}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                          q.difficulty === 'Beginner'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : q.difficulty === 'Intermediate'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-purple-50 text-purple-700 border-purple-200'
                        }`}>
                          {q.difficulty}
                        </span>

                        {q.frequentlyAskedBy && q.frequentlyAskedBy.map((company) => (
                          <span
                            key={company}
                            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-white text-slate-700 border border-slate-200"
                          >
                            🏢 {company}
                          </span>
                        ))}
                      </div>

                      {/* Question Heading */}
                      <h2 
                        onClick={() => toggleCollapse(q.id)}
                        className="text-base sm:text-lg font-extrabold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors leading-snug"
                      >
                        {q.question}
                      </h2>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center space-x-1 shrink-0">
                      {/* Copy Answer Button */}
                      <button
                        onClick={() => handleCopyAnswer(q)}
                        title="Copy Question & Answer"
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        {copiedId === q.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => onToggleBookmark(q.id)}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark for review'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBookmarked 
                            ? 'text-amber-500 hover:text-amber-600 bg-amber-50' 
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 fill-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      {/* Launch Test Drill */}
                      <button
                        onClick={() => onStartSingleTest(q)}
                        title="Test me on this question"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors hidden sm:block"
                      >
                        <Zap className="w-4 h-4" />
                      </button>

                      {/* Fold/Unfold Toggle */}
                      <button
                        onClick={() => toggleCollapse(q.id)}
                        title={isCollapsed ? 'Show Answer' : 'Collapse Answer'}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        {isCollapsed ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronUp className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Answer Body (Visible by default!) */}
                {!isCollapsed && (
                  <div className="p-4 sm:p-6 space-y-4 text-sm text-slate-800">
                    {/* Model Answer */}
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Comprehensive Model Answer:</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed sm:text-base font-normal whitespace-pre-line bg-emerald-50/30 p-3.5 rounded-xl border border-emerald-100">
                        {q.answer}
                      </p>
                    </div>

                    {/* Key Evaluation Points */}
                    {q.keyPoints && q.keyPoints.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                          Key Evaluation Criteria & Takeaways:
                        </span>
                        <div className="grid grid-cols-1 gap-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                          {q.keyPoints.map((point, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                              <span className="text-emerald-600 font-black mt-0.5">✓</span>
                              <span className="leading-snug">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Code Snippet (if present) */}
                    {q.codeSnippet && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600">
                          <span className="flex items-center space-x-1.5">
                            <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Implementation Example ({q.codeLanguage || 'TypeScript'}):</span>
                          </span>
                          <button
                            onClick={() => handleCopyCode(q.id, q.codeSnippet!)}
                            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                          >
                            {copiedCodeId === q.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                          <pre className="p-4 text-xs sm:text-[13px] font-mono text-emerald-300 overflow-x-auto leading-relaxed scrollbar-thin">
                            <code>{q.codeSnippet}</code>
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Quick Test Bar */}
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                      <div className="flex items-center space-x-2">
                        <span>Current Mastery:</span>
                        <span className={`px-2 py-0.5 rounded-full font-semibold capitalize ${
                          status === 'mastered' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : status === 'reviewing'
                            ? 'bg-amber-100 text-amber-800'
                            : status === 'learning'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {status}
                        </span>
                      </div>

                      <button
                        onClick={() => onStartSingleTest(q)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold transition-colors"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>Test This Question</span>
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
