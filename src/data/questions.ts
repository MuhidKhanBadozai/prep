import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  // ==========================================
  // JAVASCRIPT FUNDAMENTALS
  // ==========================================
  {
    id: 'js-1',
    number: 1,
    category: 'JavaScript',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'Netsol'],
    question: 'What is the difference between var, let, and const?',
    answer: 'var is function-scoped and hoisted with undefined as initial value. let and const are block-scoped and exist in the Temporal Dead Zone (TDZ) from the start of the block until declared. const cannot be reassigned (though properties of objects/arrays assigned to const can still be mutated).',
    keyPoints: [
      'var: Function scoped, hoisted with undefined initialization, allows redeclaration.',
      'let: Block scoped ({}), hoisted in TDZ, reassignment allowed, no redeclaration in same scope.',
      'const: Block scoped, hoisted in TDZ, cannot be reassigned, must be initialized upon declaration.'
    ],
    codeSnippet: `function scopeDemo() {
  if (true) {
    var a = 1;     // function scoped
    let b = 2;     // block scoped
    const c = 3;   // block scoped, immutable reference
  }
  console.log(a); // 1
  // console.log(b); // ReferenceError: b is not defined
}`,
    quizOptions: [
      { text: 'var is block-scoped, let and const are function-scoped', isCorrect: false },
      { text: 'var is function-scoped and hoisted; let and const are block-scoped with TDZ', isCorrect: true, explanation: 'Correct! var is hoisted as undefined, while let/const reside in TDZ until declared.' },
      { text: 'const prevents any mutation of nested object properties', isCorrect: false },
      { text: 'let and const can be redeclared in the same scope', isCorrect: false }
    ]
  },
  {
    id: 'js-2',
    number: 2,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Devsinc', '10Pearls'],
    question: 'Explain closures with an example.',
    answer: 'A closure is the combination of a function bundled together with references to its surrounding lexical environment. In JavaScript, an inner function retains access to variables declared in its parent outer function even after the outer function has finished executing.',
    keyPoints: [
      'Enables data privacy and encapsulation (private variables).',
      'Powers functional patterns like currying, memoization, and custom event handlers.',
      'Memory consideration: Variables in closure remain in memory as long as the returned function is referenced.'
    ],
    codeSnippet: `function createCounter(initialValue = 0) {
  let count = initialValue; // private variable enclosed
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter(5);
console.log(counter.increment()); // 6
console.log(counter.getCount());  // 6`,
    quizOptions: [
      { text: 'A syntax error when a function is closed inside brackets', isCorrect: false },
      { text: 'A function that retains access to its lexical scope even after the outer function has executed', isCorrect: true, explanation: 'Closures preserve the lexical scope of the parent function execution context.' },
      { text: 'A method to close network sockets in Node.js', isCorrect: false },
      { text: 'An immediately invoked function expression that deletes all outer variables', isCorrect: false }
    ]
  },
  {
    id: 'js-3',
    number: 3,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer', '10Pearls'],
    question: 'What is the event loop in JavaScript and how does it execute microtasks vs macrotasks?',
    answer: 'JavaScript is single-threaded with a non-blocking concurrency model. The Call Stack executes synchronous code. Asynchronous callbacks wait in queues. Microtasks (Promise.then, queueMicrotask, MutationObserver) have higher priority and drain completely before the Event Loop picks up the next macrotask (setTimeout, setInterval, I/O, UI rendering).',
    keyPoints: [
      'Call Stack -> Web APIs / libuv -> Task Queues -> Event Loop checks stack vacancy.',
      'Microtask queue executes immediately after the current call stack empties and before rendering/macrotasks.',
      'Promise.then callbacks run BEFORE setTimeout(fn, 0).'
    ],
    codeSnippet: `console.log('1: Sync');
setTimeout(() => console.log('2: Macrotask (setTimeout)'), 0);
Promise.resolve().then(() => console.log('3: Microtask (Promise)'));
console.log('4: Sync');

// Output order: 1 -> 4 -> 3 -> 2`,
    quizOptions: [
      { text: 'setTimeout(fn, 0) always executes before Promise.then()', isCorrect: false },
      { text: 'Microtasks (Promises) drain completely before the next macrotask (setTimeout) runs', isCorrect: true, explanation: 'Microtask queue has priority over macrotasks like setTimeout or I/O.' },
      { text: 'The event loop runs multiple JavaScript threads simultaneously', isCorrect: false },
      { text: 'Synchronous code waits for all Promises to resolve first', isCorrect: false }
    ]
  },
  {
    id: 'js-4',
    number: 4,
    category: 'JavaScript',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'Systems Limited'],
    question: 'What is the difference between == and ===?',
    answer: '== (loose equality) performs type coercion to convert operands to a common type before comparing. === (strict equality) compares both value and type without coercion. In production and interviews, === is always preferred to avoid unexpected coercion surprises.',
    keyPoints: [
      '0 == false is true, but 0 === false is false.',
      'null == undefined is true, but null === undefined is false.',
      'NaN is never equal to anything, including itself (NaN === NaN is false; use Number.isNaN).'
    ],
    quizOptions: [
      { text: '== compares memory addresses, === compares string representations', isCorrect: false },
      { text: '== performs type coercion before comparison, while === checks both type and value strictly', isCorrect: true },
      { text: '=== is only used in TypeScript, not JavaScript', isCorrect: false },
      { text: 'There is no difference in modern V8 engines', isCorrect: false }
    ]
  },
  {
    id: 'js-5',
    number: 5,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'What are Promises and how do they differ from callbacks?',
    answer: 'A Promise is an object representing the eventual completion or failure of an asynchronous operation and its resulting value. It has 3 states: pending, fulfilled, or rejected. Unlike nested callbacks which cause "callback hell" and inverted error handling, Promises offer chaining (.then/.catch), error propagation, and composability (Promise.all, Promise.race, Promise.allSettled).',
    keyPoints: [
      'Guarantees callbacks are called only once and asynchronously.',
      'Enables clean async/await syntax.',
      'Supports parallel execution via Promise.all([p1, p2]).'
    ],
    quizOptions: [
      { text: 'Promises run synchronous multithreaded operations in browser threads', isCorrect: false },
      { text: 'Promises provide an object with pending/fulfilled/rejected states and chainable error propagation', isCorrect: true },
      { text: 'Callbacks are always faster and preferred over Promises in modern React', isCorrect: false },
      { text: 'A Promise automatically repeats if it fails', isCorrect: false }
    ]
  },
  {
    id: 'js-6',
    number: 6,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['VentureDive', '10Pearls'],
    question: 'Explain async/await and how error handling works with it.',
    answer: 'async/await is syntactic sugar built on top of Promises. An async function always returns a Promise. The await operator pauses execution inside the async function until the awaited Promise settles, allowing asynchronous code to be structured like synchronous code. Errors are handled cleanly with standard try/catch blocks.',
    keyPoints: [
      'await can only be used inside async functions (or top-level in ES Modules).',
      'Uncaught rejections in async functions reject the returned promise.',
      'Use try/catch/finally for robust error and cleanup handling.'
    ],
    codeSnippet: `async function fetchUserData(userId) {
  try {
    const res = await fetch('/api/user/' + userId);
    if (!res.ok) throw new Error('Network error: ' + res.status);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed fetching user:', err.message);
    throw err;
  }
}`,
    quizOptions: [
      { text: 'async/await blocks the entire browser tab while waiting', isCorrect: false },
      { text: 'Syntactic sugar over Promises that allows synchronous-looking flow with try/catch error handling', isCorrect: true },
      { text: 'async functions return undefined unless given a callback', isCorrect: false },
      { text: 'await cannot be used with native Promises', isCorrect: false }
    ]
  },
  {
    id: 'js-7',
    number: 7,
    category: 'JavaScript',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Netsol'],
    question: 'What is the difference between null and undefined in JavaScript?',
    answer: 'undefined means a variable has been declared but not yet assigned a value, or a function without a return statement. null is an intentional assignment value representing the intentional absence of any object value. typeof undefined is "undefined", whereas typeof null is "object" (a historic JS quirk).',
    keyPoints: [
      'undefined: System default uninitialized state.',
      'null: Explicitly assigned by developer to indicate "no value".',
      'null == undefined is true, but null === undefined is false.'
    ],
    quizOptions: [
      { text: 'Both have typeof "null"', isCorrect: false },
      { text: 'undefined is unassigned by default, while null is an intentional assignment of empty value', isCorrect: true },
      { text: 'null is a primitive, but undefined is a constructor object', isCorrect: false },
      { text: 'undefined can only be used in strict mode', isCorrect: false }
    ]
  },
  {
    id: 'js-8',
    number: 8,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Contour Software'],
    question: 'What is Hoisting and the Temporal Dead Zone (TDZ)?',
    answer: 'Hoisting is JavaScript mechanism where variable and function declarations are moved to the top of their containing scope during compilation. var declarations are hoisted and initialized to undefined. let and const declarations are hoisted into the scope but NOT initialized; accessing them before declaration throws a ReferenceError — this gap is the Temporal Dead Zone (TDZ). Function declarations are hoisted fully with their bodies.',
    keyPoints: [
      'Function declarations can be invoked before definition in the code.',
      'Function expressions (const f = () => {}) obey variable hoisting rules.',
      'TDZ prevents silent usage of variables before their initialization.'
    ],
    quizOptions: [
      { text: 'All variables in JavaScript are initialized to null at the start', isCorrect: false },
      { text: 'TDZ is the phase between entering scope and declaration where let/const throw ReferenceError if accessed', isCorrect: true },
      { text: 'Hoisting only happens when running in strict mode', isCorrect: false },
      { text: 'Functions defined with const are hoisted with their complete implementation', isCorrect: false }
    ]
  },
  {
    id: 'js-9',
    number: 9,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Devsinc'],
    question: 'Explain how the "this" keyword works in JavaScript.',
    answer: '"this" refers to the context in which a function is invoked. In standard functions, "this" is determined by how it was called: standalone call (global or undefined in strict mode), method invocation (the calling object), constructor call (the newly created instance), or explicitly set via call/apply/bind. Arrow functions do not have their own "this"; they retain the "this" of their lexical enclosing scope.',
    keyPoints: [
      'Arrow functions have lexical "this" and cannot be used as constructors.',
      'bind() returns a new function with bound context; call/apply execute immediately.',
      'In React class components, handlers had to be bound; functional components avoid this problem.'
    ],
    quizOptions: [
      { text: 'Arrow functions bind "this" dynamically to the DOM element that fired the event', isCorrect: false },
      { text: 'Standard functions determine "this" at call-time, while arrow functions inherit "this" lexically', isCorrect: true },
      { text: '"this" always points to the window object in all functions', isCorrect: false },
      { text: 'call() and apply() accept parameters in identical formats', isCorrect: false }
    ]
  },
  {
    id: 'js-10',
    number: 10,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'What is the difference between Deep Copy and Shallow Copy?',
    answer: 'A shallow copy copies only top-level properties; nested objects or arrays retain reference pointers to the original memory locations. Mutating a nested property in the copy also alters the original. A deep copy recursively duplicates every nested level so no references are shared. Modern browsers provide native structuredClone() for deep copies.',
    keyPoints: [
      'Shallow copy methods: Object.assign({}, obj), {...obj}, slice().',
      'Deep copy methods: structuredClone(obj), JSON.parse(JSON.stringify(obj)) [drops functions/undefined/Dates], or Lodash cloneDeep.',
      'Immutability in React state requires copying objects when updating nested state.'
    ],
    quizOptions: [
      { text: 'Object.assign creates a deep copy recursively', isCorrect: false },
      { text: 'Shallow copy duplicates top-level primitives but shares nested object references; deep copy clones all levels', isCorrect: true },
      { text: 'structuredClone is deprecated in modern ECMAScript', isCorrect: false },
      { text: 'JSON.stringify handles circular references and functions correctly', isCorrect: false }
    ]
  },
  {
    id: 'js-11',
    number: 11,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Folio3', 'Devsinc', 'Techlogix'],
    question: 'What is Debouncing vs Throttling? Give real-world examples.',
    answer: 'Debouncing delays function execution until a specified delay has passed since the last trigger event. If the event fires again before the delay expires, the timer restarts (e.g., search autocomplete typing). Throttling enforces a maximum frequency of execution, ensuring the function runs at most once per fixed time interval (e.g., window scroll or resize tracking).',
    keyPoints: [
      'Debounce: "Wait until user stops doing X for 300ms before acting" (Search input, auto-save).',
      'Throttle: "Execute at most once every 100ms while user does X" (Infinite scroll, game controls).'
    ],
    codeSnippet: `// Debounce implementation
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}`,
    quizOptions: [
      { text: 'Debouncing executes every 100ms continuously, throttling executes only at the very end', isCorrect: false },
      { text: 'Debouncing waits until activity pauses; throttling limits execution rate to fixed intervals', isCorrect: true },
      { text: 'Both require Web Workers in modern browsers', isCorrect: false },
      { text: 'Throttling cancels previous calls permanently', isCorrect: false }
    ]
  },

  // ==========================================
  // REACT.JS (25 Questions)
  // ==========================================
  {
    id: 'react-1',
    number: 12,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'pieCyfer'],
    question: 'Explain the difference between functional and class components in React.',
    answer: 'Functional components are JavaScript functions that accept props and return JSX. They use React Hooks (useState, useEffect, etc.) for state and lifecycle management. Class components are ES6 classes extending React.Component using this.state and lifecycle methods (componentDidMount, etc.). Functional components are the industry standard due to cleaner syntax, easier composition, and performance optimizations.',
    keyPoints: [
      'Functional components avoid "this" binding issues.',
      'Hooks allow code reuse across functional components.',
      'Class components are still required for Error Boundaries in standard React.'
    ],
    quizOptions: [
      { text: 'Class components cannot have state in React 19', isCorrect: false },
      { text: 'Functional components use hooks for state/lifecycle and avoid "this" binding complexities', isCorrect: true },
      { text: 'Functional components re-render slower than class components', isCorrect: false },
      { text: 'Hooks work identically inside class component methods', isCorrect: false }
    ]
  },
  {
    id: 'react-2',
    number: 13,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Arbisoft', 'Netsol'],
    question: 'How does the Virtual DOM and Reconciliation work in React?',
    answer: 'React keeps a lightweight virtual representation of the real DOM in memory. When state or props change, React constructs a new Virtual DOM tree and compares it with the previous snapshot using a heuristic O(n) diffing algorithm called Reconciliation. It computes the minimal set of real DOM mutations (batched) and applies them efficiently.',
    keyPoints: [
      'Diffing assumptions: Two elements of different types produce different trees.',
      'Keys help React identify which items in collections have changed, added, or removed.',
      'React Fiber enables asynchronous, interruptible rendering for smooth 60fps UI.'
    ],
    quizOptions: [
      { text: 'React updates the entire HTML document whenever any state changes', isCorrect: false },
      { text: 'React diffs virtual DOM snapshots in memory and applies minimal batched changes to the real DOM', isCorrect: true },
      { text: 'Virtual DOM is a browser-native API in Chromium', isCorrect: false },
      { text: 'Reconciliation has O(n³) algorithmic complexity in React 18', isCorrect: false }
    ]
  },
  {
    id: 'react-3',
    number: 14,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Systems Limited'],
    question: 'What are React Hooks and how does the useEffect dependency array work?',
    answer: 'Hooks let you use state and lifecycle features in functional components without writing classes. useEffect manages side-effects (data fetching, subscriptions, DOM mutation). Its dependency array controls when it runs: no array runs after every render, [] runs once on mount, and [dep1, dep2] runs on mount and whenever listed dependencies change. The return function acts as cleanup.',
    keyPoints: [
      'Rules of Hooks: Call at top level only, only call inside React functions.',
      'Cleanup function runs before the effect re-runs and during component unmount.',
      'Avoid omitting dependencies or mutating primitives directly.'
    ],
    codeSnippet: `useEffect(() => {
  const handler = () => console.log('Resized');
  window.addEventListener('resize', handler);
  // Cleanup on unmount or before re-running
  return () => window.removeEventListener('resize', handler);
}, []); // Empty array = mount/unmount only`,
    quizOptions: [
      { text: 'An empty dependency array [] causes the effect to run on every state change', isCorrect: false },
      { text: 'useEffect runs side effects; [] runs once on mount, [deps] runs when dependencies change, and return cleans up', isCorrect: true },
      { text: 'useEffect replaces both useMemo and useState in React 19', isCorrect: false },
      { text: 'Hooks can be called conditionally inside if statements', isCorrect: false }
    ]
  },
  {
    id: 'react-4',
    number: 15,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'VentureDive'],
    question: 'What is the difference between useState and useRef?',
    answer: 'useState stores data that impacts the UI; updating it triggers a component re-render. useRef stores a mutable container (.current) that persists across renders WITHOUT triggering a re-render when mutated. useRef is used for accessing DOM elements or storing values like timers, interval IDs, and previous state.',
    keyPoints: [
      'useState: Triggers re-render, asynchronous updates.',
      'useRef: Synchronous mutation, zero re-renders, persists throughout lifecycle.',
      'Use useRef for imperative DOM APIs, animation targets (GSAP), and mutable cache.'
    ],
    quizOptions: [
      { text: 'useRef causes re-renders faster than useState', isCorrect: false },
      { text: 'useState updates trigger re-renders, while useRef mutations persist without triggering re-renders', isCorrect: true },
      { text: 'useRef can only store HTML input elements', isCorrect: false },
      { text: 'useState variables reset to initial state on every re-render', isCorrect: false }
    ]
  },
  {
    id: 'react-5',
    number: 16,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'pieCyfer', 'Devsinc'],
    question: 'What is the difference between useMemo and useCallback?',
    answer: 'useMemo memoizes the computed RESULT of a function, recalculating only when dependencies change. useCallback memoizes the FUNCTION DEFINITION itself to ensure stable function reference across renders. useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).',
    keyPoints: [
      'useMemo: Cache expensive calculations (e.g. filtering large datasets).',
      'useCallback: Prevent unnecessary re-renders of child components wrapped in React.memo that receive functions as props.',
      'Avoid premature optimization: both hooks carry overhead.'
    ],
    codeSnippet: `// Memoizing computed value
const sortedList = useMemo(() => expensiveSort(items), [items]);

// Memoizing callback reference for child component
const handleClick = useCallback((id) => {
  doSomething(id);
}, []);`,
    quizOptions: [
      { text: 'useMemo caches DOM elements, useCallback caches server requests', isCorrect: false },
      { text: 'useMemo caches computed values, useCallback caches function references to prevent child re-renders', isCorrect: true },
      { text: 'useCallback executes the function immediately and returns its value', isCorrect: false },
      { text: 'Both hooks re-evaluate on every single render regardless of dependencies', isCorrect: false }
    ]
  },
  {
    id: 'react-6',
    number: 17,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'Systems Limited'],
    question: 'What are controlled vs uncontrolled components in React?',
    answer: 'Controlled components have their form data controlled by React state via value and onChange handlers (single source of truth). Uncontrolled components maintain their own internal state within the DOM and are queried imperatively using React refs when needed (e.g., form submit).',
    keyPoints: [
      'Controlled: Ideal for real-time validation, dynamic disabling, formatting.',
      'Uncontrolled: Faster for simple forms or file inputs (<input type="file" /> is always uncontrolled).'
    ],
    quizOptions: [
      { text: 'Controlled components store input data inside local storage', isCorrect: false },
      { text: 'Controlled components have state managed by React, uncontrolled rely on internal DOM state via refs', isCorrect: true },
      { text: 'Uncontrolled components cannot have submit buttons', isCorrect: false },
      { text: 'Controlled components do not support onChange events', isCorrect: false }
    ]
  },
  {
    id: 'react-7',
    number: 18,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Folio3'],
    question: 'How do you handle global state in modern React applications?',
    answer: 'Common patterns: 1) Context API + useReducer for moderate complexity (theme, user auth, UI modals). 2) Redux Toolkit (RTK) for large enterprise applications requiring strict predictability, time-travel debugging, and middleware. 3) Zustand for simple, fast, boilerplate-free state. 4) TanStack Query (React Query) / SWR for server state (caching, revalidation, optimistic updates).',
    keyPoints: [
      'Separate UI state from Server state (use TanStack Query for server data).',
      'Context API causes re-renders in all consuming components when value changes unless split into smaller contexts.',
      'Zustand allows component-level selective subscriptions.'
    ],
    quizOptions: [
      { text: 'Redux is required for every single React application', isCorrect: false },
      { text: 'Context API/Zustand for client state, TanStack Query/SWR for server state, RTK for complex enterprise needs', isCorrect: true },
      { text: 'Global state must always be saved directly in cookies', isCorrect: false },
      { text: 'Context API never causes re-renders in consumer components', isCorrect: false }
    ]
  },
  {
    id: 'react-8',
    number: 19,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Contour Software', 'Systems Limited'],
    question: 'What is "Lifting State Up" in React?',
    answer: 'Lifting state up is the practice of moving shared state to the closest common ancestor of the components that need it. The ancestor component holds the state as the single source of truth and passes it down via props, receiving updates via callback functions.',
    keyPoints: [
      'Avoids duplicated state across siblings.',
      'Ensures consistent UI synchronization.',
      'If components are deeply nested, consider Context or a state library to prevent prop drilling.'
    ],
    quizOptions: [
      { text: 'Moving state to the window object', isCorrect: false },
      { text: 'Moving state to the closest common ancestor to share data across sibling components', isCorrect: true },
      { text: 'Converting functional components into class components', isCorrect: false },
      { text: 'Upgrading React from version 17 to 19', isCorrect: false }
    ]
  },
  {
    id: 'react-9',
    number: 20,
    category: 'React',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Arbisoft', '10Pearls'],
    question: 'How does React handle rendering performance and how do you optimize it?',
    answer: 'Optimizations include: React.memo to skip re-renders when props are unchanged, useMemo for heavy calculations, useCallback for stable handler references, code splitting with React.lazy and Suspense, windowing/virtualization (react-window) for 1000+ item lists, key prop stability, and avoiding inline object/function instantiations in render loops.',
    keyPoints: [
      'Identify bottlenecks first using React Profiler before optimizing.',
      'Virtualize huge DOM trees to only render visible viewport items.',
      'Use transitions (useTransition, startTransition) for non-urgent UI updates.'
    ],
    quizOptions: [
      { text: 'Wrap every single component in useMemo and useCallback unconditionally', isCorrect: false },
      { text: 'Use React.memo, virtualization, React.lazy code-splitting, and memoized callbacks where needed', isCorrect: true },
      { text: 'Avoid using functional components in production builds', isCorrect: false },
      { text: 'Disable React reconciliation engine', isCorrect: false }
    ]
  },
  {
    id: 'react-10',
    number: 21,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'pieCyfer'],
    question: 'What are Keys in React lists and why is using index as key discouraged?',
    answer: 'Keys provide unique stable identifiers for elements in a list, helping React diffing algorithm recognize which items are added, moved, or deleted. Using the array index as key causes subtle bugs when items are reordered, filtered, or inserted at the beginning, causing React to mismatch component state to the wrong DOM nodes.',
    keyPoints: [
      'Always use unique IDs from your data (e.g., item.id).',
      'Index is acceptable only if the list is completely static, never sorted, filtered, or mutated.'
    ],
    quizOptions: [
      { text: 'Keys are sent to backend servers on form submit', isCorrect: false },
      { text: 'Keys help React track element identity during reconciliation; using array indices causes state/render bugs on list mutations', isCorrect: true },
      { text: 'Keys must be consecutive numbers starting from 0', isCorrect: false },
      { text: 'Using index as key is strictly forbidden by the compiler', isCorrect: false }
    ]
  },
  {
    id: 'react-11',
    number: 22,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Netsol'],
    question: 'What is Prop Drilling and how do you avoid it?',
    answer: 'Prop drilling is the process of passing props down through multiple layers of intermediate components that have no use for the data other than forwarding it to deeply nested children. It makes components tightly coupled and hard to refactor. It is avoided using the Context API, Component Composition (passing children), or state management stores.',
    keyPoints: [
      'Component composition: <Parent><DeepChild data={data} /></Parent> often solves prop drilling without extra libraries.',
      'Context API provides tree-wide availability for truly global properties (user, theme).'
    ],
    quizOptions: [
      { text: 'Injecting props directly into the DOM via document.getElementById', isCorrect: false },
      { text: 'Passing props through intermediate layers that do not need them; resolved with Context or Composition', isCorrect: true },
      { text: 'A tool for drilling holes in computer hardware', isCorrect: false },
      { text: 'Mutating props directly in children components', isCorrect: false }
    ]
  },
  {
    id: 'react-12',
    number: 23,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'VentureDive'],
    question: 'What are React Portals and when should you use them?',
    answer: 'ReactDOM.createPortal(children, container) allows you to render children into a different DOM node outside the parent component DOM hierarchy while preserving standard React event bubbling. It is essential for overlays, modals, dropdowns, and tooltips that need to escape CSS overflow: hidden or z-index stacking context restrictions.',
    keyPoints: [
      'Events bubble up through the React virtual tree, not the physical DOM tree.',
      'Prevents styling conflicts with parent z-index and overflow.',
      'Accessibility: manage keyboard focus trapping inside portals.'
    ],
    codeSnippet: `import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body // Or dedicated #modal-root element
  );
}`,
    quizOptions: [
      { text: 'A way to route between different domains in Next.js', isCorrect: false },
      { text: 'A method to render elements into a DOM node outside the parent tree for modals/tooltips', isCorrect: true },
      { text: 'A tool for WebSockets in React 19', isCorrect: false },
      { text: 'An alternative to HTML iframe tags', isCorrect: false }
    ]
  },
  {
    id: 'react-13',
    number: 24,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Devsinc'],
    question: 'What are Error Boundaries in React?',
    answer: 'Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree during rendering, in lifecycle methods, and in constructors, logging the error and displaying a fallback UI instead of crashing the entire application. They are implemented using static getDerivedStateFromError() and componentDidCatch().',
    keyPoints: [
      'Error Boundaries do NOT catch errors in event handlers, async code (setTimeout/fetch), or server-side rendering.',
      'Wrap distinct layout sections with error boundaries to isolate failures (e.g. sidebar failure doesn’t kill main feed).'
    ],
    quizOptions: [
      { text: 'Error boundaries catch errors in event handlers like onClick', isCorrect: false },
      { text: 'Components that catch render-phase errors in children and render a fallback UI', isCorrect: true },
      { text: 'A try/catch wrapper around every JSX element generated by Vite', isCorrect: false },
      { text: 'Available as a functional hook called useErrorBoundary() in core React', isCorrect: false }
    ]
  },
  {
    id: 'react-14',
    number: 25,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Techlogix', 'Systems Limited'],
    question: 'What is React Suspense and how does it work with code splitting?',
    answer: 'React Suspense lets components show a fallback UI (like a skeleton loader or spinner) while waiting for an asynchronous operation to complete. Paired with React.lazy(), it enables component-level code splitting, downloading component bundles only when they are rendered on screen.',
    keyPoints: [
      'Syntax: <Suspense fallback={<LoadingSpinner />}><LazyComponent /></Suspense>.',
      'In React 18/19, Suspense also coordinates streaming SSR and data fetching libraries.'
    ],
    quizOptions: [
      { text: 'Suspense pauses all CPU threads until an API response arrives', isCorrect: false },
      { text: 'Suspense renders fallback UI while asynchronous components or data streams resolve', isCorrect: true },
      { text: 'Suspense can only be used on server-side Next.js apps', isCorrect: false },
      { text: 'Suspense replaces try/catch for catching syntax errors', isCorrect: false }
    ]
  },

  // ==========================================
  // NEXT.JS (15 Questions)
  // ==========================================
  {
    id: 'next-1',
    number: 26,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', '10Pearls', 'Systems Limited'],
    question: 'What is Next.js and how does it differ from plain React (CRA/Vite)?',
    answer: 'React is a client-side UI library. Next.js is a full-stack production framework built on React. It provides hybrid rendering (SSR, SSG, ISR, RSC), file-based routing, server-side API routes, image/font optimizations, zero-config bundling, and SEO capabilities out of the box.',
    keyPoints: [
      'CRA/Vite: Client-Side Rendering (empty index.html, JS renders in browser, poor SEO for crawlers).',
      'Next.js: Pre-rendered HTML on server -> fast First Contentful Paint (FCP) and optimal SEO.',
      'Includes built-in routing, API routes, middleware, and image optimization.'
    ],
    quizOptions: [
      { text: 'Next.js is a replacement for TypeScript', isCorrect: false },
      { text: 'Next.js is a full-stack React framework providing SSR/SSG, file routing, and SEO optimization', isCorrect: true },
      { text: 'Plain React can render server components without any framework', isCorrect: false },
      { text: 'Next.js does not support Tailwind CSS', isCorrect: false }
    ]
  },
  {
    id: 'next-2',
    number: 27,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft', 'VentureDive'],
    question: 'Explain the difference between SSR, SSG, ISR, and CSR in Next.js.',
    answer: 'CSR (Client-Side Rendering) renders in browser. SSG (Static Site Generation) builds HTML at build time (fastest, ideal for blogs). SSR (Server-Side Rendering) generates HTML on each incoming request (ideal for authenticated dashboards with dynamic data). ISR (Incremental Static Regeneration) updates static pages in the background after deployment without rebuilding the entire site.',
    keyPoints: [
      'SSG: export async function generateStaticParams() / getStaticProps.',
      'SSR: Dynamic Server Components / getServerSideProps (request-time).',
      'ISR: Revalidates cached static pages after a defined revalidate interval.',
      'CSR: Traditional React with "use client" and useEffect.'
    ],
    quizOptions: [
      { text: 'SSR generates static HTML only once during npm run build', isCorrect: false },
      { text: 'SSG builds at compile-time, SSR renders per-request, ISR updates static pages incrementally, CSR renders in browser', isCorrect: true },
      { text: 'ISR requires rebuilding and redeploying the entire application for every change', isCorrect: false },
      { text: 'CSR has better SEO than SSR because Googlebot executes JavaScript', isCorrect: false }
    ]
  },
  {
    id: 'next-3',
    number: 28,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'What is the App Router vs Pages Router in Next.js?',
    answer: 'App Router (introduced in Next.js 13+, app/ folder) is based on React Server Components, supports nested layouts (layout.tsx), streaming (loading.tsx), error handling (error.tsx), and Server Actions. Pages Router (pages/ folder) is the legacy system using getStaticProps/getServerSideProps with client-rendered components by default.',
    keyPoints: [
      'App Router: Components are Server Components by default; use "use client" for client interactivity.',
      'Nested layouts persist state and avoid re-rendering layout wrappers on route changes.',
      'Colocated route files: page.tsx, layout.tsx, loading.tsx, error.tsx, route.ts.'
    ],
    quizOptions: [
      { text: 'Pages Router uses React Server Components by default', isCorrect: false },
      { text: 'App Router is based on Server Components and nested layouts; Pages Router uses legacy file routing', isCorrect: true },
      { text: 'App Router cannot use CSS modules or Tailwind', isCorrect: false },
      { text: 'Pages Router is deprecated and completely removed from Next.js 15', isCorrect: false }
    ]
  },
  {
    id: 'next-4',
    number: 29,
    category: 'Next.js',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'What are React Server Components (RSC) vs Client Components?',
    answer: 'Server Components run strictly on the server, have direct access to backend resources (databases, filesystem, internal microservices), and do NOT add any JavaScript to the client bundle. Client Components (declared with "use client" at top of file) execute on both server (for initial pre-rendering) and browser, and can use state, effects, and browser event listeners.',
    keyPoints: [
      'RSC: Cannot use useState, useEffect, window, or onClick.',
      'Client components: Needed for user interactivity, inputs, animations, hooks.',
      'Pass Server Components as children to Client Components to keep bundle size small.'
    ],
    quizOptions: [
      { text: 'Client components never execute on the server during initial page load', isCorrect: false },
      { text: 'Server components execute only on server with zero client JS bundle size; client components handle user interactions', isCorrect: true },
      { text: 'Server components can use useState and useEffect if marked async', isCorrect: false },
      { text: '"use client" must be placed at the bottom of the component file', isCorrect: false }
    ]
  },
  {
    id: 'next-5',
    number: 30,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Netsol'],
    question: 'What are Route Handlers (API routes) in Next.js App Router?',
    answer: 'Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs. Created in route.ts files inside the app directory, they export async functions for HTTP methods (GET, POST, PUT, DELETE, PATCH). They run server-side and are ideal for webhook handlers, authentication callbacks, or proxying requests.',
    keyPoints: [
      'Export functions: export async function GET(request: Request) { ... }',
      'Cannot coexist with page.tsx at the same route level.',
      'Support streaming responses and NextRequest utilities.'
    ],
    codeSnippet: `// app/api/items/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const items = await db.item.findMany();
  return NextResponse.json({ success: true, data: items });
}

export async function POST(req: Request) {
  const body = await req.json();
  const newItem = await db.item.create({ data: body });
  return NextResponse.json(newItem, { status: 201 });
}`,
    quizOptions: [
      { text: 'Route handlers can only return HTML strings', isCorrect: false },
      { text: 'Server-side endpoints defined in route.ts files handling HTTP verbs (GET, POST, etc.)', isCorrect: true },
      { text: 'Route handlers run inside client web workers', isCorrect: false },
      { text: 'Route handlers require installing Express inside Next.js', isCorrect: false }
    ]
  },
  {
    id: 'next-6',
    number: 31,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Folio3', 'Systems Limited'],
    question: 'How does next/image improve performance compared to regular <img> tags?',
    answer: 'next/image automatically optimizes images: 1) Resizes and converts images to modern formats like WebP and AVIF. 2) Prevents Cumulative Layout Shift (CLS) automatically by enforcing width/height or fill aspect ratio. 3) Lazy loads images as they enter the viewport. 4) Serves responsive srcsets tailored to the user device screen size.',
    keyPoints: [
      'Eliminates layout shifts (improving Google Core Web Vitals).',
      'On-demand optimization preserves build speed.',
      'Supports blur-up placeholders while loading.'
    ],
    quizOptions: [
      { text: 'It converts PNG files into vector SVG files', isCorrect: false },
      { text: 'It automatically provides modern formats (WebP/AVIF), lazy loading, responsive sizing, and prevents CLS', isCorrect: true },
      { text: 'It can only load images stored on Amazon S3', isCorrect: false },
      { text: 'It removes image quality to reduce size to under 10KB', isCorrect: false }
    ]
  },
  {
    id: 'next-7',
    number: 32,
    category: 'Next.js',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Devsinc', '10Pearls'],
    question: 'What causes Hydration Mismatch errors in Next.js and how do you fix them?',
    answer: 'Hydration mismatch occurs when the HTML generated on the server does not match the initial DOM tree rendered by React in the client browser during hydration. Common triggers: using window or localStorage during render, Date.now() or Math.random(), or invalid HTML markup (e.g. <p> containing <div>). Fix by moving client-only logic into useEffect or using dynamic imports with ssr: false.',
    keyPoints: [
      'Guard with mounted state: const [isMounted, setIsMounted] = useState(false); useEffect(() => setIsMounted(true), []);',
      'Or suppressHydrationWarning for specific elements where difference is intentional.',
      'Ensure valid HTML nesting.'
    ],
    quizOptions: [
      { text: 'Hydration mismatch only occurs when server runs out of RAM', isCorrect: false },
      { text: 'Occurs when pre-rendered server HTML differs from initial client render (e.g., using browser APIs during render)', isCorrect: true },
      { text: 'Can only be solved by switching to Create React App', isCorrect: false },
      { text: 'Caused by using Tailwind CSS classes on buttons', isCorrect: false }
    ]
  },
  {
    id: 'next-8',
    number: 33,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'VentureDive'],
    question: 'What is Next.js Middleware and what are its common use cases?',
    answer: 'Next.js Middleware (middleware.ts at project root) runs before a request is completed. It executes at the edge runtime, allowing you to intercept incoming requests, inspect headers and cookies, rewrite paths, redirect unauthorized users, or inject custom response headers before the page or API route executes.',
    keyPoints: [
      'Common uses: Route protection (checking auth JWT tokens), bot detection, A/B testing, internationalization (i18n).',
      'Runs on lightweight Edge runtime (limited Node.js built-ins).',
      'Uses config matcher to specify target paths.'
    ],
    quizOptions: [
      { text: 'Middleware is used for running React state hooks in background tabs', isCorrect: false },
      { text: 'Edge code that runs before requests complete, used for auth redirects, rewrites, and header validation', isCorrect: true },
      { text: 'Middleware is executed only on the client browser after HTML loads', isCorrect: false },
      { text: 'Middleware is used to compile TypeScript into JavaScript', isCorrect: false }
    ]
  },

  // ==========================================
  // NODE.JS (15 Questions)
  // ==========================================
  {
    id: 'node-1',
    number: 34,
    category: 'Node.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'pieCyfer'],
    question: 'What is Node.js and why is it popular for scalable backend systems?',
    answer: 'Node.js is an open-source, cross-platform JavaScript runtime environment built on Google Chrome V8 engine. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for data-intensive real-time applications (chat, streaming, APIs). It allows full-stack developers to use a single programming language (JavaScript/TypeScript) across both client and server.',
    keyPoints: [
      'V8 compiles JavaScript directly into native machine code.',
      'Libuv provides cross-platform asynchronous I/O and thread pool.',
      'Single-threaded event loop handles concurrent connections with low memory overhead.'
    ],
    quizOptions: [
      { text: 'Node.js is a frontend JavaScript framework like Angular', isCorrect: false },
      { text: 'An event-driven, non-blocking asynchronous JavaScript runtime powered by V8 engine for high concurrency', isCorrect: true },
      { text: 'Node.js creates a separate OS thread for each incoming HTTP request', isCorrect: false },
      { text: 'Node.js runs inside Apache Tomcat server by default', isCorrect: false }
    ]
  },
  {
    id: 'node-2',
    number: 35,
    category: 'Node.js',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Arbisoft', '10Pearls'],
    question: 'Explain the phases of the Node.js Event Loop.',
    answer: 'The Node.js event loop has 6 distinct phases that run in a continuous cycle: 1) Timers (executes setTimeout and setInterval callbacks). 2) Pending callbacks (executes I/O callbacks deferred to the next loop iteration). 3) Idle, prepare (internal use). 4) Poll (retrieves new I/O events, executes I/O callbacks). 5) Check (executes setImmediate callbacks). 6) Close callbacks (e.g. socket.on("close")).',
    keyPoints: [
      'Between each phase, microtasks (process.nextTick() followed by Promise callbacks) drain immediately.',
      'libuv thread pool (default 4 threads) handles blocking I/O: file system, dns.lookup, crypto.',
      'Understanding phases helps diagnose ordering bugs and event-loop lag.'
    ],
    quizOptions: [
      { text: 'The event loop has only one phase called "Render"', isCorrect: false },
      { text: 'Six phases: Timers -> Pending -> Idle -> Poll -> Check (setImmediate) -> Close callbacks', isCorrect: true },
      { text: 'setImmediate always fires before setTimeout(fn, 0) in all phases', isCorrect: false },
      { text: 'Microtasks only run once every 10 seconds', isCorrect: false }
    ]
  },
  {
    id: 'node-3',
    number: 36,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'What is the difference between process.nextTick() and setImmediate()?',
    answer: 'process.nextTick() is not technically part of the event loop phases; it executes immediately after the current operation finishes and BEFORE the event loop proceeds to the next phase (highest priority microtask). setImmediate() is queued in the "Check" phase of the event loop and executes after poll phase I/O events.',
    keyPoints: [
      'Recursive process.nextTick() will starve the event loop and prevent any I/O from running.',
      'Use setImmediate() when you want to yield execution to allow I/O to run.',
      'Order: sync code -> process.nextTick -> Promise microtasks -> setImmediate.'
    ],
    quizOptions: [
      { text: 'setImmediate executes before any other code in the process', isCorrect: false },
      { text: 'process.nextTick executes before the event loop advances to the next phase; setImmediate runs in Check phase', isCorrect: true },
      { text: 'Both are identical aliases introduced in Node 18', isCorrect: false },
      { text: 'process.nextTick cannot pass arguments to its callback', isCorrect: false }
    ]
  },
  {
    id: 'node-4',
    number: 37,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Netsol', '10Pearls'],
    question: 'How does Node.js handle CPU-intensive tasks without blocking the Event Loop?',
    answer: 'Because the JavaScript execution thread is single-threaded, CPU-heavy tasks (image processing, video transcoding, large encryption, heavy data calculations) will block the event loop from servicing other requests. Solutions: 1) worker_threads module to run CPU work in parallel threads. 2) child_process (fork/spawn/exec). 3) Offloading heavy jobs to asynchronous background queues (BullMQ, Redis, RabbitMQ) processed by separate worker services.',
    keyPoints: [
      'worker_threads share memory via ArrayBuffer/SharedArrayBuffer.',
      'child_process creates completely separate OS processes with IPC.',
      'Never run sync crypto (crypto.pbkdf2Sync) or heavy regex on the main thread.'
    ],
    quizOptions: [
      { text: 'Node.js automatically multithreads all for-loops across 8 cores', isCorrect: false },
      { text: 'Use worker_threads, child_process, or background message queue worker services', isCorrect: true },
      { text: 'CPU tasks never block the event loop in V8', isCorrect: false },
      { text: 'Increase process.env.MEMORY to 100GB to auto-parallelize', isCorrect: false }
    ]
  },
  {
    id: 'node-5',
    number: 38,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Folio3'],
    question: 'What are Streams in Node.js and what are the 4 stream types?',
    answer: 'Streams are collections of data that might not be available all at once and don’t have to fit in memory. They allow reading and writing data piece by piece (chunks), achieving massive memory efficiency. The 4 types are: 1) Readable (e.g. fs.createReadStream, req). 2) Writable (e.g. fs.createWriteStream, res). 3) Duplex (both readable & writable, e.g. net.Socket). 4) Transform (duplex stream that modifies data as it reads, e.g. zlib.createGzip).',
    keyPoints: [
      'pipe() and pipeline() handle backpressure automatically.',
      'Essential for processing gigabyte-sized files or video streaming without RAM spikes.'
    ],
    codeSnippet: `const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');

// Compress large file with low RAM usage
pipeline(
  fs.createReadStream('input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('input.txt.gz'),
  (err) => {
    if (err) console.error('Pipeline failed:', err);
    else console.log('Compression finished.');
  }
);`,
    quizOptions: [
      { text: 'Streams load the entire file into RAM before returning a Promise', isCorrect: false },
      { text: 'Chunk-based data processing with 4 types: Readable, Writable, Duplex, Transform', isCorrect: true },
      { text: 'Streams were replaced by async/await in Node 14', isCorrect: false },
      { text: 'Streams can only be used with WebSocket connections', isCorrect: false }
    ]
  },
  {
    id: 'node-6',
    number: 39,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Systems Limited'],
    question: 'What is Clustering in Node.js and PM2 process management?',
    answer: 'Since a single Node.js instance runs on a single CPU core, Clustering allows you to fork multiple worker processes that share the same server port, taking full advantage of multi-core servers. In production, process managers like PM2 or container orchestrators (Docker + Kubernetes) manage clusters, auto-restart on crashes, and perform zero-downtime rolling reloads.',
    keyPoints: [
      'cluster module uses master/worker architecture.',
      'PM2 command: pm2 start server.js -i max (launches workers = number of CPU cores).',
      'Stateless architecture required (sessions stored in Redis, not in-memory process globals).'
    ],
    quizOptions: [
      { text: 'Clustering merges multiple database clusters into one collection', isCorrect: false },
      { text: 'Spawning multiple worker processes sharing a server port to utilize all CPU cores', isCorrect: true },
      { text: 'PM2 is an alternative to MongoDB', isCorrect: false },
      { text: 'Clustering eliminates the need for HTTP headers', isCorrect: false }
    ]
  },
  {
    id: 'node-7',
    number: 40,
    category: 'Node.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'pieCyfer'],
    question: 'What is the difference between CommonJS and ES Modules in Node.js?',
    answer: 'CommonJS (CJS) uses require() and module.exports; it loads modules synchronously at runtime and is the traditional Node.js format. ES Modules (ESM) uses import and export statements; it is statically analyzed at compile time, supports tree-shaking, and is the modern JavaScript standard. Node.js supports ESM via "type": "module" in package.json or .mjs extensions.',
    keyPoints: [
      'CJS: require() can be placed dynamically inside if statements.',
      'ESM: import statements must be top-level (except dynamic import()).',
      'ESM does not have __dirname or __filename by default (derive via import.meta.url).'
    ],
    quizOptions: [
      { text: 'CommonJS is used in browsers, ES Modules only in Node.js', isCorrect: false },
      { text: 'CommonJS uses require() synchronously; ES Modules use import/export with static analysis and tree-shaking', isCorrect: true },
      { text: 'ES Modules cannot be used in Node.js version 20+', isCorrect: false },
      { text: 'require() is asynchronous and returns a Promise', isCorrect: false }
    ]
  },

  // ==========================================
  // EXPRESS.JS (10 Questions)
  // ==========================================
  {
    id: 'exp-1',
    number: 41,
    category: 'Express.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', 'Systems Limited', 'Netsol'],
    question: 'What is Express.js and how does the Middleware pattern work?',
    answer: 'Express.js is a minimal, unopinionated web framework for Node.js. Middleware functions have access to the request object (req), response object (res), and the next middleware function in the application’s request-response cycle (next). Middleware can execute arbitrary code, modify req and res, terminate the request, or call next() to pass control to subsequent handlers.',
    keyPoints: [
      'Types: Application-level (app.use), Router-level (router.use), Error-handling (4 params), Built-in (express.json), Third-party (cors, helmet).',
      'Order of registration matters: middleware executes sequentially in the order registered.',
      'If neither res.send/json is called nor next(), the request hangs indefinitely.'
    ],
    codeSnippet: `const express = require('express');
const app = express();

// Middleware: log request
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Pass to next middleware
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});`,
    quizOptions: [
      { text: 'Middleware is only used for rendering React HTML', isCorrect: false },
      { text: 'Functions with access to req, res, and next() executing sequentially in the request-response cycle', isCorrect: true },
      { text: 'next() must always be called with a database connection', isCorrect: false },
      { text: 'Express automatically detects database errors without middleware', isCorrect: false }
    ]
  },
  {
    id: 'exp-2',
    number: 42,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'pieCyfer'],
    question: 'How do you implement centralized error handling in Express?',
    answer: 'Error-handling middleware is defined with four arguments: (err, req, res, next). Express recognizes it as an error handler because of its 4-parameter signature. It must be placed at the very end of the middleware stack, after all routes. When an error is passed to next(err) or thrown in an async handler, Express skips regular routes and invokes this error middleware.',
    keyPoints: [
      'Signature: (err, req, res, next) — all 4 arguments are mandatory.',
      'In Express 4, async errors must be caught and passed to next(err) or wrapped in express-async-handler (in Express 5, unhandled promise rejections are handled natively).',
      'Sanitize error messages in production: do not leak stack traces to clients.'
    ],
    codeSnippet: `// Centralized Error Middleware (placed LAST)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.stack);
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});`,
    quizOptions: [
      { text: 'Express error middleware requires only two arguments: (req, res)', isCorrect: false },
      { text: 'Special middleware with 4 arguments (err, req, res, next) placed at the bottom of the middleware stack', isCorrect: true },
      { text: 'Error handlers must be declared before any route handlers', isCorrect: false },
      { text: 'Express automatically returns status 200 on all errors', isCorrect: false }
    ]
  },
  {
    id: 'exp-3',
    number: 43,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'What is CORS and how do you configure it securely in Express?',
    answer: 'CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web applications from making requests to a different domain/port than the one serving the frontend. The server configures CORS using response headers (Access-Control-Allow-Origin, etc.). In Express, the cors package is used. In production, whitelist specific frontend domains instead of wildcard (*).',
    keyPoints: [
      'Browsers send preflight OPTIONS requests for non-simple requests.',
      'Allow credentials: true is required for passing cookies across origins.',
      'Never use origin: "*" with credentials: true.'
    ],
    codeSnippet: `const cors = require('cors');

const corsOptions = {
  origin: ['https://myapp.com', 'https://admin.myapp.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));`,
    quizOptions: [
      { text: 'CORS is a backend-only firewall tool that blocks IP addresses', isCorrect: false },
      { text: 'Browser security header configuration allowing cross-origin requests from specified frontend domains', isCorrect: true },
      { text: 'cors middleware can only be used on Windows servers', isCorrect: false },
      { text: 'Setting origin: "*" allows safe transmission of httpOnly cookies', isCorrect: false }
    ]
  },
  {
    id: 'exp-4',
    number: 44,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', '10Pearls'],
    question: 'How do you secure an Express app for production?',
    answer: 'Essential production security practices: 1) helmet middleware to set secure HTTP headers (HSTS, CSP, XSS protection). 2) express-rate-limit to prevent brute-force and DDoS. 3) express-mongo-sanitize and hpp to prevent NoSQL injection and parameter pollution. 4) Data validation with Zod or Joi. 5) Password hashing with bcrypt (cost factor >= 10). 6) Disable x-powered-by header. 7) Use HTTPS and secure httpOnly SameSite cookies.',
    keyPoints: [
      'Use helmet() early in the middleware stack.',
      'Rate limit auth endpoints (/api/auth/login, /api/auth/forgot-password).',
      'Never store plain text secrets or passwords.'
    ],
    quizOptions: [
      { text: 'Store user passwords as base64 in MongoDB for easy recovery', isCorrect: false },
      { text: 'Apply helmet, rate-limiting, input sanitization/validation, bcrypt hashing, and secure cookies', isCorrect: true },
      { text: 'Production security only requires keeping console.log enabled', isCorrect: false },
      { text: 'Helmet is only needed for desktop applications', isCorrect: false }
    ]
  },
  {
    id: 'exp-5',
    number: 45,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'VentureDive'],
    question: 'How do you handle File Uploads in Express using Multer?',
    answer: 'Express cannot parse multipart/form-data by default. Multer is middleware designed for handling multipart form data. It can store files in memory (memoryStorage for streaming directly to AWS S3/Cloudinary) or on disk (diskStorage). You can specify file size limits and file filter functions to validate MIME types and extensions.',
    keyPoints: [
      'upload.single("avatar") for single file, upload.array("photos", 5) for multiple.',
      'Validate file types (e.g. only image/jpeg, image/png) and size limits (e.g. 5MB).',
      'Never trust the user-provided original filename without sanitization.'
    ],
    quizOptions: [
      { text: 'express.json() parses file uploads automatically without extra libraries', isCorrect: false },
      { text: 'Multer middleware parses multipart/form-data with disk/memory storage and file filtering', isCorrect: true },
      { text: 'Files should always be stored in the Git repository', isCorrect: false },
      { text: 'Multer converts all uploaded files into JSON strings', isCorrect: false }
    ]
  },

  // ==========================================
  // MONGODB & MONGOOSE (20 Questions)
  // ==========================================
  {
    id: 'mongo-1',
    number: 46,
    category: 'MongoDB',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'pieCyfer'],
    question: 'What is MongoDB and how is it different from SQL relational databases?',
    answer: 'MongoDB is a NoSQL, document-oriented database that stores records as flexible JSON-like documents (BSON). Unlike SQL databases that use fixed table schemas, foreign key constraints, and normalized relations, MongoDB collections have no enforced schema by default, allowing hierarchical nested structures (arrays, embedded sub-documents) and horizontal scaling via sharding.',
    keyPoints: [
      'SQL: Tables, rows, columns, strict schema, ACID by default, vertical scaling, relational JOINs.',
      'MongoDB: Collections, BSON documents, dynamic schema, horizontal scaling (sharding), embedded data.',
      'Ideal for rapidly evolving requirements, hierarchical content, and high write throughput.'
    ],
    quizOptions: [
      { text: 'MongoDB stores data in relational tables with foreign key triggers', isCorrect: false },
      { text: 'NoSQL document database storing BSON records with dynamic schemas and horizontal scalability', isCorrect: true },
      { text: 'MongoDB cannot run on Linux servers', isCorrect: false },
      { text: 'SQL databases cannot perform indexing', isCorrect: false }
    ]
  },
  {
    id: 'mongo-2',
    number: 47,
    category: 'MongoDB',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', '10Pearls'],
    question: 'What is BSON and what are its advantages over plain JSON?',
    answer: 'BSON stands for Binary JSON. It is the binary serialization format MongoDB uses to store documents and make remote procedure calls. BSON extends JSON with additional data types (ObjectId, Date, 64-bit integers, raw Binary data) and includes field length prefixes that enable fast scanning and traversal without parsing the full document string.',
    keyPoints: [
      'Maximum document size in MongoDB is 16MB.',
      'Includes types not present in JSON: Date, ObjectId, Int32, Int64, Decimal128, Binary.',
      'Enables high serialization/deserialization speed.'
    ],
    quizOptions: [
      { text: 'BSON stands for Browser Storage Object Notation', isCorrect: false },
      { text: 'A binary serialization of JSON with extra data types (Date, ObjectId) and faster traversal', isCorrect: true },
      { text: 'BSON documents have an unlimited file size capacity', isCorrect: false },
      { text: 'BSON requires converting all numbers to strings', isCorrect: false }
    ]
  },
  {
    id: 'mongo-3',
    number: 48,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft', 'Systems Limited'],
    question: 'What are Indexes in MongoDB and what is a Covered Query?',
    answer: 'Indexes are specialized data structures (B-trees) that store a small portion of the collection’s dataset in an ordered form to optimize query performance. Without indexes, MongoDB must execute a full collection scan (COLLSCAN). A Covered Query is a query where all queried filter fields AND all returned projection fields are part of the same index; MongoDB satisfies the query entirely from index memory without inspecting any document on disk.',
    keyPoints: [
      'Types: Single field, compound index, multikey (array), text, geospatial, TTL (auto-expiry).',
      'explain("executionStats") reveals if an index was used (IXSCAN vs COLLSCAN).',
      'Trade-off: Indexes accelerate reads but add overhead to insert/update/delete writes.'
    ],
    quizOptions: [
      { text: 'A covered query is a query wrapped in a try/catch block', isCorrect: false },
      { text: 'A query where both filters and projection are fully contained in the index, requiring zero document disk reads', isCorrect: true },
      { text: 'Indexes should be added to every single field without exception', isCorrect: false },
      { text: 'MongoDB does not support compound indexes', isCorrect: false }
    ]
  },
  {
    id: 'mongo-4',
    number: 49,
    category: 'MongoDB',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited', 'Devsinc'],
    question: 'Explain the MongoDB Aggregation Pipeline and the $lookup stage.',
    answer: 'The Aggregation Pipeline is a multi-stage framework for data processing and transformations. Documents enter a multi-stage pipeline where each stage ($match, $group, $project, $sort, $unwind, $lookup) processes data and passes the output to the next stage. $lookup performs an equality left outer join with another collection in the same database, bringing related documents as an array field.',
    keyPoints: [
      '$match should be placed as early as possible to filter documents before heavy processing.',
      '$lookup: equivalent to SQL LEFT OUTER JOIN.',
      '$unwind deconstructs an array field from input documents to output a document for each array element.'
    ],
    codeSnippet: `// Example: Join orders with user details and calculate total
db.orders.aggregate([
  { $match: { status: 'completed' } },
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'customer'
    }
  },
  { $unwind: '$customer' },
  {
    $group: {
      _id: '$customer.email',
      totalSpent: { $sum: '$amount' },
      orderCount: { $sum: 1 }
    }
  }
]);`,
    quizOptions: [
      { text: '$lookup deletes documents that do not match the join criteria', isCorrect: false },
      { text: 'A sequential data processing pipeline; $lookup performs left outer joins between collections', isCorrect: true },
      { text: '$group must always be the first stage in any aggregation pipeline', isCorrect: false },
      { text: 'Aggregation cannot perform math or sum operations', isCorrect: false }
    ]
  },
  {
    id: 'mongo-5',
    number: 50,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Devsinc'],
    question: 'When should you Embed documents vs Reference them (Schema Design)?',
    answer: 'Embed when: 1) Data is accessed together frequently (1-to-1 or 1-to-few, e.g. user address, line items in an invoice). 2) Sub-data rarely changes independently. 3) High read performance is required. Reference when: 1) 1-to-many or many-to-many relationships (e.g. students & courses). 2) Sub-documents change frequently. 3) Document size risks exceeding the 16MB BSON limit.',
    keyPoints: [
      'Rule of thumb: "Data that is queried together should be stored together."',
      'Avoid deep nested arrays that grow unbounded (anti-pattern: infinite activity log in user doc).',
      'Referencing uses ObjectId and Mongoose .populate().'
    ],
    quizOptions: [
      { text: 'Always embed everything because MongoDB cannot link collections', isCorrect: false },
      { text: 'Embed for 1-to-few and co-queried data; reference for 1-to-many, frequently mutated, or unbounded growth', isCorrect: true },
      { text: 'Referencing is only supported in MySQL, not MongoDB', isCorrect: false },
      { text: 'Embedding documents reduces document size to 0 bytes', isCorrect: false }
    ]
  },
  {
    id: 'mongo-6',
    number: 51,
    category: 'MongoDB',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Systems Limited', '10Pearls'],
    question: 'What is the difference between Replica Sets and Sharding in MongoDB?',
    answer: 'A Replica Set provides High Availability and Redundancy. It consists of multiple nodes (primary + secondaries) replicating identical data; if primary fails, automatic election promotes a secondary. Sharding provides Horizontal Scalability for massive datasets. It partitions data across multiple server shards using a shard key, distributing storage and query throughput.',
    keyPoints: [
      'Replica Set: Same data on all nodes, fault tolerance, zero downtime failover.',
      'Sharding: Different subsets of data across different machines, scales storage and writes.',
      'Production clusters shard across replica sets.'
    ],
    quizOptions: [
      { text: 'Replica sets distribute data chunks across servers, sharding provides backups', isCorrect: false },
      { text: 'Replica Sets provide high availability/failover; Sharding provides horizontal data partitioning across machines', isCorrect: true },
      { text: 'Sharding can only be configured with a single machine', isCorrect: false },
      { text: 'Replica Sets require at least 50 servers to function', isCorrect: false }
    ]
  },
  {
    id: 'mongo-7',
    number: 52,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Netsol'],
    question: 'What is the structure of an ObjectId in MongoDB?',
    answer: 'An ObjectId is a 12-byte unique BSON identifier consisting of: 1) A 4-byte timestamp value representing the document’s creation time in seconds since the Unix epoch. 2) A 5-byte random value unique to the machine and process. 3) A 3-byte incrementing counter, initialized to a random value.',
    keyPoints: [
      'ObjectIds are naturally chronologically sorted by creation time.',
      'You can extract document creation date directly using doc._id.getTimestamp().',
      '12 bytes serialized, represented as a 24-character hexadecimal string.'
    ],
    quizOptions: [
      { text: 'ObjectId is a random UUID string generated by the client browser', isCorrect: false },
      { text: '12-byte BSON type: 4-byte timestamp + 5-byte random value + 3-byte incrementing counter', isCorrect: true },
      { text: 'ObjectId resets to 0 every time the database restarts', isCorrect: false },
      { text: 'ObjectId requires manual sequential number generation in code', isCorrect: false }
    ]
  },
  {
    id: 'mongo-8',
    number: 53,
    category: 'MongoDB',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'How do ACID Transactions work in MongoDB?',
    answer: 'Since MongoDB 4.0 (for replica sets) and 4.2 (for sharded clusters), multi-document ACID transactions are fully supported. They allow developers to execute multiple read/write operations across multiple collections inside a session. If any operation fails, the transaction is aborted and rolled back, ensuring atomicity and data integrity.',
    keyPoints: [
      'Use session = await mongoose.startSession() and session.startTransaction().',
      'Commit via session.commitTransaction(); rollback via session.abortTransaction().',
      'Pass { session } option to all Mongoose queries within the transaction block.'
    ],
    codeSnippet: `const session = await mongoose.startSession();
session.startTransaction();
try {
  await Account.updateOne({ _id: fromId }, { $inc: { balance: -amount } }, { session });
  await Account.updateOne({ _id: toId }, { $inc: { balance: amount } }, { session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}`,
    quizOptions: [
      { text: 'MongoDB does not support transactions in any version', isCorrect: false },
      { text: 'Multi-document ACID transactions use sessions with startTransaction, commit, and abort rollback', isCorrect: true },
      { text: 'Transactions in MongoDB commit automatically after 1 millisecond without sessions', isCorrect: false },
      { text: 'Transactions only work on standalone un-replicated instances', isCorrect: false }
    ]
  },

  // ==========================================
  // GSAP (10 Questions)
  // ==========================================
  {
    id: 'gsap-1',
    number: 54,
    category: 'GSAP',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', 'Folio3', 'Arbisoft'],
    question: 'What is GSAP and why use it over standard CSS animations?',
    answer: 'GSAP (GreenSock Animation Platform) is a robust JavaScript animation library. Advantages over CSS: 1) Timeline sequencing (coordinate complex multi-step sequences with precise delays and overlaps). 2) Advanced easing and physics. 3) ScrollTrigger plugin for scroll-driven animations. 4) Cross-browser consistency and SVG normalization. 5) Ability to pause, reverse, seek, and dynamically recalculate animations.',
    keyPoints: [
      'CSS animations become unmaintainable for complex sequences with multiple dependencies.',
      'GSAP offers programmatic runtime control (play, pause, reverse, timeScale).',
      'Optimized ticker engine delivers smooth 60fps performance.'
    ],
    quizOptions: [
      { text: 'GSAP is only for generating 3D video game assets', isCorrect: false },
      { text: 'High-performance animation library with timeline sequencing, ScrollTrigger, and runtime playback control', isCorrect: true },
      { text: 'CSS animations have better programmatic runtime control than GSAP', isCorrect: false },
      { text: 'GSAP requires jQuery to run', isCorrect: false }
    ]
  },
  {
    id: 'gsap-2',
    number: 55,
    category: 'GSAP',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'What is the difference between gsap.to(), gsap.from(), and gsap.fromTo()?',
    answer: 'gsap.to(target, { vars }) animates properties FROM their current values TO the specified target values. gsap.from(target, { vars }) animates properties FROM the specified values TO their current natural values (ideal for entrance animations). gsap.fromTo(target, { fromVars }, { toVars }) explicitly specifies both the initial start and end values.',
    keyPoints: [
      'gsap.from() is great for page load entrance reveals (e.g. from y: 50, opacity: 0).',
      'gsap.fromTo() guarantees start and end state even if re-triggered during an active tween.'
    ],
    quizOptions: [
      { text: 'gsap.from() deletes the target element upon completion', isCorrect: false },
      { text: 'gsap.to animates from current to target; gsap.from animates from target to current; gsap.fromTo specifies both', isCorrect: true },
      { text: 'gsap.fromTo can only animate colors', isCorrect: false },
      { text: 'All three functions have identical behavior', isCorrect: false }
    ]
  },
  {
    id: 'gsap-3',
    number: 56,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Arbisoft'],
    question: 'What is a GSAP Timeline and why is it superior to chained delays?',
    answer: 'A GSAP Timeline (gsap.timeline()) is a container that holds multiple tweens, choreographing their timing relative to each other. Instead of calculating and adjusting manual delays for every single animation step (which breaks whenever one duration changes), a timeline automatically sequences tweens. It supports position parameters ("<", "+=0.2", "label") to overlap or sync animations easily.',
    keyPoints: [
      'Control the entire sequence with tl.play(), tl.pause(), tl.reverse(), tl.restart().',
      'Position parameter "<" starts a tween at the same time as the previous tween.',
      'Nested timelines allow modular animation architecture.'
    ],
    codeSnippet: `const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.out' } });

tl.from('.hero-title', { y: 30, opacity: 0 })
  .from('.hero-subtitle', { y: 20, opacity: 0 }, '-=0.3') // 0.3s overlap
  .from('.hero-cta', { scale: 0.8, opacity: 0 }, '<');   // sync with subtitle`,
    quizOptions: [
      { text: 'Timelines only work in video editing software', isCorrect: false },
      { text: 'A sequencing container that coordinates tweens with relative positioning and unified playback control', isCorrect: true },
      { text: 'Timelines require using setTimeout between each tween', isCorrect: false },
      { text: 'A timeline can only hold a single animation', isCorrect: false }
    ]
  },
  {
    id: 'gsap-4',
    number: 57,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Folio3'],
    question: 'What is ScrollTrigger in GSAP and how do you configure "scrub" and "pin"?',
    answer: 'ScrollTrigger is GSAP’s plugin that links animations to the scrollbar position. trigger defines the reference element; start and end define the scroll thresholds. scrub: true (or a smoothing number like scrub: 1) links the animation progress directly to the scrollbar position so scrolling forward/backward plays/reverses the animation. pin: true fixes the trigger element in place during the scroll distance.',
    keyPoints: [
      'pin: true locks elements for sticky presentation slides or product walk-throughs.',
      'scrub: 1 adds smooth momentum damping to scroll movement.',
      'Always call ScrollTrigger.refresh() after DOM or image dimensions change.'
    ],
    quizOptions: [
      { text: 'ScrollTrigger replaces the browser scrollbar with a custom Canvas widget', isCorrect: false },
      { text: 'Plugin tying animations to scroll position; scrub links animation to scroll progress, pin locks element in place', isCorrect: true },
      { text: 'scrub: true causes the webpage to scroll automatically to the bottom', isCorrect: false },
      { text: 'ScrollTrigger cannot be used on mobile touch devices', isCorrect: false }
    ]
  },
  {
    id: 'gsap-5',
    number: 58,
    category: 'GSAP',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Arbisoft', 'Systems Limited', 'Devsinc'],
    question: 'How do you safely use GSAP with React (Lifecycle, Refs, gsap.context)?',
    answer: 'In React, DOM nodes are managed by React. To use GSAP safely: 1) Use useRef to target DOM elements. 2) Create animations inside useLayoutEffect or useEffect. 3) Wrap animations inside gsap.context() scoped to a container ref. 4) Return ctx.revert() in the effect cleanup function to properly kill tweens, clear inline styles, and remove ScrollTriggers upon component unmount or re-render.',
    keyPoints: [
      'gsap.context() scopes selector queries (.card only selects within the ref).',
      'Failure to revert leads to memory leaks, duplicate animations on StrictMode mounts, and zombie ScrollTriggers.',
      'useGSAP hook from @gsap/react handles context cleanup automatically.'
    ],
    codeSnippet: `import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export function AnimatedBox() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Scope all selector text inside containerRef
    const ctx = gsap.context(() => {
      gsap.from('.box', { y: 40, opacity: 0, stagger: 0.1 });
    }, containerRef);

    // Clean up all animations and ScrollTriggers on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="box">Item 1</div>
      <div className="box">Item 2</div>
    </div>
  );
}`,
    quizOptions: [
      { text: 'Directly modify document.body without any refs or cleanup', isCorrect: false },
      { text: 'Use refs, run in useLayoutEffect/useEffect, wrap in gsap.context(), and revert() in cleanup', isCorrect: true },
      { text: 'GSAP should only be placed in global window.onload scripts', isCorrect: false },
      { text: 'React StrictMode automatically fixes GSAP memory leaks', isCorrect: false }
    ]
  },
  {
    id: 'gsap-6',
    number: 59,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', '10Pearls'],
    question: 'Which CSS properties should you animate with GSAP for optimal 60fps performance?',
    answer: 'Always prioritize GPU-accelerated transform properties (x, y, scale, rotation, skew) and opacity. These properties are handled by the browser compositor thread and avoid triggering expensive layout recalculations (reflow) or repaints. Avoid animating layout properties like width, height, top, left, or margin.',
    keyPoints: [
      'Transform: x: 100 instead of left: 100px.',
      'Scale: scale: 1.2 instead of width/height.',
      'Use will-change: transform sparingly on performance-critical moving elements.'
    ],
    quizOptions: [
      { text: 'Always animate top, left, width, and margin for highest precision', isCorrect: false },
      { text: 'Animate GPU-accelerated transforms (x, y, scale, rotation) and opacity to prevent layout reflow', isCorrect: true },
      { text: 'GSAP cannot animate transform properties', isCorrect: false },
      { text: 'border-radius animation runs faster than transforms', isCorrect: false }
    ]
  },

  // ==========================================
  // SYSTEM DESIGN & FULL STACK INTEGRATION
  // ==========================================
  {
    id: 'sys-1',
    number: 60,
    category: 'System Design',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'Arbisoft', '10Pearls'],
    question: 'How would you architect a full-stack Invoice Management SaaS system (MERN/Next.js)?',
    answer: 'Architecture breakdown: 1) Frontend: Next.js App Router for responsive dashboard, server components for initial invoice lists, client components for dynamic invoice creation/calculation. 2) Backend API: Express or Next.js Route Handlers with JWT authentication, role-based access control (Admin, Accountant, Client). 3) Database: MongoDB with indexed schemas for Invoices, Clients, and Users; compound index on { companyId: 1, status: 1, dueDate: 1 }. 4) Background Worker: BullMQ queue for email reminders and automated PDF generation. 5) Payments: Stripe webhook integration for auto-marking invoices as paid.',
    keyPoints: [
      'Server-side cursor pagination for invoice lists.',
      'Optimistic updates on invoice status with rollback.',
      'Audit log collection for tracking invoice creation, payment, and deletion.'
    ],
    quizOptions: [
      { text: 'Store all invoices in a single JSON text file on the server root', isCorrect: false },
      { text: 'Next.js frontend, modular REST/Route API, indexed MongoDB collections, queue for background jobs, and webhook handlers', isCorrect: true },
      { text: 'Never use database indexes in SaaS applications', isCorrect: false },
      { text: 'Use client-side localStorage as the primary database for financial records', isCorrect: false }
    ]
  },
  {
    id: 'sys-2',
    number: 61,
    category: 'System Design',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'VentureDive', 'Systems Limited'],
    question: 'What is JWT (JSON Web Token) authentication and how does the access/refresh token pattern work?',
    answer: 'JWT is a compact, URL-safe token comprising 3 parts: Header (algorithm), Payload (claims/user data), and Signature (signed with secret key). In production: 1) Access Token has a short lifespan (15 mins) and is sent in the Authorization: Bearer header. 2) Refresh Token has a longer lifespan (7-30 days), is stored securely in an httpOnly SameSite cookie, and is used to request new access tokens when expired without forcing the user to log in again.',
    keyPoints: [
      'Never store sensitive data (passwords, credit cards) in the JWT payload (it is only base64 encoded, not encrypted).',
      'Store refresh tokens in a database whitelist to enable token revocation on logout or breach.',
      'httpOnly cookies prevent JavaScript XSS theft.'
    ],
    quizOptions: [
      { text: 'JWT tokens are encrypted and cannot be read without a private key', isCorrect: false },
      { text: 'Three-part token (Header.Payload.Signature); short-lived access token + secure httpOnly refresh token', isCorrect: true },
      { text: 'JWT tokens must be stored in window.globalVariable', isCorrect: false },
      { text: 'Access tokens should remain valid forever without expiration', isCorrect: false }
    ]
  },
  {
    id: 'sys-3',
    number: 62,
    category: 'System Design',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft', 'Techlogix'],
    question: 'How do you paginate large datasets (Offset/Skip vs Cursor-Based Pagination)?',
    answer: 'Offset-based pagination uses skip(page * limit).limit(limit). While simple, it has two major flaws: 1) Performance degrades on deep pages (O(N) cost because the database must scan and discard thousands of rows). 2) Missing or duplicate items when records are inserted or deleted while a user navigates. Cursor-based pagination uses a unique sequential index pointer (e.g. _id or timestamp) with a filter like { _id: { $lt: lastSeenId } }.limit(limit); it delivers constant O(1) performance and stable pages.',
    keyPoints: [
      'Use Offset pagination for simple admin tables with few pages.',
      'Use Cursor pagination for infinite scroll, high-volume feeds, or millions of records.',
      'Always ensure the cursor field is indexed.'
    ],
    quizOptions: [
      { text: 'skip() has O(1) instant performance on 10 million rows', isCorrect: false },
      { text: 'Cursor pagination uses indexed pointers (e.g. _id) for constant O(1) performance; skip/offset degrades on deep pages', isCorrect: true },
      { text: 'Pagination should always be done on the client after fetching all 100,000 records', isCorrect: false },
      { text: 'Cursor pagination does not support limit filters', isCorrect: false }
    ]
  },
  {
    id: 'sys-4',
    number: 63,
    category: 'System Design',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer'],
    question: 'REST vs GraphQL: When would you pick one for an outsourcing or SaaS project?',
    answer: 'REST exposes fixed resource endpoints (e.g., /api/users, /api/orders). It is simple, widely understood, leverages native HTTP caching, and is the default choice for most outsourcing projects. GraphQL exposes a single endpoint where clients declare the exact fields they need, eliminating over-fetching and under-fetching. Pick GraphQL for complex mobile apps or applications with heavily nested, diverse UI views; pick REST for standard CRUD, rapid delivery, and simple third-party integrations.',
    keyPoints: [
      'REST: Easy CDN caching, straightforward team onboarding, predictable endpoints.',
      'GraphQL: Solves N+1 roundtrips on complex pages, flexible client queries, but adds schema/resolver complexity.'
    ],
    quizOptions: [
      { text: 'GraphQL requires replacing MongoDB with a graph database like Neo4j', isCorrect: false },
      { text: 'REST provides standardized endpoints with native HTTP caching; GraphQL lets clients query exact data shapes to avoid over-fetching', isCorrect: true },
      { text: 'REST endpoints cannot return JSON in modern architectures', isCorrect: false },
      { text: 'GraphQL eliminates all backend database queries', isCorrect: false }
    ]
  },

  // ==========================================
  // GENERAL & CS / PAKISTANI TECH MARKET
  // ==========================================
  {
    id: 'gen-1',
    number: 64,
    category: 'General & CS',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Netsol', 'pieCyfer'],
    question: 'What are the Four Pillars of Object-Oriented Programming (OOP)?',
    answer: 'The four pillars of OOP are: 1) Encapsulation (bundling data and methods into a single unit/class, restricting direct access to internal state). 2) Abstraction (hiding implementation details and exposing only essential interfaces). 3) Inheritance (enabling a child class to inherit properties and methods from a parent class for code reusability). 4) Polymorphism (allowing entities to take different forms, e.g. method overriding and overloading).',
    keyPoints: [
      'Encapsulation: private fields (#name), getter/setter methods.',
      'Abstraction: Abstract classes, interfaces.',
      'Polymorphism: Subclasses provide specialized implementations of base methods.'
    ],
    quizOptions: [
      { text: 'HTML, CSS, JavaScript, and TypeScript', isCorrect: false },
      { text: 'Encapsulation, Abstraction, Inheritance, and Polymorphism', isCorrect: true },
      { text: 'GET, POST, PUT, and DELETE', isCorrect: false },
      { text: 'Model, View, Controller, and Middleware', isCorrect: false }
    ]
  },
  {
    id: 'gen-2',
    number: 65,
    category: 'General & CS',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Contour Software'],
    question: 'What is the difference between Method Overloading and Method Overriding?',
    answer: 'Method Overloading occurs when multiple methods in the SAME class share the same name but have different parameter signatures (types, count, or order). It is resolved at compile-time. Method Overriding occurs when a subclass provides its own specific implementation of a method that is already defined in its superclass. It is resolved at runtime (dynamic dispatch).',
    keyPoints: [
      'Overloading: Compile-time polymorphism (same class, different arguments).',
      'Overriding: Runtime polymorphism (subclass replaces parent method using identical signature).',
      'In JavaScript, true method overloading is simulated via default parameters or checking argument types.'
    ],
    quizOptions: [
      { text: 'Overloading happens across subclasses, overriding is in the same class', isCorrect: false },
      { text: 'Overloading: same name, different parameters in same class; Overriding: subclass redefines parent method with same signature', isCorrect: true },
      { text: 'Both require the static keyword', isCorrect: false },
      { text: 'Overriding deletes the method from the parent class permanently', isCorrect: false }
    ]
  },
  {
    id: 'gen-3',
    number: 66,
    category: 'General & CS',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'pieCyfer'],
    question: 'What is the difference between a Stack and a Queue data structure?',
    answer: 'A Stack is a LIFO (Last In, First Out) data structure; the last element added is the first one removed (push and pop, like a stack of plates). A Queue is a FIFO (First In, First Out) data structure; the first element added is the first one removed (enqueue and dequeue, like a line of people waiting at a counter).',
    keyPoints: [
      'Stack applications: Function call stack, undo/redo mechanisms, syntax bracket matching.',
      'Queue applications: CPU task scheduling, print job queues, event queues, breadth-first search (BFS).'
    ],
    quizOptions: [
      { text: 'Stack is FIFO, Queue is LIFO', isCorrect: false },
      { text: 'Stack is LIFO (Last In, First Out); Queue is FIFO (First In, First Out)', isCorrect: true },
      { text: 'Both remove elements randomly', isCorrect: false },
      { text: 'Queues can only store numbers', isCorrect: false }
    ]
  },
  {
    id: 'gen-4',
    number: 67,
    category: 'General & CS',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft', 'Systems Limited', '10Pearls'],
    question: 'What is the STAR Method for answering behavioral and technical scenario questions?',
    answer: 'The STAR method is a structured technique used to answer behavioral and project challenge interview questions: 1) Situation: Set the scene and context (project, company, timeline). 2) Task: Describe your specific responsibility or the challenge faced. 3) Action: Explain the exact steps YOU took, technologies chosen, and trade-offs made. 4) Result: Highlight the quantifiable outcome (e.g. reduced load time by 40%, zero downtime migration).',
    keyPoints: [
      'Focus on "I" rather than vague "we" when explaining actions.',
      'Quantify results with numbers, percentages, or positive client feedback.',
      'Heavily tested in Pakistani companies serving US/UK international clients.'
    ],
    quizOptions: [
      { text: 'A database query syntax in PostgreSQL', isCorrect: false },
      { text: 'Interview answer framework: Situation, Task, Action, and Result', isCorrect: true },
      { text: 'A tool for measuring CPU usage in Node.js', isCorrect: false },
      { text: 'A CSS flexbox alignment property', isCorrect: false }
    ]
  },
  {
    id: 'gen-5',
    number: 68,
    category: 'General & CS',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', 'Systems Limited', 'Folio3'],
    question: 'What is the standard Git workflow expected in software houses (Devsinc, Systems Limited, Netsol)?',
    answer: 'Standard Git Feature Branch workflow: 1) Pull latest changes from main/develop. 2) Create a dedicated branch (feature/invoice-pdf or bugfix/login-cors). 3) Commit small, atomic changes with clear, descriptive commit messages (Conventional Commits: feat, fix, chore). 4) Push branch and open a Pull Request (PR). 5) Undergo code review, resolve feedback, ensure CI tests pass, and merge (often squash & merge).',
    keyPoints: [
      'Never commit directly to main/master.',
      'Rebase or merge develop regularly to prevent merge conflicts.',
      'Use .gitignore to exclude node_modules, .env, and build artifacts.'
    ],
    quizOptions: [
      { text: 'Every developer pushes directly to main branch without reviews', isCorrect: false },
      { text: 'Branching workflow: feature branches, atomic commits, pull requests, peer code reviews, and CI testing', isCorrect: true },
      { text: 'Git requires deleting the repository after every sprint', isCorrect: false },
      { text: 'node_modules should always be committed to git', isCorrect: false }
    ]
  }
];
