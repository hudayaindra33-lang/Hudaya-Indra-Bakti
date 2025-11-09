
import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Role, Course, StudentProgress, Lesson } from '../types';
import { MOCK_COURSES, MOCK_PROGRESS } from '../services/mockData';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  courses: Course[];
  studentProgress: StudentProgress;
  addCourse: (course: Omit<Course, 'id' | 'imageUrl' | 'lessons'> & { lessons: Omit<Lesson, 'id'>[] }) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [studentProgress, setStudentProgress] = useState<StudentProgress>(MOCK_PROGRESS);

  const addCourse = useCallback((courseData: Omit<Course, 'id' | 'imageUrl' | 'lessons'> & { lessons: Omit<Lesson, 'id'>[] }) => {
    setCourses(prev => {
      const newCourse: Course = {
        ...courseData,
        id: `course-${Date.now()}`,
        imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
        lessons: courseData.lessons.map((lesson, index) => ({
          ...lesson,
          id: `lesson-${Date.now()}-${index}`
        }))
      };
      return [...prev, newCourse];
    });
  }, []);

  const updateCourse = useCallback((updatedCourse: Course) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  }, []);

  const deleteCourse = useCallback((courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
  }, []);

  const toggleLessonComplete = useCallback((courseId: string, lessonId: string) => {
    setStudentProgress(prev => {
      const newProgress = { ...prev };
      if (!newProgress[courseId]) {
        newProgress[courseId] = { completedLessons: new Set() };
      }
      const completed = newProgress[courseId].completedLessons;
      if (completed.has(lessonId)) {
        completed.delete(lessonId);
      } else {
        completed.add(lessonId);
      }
      return newProgress;
    });
  }, []);

  const value = {
    role,
    setRole,
    courses,
    studentProgress,
    addCourse,
    updateCourse,
    deleteCourse,
    toggleLessonComplete,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
