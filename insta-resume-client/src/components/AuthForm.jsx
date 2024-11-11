import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const AuthForm = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.email) return 'Email is required';
    if (!formData.password) return 'Password is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (!formData.phoneNumber) return 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phoneNumber)) return 'Phone number must be 10 digits';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/signup', formData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setIsAuthenticated(true);
        navigate('/templates');
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Error during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100 p-4">
      <div className="absolute inset-0 z-0 bg-pattern opacity-10"></div>
      
      <div className="max-w-4xl w-full flex rounded-2xl shadow-2xl overflow-hidden bg-white relative z-10">
        {/* Left Side - Sign Up Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h3>
            <p className="text-gray-600">Join us to create professional resumes</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
              <p className="font-medium">Oops!</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password (min 6 characters)"
                required
                minLength={6}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                pattern="\d{10}"
                title="Please enter a valid 10-digit phone number"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold 
                transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 
                focus:ring-purple-500 focus:ring-opacity-50 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - 3D Illustration */}
        <div className="hidden lg:block w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 p-12">
          <div className="h-full flex flex-col justify-between">
            <div className="illustration-3d">
              <img 
                src="https://cdn3d.iconscout.com/3d/premium/thumb/sign-up-5048821-4204246.png" 
                alt="3D Sign Up" 
                className="w-full h-auto transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">Join InstaResume</h2>
              <p className="text-purple-100">
                Create stunning resumes and take your career to the next level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;