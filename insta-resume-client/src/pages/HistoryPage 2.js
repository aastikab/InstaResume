import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const HistoryPage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.get('/resumes');
        setResumes(response.data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Resume History</h1>
      {resumes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No resumes found</p>
          <button
            onClick={() => navigate('/templates')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create New Resume
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    {resume.personalInfo.name}'s Resume
                  </h2>
                  <p className="text-gray-600">
                    Created: {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/resume/${resume._id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      const token = localStorage.getItem('token');
                      const downloadUrl = `${api.defaults.baseURL}/resumes/${resume._id}/download`;
                      
                      fetch(downloadUrl, {
                        headers: {
                          'Authorization': `Bearer ${token}`
                        }
                      })
                      .then(response => response.blob())
                      .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', resume.fileName || 'resume.docx');
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                      })
                      .catch(error => {
                        console.error('Download error:', error);
                        alert('Error downloading resume. Please try again.');
                      });
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage; 