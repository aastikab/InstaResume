import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ResumeBuilder from './components/ResumeBuilder';
import HistoryPage from './pages/HistoryPage';
import Login from './components/Auth/Login';
import TemplateSelection from './components/TemplateSelection';
import CoverLetterBuilder from './components/CoverLetterBuilder';
import ResumeView from './components/ResumeView';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Register from './components/Auth/Register';

// Updated Home component with modern design
const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MainTitle>Welcome to InstaResume</MainTitle>
          <SubTitle>Create your perfect resume and cover letter in minutes.</SubTitle>
          <HeroDescription>
            Professional templates, AI-powered suggestions, and ATS-friendly formats.
          </HeroDescription>
          <CTAButtons>
            <GetStartedButton
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/templates')}
            >
              Get Started
            </GetStartedButton>
            <WatchDemoButton
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo ▶
            </WatchDemoButton>
          </CTAButtons>
        </HeroContent>
        <HeroImage
          as={motion.img}
          src="/images/hero-image.png"
          alt="Resume Builder"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Why Choose InstaResume?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard
            as={motion.div}
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
          >
            <FeatureIcon>🎯</FeatureIcon>
            <FeatureTitle>ATS-Friendly</FeatureTitle>
            <FeatureDescription>
              Our resumes are optimized for Applicant Tracking Systems
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            as={motion.div}
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
          >
            <FeatureIcon>⚡</FeatureIcon>
            <FeatureTitle>Quick & Easy</FeatureTitle>
            <FeatureDescription>
              Create professional resumes in minutes, not hours
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            as={motion.div}
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
          >
            <FeatureIcon>🤖</FeatureIcon>
            <FeatureTitle>AI-Powered</FeatureTitle>
            <FeatureDescription>
              Smart suggestions to enhance your content
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <StatsSection>
        <StatCard>
          <StatNumber>10,000+</StatNumber>
          <StatLabel>Resumes Created</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>98%</StatNumber>
          <StatLabel>Success Rate</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>24/7</StatNumber>
          <StatLabel>Support</StatLabel>
        </StatCard>
      </StatsSection>

      <CTASection>
        <CTAContent>
          <CTATitle>Ready to Build Your Resume?</CTATitle>
          <CTADescription>
            Join thousands of successful job seekers who have created their perfect resume with InstaResume.
          </CTADescription>
          <StartNowButton
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/templates')}
          >
            Start Now
          </StartNowButton>
        </CTAContent>
      </CTASection>
    </HomeContainer>
  );
};

// Styled Components for Home
const HomeContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6rem 4rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 4rem 2rem;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  line-height: 1.6;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const GetStartedButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #4f46e5;
  background: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const WatchDemoButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: transparent;
  border: 2px solid white;
  border-radius: 30px;
  cursor: pointer;
`;

const HeroImage = styled.img`
  flex: 1;
  max-width: 500px;
  margin-left: 2rem;

  @media (max-width: 768px) {
    margin: 2rem 0 0 0;
    max-width: 100%;
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem;
  background: linear-gradient(135deg, #f6f7ff 0%, #ffffff 100%);
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  background: linear-gradient(to right, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  justify-items: center;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #4f46e5;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 1.1rem;
  opacity: 0.8;
`;

const StatsSection = styled.section`
  padding: 4rem;
  background: linear-gradient(135deg, #f6f7ff 0%, #ffffff 100%);
  text-align: center;
`;

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 1rem;
`;

const StatNumber = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  font-size: 1.1rem;
  opacity: 0.8;
`;

const CTASection = styled.section`
  padding: 4rem;
  background: linear-gradient(135deg, #f6f7ff 0%, #ffffff 100%);
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  background: linear-gradient(to right, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.8;
`;

const StartNowButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #4f46e5;
  background: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);

    // Redirect to login if not authenticated
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <AnimatePresence mode='wait'>
        <MainContent
          as={motion.main}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? (
                  <Navigate to="/templates" />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/templates" />
                )
              } 
            />
            <Route 
              path="/signup" 
              element={
                !isAuthenticated ? (
                  <Register setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/templates" />
                )
              } 
            />
            <Route
              path="/templates"
              element={
                isAuthenticated ? (
                  <TemplateSelection 
                    isAuthenticated={isAuthenticated} 
                    setIsAuthenticated={setIsAuthenticated}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/builder/:templateId"
              element={isAuthenticated ? <ResumeBuilder /> : <Navigate to="/login" />}
            />
            <Route
              path="/cover-letter-builder/:templateId"
              element={isAuthenticated ? <CoverLetterBuilder /> : <Navigate to="/login" />}
            />
            <Route
              path="/history"
              element={
                isAuthenticated ? (
                  <HistoryPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/resume/:id"
              element={isAuthenticated ? <ResumeView /> : <Navigate to="/login" />}
            />
          </Routes>
        </MainContent>
      </AnimatePresence>
    </div>
  );
};

const MainContent = styled.main`
  min-height: calc(100vh - 64px - 56px); // Adjust based on your header and footer heights
  background: linear-gradient(135deg, #f6f7ff 0%, #ffffff 100%);
`;

export default App;