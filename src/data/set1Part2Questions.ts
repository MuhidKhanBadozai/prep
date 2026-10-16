import { Question } from '../types';

export const SET1_PART2_QUESTIONS: Question[] = [
  // ==========================================
  // PART 3: NEXT.JS (15 QUESTIONS: Q46 - Q60)
  // ==========================================
  {
    id: 's1-q46',
    number: 46,
    category: 'Next.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'Arbisoft'],
    question: 'What is Next.js and how is it different from React?',
    answer: 'Next.js is a full-stack React framework that provides server-side rendering (SSR), static site generation (SSG), file-based routing, API routes, and built-in optimizations. React is a client-side library for building user interfaces.',
    keyPoints: [
      'React is a UI library; Next.js is an opinionated full-stack production framework built on React.',
      'Provides SSR, SSG, ISR, and API route endpoints out-of-the-box.',
      'Automatic image optimization, font optimization, and zero-config bundling.'
    ],
    quizOptions: [
      { text: 'Next.js is a backend Python framework', isCorrect: false },
      { text: 'Next.js is a full-stack React framework with SSR, SSG, file routing, and built-in optimizations', isCorrect: true },
      { text: 'Next.js replaces React with Angular syntax', isCorrect: false },
      { text: 'Next.js only works with PostgreSQL databases', isCorrect: false }
    ]
  },
  {
    id: 's1-q47',
    number: 47,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'pieCyfer'],
    question: 'What are the rendering methods in Next.js?',
    answer: 'SSR (Server-Side Rendering) renders HTML per request. SSG (Static Site Generation) pre-renders HTML at build time. ISR (Incremental Static Regeneration) updates static pages in the background without rebuilding. CSR (Client-Side Rendering) renders in the browser.',
    keyPoints: [
      'SSR: Fresh HTML on every user request (dynamic data).',
      'SSG: Fast CDN-cached HTML generated once during build (blogs, docs).',
      'ISR: Stale-while-revalidate pattern updating static pages incrementally.',
      'CSR: Traditional React browser rendering with useEffect/fetch.'
    ],
    quizOptions: [
      { text: 'Only Client-Side Rendering is supported in Next.js', isCorrect: false },
      { text: 'SSR (per request), SSG (build time), ISR (background revalidation), and CSR (in browser)', isCorrect: true },
      { text: 'PHP-FPM rendering and ColdFusion rendering', isCorrect: false },
      { text: 'Next.js compiles everything to static PDF files', isCorrect: false }
    ]
  },
  {
    id: 's1-q48',
    number: 48,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Netsol', 'Systems Limited'],
    question: 'What is the difference between getStaticProps and getServerSideProps?',
    answer: '`getStaticProps` runs at build time for SSG, returning props for pre-rendered pages. `getServerSideProps` runs on every request for SSR, fetching fresh data on each page load. (In App Router, replaced by Server Components and fetch cache options).',
    keyPoints: [
      'getStaticProps: Build-time generation; fast TTFB from edge CDN cache.',
      'getServerSideProps: Per-request server computation; slower TTFB but always fresh.',
      'App Router replaces both with async Server Components: fetch(url, { cache: "force-cache" | "no-store" }).'
    ],
    quizOptions: [
      { text: 'getStaticProps only runs in production, getServerSideProps only runs in development', isCorrect: false },
      { text: 'getStaticProps runs at build time for SSG; getServerSideProps runs on every user request for SSR', isCorrect: true },
      { text: 'getServerSideProps cannot access request headers or cookies', isCorrect: false },
      { text: 'Both methods run in the user’s browser window', isCorrect: false }
    ]
  },
  {
    id: 's1-q49',
    number: 49,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'What is ISR (Incremental Static Regeneration)?',
    answer: 'ISR allows you to update static pages in the background after building the site, using `revalidate: seconds`. It provides the benefits of SSG (speed, SEO) with the freshness of SSR.',
    keyPoints: [
      'Stale-while-revalidate caching model for static pages.',
      'Initial visitor gets cached static HTML immediately; Next.js re-generates in background.',
      'Subsequent visitors get the updated page with zero rebuild downtime.'
    ],
    quizOptions: [
      { text: 'Recompiles the whole application from scratch every 60 seconds', isCorrect: false },
      { text: 'Updates individual static pages in the background without rebuilding the entire website', isCorrect: true },
      { text: 'A database indexing algorithm for MongoDB', isCorrect: false },
      { text: 'A tool to regenerate lost Git branches', isCorrect: false }
    ]
  },
  {
    id: 's1-q50',
    number: 50,
    category: 'Next.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Systems Limited'],
    question: 'What are API Routes in Next.js?',
    answer: 'API Routes let you create serverless API endpoints inside Next.js using files in `pages/api/` or `app/api/` (Route Handlers). They run server-side and don\'t increase client bundle size.',
    keyPoints: [
      'Enables full-stack backends without configuring an external Express server.',
      'In App Router: route.ts files exporting named HTTP methods (GET, POST, PUT, DELETE).',
      'Runs in Node.js or Edge runtime environments.'
    ],
    quizOptions: [
      { text: 'Third-party REST APIs consumed via external CDN links', isCorrect: false },
      { text: 'Serverless server-side API endpoints created directly inside the Next.js app directory', isCorrect: true },
      { text: 'React hooks that replace fetch()', isCorrect: false },
      { text: 'GraphQL schemas stored in JSON files', isCorrect: false }
    ]
  },
  {
    id: 's1-q51',
    number: 51,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Devsinc'],
    question: 'What is the App Router vs Pages Router?',
    answer: 'App Router (Next.js 13+) uses the `app/` directory, React Server Components by default, nested layouts, loading states, error boundaries, and streaming. Pages Router uses `pages/` directory with `_app.js` and client-side rendering with SSR/SSG functions.',
    keyPoints: [
      'App Router: app/ folder, React Server Components by default, folder-based routing with page.tsx.',
      'Supports special files: layout.tsx, template.tsx, loading.tsx, error.tsx, not-found.tsx.',
      'Pages Router: legacy pages/ folder, client components by default, getStaticProps/getServerSideProps.'
    ],
    quizOptions: [
      { text: 'App Router is designed only for mobile React Native apps', isCorrect: false },
      { text: 'App Router uses React Server Components, nested layouts, and streaming; Pages Router is the legacy system', isCorrect: true },
      { text: 'Pages Router is 10x faster than App Router in all metrics', isCorrect: false },
      { text: 'App Router removes support for dynamic URL parameters', isCorrect: false }
    ]
  },
  {
    id: 's1-q52',
    number: 52,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Arbisoft'],
    question: 'What are Server Components in Next.js?',
    answer: 'Server Components render on the server and send only HTML to the client — zero JavaScript added to the client bundle. Use `"use client"` directive at the top of a file to opt into Client Components when you need state, hooks, or event listeners.',
    keyPoints: [
      'Default in Next.js App Router; executed exclusively on the server.',
      'Direct access to backend resources (database queries, files, secrets) without API layers.',
      'Client components required for interactive elements (onClick, useState, useEffect).'
    ],
    quizOptions: [
      { text: 'Components that run inside Docker containers on AWS EC2 only', isCorrect: false },
      { text: 'Components rendered on the server with 0 client JS bundle size; "use client" marks interactive components', isCorrect: true },
      { text: 'React components converted to WebSockets', isCorrect: false },
      { text: 'A replacement for Node.js Express controllers', isCorrect: false }
    ]
  },
  {
    id: 's1-q53',
    number: 53,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', '10Pearls'],
    question: 'How does Next.js handle caching?',
    answer: 'Next.js has a 4-level caching system: Request Memoization (deduplicates fetch calls per render), Data Cache (caches fetch responses across requests), Full Route Cache (caches HTML/RSC payload on server), Router Cache (in-memory client-side cache of visited routes).',
    keyPoints: [
      'Request Memoization: dedupes identical GET fetch() calls in a single render pass.',
      'Data Cache: persistent HTTP fetch caching ({ next: { revalidate: 3600 } }).',
      'Full Route Cache: server-side static HTML/RSC caching.',
      'Router Cache: client-side SPA navigation cache in browser RAM.'
    ],
    quizOptions: [
      { text: 'Next.js never caches anything to ensure freshness', isCorrect: false },
      { text: 'A 4-tier cache: Request Memoization, Data Cache, Full Route Cache, and Router Cache', isCorrect: true },
      { text: 'Caching is solely managed by browser cookies', isCorrect: false },
      { text: 'Next.js requires an external Redis instance to cache any page', isCorrect: false }
    ]
  },
  {
    id: 's1-q54',
    number: 54,
    category: 'Next.js',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Arbisoft', 'Systems Limited'],
    question: 'What is Suspense + Streaming in Next.js?',
    answer: 'Streaming allows the server to progressively send rendered HTML chunks to the browser as they become ready. Wrap slow components in React `<Suspense fallback={<Skeleton />}>` so the fast parts of the page render immediately while the rest streams in.',
    keyPoints: [
      'Prevents slow database/API queries from blocking the entire page render.',
      'Renders instant visual feedback with skeletons.',
      'Streams HTML chunks over an open HTTP response using Transfer-Encoding: chunked.'
    ],
    quizOptions: [
      { text: 'Live video streaming using WebRTC', isCorrect: false },
      { text: 'Progressively sending rendered HTML chunks so fast UI displays while slow components load in Suspense', isCorrect: true },
      { text: 'A method for continuous audio synthesis in Next.js', isCorrect: false },
      { text: 'Streaming data from a torrent network', isCorrect: false }
    ]
  },
  {
    id: 's1-q55',
    number: 55,
    category: 'Next.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'pieCyfer'],
    question: 'How does Next.js handle images?',
    answer: 'The `next/image` component optimizes images automatically: lazy loading, responsive sizing (srcset), modern format conversion (WebP/AVIF), layout shift prevention (CLS) via required width/height or fill, and caching on demand.',
    keyPoints: [
      'Auto-resizes and serves modern image formats (WebP/AVIF).',
      'Lazy loads by default (loads as images scroll near viewport).',
      'Prevents Cumulative Layout Shift (CLS) by reserving dimensional space.'
    ],
    quizOptions: [
      { text: 'Converts all pictures into base64 strings in the JS bundle', isCorrect: false },
      { text: 'Auto-optimizes images via WebP/AVIF conversion, responsive sizes, lazy loading, and CLS prevention', isCorrect: true },
      { text: 'Next.js only supports PNG format', isCorrect: false },
      { text: 'Downloads images directly into the browser local storage', isCorrect: false }
    ]
  },
  {
    id: 's1-q56',
    number: 56,
    category: 'Next.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', 'Systems Limited'],
    question: 'What is file-based routing in Next.js?',
    answer: 'Routing is handled by the file system hierarchy. In App Router: `app/invoices/page.tsx` maps to `/invoices`, and `app/invoices/[id]/page.tsx` maps to `/invoices/:id` with dynamic parameters.',
    keyPoints: [
      'Folder structure directly maps to URL path structure.',
      'Square brackets `[id]` define dynamic segments accessible via params.',
      'Special route groups `(marketing)` organize files without affecting the URL path.'
    ],
    quizOptions: [
      { text: 'Writing URL routing rules inside an XML config file', isCorrect: false },
      { text: 'The filesystem directory structure defines URL paths (e.g. app/invoices/[id]/page.tsx)', isCorrect: true },
      { text: 'Routes are generated randomly by Next.js on server reboot', isCorrect: false },
      { text: 'Routes must be registered in Express server.listen', isCorrect: false }
    ]
  },
  {
    id: 's1-q57',
    number: 57,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Arbisoft'],
    question: 'How do you handle authentication in Next.js?',
    answer: 'Common approaches: NextAuth.js (Auth.js) for built-in OAuth and credential flows, JWT stored in HTTP-only cookies, or third-party providers (Clerk, Supabase, Firebase). Route protection is typically enforced in `middleware.ts`.',
    keyPoints: [
      'NextAuth.js (Auth.js): popular library supporting OAuth providers, session tokens, and database adapters.',
      'Store JWTs in Secure, HttpOnly cookies to prevent XSS theft.',
      'middleware.ts inspects cookies before executing page routes or API requests.'
    ],
    quizOptions: [
      { text: 'Save passwords in browser localStorage without encryption', isCorrect: false },
      { text: 'NextAuth.js, JWT in HttpOnly cookies, and server-side route guards in middleware.ts', isCorrect: true },
      { text: 'Next.js does not support authentication', isCorrect: false },
      { text: 'By prompting the user with window.prompt on every route change', isCorrect: false }
    ]
  },
  {
    id: 's1-q58',
    number: 58,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'How do you revalidate data after a mutation in Next.js?',
    answer: 'Use `revalidatePath(\'/invoices\')` to purge cached data for a specific route, or `revalidateTag(\'invoices\')` to purge all fetch requests tagged with that cache key inside Server Actions or Route Handlers.',
    keyPoints: [
      'revalidatePath(path): invalidates cache for a specific URL path.',
      'revalidateTag(tag): granular cache invalidation across all fetches tagged with { tags: [tag] }.',
      'Server Actions mutate database and revalidate cache in a single atomic server call.'
    ],
    quizOptions: [
      { text: 'Restart the entire Next.js server cluster', isCorrect: false },
      { text: 'Call revalidatePath(path) or revalidateTag(tag) inside Server Actions or API Route Handlers', isCorrect: true },
      { text: 'Delete the user’s browser cache with window.location.reload()', isCorrect: false },
      { text: 'Run npm run build again on production', isCorrect: false }
    ]
  },
  {
    id: 's1-q59',
    number: 59,
    category: 'Next.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Netsol'],
    question: 'What is useRouter in Next.js?',
    answer: 'In App Router, `useRouter` from `next/navigation` gives client components programmatic navigation methods: `router.push(\'/url\')`, `router.replace()`, `router.refresh()`, and `router.back()`.',
    keyPoints: [
      'Imported from next/navigation (in App Router, not next/router).',
      'router.push(): navigates to new route adding history entry.',
      'router.refresh(): refreshes the current route by requesting updated server components without wiping client state.'
    ],
    quizOptions: [
      { text: 'A hardware network router configuration tool', isCorrect: false },
      { text: 'A client-side hook from next/navigation providing programmatic navigation (push, replace, refresh)', isCorrect: true },
      { text: 'A server component utility for reading SQL queries', isCorrect: false },
      { text: 'A replacement for CSS media queries', isCorrect: false }
    ]
  },
  {
    id: 's1-q60',
    number: 60,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'How do you deploy a Next.js application?',
    answer: 'Vercel (native platform with zero config, edge functions, and ISR support), Docker container (`standalone` output in `next.config.js` for AWS, GCP, Cloud Run, or DigitalOcean), or static export (`output: "export"` for S3/Cloudflare Pages).',
    keyPoints: [
      'Vercel: official zero-configuration deployment platform.',
      'Docker / Node server: output: "standalone" bundles minimal Node server for containerized environments.',
      'Static export (next export): generates HTML/CSS/JS files for S3 or GitHub Pages (disables dynamic SSR).'
    ],
    quizOptions: [
      { text: 'By emailing the source code zip file to Google Cloud', isCorrect: false },
      { text: 'Vercel for zero-config edge hosting, Docker standalone output for Cloud Run/AWS, or static export', isCorrect: true },
      { text: 'Next.js can only run locally on localhost:3000', isCorrect: false },
      { text: 'By copying node_modules directly onto an FTP server', isCorrect: false }
    ]
  },

  // ==========================================
  // PART 4: NODE.JS (15 QUESTIONS: Q61 - Q75)
  // ==========================================
  {
    id: 's1-q61',
    number: 61,
    category: 'Node.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer', 'Devsinc'],
    question: 'What is Node.js and why is it popular?',
    answer: 'Node.js is an open-source, cross-platform JavaScript runtime environment built on Chrome\'s V8 JavaScript engine. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, enabling developers to use JavaScript on both frontend and backend.',
    keyPoints: [
      'Built on Google Chrome\'s high-performance V8 engine.',
      'Single-threaded event loop with non-blocking, asynchronous I/O.',
      'Unified JavaScript language stack across client and server.'
    ],
    quizOptions: [
      { text: 'A frontend CSS framework written in Ruby', isCorrect: false },
      { text: 'A cross-platform JavaScript runtime built on V8 with an event-driven, non-blocking I/O model', isCorrect: true },
      { text: 'A relational database management system', isCorrect: false },
      { text: 'An operating system kernel replacement', isCorrect: false }
    ]
  },
  {
    id: 's1-q62',
    number: 62,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'What is the Event Loop in Node.js?',
    answer: 'The event loop allows Node.js to perform non-blocking I/O operations despite being single-threaded, by offloading operations to the system kernel whenever possible. Phases: Timers -> Pending callbacks -> Idle/Prepare -> Poll -> Check -> Close callbacks.',
    keyPoints: [
      'Coordinates async callbacks across distinct execution phases.',
      'Phases in order: Timers -> Pending callbacks -> Poll -> Check (setImmediate) -> Close.',
      'Microtasks (process.nextTick & Promise callbacks) run between each phase.'
    ],
    quizOptions: [
      { text: 'A while loop that burns 100% CPU waiting for network packets', isCorrect: false },
      { text: 'An orchestration loop handling non-blocking I/O across phases (Timers, Poll, Check, Close)', isCorrect: true },
      { text: 'A multi-threaded queue that executes JavaScript across 16 CPUs simultaneously', isCorrect: false },
      { text: 'A frontend browser animation ticker', isCorrect: false }
    ]
  },
  {
    id: 's1-q63',
    number: 63,
    category: 'Node.js',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Arbisoft', 'Devsinc'],
    question: 'What is the difference between process.nextTick() and setImmediate()?',
    answer: '`process.nextTick()` fires immediately after the currently executing operation completes, before the event loop continues to the next phase. `setImmediate()` fires on the next iteration of the event loop during the "check" phase.',
    keyPoints: [
      'process.nextTick(): runs immediately before the event loop advances (highest priority microtask queue).',
      'setImmediate(): runs in the Check phase of the event loop after Poll.',
      'Starvation risk: recursive process.nextTick() blocks the event loop from reaching I/O.'
    ],
    quizOptions: [
      { text: 'setImmediate runs before process.nextTick in all cases', isCorrect: false },
      { text: 'process.nextTick runs immediately before moving to the next event loop phase; setImmediate runs in the Check phase', isCorrect: true },
      { text: 'process.nextTick is only for child processes', isCorrect: false },
      { text: 'Both are aliases for setTimeout(fn, 0)', isCorrect: false }
    ]
  },
  {
    id: 's1-q64',
    number: 64,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Systems Limited'],
    question: 'How does Node.js handle concurrency if it\'s single-threaded?',
    answer: 'Node.js uses libuv and a thread pool (default 4 threads) for I/O operations (file system, DNS, crypto). While JavaScript execution is single-threaded, asynchronous I/O tasks are delegated to libuv or the OS kernel, notifying the event loop upon completion.',
    keyPoints: [
      'Single main thread executes all user JavaScript code.',
      'libuv thread pool (UV_THREADPOOL_SIZE) handles blocking operations (fs, crypto, zlib).',
      'OS-level asynchronous primitives (epoll, kqueue) handle network socket concurrency.'
    ],
    quizOptions: [
      { text: 'Node.js spawns a new OS process for every incoming HTTP request', isCorrect: false },
      { text: 'Offloads I/O tasks to OS async primitives and libuv thread pool, executing callbacks on the single JS thread', isCorrect: true },
      { text: 'It pauses all incoming requests until the previous request terminates', isCorrect: false },
      { text: 'Concurrency is not supported in Node.js', isCorrect: false }
    ]
  },
  {
    id: 's1-q65',
    number: 65,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Netsol'],
    question: 'What are Streams in Node.js?',
    answer: 'Streams are objects that let you read data from a source or write data to a destination in continuous chunks. Types: Readable, Writable, Duplex, Transform. They prevent loading massive files into RAM and enable backpressure management.',
    keyPoints: [
      'Processes data piece-by-piece without loading entire payload into RAM.',
      'Types: Readable (fs.createReadStream), Writable (res.write), Duplex (net.Socket), Transform (zlib.createGzip).',
      'Piping (`readable.pipe(writable)`) automatically manages flow control and backpressure.'
    ],
    quizOptions: [
      { text: 'Water pipes used for cooling data center servers', isCorrect: false },
      { text: 'Continuous chunk-based data channels (Readable, Writable, Duplex, Transform) preventing RAM exhaustion', isCorrect: true },
      { text: 'Audio streaming algorithms for Spotify bots', isCorrect: false },
      { text: 'A syntax replacement for JavaScript arrays', isCorrect: false }
    ]
  },
  {
    id: 's1-q66',
    number: 66,
    category: 'Node.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', 'Systems Limited'],
    question: 'What is the difference between var, let, and const?',
    answer: '`var` is function-scoped and hoisted with undefined. `let` and `const` are block-scoped and live in the Temporal Dead Zone until initialized. `const` cannot be reassigned (though objects assigned to const can still be mutated).',
    keyPoints: [
      'var: function-scoped, re-declarable, hoisted as undefined.',
      'let: block-scoped ({}), re-assignable, Temporal Dead Zone before declaration.',
      'const: block-scoped, non-reassignable binding, requires immediate initialization.'
    ],
    quizOptions: [
      { text: 'var is block-scoped, let is function-scoped, const is global', isCorrect: false },
      { text: 'var is function-scoped and hoisted; let and const are block-scoped with TDZ; const cannot be reassigned', isCorrect: true },
      { text: 'const makes objects deeply immutable automatically', isCorrect: false },
      { text: 'let and const can be re-declared within the same block scope', isCorrect: false }
    ]
  },
  {
    id: 's1-q67',
    number: 67,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'pieCyfer'],
    question: 'What is a closure in JavaScript?',
    answer: 'A closure is a function that remembers and accesses variables from its outer lexical scope even after that outer function has returned. Used for data privacy, currying, and maintaining state.',
    keyPoints: [
      'Lexical scope bundling: function + outer scope references.',
      'Allows private encapsulation (e.g. counter or module pattern).',
      'Keeps outer variables alive in heap memory as long as the closure is referenced.'
    ],
    quizOptions: [
      { text: 'The closing tag in an HTML document', isCorrect: false },
      { text: 'A function retaining access to variables from its outer lexical environment after the outer function has returned', isCorrect: true },
      { text: 'Terminating a Node.js process with process.exit()', isCorrect: false },
      { text: 'A syntax error caused by missing curly brackets', isCorrect: false }
    ]
  },
  {
    id: 's1-q68',
    number: 68,
    category: 'Node.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', '10Pearls'],
    question: 'What are Promises and how do they work?',
    answer: 'A Promise represents the eventual completion or failure of an asynchronous operation. States: Pending, Fulfilled, Rejected. Handled via `.then()`, `.catch()`, `.finally()`, or `async/await`.',
    keyPoints: [
      'Three mutually exclusive states: Pending -> Fulfilled (resolved) or Rejected (error).',
      'Avoids callback hell and enables clean chaining of async steps.',
      'async/await provides clean synchronous-looking syntax over Promises.'
    ],
    quizOptions: [
      { text: 'A verbal agreement made between developer and client', isCorrect: false },
      { text: 'An object representing the eventual result of an async operation with Pending, Fulfilled, and Rejected states', isCorrect: true },
      { text: 'A synchronous sleep function in JavaScript', isCorrect: false },
      { text: 'A cryptographic key exchange protocol', isCorrect: false }
    ]
  },
  {
    id: 's1-q69',
    number: 69,
    category: 'Node.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'Devsinc'],
    question: 'What is middleware in Node.js?',
    answer: 'Middleware functions have access to the request object (`req`), response object (`res`), and the next middleware function (`next`). They execute code, modify req/res, end the request cycle, or pass control to the next middleware.',
    keyPoints: [
      'Pipeline pattern: fn(req, res, next).',
      'Must either send a response (res.json()) or call next() to avoid hanging requests.',
      'Common uses: logging (morgan), parsing (express.json), auth validation, CORS.'
    ],
    quizOptions: [
      { text: 'Hardware router connecting web servers to DNS', isCorrect: false },
      { text: 'Functions with access to (req, res, next) that process requests sequentially in the HTTP pipeline', isCorrect: true },
      { text: 'Software connecting databases directly to frontend browsers', isCorrect: false },
      { text: 'A compiler converting Node.js to C++', isCorrect: false }
    ]
  },
  {
    id: 's1-q70',
    number: 70,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Systems Limited'],
    question: 'What is clustering in Node.js?',
    answer: 'Clustering allows you to spawn multiple child processes (workers) that share the same server port, taking advantage of multi-core CPU systems. In production, PM2 or container orchestration (Kubernetes) is commonly used to manage cluster workers.',
    keyPoints: [
      'Overcomes single-thread CPU bottleneck by spawning a worker process per CPU core.',
      'Master process routes incoming TCP connections among workers using round-robin.',
      'Tools like PM2 (pm2 start app.js -i max) automate cluster management.'
    ],
    quizOptions: [
      { text: 'Group of database tables stored on one hard disk', isCorrect: false },
      { text: 'Spawning multiple worker processes sharing the same port to utilize all CPU cores', isCorrect: true },
      { text: 'Running Node.js inside a web browser worker thread', isCorrect: false },
      { text: 'Combining multiple npm packages into one bundle', isCorrect: false }
    ]
  },
  {
    id: 's1-q71',
    number: 71,
    category: 'Node.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'What is the purpose of package.json?',
    answer: 'It\'s the manifest file for a Node.js project. It contains metadata (name, version), scripts, dependencies, devDependencies, license, and project configuration.',
    keyPoints: [
      'Project manifest defining dependencies and devDependencies.',
      'Declares custom executable scripts (`npm run build`, `npm run dev`).',
      'Defines module resolution format (`"type": "module"` for ES Modules).'
    ],
    quizOptions: [
      { text: 'Stores database passwords securely on git', isCorrect: false },
      { text: 'The project manifest containing metadata, npm run scripts, dependencies, and configuration', isCorrect: true },
      { text: 'The compiled binary of the Node.js runtime', isCorrect: false },
      { text: 'An operating system log file', isCorrect: false }
    ]
  },
  {
    id: 's1-q72',
    number: 72,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'What is the difference between CommonJS and ES Modules?',
    answer: 'CommonJS uses `require()` and `module.exports`, loads synchronously, and is the traditional Node.js standard. ES Modules use `import`/`export`, load asynchronously, support tree-shaking, and are the official JavaScript language standard.',
    keyPoints: [
      'CommonJS: const x = require("x"); module.exports = y; synchronous loading at runtime.',
      'ES Modules: import x from "x"; export default y; static analysis, tree-shaking.',
      'Enabled in Node via `"type": "module"` in package.json or `.mjs` file extension.'
    ],
    quizOptions: [
      { text: 'CommonJS is for browsers only, ES Modules are for Node.js only', isCorrect: false },
      { text: 'CommonJS uses require() synchronously; ES Modules use static import/export with tree-shaking', isCorrect: true },
      { text: 'CommonJS cannot import external npm packages', isCorrect: false },
      { text: 'ES Modules were deprecated in Node 18', isCorrect: false }
    ]
  },
  {
    id: 's1-q73',
    number: 73,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Netsol', 'Arbisoft'],
    question: 'How do you handle errors in Node.js?',
    answer: 'Use try/catch for synchronous code and async/await, handle promise `.catch()`, use centralized error-handling middleware `(err, req, res, next)` in Express, listen for `uncaughtException` and `unhandledRejection` events, and use custom operational error classes.',
    keyPoints: [
      'Centralized Express error middleware: function(err, req, res, next) with 4 arguments.',
      'Distinguish operational errors (predictable bad input) from programmer bugs.',
      'Always catch rejected promises to avoid process termination.'
    ],
    quizOptions: [
      { text: 'Ignore errors and let the server restart automatically on every error', isCorrect: false },
      { text: 'try/catch with async/await, centralized 4-param error middleware, and process event listeners', isCorrect: true },
      { text: 'Errors cannot be caught in asynchronous JavaScript', isCorrect: false },
      { text: 'By putting all code inside an infinite while loop', isCorrect: false }
    ]
  },
  {
    id: 's1-q74',
    number: 74,
    category: 'Node.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'pieCyfer'],
    question: 'What is the purpose of Buffer in Node.js?',
    answer: 'Buffer is a global class used to handle raw binary data directly outside the V8 JavaScript heap. Used for file system operations, TCP streams, cryptography, and image processing.',
    keyPoints: [
      'Allocates fixed-size raw memory chunks outside the V8 heap.',
      'Buffer.from(), Buffer.alloc(), and Buffer.concat() methods.',
      'Crucial for reading binary file streams, network packets, and crypto hashes.'
    ],
    quizOptions: [
      { text: 'A temporary text editor inside terminal', isCorrect: false },
      { text: 'A global class for handling raw binary data directly in memory outside the V8 heap', isCorrect: true },
      { text: 'A cache for storing SQL query results in Redis', isCorrect: false },
      { text: 'A tool for slowing down API responses', isCorrect: false }
    ]
  },
  {
    id: 's1-q75',
    number: 75,
    category: 'Node.js',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Systems Limited', '10Pearls'],
    question: 'How do you optimize Node.js performance?',
    answer: 'Use clustering/PM2, stream large datasets, implement Redis caching, offload CPU-intensive tasks to worker threads or microservices, use gzip compression, keep npm dependencies lean, and profile with clinic.js or Chrome DevTools.',
    keyPoints: [
      'Never block the event loop with synchronous computation (e.g. heavy JSON.parse or crypto).',
      'Use streaming to avoid high memory spikes on large uploads/downloads.',
      'Implement in-memory caching with Redis for hot endpoints.'
    ],
    quizOptions: [
      { text: 'Convert all async code to synchronous for immediate execution', isCorrect: false },
      { text: 'Clustering/PM2, streaming, Redis caching, worker threads for CPU tasks, and gzip compression', isCorrect: true },
      { text: 'Disable all logging and remove all comments', isCorrect: false },
      { text: 'Run 100 Express servers on port 80 simultaneously', isCorrect: false }
    ]
  },

  // ==========================================
  // PART 5: EXPRESS.JS (10 QUESTIONS: Q76 - Q85)
  // ==========================================
  {
    id: 's1-q76',
    number: 76,
    category: 'Express.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'pieCyfer'],
    question: 'What is Express.js and how does it relate to Node.js?',
    answer: 'Express.js is a minimal and flexible web application framework built on top of Node.js\'s `http` module. It provides routing, middleware support, template engines, and simplified request/response handling.',
    keyPoints: [
      'De-facto standard lightweight web server framework for Node.js.',
      'Abstracts cumbersome native Node http module (createServer, req.on("data")).',
      'Provides robust routing, HTTP utility methods, and rich middleware ecosystem.'
    ],
    quizOptions: [
      { text: 'A database driver for PostgreSQL', isCorrect: false },
      { text: 'A lightweight web framework built on Node.js http module simplifying routing and middleware', isCorrect: true },
      { text: 'A CSS styling library for web components', isCorrect: false },
      { text: 'A compiled programming language that replaces JavaScript', isCorrect: false }
    ]
  },
  {
    id: 's1-q77',
    number: 77,
    category: 'Express.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['10Pearls', 'Netsol'],
    question: 'Explain middleware in Express.js.',
    answer: 'Middleware functions execute during the request-response cycle. They receive `(req, res, next)`. Types: Application-level (`app.use`), Router-level (`router.use`), Error-handling (`(err, req, res, next)`), Built-in (`express.json`), and Third-party (`cors`, `helmet`).',
    keyPoints: [
      '5 core types: Application, Router, Error-handling, Built-in, Third-party.',
      'Chained sequentially; calling next() transfers control to the next handler.',
      'If next(err) is called with an argument, Express skips to error middleware.'
    ],
    quizOptions: [
      { text: 'Functions that only run when the database disconnects', isCorrect: false },
      { text: 'Functions executing in the request-response cycle with access to req, res, and next()', isCorrect: true },
      { text: 'HTML scripts inserted into React components', isCorrect: false },
      { text: 'Background cron jobs running on Linux servers', isCorrect: false }
    ]
  },
  {
    id: 's1-q78',
    number: 78,
    category: 'Express.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', 'Systems Limited'],
    question: 'How does routing work in Express.js?',
    answer: 'Routing maps HTTP methods and URL paths to handler functions. Express provides `app.get()`, `app.post()`, `app.put()`, `app.delete()`, and `express.Router()` for modular, mountable route handlers.',
    keyPoints: [
      'express.Router() encapsulates modular sub-routes (e.g. app.use("/api/users", userRouter)).',
      'Supports route parameters (`req.params.id`) and query parameters (`req.query.search`).',
      'Matches routes in order of declaration from top to bottom.'
    ],
    quizOptions: [
      { text: 'Using static XML configuration files', isCorrect: false },
      { text: 'Mapping HTTP methods and paths to handler functions using app.METHOD and express.Router()', isCorrect: true },
      { text: 'By scanning HTML hyperlinks on client computers', isCorrect: false },
      { text: 'Via Apache mod_rewrite rules only', isCorrect: false }
    ]
  },
  {
    id: 's1-q79',
    number: 79,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', '10Pearls'],
    question: 'How do you handle errors in Express.js?',
    answer: 'Define an error-handling middleware function with four parameters: `(err, req, res, next)`. It must be registered after all route handlers. For async errors in Express 4, pass errors to `next(err)` or use express-async-errors.',
    keyPoints: [
      'Express recognizes error handlers by their exact 4-parameter signature: (err, req, res, next).',
      'Must be placed at the very end of middleware pipeline after all routes.',
      'Express 5 natively catches unhandled promise rejections in route handlers.'
    ],
    quizOptions: [
      { text: 'Define middleware with 2 parameters (req, res)', isCorrect: false },
      { text: 'Define 4-parameter middleware (err, req, res, next) registered after all routes', isCorrect: true },
      { text: 'Restart the server whenever an error is thrown', isCorrect: false },
      { text: 'Let errors bubble to the client console without responding', isCorrect: false }
    ]
  },
  {
    id: 's1-q80',
    number: 80,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Systems Limited'],
    question: 'What is CORS and how do you configure it in Express?',
    answer: 'CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts HTTP requests from different origins. In Express, configure it using the `cors` package: `app.use(cors({ origin: "http://allowed-domain.com", credentials: true }))`.',
    keyPoints: [
      'Browser security preventing unauthorized cross-origin AJAX/fetch requests.',
      'Server sends Access-Control-Allow-Origin, Access-Control-Allow-Methods headers.',
      'Always whitelist specific trusted origins in production; avoid wildcards (*) with credentials.'
    ],
    quizOptions: [
      { text: 'A database query language for MongoDB', isCorrect: false },
      { text: 'A browser security mechanism restricting cross-origin requests; configured in Express via cors middleware', isCorrect: true },
      { text: 'An encryption protocol for SSL certificates', isCorrect: false },
      { text: 'A tool to compress image files on Express', isCorrect: false }
    ]
  },
  {
    id: 's1-q81',
    number: 81,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Netsol'],
    question: 'How do you validate request data in Express?',
    answer: 'Use schema validation libraries like Zod, Joi, or express-validator. Create a validation middleware that validates `req.body`, `req.params`, or `req.query` against the schema and returns 400 Bad Request with formatted errors on failure.',
    keyPoints: [
      'Validate at the controller entry point before touching database logic.',
      'Zod provides TypeScript type inference: type UserInput = z.infer<typeof userSchema>.',
      'Return 400 status with structured error messages describing each invalid field.'
    ],
    quizOptions: [
      { text: 'Assume all client data is clean and valid without checking', isCorrect: false },
      { text: 'Validation middleware using Zod, Joi, or express-validator returning 400 Bad Request on error', isCorrect: true },
      { text: 'Validation can only be handled on client forms in React', isCorrect: false },
      { text: 'By saving data directly to the database and letting it fail', isCorrect: false }
    ]
  },
  {
    id: 's1-q82',
    number: 82,
    category: 'Express.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'What is the purpose of app.use()?',
    answer: '`app.use()` binds middleware functions to the Express application. It can apply middleware globally to all routes, or scoped to a specific path prefix: `app.use(\'/api\', apiRouter)`.',
    keyPoints: [
      'Registers middleware for all HTTP methods (GET, POST, PUT, DELETE).',
      'Path matching is prefix-based: app.use("/users", ...) matches /users, /users/1, /users/profile.',
      'Executes middleware in the exact order declared.'
    ],
    quizOptions: [
      { text: 'Only handles HTTP GET requests', isCorrect: false },
      { text: 'Binds middleware functions globally or scoped to a specific path prefix for all HTTP methods', isCorrect: true },
      { text: 'Starts the Express web server listening on a port', isCorrect: false },
      { text: 'Imports external npm packages into the project', isCorrect: false }
    ]
  },
  {
    id: 's1-q83',
    number: 83,
    category: 'Express.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'How do you serve static files in Express?',
    answer: 'Use the built-in middleware: `app.use(express.static(path.join(__dirname, "public")))`. It automatically serves files (HTML, CSS, images, JS) from the designated directory with proper MIME types.',
    keyPoints: [
      'Built-in middleware express.static("public").',
      'Serves static assets with appropriate Content-Type headers.',
      'Can configure caching headers: { maxAge: "1d" } for CDN efficiency.'
    ],
    quizOptions: [
      { text: 'Read each file manually using fs.readFileSync in every route handler', isCorrect: false },
      { text: 'Use built-in middleware app.use(express.static("public")) with directory path', isCorrect: true },
      { text: 'Express cannot serve static files', isCorrect: false },
      { text: 'Upload files to YouTube and link them', isCorrect: false }
    ]
  },
  {
    id: 's1-q84',
    number: 84,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Arbisoft'],
    question: 'How do you implement authentication in Express?',
    answer: 'Extract JWT from `Authorization: Bearer <token>` header, verify token with `jwt.verify(token, SECRET)`, attach decoded user payload to `req.user`, and call `next()`. If token is invalid or missing, respond with 401 Unauthorized.',
    keyPoints: [
      'Extract token from req.headers.authorization.',
      'Verify signature and expiration with jsonwebtoken.',
      'Store decoded claims on req.user for downstream controllers to consume.'
    ],
    quizOptions: [
      { text: 'Allow any user to send their user ID in the query string without verification', isCorrect: false },
      { text: 'Auth middleware extracting Bearer JWT, verifying signature, attaching req.user, or returning 401', isCorrect: true },
      { text: 'Save passwords in plaintext inside request cookies', isCorrect: false },
      { text: 'Authentication is solely the database\'s responsibility', isCorrect: false }
    ]
  },
  {
    id: 's1-q85',
    number: 85,
    category: 'Express.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Devsinc'],
    question: 'What is rate limiting and how do you implement it?',
    answer: 'Rate limiting restricts the number of requests a client can make within a specified time window. Prevents brute-force attacks and DDoS. Implement in Express using `express-rate-limit` with memory or Redis storage.',
    keyPoints: [
      'Mitigates brute-force attacks, credential stuffing, and DDoS.',
      'Returns HTTP 429 Too Many Requests when threshold exceeded.',
      'Use express-rate-limit backed by Redis (rate-limit-redis) for distributed multi-server setups.'
    ],
    quizOptions: [
      { text: 'Slowing down internet connection cables', isCorrect: false },
      { text: 'Restricting the number of requests per IP/user in a time window to prevent brute-force and DDoS (HTTP 429)', isCorrect: true },
      { text: 'Limiting the number of lines of code in Express routes', isCorrect: false },
      { text: 'Limiting database storage size to 10MB', isCorrect: false }
    ]
  },

  // ==========================================
  // PART 6: GSAP ANIMATIONS (10 QUESTIONS: Q86 - Q95)
  // ==========================================
  {
    id: 's1-q86',
    number: 86,
    category: 'GSAP',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Arbisoft', 'VentureDive', '10Pearls'],
    question: 'What is GSAP and why use it over CSS animations?',
    answer: 'GSAP (GreenSock Animation Platform) is a JavaScript animation library that works across all browsers. It handles complex sequences, timelines, scroll-driven animations (ScrollTrigger), SVG animations, and performance optimizations that pure CSS cannot easily achieve.',
    keyPoints: [
      'High-performance JavaScript animation engine with 60fps smoothing.',
      'Precise sequence control via Timelines that CSS keyframes cannot match.',
      'Rich ecosystem: ScrollTrigger, SplitText, MorphSVG, Flip plugin.'
    ],
    quizOptions: [
      { text: 'A database query builder for PostgreSQL', isCorrect: false },
      { text: 'A robust JS animation engine providing timelines, ScrollTrigger, SVG morphing, and cross-browser consistency', isCorrect: true },
      { text: 'A video editing software for macOS', isCorrect: false },
      { text: 'A replacement for HTML canvas', isCorrect: false }
    ]
  },
  {
    id: 's1-q87',
    number: 87,
    category: 'GSAP',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'What is the difference between gsap.to() and gsap.from()?',
    answer: '`gsap.to()` animates elements from their current values to the values specified in the tween. `gsap.from()` animates elements from the values specified in the tween to their current (pre-existing) CSS values.',
    keyPoints: [
      'gsap.to(target, { ... }): from current state -> to specified target state.',
      'gsap.from(target, { ... }): from specified state -> to existing CSS natural state.',
      'gsap.fromTo(target, { fromVars }, { toVars }): explicitly specifies both start and end points.'
    ],
    quizOptions: [
      { text: 'gsap.to() runs backwards; gsap.from() runs forwards', isCorrect: false },
      { text: 'gsap.to() animates from current values to specified values; gsap.from() animates from specified values to natural CSS state', isCorrect: true },
      { text: 'gsap.from() can only animate text elements', isCorrect: false },
      { text: 'gsap.to() only works on SVG elements', isCorrect: false }
    ]
  },
  {
    id: 's1-q88',
    number: 88,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', '10Pearls'],
    question: 'What is a GSAP timeline?',
    answer: 'A timeline (`gsap.timeline()`) is a container for tweens that lets you sequence animations without messy delays. You can pause, play, reverse, seek, adjust timescale, and control multiple animations as a cohesive unit.',
    keyPoints: [
      'Sequences multiple tweens cleanly without manual delay calculations.',
      'Supports position parameter: relative offsets (`"+=0.2"`), labels, or sync (`"<"`).',
      'Global playback controls: tl.pause(), tl.reverse(), tl.timeScale(2).'
    ],
    quizOptions: [
      { text: 'A chronological list of git commits in your repository', isCorrect: false },
      { text: 'A container sequencing multiple tweens with precise timing, position parameters, and playback controls', isCorrect: true },
      { text: 'A Gantt chart component for project management', isCorrect: false },
      { text: 'A timeline feature inside Twitter API', isCorrect: false }
    ]
  },
  {
    id: 's1-q89',
    number: 89,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'VentureDive'],
    question: 'What is ScrollTrigger in GSAP?',
    answer: 'ScrollTrigger is a GSAP plugin that triggers or scrubs animations based on scroll position. Features include pin elements in place, scrubbing animations to scrollbar movement, markers for debugging, and responsive triggers.',
    keyPoints: [
      'Connects animations to viewport scroll position.',
      'scrub: true links animation playback directly to user scrollbar position.',
      'pin: true fixes elements in place while animations execute.'
    ],
    quizOptions: [
      { text: 'An infinite scroll plugin for fetching pagination data from MongoDB', isCorrect: false },
      { text: 'A GSAP plugin driving animations based on scroll position with scrubbing, pinning, and triggers', isCorrect: true },
      { text: 'A mouse wheel event listener replacement for gaming mice', isCorrect: false },
      { text: 'A CSS pseudo-selector for scrollbars', isCorrect: false }
    ]
  },
  {
    id: 's1-q90',
    number: 90,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Arbisoft'],
    question: 'Which CSS properties should you animate with GSAP for best performance?',
    answer: 'Animate `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`. These are GPU-accelerated and don\'t trigger layout reflow or repainting. Avoid animating `width`, `height`, `top`, `left`, or `margin`.',
    keyPoints: [
      'Stick to transform (x, y, scale, rotation) and opacity for GPU composition.',
      'Properties like top/left and width/height cause expensive layout reflows on the main thread.',
      'Use will-change: transform or force3D: true when appropriate.'
    ],
    quizOptions: [
      { text: 'Always animate width, height, margin, and padding', isCorrect: false },
      { text: 'Transform (x, y, scale, rotation) and opacity because they are GPU-composited without layout reflow', isCorrect: true },
      { text: 'Animate border-style and font-family for maximum speed', isCorrect: false },
      { text: 'CSS properties cannot be GPU-accelerated by JavaScript', isCorrect: false }
    ]
  },
  {
    id: 's1-q91',
    number: 91,
    category: 'GSAP',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', '10Pearls'],
    question: 'What are staggered animations in GSAP?',
    answer: 'Stagger animates a list of elements with a slight delay between each element: `gsap.to(".card", { y: 0, opacity: 1, stagger: 0.1 })`. Can configure start position (from: "center", "random") and grid alignments.',
    keyPoints: [
      'Applies incremental delay to matching array/selector of elements.',
      'Creates fluid cascade effects for list items, nav links, and grids.',
      'Advanced options: { each: 0.1, from: "center", ease: "power1.inOut" }.'
    ],
    quizOptions: [
      { text: 'Animations that shake violently like an earthquake', isCorrect: false },
      { text: 'Sequencing a collection of elements with incremental delays between each element (stagger: 0.1)', isCorrect: true },
      { text: 'Randomly dropping frames to save battery', isCorrect: false },
      { text: 'A bug where CSS animations desynchronize', isCorrect: false }
    ]
  },
  {
    id: 's1-q92',
    number: 92,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'How do you handle GSAP animations on responsive websites?',
    answer: 'Use `gsap.matchMedia()`. It lets you create responsive animations based on media queries, automatically reverting and cleaning up animations when the screen size changes between mobile and desktop.',
    keyPoints: [
      'gsap.matchMedia() creates scoped responsive animations.',
      'Automatically kills and reverts animations when media query condition changes.',
      'Eliminates resize event listener spaghetti code and layout bugs.'
    ],
    quizOptions: [
      { text: 'Disable all animations on screens smaller than 2000px', isCorrect: false },
      { text: 'Use gsap.matchMedia() which automatically scopes, creates, and reverts animations per media query', isCorrect: true },
      { text: 'Reload window.location.reload() on every window resize', isCorrect: false },
      { text: 'Write separate website codebases for mobile and desktop', isCorrect: false }
    ]
  },
  {
    id: 's1-q93',
    number: 93,
    category: 'GSAP',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer'],
    question: 'What is the purpose of the delay property in GSAP?',
    answer: '`delay` pauses for a specified number of seconds before starting the animation. In timelines, it\'s usually better to use timeline position parameters (`"+=0.5"`) rather than fixed delays.',
    keyPoints: [
      'Specifies wait time in seconds before tween execution starts.',
      'In standalone tweens: gsap.to(el, { opacity: 1, delay: 0.5 }).',
      'In timelines, prefer relative position parameter (`"+=0.5"`) for maintainable timelines.'
    ],
    quizOptions: [
      { text: 'Slows down network packet transfer', isCorrect: false },
      { text: 'Specifies wait time in seconds before an animation begins; in timelines position parameters are preferred', isCorrect: true },
      { text: 'A timeout for aborting failed animations', isCorrect: false },
      { text: 'A property measured in CPU clock cycles', isCorrect: false }
    ]
  },
  {
    id: 's1-q94',
    number: 94,
    category: 'GSAP',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['10Pearls', 'Netsol'],
    question: 'How do you repeat animations in GSAP?',
    answer: 'Use `repeat: n` (number of repeats) or `repeat: -1` for infinite loops. Pair with `yoyo: true` to alternate playing forward and backward like a pendulum.',
    keyPoints: [
      'repeat: 3 repeats 3 times (total 4 iterations).',
      'repeat: -1 runs infinitely.',
      'yoyo: true alternates reverse on every even iteration.'
    ],
    quizOptions: [
      { text: 'Call the animation inside an infinite while loop', isCorrect: false },
      { text: 'Use repeat: n or repeat: -1 (infinite) with optional yoyo: true to alternate direction', isCorrect: true },
      { text: 'Animations cannot be repeated in GSAP', isCorrect: false },
      { text: 'By refreshing the webpage using meta refresh tags', isCorrect: false }
    ]
  },
  {
    id: 's1-q95',
    number: 95,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Devsinc', 'Systems Limited'],
    question: 'How do you use GSAP with React?',
    answer: 'Use `@gsap/react` hook `useGSAP()` or `useLayoutEffect` with `gsap.context()`. Always clean up animations on unmount to prevent memory leaks, duplicate tweens, and glitchy re-renders.',
    keyPoints: [
      'Use the official @gsap/react library with useGSAP(() => { ... }, { scope: containerRef }).',
      'Automatically handles scoping selectors and cleaning up/reverting tweens on component unmount.',
      'Prevents React 18 Strict Mode double-invocation animation glitch.'
    ],
    quizOptions: [
      { text: 'Directly modify the real DOM in window.onload', isCorrect: false },
      { text: 'Use useGSAP() hook or gsap.context() for scoped selectors and automatic cleanup on unmount', isCorrect: true },
      { text: 'GSAP and React are fundamentally incompatible', isCorrect: false },
      { text: 'Convert all GSAP tweens into Redux actions', isCorrect: false }
    ]
  },

  // ==========================================
  // PART 7: GENERAL FULL-STACK & PAKISTAN (15 QUESTIONS: Q96 - Q110)
  // ==========================================
  {
    id: 's1-q96',
    number: 96,
    category: 'General & CS',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'Netsol'],
    question: 'What are the four pillars of OOP?',
    answer: 'Encapsulation (bundling data and methods, restricting direct access), Abstraction (hiding implementation details, showing only essentials), Inheritance (deriving new classes from existing ones), Polymorphism (same interface, different underlying implementations).',
    keyPoints: [
      'Encapsulation: Data hiding via private fields/methods.',
      'Abstraction: Exposing clean interfaces while concealing complexity.',
      'Inheritance: Code reuse through superclass-subclass hierarchies.',
      'Polymorphism: Overriding and overloading methods to vary behavior.'
    ],
    quizOptions: [
      { text: 'HTML, CSS, JavaScript, and TypeScript', isCorrect: false },
      { text: 'Encapsulation, Abstraction, Inheritance, and Polymorphism', isCorrect: true },
      { text: 'Model, View, Controller, and Service', isCorrect: false },
      { text: 'Read, Write, Execute, and Delete', isCorrect: false }
    ]
  },
  {
    id: 's1-q97',
    number: 97,
    category: 'General & CS',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Systems Limited'],
    question: 'Explain the difference between a class and an object.',
    answer: 'A class is a blueprint, template, or prototype defining variables and methods. An object is a concrete instance of a class created in memory with its own specific state and identity.',
    keyPoints: [
      'Class: Blueprint definition; no memory allocated for instance data.',
      'Object: Living instance in heap memory instantiated via new ClassName().',
      'Multiple independent objects can be instantiated from a single class blueprint.'
    ],
    quizOptions: [
      { text: 'A class is an instance of an object', isCorrect: false },
      { text: 'A class is a blueprint defining structure and behavior; an object is an instantiated instance in memory', isCorrect: true },
      { text: 'Classes only exist in C++, while objects only exist in JavaScript', isCorrect: false },
      { text: 'There is no difference; they are exact synonyms', isCorrect: false }
    ]
  },
  {
    id: 's1-q98',
    number: 98,
    category: 'General & CS',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Devsinc'],
    question: 'What is the difference between method overloading and overriding?',
    answer: 'Overloading: same method name with different parameters in the same class (compile-time polymorphism). Overriding: a subclass provides a specific implementation of a method already defined in its superclass (runtime polymorphism).',
    keyPoints: [
      'Overloading: multiple methods same name, different signatures within same class.',
      'Overriding: subclass replaces parent class implementation using identical signature.',
      'JavaScript does not natively support method overloading signatures like Java/C#.'
    ],
    quizOptions: [
      { text: 'Overriding happens at compile time; overloading happens at runtime', isCorrect: false },
      { text: 'Overloading: same name different params in same class; Overriding: subclass redefines parent method', isCorrect: true },
      { text: 'Overloading causes a stack overflow error', isCorrect: false },
      { text: 'Overriding is only possible with CSS styles', isCorrect: false }
    ]
  },
  {
    id: 's1-q99',
    number: 99,
    category: 'General & CS',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'Systems Limited'],
    question: 'What is the difference between a stack and a queue?',
    answer: 'Stack is LIFO (Last In, First Out) — push and pop happen at the same end (call stack, undo operations). Queue is FIFO (First In, First Out) — enqueue at the rear, dequeue at the front (message queues, printer tasks, task queues).',
    keyPoints: [
      'Stack: LIFO (Last-In-First-Out). Operations: push(), pop(), peek().',
      'Queue: FIFO (First-In-First-Out). Operations: enqueue(), dequeue().',
      'Call stack uses Stack; Event Loop Task Queue uses Queue.'
    ],
    quizOptions: [
      { text: 'Stack is FIFO, Queue is LIFO', isCorrect: false },
      { text: 'Stack is LIFO (Last In, First Out); Queue is FIFO (First In, First Out)', isCorrect: true },
      { text: 'Both data structures operate strictly in random order', isCorrect: false },
      { text: 'Stacks can only store numbers; queues only store strings', isCorrect: false }
    ]
  },
  {
    id: 's1-q100',
    number: 100,
    category: 'General & CS',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'What is a primary key in databases?',
    answer: 'A primary key is a column (or set of columns) that uniquely identifies each record in a table. It must contain unique values and cannot contain NULL values. Each table can have only one primary key.',
    keyPoints: [
      'Uniquely identifies every individual row in a database table.',
      'Strict constraints: UNIQUE and NOT NULL.',
      'Automatically indexed with a clustered or unique B-tree index.'
    ],
    quizOptions: [
      { text: 'A password used by database administrators to log in', isCorrect: false },
      { text: 'A column or column set that uniquely identifies each record and cannot contain NULL', isCorrect: true },
      { text: 'The first column created when a table is initialized', isCorrect: false },
      { text: 'An encryption key used to protect table data', isCorrect: false }
    ]
  },
  {
    id: 's1-q101',
    number: 101,
    category: 'General & CS',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'What is database indexing and why is it important?',
    answer: 'An index is a data structure (typically B-tree) that speeds up data retrieval operations on a database at the cost of additional storage and slower writes. It avoids full table scans for queried columns.',
    keyPoints: [
      'Transforms O(N) table scans into O(log N) tree lookups.',
      'Trade-off: every INSERT, UPDATE, DELETE must update index trees.',
      'Index columns heavily used in WHERE, JOIN, and ORDER BY clauses.'
    ],
    quizOptions: [
      { text: 'A tool that numbers all pages in a PDF report', isCorrect: false },
      { text: 'A B-tree data structure speeding up SELECT queries by avoiding full table scans', isCorrect: true },
      { text: 'A backup technique to compress tables onto tape drives', isCorrect: false },
      { text: 'An algorithm that eliminates duplicate tables', isCorrect: false }
    ]
  },
  {
    id: 's1-q102',
    number: 102,
    category: 'General & CS',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Arbisoft', 'Devsinc'],
    question: 'What is the difference between SQL and NoSQL databases?',
    answer: 'SQL databases are relational, table-based, structured schema, vertically scalable, and follow ACID properties (PostgreSQL, MySQL). NoSQL databases are non-relational, document/key-value/graph based, dynamic schema, horizontally scalable (MongoDB, Redis).',
    keyPoints: [
      'SQL: Relational, structured tables, strict schemas, foreign keys, vertical scaling.',
      'NoSQL: Non-relational, documents/key-values, flexible schema, horizontal sharding.',
      'Choose SQL for complex multi-table relational integrity; NoSQL for rapid schema evolution and high write volume.'
    ],
    quizOptions: [
      { text: 'SQL is for web apps; NoSQL is for desktop apps only', isCorrect: false },
      { text: 'SQL is relational with fixed schemas and ACID; NoSQL is document/key-value with dynamic schemas and horizontal scaling', isCorrect: true },
      { text: 'NoSQL databases cannot be run in the cloud', isCorrect: false },
      { text: 'SQL databases cannot perform joins', isCorrect: false }
    ]
  },
  {
    id: 's1-q103',
    number: 103,
    category: 'General & CS',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Systems Limited'],
    question: 'How do you protect routes in a MERN application?',
    answer: 'Frontend: protected route component checking auth state/token and redirecting to login. Backend: auth middleware verifying JWT on protected endpoints and attaching user to req. Never rely solely on frontend route guards.',
    keyPoints: [
      'Frontend guards provide smooth UX redirects but can be bypassed in browser console.',
      'Backend middleware (verifyToken) is the true security boundary enforcing 401/403 responses.',
      'Combine both client protection and server endpoint validation.'
    ],
    quizOptions: [
      { text: 'Protect routes on the frontend only; backend endpoints do not need protection', isCorrect: false },
      { text: 'Frontend auth check for UX redirects, backed by mandatory backend JWT verification middleware on all protected API routes', isCorrect: true },
      { text: 'By obfuscating React JavaScript bundle code', isCorrect: false },
      { text: 'By putting routes behind Cloudflare captcha exclusively', isCorrect: false }
    ]
  },
  {
    id: 's1-q104',
    number: 104,
    category: 'General & CS',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['10Pearls', 'Netsol'],
    question: 'What is the difference between authentication and authorization?',
    answer: 'Authentication (AuthN) is verifying WHO you are (e.g., username/password, OTP, biometric). Authorization (AuthZ) is verifying WHAT you are allowed to do (e.g., admin vs regular user permissions, RBAC).',
    keyPoints: [
      'Authentication: "Who are you?" (Identifies the user via credentials or token).',
      'Authorization: "What permissions do you have?" (Checks roles: admin, editor, viewer).',
      'AuthN always precedes AuthZ in the security pipeline.'
    ],
    quizOptions: [
      { text: 'Authentication determines permissions; authorization checks passwords', isCorrect: false },
      { text: 'Authentication verifies identity (Who are you?); authorization determines access permissions (What can you do?)', isCorrect: true },
      { text: 'They are identical concepts with different spellings', isCorrect: false },
      { text: 'Authorization is done by the database; authentication is done by CSS', isCorrect: false }
    ]
  },
  {
    id: 's1-q105',
    number: 105,
    category: 'General & CS',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'What is JWT and how does it work?',
    answer: 'JSON Web Token is a compact, URL-safe means of representing claims between two parties. Structure: Header (algorithm & token type), Payload (user claims & expiry), Signature (HMAC or RSA hash of header + payload using a secret key).',
    keyPoints: [
      'Three base64url-encoded parts separated by dots: Header.Payload.Signature.',
      'Stateless: the server verifies signature without database session lookups.',
      'Payload is readable by anyone (not encrypted) — never store raw passwords or sensitive secrets in payload!'
    ],
    quizOptions: [
      { text: 'Java Web Translator for converting Java to JavaScript', isCorrect: false },
      { text: 'A compact token of 3 parts (Header.Payload.Signature) enabling stateless, cryptographically verified auth', isCorrect: true },
      { text: 'An encrypted session file stored on the server hard drive', isCorrect: false },
      { text: 'A database index type in PostgreSQL', isCorrect: false }
    ]
  },
  {
    id: 's1-q106',
    number: 106,
    category: 'General & CS',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer'],
    question: 'How do you manage environment variables in MERN?',
    answer: 'Use `.env` files with `dotenv` package for backend secrets (DB URI, JWT secret, API keys). In React/Vite, prefix client variables with `VITE_` (or `NEXT_PUBLIC_` in Next.js). Never commit `.env` to version control; commit `.env.example` instead.',
    keyPoints: [
      'Backend: process.env.KEY via dotenv package.',
      'Client: Vite requires VITE_ prefix; Next.js requires NEXT_PUBLIC_ prefix.',
      'Add .env to .gitignore and provide .env.example with dummy values.'
    ],
    quizOptions: [
      { text: 'Commit all database passwords into public GitHub repositories', isCorrect: false },
      { text: 'Use .env files with dotenv, prefix client vars with VITE_/NEXT_PUBLIC_, and add .env to .gitignore', isCorrect: true },
      { text: 'Hardcode secrets directly into React JSX templates', isCorrect: false },
      { text: 'Store secrets in browser window global variables', isCorrect: false }
    ]
  },
  {
    id: 's1-q107',
    number: 107,
    category: 'General & CS',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', '10Pearls', 'Systems Limited'],
    question: 'What is Git workflow in Pakistani companies?',
    answer: 'Typically GitFlow or GitHub Flow: `main`/`master` (production), `develop` (staging), feature branches (`feature/login`). Changes go through Pull Requests (PRs), code reviews by senior engineers, and CI/CD pipelines before merging.',
    keyPoints: [
      'Feature branch workflow: git checkout -b feature/jira-123-description.',
      'Pull requests require 1-2 approvals from peers/tech leads.',
      'Automated CI/CD runs lint, tests, and builds before staging/production deployment.'
    ],
    quizOptions: [
      { text: 'All developers push directly to master without reviewing code', isCorrect: false },
      { text: 'Branching strategy (main/dev/feature), pull requests, peer code reviews, and CI/CD automated checks', isCorrect: true },
      { text: 'Sharing code via USB flash drives', isCorrect: false },
      { text: 'Using SVN instead of Git exclusively', isCorrect: false }
    ]
  },
  {
    id: 's1-q108',
    number: 108,
    category: 'General & CS',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'VentureDive', 'Systems Limited'],
    question: 'What are the latest trends in full stack development?',
    answer: 'AI integration (LLM APIs, vector databases like Pinecone), Server Components (RSC), TypeScript by default, Edge computing (Cloudflare Workers, Vercel Edge), Micro-frontends, serverless architectures, and modern state tools (Zustand, TanStack Query).',
    keyPoints: [
      'AI-native apps: embeddings, RAG architectures, and streaming LLM responses.',
      'Server-driven UI and React Server Components reducing client JS payload.',
      'Universal TypeScript across frontend, backend, database ORM, and API schemas.'
    ],
    quizOptions: [
      { text: 'Abandoning JavaScript and rewriting everything in Assembly', isCorrect: false },
      { text: 'AI integrations/RAG, React Server Components, universal TypeScript, edge runtimes, and modern caching', isCorrect: true },
      { text: 'Switching entirely back to jQuery and PHP 4', isCorrect: false },
      { text: 'Replacing all databases with plain text files', isCorrect: false }
    ]
  },
  {
    id: 's1-q109',
    number: 109,
    category: 'General & CS',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'pieCyfer', '10Pearls'],
    question: 'How do you explain project decisions in an interview?',
    answer: 'Use the STAR method (Situation, Task, Action, Result). State the problem, why you chose specific tech (trade-offs), challenges faced and how you solved them, and measurable outcomes (e.g. "reduced load time by 40%").',
    keyPoints: [
      'Explain the "Why" behind architectural choices, not just the "How".',
      'Discuss trade-offs: Why MongoDB over PostgreSQL for this specific use case?',
      'Quantify results: performance gains, user concurrency handled, or reduced bugs.'
    ],
    quizOptions: [
      { text: 'Say "my manager told me to do it" without explaining further', isCorrect: false },
      { text: 'Use STAR method, explain technical trade-offs, challenges overcome, and quantify results', isCorrect: true },
      { text: 'Recite entire source code files word for word', isCorrect: false },
      { text: 'Claim you built the entire project in 10 minutes without help', isCorrect: false }
    ]
  },
  {
    id: 's1-q110',
    number: 110,
    category: 'General & CS',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'Arbisoft', 'Netsol'],
    question: 'What soft skills matter in Pakistani tech companies?',
    answer: 'Clear English communication (crucial for client-facing projects in US/UK/Europe), problem-solving attitude, eagerness to learn, ownership and accountability, ability to receive constructive feedback, and teamwork in Agile/Scrum environments.',
    keyPoints: [
      'Client-facing English communication: explaining complex technical concepts clearly.',
      'Accountability and problem ownership: taking responsibility for deliverables.',
      'Active collaboration in Scrum rituals: daily standups, sprint planning, and retrospectives.'
    ],
    quizOptions: [
      { text: 'Only raw typing speed and memorizing syntax', isCorrect: false },
      { text: 'Clear client-facing English communication, problem-solving mindset, accountability, and Agile teamwork', isCorrect: true },
      { text: 'Refusing to communicate with project managers', isCorrect: false },
      { text: 'Working in complete isolation without updating Git', isCorrect: false }
    ]
  }
];
