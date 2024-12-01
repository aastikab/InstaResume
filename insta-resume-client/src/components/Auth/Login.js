import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', formData);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/templates');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err);
      setError(
        err.response?.data?.message || 
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <NavBar>
        <LogoLink onClick={() => navigate('/')}>
          <Logo>InstaResume</Logo>
        </LogoLink>
        <NavLinks>
          <NavLink to="/templates">Templates</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/login">Login</NavLink>
          <PrimaryButton to="/signup">Sign Up</PrimaryButton>
        </NavLinks>
      </NavBar>

      <ContentWrapper>
        <LeftPanel>
          <BrandSection>
            <LogoLink onClick={() => handleNavigation('/')}>
              <Logo>InstaResume</Logo>
            </LogoLink>
            <TagLine>Create stunning resumes in minutes</TagLine>
          </BrandSection>
          <FeatureList>
            <FeatureItem>
              <FeatureIcon>✨</FeatureIcon>
              <FeatureText>Professional templates</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>🚀</FeatureIcon>
              <FeatureText>AI-powered suggestions</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureText>ATS-friendly formats</FeatureText>
            </FeatureItem>
          </FeatureList>
        </LeftPanel>

        <RightPanel>
          <LoginContainer
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoginHeader>Welcome Back</LoginHeader>
            <LoginSubHeader>Log in to your account</LoginSubHeader>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </InputGroup>

              <ForgotPassword>Forgot password?</ForgotPassword>

              <LoginButton
                type="submit"
                as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </LoginButton>

              <Divider>
                <DividerLine />
                <DividerText>or</DividerText>
                <DividerLine />
              </Divider>

              <SocialLogin>
                <SocialButton
                  as={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img src="/images/google-icon.png" alt="Google" />
                  Continue with Google
                </SocialButton>
              </SocialLogin>

              <SignUpPrompt>
                Don't have an account? <SignUpLink to="/signup">Sign up</SignUpLink>
              </SignUpPrompt>
            </Form>
          </LoginContainer>
        </RightPanel>
      </ContentWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-height: 600px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const LeftPanel = styled.div`
  flex: 1;
  padding: 60px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 968px) {
    display: none;
  }
`;

const BrandSection = styled.div``;

const LogoLink = styled.div`
  cursor: pointer;
  display: inline-block;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const TagLine = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const FeatureList = styled.div`
  margin-top: 60px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const FeatureIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 15px;
`;

const FeatureText = styled.span`
  font-size: 1.1rem;
`;

const RightPanel = styled.div`
  flex: 1;
  padding: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const LoginHeader = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const LoginSubHeader = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Form = styled.form``;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const ForgotPassword = styled.a`
  display: block;
  text-align: right;
  color: #6366f1;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: #e2e8f0;
`;

const DividerText = styled.span`
  padding: 0 1rem;
  color: #94a3b8;
  font-size: 0.9rem;
`;

const SocialLogin = styled.div`
  margin-bottom: 2rem;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

const SignUpPrompt = styled.p`
  text-align: center;
  color: #4a5568;
  font-size: 0.9rem;
`;

const SignUpLink = styled(Link)`
  color: #6366f1;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #4a5568;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
  }

  &.active {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
  }
`;

const PrimaryButton = styled(Link)`
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fee2e2;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;

export {
  PageContainer,
  NavBar,
  LogoLink,
  Logo,
  NavLinks,
  NavLink,
  PrimaryButton,
  ContentWrapper,
  LeftPanel,
  BrandSection,
  TagLine,
  FeatureList,
  FeatureItem,
  FeatureIcon,
  FeatureText,
  RightPanel,
  Form,
  InputGroup,
  Label,
  Input,
  Divider,
  DividerLine,
  DividerText,
  SocialLogin,
  SocialButton,
  LoginContainer,
  LoginHeader,
  LoginSubHeader,
  LoginButton,
  SignUpPrompt,
  SignUpLink,
  ErrorMessage
};

export default Login; 