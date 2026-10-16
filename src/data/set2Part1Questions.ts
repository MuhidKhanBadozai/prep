import { Question } from '../types';

export const SET2_PART1_QUESTIONS: Question[] = [
  // ==============================================================
  // 1. JAVASCRIPT FUNDAMENTALS (12 QUESTIONS: #111 - #122)
  // ==============================================================
  {
    id: 's2-q1',
    number: 111,
    category: 'JavaScript',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'Netsol'],
    question: 'Difference between var, let, and const',
    answer: 'Scope: var is function-scoped; let/const are block-scoped ({ }). Hoisting: var is hoisted and initialized with undefined; let/const are hoisted but remain uninitialized in the "Temporal Dead Zone" (TDZ) until execution reaches their declaration. Reassignment: var and let can be reassigned; const cannot be reassigned once bound (though object properties or array elements can still be mutated). Redeclaration: var allows redeclaration in the same scope; let/const throw SyntaxError.',
    keyPoints: [
      'var: function scoped, hoisted with undefined, allows redeclaration.',
      'let: block scoped, TDZ, allows reassignment, prohibits redeclaration.',
      'const: block scoped, TDZ, non-reassignable binding (does not freeze internal object mutation).'
    ],
    codeSnippet: `function example() {
  console.log(a); // undefined (hoisted)
  // console.log(b); // ReferenceError: Cannot access 'b' before initialization (TDZ)
  var a = 1;
  let b = 2;
  const c = { name: 'MERN' };
  c.name = 'Next.js'; // Allowed: property mutation
  // c = {}; // TypeError: Assignment to constant variable
}`,
    quizOptions: [
      { text: 'var is block-scoped, while let and const are function-scoped', isCorrect: false },
      { text: 'var is function-scoped and hoisted with undefined; let/const are block-scoped with TDZ; const cannot be reassigned', isCorrect: true },
      { text: 'const makes nested objects completely frozen and immutable', isCorrect: false },
      { text: 'let and const can be re-declared within the same scope', isCorrect: false }
    ]
  },
  {
    id: 's2-q2',
    number: 112,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', '10Pearls', 'pieCyfer'],
    question: 'Closures with an example',
    answer: 'A closure is the combination of a function bundled together with references to its lexical environment. An inner function retains access to variables declared in its outer enclosing function even after the outer function has finished executing and returned. Common use cases: data privacy (private variables), function factories, currying, and memoization.',
    keyPoints: [
      'Inner function closes over outer lexical scope variables.',
      'Retains variables in heap memory across repeated invocations.',
      'Enables data encapsulation without relying on ES6 class private syntax.'
    ],
    codeSnippet: `function makeCounter() {
  let count = 0; // Private variable encapsulated in closure
  return {
    increment() { return ++count; },
    get() { return count; }
  };
}
const counter = makeCounter();
console.log(counter.increment()); // 1
console.log(counter.get());       // 1`,
    quizOptions: [
      { text: 'A syntax construct for closing database connections', isCorrect: false },
      { text: 'An inner function retaining access to variables in its outer lexical scope after the outer function has returned', isCorrect: true },
      { text: 'A method for terminating recursive loops', isCorrect: false },
      { text: 'A tool for bundling JavaScript files into single script tags', isCorrect: false }
    ]
  },
  {
    id: 's2-q3',
    number: 113,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'Event loop in JavaScript (Call stack, Web APIs, Task/Callback Queue, Microtask Queue)',
    answer: 'Call stack executes synchronous code (LIFO). Web APIs handle async operations (DOM, setTimeout, fetch) off the main thread. Microtask queue holds Promise callbacks (.then, .catch) and MutationObserver; it has higher priority and drains completely before the next task. Task/Macrotask queue holds setTimeout, setInterval, and I/O callbacks. The Event Loop continually monitors the call stack: when empty, it drains all microtasks first, then executes one macrotask, and repeats.',
    keyPoints: [
      'Call Stack -> Web APIs -> Microtask Queue (Promises) -> Task Queue (setTimeout).',
      'Microtasks have strict priority and drain completely between macrotasks.',
      'Prevents UI freeze while enabling responsive asynchronous programming.'
    ],
    codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0); // Task queue
Promise.resolve().then(() => console.log(3)); // Microtask queue
console.log(4);
// Output order: 1, 4, 3, 2`,
    quizOptions: [
      { text: 'Macrotasks (setTimeout) execute before microtasks (Promises)', isCorrect: false },
      { text: 'Synchronous stack runs first, then microtask queue (Promises) drains completely, then one task queue callback runs', isCorrect: true },
      { text: 'The call stack operates as a FIFO queue', isCorrect: false },
      { text: 'Web APIs run inside the main single JavaScript thread', isCorrect: false }
    ]
  },
  {
    id: 's2-q4',
    number: 114,
    category: 'JavaScript',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'pieCyfer'],
    question: 'Difference between == and ===',
    answer: '`==` (loose equality) performs implicit type coercion before comparing values (e.g. `5 == "5"` is `true`, `null == undefined` is `true`). `===` (strict equality) checks both type and value without coercion (e.g. `5 === "5"` is `false`). In modern JavaScript development, always default to `===` to prevent subtle bugs caused by JavaScript\'s complex type coercion rules.',
    keyPoints: [
      '==: compares after automatic type conversion.',
      '===: checks identical type AND identical value without coercion.',
      'Special cases: NaN === NaN is false (use Number.isNaN); Object.is(-0, +0) is false.'
    ],
    quizOptions: [
      { text: '== checks both value and type, while === checks only value', isCorrect: false },
      { text: '== performs implicit type coercion; === checks both type and value without coercion', isCorrect: true },
      { text: '=== only works on strings and numbers', isCorrect: false },
      { text: '== is faster than === because it skips type validation', isCorrect: false }
    ]
  },
  {
    id: 's2-q5',
    number: 115,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'Promises vs callbacks — why promises were introduced and how they solve callback hell',
    answer: 'Callbacks require passing functions as arguments to handle async completion. Nested async operations led to "callback hell" (pyramid of doom), fragmented error handling (checking `err` in every callback), and inversion of control. Promises represent a future value with standardized states (pending, fulfilled, rejected). They solve callback hell via linear chaining (`.then().then()`), centralized error handling (`.catch()`), and combinators (`Promise.all`, `Promise.race`).',
    keyPoints: [
      'Flattens deeply nested callbacks into linear readable chains.',
      'Guarantees callbacks are called at most once and never synchronously called before registration.',
      'Centralized error propagation via single .catch() block.'
    ],
    codeSnippet: `// Callback Hell:
getUser(id, (err, user) => {
  getOrders(user.id, (err, orders) => { ... });
});

// Promise Chain:
getUser(id)
  .then(user => getOrders(user.id))
  .then(orders => console.log(orders))
  .catch(err => console.error(err));`,
    quizOptions: [
      { text: 'Callbacks run faster than Promises because Promises require heavy C++ compilation', isCorrect: false },
      { text: 'Promises replace nested callback pyramids with linear chaining, centralized .catch(), and guaranteed execution', isCorrect: true },
      { text: 'Promises are only supported in Node.js, not browsers', isCorrect: false },
      { text: 'Callbacks automatically handle errors across multiple steps', isCorrect: false }
    ]
  },
  {
    id: 's2-q6',
    number: 116,
    category: 'JavaScript',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'async/await — syntactic sugar over promises, error handling with try/catch',
    answer: '`async/await` provides clean, synchronous-looking syntax on top of Promises. An `async` function always returns a Promise (wrapping non-promise returns in `Promise.resolve()`). The `await` keyword pauses execution inside the async function until the awaited Promise settles, unwrapping its value or throwing on rejection. Errors are captured using standard `try/catch` blocks.',
    keyPoints: [
      'async function always returns a Promise.',
      'await pauses within the function without blocking the main JS thread.',
      'Use try/catch for idiomatic error handling; use Promise.all() for concurrent awaiting.'
    ],
    codeSnippet: `async function fetchUserData(userId) {
  try {
    const res = await fetch(\`/api/users/\${userId}\`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}`,
    quizOptions: [
      { text: 'await blocks the entire operating system thread until complete', isCorrect: false },
      { text: 'Syntactic sugar over Promises allowing synchronous-looking flow with standard try/catch error handling', isCorrect: true },
      { text: 'async functions can only return boolean values', isCorrect: false },
      { text: 'await can be used anywhere in JavaScript without an async wrapper', isCorrect: false }
    ]
  },
  {
    id: 's2-q7',
    number: 117,
    category: 'JavaScript',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Netsol'],
    question: 'null vs undefined',
    answer: '`undefined` means a variable has been declared but has not yet been assigned a value; it is also the default return of functions with no explicit return, and unpassed function parameters. Type: `typeof undefined === "undefined"`. `null` is an intentional assignment representing the absence of any object value. Type: `typeof null === "object"` (a legacy JavaScript bug from 1995 that cannot be fixed without breaking existing web code).',
    keyPoints: [
      'undefined: system default indicating absence of initialization.',
      'null: intentional programmer assignment indicating empty object reference.',
      'null == undefined is true; null === undefined is false.'
    ],
    quizOptions: [
      { text: 'null and undefined are identical in type and behavior', isCorrect: false },
      { text: 'undefined is unassigned variable state; null is an intentional assignment of empty value (typeof null is "object")', isCorrect: true },
      { text: 'null is a number 0; undefined is an empty string', isCorrect: false },
      { text: 'undefined cannot be checked using if conditions', isCorrect: false }
    ]
  },
  {
    id: 's2-q8',
    number: 118,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'Hoisting (variable vs function declaration hoisting)',
    answer: 'Hoisting is JavaScript\'s behavior of moving declarations to the top of their enclosing scope during the compilation phase before execution. Function declarations are hoisted completely with their implementation, meaning you can call them before they appear in code. `var` variables are hoisted and initialized to `undefined`. `let` and `const` declarations are hoisted into the Temporal Dead Zone (TDZ) and cannot be accessed before declaration.',
    keyPoints: [
      'Function declarations: fully hoisted (name and body).',
      'var declarations: hoisted with undefined initialization.',
      'let & const: hoisted without initialization, throwing ReferenceError in TDZ.',
      'Function expressions (const fn = () => {}) obey the variable rule, not function rule.'
    ],
    codeSnippet: `greet(); // Works: "Hello!" (hoisted)
function greet() { console.log("Hello!"); }

// sayBye(); // TypeError: sayBye is not a function
var sayBye = function() { console.log("Bye!"); };`,
    quizOptions: [
      { text: 'All variables and functions are evaluated strictly at the bottom of the file', isCorrect: false },
      { text: 'Moving declarations to top of scope: function declarations hoist completely, var hoists as undefined, let/const hoist in TDZ', isCorrect: true },
      { text: 'Hoisting only occurs when using strict mode ("use strict")', isCorrect: false },
      { text: 'Function expressions hoist their bodies before execution', isCorrect: false }
    ]
  },
  {
    id: 's2-q9',
    number: 119,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Arbisoft'],
    question: 'this in JavaScript (how it works in regular functions vs arrow functions, call, apply, bind)',
    answer: 'In regular functions, `this` is dynamically determined by HOW the function is called: method call (`obj.fn()`) binds `this` to `obj`; standalone function call (`fn()`) binds `this` to `window` (or `undefined` in strict mode); constructor (`new Fn()`) binds to the new instance. Arrow functions do NOT have their own `this`; they capture `this` lexically from their enclosing scope at declaration time. `call` and `apply` invoke a function immediately with a specified `this` (apply accepts args as array). `bind` returns a new function permanently bound to a given `this`.',
    keyPoints: [
      'Regular functions: dynamic `this` based on call-site context.',
      'Arrow functions: lexical `this` inherited from enclosing scope (cannot be rebound).',
      'fn.call(ctx, arg1, arg2), fn.apply(ctx, [args]), fn.bind(ctx).'
    ],
    quizOptions: [
      { text: 'Arrow functions have dynamic this bound to whatever calls them', isCorrect: false },
      { text: 'Regular functions determine this dynamically at call-site; arrow functions inherit lexical this; bind/call/apply override this', isCorrect: true },
      { text: 'bind() immediately invokes the function while call() returns a new function', isCorrect: false },
      { text: 'this always refers to the global window object in all functions', isCorrect: false }
    ]
  },
  {
    id: 's2-q10',
    number: 120,
    category: 'JavaScript',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Systems Limited'],
    question: 'Higher-order functions (map, filter, reduce)',
    answer: 'A higher-order function is a function that takes one or more functions as arguments, or returns a function. Common array methods: `map` transforms each element into a new array of the same length; `filter` returns a new array with elements that pass a boolean predicate test; `reduce` accumulates array elements into a single accumulated result (number, object, or array) by applying an accumulator function across all items.',
    keyPoints: [
      'Functions treated as first-class citizens in JavaScript.',
      'map: 1-to-1 transformation returning new array without mutating source.',
      'filter: subsets elements meeting condition.',
      'reduce: general-purpose aggregator reducing array to a single value/object.'
    ],
    codeSnippet: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);        // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0);   // [2, 4]
const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15`,
    quizOptions: [
      { text: 'Functions written at the top of the file before all other code', isCorrect: false },
      { text: 'Functions that accept other functions as arguments or return functions (e.g. map, filter, reduce)', isCorrect: true },
      { text: 'Functions that require async/await to execute', isCorrect: false },
      { text: 'Mathematical functions with quadratic complexity', isCorrect: false }
    ]
  },
  {
    id: 's2-q11',
    number: 121,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Netsol'],
    question: 'Deep copy vs shallow copy (Object.assign, spread, structuredClone, JSON trick)',
    answer: 'Shallow copy duplicates top-level properties; nested objects/arrays are copied by reference, meaning mutating a nested object in the copy also mutates the original (`Object.assign({}, obj)` or `{ ...obj }`). Deep copy recursively duplicates all nested objects so both copies are fully independent. Techniques: `structuredClone(obj)` (native modern API handling circular references, Dates, Sets, Maps), or `JSON.parse(JSON.stringify(obj))` (quick trick, but loses functions, undefined, Symbols, and corrupts Dates into strings).',
    keyPoints: [
      'Shallow copy ({ ...obj }): nested objects share identical memory references.',
      'Deep copy: creates fresh memory structures for all nested levels.',
      'structuredClone() is the standard modern deep copy API.',
      'JSON method drops functions, undefined, and regex.'
    ],
    codeSnippet: `const original = { user: { name: 'Ali' } };
const shallow = { ...original };
shallow.user.name = 'Ahmed'; // Mutates original.user.name!

const deep = structuredClone(original);
deep.user.name = 'Bilal'; // Safe: original remains 'Ahmed'`,
    quizOptions: [
      { text: 'Object.assign and spread syntax create deep copies of all nested properties', isCorrect: false },
      { text: 'Shallow copy duplicates top level and shares nested references; deep copy (structuredClone) clones all nested levels', isCorrect: true },
      { text: 'JSON.stringify preserves functions and undefined values', isCorrect: false },
      { text: 'JavaScript objects are always copied by value automatically', isCorrect: false }
    ]
  },
  {
    id: 's2-q12',
    number: 122,
    category: 'JavaScript',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', '10Pearls', 'Devsinc'],
    question: 'Debouncing vs throttling (practical implementations and use cases)',
    answer: 'Debouncing delays invoking a function until a specified time has elapsed since the LAST time the event was triggered (e.g., live search input: wait 300ms after user stops typing before making API call). Throttling enforces a maximum frequency, ensuring a function is executed at most once per specified time interval, regardless of how many events fire (e.g., window scroll or resize handler running at most once every 100ms).',
    keyPoints: [
      'Debounce: "Execute once after user pauses" (search inputs, auto-save).',
      'Throttle: "Execute at most once per X milliseconds" (scroll, mousemove, resize).',
      'Both conserve CPU and network requests by limiting high-frequency event execution.'
    ],
    codeSnippet: `// Debounce implementation:
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
    quizOptions: [
      { text: 'Debounce executes periodically at regular intervals; throttle executes once at the end', isCorrect: false },
      { text: 'Debounce waits until activity stops before executing; throttle guarantees execution at most once per fixed time interval', isCorrect: true },
      { text: 'Both techniques run code on background worker threads', isCorrect: false },
      { text: 'Debouncing is only used for CSS transitions', isCorrect: false }
    ]
  },

  // ==============================================================
  // 2. REACT.JS (22 QUESTIONS: #123 - #144)
  // ==============================================================
  {
    id: 's2-q13',
    number: 123,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer', 'Devsinc'],
    question: 'What is React and why is it used? (Component-based, declarative, virtual DOM)',
    answer: 'React is an open-source, declarative, component-based JavaScript library for building user interfaces maintained by Meta. It is used because: 1) Component-based architecture promotes modularity, reusability, and maintainability. 2) Declarative paradigm allows developers to specify WHAT the UI should look like for a given state, leaving DOM updates to React. 3) Virtual DOM and efficient diffing ensure high performance by minimizing real DOM updates. 4) Unidirectional data flow makes state changes predictable.',
    keyPoints: [
      'Declarative: write UI as a function of state.',
      'Component-based: isolated, reusable pieces of UI.',
      'Virtual DOM: minimizes expensive browser repaint/reflow cycles.',
      'Huge ecosystem: React Native, Next.js, rich community tooling.'
    ],
    quizOptions: [
      { text: 'A full-stack database engine built into Google Chrome', isCorrect: false },
      { text: 'A declarative, component-based library using Virtual DOM to efficiently update web user interfaces', isCorrect: true },
      { text: 'An imperative jQuery wrapper for direct DOM manipulation', isCorrect: false },
      { text: 'A backend server framework competing with Express', isCorrect: false }
    ]
  },
  {
    id: 's2-q14',
    number: 124,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Devsinc'],
    question: 'Virtual DOM and how React uses it (diffing algorithm, reconciliation)',
    answer: 'The Virtual DOM is a lightweight in-memory JavaScript representation of the actual DOM tree. When component state or props change: 1) A new Virtual DOM tree is generated. 2) The Diffing Algorithm compares the new tree with the previous snapshot using heuristic assumptions (elements of different types generate different trees; elements with unique keys are identified across renders). 3) Reconciliation calculates the minimal batch of changes and updates the real DOM via the renderer.',
    keyPoints: [
      'In-memory object tree mirroring DOM nodes.',
      'O(N) heuristic diffing algorithm replaces generic O(N³) tree comparison.',
      'Batching real DOM operations avoids layout thrashing.'
    ],
    quizOptions: [
      { text: 'Replaces the browser DOM entirely with a binary WebAssembly tree', isCorrect: false },
      { text: 'In-memory JS representation diffed on state change to compute and batch minimal real DOM mutations', isCorrect: true },
      { text: 'A browser extension for debugging React components', isCorrect: false },
      { text: 'A tool that directly edits HTML files on the server disk', isCorrect: false }
    ]
  },
  {
    id: 's2-q15',
    number: 125,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'Systems Limited'],
    question: 'Difference between functional and class components',
    answer: 'Functional components are plain JavaScript functions that take props and return JSX. They use React Hooks (`useState`, `useEffect`) for state and side effects. Class components extend `React.Component`, require a `render()` method, manage state via `this.state` and `this.setState`, and use lifecycle methods (`componentDidMount`, etc.). Functional components are now the standard because they avoid `this` binding pitfalls, promote cleaner composition, and optimize better.',
    keyPoints: [
      'Functional: plain functions, Hooks, no this binding, preferred in modern React.',
      'Class: ES6 classes, lifecycle methods, this.state, verbose syntax.',
      'Functional components can achieve all class features with hooks (including error boundaries with libraries).'
    ],
    quizOptions: [
      { text: 'Class components are faster and consume less memory than functional components', isCorrect: false },
      { text: 'Functional components use hooks and avoid `this`; class components use ES6 classes, this.state, and lifecycle methods', isCorrect: true },
      { text: 'Functional components cannot accept props', isCorrect: false },
      { text: 'Class components do not support JSX syntax', isCorrect: false }
    ]
  },
  {
    id: 's2-q16',
    number: 126,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'Props vs state (mutability, ownership, unidirectional data flow)',
    answer: 'Props (short for properties) are inputs passed from a parent component down to a child component. They are read-only and immutable within the child. State is internal data managed, owned, and updated within the component itself. Updating state via its setter schedules a re-render. Unidirectional data flow means data flows downwards from parent to child through props, and events flow upwards via callback functions passed as props.',
    keyPoints: [
      'Props: external, read-only, passed downwards from parent.',
      'State: internal, mutable via setter, causes component re-render.',
      'Top-down unidirectional flow prevents circular state synchronization bugs.'
    ],
    quizOptions: [
      { text: 'Props are mutable by child components; state is read-only', isCorrect: false },
      { text: 'Props are external read-only inputs passed from parent; state is internally managed mutable component data', isCorrect: true },
      { text: 'Props can only contain primitive strings and numbers', isCorrect: false },
      { text: 'State is shared across all components automatically without context', isCorrect: false }
    ]
  },
  {
    id: 's2-q17',
    number: 127,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'React component lifecycle (mapping componentDidMount, componentDidUpdate, componentWillUnmount to useEffect)',
    answer: 'Mounting: `useEffect(() => { ... }, [])` with empty dependency array runs once after the initial render (equivalent to `componentDidMount`). Updating: `useEffect(() => { ... }, [dep])` runs whenever specified dependencies change (equivalent to `componentDidUpdate`). Unmounting: The cleanup function returned from `useEffect(() => { return () => { cleanup(); }; }, [])` runs before the component is destroyed (equivalent to `componentWillUnmount`).',
    keyPoints: [
      'useEffect with empty array [] = componentDidMount.',
      'useEffect with dependencies [a, b] = componentDidUpdate.',
      'Returned cleanup function = componentWillUnmount + pre-re-render cleanup.'
    ],
    codeSnippet: `useEffect(() => {
  const timer = setInterval(() => console.log('Tick'), 1000);
  // Cleanup function runs on unmount or before next effect run:
  return () => clearInterval(timer);
}, []); // Empty deps = run on mount only`,
    quizOptions: [
      { text: 'componentDidMount maps to useEffect without any callback function', isCorrect: false },
      { text: 'useEffect with [] = mount; with [deps] = update; returned cleanup function = unmount', isCorrect: true },
      { text: 'Lifecycle methods cannot be reproduced using hooks', isCorrect: false },
      { text: 'useEffect runs synchronously before DOM elements are rendered', isCorrect: false }
    ]
  },
  {
    id: 's2-q18',
    number: 128,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Devsinc'],
    question: 'useEffect and its dependency array — common bugs (infinite loops, stale closures)',
    answer: 'The dependency array tells React when to re-run the effect. Bug 1: Infinite loop occurs when an effect updates state that is also included in its dependency array without a conditional check or functional update. Bug 2: Stale closure occurs when an effect captures an old state/prop value because it was omitted from the dependency array or held in an uncleaned interval. Fix: use functional state updates (`setCount(prev => prev + 1)`), primitive dependency values, or `useCallback`/`useRef`.',
    keyPoints: [
      'Omitting dependencies leads to stale closures capturing outdated values.',
      'Mutating state inside effect that is in deps triggers infinite render loop.',
      'Functional update `setVal(c => c + 1)` removes need to include `val` in dependencies.'
    ],
    quizOptions: [
      { text: 'Dependency array should always be omitted to ensure effects run constantly', isCorrect: false },
      { text: 'Missing deps cause stale closures; updating deps state inside effect causes infinite render loops', isCorrect: true },
      { text: 'useEffect dependencies must always be arrays of strings', isCorrect: false },
      { text: 'Stale closures only happen in class components', isCorrect: false }
    ]
  },
  {
    id: 's2-q19',
    number: 129,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Netsol'],
    question: 'useState — how it works, async nature of state updates, functional updates',
    answer: '`useState` declares a state variable. State updates are asynchronous and batched by React (in React 18, automatic batching applies to promises, timeouts, and event handlers alike). Therefore, reading state immediately after calling `setState` will return the OLD value. When the new state depends on the previous state, always use a functional update: `setCount(prev => prev + 1)` to guarantee you operate on the most current value.',
    keyPoints: [
      'setState is asynchronous and batched for render optimization.',
      'Reading state right after setter returns stale snapshot.',
      'Functional updater `setVal(prev => ...)` guarantees access to latest committed state.'
    ],
    codeSnippet: `// Pitfall:
setCount(count + 1);
setCount(count + 1); // Both read same initial 'count' -> only increments by 1

// Correct Functional Update:
setCount(prev => prev + 1);
setCount(prev => prev + 1); // Increments by 2 reliably!`,
    quizOptions: [
      { text: 'setState updates the variable synchronously and immediately in the current line of code', isCorrect: false },
      { text: 'State updates are asynchronous and batched; use functional updates (prev => prev + 1) when computing from prior state', isCorrect: true },
      { text: 'useState can only be used once per component', isCorrect: false },
      { text: 'Functional updates are only required when using TypeScript', isCorrect: false }
    ]
  },
  {
    id: 's2-q20',
    number: 130,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', '10Pearls'],
    question: 'Context API vs Redux — when to use which',
    answer: 'Context API is built into React and ideal for low-frequency, global UI state (theme, authenticated user, locale). Limitation: any change to a context value causes ALL components that consume that context to re-render, regardless of which part of the context they use. Redux Toolkit (or Zustand) is designed for high-frequency, complex state updates with fine-grained selector subscriptions (components re-render ONLY when their selected slice changes), DevTools time-travel debugging, and structured middleware.',
    keyPoints: [
      'Context API: built-in, zero dependencies, great for low-frequency static/infrequent state.',
      'Redux/Zustand: selector-based subscription prevents unnecessary child re-renders.',
      'Use TanStack Query for server state instead of putting API data into Redux.'
    ],
    quizOptions: [
      { text: 'Context API is faster than Redux for thousands of rapid updates per second', isCorrect: false },
      { text: 'Context is best for low-frequency global UI state (theme, auth); Redux/Zustand for high-frequency complex state with selector-based re-renders', isCorrect: true },
      { text: 'Redux is deprecated and cannot be used in modern React applications', isCorrect: false },
      { text: 'Context API requires setting up external reducers and actions', isCorrect: false }
    ]
  },
  {
    id: 's2-q21',
    number: 131,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', 'pieCyfer'],
    question: 'Keys in React lists — why are they needed and why is index as key bad?',
    answer: 'Keys provide a stable identity to list elements across renders so React\'s diffing algorithm knows which items were inserted, deleted, reordered, or modified. Using array index as a key is an anti-pattern when items can be filtered, sorted, or added/removed at the beginning: it tricks React into thinking elements at index 0, 1, etc., are the same component, causing UI input glitches, corrupted local state, and unnecessary DOM mutations. Always use stable, unique IDs (like `item.id`).',
    keyPoints: [
      'Gives elements stable identity across virtual DOM diffing cycles.',
      'Index as key fails when list order changes, causing wrong input values to persist.',
      'Always use unique IDs from database records or UUIDs.'
    ],
    quizOptions: [
      { text: 'Keys are used by CSS stylesheets to style every odd row', isCorrect: false },
      { text: 'Keys give list items stable identity for diffing; using index causes bugs on reorder, filter, or deletion', isCorrect: true },
      { text: 'Keys are required only when lists contain more than 1000 items', isCorrect: false },
      { text: 'React automatically uses the variable name as key if omitted', isCorrect: false }
    ]
  },
  {
    id: 's2-q22',
    number: 132,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Netsol'],
    question: 'Prop drilling — what is it and how do you avoid it?',
    answer: 'Prop drilling is the process of passing props through multiple levels of intermediate components that have no use for the data themselves, purely to deliver it to a deeply nested child. Solutions: 1) Component Composition (passing children or pre-configured component elements as props). 2) React Context API for shared global/theme state. 3) State management libraries like Zustand or Redux Toolkit.',
    keyPoints: [
      'Clutters intermediate components with irrelevant props.',
      'Composition: `<Layout sidebar={<UserProfile user={user} />} />` often solves it without global state.',
      'Context API or Zustand for true cross-tree shared data.'
    ],
    quizOptions: [
      { text: 'An automated testing methodology for inspecting React props', isCorrect: false },
      { text: 'Passing props through intermediate layers that do not need them; solved by composition, Context API, or state libraries', isCorrect: true },
      { text: 'Drilling security vulnerabilities into React packages', isCorrect: false },
      { text: 'A tool for bundling TypeScript props into JSON', isCorrect: false }
    ]
  },
  {
    id: 's2-q23',
    number: 133,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['10Pearls', 'Devsinc'],
    question: 'Controlled vs uncontrolled components (forms)',
    answer: 'Controlled components have their form inputs driven directly by React component state (`value={state}` + `onChange={e => setState(e.target.value)}`). State acts as the single source of truth, enabling instant validation, masking, and disabled submit states. Uncontrolled components let the DOM manage form input values internally; React accesses values on-demand using a `ref` (`ref.current.value`) or the native `FormData` API. Controlled is preferred for complex interactive forms.',
    keyPoints: [
      'Controlled: React state is single source of truth (value + onChange).',
      'Uncontrolled: DOM holds input value, retrieved via ref or FormData.',
      'Use libraries like React Hook Form to combine uncontrolled performance with controlled validation.'
    ],
    quizOptions: [
      { text: 'Controlled components run on the server; uncontrolled run on the client', isCorrect: false },
      { text: 'Controlled inputs are driven by React state (value + onChange); uncontrolled inputs store state in the DOM accessed via ref', isCorrect: true },
      { text: 'Uncontrolled inputs cannot submit forms to backend APIs', isCorrect: false },
      { text: 'Controlled inputs cannot perform regex validation', isCorrect: false }
    ]
  },
  {
    id: 's2-q24',
    number: 134,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Systems Limited'],
    question: 'useMemo vs useCallback (when to use, when NOT to use)',
    answer: '`useMemo` caches the RESULT of an expensive calculation: `const val = useMemo(() => computeHeavy(a, b), [a, b])`. `useCallback` caches a FUNCTION DEFINITION instance between renders: `const handleClick = useCallback(() => doSomething(id), [id])`. When to use: passing callbacks to memoized children (`React.memo`), expensive computations (e.g. filtering 10k rows), or stable hook dependencies. When NOT to use: premature optimization for cheap operations (adding memory overhead and code complexity).',
    keyPoints: [
      'useMemo: caches calculated value.',
      'useCallback: caches function reference.',
      'Do not overuse on cheap calculations; cost of hook dependency comparison can outweigh execution time.'
    ],
    quizOptions: [
      { text: 'useMemo is for functions, useCallback is for values', isCorrect: false },
      { text: 'useMemo caches computed values; useCallback caches function references to prevent unnecessary re-renders of memoized children', isCorrect: true },
      { text: 'Both hooks must be applied to every single variable in React', isCorrect: false },
      { text: 'useCallback forces immediate synchronous rendering of child components', isCorrect: false }
    ]
  },
  {
    id: 's2-q25',
    number: 135,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'React.memo — how it works, shallow comparison, areEqual custom comparison',
    answer: '`React.memo` is a higher-order component that prevents a functional component from re-rendering if its props have not changed. By default, it performs a shallow equality check (`===`) on each prop. If props are objects or functions, you must ensure stable references (via `useMemo`/`useCallback`) or provide a custom comparison function as the second argument: `React.memo(MyComponent, (prevProps, nextProps) => prevProps.id === nextProps.id)`.',
    keyPoints: [
      'HOC wrapping functional component to skip rendering if props are unchanged.',
      'Uses shallow equality by default.',
      'Accepts custom areEqual(prevProps, nextProps) comparison function.'
    ],
    quizOptions: [
      { text: 'React.memo memoizes server-side database queries in RAM', isCorrect: false },
      { text: 'Higher-order component performing shallow comparison on props to prevent unnecessary child re-renders', isCorrect: true },
      { text: 'A hook that replaces useState entirely', isCorrect: false },
      { text: 'React.memo always re-renders when parent component state changes regardless of props', isCorrect: false }
    ]
  },
  {
    id: 's2-q26',
    number: 136,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'Custom hooks — why create them, rules of hooks, example (useFetch, useLocalStorage)',
    answer: 'Custom hooks are JavaScript functions whose names start with `use` and that can call other React hooks. They allow you to extract and reuse stateful logic across multiple components without duplicating code or modifying component hierarchy. Rules of Hooks: 1) Only call hooks at the top level (never inside loops, conditions, or nested functions). 2) Only call hooks from React function components or other custom hooks.',
    keyPoints: [
      'Reuses stateful logic across components (e.g. useDebounce, useAuth, useWindowSize).',
      'Must start with "use" prefix for ESLint hook enforcement.',
      'Preserves isolated state: each component using the hook receives independent state.'
    ],
    codeSnippet: `function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setValue = (val) => {
    setStoredValue(val);
    window.localStorage.setItem(key, JSON.stringify(val));
  };
  return [storedValue, setValue];
}`,
    quizOptions: [
      { text: 'Custom hooks share a single global state across all components that import them', isCorrect: false },
      { text: 'Functions starting with "use" that encapsulate reusable stateful logic obeying top-level hook rules', isCorrect: true },
      { text: 'Custom hooks can be called inside for loops and if statements', isCorrect: false },
      { text: 'Custom hooks only exist in React Native', isCorrect: false }
    ]
  },
  {
    id: 's2-q27',
    number: 137,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Devsinc'],
    question: 'Reconciliation and diffing algorithm — how React decides what to re-render',
    answer: 'Reconciliation is the process through which React updates the DOM. Instead of an O(N³) full tree comparison, React uses an O(N) heuristic algorithm based on two core assumptions: 1) Two elements of different types (e.g., `<div>` vs `<span>`, or `<Header>` vs `<Footer>`) will produce completely different trees; React destroys the old tree and mounts the new one from scratch. 2) Elements with stable, unique `key` props can be matched across renders, allowing React to reorder and update elements rather than recreating them.',
    keyPoints: [
      'O(N) heuristic diffing algorithm.',
      'Different component/tag type triggers full teardown and rebuild.',
      'Identical types update only changed attributes.',
      'Keys match items across list updates.'
    ],
    quizOptions: [
      { text: 'React compares every HTML character using a regex scanner', isCorrect: false },
      { text: 'O(N) heuristic diffing based on element types and unique keys to minimize real DOM mutations', isCorrect: true },
      { text: 'Reconciliation is handled by browser CSS layout engines', isCorrect: false },
      { text: 'React re-renders the entire browser window from scratch on every state change', isCorrect: false }
    ]
  },
  {
    id: 's2-q28',
    number: 138,
    category: 'React',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Systems Limited', '10Pearls'],
    question: 'React Fiber — what problem did it solve? (incremental rendering, priority-based updates)',
    answer: 'Prior to React 16 (the "Stack" reconciler), reconciliation was synchronous and recursive; once started, it could not be paused, causing dropped frames and sluggish UI during heavy rendering. React Fiber completely rewrote the core engine into a virtual stack frame architecture where work is split into small units of work (fibers). It enables: 1) Incremental rendering (pausing, resuming, or aborting render work). 2) Priority-based scheduling (urgent updates like typing or clicking take precedence over non-urgent updates like data fetching). 3) Powers Concurrent React features like `useTransition` and `useDeferredValue`.',
    keyPoints: [
      'Replaced synchronous stack reconciler with interruptible work units.',
      'Priority scheduling: urgent user interactions interrupt low-priority rendering.',
      'Foundation for Concurrent Mode, Suspense, and React Server Components.'
    ],
    quizOptions: [
      { text: 'A high-speed fiber-optic network cable for connecting servers', isCorrect: false },
      { text: 'A complete rewrite of React\'s reconciler enabling incremental, interruptible, priority-based rendering', isCorrect: true },
      { text: 'A CSS-in-JS library developed by Facebook', isCorrect: false },
      { text: 'A plugin for compiling React directly into WebAssembly', isCorrect: false }
    ]
  },
  {
    id: 's2-q29',
    number: 139,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'Forms in React (React Hook Form vs Formik vs plain state)',
    answer: 'Plain state works for 1-3 simple inputs but causes component-wide re-renders on every keystroke and requires verbose validation code. Formik was the early standard using controlled components, but can suffer performance slowdowns on large forms due to frequent re-renders. React Hook Form is the modern industry standard: it uses uncontrolled inputs under the hood with subscriptions, eliminating unnecessary re-renders, and integrates seamlessly with schema validation libraries like Zod.',
    keyPoints: [
      'Plain state: easy for tiny forms; scales poorly with excessive re-renders.',
      'Formik: established controlled form library with yup support.',
      'React Hook Form: superior performance via uncontrolled inputs and native Zod integration.'
    ],
    quizOptions: [
      { text: 'React Hook Form re-renders the entire page on every keystroke', isCorrect: false },
      { text: 'React Hook Form minimizes re-renders using uncontrolled inputs and ref subscriptions; integrates with Zod', isCorrect: true },
      { text: 'Formik has been deprecated by the W3C', isCorrect: false },
      { text: 'Plain state is always recommended for forms with 100+ inputs', isCorrect: false }
    ]
  },
  {
    id: 's2-q30',
    number: 140,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'Systems Limited'],
    question: 'React Router (v6) — Routes, Route, Outlet, useParams, useNavigate, Link vs NavLink',
    answer: 'React Router v6 provides client-side routing. `<Routes>` wraps individual `<Route path="..." element={<Component />} />`. `<Outlet />` renders child routes inside nested layout parents. `useParams()` extracts dynamic URL parameters (e.g. `const { id } = useParams()`). `useNavigate()` allows programmatic redirection (`navigate(\'/dashboard\')`). `<Link>` performs SPA navigation without browser reload. `<NavLink>` is a specialized Link that automatically detects if its URL is active and provides an `isActive` boolean for navigation styling.',
    keyPoints: [
      '<Routes> and <Route> map paths to elements.',
      '<Outlet /> enables nested layout hierarchies.',
      'useParams reads :id, useNavigate performs programmatic redirects, NavLink adds active styling.'
    ],
    quizOptions: [
      { text: 'React Router refreshes the browser page from the server on every link click', isCorrect: false },
      { text: 'SPA routing engine: Routes, Route, Outlet for nested layouts, useParams, useNavigate, and active NavLink', isCorrect: true },
      { text: 'Outlet is a replacement for HTML <button> elements', isCorrect: false },
      { text: 'useParams can only read query strings after ?', isCorrect: false }
    ]
  },
  {
    id: 's2-q31',
    number: 141,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', '10Pearls', 'Devsinc'],
    question: 'Performance optimization in a large React app — checklist',
    answer: '1) Code-splitting with `React.lazy()` and `Suspense` for route-based and heavy component chunking. 2) List virtualization (`react-window` or `@tanstack/react-virtual`) for tables/lists > 100 items. 3) Memoization (`React.memo`, `useMemo`, `useCallback`) on heavy components and stable callback props. 4) Server state caching with TanStack Query to eliminate duplicate network requests. 5) Avoid anonymous objects/functions in render. 6) Asset optimization (SVGs, responsive WebP images). 7) Bundle analysis with `@vitejs/plugin-visualizer`.',
    keyPoints: [
      'Route-level code splitting reduces initial JS bundle payload.',
      'Virtualize large lists: only render items currently visible in the viewport.',
      'Deduplicate API requests and background cache with TanStack Query.'
    ],
    quizOptions: [
      { text: 'Rewrite all components as raw HTML string templates', isCorrect: false },
      { text: 'Code splitting, list virtualization, React.memo/useCallback, TanStack Query caching, and bundle analysis', isCorrect: true },
      { text: 'Never use props or state in any component', isCorrect: false },
      { text: 'Force browser cache clear on every single click', isCorrect: false }
    ]
  },
  {
    id: 's2-q32',
    number: 142,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer'],
    question: 'Error Boundaries — what they catch, what they don\'t, implementation',
    answer: 'Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log the error, and display a fallback UI instead of crashing the entire app. They MUST be implemented as class components using `static getDerivedStateFromError()` (updates state to render fallback) and `componentDidCatch()` (logs error telemetry). What they do NOT catch: errors inside event handlers (use standard try/catch), asynchronous code (`setTimeout`, `fetch`), server-side rendering, or errors in the boundary component itself.',
    keyPoints: [
      'Catches rendering, lifecycle, and constructor errors in child tree.',
      'Implemented via class component with getDerivedStateFromError & componentDidCatch.',
      'Does NOT catch event handlers, async promises, or SSR errors.'
    ],
    quizOptions: [
      { text: 'Error boundaries catch errors inside async setTimeout callbacks', isCorrect: false },
      { text: 'Class components catching child render/lifecycle errors to display fallback UI; cannot catch event handlers or async code', isCorrect: true },
      { text: 'Any functional component using a try/catch block in its body', isCorrect: false },
      { text: 'A build-time linter rule in ESLint', isCorrect: false }
    ]
  },
  {
    id: 's2-q33',
    number: 143,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Netsol'],
    question: 'useRef vs useState — mutable reference vs reactive state, DOM access',
    answer: '`useState` stores reactive data: when updated via `setState`, React schedules a re-render to reflect the change in the UI. `useRef` returns a mutable object with a `.current` property that persists across renders: updating `.current` does NOT trigger a re-render. Primary use cases for `useRef`: 1) Direct DOM access (focusing an input, scrolling to a position, measuring element dimensions). 2) Storing mutable instance variables that don\'t affect UI output (interval IDs, previous state snapshots, debounce timers).',
    keyPoints: [
      'useState triggers UI re-render on mutation; useRef does NOT.',
      'useRef stores DOM node references (ref={inputRef}).',
      'useRef stores mutable values across renders without re-rendering.'
    ],
    quizOptions: [
      { text: 'useRef updates trigger immediate synchronous re-renders', isCorrect: false },
      { text: 'useState triggers re-renders on update; useRef persists mutable values (.current) without triggering re-renders', isCorrect: true },
      { text: 'useRef can only store integers', isCorrect: false },
      { text: 'useState can be mutated directly via state = newValue', isCorrect: false }
    ]
  },
  {
    id: 's2-q34',
    number: 144,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Arbisoft'],
    question: 'Lazy loading / code splitting with React.lazy and Suspense',
    answer: '`React.lazy()` allows you to render a dynamic import as a regular component, deferring the loading of that component\'s JavaScript bundle until it is first rendered. It must be wrapped in a `<Suspense>` component that provides a fallback UI (like a skeleton or loading spinner) while the chunk is being downloaded over the network. Most commonly applied at the route level to split pages into separate bundles.',
    keyPoints: [
      'React.lazy(() => import("./HeavyComponent")) splits bundle into separate chunk.',
      'Must be wrapped inside <Suspense fallback={<Loader />}>.',
      'Drastically reduces initial bundle size and First Contentful Paint.'
    ],
    codeSnippet: `import React, { Suspense, lazy } from 'react';
const AnalyticsDashboard = lazy(() => import('./AnalyticsDashboard'));

function App() {
  return (
    <Suspense fallback={<div className="p-4">Loading Dashboard...</div>}>
      <AnalyticsDashboard />
    </Suspense>
  );
}`,
    quizOptions: [
      { text: 'React.lazy loads components with a 10-second sleep delay', isCorrect: false },
      { text: 'Defers loading component JS chunk until rendered; wrapped in <Suspense> with fallback UI', isCorrect: true },
      { text: 'Code splitting can only be configured in webpack.config.js', isCorrect: false },
      { text: 'Suspense replaces the browser back button', isCorrect: false }
    ]
  },

  // ==============================================================
  // 3. NODE.JS (13 QUESTIONS: #145 - #157)
  // ==============================================================
  {
    id: 's2-q35',
    number: 145,
    category: 'Node.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'pieCyfer'],
    question: 'What is Node.js and how does it work? (V8, libuv, single-threaded event loop)',
    answer: 'Node.js is a server-side runtime environment built on Google Chrome\'s V8 JavaScript engine. It executes JavaScript outside the browser. Architecture: 1) V8 engine compiles JS into native machine code. 2) Single-threaded event loop executes all user JavaScript. 3) libuv (C library) provides an abstraction layer for asynchronous I/O and manages a background thread pool (default 4 threads) for CPU/blocking operations (filesystem, DNS, crypto). This combination gives Node high throughput for I/O-heavy applications.',
    keyPoints: [
      'V8 compiles JavaScript directly to machine code.',
      'Single main execution thread for JavaScript.',
      'libuv thread pool and OS kernel asynchronous primitives handle heavy I/O.'
    ],
    quizOptions: [
      { text: 'Node.js is a multi-threaded web browser developed by Mozilla', isCorrect: false },
      { text: 'Server runtime built on V8 with a single-threaded event loop and libuv thread pool for non-blocking I/O', isCorrect: true },
      { text: 'A C++ compiler that runs inside the Linux terminal', isCorrect: false },
      { text: 'A relational database server', isCorrect: false }
    ]
  },
  {
    id: 's2-q36',
    number: 146,
    category: 'Node.js',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Arbisoft', 'Systems Limited', '10Pearls'],
    question: 'Node.js event loop phases in detail (timers, pending callbacks, idle/prepare, poll, check, close)',
    answer: 'The Node.js event loop executes in 6 distinct sequential phases: 1) Timers: executes callbacks scheduled by `setTimeout` and `setInterval`. 2) Pending Callbacks: executes I/O callbacks deferred to the next loop iteration (e.g. certain TCP socket errors). 3) Idle, Prepare: internal use only. 4) Poll: retrieves new I/O events; executes I/O-related callbacks; blocks and waits for connections when appropriate. 5) Check: executes `setImmediate()` callbacks. 6) Close Callbacks: handles close events (e.g. `socket.on(\'close\')`). Microtasks (`process.nextTick` and Promises) drain between phase transitions.',
    keyPoints: [
      'Sequence: Timers -> Pending -> Poll -> Check (setImmediate) -> Close.',
      'Poll phase blocks if no timers are pending.',
      'Check phase is dedicated specifically to setImmediate().'
    ],
    quizOptions: [
      { text: 'Timers -> Close -> Poll -> Check -> Idle', isCorrect: false },
      { text: 'Timers -> Pending Callbacks -> Idle/Prepare -> Poll -> Check (setImmediate) -> Close Callbacks', isCorrect: true },
      { text: 'The event loop has only 2 phases: Read and Write', isCorrect: false },
      { text: 'Microtasks only run once every hour', isCorrect: false }
    ]
  },
  {
    id: 's2-q37',
    number: 147,
    category: 'Node.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'Synchronous vs asynchronous code in Node.js (blocking vs non-blocking I/O)',
    answer: 'Synchronous methods (e.g., `fs.readFileSync`) execute on the main thread and BLOCK execution until finished: no other code, HTTP requests, or timers can run during that time. Asynchronous methods (e.g., `fs.readFile` or `fs.promises.readFile`) offload the I/O operation to the libuv thread pool or OS kernel, freeing the main thread immediately to process incoming requests. When the I/O finishes, its callback is queued in the event loop.',
    keyPoints: [
      'Synchronous methods (fs.*Sync) freeze the entire server event loop.',
      'Asynchronous methods return immediately and notify via callback/Promise.',
      'In web servers, never use synchronous I/O in request handlers.'
    ],
    quizOptions: [
      { text: 'Synchronous code runs 10x faster than asynchronous code under heavy traffic', isCorrect: false },
      { text: 'Synchronous I/O blocks the main thread freezing all requests; asynchronous I/O is non-blocking and offloaded', isCorrect: true },
      { text: 'Asynchronous code cannot be used with databases', isCorrect: false },
      { text: 'Node.js only supports synchronous functions', isCorrect: false }
    ]
  },
  {
    id: 's2-q38',
    number: 148,
    category: 'Node.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'Systems Limited'],
    question: 'package.json vs package-lock.json (semantic versioning, caret vs tilde)',
    answer: '`package.json` contains high-level project metadata, scripts, and semver dependency ranges (`^1.2.3` caret allows minor/patch updates; `~1.2.3` tilde allows patch updates only; exact `1.2.3` locks to that version). `package-lock.json` records the EXACT resolved version, dependency tree, and integrity SHA hash of every installed package, guaranteeing identical deterministic installations across different machines, developers, and CI/CD pipelines (`npm ci`).',
    keyPoints: [
      'package.json: human-editable manifest with semver ranges (^ minor, ~ patch).',
      'package-lock.json: auto-generated exact dependency tree and hash verification.',
      'Always commit package-lock.json to Git to avoid "works on my machine" bugs.'
    ],
    quizOptions: [
      { text: 'package-lock.json should never be committed to Git repositories', isCorrect: false },
      { text: 'package.json defines semver ranges (^ minor, ~ patch); package-lock.json locks exact versions and trees for deterministic builds', isCorrect: true },
      { text: 'Caret (^) locks exact version without allowing updates', isCorrect: false },
      { text: 'package-lock.json is only used by Python pip', isCorrect: false }
    ]
  },
  {
    id: 's2-q39',
    number: 149,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Arbisoft'],
    question: 'Node.js streams (Readable, Writable, Duplex, Transform) — why use them, piping, handling backpressure',
    answer: 'Streams process data in sequential chunks instead of reading the entire file or payload into RAM at once. 4 types: Readable (`fs.createReadStream`), Writable (`res` in Express), Duplex (`net.Socket`), Transform (`zlib.createGzip`). Piping (`readable.pipe(writable)`) connects the output of one stream to the input of another. Backpressure occurs when the readable stream pushes data faster than the writable stream can write it; `.pipe()` or `stream.pipeline` automatically pauses the readable source until the writable buffer drains, preventing memory crashes.',
    keyPoints: [
      'Handles huge files (GBs) with minimal memory footprint (MBs).',
      'Types: Readable, Writable, Duplex (read+write), Transform (modify on the fly).',
      'Backpressure management prevents fast readers from exhausting memory buffers.'
    ],
    quizOptions: [
      { text: 'Streams load the entire 50GB file into RAM before executing', isCorrect: false },
      { text: 'Chunk-based data flow (Readable, Writable, Duplex, Transform) with automatic backpressure management via piping', isCorrect: true },
      { text: 'Streams are only used for playing MP3 music files', isCorrect: false },
      { text: 'Streams can only write to disk, never over network sockets', isCorrect: false }
    ]
  },
  {
    id: 's2-q40',
    number: 150,
    category: 'Node.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'Middleware in Node.js (in context of Express) — what it is, next(), error middleware signature',
    answer: 'Middleware is a function with access to `req`, `res`, and `next`. It sits in the request pipeline and can execute code, modify `req`/`res`, terminate the request by sending a response (`res.json()`), or pass execution to the next handler by calling `next()`. If `next()` is called with an argument (`next(err)`), Express skips all remaining route handlers and jumps directly to error-handling middleware. Error-handling middleware has an unmistakable 4-argument signature: `(err, req, res, next)`.',
    keyPoints: [
      'Pipeline pattern: (req, res, next).',
      'Must either call next() or send a response to avoid hanging the client.',
      'Error middleware MUST declare 4 arguments: (err, req, res, next).'
    ],
    quizOptions: [
      { text: 'Middleware must always return a boolean true or false', isCorrect: false },
      { text: 'Pipeline functions (req, res, next); next(err) jumps to 4-parameter error middleware (err, req, res, next)', isCorrect: true },
      { text: 'Error middleware only accepts 2 parameters', isCorrect: false },
      { text: 'Middleware cannot modify the request object', isCorrect: false }
    ]
  },
  {
    id: 's2-q41',
    number: 151,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'require vs import (CommonJS vs ES Modules in Node.js)',
    answer: 'CommonJS (`require()` and `module.exports`) is synchronous, evaluated at runtime, and can be called conditionally inside `if` statements. ES Modules (`import` and `export`) are statically analyzed at compile time, asynchronous, support tree-shaking, and must be placed at top level (unless using dynamic `import()`). In Node.js, ESM is activated by adding `"type": "module"` to `package.json` or using `.mjs` file extensions. CommonJS globals like `__dirname` and `__filename` are absent in ESM (recreated via `import.meta.url`).',
    keyPoints: [
      'CommonJS: require() runtime synchronous loading.',
      'ESM: import static compile-time asynchronous loading with tree-shaking.',
      'ESM activated via "type": "module" in package.json.',
      '__dirname replaced in ESM by path.dirname(fileURLToPath(import.meta.url)).'
    ],
    quizOptions: [
      { text: 'require() supports tree-shaking, while import does not', isCorrect: false },
      { text: 'CommonJS uses runtime synchronous require(); ESM uses static compile-time import with tree-shaking support', isCorrect: true },
      { text: 'ES Modules cannot be used in modern Node.js versions', isCorrect: false },
      { text: 'require and import are exact identical aliases in all environments', isCorrect: false }
    ]
  },
  {
    id: 's2-q42',
    number: 152,
    category: 'Node.js',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Arbisoft', '10Pearls'],
    question: 'Child processes and worker threads — when to use which for CPU-intensive tasks',
    answer: 'Because Node.js is single-threaded, CPU-intensive work (image resizing, video encoding, heavy cryptography, machine learning) blocks the event loop. Worker Threads (`worker_threads` module) share memory (via `SharedArrayBuffer`) and run lightweight threads within the SAME process; best for CPU-bound JavaScript computations. Child Processes (`child_process` module: `fork`, `spawn`, `exec`) spawn separate OS processes with isolated memory; best for running external command-line tools (e.g. FFmpeg, Python scripts) or sandboxed tasks.',
    keyPoints: [
      'Worker threads: shared memory, same process, CPU-heavy JS calculations.',
      'Child processes: isolated memory, separate OS process, running CLI scripts/Python/FFmpeg.',
      'Prevents heavy computation from starving HTTP request throughput.'
    ],
    quizOptions: [
      { text: 'Worker threads spawn separate operating system processes with separate memory', isCorrect: false },
      { text: 'Worker threads share memory within the same process for CPU tasks; Child processes spawn isolated OS processes for external binaries/scripts', isCorrect: true },
      { text: 'Node.js cannot run CPU-intensive tasks under any circumstances', isCorrect: false },
      { text: 'Child processes are only supported on Windows OS', isCorrect: false }
    ]
  },
  {
    id: 's2-q43',
    number: 153,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'Clustering in Node.js — how to utilize multi-core systems, PM2',
    answer: 'The `cluster` module allows a master process to fork worker processes equal to the number of CPU cores (`os.cpus().length`). All worker processes share the same server port using an internal IPC round-robin load balancer. In production environments, developers rarely write raw cluster code; instead, they use PM2 (`pm2 start server.js -i max`), which manages cluster lifecycle, automatic restarts on failure, zero-downtime rolling reloads, and centralized logging.',
    keyPoints: [
      'Spawns one worker per CPU core sharing a single TCP listening port.',
      'Master process routes incoming traffic across workers.',
      'PM2 automates cluster management, health monitoring, and zero-downtime reloads.'
    ],
    quizOptions: [
      { text: 'Clustering connects multiple MongoDB databases into a single query', isCorrect: false },
      { text: 'Spawns worker processes per CPU core sharing the same port; automated in production via PM2 cluster mode', isCorrect: true },
      { text: 'Clustering is only possible using Docker containers', isCorrect: false },
      { text: 'PM2 is an alternative to JavaScript syntax', isCorrect: false }
    ]
  },
  {
    id: 's2-q44',
    number: 154,
    category: 'Node.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Netsol'],
    question: 'Environment variables and security in Node (dotenv, not committing .env, validating env vars)',
    answer: 'Environment variables store configuration and secrets (DB connection strings, JWT secret keys, third-party API keys) outside the codebase. In Node, load them using `dotenv` (`dotenv.config()`). Security rules: 1) Never commit `.env` files to version control; always add `.env` to `.gitignore`. 2) Provide a `.env.example` file with dummy values documenting required keys. 3) Validate presence and types of environment variables at startup using a schema validator (like Zod or envalid) to crash immediately with a clear error if secrets are missing.',
    keyPoints: [
      'Load via dotenv package into process.env.',
      'Always gitignore .env; commit .env.example with empty keys.',
      'Fail-fast: validate environment variables on server boot with Zod/envalid.'
    ],
    quizOptions: [
      { text: 'Commit .env files to GitHub so other developers have access to production passwords', isCorrect: false },
      { text: 'Store secrets in .env loaded via dotenv, gitignore .env, provide .env.example, and validate keys on startup', isCorrect: true },
      { text: 'Environment variables can only be read inside HTML files', isCorrect: false },
      { text: 'Node.js encrypts .env files on disk automatically', isCorrect: false }
    ]
  },
  {
    id: 's2-q45',
    number: 155,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'Error handling in Node.js / Express (uncaughtException, unhandledRejection, custom error classes)',
    answer: '1) Operational errors (user error, bad input, network timeout) should be modeled using custom error classes extending `Error` (e.g. `class AppError extends Error { statusCode: number; isOperational: boolean; }`). 2) Express centralized 4-param error middleware formats clean JSON responses (`{ status: "fail", message }`). 3) Programmer errors and unhandled edge cases are caught via process-level listeners: `process.on(\'unhandledRejection\', err => { ... })` and `process.on(\'uncaughtException\', err => { gracefulShutdown(); })`. When an uncaught exception occurs, log the error and restart the process gracefully.',
    keyPoints: [
      'Custom AppError class distinguishing operational errors from programmer bugs.',
      'Express (err, req, res, next) middleware formats consistent HTTP error responses.',
      'Listen to process unhandledRejection and uncaughtException for safety.'
    ],
    quizOptions: [
      { text: 'Ignore uncaught exceptions and keep the process running indefinitely', isCorrect: false },
      { text: 'Custom AppError classes, centralized Express error middleware, and process event listeners for unhandled rejections', isCorrect: true },
      { text: 'All errors in Node.js automatically return HTTP 200 OK', isCorrect: false },
      { text: 'try/catch blocks cannot be used in Express handlers', isCorrect: false }
    ]
  },
  {
    id: 's2-q46',
    number: 156,
    category: 'Node.js',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Arbisoft', 'Devsinc'],
    question: 'process.nextTick() vs microtasks (Promise.then) vs setImmediate() — execution order',
    answer: '1) `process.nextTick()` queue has the absolute highest priority: it runs immediately after the currently executing operation finishes, BEFORE the event loop advances to ANY microtask or next phase. 2) Promise microtask queue runs next, right after `process.nextTick()` queue empties. 3) `setImmediate()` runs during the Check phase of the event loop after the Poll phase. Order: synchronous code -> process.nextTick -> Promise.then -> event loop phases (Timers, Poll, Check = setImmediate).',
    keyPoints: [
      'Highest priority: process.nextTick.',
      'Second priority: Promise microtasks.',
      'Later in event loop check phase: setImmediate().',
      'Recursive process.nextTick() causes I/O starvation by never letting event loop advance.'
    ],
    codeSnippet: `console.log('1');
setImmediate(() => console.log('2 (setImmediate)'));
Promise.resolve().then(() => console.log('3 (Promise)'));
process.nextTick(() => console.log('4 (nextTick)'));
console.log('5');
// Output: 1, 5, 4, 3, 2`,
    quizOptions: [
      { text: 'setImmediate executes before process.nextTick', isCorrect: false },
      { text: 'Order: synchronous code -> process.nextTick -> Promise microtasks -> setImmediate (Check phase)', isCorrect: true },
      { text: 'Promise.then executes before process.nextTick in all scenarios', isCorrect: false },
      { text: 'All four execute in completely random order', isCorrect: false }
    ]
  },
  {
    id: 's2-q47',
    number: 157,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer'],
    question: 'How to build a basic REST API rate limiter from scratch in Node',
    answer: 'A rate limiter tracks the number of requests made by each client IP address within a rolling or fixed time window (e.g. 100 requests per 15 minutes). Implementation: 1) Extract client IP (`req.ip`). 2) Maintain an in-memory Map (or Redis store) mapping `ip -> { count, resetTime }`. 3) On each request, check if current timestamp exceeds `resetTime`: if so, reset count to 1. If within window and `count >= limit`, return HTTP 429 Too Many Requests with a `Retry-After` header. 4) Otherwise, increment count and call `next()`.',
    keyPoints: [
      'Track requests per IP or user token in a specified time window.',
      'Return HTTP 429 (Too Many Requests) when limit exceeded.',
      'Use Redis in production for distributed multi-instance clusters.'
    ],
    codeSnippet: `const rateLimitMap = new Map();
function rateLimiter(limit = 100, windowMs = 60000) {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const clientData = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > clientData.resetTime) {
      clientData.count = 0;
      clientData.resetTime = now + windowMs;
    }
    if (++clientData.count > limit) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    rateLimitMap.set(ip, clientData);
    next();
  };
}`,
    quizOptions: [
      { text: 'Rate limiters are hardware cards installed inside network switches', isCorrect: false },
      { text: 'Track request counts per IP in a time window using Map/Redis, returning HTTP 429 when threshold is passed', isCorrect: true },
      { text: 'Rate limiters require modifying the Node.js C++ kernel', isCorrect: false },
      { text: 'Return HTTP 200 with empty JSON when a rate limit is exceeded', isCorrect: false }
    ]
  },

  // ==============================================================
  // 4. EXPRESS.JS (10 QUESTIONS: #158 - #167)
  // ==============================================================
  {
    id: 's2-q48',
    number: 158,
    category: 'Express.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'Netsol'],
    question: 'What is Express.js? How does it differ from raw Node.js http module?',
    answer: 'Express is a minimal and flexible web application framework that sits on top of Node\'s built-in `http` module. Raw Node.js requires manual URL parsing, regex path matching, manual chunk concatenation to parse JSON request bodies (`req.on(\'data\')`), and repetitive header configuration. Express abstracts this boilerplate by providing a clean routing system, robust middleware pipeline, request/response helper methods (`res.json()`, `res.status()`, `req.params`), and template engine integration.',
    keyPoints: [
      'Wraps native http module with expressive routing and middleware.',
      'Automatic JSON body parsing via express.json().',
      'Provides helper methods like res.status().json() and req.params.'
    ],
    quizOptions: [
      { text: 'Express is a replacement runtime for Node.js', isCorrect: false },
      { text: 'A lightweight framework abstracting raw http module boilerplate with routing, middleware, and request/response helpers', isCorrect: true },
      { text: 'Express is a database ORM for MongoDB', isCorrect: false },
      { text: 'Express only works when connected to Apache web server', isCorrect: false }
    ]
  },
  {
    id: 's2-q49',
    number: 159,
    category: 'Express.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'How to create a basic Express server (step-by-step code)',
    answer: '1) Install dependencies: `npm install express`. 2) Import express. 3) Initialize app: `const app = express()`. 4) Add body-parsing middleware: `app.use(express.json())`. 5) Define route: `app.get(\'/api/health\', (req, res) => res.json({ status: \'ok\' }))`. 6) Bind to port: `app.listen(3000, () => console.log(\'Server on port 3000\'))`.',
    keyPoints: [
      'Initialize with const app = express().',
      'Mount express.json() to parse incoming JSON bodies.',
      'Define routes and call app.listen(port, callback).'
    ],
    codeSnippet: `import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
    quizOptions: [
      { text: 'Express servers must be started using python manage.py runserver', isCorrect: false },
      { text: 'Import express, initialize app, mount middleware (express.json), define routes, and call app.listen(port)', isCorrect: true },
      { text: 'Express apps cannot bind to port numbers higher than 100', isCorrect: false },
      { text: 'You must compile Express to C++ binaries before starting', isCorrect: false }
    ]
  },
  {
    id: 's2-q50',
    number: 160,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'Middleware chaining and next() — order of execution, what happens if next() is called twice',
    answer: 'Middleware functions execute in the exact chronological order they are registered via `app.use()` or route handlers. Calling `next()` hands over control to the subsequent middleware in the stack. What happens if `next()` is called twice: It attempts to execute the remainder of the pipeline a second time, which often leads to the infamous `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client` if both attempts send a response. Always return after calling `next()` if followed by other code (`return next()`).',
    keyPoints: [
      'Middleware executes in exact declaration order.',
      'Calling next() twice triggers ERR_HTTP_HEADERS_SENT.',
      'Always prefix terminal middleware branches with `return next()`.'
    ],
    quizOptions: [
      { text: 'Calling next() twice speeds up response times by 2x', isCorrect: false },
      { text: 'Middleware executes sequentially; calling next() twice causes ERR_HTTP_HEADERS_SENT if responses are sent', isCorrect: true },
      { text: 'next() restarts the server process from scratch', isCorrect: false },
      { text: 'Order of middleware declaration has no effect on execution order', isCorrect: false }
    ]
  },
  {
    id: 's2-q51',
    number: 161,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'Handling CORS in Express (what is CORS, why does it happen, cors middleware configuration)',
    answer: 'CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks web pages running on one origin (domain, protocol, or port, like `http://localhost:5173`) from making fetch/XHR requests to a different origin (like `http://localhost:3000`) unless the server explicitly sends HTTP headers allowing it. In Express, handle this with the `cors` package: `app.use(cors({ origin: "http://localhost:5173", credentials: true }))`. Browsers send preflight `OPTIONS` requests for non-simple requests, which the `cors` package answers automatically.',
    keyPoints: [
      'Browser security policy enforcing Same-Origin Policy.',
      'Configured with npm cors package.',
      'Must specify credentials: true if sending cookies or Authorization headers.',
      'Never use origin: "*" in production if authentication credentials are exchanged.'
    ],
    quizOptions: [
      { text: 'CORS is a Node.js compiler error caused by missing npm packages', isCorrect: false },
      { text: 'Browser security preventing unauthorized cross-origin requests; resolved using cors middleware with whitelisted origins', isCorrect: true },
      { text: 'CORS can be resolved by disabling antivirus software on client laptops', isCorrect: false },
      { text: 'Only Internet Explorer enforces CORS', isCorrect: false }
    ]
  },
  {
    id: 's2-q52',
    number: 162,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', '10Pearls'],
    question: 'How to structure routes in a large Express app (Router, controller pattern, services)',
    answer: 'In production Express architectures, maintain separation of concerns: 1) Routes layer (`/routes`): defines URL endpoints and connects them to controller functions via `express.Router()`. 2) Controllers layer (`/controllers`): extracts request parameters, validates input, calls service functions, and formats HTTP responses. 3) Services layer (`/services`): contains pure business logic and orchestrates database transactions or third-party APIs. 4) Models layer (`/models`): defines database schemas (Mongoose models).',
    keyPoints: [
      'Router -> Controller -> Service -> Model pattern.',
      'Controllers handle HTTP semantics (req, res, status codes).',
      'Services handle business logic independently of HTTP protocol.',
      'Modular route mounting via app.use("/api/invoices", invoiceRouter).'
    ],
    quizOptions: [
      { text: 'Put all database queries, routes, and HTML inside a single 10,000-line server.js file', isCorrect: false },
      { text: 'Separation of concerns: Routes (express.Router) -> Controllers (HTTP) -> Services (business logic) -> Models (DB)', isCorrect: true },
      { text: 'Express does not support routers', isCorrect: false },
      { text: 'Controllers must always be written in Python', isCorrect: false }
    ]
  },
  {
    id: 's2-q53',
    number: 163,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'Request data validation in Express (express-validator or Zod/Joi)',
    answer: 'Validating incoming data before passing it to database queries prevents injection attacks and corrupted data. Modern standard: Zod validation middleware. Define a schema (`invoiceSchema = z.object({ amount: z.number().positive(), clientName: z.string().min(2) })`), parse `req.body` inside a reusable validation middleware, and if parsing fails, format the Zod issues into a readable error payload and return HTTP 400 Bad Request immediately.',
    keyPoints: [
      'Validates request body, query params, and route params.',
      'Zod infers TypeScript types directly from the schema.',
      'Returns HTTP 400 Bad Request with field-specific error messages on failure.'
    ],
    quizOptions: [
      { text: 'Save data directly into MongoDB and catch errors when the database crashes', isCorrect: false },
      { text: 'Use schema validation (Zod, Joi, express-validator) middleware returning HTTP 400 with formatted field errors', isCorrect: true },
      { text: 'Validation is only needed on the React client side', isCorrect: false },
      { text: 'Zod can only validate boolean true/false values', isCorrect: false }
    ]
  },
  {
    id: 's2-q54',
    number: 164,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Systems Limited'],
    question: 'Authentication in Express API (JWT flow, token verification middleware, refresh tokens)',
    answer: 'Flow: 1) User logs in with email/password; server verifies hash with bcrypt and signs a short-lived access JWT (15m) and long-lived refresh token (7d). 2) Client attaches access token to requests in `Authorization: Bearer <token>` header (or HttpOnly cookie). 3) Verification middleware extracts token, validates signature with `jwt.verify()`, and attaches decoded user to `req.user`. 4) When access token expires (401), client calls `/api/auth/refresh` with refresh token to obtain a fresh access token without re-prompting login.',
    keyPoints: [
      'Short-lived Access Token (15 mins) + Long-lived Refresh Token (7 days).',
      'verifyToken middleware validates signature and attaches user to req.user.',
      'Store refresh tokens securely in HttpOnly, SameSite cookies to resist XSS.',
      'Revoke refresh tokens in database on logout.'
    ],
    quizOptions: [
      { text: 'Store access tokens in URL query strings without expiration dates', isCorrect: false },
      { text: 'JWT verification middleware, short-lived access tokens, and refresh token rotation in HttpOnly cookies', isCorrect: true },
      { text: 'JWT tokens are automatically verified by internet service providers', isCorrect: false },
      { text: 'Passwords should be stored as plain text inside JWT payloads', isCorrect: false }
    ]
  },
  {
    id: 's2-q55',
    number: 165,
    category: 'Express.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', '10Pearls'],
    question: 'app.use() vs app.get() — application-level middleware vs route handlers',
    answer: '`app.use()` mounts middleware that matches ANY HTTP method (GET, POST, PUT, DELETE, etc.) starting with the specified path prefix (e.g. `app.use(\'/api\', ...)` matches `/api/users`, `/api/orders`, etc.). `app.get()` mounts a route handler that strictly matches ONLY the HTTP GET method on an EXACT path match (or regex). `app.use()` is used for global tasks (logging, auth, CORS, static files), while `app.get()` handles specific resource retrieval.',
    keyPoints: [
      'app.use(): prefix-based matching for ALL HTTP verbs.',
      'app.get(): exact path matching for GET requests only.',
      'app.use() without path applies globally to every incoming request.'
    ],
    quizOptions: [
      { text: 'app.get() runs before app.use() regardless of code order', isCorrect: false },
      { text: 'app.use matches any HTTP method with prefix matching; app.get matches only HTTP GET on exact paths', isCorrect: true },
      { text: 'app.use cannot accept middleware functions', isCorrect: false },
      { text: 'app.get is used to configure database connections', isCorrect: false }
    ]
  },
  {
    id: 's2-q56',
    number: 166,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'File uploads in Express (multer middleware, diskStorage, memoryStorage, file size limits)',
    answer: 'Express does not parse multipart/form-data natively. Use `multer` middleware. Configuration options: `diskStorage` writes files directly to server disk/filesystem; `memoryStorage` keeps files in RAM as a `Buffer` (ideal for piping immediately to cloud storage like AWS S3 or Cloudinary without saving to local disk). Security best practices: enforce `limits: { fileSize: 5 * 1024 * 1024 }` (5MB cap), validate file MIME types using `fileFilter`, and sanitize filenames to prevent path traversal attacks.',
    keyPoints: [
      'multer handles multipart/form-data uploads.',
      'diskStorage for local saving; memoryStorage for direct cloud upload (S3).',
      'Always enforce limits (fileSize) and fileFilter (mimetype validation).'
    ],
    quizOptions: [
      { text: 'File uploads in Express are parsed automatically by express.json()', isCorrect: false },
      { text: 'Handled via multer middleware with diskStorage or memoryStorage, validating file size limits and MIME types', isCorrect: true },
      { text: 'Express can only upload text files smaller than 10KB', isCorrect: false },
      { text: 'File uploads must be converted into SQL INSERT queries manually', isCorrect: false }
    ]
  },
  {
    id: 's2-q57',
    number: 167,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Arbisoft'],
    question: 'Securing an Express app in production — checklist (helmet, cors, rate-limit, sanitize, env vars)',
    answer: 'Production security checklist: 1) `helmet`: sets essential HTTP security headers (CSP, HSTS, X-Content-Type-Options). 2) `cors`: restricts access to trusted client origins only. 3) `express-rate-limit`: prevents DDoS and brute-force attacks. 4) `mongo-sanitize`: strips `$` and `.` operators to stop NoSQL injection. 5) `hpp`: protects against HTTP Parameter Pollution. 6) Input validation with Zod. 7) Store secrets in `.env`, run behind HTTPS reverse proxy (Nginx), and never run Node as root user in Docker.',
    keyPoints: [
      'helmet: sets 15+ secure HTTP response headers.',
      'cors: restricts origins, preventing cross-site request hijacking.',
      'express-rate-limit: mitigates brute-force attacks.',
      'mongo-sanitize: neutralizes NoSQL injection keys ($gt, $where).'
    ],
    quizOptions: [
      { text: 'Disable SSL encryption to increase server speed', isCorrect: false },
      { text: 'Use helmet, strict CORS, express-rate-limit, mongo-sanitize, input validation (Zod), and HTTPS reverse proxy', isCorrect: true },
      { text: 'Run the Node.js server with root administrator privileges', isCorrect: false },
      { text: 'Security headers have no impact on web applications', isCorrect: false }
    ]
  }
];
