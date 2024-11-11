import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const HistoryPage = () => {
  const [resumes, setResumes] = useState([]);
  const [coverLetters, setCoverLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchHistory = async () => {
      try {
        // Fetch resumes
        const resumesRes = await api.get('/resumes');
        setResumes(Array.isArray(resumesRes.data) ? resumesRes.data : []);

        // Fetch cover letters
        const coverLettersRes = await api.get('/cover-letters');
        setCoverLetters(Array.isArray(coverLettersRes.data) ? coverLettersRes.data : []);

        console.log('Resumes:', resumesRes.data);
        console.log('Cover Letters:', coverLettersRes.data);
      } catch (error) {
        console.error('Error fetching history:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Error loading history: ' + (error.response?.data?.message || error.message));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resumes Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Resumes</h3>
          {!resumes || resumes.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-4 text-gray-600">
              No resumes created yet
            </div>
          ) : (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div key={resume._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-semibold">
                    {resume.personalInfo?.name || 'Untitled Resume'}
                  </h4>
                  {resume.personalInfo && (
                    <>
                      <p className="text-gray-600">Email: {resume.personalInfo.email}</p>
                      <p className="text-gray-600">Phone: {resume.personalInfo.phone}</p>
                    </>
                  )}
                  <div className="mt-2 flex space-x-2">
                    <button 
                      onClick={() => navigate(`/resume/${resume._id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => navigate(`/resume/${resume._id}/edit`)}
                      className="text-green-500 hover:text-green-700"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Cover Letters Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Cover Letters</h3>
          {!coverLetters || coverLetters.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-4 text-gray-600">
              No cover letters created yet
            </div>
          ) : (
            <div className="space-y-4">
              {coverLetters.map((letter) => (
                <div key={letter._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-semibold">{letter.company || 'Untitled Cover Letter'}</h4>
                  {letter.position && (
                    <p className="text-gray-600">Position: {letter.position}</p>
                  )}
                  <div className="mt-2 flex space-x-2">
                    <button 
                      onClick={() => navigate(`/cover-letter/${letter._id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => navigate(`/cover-letter/${letter._id}/edit`)}
                      className="text-green-500 hover:text-green-700"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;