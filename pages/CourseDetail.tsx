
import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Lesson } from '../types';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses, studentProgress, toggleLessonComplete } = useAppContext();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const course = useMemo(() => courses.find(c => c.id === id), [courses, id]);
  const progress = useMemo(() => studentProgress[id ?? '']?.completedLessons ?? new Set(), [studentProgress, id]);

  React.useEffect(() => {
    if (course && course.lessons.length > 0) {
      setActiveLesson(course.lessons[0]);
    }
  }, [course]);

  if (!course) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Course not found.</h2>
        <Link to="/" className="text-primary-600 hover:underline mt-4 inline-block">Back to Courses</Link>
      </div>
    );
  }

  const progressPercentage = (progress.size / course.lessons.length) * 100;

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="mt-2 text-gray-600">{course.description}</p>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Progress</h3>
            <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row min-h-[60vh]">
          <aside className="w-full md:w-1/3 lg:w-1/4 border-r overflow-y-auto">
            <nav className="p-4">
              <h2 className="text-lg font-semibold mb-3">Lessons</h2>
              <ul>
                {course.lessons.map((lesson, index) => (
                  <li key={lesson.id} >
                    <button 
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-colors ${activeLesson?.id === lesson.id ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
                    >
                       <input
                        type="checkbox"
                        checked={progress.has(lesson.id)}
                        onChange={() => toggleLessonComplete(course.id, lesson.id)}
                        className="mt-1.5 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div>
                        <span className="font-medium">{lesson.title}</span>
                        <span className="text-xs text-gray-500 block">{lesson.type === 'video' ? 'Video' : 'Text'}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main className="w-full md:w-2/3 lg:w-3/4 p-6">
            {activeLesson ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">{activeLesson.title}</h2>
                {activeLesson.type === 'video' ? (
                  <div>
                    <p className="mb-2 text-gray-600">Video URL (for demo purposes):</p>
                    <a href={activeLesson.content} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline break-all">
                      {activeLesson.content}
                    </a>
                     <div className="mt-4 aspect-video bg-gray-900 rounded-lg flex items-center justify-center text-white">
                        <p>Video player placeholder</p>
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: activeLesson.content.replace(/\n/g, '<br />') }}/>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a lesson to begin.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
