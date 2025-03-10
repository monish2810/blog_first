import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { PenLine, BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

function MainLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center px-2 py-2 text-gray-900 hover:text-gray-600">
                <BookOpen className="h-6 w-6 mr-2" />
                <span className="font-semibold text-xl">BlogApp</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <PenLine className="h-4 w-4 mr-2" />
                Write
              </Link>
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;