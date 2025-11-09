import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
// FIX: The useAppContext hook is exported from './hooks/useAppContext', not './context/AppContext'.
import { AppProvider } from './context/AppContext';
import { useAppContext } from './hooks/useAppContext';
import Header from './components/Header';
import StudentDashboard from './pages/StudentDashboard';
import CourseDetail from './pages/CourseDetail';
import AdminDashboard from './pages/AdminDashboard';
import { Role } from './types';

const AppContent: React.FC = () => {
  const { role } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <Routes>
          {role === Role.STUDENT ? (
            <>
              <Route path="/" element={<StudentDashboard />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/admin" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/" element={<Navigate to="/admin" replace />} />
               <Route path="/course/:id" element={<Navigate to="/admin" replace />} />
            </>
          )}
           <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppProvider>
  );
};

export default App;
