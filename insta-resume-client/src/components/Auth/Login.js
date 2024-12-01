import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/templates');
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    localStorage.setItem('token', 'guest-token');
    setIsAuthenticated(true);
    navigate('/templates');
  };

  return (
    <PageContainer>
      <LoginCard>
        <Title>Login</Title>
        <TitleUnderline />

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Username</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </InputGroup>

          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </LoginButton>

          <SignupPrompt>
            Don't have an account? <SignupLink to="/signup">Signup</SignupLink>
          </SignupPrompt>

          <GuestButton type="button" onClick={handleGuestAccess}>
            Continue as Guest
          </GuestButton>
        </Form>
      </LoginCard>
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

const LoginCard = styled.div`
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

const LoginButton = styled.button`
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

const SignupPrompt = styled.p`
  text-align: center;
  color: #4B5563;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const SignupLink = styled(Link)`
  color: #9333EA;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const GuestButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  color: #9333EA;
  border: 2px solid #9333EA;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: rgba(147, 51, 234, 0.1);
  }
`;

export default Login; 