// Client-side course store backed by localStorage. Mock AI generator.

export type ResourceType = "youtube" | "article" | "docs";

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  url: string;
}

export interface Chapter {
  id: string;
  title: string;
  points: string[];
  completed: boolean;
}

export interface Course {
  id: string;
  topic: string;
  title: string;
  description: string;
  chapters: Chapter[];
  resources: Resource[];
  createdAt: number;
}

export interface User {
  name: string;
  email: string;
}

const COURSES_KEY = "coursegen.courses.v1";
const USER_KEY = "coursegen.user.v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getUser(): User | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setUser(user: User | null) {
  if (!isBrowser()) return;
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("coursegen:user"));
}

export function loadCourses(): Course[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(COURSES_KEY);
    return raw ? (JSON.parse(raw) as Course[]) : [];
  } catch {
    return [];
  }
}

function saveCourses(list: Course[]) {
  if (!isBrowser()) return;
  localStorage.setItem(COURSES_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("coursegen:courses"));
}

export function saveCourse(course: Course) {
  const list = loadCourses();
  const idx = list.findIndex((c) => c.id === course.id);
  if (idx >= 0) list[idx] = course;
  else list.unshift(course);
  saveCourses(list);
}

export function deleteCourse(id: string) {
  saveCourses(loadCourses().filter((c) => c.id !== id));
}

export function getCourse(id: string): Course | undefined {
  return loadCourses().find((c) => c.id === id);
}

export function updateChapterCompletion(
  courseId: string,
  chapterId: string,
  completed: boolean,
) {
  const list = loadCourses();
  const course = list.find((c) => c.id === courseId);
  if (!course) return;
  const ch = course.chapters.find((c) => c.id === chapterId);
  if (!ch) return;
  ch.completed = completed;
  saveCourses(list);
}

export function courseProgress(course: Course): {
  done: number;
  total: number;
  pct: number;
} {
  const total = course.chapters.length;
  const done = course.chapters.filter((c) => c.completed).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

// ---------- Mock AI generator ----------

const uid = () => Math.random().toString(36).slice(2, 10);

const TOPIC_TEMPLATES: Record<
  string,
  {
    title: string;
    description: string;
    chapters: { title: string; points: string[] }[];
  }
> = {
  python: {
    title: "Complete Python Course",
    description:
      "Python is a versatile, beginner-friendly language used across web, data, and AI. Learn it end-to-end from syntax to real projects.",
    chapters: [
      {
        title: "Introduction to Python",
        points: [
          "What is Python",
          "Installing Python",
          "Your first script",
          "The REPL",
        ],
      },
      {
        title: "Variables & Data Types",
        points: [
          "Numbers, strings, booleans",
          "Type conversion",
          "Naming rules",
          "Constants",
        ],
      },
      {
        title: "Control Flow",
        points: [
          "if / elif / else",
          "for and while loops",
          "break and continue",
          "match statement",
        ],
      },
      {
        title: "Functions",
        points: [
          "def and return",
          "Arguments & defaults",
          "*args and **kwargs",
          "Lambdas",
        ],
      },
      {
        title: "Data Structures",
        points: [
          "Lists & tuples",
          "Dictionaries & sets",
          "Comprehensions",
          "When to use each",
        ],
      },
      {
        title: "Modules & Packages",
        points: [
          "import system",
          "pip and PyPI",
          "Virtual environments",
          "Your own package",
        ],
      },
      {
        title: "File I/O",
        points: [
          "open, read, write",
          "with statement",
          "JSON & CSV",
          "Pathlib",
        ],
      },
      {
        title: "Object-Oriented Python",
        points: [
          "Classes and instances",
          "Inheritance",
          "Dunder methods",
          "Dataclasses",
        ],
      },
      {
        title: "Error Handling",
        points: [
          "try / except / finally",
          "Raising exceptions",
          "Custom errors",
          "Debugging tips",
        ],
      },
      {
        title: "Build a Real Project",
        points: [
          "Plan the app",
          "Structure the code",
          "Testing basics",
          "Ship it",
        ],
      },
    ],
  },
  "c++": {
    title: "Complete C++ Programming",
    description:
      "C++ powers games, engines, and high-performance systems. Master syntax, memory, and modern C++ features step by step.",
    chapters: [
      {
        title: "Introduction to C++",
        points: [
          "History & use cases",
          "Toolchain setup",
          "Hello World",
          "Compiling & linking",
        ],
      },
      {
        title: "Variables & Data Types",
        points: [
          "Primitive types",
          "const and auto",
          "References vs pointers",
          "Type inference",
        ],
      },
      {
        title: "Control Flow",
        points: ["if / switch", "Loops", "Range-based for", "Early exits"],
      },
      {
        title: "Functions & Scope",
        points: [
          "Overloading",
          "Default arguments",
          "Inline functions",
          "Namespaces",
        ],
      },
      {
        title: "Pointers & Memory",
        points: ["Stack vs heap", "new / delete", "Smart pointers", "RAII"],
      },
      {
        title: "Object-Oriented C++",
        points: [
          "Classes & structs",
          "Constructors",
          "Inheritance",
          "Virtual functions",
        ],
      },
      {
        title: "Templates & STL",
        points: [
          "Function templates",
          "vector, map, set",
          "Algorithms",
          "Iterators",
        ],
      },
      {
        title: "Modern C++ (11-20)",
        points: ["Lambdas", "Move semantics", "constexpr", "Concepts"],
      },
      {
        title: "Concurrency",
        points: ["Threads", "Mutexes", "async & futures", "Atomics"],
      },
      {
        title: "Build a Real Project",
        points: ["Design", "CMake", "Testing", "Optimization"],
      },
    ],
  },
  dsa: {
    title: "Data Structures & Algorithms",
    description:
      "Master the fundamentals every engineer needs: reason about complexity, pick the right data structure, and solve interview-grade problems.",
    chapters: [
      {
        title: "Complexity Analysis",
        points: [
          "Big-O intuition",
          "Time vs space",
          "Amortized cost",
          "Common pitfalls",
        ],
      },
      {
        title: "Arrays & Strings",
        points: [
          "Two pointers",
          "Sliding window",
          "Prefix sums",
          "Classic problems",
        ],
      },
      {
        title: "Linked Lists",
        points: [
          "Singly & doubly",
          "Fast/slow pointers",
          "Reversing",
          "Common bugs",
        ],
      },
      {
        title: "Stacks & Queues",
        points: [
          "Implementations",
          "Monotonic stack",
          "Deques",
          "Applications",
        ],
      },
      {
        title: "Hash Tables",
        points: [
          "Hashing basics",
          "Collisions",
          "Sets vs maps",
          "When not to use",
        ],
      },
      {
        title: "Trees",
        points: [
          "Binary trees",
          "BST operations",
          "Traversals",
          "Balanced trees",
        ],
      },
      {
        title: "Heaps & Priority Queues",
        points: [
          "Heap invariant",
          "Top-K problems",
          "Median stream",
          "Dijkstra prep",
        ],
      },
      {
        title: "Graphs",
        points: [
          "BFS / DFS",
          "Shortest paths",
          "Topological sort",
          "Union-Find",
        ],
      },
      {
        title: "Sorting & Searching",
        points: [
          "Quicksort",
          "Merge sort",
          "Binary search patterns",
          "Selection",
        ],
      },
      {
        title: "Dynamic Programming",
        points: [
          "Memoization",
          "Tabulation",
          "Common patterns",
          "Optimization",
        ],
      },
    ],
  },
  networking: {
    title: "Computer Networking",
    description:
      "Understand how the internet actually works — from cables and packets to TLS, HTTP, and modern network design.",
    chapters: [
      {
        title: "Networking Fundamentals",
        points: [
          "What is a network",
          "OSI vs TCP/IP",
          "Bandwidth & latency",
          "Client/server",
        ],
      },
      {
        title: "Physical & Link Layer",
        points: [
          "Ethernet basics",
          "MAC addresses",
          "Switches",
          "Wi-Fi essentials",
        ],
      },
      {
        title: "IP & Routing",
        points: ["IPv4 & IPv6", "Subnets & CIDR", "Routers", "NAT"],
      },
      {
        title: "Transport Layer",
        points: ["TCP handshake", "UDP", "Congestion control", "Ports"],
      },
      {
        title: "DNS",
        points: [
          "Name resolution",
          "Records",
          "Recursive vs authoritative",
          "TTLs",
        ],
      },
      {
        title: "HTTP & HTTPS",
        points: [
          "Request/response",
          "Methods & status codes",
          "HTTP/2 & 3",
          "Caching",
        ],
      },
      {
        title: "TLS & Security",
        points: ["Handshake", "Certificates", "PKI", "Modern threats"],
      },
      {
        title: "Load Balancing & CDNs",
        points: ["L4 vs L7", "Health checks", "Edge caching", "Anycast"],
      },
      {
        title: "Debugging Networks",
        points: [
          "ping, traceroute",
          "curl deep dive",
          "Wireshark",
          "Common issues",
        ],
      },
      {
        title: "Modern Architectures",
        points: ["Cloud networking", "VPCs", "Service mesh", "Zero trust"],
      },
    ],
  },
  react: {
    title: "Modern React",
    description:
      "Build fast, maintainable interfaces with React. Learn components, state, effects, routing, and production patterns.",
    chapters: [
      {
        title: "Getting Started",
        points: ["Why React", "Vite setup", "JSX", "First component"],
      },
      {
        title: "Components & Props",
        points: [
          "Function components",
          "Composition",
          "Children",
          "TypeScript basics",
        ],
      },
      {
        title: "State & Events",
        points: ["useState", "Event handling", "Forms", "Controlled inputs"],
      },
      {
        title: "Effects",
        points: ["useEffect", "Cleanup", "Dependencies", "Common bugs"],
      },
      {
        title: "Rendering & Lists",
        points: ["Keys", "Conditional rendering", "Fragments", "Portals"],
      },
      {
        title: "Hooks Deep Dive",
        points: ["useMemo", "useCallback", "useReducer", "Custom hooks"],
      },
      {
        title: "Data Fetching",
        points: [
          "fetch basics",
          "TanStack Query",
          "Suspense",
          "Error boundaries",
        ],
      },
      {
        title: "Routing",
        points: ["Client routing", "Layouts", "Params", "Loaders"],
      },
      {
        title: "Styling & UI",
        points: [
          "Tailwind",
          "Component libraries",
          "Design tokens",
          "Accessibility",
        ],
      },
      {
        title: "Ship to Production",
        points: ["Build & deploy", "Performance", "Monitoring", "Testing"],
      },
    ],
  },
  "system design": {
    title: "System Design Essentials",
    description:
      "Learn to design scalable systems: caches, queues, databases, and trade-offs behind the world's biggest apps.",
    chapters: [
      {
        title: "Foundations",
        points: [
          "Scalability basics",
          "Latency vs throughput",
          "Availability",
          "CAP theorem",
        ],
      },
      {
        title: "Databases",
        points: ["SQL vs NoSQL", "Indexing", "Replication", "Sharding"],
      },
      {
        title: "Caching",
        points: [
          "Cache patterns",
          "Eviction policies",
          "CDN vs app cache",
          "Invalidation",
        ],
      },
      {
        title: "Load Balancing",
        points: ["L4 vs L7", "Sticky sessions", "Health checks", "Failover"],
      },
      {
        title: "Queues & Streams",
        points: [
          "When to use queues",
          "Kafka basics",
          "At-least-once",
          "Backpressure",
        ],
      },
      { title: "APIs", points: ["REST", "GraphQL", "gRPC", "Versioning"] },
      {
        title: "Storage",
        points: ["Object storage", "File systems", "Time-series", "Search"],
      },
      {
        title: "Reliability",
        points: [
          "SLOs & SLAs",
          "Retries & timeouts",
          "Circuit breakers",
          "Chaos",
        ],
      },
      {
        title: "Security",
        points: ["Auth vs authz", "Rate limiting", "Secrets", "Encryption"],
      },
      {
        title: "Case Studies",
        points: ["URL shortener", "News feed", "Chat", "Video streaming"],
      },
    ],
  },
};

const DEFAULT_TEMPLATE = (topic: string) => ({
  title: `Complete ${topic} Course`,
  description: `A structured, project-based course to master ${topic} — from foundations to real-world application.`,
  chapters: [
    {
      title: `Introduction to ${topic}`,
      points: [
        `What is ${topic}`,
        "Why it matters",
        "Core concepts",
        "Getting set up",
      ],
    },
    {
      title: "Foundations",
      points: [
        "Key vocabulary",
        "Mental models",
        "Common patterns",
        "Best practices",
      ],
    },
    {
      title: "Building Blocks",
      points: [
        "Primitives",
        "Composition",
        "Simple examples",
        "Hands-on practice",
      ],
    },
    {
      title: "Intermediate Concepts",
      points: [
        "Going deeper",
        "Trade-offs",
        "Real-world examples",
        "Common mistakes",
      ],
    },
    {
      title: "Advanced Techniques",
      points: ["Optimization", "Edge cases", "Debugging", "Tooling"],
    },
    {
      title: "Ecosystem & Tools",
      points: [
        "Popular libraries",
        "Community resources",
        "Standards",
        "Reference material",
      ],
    },
    {
      title: "Applied Practice",
      points: [
        "Small exercises",
        "Mini-projects",
        "Reviewing code",
        "Feedback loops",
      ],
    },
    {
      title: "Capstone Project",
      points: ["Plan a build", "Structure the work", "Ship v1", "Iterate"],
    },
  ],
});

const RESOURCE_TEMPLATES: Resource[] = [
  {
    id: "",
    type: "youtube",
    title: "Full course walkthrough",
    url: "https://youtube.com",
  },
  {
    id: "",
    type: "youtube",
    title: "Quickstart in 20 minutes",
    url: "https://youtube.com",
  },
  {
    id: "",
    type: "article",
    title: "The definitive beginner's guide",
    url: "https://dev.to",
  },
  {
    id: "",
    type: "article",
    title: "Advanced patterns & pitfalls",
    url: "https://medium.com",
  },
  {
    id: "",
    type: "docs",
    title: "Official documentation",
    url: "https://developer.mozilla.org",
  },
];

export async function generateCourse(topic: string): Promise<Course> {
  await new Promise((r) => setTimeout(r, 1800));
  const key = topic.trim().toLowerCase();
  const tmpl = TOPIC_TEMPLATES[key] ?? DEFAULT_TEMPLATE(topic.trim());
  return {
    id: uid(),
    topic: topic.trim(),
    title: tmpl.title,
    description: tmpl.description,
    chapters: tmpl.chapters.map((c) => ({
      id: uid(),
      title: c.title,
      points: c.points,
      completed: false,
    })),
    resources: RESOURCE_TEMPLATES.map((r) => ({ ...r, id: uid() })),
    createdAt: Date.now(),
  };
}

// Deterministic hue from topic for badge colors
export function topicHue(topic: string): number {
  let h = 0;
  for (let i = 0; i < topic.length; i++)
    h = (h * 31 + topic.charCodeAt(i)) % 360;
  return h;
}
