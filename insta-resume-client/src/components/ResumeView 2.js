import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ResumeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get(`/resumes/${id}`);
        setResume(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching resume');
        console.error('Error fetching resume:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!resume) return <div className="text-center mt-8">Resume not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">{resume.personalInfo.name}'s Resume</h1>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <p>Email: {resume.personalInfo.email}</p>
          <p>Phone: {resume.personalInfo.phone}</p>
          <p>Address: {resume.personalInfo.address}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
          <p>{resume.personalInfo.summary}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <p>{exp}</p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p>{edu}</p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate('/history')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to History
          </button>
          <button
            onClick={() => {
              const token = localStorage.getItem('token');
              const downloadUrl = `${api.defaults.baseURL}/resumes/${id}/download`;
              
              // Create a temporary anchor element
              const link = document.createElement('a');
              link.href = downloadUrl;
              link.setAttribute('download', ''); // This will force download instead of navigation
              
              // Add authorization header
              fetch(downloadUrl, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
              .then(response => response.blob())
              .then(blob => {
                const url = window.URL.createObjectURL(blob);
                link.href = url;
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeView; 