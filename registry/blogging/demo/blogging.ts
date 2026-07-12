// Demo data for Blogging category components
// This file contains sample data used for component previews and documentation

import type { Post } from "../types";

// Single post for PostCard default
export const demoPost: Post = {
  author: {
    avatar: "https://i.pravatar.cc/150?u=sarah",
    name: "Sarah Chen",
  },
  category: "Tutorial",
  coverImage:
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
  excerpt:
    "Learn how to build conversational interfaces with our comprehensive component library designed for AI-powered applications.",
  publishedAt: "2024-01-15",
  readTime: "5 min read",
  tags: ["Tutorial", "Components"],
  title: "Getting Started with Agentic UI Components",
};

// Demo content for PostDetail (HTML content for full article view)
export const demoPostContent = `
  <p>Building modern AI-powered applications requires a new approach to UI design. Traditional web components don't always translate well to conversational interfaces, where context and flow are paramount.</p>

  <p>Our Agentic UI component library provides a collection of purpose-built components that work seamlessly within chat interfaces. From payment flows to product displays, each component is designed with the unique constraints of conversational UIs in mind.</p>

  <h2>Key Features</h2>
  <p>Each component supports three display modes: inline (within the chat flow), fullscreen (for complex interactions), and picture-in-picture (persistent visibility). This flexibility allows you to create rich, interactive experiences without breaking the conversational flow.</p>

  <p>Components are designed mobile-first and touch-friendly, ensuring a great experience across all devices. They automatically adapt to light and dark themes, and integrate seamlessly with MCP tools for backend communication.</p>
`;

// Related posts for PostDetail
export const demoRelatedPosts: Post[] = [
  {
    author: { avatar: "https://i.pravatar.cc/150?u=alex", name: "Alex Rivera" },
    category: "Design",
    coverImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    excerpt:
      "Best practices for creating intuitive UI components that work within chat environments.",
    publishedAt: "2024-01-12",
    readTime: "8 min read",
    tags: ["Design", "UX"],
    title: "Designing for Conversational Interfaces",
    url: "https://example.com/posts/designing-conversational-interfaces",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=jordan",
      name: "Jordan Kim",
    },
    category: "Development",
    coverImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    excerpt:
      "How to leverage Model Context Protocol for seamless backend communication.",
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    tags: ["MCP", "Backend"],
    title: "MCP Integration Patterns",
    url: "https://example.com/posts/mcp-integration-patterns",
  },
];

// Full PostDetail demo data (combines post, content, and relatedPosts)
export const demoPostDetailData = {
  content: demoPostContent,
  post: {
    ...demoPost,
    tags: ["Tutorial", "Components", "AI", "React", "TypeScript"],
  },
  relatedPosts: demoRelatedPosts,
};

// 15 posts for PostList default
export const demoPosts: Post[] = [
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=sarah",
      name: "Sarah Chen",
    },
    category: "Tutorial",
    coverImage:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    excerpt:
      "Learn how to build conversational interfaces with our comprehensive component library designed for AI-powered applications.",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    tags: ["Tutorial", "Components", "AI"],
    title: "Getting Started with Agentic UI Components",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=alex",
      name: "Alex Rivera",
    },
    category: "Design",
    coverImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    excerpt:
      "Best practices for creating intuitive UI components that work within chat environments.",
    publishedAt: "2024-01-12",
    readTime: "8 min read",
    tags: ["Design", "UX"],
    title: "Designing for Conversational Interfaces with Manifest UI",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=jordan",
      name: "Jordan Kim",
    },
    category: "Development",
    coverImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    excerpt:
      "How to leverage Model Context Protocol for seamless backend communication in your agentic applications.",
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    tags: ["MCP", "Backend", "Integration"],
    title: "MCP Integration Patterns",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=morgan",
      name: "Morgan Lee",
    },
    category: "Tutorial",
    coverImage:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
    excerpt:
      "A complete guide to implementing secure, user-friendly payment experiences within conversational interfaces.",
    publishedAt: "2024-01-08",
    readTime: "10 min read",
    tags: ["Payments", "Security"],
    title: "Building Payment Flows in Chat",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=casey",
      name: "Casey Taylor",
    },
    category: "Development",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    excerpt:
      "Implementing WebSocket connections and real-time updates for collaborative agentic experiences.",
    publishedAt: "2024-01-06",
    readTime: "15 min read",
    tags: ["WebSocket", "Real-time", "Collaboration"],
    title: "Real-time Collaboration in AI Apps",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=jamie",
      name: "Jamie Park",
    },
    category: "Design",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    excerpt:
      "Making your conversational UI accessible to all users with screen readers and keyboard navigation.",
    publishedAt: "2024-01-04",
    readTime: "9 min read",
    tags: ["Accessibility", "A11y", "UX"],
    title: "Accessibility in Chat Interfaces",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=drew",
      name: "Drew Martinez",
    },
    category: "Development",
    coverImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    excerpt:
      "Managing complex multi-step workflows in agentic applications using modern state patterns.",
    publishedAt: "2024-01-02",
    readTime: "11 min read",
    tags: ["State", "Workflow", "Architecture"],
    title: "State Management for Complex Workflows",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=riley",
      name: "Riley Johnson",
    },
    category: "Development",
    coverImage:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800",
    excerpt:
      "Strategies for unit testing and integration testing of chat-based UI components.",
    publishedAt: "2023-12-30",
    readTime: "8 min read",
    tags: ["Testing", "Quality", "CI/CD"],
    title: "Testing Conversational Components",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=avery",
      name: "Avery Williams",
    },
    category: "Design",
    coverImage:
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800",
    excerpt:
      "Implementing flexible theming systems with dark mode for agentic UI components.",
    publishedAt: "2023-12-28",
    readTime: "7 min read",
    tags: ["Theming", "Dark Mode", "CSS"],
    title: "Theming and Dark Mode Support",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=quinn",
      name: "Quinn Anderson",
    },
    category: "Development",
    coverImage:
      "https://images.unsplash.com/photo-1518173946687-a2e8a36af77a?w=800",
    excerpt:
      "Optimizing render performance and reducing bundle size in chat applications.",
    publishedAt: "2023-12-25",
    readTime: "13 min read",
    tags: ["Performance", "Optimization", "React"],
    title: "Performance Optimization Techniques",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=sage",
      name: "Sage Thompson",
    },
    category: "Development",
    coverImage:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
    excerpt:
      "Graceful error handling patterns and user-friendly recovery flows in conversational UIs.",
    publishedAt: "2023-12-22",
    readTime: "10 min read",
    tags: ["Error Handling", "UX", "Resilience"],
    title: "Error Handling and Recovery",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=blake",
      name: "Blake Garcia",
    },
    category: "Design",
    coverImage:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800",
    excerpt:
      "Making your agentic UI components work across languages and locales.",
    publishedAt: "2023-12-20",
    readTime: "9 min read",
    tags: ["i18n", "Localization", "Global"],
    title: "Internationalization Best Practices",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=charlie",
      name: "Charlie Brown",
    },
    category: "Design",
    coverImage:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800",
    excerpt:
      "Designing conversational interfaces that work beautifully on mobile devices.",
    publishedAt: "2023-12-18",
    readTime: "8 min read",
    tags: ["Mobile", "Responsive", "Design"],
    title: "Mobile-First Chat Design",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=sydney",
      name: "Sydney Chen",
    },
    category: "Tutorial",
    coverImage:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800",
    excerpt:
      "Tracking user interactions and deriving insights from conversational UI usage.",
    publishedAt: "2023-12-15",
    readTime: "11 min read",
    tags: ["Analytics", "Insights", "Data"],
    title: "Analytics and User Insights",
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=taylor",
      name: "Taylor Swift",
    },
    category: "Development",
    coverImage:
      "https://images.unsplash.com/photo-1465056836900-8f1e940f2114?w=800",
    excerpt:
      "Creating a scalable component library for agentic UIs that teams can share.",
    publishedAt: "2023-12-12",
    readTime: "14 min read",
    tags: ["Components", "Library", "Scalability"],
    title: "Building Reusable Component Libraries",
  },
];
