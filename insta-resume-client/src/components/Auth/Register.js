import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

// Import all styled components from Login
import {
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
  SignUpLink
} from './Login'; // Create this export in Login.js

const Register = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8002/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/templates');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || 'Registration failed');
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
            <Logo>InstaResume</Logo>
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
          <RegisterContainer
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RegisterHeader>Create Account</RegisterHeader>
            <RegisterSubHeader>Join thousands of successful job seekers</RegisterSubHeader>

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

              <RegisterButton
                type="submit"
                as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Account
              </RegisterButton>

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
                  Sign up with Google
                </SocialButton>
              </SocialLogin>

              <LoginPrompt>
                Already have an account? <LoginLink to="/login">Log in</LoginLink>
              </LoginPrompt>
            </Form>
          </RegisterContainer>
        </RightPanel>
      </ContentWrapper>
    </PageContainer>
  );
};

// Define new styled components specific to Register
const RegisterContainer = styled(LoginContainer)``;
const RegisterHeader = styled(LoginHeader)``;
const RegisterSubHeader = styled(LoginSubHeader)``;
const RegisterButton = styled(LoginButton)``;
const LoginPrompt = styled(SignUpPrompt)``;
const LoginLink = styled(SignUpLink)``;

export default Register; 