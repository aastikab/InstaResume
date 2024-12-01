import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Register = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/templates');
      }
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <RegisterCard>
        <Title>Sign Up</Title>
        <TitleUnderline />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </InputGroup>

          <RegisterButton type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </RegisterButton>

          <LoginPrompt>
            Already have an account? <LoginLink to="/login">Login</LoginLink>
          </LoginPrompt>

          <NeedHelp>Need help?</NeedHelp>
        </Form>
      </RegisterCard>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #9333EA 0%, #7C3AED 100%);
  padding: 20px;
`;

const RegisterCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const TitleUnderline = styled.div`
  width: 50px;
  height: 4px;
  background: #9333EA;
  margin-bottom: 2rem;
  border-radius: 2px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #1a1a1a;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #9333EA;
    box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
  }
`;

const RegisterButton = styled.button`
  background: #9333EA;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #7C3AED;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoginPrompt = styled.p`
  text-align: center;
  color: #4B5563;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const LoginLink = styled(Link)`
  color: #9333EA;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const NeedHelp = styled.div`
  text-align: center;
  color: #9333EA;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #DC2626;
  background: #FEF2F2;
  border: 1px solid #FEE2E2;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 1rem;
`;

export default Register; 