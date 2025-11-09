
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { ROLES } from '../constants';
import BookOpenIcon from './icons/BookOpenIcon';
import { Role } from '../types';

const Header: React.FC = () => {
  const { role, setRole } = useAppContext();

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
            <BookOpenIcon className="w-8 h-8" />
            <span className="text-xl font-bold">EduSphere LMS</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                id="role-switcher"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
              >
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
