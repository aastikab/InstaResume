import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! I'll help you create your resume. Let's start with your personal information. What's your full name?" }
  ]);
  const [input, setInput] = useState('');
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: []
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { field: 'name', question: "What's your full name?" },
    { field: 'email', question: "What's your email address?" },
    { field: 'phone', question: "What's your phone number?" },
    { field: 'address', question: "What's your address?" },
    { field: 'summary', question: "Write a brief professional summary about yourself." },
    { field: 'experience', question: "Tell me about your work experience. Include company, position, dates, and key responsibilities." },
    { field: 'education', question: "What's your educational background? Include school, degree, and graduation year." },
    { field: 'skills', question: "List your key skills (separate with commas)." }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Process the input based on current step
      const step = steps[currentStep];
      let updatedFormData = { ...formData };

      if (currentStep < 5) {
        // Personal Info
        updatedFormData.personalInfo[step.field] = input;
      } else if (currentStep === 5) {
        // Experience
        updatedFormData.experience.push({
          description: input
        });
      } else if (currentStep === 6) {
        // Education
        updatedFormData.education.push({
          description: input
        });
      } else if (currentStep === 7) {
        // Skills
        updatedFormData.skills = input.split(',').map(skill => skill.trim());
      }

      setFormData(updatedFormData);

      // Move to next step or finish
      if (currentStep < steps.length - 1) {
        const nextQuestion = { type: 'bot', text: steps[currentStep + 1].question };
        setMessages(prev => [...prev, nextQuestion]);
        setCurrentStep(prev => prev + 1);
      } else {
        // Final submission
        const response = await api.post('/resumes', updatedFormData);
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: "Great! I've created your resume. Would you like to view it or make any changes?" 
        }]);
        navigate(`/resume/${response.data._id}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: "Sorry, there was an error. Please try again." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Resume Builder Assistant</h2>
        
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto mb-6 p-4 bg-gray-50 rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.type === 'bot' 
                  ? 'flex justify-start' 
                  : 'flex justify-end'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'bot'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-green-100 text-green-900'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your answer here..."
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={`px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              transition-colors duration-200 ${
                loading || !input.trim() 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              'Send'
            )}
          </button>
        </form>

        {/* Progress Indicator */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;