import { Question } from '../types';
import { SET1_QUESTIONS } from './set1Questions';
import { SET1_PART2_QUESTIONS } from './set1Part2Questions';
import { SET2_PART1_QUESTIONS } from './set2Part1Questions';
import { SET2_PART2_QUESTIONS } from './set2Part2Questions';

export const ALL_QUESTIONS: Question[] = [
  ...SET1_QUESTIONS,
  ...SET1_PART2_QUESTIONS,
  ...SET2_PART1_QUESTIONS,
  ...SET2_PART2_QUESTIONS
];

export const CATEGORIES = [
  'All',
  'MongoDB',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'GSAP',
  'JavaScript',
  'System Design',
  'General & Pakistani Market'
] as const;

export const DIFFICULTY_LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const;
