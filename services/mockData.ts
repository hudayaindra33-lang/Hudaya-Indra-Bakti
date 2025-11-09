
import { Course, StudentProgress } from '../types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'React for Beginners',
    description: 'Learn the fundamentals of React, the most popular JavaScript library for building user interfaces.',
    imageUrl: 'https://picsum.photos/seed/react/400/300',
    lessons: [
      { id: 'l1-1', title: 'Introduction to React', content: 'What is React and why should you use it? This lesson covers the core concepts.', type: 'text' },
      { id: 'l1-2', title: 'Setting up Your Environment', content: 'https://www.youtube.com/watch?v=SqcY0GlETPk', type: 'video' },
      { id: 'l1-3', title: 'Understanding JSX', content: 'Learn how to write JSX, a syntax extension to JavaScript.', type: 'text' },
      { id: 'l1-4', title: 'Components and Props', content: 'Deep dive into building reusable components and passing data with props.', type: 'text' },
    ],
  },
  {
    id: 'course-2',
    title: 'Advanced Tailwind CSS',
    description: 'Master utility-first CSS with advanced techniques, custom configurations, and best practices.',
    imageUrl: 'https://picsum.photos/seed/tailwind/400/300',
    lessons: [
      { id: 'l2-1', title: 'Customizing Your Theme', content: 'Learn to extend and customize the default Tailwind theme file.', type: 'text' },
      { id: 'l2-2', title: 'Plugins and Components', content: 'https://www.youtube.com/watch?v=7gX_N0i3p1k', type: 'video' },
      { id: 'l2-3', title: 'Optimizing for Production', content: 'Use PurgeCSS to remove unused styles and reduce your final bundle size.', type: 'text' },
    ],
  },
  {
    id: 'course-3',
    title: 'Introduction to TypeScript',
    description: 'Add static types to your JavaScript to improve code quality and developer experience.',
    imageUrl: 'https://picsum.photos/seed/typescript/400/300',
    lessons: [
        { id: 'l3-1', title: 'Why TypeScript?', content: 'Understand the benefits of using a typed superset of JavaScript.', type: 'text' },
        { id: 'l3-2', title: 'Basic Types', content: 'Explore basic types like string, number, boolean, array, and more.', type: 'text' },
        { id: 'l3-3', title: 'Interfaces and Enums', content: 'https://www.youtube.com/watch?v=5-x5g23-44I', type: 'video' },
        { id: 'l3-4', title: 'Generics', content: 'Learn how to write reusable, type-safe functions and components with generics.', type: 'text' },
    ],
  },
    {
    id: 'course-4',
    title: 'State Management with Zustand',
    description: 'A small, fast and scalable bearbones state-management solution using simplified flux principles.',
    imageUrl: 'https://picsum.photos/seed/zustand/400/300',
    lessons: [
        { id: 'l4-1', title: 'What is Zustand?', content: 'Introduction to the core concepts of Zustand.', type: 'text' },
        { id: 'l4-2', title: 'Creating a Store', content: 'Learn how to create and use a simple store.', type: 'text' },
    ],
  },
];

export const MOCK_PROGRESS: StudentProgress = {
  'course-1': {
    completedLessons: new Set(['l1-1', 'l1-3']),
  },
  'course-2': {
    completedLessons: new Set(['l2-1']),
  },
};
