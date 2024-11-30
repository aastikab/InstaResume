import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateSelection = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const templates = [
    {
      id: 1,
      name: 'Professional Resume',
      type: 'resume',
      description: 'Perfect for corporate roles. Clean and structured layout.',
      image: '/images/professional-template.png',
      color: 'linear-gradient(135deg, #0061ff 0%, #60efff 100%)'
    },
    {
      id: 2,
      name: 'Creative Resume',
      type: 'resume',
      description: 'Stand out with a modern and creative design.',
      image: '/images/professional-template.png',
      color: 'linear-gradient(135deg, #ff0f7b 0%, #f89b29 100%)'
    },
    {
      id: 3,
      name: 'Professional Cover Letter',
      type: 'coverLetter',
      description: 'Compelling cover letter template to complement your resume.',
      image: '/images/professional-template.png',
      color: 'linear-gradient(135deg, #45B649 0%, #DCE35B 100%)'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <PageContainer>
      <NavBar>
        <LogoLink to="/">
          <Logo>InstaResume</Logo>
        </LogoLink>
        <NavLinks>
          <NavLink to="/templates">Templates</NavLink>
          <NavLink to="/history">History</NavLink>
          <AuthLinks>
            {isAuthenticated ? (
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <PrimaryButton to="/register">Sign Up</PrimaryButton>
              </>
            )}
          </AuthLinks>
        </NavLinks>
      </NavBar>

      <HeroSection>
        <HeroContent
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MainTitle>Create Your Professional Resume</MainTitle>
          <Subtitle>
            Build a stunning resume in minutes with our AI-powered platform
          </Subtitle>
          <HeroButtons>
            <GetStartedButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/templates')}
            >
              Create Resume Now
            </GetStartedButton>
            <WatchDemoButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo ▶
            </WatchDemoButton>
          </HeroButtons>
        </HeroContent>
        <ScrollIndicator>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓
          </motion.div>
        </ScrollIndicator>
      </HeroSection>

      <ContentSection>
        <SectionTitle data-aos="fade-up">Choose Your Template</SectionTitle>
        <TemplateGrid>
          {templates.map((template, index) => (
            <TemplateCard
              key={template.id}
              as={motion.div}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                transform: 'scale(1.02)'
              }}
            >
              <TemplatePreview style={{ background: template.color }}>
                <PreviewImage src={template.image} alt={template.name} />
                <PreviewOverlay />
              </TemplatePreview>
              <CardContent>
                <TemplateName>{template.name}</TemplateName>
                <TemplateDescription>{template.description}</TemplateDescription>
                <UseTemplateButton
                  onClick={() => 
                    template.type === 'resume' 
                      ? navigate(`/builder/${template.id}`)
                      : navigate(`/cover-letter-builder/${template.id}`)
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Use This Template
                </UseTemplateButton>
              </CardContent>
            </TemplateCard>
          ))}
        </TemplateGrid>
      </ContentSection>

      <FeaturesSection>
        <SectionTitle data-aos="fade-up">Why Choose InstaResume?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard data-aos="fade-up">
            <FeatureIcon>🚀</FeatureIcon>
            <FeatureTitle>AI-Powered</FeatureTitle>
            <FeatureDescription>
              Smart suggestions and auto-formatting for professional results
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard data-aos="fade-up" data-aos-delay="100">
            <FeatureIcon>⚡</FeatureIcon>
            <FeatureTitle>Quick & Easy</FeatureTitle>
            <FeatureDescription>
              Create your resume in minutes, not hours
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard data-aos="fade-up" data-aos-delay="200">
            <FeatureIcon>🎯</FeatureIcon>
            <FeatureTitle>ATS-Friendly</FeatureTitle>
            <FeatureDescription>
              Optimized for Applicant Tracking Systems
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <StatsSection>
        <StatItem data-aos="fade-up">
          <StatNumber>10,000+</StatNumber>
          <StatLabel>Success Stories</StatLabel>
        </StatItem>
        <StatItem data-aos="fade-up" data-aos-delay="100">
          <StatNumber>98%</StatNumber>
          <StatLabel>Interview Rate</StatLabel>
        </StatItem>
        <StatItem data-aos="fade-up" data-aos-delay="200">
          <StatNumber>15 Min</StatNumber>
          <StatLabel>Average Build Time</StatLabel>
        </StatItem>
      </StatsSection>

      <Footer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>InstaResume</FooterTitle>
            <FooterText>
              Create professional resumes and cover letters in minutes.
            </FooterText>
          </FooterSection>
          <FooterLinks>
            <FooterLink>About</FooterLink>
            <FooterLink>Templates</FooterLink>
            <FooterLink>Privacy</FooterLink>
            <FooterLink>Contact</FooterLink>
          </FooterLinks>
        </FooterContent>
      </Footer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
`;

const MainTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: -60px auto 0;
  padding: 0 20px;
  position: relative;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px 0;
`;

const TemplateCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const TemplatePreview = styled.div`
  position: relative;
  padding-top: 141%; // Aspect ratio 1:1.41 (A4)
  background: white;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const PreviewImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  padding: 10px;
`;

const PreviewOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%);
  pointer-events: none;
`;

const CardContent = styled.div`
  padding: 20px;
  text-align: center;
`;

const TemplateName = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 10px;
  color: #1a1a1a;
`;

const TemplateDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const UseTemplateButton = styled(motion.button)`
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  }
`;

const StatsSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  padding: 60px 20px;
  background: white;
  margin-top: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    text-align: center;
  }
`;

const StatItem = styled.div``;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #4f46e5;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 1.1rem;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
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
    transform: translateY(-1px);
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
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const GetStartedButton = styled(motion.button)`
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
`;

const WatchDemoButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 2rem;
  opacity: 0.7;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: white;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 20px;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
`;

const FeatureDescription = styled.p`
  color: #718096;
  line-height: 1.6;
`;

const Footer = styled.footer`
  background: #2d3748;
  color: white;
  padding: 4rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  max-width: 300px;
`;

const FooterTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  color: #a0aec0;
  line-height: 1.6;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const FooterLink = styled.a`
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const AuthLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 2rem;
  padding-left: 2rem;
  border-left: 1px solid rgba(74, 85, 104, 0.2);

  @media (max-width: 768px) {
    margin-left: 1rem;
    padding-left: 1rem;
  }
`;

const LogoutButton = styled.button`
  color: #4a5568;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
  }
`;

export default TemplateSelection; 