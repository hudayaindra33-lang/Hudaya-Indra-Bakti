
export enum Role {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // Could be markdown text or a video URL
  type: 'text' | 'video';
}

export interface Course {
  id: string;
  title:string;
  description: string;
  imageUrl: string;
  lessons: Lesson[];
}

export interface StudentProgress {
  [courseId: string]: {
    completedLessons: Set<string>;
  };
}
