import { useQuery } from "@tanstack/react-query";
import type { CourseTopicResponse } from "../types";

const markdownContent = `
# Exploring Component Composition

Component composition is one of the most powerful patterns in React. It allows you to build complex user interfaces from simple, reusable building blocks.

## Why Composition?

In React, data flows one way: down the tree. Composition allows you to pass components as props, which solves a lot of "prop drilling" issues and keeps your components decoupled.

### The Problem with Deep Hierarchies

\`\`\`jsx
// BAD: Prop drilling
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user} setUser={setUser} />;
}

function Layout({ user, setUser }) {
  return <Header user={user} setUser={setUser} />;
}

function Header({ user, setUser }) {
  return <UserMenu user={user} onLogout={() => setUser(null)} />;
}
\`\`\`

### The Solution: Composition (Children Prop)

\`\`\`jsx
// GOOD: Composition
function App() {
  const [user, setUser] = useState(null);
  
  return (
    <Layout>
      <Header>
        <UserMenu user={user} onLogout={() => setUser(null)} />
      </Header>
    </Layout>
  );
}
\`\`\`

> "Composition is the heart of React. If you learn how to compose components, you learn how to build React applications." 
> — A wise developer

## Key Benefits

1. **Avoids Prop Drilling**: You don't need to pass props through components that don't need them.
2. **Reusability**: You can reuse the layout components with completely different children.
3. **Separation of Concerns**: The \`Layout\` doesn't need to know what a \`UserMenu\` is.

---

### Challenge

Try refactoring your current deepest component tree using the \`children\` prop. You'll be amazed at how much simpler your intermediate components become!
`;

export const useCourseTopic = (
  courseId: string | undefined,
  topicId: string | undefined
) => {
  return useQuery<CourseTopicResponse>({
    queryKey: ["course-topic", courseId, topicId],
    enabled: !!courseId && !!topicId,
    queryFn: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (topicId === "error") {
        throw new Error("Failed to load course topic");
      }

      return {
        id: topicId!,
        title: "Exploring Component Composition",
        order: 1,
        content: markdownContent,
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    },
  });
};
