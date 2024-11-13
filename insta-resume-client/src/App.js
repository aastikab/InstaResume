import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import TemplateSelector from './components/TemplateSelector';
import ResumeBuilder from './components/ResumeBuilder';
import HistoryPage from './pages/HistoryPage';
import Login from './components/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading.....</div>;
  }

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow-md py-4">
          <nav className="container mx-auto flex justify-between items-center px-4">
            <Link to="/" className="text-2xl font-bold">
              InstaResume
            </Link>
            <ul className="flex space-x-4">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/templates" className="hover:text-blue-500">
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link to="/builder" className="hover:text-blue-500">
                      Builder
                    </Link>
                  </li>
                  <li>
                    <Link to="/history" className="hover:text-blue-500">
                      History
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        localStorage.removeItem('token');
                        setIsAuthenticated(false);
                      }}
                      className="hover:text-blue-500"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="hover:text-blue-500">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="hover:text-blue-500">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>

        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/templates" />
                )
              } 
            />
            <Route 
              path="/signup" 
              element={
                !isAuthenticated ? (
                  <AuthForm setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/templates" />
                )
              } 
            />
            <Route
              path="/templates"
              element={isAuthenticated ? <TemplateSelector /> : <Navigate to="/login" />}
            />
            <Route
              path="/builder"
              element={isAuthenticated ? <ResumeBuilder /> : <Navigate to="/login" />}
            />
            <Route
              path="/history"
              element={isAuthenticated ? <HistoryPage /> : <Navigate to="/login" />}
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 InstaResume. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

const Home = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold mb-4">Welcome to InstaResume</h1>
    <p className="text-lg mb-8">
      Create your perfect resume and cover letter in minutes.
    </p>
    <Link
      to="/templates"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Get Started
    </Link>
  </div>
);

export default App;