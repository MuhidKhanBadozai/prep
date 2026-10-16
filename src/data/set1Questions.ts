import { Question } from '../types';

export const SET1_QUESTIONS: Question[] = [
  // ==========================================
  // PART 1: MONGODB (20 QUESTIONS)
  // ==========================================
  {
    id: 's1-q1',
    number: 1,
    category: 'MongoDB',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Systems Limited', 'Devsinc'],
    question: 'What is MongoDB and how is it different from SQL databases?',
    answer: 'MongoDB is a NoSQL, document-oriented database that stores data as JSON-like documents (BSON). Unlike relational databases, there are no tables with fixed schemas — each document can have different fields. It\'s designed for flexibility, horizontal scaling, and developer productivity.',
    keyPoints: [
      'Document-oriented NoSQL storage using BSON (Binary JSON).',
      'Dynamic schema: records in the same collection can have distinct fields.',
      'Designed for horizontal scale-out via sharding and high availability via replica sets.'
    ],
    quizOptions: [
      { text: 'A relational database that enforces strict SQL tables and foreign keys', isCorrect: false },
      { text: 'A NoSQL document-oriented database storing JSON-like BSON records with dynamic schemas', isCorrect: true },
      { text: 'An in-memory key-value cache identical to Redis', isCorrect: false },
      { text: 'A columnar data warehouse that does not support JSON', isCorrect: false }
    ]
  },
  {
    id: 's1-q2',
    number: 2,
    category: 'MongoDB',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', '10Pearls'],
    question: 'What is a document in MongoDB?',
    answer: 'A document is a single record in MongoDB stored as BSON (Binary JSON). It contains key-value pairs like a JSON object. Documents can have nested objects and arrays. Maximum document size is 16MB.',
    keyPoints: [
      'Basic unit of data in MongoDB, stored as BSON.',
      'Supports embedded documents and arrays.',
      'Strict 16MB maximum limit per document (GridFS used for larger binary data).'
    ],
    quizOptions: [
      { text: 'A text file containing SQL statements', isCorrect: false },
      { text: 'A single BSON record of key-value pairs with a maximum size limit of 16MB', isCorrect: true },
      { text: 'An unchangeable table schema', isCorrect: false },
      { text: 'A virtual index pointer', isCorrect: false }
    ]
  },
  {
    id: 's1-q3',
    number: 3,
    category: 'MongoDB',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer'],
    question: 'What is a collection in MongoDB?',
    answer: 'A collection is a group of documents — roughly equivalent to a table in SQL. Unlike SQL tables, collections have no enforced schema by default. Collections are created automatically when you insert the first document.',
    keyPoints: [
      'Analogous to a table in SQL, but schema-free by default.',
      'Created implicitly when the first document is inserted into it.',
      'Stored together inside a MongoDB database namespace.'
    ],
    quizOptions: [
      { text: 'A group of MongoDB databases', isCorrect: false },
      { text: 'A grouping of MongoDB documents, analogous to a relational table', isCorrect: true },
      { text: 'A single column in a BSON table', isCorrect: false },
      { text: 'A replica set backup file', isCorrect: false }
    ]
  },
  {
    id: 's1-q4',
    number: 4,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'What is BSON?',
    answer: 'BSON (Binary JSON) is the binary format MongoDB uses to store documents. It extends JSON with additional types: Date, ObjectId, and binary data, enabling faster traversal and richer data types.',
    keyPoints: [
      'Binary-encoded serialization of JSON-like documents.',
      'Supports types absent in standard JSON: Date, ObjectId, Decimal128, and BinData.',
      'Engineered for rapid parsing, indexing, and lightweight memory traversal.'
    ],
    quizOptions: [
      { text: 'Basic Script Object Notation', isCorrect: false },
      { text: 'Binary JSON, providing extra data types like Date and ObjectId for rapid traversal', isCorrect: true },
      { text: 'Browser Storage Object Network', isCorrect: false },
      { text: 'A proprietary encryption protocol for MongoDB Atlas', isCorrect: false }
    ]
  },
  {
    id: 's1-q5',
    number: 5,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'What are indexes in MongoDB and how do they improve performance?',
    answer: 'Indexes are special data structures that store a small portion of the collection\'s data set in an easy-to-traverse form. They improve the efficiency of read operations by reducing the number of documents MongoDB must scan. Without an index, MongoDB must perform a collection scan.',
    keyPoints: [
      'Usually implemented as B-tree data structures.',
      'Dramatically lowers execution time from O(N) collection scans to O(log N) index lookups.',
      'Trade-off: writes/updates incur overhead to update index trees.'
    ],
    quizOptions: [
      { text: 'Indexes duplicate the whole database into RAM', isCorrect: false },
      { text: 'Data structures storing key subsets in sorted form to prevent full collection scans', isCorrect: true },
      { text: 'Auto-incrementing counters generated for each field', isCorrect: false },
      { text: 'Security tokens used to encrypt documents', isCorrect: false }
    ]
  },
  {
    id: 's1-q6',
    number: 6,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Systems Limited'],
    question: 'What is the Aggregation Framework in MongoDB?',
    answer: 'The aggregation pipeline is a sequence of stages ($match, $group, $project, $sort, $lookup, etc.) chained so each stage\'s output becomes the next stage\'s input. It\'s used for data processing, transformation, and analytics.',
    keyPoints: [
      'Multi-stage pipeline model for data computation and analytics.',
      'Operates sequentially: Document stream -> Stage 1 -> Stage 2 -> Final result.',
      'Replaces legacy map-reduce with native C++ execution speeds.'
    ],
    quizOptions: [
      { text: 'A backup tool for dumping BSON documents to disk', isCorrect: false },
      { text: 'A multi-stage pipeline ($match, $group, etc.) transforming and computing data', isCorrect: true },
      { text: 'An HTTP proxy for querying MongoDB over REST', isCorrect: false },
      { text: 'A graphical user interface inside MongoDB Compass', isCorrect: false }
    ]
  },
  {
    id: 's1-q7',
    number: 7,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Netsol'],
    question: 'Explain the $lookup stage in aggregation.',
    answer: '$lookup performs a left outer join with another collection in the same database to filter in documents from the "joined" collection for processing. It\'s MongoDB\'s equivalent of SQL JOIN.',
    keyPoints: [
      'Performs an equality match between from, localField, foreignField, and outputs to an as array.',
      'Acts like an asynchronous LEFT OUTER JOIN in relational databases.',
      'Can include a nested pipeline since MongoDB 3.6 for correlated subqueries.'
    ],
    quizOptions: [
      { text: 'Searches text indexes using fuzzy regex matching', isCorrect: false },
      { text: 'Performs a left outer join to combine documents from another collection', isCorrect: true },
      { text: 'Deletes orphaned records from secondary collections', isCorrect: false },
      { text: 'Checks user authentication credentials against a remote server', isCorrect: false }
    ]
  },
  {
    id: 's1-q8',
    number: 8,
    category: 'MongoDB',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Systems Limited', 'Arbisoft'],
    question: 'What is sharding in MongoDB?',
    answer: 'Sharding is a method for distributing data across multiple machines. MongoDB uses sharding to support deployments with very large data sets and high throughput operations. A shard key determines how data is distributed.',
    keyPoints: [
      'Horizontal partitioning of data across multiple database server instances (shards).',
      'Uses a designated shard key to partition data into chunks.',
      'Mongos query routers automatically route client queries to the correct shards.'
    ],
    quizOptions: [
      { text: 'Replicating data on 3 nodes for backup purposes', isCorrect: false },
      { text: 'Distributing data across multiple physical machines using a shard key', isCorrect: true },
      { text: 'Compressing large 16MB documents on disk', isCorrect: false },
      { text: 'Encrypting documents before writing to storage', isCorrect: false }
    ]
  },
  {
    id: 's1-q9',
    number: 9,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Devsinc'],
    question: 'What is a replica set in MongoDB?',
    answer: 'A replica set is a group of MongoDB instances that maintain the same data set. It provides redundancy and high availability. One node is the primary (accepts writes), and others are secondary (replicate the primary\'s data).',
    keyPoints: [
      'High availability mechanism with automatic failover elections.',
      'Primary receives all write operations; secondaries replicate the primary\'s oplog.',
      'If primary becomes unavailable, secondaries elect a new primary within seconds.'
    ],
    quizOptions: [
      { text: 'A group of indexes created on a single table', isCorrect: false },
      { text: 'A group of MongoDB instances maintaining identical data with automatic failover', isCorrect: true },
      { text: 'A set of sharded clusters running in parallel', isCorrect: false },
      { text: 'A collection of client connection pools in Express', isCorrect: false }
    ]
  },
  {
    id: 's1-q10',
    number: 10,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Systems Limited'],
    question: 'When should you embed documents vs. reference them?',
    answer: 'Embed when: data is accessed together, one-to-few relationships, data doesn\'t change often. Reference when: data is accessed separately, one-to-many or many-to-many relationships, data changes frequently, or documents would exceed 16MB.',
    keyPoints: [
      'Embed for 1-to-few: provides atomic single-query reads without joins.',
      'Reference for 1-to-many / M-to-N: prevents unbounded array growth and 16MB document cap.',
      'Reference when child entities are updated frequently in isolation.'
    ],
    quizOptions: [
      { text: 'Always embed everything because MongoDB cannot handle references', isCorrect: false },
      { text: 'Embed for tightly-coupled 1-to-few; reference for 1-to-many, frequently changing data, or >16MB limits', isCorrect: true },
      { text: 'Always reference because embedding causes database deadlocks', isCorrect: false },
      { text: 'Embedding is only allowed for string arrays', isCorrect: false }
    ]
  },
  {
    id: 's1-q11',
    number: 11,
    category: 'MongoDB',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'How do you handle transactions in MongoDB?',
    answer: 'MongoDB supports multi-document ACID transactions since version 4.0 for replica sets. Use `session.startTransaction()`, perform operations, then `session.commitTransaction()` or `session.abortTransaction()`.',
    keyPoints: [
      'Multi-document ACID transactions enabled across replica sets (and sharded clusters in 4.2+).',
      'Executed within a ClientSession context.',
      'Abort rolls back all staged write operations atomically if an error occurs.'
    ],
    quizOptions: [
      { text: 'MongoDB has no concept of transactions whatsoever', isCorrect: false },
      { text: 'Using ClientSession with session.startTransaction(), commitTransaction(), and abortTransaction()', isCorrect: true },
      { text: 'Using raw SQL COMMIT queries via an ODBC driver', isCorrect: false },
      { text: 'Transactions are only possible by locking the entire database globally', isCorrect: false }
    ]
  },
  {
    id: 's1-q12',
    number: 12,
    category: 'MongoDB',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Netsol'],
    question: 'What is the difference between findOne() and find()?',
    answer: '`findOne()` returns a single document matching the query. `find()` returns a cursor to all matching documents. `findOne()` is equivalent to `find().limit(1)` but returns the document directly.',
    keyPoints: [
      'findOne(): returns raw document object directly or null.',
      'find(): returns a cursor that lazily retrieves documents.',
      'findOne() terminates immediately after reading the first match.'
    ],
    quizOptions: [
      { text: 'findOne() only searches by _id, find() searches by any field', isCorrect: false },
      { text: 'findOne() returns a single document object directly; find() returns an iterable cursor to matches', isCorrect: true },
      { text: 'find() returns documents in reverse order', isCorrect: false },
      { text: 'findOne() throws an exception if more than one match exists', isCorrect: false }
    ]
  },
  {
    id: 's1-q13',
    number: 13,
    category: 'MongoDB',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'What is the purpose of the ObjectId in MongoDB?',
    answer: 'ObjectId is the default primary key for MongoDB documents. It\'s a 12-byte BSON type that includes a 4-byte timestamp, 5-byte random value, and 3-byte incrementing counter. It\'s unique across collections and databases.',
    keyPoints: [
      '12-byte globally unique identifier: 4-byte Unix timestamp, 5-byte random value, 3-byte counter.',
      'Naturally ordered by creation time.',
      'Extractable creation date via ObjectId.getTimestamp().'
    ],
    quizOptions: [
      { text: 'A random 32-character MD5 hash without timestamp information', isCorrect: false },
      { text: 'A 12-byte BSON type with timestamp, machine randomness, and counter ensuring global uniqueness', isCorrect: true },
      { text: 'An integer counter starting at 1 for each collection', isCorrect: false },
      { text: 'An encrypted SHA-256 password hash', isCorrect: false }
    ]
  },
  {
    id: 's1-q14',
    number: 14,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Arbisoft'],
    question: 'How do you optimize MongoDB queries?',
    answer: 'Use indexes appropriately, use `explain()` to analyze query performance, use projection to return only needed fields, use `$match` early in aggregation pipelines, avoid `$where` and JavaScript execution, and use covered queries when possible.',
    keyPoints: [
      'Ensure index coverage for sort and filter criteria (avoid COLLSCAN).',
      'Use projection ({ title: 1, _id: 0 }) to reduce network payload and memory.',
      'Place $match and $limit as early as possible in aggregation pipelines.'
    ],
    quizOptions: [
      { text: 'Remove all indexes so writes run at maximum speed', isCorrect: false },
      { text: 'Create targeted indexes, use explain(), project only needed fields, and place $match early', isCorrect: true },
      { text: 'Store all data in a single giant document', isCorrect: false },
      { text: 'Run every query inside a JavaScript $where block', isCorrect: false }
    ]
  },
  {
    id: 's1-q15',
    number: 15,
    category: 'MongoDB',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'What is a covered query?',
    answer: 'A covered query is a query where all the fields in the query are part of an index, and all the fields returned in the results are in the same index. MongoDB can satisfy the query entirely using the index without examining any documents.',
    keyPoints: [
      'Satisfied 100% from RAM index nodes without touching documents on disk.',
      'Requires explicit projection excluding _id if _id is not part of the index.',
      'Extremely fast execution with totalDocsExamined: 0 in explain().'
    ],
    quizOptions: [
      { text: 'A query wrapped in a try/catch transaction block', isCorrect: false },
      { text: 'A query where all queried and returned fields exist in the index, scanning 0 documents on disk', isCorrect: true },
      { text: 'A query protected by database encryption keys', isCorrect: false },
      { text: 'A query that searches every collection at once', isCorrect: false }
    ]
  },
  {
    id: 's1-q16',
    number: 16,
    category: 'MongoDB',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Netsol'],
    question: 'What are the different types of NoSQL databases?',
    answer: 'Document stores (MongoDB, CouchDB), Key-value stores (Redis, DynamoDB), Wide-column stores (Cassandra, HBase), Graph databases (Neo4j, Amazon Neptune).',
    keyPoints: [
      'Document: Stores JSON/BSON hierarchies (MongoDB).',
      'Key-Value: Fast in-memory dictionary lookup (Redis).',
      'Column-family: Optimized for heavy writes and distributed reads (Cassandra).',
      'Graph: Nodes and edges for complex relationship graphs (Neo4j).'
    ],
    quizOptions: [
      { text: 'Relational, Non-relational, CSV, and XML', isCorrect: false },
      { text: 'Document stores, Key-value stores, Wide-column stores, and Graph databases', isCorrect: true },
      { text: 'Single-tier, Two-tier, Three-tier, and Cloud-tier', isCorrect: false },
      { text: 'MySQL, PostgreSQL, SQLite, and MariaDB', isCorrect: false }
    ]
  },
  {
    id: 's1-q17',
    number: 17,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', '10Pearls'],
    question: 'How does MongoDB ensure high availability?',
    answer: 'Through replica sets — if the primary node fails, an election process automatically promotes a secondary to primary. This provides automatic failover and data redundancy.',
    keyPoints: [
      'Heartbeat signals every 2 seconds between members.',
      'Consensus election selects the secondary with the most up-to-date oplog.',
      'Automatic failover typically finishes in under 10 seconds.'
    ],
    quizOptions: [
      { text: 'By storing backups on tape drives daily', isCorrect: false },
      { text: 'Via replica sets where secondaries automatically hold elections to promote a new primary on failure', isCorrect: true },
      { text: 'By restarting the operating system whenever memory fills up', isCorrect: false },
      { text: 'By rejecting write requests when network latency rises', isCorrect: false }
    ]
  },
  {
    id: 's1-q18',
    number: 18,
    category: 'MongoDB',
    difficulty: 'Advanced',
    frequentlyAskedBy: ['Arbisoft', 'Devsinc'],
    question: 'What is the role of a profiler in MongoDB?',
    answer: 'The database profiler collects detailed information about database commands executed against a MongoDB instance. It helps identify slow queries and performance bottlenecks.',
    keyPoints: [
      'Profiles level 0 (off), level 1 (slow ops exceeding slowms threshold), level 2 (all ops).',
      'Logs records into the system.profile capped collection.',
      'Vital for auditing production query latency without external APM agents.'
    ],
    quizOptions: [
      { text: 'Generates user profile pictures for social media logins', isCorrect: false },
      { text: 'Collects operational metrics and command latencies into system.profile to detect slow queries', isCorrect: true },
      { text: 'Audits employee commit histories in Git', isCorrect: false },
      { text: 'Validates JSON schema constraints on collection inserts', isCorrect: false }
    ]
  },
  {
    id: 's1-q19',
    number: 19,
    category: 'MongoDB',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'Explain the $unwind stage in aggregation.',
    answer: '$unwind deconstructs an array field from the input documents to output a document for each element. It\'s useful when you need to flatten array data for grouping or filtering.',
    keyPoints: [
      'Input: 1 document with an array of N elements -> Output: N documents with 1 element each.',
      'preserveNullAndEmptyArrays option prevents dropping docs with null/empty arrays.',
      'Precursor to $group operations that aggregate array element values.'
    ],
    quizOptions: [
      { text: 'Compresses large strings to save disk space', isCorrect: false },
      { text: 'Deconstructs an array field into individual documents for each array element', isCorrect: true },
      { text: 'Reverses the order of documents in an aggregation pipeline', isCorrect: false },
      { text: 'Deletes duplicate documents from the output stream', isCorrect: false }
    ]
  },
  {
    id: 's1-q20',
    number: 20,
    category: 'MongoDB',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', '10Pearls'],
    question: 'How do you delete documents in MongoDB?',
    answer: '`db.collection.deleteOne(filter)` deletes the first matching document. `db.collection.deleteMany(filter)` deletes all matching documents. `db.collection.remove()` is deprecated.',
    keyPoints: [
      'deleteOne(filter): removes first match found.',
      'deleteMany(filter): removes all documents meeting criteria.',
      'Never pass empty filter ({}) to deleteMany unless intentionally emptying collection.'
    ],
    quizOptions: [
      { text: 'Using the TRUNCATE TABLE command', isCorrect: false },
      { text: 'Using deleteOne(filter) for a single document or deleteMany(filter) for all matching documents', isCorrect: true },
      { text: 'By setting document properties to null', isCorrect: false },
      { text: 'Using dropDocument(id)', isCorrect: false }
    ]
  },

  // ==========================================
  // PART 2: REACT (25 QUESTIONS)
  // ==========================================
  {
    id: 's1-q21',
    number: 21,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', 'Systems Limited', 'Netsol'],
    question: 'Explain the difference between functional and class components.',
    answer: 'Functional components are JavaScript functions that return JSX. They use hooks for state and lifecycle. Class components are ES6 classes that extend React.Component and use `this.state` and lifecycle methods. Functional components are now preferred due to hooks and simpler syntax.',
    keyPoints: [
      'Functional: plain functions, Hooks (useState, useEffect), no `this` binding issues.',
      'Class: extends React.Component, lifecycle methods (componentDidMount), verbose syntax.',
      'Modern React standards exclusively adopt functional components.'
    ],
    quizOptions: [
      { text: 'Class components are faster and consume less memory than functional components', isCorrect: false },
      { text: 'Functional components use hooks and avoid `this`; class components extend React.Component and use lifecycle methods', isCorrect: true },
      { text: 'Functional components cannot render JSX', isCorrect: false },
      { text: 'Hooks can only be used inside class components', isCorrect: false }
    ]
  },
  {
    id: 's1-q22',
    number: 22,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', '10Pearls'],
    question: 'How does the Virtual DOM work in React?',
    answer: 'React maintains a virtual representation of the UI in memory. When state changes, React creates a new virtual DOM tree, diffs it against the previous one, and calculates the minimal set of DOM operations needed to update the real DOM (reconciliation).',
    keyPoints: [
      'Lightweight JavaScript object tree mirroring real browser DOM nodes.',
      'Diffing algorithm compares previous tree and new tree with O(N) heuristic.',
      'Batched updates to the real DOM minimize browser layout recalculation and repaint thrashing.'
    ],
    quizOptions: [
      { text: 'Directly modifies the browser DOM on every single state change', isCorrect: false },
      { text: 'Maintains an in-memory JS representation, diffs state changes, and applies minimal real DOM updates', isCorrect: true },
      { text: 'A shadow DOM standard built into Chromium browsers', isCorrect: false },
      { text: 'A virtual server proxy that renders HTML on the cloud', isCorrect: false }
    ]
  },
  {
    id: 's1-q23',
    number: 23,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'What are React Hooks and when do you use useEffect?',
    answer: 'Hooks are functions that let you use state and lifecycle features without class components. `useEffect` is used for side effects: data fetching, subscriptions, DOM manipulation. It runs after render and can be controlled with a dependency array.',
    keyPoints: [
      'Functions starting with `use` that hook into React state and lifecycle.',
      'useEffect handles side effects after rendering.',
      'Dependency array controls execution: [] on mount, [dep] on value change, cleanup function on unmount.'
    ],
    quizOptions: [
      { text: 'Hooks are CSS styling utilities for responsive layouts', isCorrect: false },
      { text: 'Functions allowing state and lifecycle in functional components; useEffect manages side effects post-render', isCorrect: true },
      { text: 'Hooks replace HTML div tags with native web components', isCorrect: false },
      { text: 'useEffect runs synchronously before JSX is parsed', isCorrect: false }
    ]
  },
  {
    id: 's1-q24',
    number: 24,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', 'pieCyfer'],
    question: 'What is the difference between useState and useRef?',
    answer: '`useState` triggers a re-render when state changes. `useRef` holds a mutable value that does not trigger re-renders. Use `useRef` for DOM access or storing mutable values like timers.',
    keyPoints: [
      'useState: updates component state and schedules a re-render.',
      'useRef: persists mutable value across renders in .current without re-rendering.',
      'useRef is ideal for DOM element handles, previous values, and interval IDs.'
    ],
    quizOptions: [
      { text: 'useRef causes twice as many re-renders as useState', isCorrect: false },
      { text: 'useState triggers re-renders on update; useRef maintains mutable values without causing re-renders', isCorrect: true },
      { text: 'useState can only store strings, while useRef stores objects', isCorrect: false },
      { text: 'useRef resets its value to undefined on every render', isCorrect: false }
    ]
  },
  {
    id: 's1-q25',
    number: 25,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'What is the difference between useMemo and useCallback?',
    answer: '`useMemo` memoizes a computed value — it recalculates only when dependencies change. `useCallback` memoizes a function — it returns a memoized version of the callback that only changes when dependencies change.',
    keyPoints: [
      'useMemo(() => computeVal(a, b), [a, b]): caches computed calculation result.',
      'useCallback(fn, [deps]): caches function instance reference across renders.',
      'useCallback(fn, deps) is syntactically equivalent to useMemo(() => fn, deps).'
    ],
    quizOptions: [
      { text: 'useMemo is for class components; useCallback is for functional components', isCorrect: false },
      { text: 'useMemo memoizes computed values; useCallback memoizes function references', isCorrect: true },
      { text: 'useCallback executes asynchronous API calls; useMemo cannot', isCorrect: false },
      { text: 'useMemo triggers browser repaints; useCallback prevents them', isCorrect: false }
    ]
  },
  {
    id: 's1-q26',
    number: 26,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', 'Netsol'],
    question: 'What are controlled vs uncontrolled components?',
    answer: 'Controlled components have their state managed by React (value + onChange). Uncontrolled components store state in the DOM itself (use refs to access values). Controlled components are preferred for form validation and dynamic inputs.',
    keyPoints: [
      'Controlled: Form data handled by component state (value={val} onChange={handleChange}).',
      'Uncontrolled: Form data handled by DOM (use ref.current.value or FormData).',
      'Controlled offers instant validation, disabled buttons, and predictable updates.'
    ],
    quizOptions: [
      { text: 'Controlled components are rendered by the server; uncontrolled are rendered by client', isCorrect: false },
      { text: 'Controlled inputs have values driven by React state; uncontrolled inputs store value in the DOM accessed via ref', isCorrect: true },
      { text: 'Uncontrolled components cannot accept user input', isCorrect: false },
      { text: 'Controlled components require Redux to function', isCorrect: false }
    ]
  },
  {
    id: 's1-q27',
    number: 27,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Arbisoft'],
    question: 'How do you handle global state across large apps?',
    answer: 'Options: Context API + useReducer (built-in, good for moderate complexity), Redux Toolkit (predictable state container, good for large apps), Zustand (lightweight, minimal boilerplate), React Query (server state management).',
    keyPoints: [
      'Separate client UI state (theme, modal) from server cache state (users, invoices).',
      'Use Zustand or Redux Toolkit for complex shared client state.',
      'Use TanStack Query or SWR for caching, deduping, and revalidating server data.'
    ],
    quizOptions: [
      { text: 'By storing everything in window global variables', isCorrect: false },
      { text: 'Context API for moderate state, Redux Toolkit/Zustand for complex client state, TanStack Query for server state', isCorrect: true },
      { text: 'Only Redux is capable of handling global state in React', isCorrect: false },
      { text: 'By passing props through all 50 component layers manually', isCorrect: false }
    ]
  },
  {
    id: 's1-q28',
    number: 28,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'What is lifting state up in React?',
    answer: 'Lifting state up means moving shared state to the closest common ancestor of components that need it. The ancestor passes state down as props and receives updates via callbacks.',
    keyPoints: [
      'Maintains a single source of truth across sibling components.',
      'Parent owns the state and handler function; children receive value and callback props.',
      'Prevents state synchronization bugs between disconnected sibling nodes.'
    ],
    quizOptions: [
      { text: 'Uploading local component state to an external AWS S3 bucket', isCorrect: false },
      { text: 'Moving shared state to the closest common ancestor so siblings stay synchronized', isCorrect: true },
      { text: 'Converting a class component into a higher-order component', isCorrect: false },
      { text: 'Elevating z-index in CSS stylesheets', isCorrect: false }
    ]
  },
  {
    id: 's1-q29',
    number: 29,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'How does React handle rendering performance?',
    answer: 'Techniques: React.memo (prevent unnecessary re-renders), useMemo/useCallback (memoize values/functions), code splitting with React.lazy/Suspense, virtualization for large lists (react-window), keys for list items, avoiding inline function definitions in render.',
    keyPoints: [
      'React.memo skips child renders if props are shallow-equal.',
      'Virtualization (react-window/react-virtual) renders only DOM nodes visible in viewport.',
      'Stable keys allow reconciliation diffing to move elements rather than recreating them.'
    ],
    quizOptions: [
      { text: 'React forces the browser to run at 120 FPS by overriding GPU drivers', isCorrect: false },
      { text: 'React.memo, useMemo/useCallback, list virtualization (react-window), and code-splitting with React.lazy', isCorrect: true },
      { text: 'By disabling all re-renders completely after mount', isCorrect: false },
      { text: 'By compiling all JSX to WebAssembly', isCorrect: false }
    ]
  },
  {
    id: 's1-q30',
    number: 30,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'What is React reconciliation?',
    answer: 'Reconciliation is React\'s algorithm for diffing the virtual DOM and determining the minimal set of changes needed to update the real DOM. Keys help React identify which items changed, were added, or removed.',
    keyPoints: [
      'Heuristic algorithm operating in O(N) time instead of generic O(N³).',
      'Elements of different types tear down and recreate the entire sub-tree.',
      'Keys uniquely identify elements in collections across re-renders.'
    ],
    quizOptions: [
      { text: 'The process of compiling TypeScript into JavaScript', isCorrect: false },
      { text: 'React\'s algorithm for diffing virtual DOM trees to apply minimal real DOM changes', isCorrect: true },
      { text: 'Authenticating user login tokens against a database', isCorrect: false },
      { text: 'Re-syncing git merge conflicts in team repositories', isCorrect: false }
    ]
  },
  {
    id: 's1-q31',
    number: 31,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['pieCyfer', 'Netsol'],
    question: 'How do you optimize performance in React?',
    answer: 'Code splitting with React.lazy and Suspense, memoization (React.memo, useMemo, useCallback), avoiding reconciliation with keys, virtualization for large lists, throttling/debouncing, lazy loading images, bundle size optimization.',
    keyPoints: [
      'Reduce bundle size with dynamic import() and code splitting.',
      'Avoid anonymous object/array creation in props of memoized children.',
      'Virtualize lists of 100+ items with react-window or tanstack virtual.'
    ],
    quizOptions: [
      { text: 'Avoid using any hooks or state', isCorrect: false },
      { text: 'Code splitting, memoization, proper list keys, virtualization, and debouncing expensive handlers', isCorrect: true },
      { text: 'Combine all React components into a single 5000-line file', isCorrect: false },
      { text: 'Always reload the browser tab after each user click', isCorrect: false }
    ]
  },
  {
    id: 's1-q32',
    number: 32,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'What are React Portals?',
    answer: 'Portals allow rendering components outside the main DOM hierarchy. Useful for modals, tooltips, and popups. Use `ReactDOM.createPortal(child, container)`.',
    keyPoints: [
      'Renders children into a separate DOM node (e.g., document.body).',
      'Event bubbling still behaves according to the React component tree.',
      'Solves CSS overflow: hidden and z-index clipping issues on modals.'
    ],
    quizOptions: [
      { text: 'A network gateway for connecting to WebSockets', isCorrect: false },
      { text: 'ReactDOM.createPortal renders children into a DOM node outside parent hierarchy while keeping event bubbling', isCorrect: true },
      { text: 'A tool for transferring state between separate browser tabs', isCorrect: false },
      { text: 'A deprecated feature replaced by iframes', isCorrect: false }
    ]
  },
  {
    id: 's1-q33',
    number: 33,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'What are Error Boundaries in React?',
    answer: 'Error boundaries catch errors in React component trees and prevent the entire app from crashing. They implement `getDerivedStateFromError()` and `componentDidCatch()`. They only catch errors in lifecycle methods and render, not in event handlers.',
    keyPoints: [
      'Class components implementing static getDerivedStateFromError and componentDidCatch.',
      'Renders a fallback UI gracefully when a child component crashes.',
      'Does not catch errors in event handlers, async code (setTimeout), or SSR.'
    ],
    quizOptions: [
      { text: 'Try/catch statements placed inside JSX elements', isCorrect: false },
      { text: 'Class components that catch rendering/lifecycle errors in child trees and render fallback UI', isCorrect: true },
      { text: 'Middleware functions running on Express servers', isCorrect: false },
      { text: 'HTML validation attributes on input tags', isCorrect: false }
    ]
  },
  {
    id: 's1-q34',
    number: 34,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'pieCyfer'],
    question: 'What is Suspense in React?',
    answer: 'Suspense lets components "wait" for something before rendering. It improves UX by showing a fallback UI while content is loading. Works with React.lazy for code splitting and data fetching.',
    keyPoints: [
      'Declarative fallback UI boundary (<Suspense fallback={<Spinner />}>).',
      'Coordinates lazy-loaded components and streaming server components.',
      'Prevents janky flashes of partial layout.'
    ],
    quizOptions: [
      { text: 'Pauses JavaScript execution using a while(true) loop', isCorrect: false },
      { text: 'Declarative component displaying fallback UI while child resources (code/data) are loading', isCorrect: true },
      { text: 'A CSS transition effect for fading in text', isCorrect: false },
      { text: 'An alert dialog prompting the user for confirmation', isCorrect: false }
    ]
  },
  {
    id: 's1-q35',
    number: 35,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Devsinc'],
    question: 'How do you handle asynchronous operations in React?',
    answer: 'Use useEffect for side effects, async/await with try/catch, loading/error states, React Query or SWR for data fetching, debouncing for search inputs, and cleanup functions to prevent memory leaks.',
    keyPoints: [
      'Do not make useEffect callback itself async; declare an inner async function and call it.',
      'Track loading, data, and error states.',
      'Prefer TanStack Query to automate caching, background re-fetching, and error retries.'
    ],
    quizOptions: [
      { text: 'Make the main React functional component async () => JSX', isCorrect: false },
      { text: 'Use useEffect with an inner async function, loading/error state tracking, or TanStack Query', isCorrect: true },
      { text: 'Block the main thread using synchronous XMLHttpRequest', isCorrect: false },
      { text: 'Async operations are forbidden inside React components', isCorrect: false }
    ]
  },
  {
    id: 's1-q36',
    number: 36,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Netsol'],
    question: 'What is the difference between state and props?',
    answer: 'State is internal data managed by the component (mutable, triggers re-renders). Props are external data passed from parent components (immutable within the receiving component).',
    keyPoints: [
      'Props: Read-only inputs passed from parent to child (unidirectional data flow).',
      'State: Component-managed mutable data updated via setState().',
      'Changes to either props or state schedule a component re-render.'
    ],
    quizOptions: [
      { text: 'Props are mutable by the child; state is immutable', isCorrect: false },
      { text: 'Props are passed from parent (read-only); state is managed internally by the component (mutable)', isCorrect: true },
      { text: 'State is stored in the browser URL; props are stored in cookies', isCorrect: false },
      { text: 'Props only accept numbers; state only accepts strings', isCorrect: false }
    ]
  },
  {
    id: 's1-q37',
    number: 37,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Systems Limited', 'Devsinc'],
    question: 'What is prop drilling and how do you avoid it?',
    answer: 'Prop drilling is passing props through multiple layers of components that don\'t need them. Avoid with Context API, state management libraries (Redux, Zustand), or component composition.',
    keyPoints: [
      'Passing props down through intermediate components purely to reach deep children.',
      'Bloats component interfaces and tightly couples intermediate layout.',
      'Solved by React Context, Zustand/Redux, or passing children / compound components.'
    ],
    quizOptions: [
      { text: 'A tool for drilling holes in computer motherboards', isCorrect: false },
      { text: 'Passing props through intermediate layers that do not need them; solved by Context, Zustand, or composition', isCorrect: true },
      { text: 'An optimized React compiler plugin', isCorrect: false },
      { text: 'A method for validating prop types at runtime', isCorrect: false }
    ]
  },
  {
    id: 's1-q38',
    number: 38,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Devsinc', 'Arbisoft'],
    question: 'How do you protect routes in React or Next.js?',
    answer: 'In React: create a ProtectedRoute component that checks authentication status and redirects. In Next.js: use middleware for server-side protection, or wrap pages with auth checks in layouts.',
    keyPoints: [
      'React SPA: <ProtectedRoute> evaluates auth token/context; redirects to /login if missing.',
      'Next.js: middleware.ts intercepts requests before page render and returns NextResponse.redirect.',
      'Always enforce token verification on backend API endpoints as well.'
    ],
    quizOptions: [
      { text: 'By password protecting the index.html file with htpasswd', isCorrect: false },
      { text: 'In React: ProtectedRoute component checking auth state; in Next.js: middleware.ts intercepting routes server-side', isCorrect: true },
      { text: 'By encrypting JavaScript bundles with AES-256', isCorrect: false },
      { text: 'Routes cannot be protected in frontend frameworks', isCorrect: false }
    ]
  },
  {
    id: 's1-q39',
    number: 39,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['10Pearls', 'Systems Limited'],
    question: 'What is a Higher-Order Component (HOC)?',
    answer: 'An HOC is a function that takes a component and returns a new component with additional props or behavior. Used for code reuse, authentication, logging, etc. Example: `withAuth(Component)`.',
    keyPoints: [
      'Pure function pattern: const EnhancedComponent = withFeature(BaseComponent).',
      'Common for cross-cutting concerns: auth guards, telemetry, styling themes.',
      'Largely superseded by custom hooks in modern React codebases.'
    ],
    quizOptions: [
      { text: 'A component placed at the highest z-index on the screen', isCorrect: false },
      { text: 'A function that takes a component and returns an enhanced new component (e.g. withAuth)', isCorrect: true },
      { text: 'A special server-side component in Next.js', isCorrect: false },
      { text: 'A component that cannot receive props', isCorrect: false }
    ]
  },
  {
    id: 's1-q40',
    number: 40,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Devsinc'],
    question: 'How do you implement routing in React?',
    answer: 'Use react-router-dom. Define Routes and Route components, use Link for navigation, useParams for dynamic routes, useNavigate for programmatic navigation.',
    keyPoints: [
      'react-router-dom provides BrowserRouter, Routes, Route, Link, NavLink.',
      'useNavigate() handles programmatic redirects; useParams() reads URL params (:id).',
      'Client-side routing swaps components without full page browser refreshes.'
    ],
    quizOptions: [
      { text: 'By using standard HTML <a href> tags for all page transitions', isCorrect: false },
      { text: 'Using react-router-dom with Routes, Route, Link, useParams, and useNavigate', isCorrect: true },
      { text: 'By modifying window.location manually in every click listener', isCorrect: false },
      { text: 'Routing is natively built into the React core package without any extra library', isCorrect: false }
    ]
  },
  {
    id: 's1-q41',
    number: 41,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Systems Limited', 'Netsol'],
    question: 'What are synthetic events in React?',
    answer: 'React wraps native browser events in SyntheticEvent objects for cross-browser consistency. They have the same interface as native events but work identically across browsers.',
    keyPoints: [
      'Cross-browser wrapper around the browser’s native DOM event.',
      'Provides identical methods like stopPropagation() and preventDefault().',
      'Delegated at the React root container for optimal performance.'
    ],
    quizOptions: [
      { text: 'Artificial AI-generated mouse clicks for bot testing', isCorrect: false },
      { text: 'Cross-browser wrappers around native DOM events ensuring consistent behavior across all browsers', isCorrect: true },
      { text: 'Events triggered only inside React test runners', isCorrect: false },
      { text: 'Deprecated events from React 14', isCorrect: false }
    ]
  },
  {
    id: 's1-q42',
    number: 42,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Devsinc', '10Pearls'],
    question: 'How do you communicate with backend APIs in React?',
    answer: 'Use fetch API or Axios. Handle loading states, errors, and data. Use useEffect for initial fetch, async/await for readability, and React Query for caching and state management.',
    keyPoints: [
      'fetch() or axios.get/post in async functions.',
      'Store data, loading flag, and error message in component state.',
      'TanStack Query eliminates repetitive useEffect boilerplate and provides automatic caching.'
    ],
    quizOptions: [
      { text: 'By executing direct SQL queries inside JSX', isCorrect: false },
      { text: 'Using fetch or Axios with async/await, tracking loading/error states, or using TanStack Query', isCorrect: true },
      { text: 'Through local file system reads with fs.readFile', isCorrect: false },
      { text: 'React components cannot communicate over HTTP', isCorrect: false }
    ]
  },
  {
    id: 's1-q43',
    number: 43,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['pieCyfer', 'Systems Limited'],
    question: 'What is the difference between fetch and Axios?',
    answer: 'Fetch is built-in, uses promises, requires manual JSON parsing. Axios is a library, automatically transforms JSON, supports interceptors, request cancellation, and has better error handling.',
    keyPoints: [
      'fetch: native browser API; requires response.json(); doesn\'t throw on HTTP 4xx/5xx status.',
      'Axios: npm library; auto-transforms JSON; rejects promise on non-2xx status; supports request/response interceptors.',
      'Axios provides clean timeout, cancel token, and default authorization headers.'
    ],
    quizOptions: [
      { text: 'Fetch only runs on Node.js; Axios only runs in browsers', isCorrect: false },
      { text: 'Fetch is native and requires manual .json(); Axios auto-parses JSON, throws on 4xx/5xx, and supports interceptors', isCorrect: true },
      { text: 'Fetch is 100x faster than Axios', isCorrect: false },
      { text: 'Axios does not support POST requests', isCorrect: false }
    ]
  },
  {
    id: 's1-q44',
    number: 44,
    category: 'React',
    difficulty: 'Beginner',
    frequentlyAskedBy: ['Netsol', 'Devsinc'],
    question: 'How do you implement a loading spinner in React?',
    answer: 'Use conditional rendering: `{loading ? <Spinner /> : <DataComponent />}`. Manage loading state with useState. Use Suspense for lazy-loaded components. Libraries: react-spinners.',
    keyPoints: [
      'Boolean loading state initialized to true before network fetch.',
      'Conditional rendering: {isLoading && <Loader />} or ternary operator.',
      'Wrap lazy-loaded components in <Suspense fallback={<Loader />}>.'
    ],
    quizOptions: [
      { text: 'Spin the computer monitor clockwise while waiting', isCorrect: false },
      { text: 'Conditional rendering checking loading state: {loading ? <Spinner /> : <DataComponent />} or Suspense fallback', isCorrect: true },
      { text: 'By using the HTML <blink> tag', isCorrect: false },
      { text: 'Loading spinners can only be made using Flash', isCorrect: false }
    ]
  },
  {
    id: 's1-q45',
    number: 45,
    category: 'React',
    difficulty: 'Intermediate',
    frequentlyAskedBy: ['Arbisoft', '10Pearls'],
    question: 'What is code splitting in React?',
    answer: 'Code splitting breaks the bundle into smaller chunks loaded on demand. Use `React.lazy()` with `Suspense` for component-level splitting, or dynamic `import()` for route-based splitting.',
    keyPoints: [
      'Splits single monolithic bundle.js into multiple on-demand chunks.',
      'Drastically reduces initial page load time and improves First Contentful Paint.',
      'Combine React.lazy(() => import(\'./Page\')) with <Suspense>.'
    ],
    quizOptions: [
      { text: 'Splitting code across multiple monitors during development', isCorrect: false },
      { text: 'Breaking bundles into smaller chunks loaded on demand via React.lazy and dynamic imports', isCorrect: true },
      { text: 'Dividing backend and frontend into separate git branches', isCorrect: false },
      { text: 'A method to duplicate code files for redundancy', isCorrect: false }
    ]
  }
];
