import { useState, useEffect } from 'react';
import { MasteryStatus, TestResult, UserProgress, Category } from '../types';
import { ALL_QUESTIONS } from '../data/allQuestions';

const STORAGE_KEY = 'fullstack_interview_prep_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  statuses: {},
  bookmarks: [],
  notes: {},
  testHistory: []
};

export function useInterviewProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved progress:', e);
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }, [progress]);

  const setQuestionStatus = (questionId: string, status: MasteryStatus) => {
    setProgress(prev => ({
      ...prev,
      statuses: {
        ...prev.statuses,
        [questionId]: status
      }
    }));
  };

  const toggleBookmark = (questionId: string) => {
    setProgress(prev => {
      const isBookmarked = prev.bookmarks.includes(questionId);
      return {
        ...prev,
        bookmarks: isBookmarked
          ? prev.bookmarks.filter(id => id !== questionId)
          : [...prev.bookmarks, questionId]
      };
    });
  };

  const saveQuestionNote = (questionId: string, note: string) => {
    setProgress(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [questionId]: note
      }
    }));
  };

  const addTestResult = (result: TestResult) => {
    setProgress(prev => {
      // Also automatically update question statuses based on test performance:
      // Questions rated 'correct' can transition to 'mastered' or 'reviewing'
      const updatedStatuses = { ...prev.statuses };
      result.records.forEach(rec => {
        if (rec.rating === 'correct') {
          // If was unread or reviewing, bump to mastered
          updatedStatuses[rec.questionId] = 'mastered';
        } else if (rec.rating === 'missed') {
          updatedStatuses[rec.questionId] = 'reviewing';
        } else if (rec.rating === 'partial' && (!updatedStatuses[rec.questionId] || updatedStatuses[rec.questionId] === 'unread')) {
          updatedStatuses[rec.questionId] = 'learning';
        }
      });

      return {
        ...prev,
        statuses: updatedStatuses,
        testHistory: [result, ...prev.testHistory]
      };
    });
  };

  const resetAllProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress, bookmarks, and test history?')) {
      setProgress(DEFAULT_PROGRESS);
    }
  };

  // Stats calculation
  const totalQuestions = ALL_QUESTIONS.length;
  const masteredCount = Object.values(progress.statuses).filter(s => s === 'mastered').length;
  const reviewingCount = Object.values(progress.statuses).filter(s => s === 'reviewing').length;
  const learningCount = Object.values(progress.statuses).filter(s => s === 'learning').length;
  const unreadCount = totalQuestions - (masteredCount + reviewingCount + learningCount);

  const masteryPercentage = Math.round((masteredCount / totalQuestions) * 100);

  const testsCount = progress.testHistory.length;
  const averageScore = testsCount > 0
    ? Math.round(progress.testHistory.reduce((acc, t) => acc + t.scorePercentage, 0) / testsCount)
    : 0;

  // Category stats calculation
  const getCategoryStats = (category: Category) => {
    const categoryQuestions = ALL_QUESTIONS.filter(q => q.category === category);
    const catTotal = categoryQuestions.length;
    const catMastered = categoryQuestions.filter(q => progress.statuses[q.id] === 'mastered').length;
    const catReviewing = categoryQuestions.filter(q => progress.statuses[q.id] === 'reviewing').length;
    const percentage = catTotal > 0 ? Math.round((catMastered / catTotal) * 100) : 0;
    return { total: catTotal, mastered: catMastered, reviewing: catReviewing, percentage };
  };

  return {
    progress,
    setQuestionStatus,
    toggleBookmark,
    saveQuestionNote,
    addTestResult,
    resetAllProgress,
    stats: {
      totalQuestions,
      masteredCount,
      reviewingCount,
      learningCount,
      unreadCount,
      masteryPercentage,
      testsCount,
      averageScore
    },
    getCategoryStats
  };
}
