
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import CourseCard from '../components/CourseCard';

const StudentDashboard: React.FC = () => {
  const { courses } = useAppContext();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Courses</h1>
      <p className="text-lg text-gray-600 mb-6">Expand your knowledge by choosing one of our expert-led courses.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
