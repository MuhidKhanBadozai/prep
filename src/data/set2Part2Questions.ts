import { Question } from '../types';

export const SET2_PART2_QUESTIONS: Question[] = [
  // ==============================================================
  // 5. MONGODB (13 QUESTIONS: #168 - #180)
  // ==============================================================
  {
    id: 's2-q58',
    number: 168,
    category: 'MongoDB',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'pieCyfer'],
    question: 'MongoDB vs SQL databases (tabular vs document, ACID vs BASE, scaling)',
    answer: 'Data model: SQL stores data in rigid tables with rows and columns enforcing fixed schemas and foreign keys; MongoDB stores data in flexible BSON documents within collections. Consistency & Guarantees: SQL natively follows ACID (Atomicity, Consistency, Isolation, Durability); MongoDB historically followed BASE (eventual consistency) but introduced multi-document ACID transactions in v4.0. Scaling: SQL scales primarily vertically (upgrading CPU/RAM on single server); MongoDB was architected from inception to scale horizontally across distributed clusters via native sharding.',
    keyPoints: [
      'SQL: relational tables, rigid schemas, vertical scaling, strict ACID.',
      'MongoDB: flexible BSON documents, horizontal scaling via sharding, dynamic schema.',
      'Choose SQL for complex multi-table accounting; MongoDB for fast-evolving schemas and high throughput.'
    ],
    quizOptions: [
      { text: 'MongoDB stores data in relational tables with foreign key constraints', isCorrect: false },
      { text: 'SQL is tabular with fixed schemas and vertical scaling; MongoDB is document-based (BSON) with dynamic schemas and native horizontal sharding', isCorrect: true },
      { text: 'SQL does not support transactions', isCorrect: false },
      { text: 'MongoDB can only run on a single computer', isCorrect: false }
    ]
  },
  {
    id: 's2-q59',
    number: 169,
    category: 'MongoDB',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'Systems Limited'],
    question: 'Document and collection (terminology mapping to SQL)',
    answer: 'SQL Database maps to MongoDB Database. SQL Table maps to MongoDB Collection. SQL Row / Record maps to MongoDB Document. SQL Column maps to MongoDB Field. SQL Primary Key maps to MongoDB `_id` field (defaulting to a 12-byte ObjectId). SQL JOIN maps to MongoDB `$lookup` aggregation stage or manual embedding / references. Key difference: MongoDB collections do not enforce uniform field structure across documents by default.',
    keyPoints: [
      'Database -> Database.',
      'Table -> Collection.',
      'Row -> Document.',
      'Column -> Field.',
      'Primary Key -> _id (ObjectId).'
    ],
    quizOptions: [
      { text: 'A MongoDB collection maps to an SQL database column', isCorrect: false },
      { text: 'Table maps to Collection, Row maps to Document, Column maps to Field, and Primary Key maps to _id', isCorrect: true },
      { text: 'A MongoDB document is equivalent to an entire SQL database', isCorrect: false },
      { text: 'There is no equivalent to a primary key in MongoDB', isCorrect: false }
    ]
  },
  {
    id: 's2-q60',
    number: 170,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Devsinc'],
    question: 'Mongoose and why use it with MongoDB (schema validation, middleware/hooks)',
    answer: 'Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. Why use it: 1) Schema enforcement: gives structure to schema-less MongoDB with data type casting and validation rules. 2) Built-in validation: required fields, min/max values, enum constraints, custom validators. 3) Middleware/Hooks: pre/post hooks for lifecycle events (e.g. `pre("save")` to hash passwords with bcrypt). 4) Query building and population: simplified API for relations via `.populate()`. 5) Virtual properties and custom instance/static methods.',
    keyPoints: [
      'ODM providing application-layer schema enforcement and type casting.',
      'Pre and post middleware hooks for password hashing and auditing.',
      'Helper methods: virtuals, query helpers, instance/static methods.'
    ],
    quizOptions: [
      { text: 'Mongoose converts MongoDB into a MySQL relational database', isCorrect: false },
      { text: 'An ODM providing schema validation, type casting, pre/post middleware hooks, and query helpers for MongoDB', isCorrect: true },
      { text: 'A graphical desktop client like MongoDB Compass', isCorrect: false },
      { text: 'Mongoose slows down database queries by 1000%', isCorrect: false }
    ]
  },
  {
    id: 's2-q61',
    number: 171,
    category: 'MongoDB',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Systems Limited'],
    question: 'Defining a schema in Mongoose with validation, default values, and timestamps',
    answer: 'In Mongoose, call `new mongoose.Schema({ ... }, { timestamps: true })`. Define fields with types (`String`, `Number`, `Boolean`, `Date`, `ObjectId`), validation (`required`, `min`, `max`, `trim`, `lowercase`, `enum`), and `default` values. The `{ timestamps: true }` option automatically adds and manages `createdAt` and `updatedAt` Date fields on every insert and update.',
    keyPoints: [
      'Specify types, required constraints, enums, defaults, and trimming.',
      '{ timestamps: true } option auto-manages createdAt and updatedAt.',
      'Compile schema into a living model via mongoose.model("ModelName", schema).'
    ],
    codeSnippet: `import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true, uppercase: true },
  amount: { type: Number, required: [true, 'Amount is required'], min: [0, 'Cannot be negative'] },
  status: { type: String, enum: ['draft', 'pending', 'paid'], default: 'draft' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }
}, { timestamps: true });

export const Invoice = mongoose.model('Invoice', invoiceSchema);`,
    quizOptions: [
      { text: 'Schemas are created using SQL CREATE TABLE commands inside MongoDB', isCorrect: false },
      { text: 'Use new mongoose.Schema() defining types, validation rules, default values, and { timestamps: true }', isCorrect: true },
      { text: 'Mongoose schemas cannot validate numbers or dates', isCorrect: false },
      { text: 'Timestamps must be manually calculated using Date.now() on every line', isCorrect: false }
    ]
  },
  {
    id: 's2-q62',
    number: 172,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'Aggregation pipeline ($match, $group, $project, $sort, $lookup, $unwind)',
    answer: 'The aggregation pipeline processes documents through a multi-stage sequence: `$match` filters documents (like SQL WHERE); `$group` groups documents by a designated `_id` expression and applies accumulator expressions (`$sum`, `$avg`, `$min`, `$max`); `$project` reshapes output documents (adding, removing, or computing fields); `$sort` orders documents; `$lookup` performs a left outer join with another collection; `$unwind` deconstructs array fields into individual documents for each element.',
    keyPoints: [
      '$match: filters input document stream early.',
      '$group: aggregates metrics by grouping key.',
      '$project: selects/transforms output fields.',
      '$lookup: left outer join with external collection.',
      '$unwind: flattens nested arrays into individual document stream.'
    ],
    codeSnippet: `Invoice.aggregate([
  { $match: { status: 'paid' } },
  { $group: { _id: '$client', totalRevenue: { $sum: '$amount' }, invoiceCount: { $sum: 1 } } },
  { $sort: { totalRevenue: -1 } },
  { $limit: 5 }
]);`,
    quizOptions: [
      { text: 'The aggregation pipeline is only used for backing up database collections', isCorrect: false },
      { text: 'A sequential pipeline ($match, $group, $project, $sort, $lookup, $unwind) transforming and aggregating data', isCorrect: true },
      { text: 'Aggregation can only compute the total count of documents', isCorrect: false },
      { text: '$unwind combines multiple documents into a single array', isCorrect: false }
    ]
  },
  {
    id: 's2-q63',
    number: 173,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'find() vs aggregate() — when to use which',
    answer: 'Use `find()` for standard CRUD operations: fetching raw documents, simple field filtering, basic pagination (`.skip()`, `.limit()`), and sorting. It returns a lightweight cursor or Mongoose Document instances. Use `aggregate()` when you need complex data processing: multi-table joins (`$lookup`), multi-field grouping (`$group`), mathematical computations (`$sum`, `$avg`), array unwinding (`$unwind`), and multi-stage analytical reporting that cannot be expressed with simple query filters.',
    keyPoints: [
      'find(): fast, simple CRUD, returns Mongoose document instances with helper methods.',
      'aggregate(): powerful analytics, joins, grouped computations, returns raw POJOs.',
      'Do not use aggregate() for simple single-collection lookups.'
    ],
    quizOptions: [
      { text: 'find() is deprecated and all queries must use aggregate()', isCorrect: false },
      { text: 'find() for standard CRUD queries and pagination; aggregate() for multi-stage analytics, groupings, joins, and calculations', isCorrect: true },
      { text: 'aggregate() can only run on single documents', isCorrect: false },
      { text: 'find() can execute left outer joins across collections natively', isCorrect: false }
    ]
  },
  {
    id: 's2-q64',
    number: 174,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Devsinc'],
    question: 'Indexing in MongoDB — single field, compound, unique, multikey, explain()',
    answer: 'Indexes are B-tree data structures that avoid full collection scans (COLLSCAN). Types: 1) Single-field: index on one field (`{ email: 1 }`). 2) Compound: index on multiple fields (`{ status: 1, createdAt: -1 }`); obeys equality-sort-range (ESR) rule. 3) Unique: rejects duplicate values (`{ email: 1 }, { unique: true }`). 4) Multikey: automatically created when indexing an array field. Use `explain("executionStats")` to evaluate queries: check `executionStages.stage` (IXSCAN vs COLLSCAN) and ensure `totalDocsExamined` is close to `nReturned`.',
    keyPoints: [
      'Converts O(N) collection scans into O(log N) index lookups.',
      'Compound indexes obey Equality -> Sort -> Range (ESR) rule.',
      'explain("executionStats") verifies index usage (IXSCAN vs COLLSCAN).'
    ],
    quizOptions: [
      { text: 'Indexes should be created on every single field in every collection indiscriminately', isCorrect: false },
      { text: 'B-tree data structures (single, compound, unique, multikey) verified via explain() showing IXSCAN instead of COLLSCAN', isCorrect: true },
      { text: 'explain() deletes slow queries from the database log', isCorrect: false },
      { text: 'Multikey indexes only work on floating-point numbers', isCorrect: false }
    ]
  },
  {
    id: 's2-q65',
    number: 175,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer'],
    question: 'Embedding vs referencing (normalization vs denormalization trade-offs)',
    answer: 'Embedding (Denormalization): stores related data inside the same parent document as nested objects or arrays. Pros: single atomic query, high read performance, atomic updates. Cons: risk of exceeding 16MB document cap, unbounded array growth, data duplication. Referencing (Normalization): stores related data in separate collections using ObjectIds. Pros: no size cap, no data redundancy, easy independent updates. Cons: requires multiple queries or `$lookup` joins, slower read performance.',
    keyPoints: [
      'Embed for 1-to-few (e.g. user addresses, invoice items capped at 50).',
      'Reference for 1-to-many / 1-to-squillions (e.g. user log events, comments).',
      'Never allow embedded arrays to grow unbounded.'
    ],
    quizOptions: [
      { text: 'Always reference everything like SQL tables without exception', isCorrect: false },
      { text: 'Embed for 1-to-few, fast single reads, and atomic updates; reference for 1-to-many, frequently updated child entities, and to avoid 16MB limit', isCorrect: true },
      { text: 'Embedding causes instant database corruption', isCorrect: false },
      { text: 'Referencing is only permitted between collections with identical names', isCorrect: false }
    ]
  },
  {
    id: 's2-q66',
    number: 176,
    category: 'MongoDB',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['10Pearls', 'Devsinc'],
    question: 'MongoDB transactions (ACID in MongoDB with session.startTransaction())',
    answer: 'MongoDB supports multi-document ACID transactions on replica sets (v4.0+) and sharded clusters (v4.2+). How it works: 1) Start a ClientSession: `const session = await mongoose.startSession()`. 2) Start transaction: `session.startTransaction()`. 3) Execute all read/write operations passing `{ session }` in options. 4) If all succeed, call `await session.commitTransaction()`. 5) If any operation fails, catch the error and call `await session.abortTransaction()` to roll back all staged changes. 6) Finally, call `session.endSession()`.',
    keyPoints: [
      'Multi-document ACID guarantees across replica sets and sharded clusters.',
      'session.startTransaction() -> pass { session } to all operations.',
      'commitTransaction() on success; abortTransaction() on error.',
      'Always clean up in finally block with session.endSession().'
    ],
    codeSnippet: `const session = await mongoose.startSession();
session.startTransaction();
try {
  await Account.updateOne({ _id: fromId }, { $inc: { balance: -amount } }, { session });
  await Account.updateOne({ _id: toId }, { $inc: { balance: amount } }, { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}`,
    quizOptions: [
      { text: 'MongoDB transactions are committed automatically without error checking', isCorrect: false },
      { text: 'Using ClientSession with session.startTransaction(), committing on success, and aborting on catch to rollback changes', isCorrect: true },
      { text: 'Transactions can only update a single document at a time', isCorrect: false },
      { text: 'Transactions in MongoDB require third-party Redis plugins', isCorrect: false }
    ]
  },
  {
    id: 's2-q67',
    number: 177,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Arbisoft'],
    question: 'MongoDB scaling — horizontal (sharding) vs vertical',
    answer: 'Vertical scaling (scale-up): adding more CPU, RAM, and faster NVMe SSD storage to a single server. Simple, but reaches hardware and economic limits quickly. Horizontal scaling (scale-out / sharding): distributing data across a cluster of multiple independent machines (shards). MongoDB uses a Shard Key (hashed or range-based) to partition collection documents into chunks across shards. A query router (`mongos`) intercepts client queries and routes them directly to the appropriate shards.',
    keyPoints: [
      'Vertical: bigger single machine; simple but has hard physical ceiling.',
      'Horizontal (Sharding): distributes data across multiple machines via shard keys.',
      'mongos query router transparently coordinates cluster reads/writes.'
    ],
    quizOptions: [
      { text: 'MongoDB can only scale by purchasing a mainframe supercomputer', isCorrect: false },
      { text: 'Vertical scales up CPU/RAM on one machine; Horizontal scales out via sharding with shard keys and mongos routers', isCorrect: true },
      { text: 'Sharding deletes 50% of data to keep storage small', isCorrect: false },
      { text: 'Horizontal scaling is only possible with MySQL', isCorrect: false }
    ]
  },
  {
    id: 's2-q68',
    number: 178,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Netsol', 'pieCyfer'],
    question: 'Replica set — primary, secondary, arbiter, automatic failover',
    answer: 'A replica set is a cluster of MongoDB server instances maintaining identical data copies for high availability and redundancy. Primary: single node receiving all write operations; records changes in its operation log (`oplog`). Secondaries: replicate the primary\'s oplog asynchronously and serve read operations if configured. Arbiter: lightweight voting node with no data copy, used solely to break election ties. Automatic Failover: if the primary becomes unreachable, secondaries hold an election and promote a new primary within seconds.',
    keyPoints: [
      'Primary: handles all writes, writes to oplog.',
      'Secondary: replicates oplog, can handle read queries if ReadPreference configured.',
      'Arbiter: participates in elections without holding data.',
      'Consensus election automatically promotes new primary on heartbeat failure.'
    ],
    quizOptions: [
      { text: 'All nodes in a replica set accept write operations simultaneously', isCorrect: false },
      { text: 'A group of instances with one write Primary, multiple replicating Secondaries, and automatic election on failure', isCorrect: true },
      { text: 'Arbiters store complete backups of all documents on disk', isCorrect: false },
      { text: 'Replica sets must be manually restarted by human engineers during outages', isCorrect: false }
    ]
  },
  {
    id: 's2-q69',
    number: 179,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Systems Limited', '10Pearls'],
    question: 'Preventing NoSQL injection attacks',
    answer: 'NoSQL injection occurs when unvalidated user input contains MongoDB query operators (like `{"$gt": ""}` or `{"$ne": null}`) instead of plain strings, allowing attackers to bypass authentication (`User.findOne({ username, password: { $gt: "" } })`). Prevention: 1) Use `express-mongo-sanitize` middleware to strip all `$` and `.` characters from `req.body`, `req.query`, and `req.params`. 2) Strict schema validation using Zod or Joi to enforce that strings are strictly strings, rejecting object payloads. 3) Avoid evaluating raw JavaScript via `$where`.',
    keyPoints: [
      'Attackers send JSON operator objects like { "$gt": "" } to bypass equality checks.',
      'Mitigate with express-mongo-sanitize to strip $ and . prefixes.',
      'Enforce input data types with Zod (z.string() rejects objects).',
      'Never allow arbitrary user strings in $where or mapReduce.'
    ],
    codeSnippet: `// Vulnerable:
app.post('/login', async (req, res) => {
  // If attacker sends: { "username": "admin", "password": { "$ne": null } }
  const user = await User.findOne({ username: req.body.username, password: req.body.password });
  // Attacker is logged in without knowing password!
});

// Secure:
import mongoSanitize from 'express-mongo-sanitize';
app.use(mongoSanitize()); // Strips any '$' or '.' operator keys`,
    quizOptions: [
      { text: 'MongoDB is immune to injection attacks because it does not use SQL', isCorrect: false },
      { text: 'Sanitize inputs with express-mongo-sanitize to strip $ operators, validate types with Zod, and avoid $where', isCorrect: true },
      { text: 'Encrypt all database field names with SHA-256', isCorrect: false },
      { text: 'NoSQL injection only happens in Python servers', isCorrect: false }
    ]
  },
  {
    id: 's2-q70',
    number: 180,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'populate() in Mongoose — how it works under the hood (separate query)',
    answer: 'Mongoose `populate()` replaces specified paths in a document with documents from other collections. Under the hood: It does NOT perform an SQL-style JOIN or database-level `$lookup` by default. Instead, Mongoose executes a FIRST query to fetch the parent documents, extracts all referenced `_id` values into an array, executes a SECOND query (`Model.find({ _id: { $in: idArray } })`) against the referenced collection, and merges the resulting documents in Node.js memory. Performance implication: overusing deep or nested `.populate()` causes multiple sequential network round-trips.',
    keyPoints: [
      'Replaces ObjectId references with populated document data.',
      'Executes separate queries under the hood using $in, merging in application memory.',
      'For complex multi-level joins or large data sets, native aggregation $lookup is often faster.'
    ],
    codeSnippet: `// Single query in code, but TWO queries executed under the hood:
const invoice = await Invoice.findById(id).populate('client', 'name email');
// Query 1: db.invoices.findOne({ _id: id })
// Query 2: db.clients.find({ _id: { $in: [clientId] } }, { name: 1, email: 1 })`,
    quizOptions: [
      { text: 'populate() merges collections at the hardware disk partition level', isCorrect: false },
      { text: 'Executes separate queries under the hood (parent query then referenced collection query with $in) and joins in Node memory', isCorrect: true },
      { text: 'populate() creates a new MongoDB database for each request', isCorrect: false },
      { text: 'populate() only works on string arrays', isCorrect: false }
    ]
  },

  // ==============================================================
  // 6. NEXT.JS (16 QUESTIONS: #181 - #196)
  // ==============================================================
  {
    id: 's2-q71',
    number: 181,
    category: 'Next.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'Arbisoft'],
    question: 'Next.js vs plain React (CRA/Vite) — why Next.js exists',
    answer: 'Plain React (Vite/CRA) creates single-page applications (SPAs) where an empty `index.html` shell is sent to the browser, and client-side JavaScript downloads, parses, and executes to render the UI. Downsides: poor initial SEO (crawlers see empty HTML), slower First Contentful Paint (FCP) on slow devices, and lack of backend integration. Next.js solves this by offering server-side rendering (SSR), static site generation (SSG), automatic code-splitting, built-in API route handlers, optimized images and fonts, and zero-config routing.',
    keyPoints: [
      'Plain React: client-side SPA rendering with blank initial HTML shell.',
      'Next.js: hybrid pre-rendering (SSR/SSG/ISR) for optimal SEO and instant FCP.',
      'Provides full-stack infrastructure: server actions, route handlers, middleware.'
    ],
    quizOptions: [
      { text: 'Plain React is a server-side framework, while Next.js is client-only', isCorrect: false },
      { text: 'Next.js provides SSR/SSG pre-rendering, superior SEO, automatic optimizations, and full-stack backend capabilities', isCorrect: true },
      { text: 'Next.js requires learning an entirely new language instead of React', isCorrect: false },
      { text: 'Plain React apps cannot use CSS stylesheets', isCorrect: false }
    ]
  },
  {
    id: 's2-q72',
    number: 182,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'SSR vs SSG vs ISR vs CSR in Next.js',
    answer: 'SSR (Server-Side Rendering): HTML generated on every incoming request on the server (best for highly dynamic, personalized data like user bank dashboards). SSG (Static Site Generation): HTML pre-rendered at build time (best for static content, blogs, docs; served lightning-fast from CDN cache). ISR (Incremental Static Regeneration): static pages revalidated and regenerated in the background without rebuilding the entire app (`revalidate: 60`). CSR (Client-Side Rendering): traditional React rendering in browser using `useEffect` or client components.',
    keyPoints: [
      'SSR: Dynamic HTML per request on server.',
      'SSG: Static HTML generated once at build time.',
      'ISR: Stale-while-revalidate background regeneration of static pages.',
      'CSR: Client browser executes JavaScript to fetch and render.'
    ],
    quizOptions: [
      { text: 'SSR and SSG are exact synonyms with identical execution timing', isCorrect: false },
      { text: 'SSR renders per request on server; SSG generates at build time; ISR revalidates static pages in background; CSR renders in browser', isCorrect: true },
      { text: 'ISR requires re-deploying the codebase on every page visit', isCorrect: false },
      { text: 'CSR is only possible on mobile devices', isCorrect: false }
    ]
  },
  {
    id: 's2-q73',
    number: 183,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'App Router vs Pages Router — key differences',
    answer: 'Pages Router (legacy): uses `pages/` directory; page files map directly to routes; components are client-rendered by default; data fetching relies on `getStaticProps`, `getServerSideProps`, `getInitialProps`. App Router (Next.js 13+): uses `app/` directory; folder-based routing with `page.tsx`; uses React Server Components (RSC) by default; nested layouts that don\'t re-render on navigation (`layout.tsx`); streaming with Suspense; Route Handlers (`route.ts`) replace API routes; Server Actions for direct form mutations.',
    keyPoints: [
      'App Router uses app/ directory; Pages Router uses pages/.',
      'App Router defaults to React Server Components (zero client JS).',
      'Nested persistent layouts and loading/error conventions.',
      'Standard fetch API caching replaces getStaticProps/getServerSideProps.'
    ],
    quizOptions: [
      { text: 'Pages Router is the newer router released in Next.js 15', isCorrect: false },
      { text: 'App Router uses app/ folder with React Server Components, nested layouts, and streaming; Pages Router is the legacy pages/ system', isCorrect: true },
      { text: 'App Router does not support TypeScript', isCorrect: false },
      { text: 'Pages Router runs directly inside the browser kernel', isCorrect: false }
    ]
  },
  {
    id: 's2-q74',
    number: 184,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer'],
    question: 'Server Components vs Client Components in App Router ("use client", when to use which)',
    answer: 'In App Router, all components inside `app/` are Server Components by default. They execute ONLY on the server, have direct access to backend resources (databases, filesystem, secrets), and send ZERO JavaScript to the client bundle. To make a component a Client Component, add `"use client"` at the very top of the file. Use Client Components when you need: interactivity (event listeners like `onClick`, `onChange`), browser APIs (`localStorage`, `window`), or React state and lifecycle hooks (`useState`, `useEffect`). Best practice: push Client Components to the leaves of your component tree.',
    keyPoints: [
      'Default: Server Components (zero JS shipped, direct database/server access).',
      '"use client" directive marks component boundary for client-side bundle.',
      'Client components needed for useState, useEffect, onClick, and browser APIs.',
      'Keep server components as wrappers and client components as interactive leaves.'
    ],
    quizOptions: [
      { text: '"use client" must be placed at the top of every file in Next.js', isCorrect: false },
      { text: 'Server components run only on server with 0 client JS; "use client" opts into client components for state, hooks, and event listeners', isCorrect: true },
      { text: 'Server components cannot render client components as children', isCorrect: false },
      { text: 'Client components can directly read server database passwords securely', isCorrect: false }
    ]
  },
  {
    id: 's2-q75',
    number: 185,
    category: 'Next.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', '10Pearls'],
    question: 'File-based routing in Next.js (folders, page.tsx, dynamic routes [id], catch-all [...slug])',
    answer: 'In App Router, folders define route paths, and only `page.tsx` makes a route publicly accessible: `app/invoices/page.tsx` -> `/invoices`. Dynamic segments use square brackets: `app/invoices/[id]/page.tsx` -> `/invoices/123` (accessible via `params.id`). Catch-all segments use ellipses: `app/docs/[...slug]/page.tsx` -> matches `/docs/a`, `/docs/a/b/c` (accessible as an array `params.slug`). Optional catch-all uses double brackets: `[[...slug]]` (also matches `/docs`). Route groups `(groupName)` organize files without affecting URL path.',
    keyPoints: [
      'Folder name = URL segment; page.tsx = accessible route UI.',
      '[id] = dynamic single segment parameter.',
      '[...slug] = catch-all parameter returning an array of segments.',
      '(group) = logical grouping without affecting the URL route.'
    ],
    quizOptions: [
      { text: 'Routes must be manually declared inside web.config XML files', isCorrect: false },
      { text: 'Folders define routes: page.tsx renders UI, [id] handles dynamic params, and [...slug] handles catch-all segments', isCorrect: true },
      { text: 'Dynamic routes can only accept numeric values', isCorrect: false },
      { text: 'Next.js routes cannot have sub-folders', isCorrect: false }
    ]
  },
  {
    id: 's2-q76',
    number: 186,
    category: 'Next.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', 'Systems Limited'],
    question: 'layout.tsx, loading.tsx, error.tsx, not-found.tsx in App Router',
    answer: 'Special files in App Router: 1) `layout.tsx`: shared UI wrapped around children routes that persists state and DOES NOT re-render on navigation (e.g. navigation headers, sidebars). 2) `loading.tsx`: automated React Suspense boundary that displays instant loading skeletons while page content is streaming. 3) `error.tsx`: automated React Error Boundary (must be a Client Component with `"use client"`) catching runtime errors in the route segment. 4) `not-found.tsx`: renders UI when `notFound()` is triggered or for unmatched paths.',
    keyPoints: [
      'layout.tsx: persists across route changes without re-mounting.',
      'loading.tsx: automatic Suspense boundary fallback.',
      'error.tsx: automatic Error Boundary (must use "use client").',
      'not-found.tsx: 404 page handler.'
    ],
    quizOptions: [
      { text: 'loading.tsx blocks all traffic to the server until deleted', isCorrect: false },
      { text: 'Conventions: layout.tsx persists shared UI, loading.tsx handles Suspense skeletons, error.tsx catches errors, not-found.tsx renders 404', isCorrect: true },
      { text: 'error.tsx must always be a Server Component', isCorrect: false },
      { text: 'layout.tsx re-renders completely on every click', isCorrect: false }
    ]
  },
  {
    id: 's2-q77',
    number: 187,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', '10Pearls'],
    question: 'Data fetching in App Router (fetch with cache: \'force-cache\' vs \'no-store\' vs revalidate)',
    answer: 'Next.js extends the native `fetch()` API with granular caching options: 1) `fetch(url, { cache: "force-cache" })` (default): Static data cached indefinitely on the server (equivalent to SSG). 2) `fetch(url, { cache: "no-store" })`: Dynamic data fetched fresh on every request without caching (equivalent to SSR). 3) `fetch(url, { next: { revalidate: 3600 } })`: Incremental Static Regeneration (ISR) revalidating cache in the background after specified seconds. 4) Tag-based caching: `{ next: { tags: [\'invoices\'] } }` allowing on-demand purge via `revalidateTag(\'invoices\')`.',
    keyPoints: [
      'force-cache: static cached data (SSG).',
      'no-store: dynamic fresh fetch per request (SSR).',
      '{ next: { revalidate: seconds } }: time-based ISR.',
      '{ next: { tags: ["tag"] } }: on-demand tag revalidation.'
    ],
    quizOptions: [
      { text: 'fetch() cannot be used in Next.js Server Components', isCorrect: false },
      { text: 'Native fetch extension: force-cache (SSG static), no-store (SSR fresh), and next.revalidate (ISR timed refresh)', isCorrect: true },
      { text: 'Next.js forces all API calls to re-execute every millisecond', isCorrect: false },
      { text: 'Caching is only controlled via HTTP headers in Chrome DevTools', isCorrect: false }
    ]
  },
  {
    id: 's2-q78',
    number: 188,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'Incremental Static Regeneration (ISR) configuration in App Router',
    answer: 'In App Router, configure ISR in two ways: 1) Segment-level: export a route segment config variable at the top of `page.tsx`: `export const revalidate = 60` (revalidates the entire page every 60 seconds). 2) Fetch-level: specify `fetch(url, { next: { revalidate: 60 } })`. 3) On-demand ISR: call `revalidatePath(\'/invoices\')` or `revalidateTag(\'invoices\')` inside a Server Action or Route Handler after database mutations to instantly purge cache without waiting for the timer.',
    keyPoints: [
      'Time-based: export const revalidate = 60 or fetch revalidate option.',
      'On-demand: revalidatePath(path) or revalidateTag(tag) in Server Actions.',
      'Serves stale static cache instantly to user while re-generating fresh HTML in background.'
    ],
    quizOptions: [
      { text: 'ISR requires restarting the production server on every update', isCorrect: false },
      { text: 'Configure via export const revalidate = seconds, fetch revalidate option, or on-demand via revalidatePath/revalidateTag', isCorrect: true },
      { text: 'ISR is only supported on static HTML files without React', isCorrect: false },
      { text: 'revalidate must always be set to 0', isCorrect: false }
    ]
  },
  {
    id: 's2-q79',
    number: 189,
    category: 'Next.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Netsol'],
    question: 'API Routes / Route Handlers in Next.js (route.ts, GET/POST/PUT/DELETE handlers)',
    answer: 'In App Router, Route Handlers are defined in `route.ts` files inside the `app/` directory (e.g. `app/api/invoices/route.ts`). They export standard asynchronous functions named after HTTP methods: `export async function GET(request: Request) { ... }`, `POST`, `PUT`, `PATCH`, `DELETE`. Use `NextResponse.json(data, { status: 200 })` to return formatted JSON responses. Route Handlers cannot exist in the same folder segment as a `page.tsx`.',
    keyPoints: [
      'Defined in route.ts files inside app/ directory.',
      'Export named HTTP handlers: GET, POST, PUT, DELETE, PATCH.',
      'Return responses with NextResponse.json(data, { status: 200 }).'
    ],
    codeSnippet: `import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  return NextResponse.json({ success: true, status });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, created: body }, { status: 201 });
}`,
    quizOptions: [
      { text: 'Route Handlers must be written inside Express server.js files', isCorrect: false },
      { text: 'route.ts files exporting named HTTP methods (GET, POST, PUT, DELETE) returning NextResponse.json()', isCorrect: true },
      { text: 'Route handlers cannot read JSON request bodies', isCorrect: false },
      { text: 'API routes only support GET requests', isCorrect: false }
    ]
  },
  {
    id: 's2-q80',
    number: 190,
    category: 'Next.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['10Pearls', 'Devsinc'],
    question: 'next/image component — automatic optimization, formats, sizing, lazy loading',
    answer: 'The `next/image` component replaces standard HTML `<img>` with automatic performance optimizations: 1) Format conversion: serves modern WebP and AVIF formats automatically if the browser supports them. 2) Responsive sizing: auto-generates `srcset` for different viewport widths. 3) Lazy loading: images outside the viewport are deferred by default (`loading="lazy"`). 4) Layout shift prevention (CLS): enforces explicit `width` and `height` (or `fill` with relative container) to prevent visual jumps during page load.',
    keyPoints: [
      'Auto-optimizes to WebP/AVIF formats.',
      'Prevents Cumulative Layout Shift (CLS) via required width/height or fill.',
      'Lazy loads automatically based on viewport proximity.',
      'Remote image domains must be whitelisted in next.config.js.'
    ],
    quizOptions: [
      { text: 'next/image converts all images to uncompressed BMP format', isCorrect: false },
      { text: 'Auto-optimizes images via WebP/AVIF conversion, responsive sizing, lazy loading, and CLS prevention', isCorrect: true },
      { text: 'next/image requires manual Photoshop compression before use', isCorrect: false },
      { text: 'The component can only display black-and-white photos', isCorrect: false }
    ]
  },
  {
    id: 's2-q81',
    number: 191,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'Systems Limited'],
    question: 'Middleware in Next.js (middleware.ts, redirecting, auth checks, edge runtime)',
    answer: 'Next.js Middleware (`middleware.ts` at project root or `src/`) runs BEFORE a request is completed, executing on the lightweight Edge Runtime. Use cases: authentication and session verification, redirecting unauthorized users (`NextResponse.redirect()`), rewriting URLs, setting custom headers, and geolocation routing. You can scope middleware to specific paths using a `matcher` config: `export const config = { matcher: [\'/dashboard/:path*\', \'/api/:path*\'] }`.',
    keyPoints: [
      'middleware.ts placed at root/src, running on Edge Runtime.',
      'Runs before route handlers and pages are executed.',
      'Performs auth checks, redirects (NextResponse.redirect), and header modifications.',
      'Configured via export const config = { matcher: [...] }.'
    ],
    quizOptions: [
      { text: 'middleware.ts runs only in the client browser console', isCorrect: false },
      { text: 'Edge runtime file intercepting requests before completion for auth checks, redirects, and rewrites scoped via matcher', isCorrect: true },
      { text: 'Middleware is only available when deploying to AWS EC2', isCorrect: false },
      { text: 'Next.js middleware cannot inspect cookies', isCorrect: false }
    ]
  },
  {
    id: 's2-q82',
    number: 192,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'Hydration mismatch error in Next.js — what causes it and how to fix it',
    answer: 'Hydration is the process where client-side React attaches event listeners to server-rendered HTML. A Hydration Mismatch occurs when the pre-rendered server HTML does not match the initial client render tree. Common causes: 1) Using browser-only APIs (`window`, `localStorage`) during initial render. 2) Dynamic dates (`new Date()`) or random numbers (`Math.random()`) differing between server and client. 3) Invalid HTML structure (e.g. `<p>` nesting a `<div>` or `<table>` without `<tbody>`). Fixes: Move client-only checks into `useEffect`, use `suppressHydrationWarning`, or use `dynamic(() => ..., { ssr: false })`.',
    keyPoints: [
      'Server-rendered HTML differs from client initial render snapshot.',
      'Causes: browser globals (window/localStorage), random numbers, non-deterministic dates, invalid HTML nesting.',
      'Fixes: defer to useEffect, suppressHydrationWarning, dynamic import with ssr: false.'
    ],
    quizOptions: [
      { text: 'The computer running out of physical water cooling liquid', isCorrect: false },
      { text: 'Server HTML and initial client render mismatch caused by browser globals, dates, or invalid nesting; fixed with useEffect or ssr: false', isCorrect: true },
      { text: 'A network timeout when downloading CSS styles', isCorrect: false },
      { text: 'Hydration errors are benign and cannot be fixed', isCorrect: false }
    ]
  },
  {
    id: 's2-q83',
    number: 193,
    category: 'Next.js',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', '10Pearls'],
    question: 'Environment variables in Next.js (NEXT_PUBLIC_ prefix, server vs client access)',
    answer: 'In Next.js, environment variables without a prefix (`DATABASE_URL`, `JWT_SECRET`) are server-only secrets: they are accessible exclusively in Server Components, Route Handlers, and `middleware.ts`, and are never exposed to the client browser bundle. To expose an environment variable to the browser/client components, you MUST explicitly prefix its name with `NEXT_PUBLIC_` (e.g. `NEXT_PUBLIC_API_URL`). Next.js inlines these values during build time.',
    keyPoints: [
      'Without prefix: Server-only secret (never bundled to browser).',
      'With NEXT_PUBLIC_: Inlined into client JavaScript bundle during build.',
      'Loaded from .env.local (local development overrides).'
    ],
    quizOptions: [
      { text: 'All environment variables in Next.js are visible in client browser DevTools', isCorrect: false },
      { text: 'Server secrets omit prefix and remain server-only; variables prefixed with NEXT_PUBLIC_ are bundled to client browser', isCorrect: true },
      { text: 'NEXT_PUBLIC_ prefix encrypts variables with AES-256', isCorrect: false },
      { text: 'Environment variables cannot be used in Next.js', isCorrect: false }
    ]
  },
  {
    id: 's2-q84',
    number: 194,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'Next.js SEO vs plain React SPAs (metadata API, Open Graph, dynamic sitemaps)',
    answer: 'Plain React SPAs struggle with SEO because crawlers receive an empty HTML shell. Next.js provides complete search engine optimization out-of-the-box: 1) Pre-rendered HTML allows crawlers to read full page content immediately. 2) Metadata API: export a static or dynamic `metadata` object (`title`, `description`, `keywords`). 3) Open Graph cards: configure `openGraph: { images: [...] }` or generate dynamic social share images via `opengraph-image.tsx`. 4) Automated sitemaps (`sitemap.ts`) and `robots.ts` files for search engine indexing.',
    keyPoints: [
      'Server pre-rendering ensures search spiders index actual text, not blank HTML.',
      'Static metadata export or dynamic generateMetadata() function.',
      'Dynamic Open Graph share images and sitemap.ts generation.'
    ],
    quizOptions: [
      { text: 'Plain React SPAs have superior SEO compared to Next.js', isCorrect: false },
      { text: 'Pre-rendered HTML, built-in Metadata API, dynamic generateMetadata, Open Graph images, and sitemap.ts', isCorrect: true },
      { text: 'Google prohibits indexing any website built with Next.js', isCorrect: false },
      { text: 'SEO metadata can only be edited directly on Google Search Console', isCorrect: false }
    ]
  },
  {
    id: 's2-q85',
    number: 195,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer'],
    question: 'generateStaticParams() — purpose and how it works for dynamic routes',
    answer: 'In App Router, `generateStaticParams()` replaces Pages Router\'s `getStaticPaths`. It is used in dynamic routes (e.g. `app/invoices/[id]/page.tsx`) to pre-render static pages at build time instead of on-demand. It returns an array of objects where each object represents the route parameters for that page: `return invoices.map(inv => ({ id: inv._id }))`. When combined with dynamic params, pages listed are generated at build time; unlisted paths can be generated on first visit.',
    keyPoints: [
      'Replaces getStaticPaths in App Router.',
      'Generates static HTML for dynamic routes at build time (SSG).',
      'Returns array of parameter objects matching route segment keys: [{ id: "1" }, { id: "2" }].'
    ],
    codeSnippet: `export async function generateStaticParams() {
  const invoices = await getInvoices();
  return invoices.map(invoice => ({
    id: invoice.id.toString(),
  }));
}`,
    quizOptions: [
      { text: 'generateStaticParams is used to restart database connections', isCorrect: false },
      { text: 'Pre-renders dynamic route segments at build time by returning an array of parameter objects', isCorrect: true },
      { text: 'A client-side hook for reading search query params', isCorrect: false },
      { text: 'Generates random passwords for user accounts', isCorrect: false }
    ]
  },
  {
    id: 's2-q86',
    number: 196,
    category: 'Next.js',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Devsinc'],
    question: 'Deploying a Next.js app (Vercel vs self-hosted Docker container with standalone output)',
    answer: 'Option 1: Vercel — official zero-config deployment platform with automated CI/CD, Edge Middleware, global CDN caching, and automatic ISR. Option 2: Self-hosted Docker — set `output: "standalone"` in `next.config.js`. This creates a minimal, self-contained production bundle containing only the exact files and dependencies required to run the Node server, reducing Docker image size from 1GB+ down to ~100MB. Can be deployed on AWS ECS, GCP Cloud Run, DigitalOcean, or Kubernetes.',
    keyPoints: [
      'Vercel: zero-config, native edge functions and ISR cache orchestration.',
      'Docker standalone: output: "standalone" bundles minimal Node server for containers.',
      'Shrinks container image size by ~80% and isolates production runtime dependencies.'
    ],
    quizOptions: [
      { text: 'Next.js applications can only be deployed on shared cPanel hosting', isCorrect: false },
      { text: 'Vercel for zero-config edge scaling, or Docker container with output: "standalone" for Cloud Run/AWS', isCorrect: true },
      { text: 'Docker images cannot run Next.js apps', isCorrect: false },
      { text: 'You must pay Vercel licensing fees to run Next.js in production', isCorrect: false }
    ]
  },

  // ==============================================================
  // 7. GSAP (10 QUESTIONS: #197 - #206)
  // ==============================================================
  {
    id: 's2-q87',
    number: 197,
    category: 'GSAP',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Arbisoft', 'VentureDive', 'Systems Limited'],
    question: 'GSAP vs CSS animations — when to use GSAP (complex timelines, SVG, scroll-driven)',
    answer: 'Use CSS animations for simple micro-interactions (button hover states, simple spinners, basic fade-ins) where performance is native and bundle size is zero. Use GSAP when building: 1) Complex sequences: GSAP Timelines let you choreograph dozens of animations without calculating nested CSS delays. 2) Scroll-driven animations: ScrollTrigger scrub, pinning, and parallax. 3) SVG path morphing and line drawing. 4) Dynamic, physics-based, or user-interruptible animations. 5) Cross-browser consistency with zero transform bugs.',
    keyPoints: [
      'CSS: simple hovers, basic transitions, zero JavaScript overhead.',
      'GSAP: multi-step timelines, ScrollTrigger, SVG morphing, dynamic sequencing.',
      'Eliminates CSS keyframe delay spaghetti and cross-browser transform inconsistencies.'
    ],
    quizOptions: [
      { text: 'CSS animations are 100x faster than GSAP for all complex 50-step sequences', isCorrect: false },
      { text: 'CSS for simple micro-interactions; GSAP for complex timelines, ScrollTrigger, SVG morphing, and interactive control', isCorrect: true },
      { text: 'GSAP was banned by web browser standards', isCorrect: false },
      { text: 'CSS animations cannot animate opacity', isCorrect: false }
    ]
  },
  {
    id: 's2-q88',
    number: 198,
    category: 'GSAP',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', 'pieCyfer'],
    question: 'gsap.to(), gsap.from(), gsap.fromTo() — syntax and differences',
    answer: '`gsap.to(target, { vars })`: animates from the element\'s current visual state TO the specified values. `gsap.from(target, { vars })`: animates FROM the specified values to the element\'s natural, pre-existing CSS values (great for entrance effects). `gsap.fromTo(target, { fromVars }, { toVars })`: explicitly defines BOTH starting and ending values, giving you total control regardless of existing CSS styles or previous animation states.',
    keyPoints: [
      'gsap.to(): current state -> specified state.',
      'gsap.from(): specified state -> natural CSS state.',
      'gsap.fromTo(): explicit start state -> explicit end state.'
    ],
    codeSnippet: `gsap.to('.box', { x: 200, duration: 1 });
gsap.from('.box', { opacity: 0, y: 50, duration: 1 });
gsap.fromTo('.box', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 });`,
    quizOptions: [
      { text: 'gsap.fromTo requires 10 separate animation files', isCorrect: false },
      { text: 'gsap.to animates to target values; gsap.from animates from target values; gsap.fromTo explicitly sets both start and end values', isCorrect: true },
      { text: 'gsap.to only works on 3D canvas objects', isCorrect: false },
      { text: 'gsap.from animates backwards in time on every click', isCorrect: false }
    ]
  },
  {
    id: 's2-q89',
    number: 199,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Arbisoft'],
    question: 'GSAP Timeline — chaining animations, position parameter ("<", "+=1", label)',
    answer: 'A GSAP Timeline (`const tl = gsap.timeline()`) coordinates and sequences multiple animations without manual delay calculations. The Position Parameter controls WHEN a tween starts in the timeline: 1) Omitted: appends to the end of the timeline sequentially. 2) Absolute number (`2`): starts exactly at the 2-second mark. 3) Relative string (`"+=1"` or `"-=0.5"`): starts 1s after previous tween ends, or overlaps by 0.5s. 4) Alignment (`"<"`): starts at the EXACT same time as the previous tween. 5) Labels (`tl.add("hero")`): synchronize tweens to named markers.',
    keyPoints: [
      'Chains multiple animations without manual delay calculations.',
      'Position parameters: relative ("+=1", "-=0.5"), sync ("<"), or labels.',
      'Timeline playback controls: tl.play(), tl.pause(), tl.reverse(), tl.seek().'
    ],
    quizOptions: [
      { text: 'Position parameter must always be a date timestamp', isCorrect: false },
      { text: 'Chains sequential tweens: position parameter controls timing via relative offsets ("+=1"), sync ("<"), or labels', isCorrect: true },
      { text: 'GSAP timelines can only run a single animation', isCorrect: false },
      { text: 'Timelines automatically delete DOM elements when completed', isCorrect: false }
    ]
  },
  {
    id: 's2-q90',
    number: 200,
    category: 'GSAP',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['10Pearls', 'Devsinc'],
    question: 'Stagger animations — syntax, grid stagger, easing',
    answer: 'Stagger animates a group of matching elements with an incremental delay between each one. Syntax: `gsap.to(".card", { y: 0, opacity: 1, stagger: 0.1 })`. Advanced object configuration: `{ each: 0.1, from: "center" | "edges" | "random" }`. Grid staggers (`grid: [rows, cols]`) animate elements outward in a radial wave or grid pattern. Stagger easing (`ease: "power2.in"`) accelerates or decelerates the interval between element start times.',
    keyPoints: [
      'Simple stagger: stagger: 0.1 (applies 100ms interval between targets).',
      'Advanced object: { each: 0.1, from: "center", grid: "auto" }.',
      'Produces beautiful cascading entrances for cards, lists, and nav items.'
    ],
    quizOptions: [
      { text: 'Stagger animations randomly crash the browser on mobile', isCorrect: false },
      { text: 'Applies incremental delays between multiple elements with options for origin (from: "center"), grids, and easing', isCorrect: true },
      { text: 'Stagger requires writing 20 separate CSS keyframe rules', isCorrect: false },
      { text: 'Stagger can only be used on table rows', isCorrect: false }
    ]
  },
  {
    id: 's2-q91',
    number: 201,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'VentureDive'],
    question: 'ScrollTrigger — scrub, pin, start/end, markers, snap',
    answer: 'ScrollTrigger connects GSAP animations directly to viewport scroll progress. Key properties: 1) `trigger`: target element that initiates the trigger. 2) `start` / `end`: defines when the trigger begins and ends (e.g. `start: "top 80%"`). 3) `scrub`: links animation progress directly to scrollbar movement (`scrub: true` or `scrub: 1` for smooth lag). 4) `pin`: locks element in place during scroll (`pin: true`). 5) `markers: true`: shows visual debugging guidelines in dev. 6) `snap`: snaps scroll position to key animation points.',
    keyPoints: [
      'scrub: links tween progress directly to scrollbar.',
      'pin: fixes element in viewport while scroll animation plays.',
      'start / end: "trigger-edge viewport-edge" (e.g. "top center").',
      'markers: true displays visual debug guides.'
    ],
    quizOptions: [
      { text: 'ScrollTrigger is a database trigger for MongoDB', isCorrect: false },
      { text: 'Connects animations to scroll position with scrubbing, element pinning, start/end thresholds, and snap points', isCorrect: true },
      { text: 'ScrollTrigger only runs on Apple Safari browsers', isCorrect: false },
      { text: 'Pinning an element permanently hides it from the screen', isCorrect: false }
    ]
  },
  {
    id: 's2-q92',
    number: 202,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'GSAP with React — lifecycle considerations, cleanup on unmount',
    answer: 'In React, animations must be scoped and cleaned up on unmount to prevent memory leaks, duplicate conflicting tweens, and glitchy animations caused by React 18 Strict Mode double-invoking effects. Use `@gsap/react` package\'s `useGSAP()` hook. It automatically reverts all tweens, timelines, and ScrollTriggers created within its scope when the component unmounts. If using raw `useEffect`/`useLayoutEffect`, wrap tweens in `gsap.context()` and return `ctx.revert()` in the cleanup callback.',
    keyPoints: [
      'React 18 Strict Mode mounts, unmounts, and re-mounts components in development.',
      'Uncleaned tweens cause phantom animations and memory leaks.',
      'Use useGSAP() hook or gsap.context() with cleanup return () => ctx.revert().'
    ],
    quizOptions: [
      { text: 'GSAP animations should never be cleaned up on unmount', isCorrect: false },
      { text: 'Animations must be cleaned up on unmount using useGSAP() or gsap.context().revert() to prevent memory leaks and glitches', isCorrect: true },
      { text: 'GSAP only works with jQuery in React', isCorrect: false },
      { text: 'React Strict Mode automatically cleans up GSAP tweens without code', isCorrect: false }
    ]
  },
  {
    id: 's2-q93',
    number: 203,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Arbisoft'],
    question: 'gsap.context() in React (reverting animations on unmount to prevent leaks)',
    answer: '`gsap.context()` is a scoping and cleanup mechanism introduced in GSAP 3.11. How it works: 1) Wraps all animations created in a component into a single context. 2) Allows scoped selectors (e.g. `gsap.to(".box", ...)` only selects `.box` elements INSIDE the referenced container, avoiding global DOM selector pollution). 3) Calling `ctx.revert()` instantly kills all tweens, restores original inline CSS styles, and unmounts all ScrollTriggers created within the context in a single call.',
    keyPoints: [
      'Scoped selector resolution within ref container.',
      'One-line complete cleanup via ctx.revert().',
      'Underpins the official useGSAP() React hook.'
    ],
    codeSnippet: `useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.card', { opacity: 1, stagger: 0.1 });
  }, containerRef); // Scoped to containerRef

  return () => ctx.revert(); // Complete cleanup on unmount!
}, []);`,
    quizOptions: [
      { text: 'gsap.context() converts React components into HTML canvas elements', isCorrect: false },
      { text: 'Scopes selectors to a container and provides ctx.revert() to kill tweens and restore styles on unmount', isCorrect: true },
      { text: 'A React context provider that replaces Redux', isCorrect: false },
      { text: 'gsap.context() is deprecated in GSAP 3', isCorrect: false }
    ]
  },
  {
    id: 's2-q94',
    number: 204,
    category: 'GSAP',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Systems Limited'],
    question: 'Easing functions in GSAP (power, back, elastic, bounce, custom)',
    answer: 'Easing dictates the acceleration and deceleration rate of an animation over time. Types: 1) `power1`, `power2`, `power3`, `power4` (increasing curvature, equivalent to quad, cubic, quart, quint). 2) Directional modifiers: `.in` (starts slow, speeds up), `.out` (starts fast, eases to stop — default in GSAP), `.inOut` (accelerates then decelerates). 3) Expressive eases: `back.out(1.7)` (overshoots and settles), `elastic.out(1, 0.3)` (springy rebound), `bounce.out` (bounces like a ball). 4) `CustomEase` plugin for custom bezier curves.',
    keyPoints: [
      'Default in GSAP is power1.out (fast start, gradual deceleration).',
      '.in (accelerates), .out (decelerates), .inOut (smooth S-curve).',
      'Physics eases: back (overshoot), elastic (spring), bounce (ball drop).'
    ],
    quizOptions: [
      { text: 'All animations in GSAP must run at a strictly linear constant speed', isCorrect: false },
      { text: 'Controls acceleration/deceleration: power curves, directional modifiers (.in, .out, .inOut), and physics eases (back, elastic, bounce)', isCorrect: true },
      { text: 'Easing functions only work on sound volume', isCorrect: false },
      { text: 'Bounce ease can only be applied to circles', isCorrect: false }
    ]
  },
  {
    id: 's2-q95',
    number: 205,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'VentureDive'],
    question: 'Animating SVG paths in GSAP (DrawSVG plugin, strokeDasharray, strokeDashoffset)',
    answer: 'SVG line-drawing animation relies on manipulating two CSS properties: `stroke-dasharray` (specifies dash/gap lengths) and `stroke-dashoffset` (offsets where the dash pattern begins). By setting both equal to the total path length (`path.getTotalLength()`), the path starts hidden; animating `strokeDashoffset` to `0` reveals the stroke as if drawn in real time. The GSAP `DrawSVGPlugin` simplifies this into a single property: `gsap.fromTo(path, { drawSVG: "0%" }, { drawSVG: "100%", duration: 2 })`.',
    keyPoints: [
      'Uses SVG stroke-dasharray and stroke-dashoffset techniques.',
      'DrawSVGPlugin abstracts path length calculations into percentages ("0%" -> "100%").',
      'Produces animated handwritten text, self-assembling icons, and vector charts.'
    ],
    quizOptions: [
      { text: 'SVG paths cannot be animated with JavaScript', isCorrect: false },
      { text: 'Animates strokeDashoffset from path length to 0, or uses DrawSVGPlugin ({ drawSVG: "100%" }) for line-drawing effects', isCorrect: true },
      { text: 'Requires converting all vector paths to raster GIF images', isCorrect: false },
      { text: 'Only works with rectangular SVG shapes', isCorrect: false }
    ]
  },
  {
    id: 's2-q96',
    number: 206,
    category: 'GSAP',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'Optimizing GSAP animations for performance (will-change, transform vs left/top, 60fps)',
    answer: '1) Animate GPU-accelerated transform properties (`x`, `y`, `scale`, `rotation`, `skew`) and `opacity`. NEVER animate `left`, `top`, `width`, `height`, or `margin` as they trigger layout reflow and repaint. 2) Use `force3D: true` (default in GSAP) to promote animated elements to their own GPU compositor layer via `translate3d()`. 3) Use `will-change: transform` judiciously on complex elements. 4) Use `gsap.ticker` instead of native `requestAnimationFrame` for synchronized render loops. 5) Avoid animating hundreds of off-screen elements.',
    keyPoints: [
      'Stick strictly to transforms (x, y, scale) and opacity.',
      'Avoid layout thrashing properties (top, left, width, margin).',
      'GPU layer promotion via force3D ensures silky 60fps / 120fps playback.'
    ],
    quizOptions: [
      { text: 'Animate width, height, and margin to maximize performance', isCorrect: false },
      { text: 'Animate GPU-accelerated transforms (x, y, scale) and opacity, leverage force3D layer promotion, and avoid layout reflows', isCorrect: true },
      { text: 'Set animation duration to 0.001 seconds for maximum speed', isCorrect: false },
      { text: 'Disable GPU acceleration in browser settings', isCorrect: false }
    ]
  },

  // ==============================================================
  // 8. SYSTEM DESIGN / FULL-STACK INTEGRATION (8 QUESTIONS: #207 - #214)
  // ==============================================================
  {
    id: 's2-q97',
    number: 207,
    category: 'System Design',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'Arbisoft'],
    question: 'How would you design the architecture for a full-stack invoice management system? (MERN stack: models, routes, auth, state)',
    answer: '1) Database (MongoDB/Mongoose): `User` model (auth, role, organization), `Client` model (contact details, billing address), `Invoice` model (invoiceNumber, client ref, items array with description/qty/rate, subtotal, tax, total, status enum, dueDate). 2) Backend (Express): REST API with modular routers (`/api/auth`, `/api/invoices`), JWT verification middleware, input validation with Zod schemas, PDF generation service using PDFKit/Puppeteer, email notification service. 3) Frontend (React/Next.js): Protected dashboard, TanStack Query for server state caching, React Hook Form + Zod for invoice creation, responsive data table with sorting/filtering, modal previews, and optimistic status updates.',
    keyPoints: [
      'Database: User, Client, Invoice schemas with indexed client refs and status.',
      'Backend: Modular Express routers, JWT middleware, Zod validation, PDF generation.',
      'Frontend: TanStack Query server caching, React Hook Form, optimistic status updates.',
      'RBAC: Admins can delete/edit all; Employees can only view/create their assigned clients.'
    ],
    quizOptions: [
      { text: 'Store all invoice records inside a text file on the frontend client browser', isCorrect: false },
      { text: 'MERN architecture: MongoDB (User/Client/Invoice models), Express REST API (JWT, Zod, PDF generation), and React (TanStack Query, forms, optimistic UI)', isCorrect: true },
      { text: 'Invoice management systems do not require databases', isCorrect: false },
      { text: 'Use plain HTML forms without validation or authentication', isCorrect: false }
    ]
  },
  {
    id: 's2-q98',
    number: 208,
    category: 'System Design',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited', 'Devsinc'],
    question: 'How do you handle authentication & authorization across a MERN + Next.js app? (JWT, cookies, middleware, RBAC)',
    answer: '1) Token Storage: Store JWT access tokens in `HttpOnly`, `Secure`, `SameSite=Lax` cookies to prevent XSS theft. 2) Next.js Middleware (`middleware.ts`): inspects cookies on incoming requests; if token is missing/expired, redirects to `/login`. 3) Express Backend Middleware: verifies token signature and extracts `{ userId, role }` onto `req.user`. 4) Role-Based Access Control (RBAC): authorization middleware (`authorize("admin", "manager")`) checks `req.user.role` before granting access to sensitive mutation routes (e.g. deleting invoices or changing rates).',
    keyPoints: [
      'HttpOnly Secure cookies prevent JavaScript XSS token extraction.',
      'Next.js middleware protects frontend routes and redirects unauthorized visitors.',
      'Express authorization middleware enforces role-based endpoint permissions (RBAC).',
      'Dual-layer enforcement: client routing + server API security.'
    ],
    quizOptions: [
      { text: 'Store unencrypted passwords in browser localStorage for convenient auto-login', isCorrect: false },
      { text: 'JWT in HttpOnly Secure cookies, Next.js middleware for route protection, and Express backend RBAC middleware checking user roles', isCorrect: true },
      { text: 'Authentication is only needed when users create accounts, never on login', isCorrect: false },
      { text: 'All users should have full admin privileges to prevent access errors', isCorrect: false }
    ]
  },
  {
    id: 's2-q99',
    number: 209,
    category: 'System Design',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'pieCyfer'],
    question: 'How to connect a Next.js frontend to an Express backend? (API routes as proxy vs direct fetch with CORS, cookies forwarding)',
    answer: 'Two architectural patterns: 1) Direct Fetch with CORS: Next.js frontend calls Express (`https://api.backend.com`) directly from client components. Requires configuring `cors` on Express with `credentials: true` and explicit origin whitelisting. 2) Next.js Route Handlers as Proxy / BFF (Backend-for-Frontend): Next.js acts as an intermediary (`app/api/invoices/route.ts` forwards requests to Express server-to-server). Benefits of BFF pattern: hides backend API endpoints, eliminates browser CORS issues, securely attaches secret API tokens on the server, and rewrites responses without exposing internal microservice architecture.',
    keyPoints: [
      'Pattern 1: Direct client fetch with strict CORS whitelisting and credentials: true.',
      'Pattern 2: BFF Proxy via Next.js Route Handlers forwarding server-to-server.',
      'BFF eliminates browser CORS and conceals backend microservice URLs.'
    ],
    quizOptions: [
      { text: 'Next.js and Express cannot communicate over HTTP', isCorrect: false },
      { text: 'Direct client fetch with configured CORS & credentials, or Next.js Route Handlers acting as a BFF proxy server-to-server', isCorrect: true },
      { text: 'Express must be compiled directly into the Next.js bundle file', isCorrect: false },
      { text: 'Communication requires physical serial cables between computers', isCorrect: false }
    ]
  },
  {
    id: 's2-q100',
    number: 210,
    category: 'System Design',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'How do you handle state synchronization between frontend and database? (Optimistic UI updates, cache invalidation with React Query / SWR)',
    answer: 'Use TanStack Query (React Query) or SWR: 1) Server State Caching: stores API query responses in client memory, deduplicating identical requests. 2) Optimistic UI Updates: when user performs a mutation (e.g. marking an invoice as "paid"), immediately update local React Query cache and UI before network completes. Save a rollback snapshot of previous state. 3) Confirmation / Rollback: If backend mutation succeeds, invalidate queries (`queryClient.invalidateQueries([\'invoices\'])`) to fetch canonical state. If request fails, rollback cache to snapshot and show an error toast.',
    keyPoints: [
      'TanStack Query/SWR manages caching, background re-fetching, and deduping.',
      'Optimistic updates: update UI instantly -> save snapshot -> commit or rollback on error.',
      'queryClient.invalidateQueries() refreshes cache after mutations.'
    ],
    quizOptions: [
      { text: 'Force the entire webpage to reload via window.location.reload() after every click', isCorrect: false },
      { text: 'TanStack Query with optimistic UI updates (instant local update, rollback snapshot on error) and query cache invalidation', isCorrect: true },
      { text: 'Store database state in CSS variables', isCorrect: false },
      { text: 'Never update the frontend UI after network calls', isCorrect: false }
    ]
  },
  {
    id: 's2-q101',
    number: 211,
    category: 'System Design',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['10Pearls', 'Arbisoft', 'Systems Limited'],
    question: 'How to paginate and filter a large list of invoices efficiently? (cursor-based vs offset-based pagination in MongoDB, indexing)',
    answer: '1) Offset-based (`.skip((page - 1) * limit).limit(limit)`): simple to implement with page numbers, but performance degrades drastically on large datasets (MongoDB must scan all skipped documents in memory) and causes duplicate/missing items if records are inserted during browsing. 2) Cursor-based / Keyset pagination: queries items using the last seen record\'s unique sort value (`{ createdAt: { $lt: lastCreatedAt }, _id: { $lt: lastId } }`). Maintains constant O(1) index lookup speed regardless of page depth. 3) Filtering: create compound indexes matching Equality-Sort-Range (ESR) rule (e.g. `{ status: 1, createdAt: -1 }`).',
    keyPoints: [
      'Offset (.skip/.limit): simple for small tables; O(N) performance degrades at deep pages.',
      'Cursor-based: uses last item timestamp/ID; constant O(1) index seek for infinite scroll.',
      'Compound index matching filter and sort keys (status + createdAt).'
    ],
    quizOptions: [
      { text: 'Download all 10 million invoices into the browser array and use JavaScript slice()', isCorrect: false },
      { text: 'Cursor-based pagination using indexed field lookups ({ _id: { $gt: lastId } }) for constant O(1) speed, or indexed offset for small sets', isCorrect: true },
      { text: 'Pagination cannot be implemented in MongoDB', isCorrect: false },
      { text: 'Offset pagination is faster than cursor pagination on 100 million records', isCorrect: false }
    ]
  },
  {
    id: 's2-q102',
    number: 212,
    category: 'System Design',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc', '10Pearls'],
    question: 'REST vs GraphQL — when would you choose which for a Pakistani outsourcing company\'s client project?',
    answer: 'REST: Default choice for most client projects. Pros: universal developer familiarity, built-in HTTP caching (Varnish, Cloudflare CDN), simple file uploads, minimal tooling overhead, and faster onboarding for offshore teams. GraphQL: Choose when: 1) Client applications have wildly diverse data requirements (e.g. mobile app needs 3 fields; desktop dashboard needs 40 fields), eliminating over-fetching/under-fetching. 2) Aggregating multiple microservices into a unified schema graph. Downsides of GraphQL: complex HTTP caching, N+1 query problem (requires DataLoader), added learning curve.',
    keyPoints: [
      'REST: Industry standard, easy CDN caching, simple file handling, low ramp-up time.',
      'GraphQL: Prevents over/under-fetching across mobile and desktop; unified API gateway.',
      'In outsourcing contexts, REST often reduces project risk unless multi-client mobile needs demand GraphQL.'
    ],
    quizOptions: [
      { text: 'GraphQL replaces HTTP protocol with Bluetooth', isCorrect: false },
      { text: 'REST for standard projects, simple CDN caching, and lower team ramp-up; GraphQL when varied clients (mobile/web) require tailored payloads without over-fetching', isCorrect: true },
      { text: 'REST APIs cannot return JSON data', isCorrect: false },
      { text: 'GraphQL only runs on Facebook servers', isCorrect: false }
    ]
  },
  {
    id: 's2-q103',
    number: 213,
    category: 'System Design',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc', 'Arbisoft'],
    question: 'How to deploy and manage environments (dev, staging, production) for a full-stack MERN/Next.js app? (Vercel, Railway/Render/AWS, MongoDB Atlas, CI/CD with GitHub Actions)',
    answer: '1) Environments: Isolated dev, staging (mirrors production data/config for QA client approval), and production environments with separate database instances on MongoDB Atlas (`db-dev`, `db-staging`, `db-prod`). 2) Hosting: Next.js frontend deployed on Vercel with preview deployments per pull request; Express backend deployed on AWS ECS / GCP Cloud Run / Railway. 3) CI/CD (GitHub Actions): on PR creation, run automated linting, unit tests, and build verification. On merge to `develop`, auto-deploy to Staging. On merge to `main`, run smoke tests and deploy to Production with zero downtime.',
    keyPoints: [
      'Separate database clusters for dev, staging, and production on MongoDB Atlas.',
      'GitHub Actions CI/CD runs lint, tests, and automated deployment pipelines.',
      'Vercel preview branches for client review before production merge.'
    ],
    quizOptions: [
      { text: 'Test new code directly on the production database without staging', isCorrect: false },
      { text: 'Isolated environments (dev, staging, prod) with separate DBs, automated GitHub Actions CI/CD, and zero-downtime deployments', isCorrect: true },
      { text: 'Deploying requires copying files manually using USB drives', isCorrect: false },
      { text: 'Environment variables must be identical across all staging and production servers', isCorrect: false }
    ]
  },
  {
    id: 's2-q104',
    number: 214,
    category: 'System Design',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited', 'Devsinc', 'Netsol'],
    question: 'What are the common security practices expected by Pakistani interviewers? (Input validation, injection prevention, XSS, CSRF, rate limiting, secure headers with Helmet)',
    answer: 'Interviewers look for defense-in-depth: 1) Input Validation: Zod schemas on all API inputs rejecting unexpected types. 2) Injection Prevention: prepared statements for SQL; `express-mongo-sanitize` for NoSQL. 3) XSS Prevention: never use `dangerouslySetInnerHTML`, sanitize user-generated HTML with DOMPurify, store tokens in `HttpOnly` cookies. 4) CSRF Prevention: `SameSite=Lax` or `Strict` cookies and CSRF tokens for mutating methods. 5) Rate Limiting: `express-rate-limit` to prevent brute-force attacks. 6) Secure Headers: `helmet` to enforce HSTS, CSP, and X-Content-Type-Options. 7) Secrets: Git-ignored `.env` files and least-privilege database user roles.',
    keyPoints: [
      'Input validation via Zod; injection prevention via mongo-sanitize.',
      'XSS prevention via HttpOnly cookies and HTML sanitization.',
      'CSRF prevention via SameSite cookies; rate limiting via express-rate-limit.',
      'Helmet for secure HTTP headers; strict secrets management.'
    ],
    quizOptions: [
      { text: 'Security is only necessary for banking websites, not standard web applications', isCorrect: false },
      { text: 'Input validation (Zod), NoSQL sanitization, HttpOnly cookies for XSS defense, SameSite for CSRF, rate-limiting, and Helmet headers', isCorrect: true },
      { text: 'Security headers make web pages load 10x slower', isCorrect: false },
      { text: 'Store database root credentials inside GitHub README files', isCorrect: false }
    ]
  }
];
