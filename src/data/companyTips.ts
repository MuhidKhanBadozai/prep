export interface CompanyProfile {
  name: string;
  location: string;
  focusStack: string[];
  interviewProcess: string[];
  keyTopics: string[];
  insiderTip: string;
}

export const COMPANY_PROFILES: CompanyProfile[] = [
  {
    name: 'Devsinc',
    location: 'Lahore / Islamabad / Remote',
    focusStack: ['React', 'Node.js', 'Next.js', 'MongoDB', 'Ruby on Rails', 'PostgreSQL'],
    interviewProcess: [
      'Initial HR Screen & English proficiency check',
      'Technical Screening: JavaScript fundamentals (closures, event loop, promises, this)',
      'Live Coding: React component architecture or Express REST CRUD with Mongoose',
      'Managerial / Cultural fit interview'
    ],
    keyTopics: ['Next.js SSR/SSG/RSC', 'MERN architecture', 'Git rebase & PR workflow', 'System design trade-offs'],
    insiderTip: 'Devsinc serves fast-growing US SaaS clients. Explain your decisions out loud and emphasize clean architecture and fast delivery.'
  },
  {
    name: 'Systems Limited',
    location: 'Lahore / Karachi / Islamabad',
    focusStack: ['MERN', 'Enterprise Cloud (AWS/Azure)', 'Microservices', 'SQL & NoSQL'],
    interviewProcess: [
      'Written / Online Aptitude & Coding Round (LeetCode Easy-Medium)',
      'Technical Round 1: Core CS Fundamentals (OOP, DSA, DB Normalization, Indexing)',
      'Technical Round 2: Deep-dive into MERN / Next.js architecture and past projects',
      'Leadership & Behavioral Round'
    ],
    keyTopics: ['OOP 4 Pillars', 'Database Indexing & ACID', 'Aggregation Pipeline', 'Scalability & Microservices'],
    insiderTip: 'Systems Limited places strong emphasis on foundational computer science principles. Brush up on Stacks/Queues, Big-O, and OOP concepts alongside modern MERN.'
  },
  {
    name: '10Pearls',
    location: 'Karachi / Lahore / Islamabad',
    focusStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'AWS Serverless'],
    interviewProcess: [
      'Recruiter Screen',
      'Technical Interview with Lead Architect (Hands-on problem solving)',
      'System Design & Code Quality review',
      'Executive Round'
    ],
    keyTopics: ['TypeScript strict typing', 'React Hooks deep dive (useMemo/useCallback)', 'JWT auth patterns', 'API Security'],
    insiderTip: '10Pearls prioritizes modern enterprise standards: TypeScript, automated testing concepts, and cloud readiness.'
  },
  {
    name: 'Arbisoft',
    location: 'Lahore / Remote',
    focusStack: ['React', 'Next.js', 'Python/Django', 'Node.js', 'PostgreSQL / Mongo'],
    interviewProcess: [
      'Arbisoft Online Assessment: algorithmic problem solving & data structures',
      'Technical Deep Dive: code review of past work & live refactoring',
      'Pair Programming & Systems Architecture discussion'
    ],
    keyTopics: ['Algorithm optimization (Time/Space Complexity)', 'Event Loop & concurrency', 'Modern React performance', 'Cursor pagination'],
    insiderTip: 'Known for high algorithmic rigor. Practice problem-solving without libraries and be ready to analyze Big-O complexity for every function.'
  },
  {
    name: 'Netsol Technologies',
    location: 'Lahore',
    focusStack: ['MERN', 'Enterprise Fintech', 'Next.js', 'Microservices'],
    interviewProcess: [
      'Technical test (written or Hackerrank)',
      'Technical Panel: Database schema design & API design',
      'HR and cultural interview'
    ],
    keyTopics: ['Financial data integrity (Transactions/Rollback)', 'MongoDB aggregation', 'Error handling middleware', 'CORS security'],
    insiderTip: 'As a financial leasing software giant, Netsol focuses on data integrity, ACID transactions, and robust validation.'
  },
  {
    name: 'pieCyfer',
    location: 'Lahore / Islamabad',
    focusStack: ['MERN', 'Next.js', 'GSAP Animations', 'Full Stack Mobile/Web'],
    interviewProcess: [
      'Hands-on technical assessment with live coding task',
      'Frontend / Full Stack technical deep dive',
      'Final discussion with Engineering Lead'
    ],
    keyTopics: ['GSAP animations & ScrollTrigger', 'Clean React component hierarchy', 'MongoDB query optimization', 'Modern CSS/Tailwind'],
    insiderTip: 'pieCyfer loves developers who combine solid full-stack backend skills with high-polish UI motion and GSAP animation skills.'
  }
];
