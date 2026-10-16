import React, { useState, useMemo } from 'react';
import { 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Code2, 
  Copy, 
  Check, 
  Edit3, 
  ExternalLink, 
  Filter, 
  HelpCircle, 
  Layers, 
  Play, 
  Search, 
  Sparkles, 
  X 
} from 'lucide-react';
import { Question, Category, Difficulty, MasteryStatus } from '../types';
import { ALL_QUESTIONS, CATEGORIES } from '../data/allQuestions';

interface PrepSectionProps {
  progressStatuses: Record<string, MasteryStatus>;
  bookmarks: string[];
  notes: Record<string, string>;
  onSetStatus: (id: string, status: MasteryStatus) => void;
  onToggleBookmark: (id: string) => void;
  onSaveNote: (id: string, note: string) => void;
  onStartSingleTest: (question: Question) => void;
}

export const PrepSection: React.FC<PrepSectionProps> = ({
  progressStatuses,
  bookmarks,
  notes,
  onSetStatus,
  onToggleBookmark,
  onSaveNote,
  onStartSingleTest
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Record<string, boolean>>({});
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState<string>('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Toggle single question expansion
  const toggleExpand = (id: string) => {
    setExpandedQuestionIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Expand or Collapse All
  const handleToggleExpandAll = (expand: boolean) => {
    const updated: Record<string, boolean> = {};
    filteredQuestions.forEach(q => {
      updated[q.id] = expand;
    });
    setExpandedQuestionIds(updated);
  };

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return ALL_QUESTIONS.filter(q => {
      // Category filter
      if (selectedCategory !== 'All' && q.category !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) {
        return false;
      }
      // Status filter
      const currentStatus = progressStatuses[q.id] || 'unread';
      if (statusFilter !== 'All') {
        if (statusFilter === 'mastered' && currentStatus !== 'mastered') return false;
        if (statusFilter === 'reviewing' && currentStatus !== 'reviewing') return false;
        if (statusFilter === 'learning' && currentStatus !== 'learning') return false;
        if (statusFilter === 'unread' && currentStatus !== 'unread') return false;
      }
      // Bookmark filter
      if (onlyBookmarked && !bookmarks.includes(q.id)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQuestion = q.question.toLowerCase().includes(query);
        const matchesAnswer = q.answer.toLowerCase().includes(query);
        const matchesKeyPoints = q.keyPoints?.some(kp => kp.toLowerCase().includes(query));
        const matchesCompany = q.frequentlyAskedBy?.some(c => c.toLowerCase().includes(query));
        return matchesQuestion || matchesAnswer || matchesKeyPoints || matchesCompany;
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, statusFilter, onlyBookmarked, searchQuery, progressStatuses, bookmarks]);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleOpenNote = (id: string) => {
    setEditingNoteId(id);
    setTempNoteText(notes[id] || '');
  };

  const handleSaveNote = (id: string) => {
    onSaveNote(id, tempNoteText);
    setEditingNoteId(null);
  };

  // Counts by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: ALL_QUESTIONS.length };
    ALL_QUESTIONS.forEach(q => {
      counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner / Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Complete Preparation & Progress Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            100+ Full Stack Interview Questions & Model Answers
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
            Curated from real technical rounds at top Pakistani software houses (Systems Limited, Devsinc, Netsol, 10Pearls, Arbisoft, pieCyfer). Track mastery, add personal notes, and test yourself on demand.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
              ⚡ {ALL_QUESTIONS.length} Questions
            </span>
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
              🚀 8 Core Domains (MERN + Next.js + GSAP)
            </span>
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
              💼 Pakistan Company Specific Tags
            </span>
          </div>
        </div>
      </div>

      {/* Category Chips Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter By Technology:</span>
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

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search questions, concepts, keywords, or companies..."
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

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Progress Statuses</option>
              <option value="mastered">✅ Mastered</option>
              <option value="reviewing">⚠️ Needs Review</option>
              <option value="learning">📖 Learning</option>
              <option value="unread">⚪ Unread / Not Started</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Bookmarked Filter Toggle */}
          <div className="md:col-span-2 flex items-center">
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

        {/* Action strip: Expand All / Collapse All */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            {filteredQuestions.length === 0 ? (
              <span className="text-rose-500 font-medium">No questions match your current filters.</span>
            ) : (
              <span>Showing {filteredQuestions.length} questions</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleToggleExpandAll(true)}
              className="hover:text-indigo-600 font-medium transition-colors"
            >
              Expand All Answers
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => handleToggleExpandAll(false)}
              className="hover:text-indigo-600 font-medium transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Question List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => {
          const isExpanded = !!expandedQuestionIds[q.id];
          const status = progressStatuses[q.id] || 'unread';
          const isBookmarked = bookmarks.includes(q.id);
          const hasNote = !!notes[q.id];

          return (
            <div
              key={q.id}
              id={`question-card-${q.id}`}
              className={`bg-white rounded-xl border transition-all duration-200 ${
                isExpanded ? 'border-indigo-200 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Question Card Header */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    {/* Meta Row: Number, Category, Difficulty, Companies */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">
                        Q{q.number}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
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

                      {/* Pakistan Software Houses Badges */}
                      {q.frequentlyAskedBy && q.frequentlyAskedBy.slice(0, 3).map((comp) => (
                        <span 
                          key={comp} 
                          className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200"
                        >
                          🏢 {comp}
                        </span>
                      ))}
                    </div>

                    {/* Question Title */}
                    <h3 
                      onClick={() => toggleExpand(q.id)}
                      className="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors leading-snug"
                    >
                      {q.question}
                    </h3>
                  </div>

                  {/* Actions: Bookmark & Expand Toggle */}
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      title={isBookmarked ? 'Remove from saved' : 'Save question'}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isBookmarked
                          ? 'bg-amber-50 text-amber-500 border-amber-200 hover:bg-amber-100'
                          : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                    </button>

                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Status Bar & Quick Actions Strip */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  {/* Status selector */}
                  <div className="flex items-center space-x-1.5">
                    <span className="text-slate-500 font-medium">Status:</span>
                    <select
                      value={status}
                      onChange={(e) => onSetStatus(q.id, e.target.value as MasteryStatus)}
                      className={`py-1 px-2.5 rounded-md text-xs font-semibold border cursor-pointer transition-colors ${
                        status === 'mastered'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : status === 'reviewing'
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : status === 'learning'
                          ? 'bg-blue-50 text-blue-700 border-blue-300'
                          : 'bg-slate-50 text-slate-600 border-slate-300'
                      }`}
                    >
                      <option value="unread">⚪ Unread</option>
                      <option value="learning">📖 Learning</option>
                      <option value="reviewing">⚠️ Needs Review</option>
                      <option value="mastered">✅ Mastered</option>
                    </select>
                  </div>

                  {/* Buttons: Test Me & Personal Notes */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenNote(q.id)}
                      className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-colors ${
                        hasNote
                          ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                          : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{hasNote ? 'Edit Notes' : 'Add Note'}</span>
                    </button>

                    <button
                      onClick={() => onStartSingleTest(q)}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold border border-emerald-300 transition-colors"
                    >
                      <Play className="w-3 h-3 fill-emerald-600" />
                      <span>Test Me</span>
                    </button>

                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium ml-1"
                    >
                      {isExpanded ? 'Hide Answer' : 'Show Answer'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Collapsible Answer & Details Panel */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-6 pt-1 border-t border-slate-100 bg-slate-50/50 rounded-b-xl space-y-4">
                  {/* Detailed Model Answer */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Model Answer:
                    </h4>
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                      {q.answer}
                    </p>
                  </div>

                  {/* Key Takeaways */}
                  {q.keyPoints && q.keyPoints.length > 0 && (
                    <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Core Points to Verbalize in the Interview:</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                        {q.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Code Snippet if applicable */}
                  {q.codeSnippet && (
                    <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-900 shadow-xs">
                      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-800/90 text-slate-300 text-xs">
                        <span className="font-mono text-[11px] text-slate-400 flex items-center space-x-1">
                          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Code Example / Syntax</span>
                        </span>
                        <button
                          onClick={() => handleCopyCode(q.id, q.codeSnippet!)}
                          className="flex items-center space-x-1 hover:text-white transition-colors"
                        >
                          {copiedCodeId === q.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 text-[11px]">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[11px]">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-3.5 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed">
                        <code>{q.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Frequently Asked In */}
                  {q.frequentlyAskedBy && (
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="font-medium text-slate-600">Reported in interviews at:</span>
                      {q.frequentlyAskedBy.map(c => (
                        <span key={c} className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium text-slate-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Personal Notes Display */}
                  {hasNote && editingNoteId !== q.id && (
                    <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span>📝 My Personal Notes:</span>
                        <button 
                          onClick={() => handleOpenNote(q.id)}
                          className="text-amber-700 hover:text-amber-900 underline"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="whitespace-pre-wrap">{notes[q.id]}</p>
                    </div>
                  )}

                  {/* Note Editing Form */}
                  {editingNoteId === q.id && (
                    <div className="bg-white p-3 rounded-lg border border-indigo-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700">Personal Notes & Mnemonics:</label>
                        <button
                          onClick={() => setEditingNoteId(null)}
                          className="text-xs text-slate-400 hover:text-slate-600"
                        >
                          Cancel
                        </button>
                      </div>
                      <textarea
                        value={tempNoteText}
                        onChange={e => setTempNoteText(e.target.value)}
                        placeholder="Write your own explanation, mnemonics, or company-specific questions here..."
                        rows={3}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingNoteId(null)}
                          className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNote(q.id)}
                          className="px-3 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded"
                        >
                          Save Notes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
