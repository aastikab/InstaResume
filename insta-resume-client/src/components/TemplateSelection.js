import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TemplateSelection = () => {
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      name: 'Professional',
      description: 'Clean and traditional format suitable for most industries',
      image: '/images/professional-template.png'
    },
    {
      id: 2,
      name: 'Creative',
      description: 'Modern and unique design for creative professionals',
      image: '/images/creative-template.png'
    },
    {
      id: 3,
      name: 'Cover-Letter',
      description: 'Focused layout for Cover-Letter roles and skills',
      image: '/images/cover-letter-template.png'
    }
  ];

  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <WelcomeText>Welcome to InstaResume</WelcomeText>
          <SubTitle>Create ATS-Friendly Resumes in Minutes</SubTitle>
          <FeatureGrid>
            <FeatureItem>
              <FeatureIcon>✨</FeatureIcon>
              <FeatureText>
                <FeatureTitle>ATS-Optimized</FeatureTitle>
                <FeatureDescription>Our templates are designed to pass Applicant Tracking Systems</FeatureDescription>
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>🤖</FeatureIcon>
              <FeatureText>
                <FeatureTitle>AI-Powered</FeatureTitle>
                <FeatureDescription>Smart suggestions to enhance your content</FeatureDescription>
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureText>
                <FeatureTitle>Quick & Easy</FeatureTitle>
                <FeatureDescription>Create professional resumes in minutes, not hours</FeatureDescription>
              </FeatureText>
            </FeatureItem>
          </FeatureGrid>
        </HeroContent>
      </HeroSection>

      {/* Templates Section */}
      <TemplatesSection>
        <SectionTitle>Choose Your Template</SectionTitle>
        <SectionDescription>
          Select from our professionally designed templates, each optimized for ATS compatibility
        </SectionDescription>
        <TemplateGrid>
          {templates.map((template, index) => (
            <TemplateCard
              key={template.id}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
              onClick={() => navigate(`/builder/${template.id}`)}
            >
              <TemplateImage 
                src={template.image} 
                alt={template.name}
                onError={(e) => {
                  console.log(`Error loading image: ${template.image}`);
                  e.target.src = '/images/placeholder.png';
                }}
              />
              <TemplateContent>
                <TemplateName>{template.name}</TemplateName>
                <TemplateDescription>{template.description}</TemplateDescription>
                <SelectButton>Use This Template</SelectButton>
              </TemplateContent>
            </TemplateCard>
          ))}
        </TemplateGrid>
      </TemplatesSection>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  padding: 4rem 2rem;
  color: white;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const WelcomeText = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  opacity: 0.9;
  margin-bottom: 3rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
`;

const FeatureText = styled.div``;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  opacity: 0.9;
  font-size: 0.9rem;
`;

const TemplatesSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const SectionDescription = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  font-size: 1.1rem;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TemplateCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
`;

const TemplateImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const TemplateContent = styled.div`
  padding: 1.5rem;
`;

const TemplateName = styled.h3`
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const TemplateDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #4f46e5;
  }
`;

export default TemplateSelection; 