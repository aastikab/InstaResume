import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/shared/NavBar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TemplateSelection from './components/TemplateSelection';
import ResumeBuilder from './components/ResumeBuilder';
import HistoryPage from './pages/HistoryPage';

const App = () => {
  // Clear any existing token when app loads
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set initial state to false

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/templates" replace /> : 
              <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route 
          path="/signup" 
          element={
            isAuthenticated ? 
              <Navigate to="/templates" replace /> : 
              <Register setIsAuthenticated={setIsAuthenticated} />
          }
        />

        {/* Protected routes */}
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <TemplateSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/builder/:templateId"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;