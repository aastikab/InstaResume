import React, { useEffect } from 'react';
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
      image: '/templates/professional.png'
    },
    {
      id: 2,
      name: 'Creative',
      description: 'Modern and unique design for creative professionals',
      image: '/templates/creative.png'
    },
    {
      id: 3,
      name: 'Technical',
      description: 'Focused layout for technical roles and skills',
      image: '/templates/technical.png'
    }
  ];

  return (
    <Container>
      <Header>Choose Your Template</Header>
      <TemplateGrid>
        {templates.map((template, index) => (
          <TemplateCard
            key={template.id}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/builder/${template.id}`)}
          >
            <TemplateImage src={template.image} alt={template.name} />
            <TemplateName>{template.name}</TemplateName>
            <TemplateDescription>{template.description}</TemplateDescription>
          </TemplateCard>
        ))}
      </TemplateGrid>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #1a1a1a;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const TemplateCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
`;

const TemplateImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const TemplateName = styled.h3`
  padding: 1rem;
  margin: 0;
  color: #1a1a1a;
`;

const TemplateDescription = styled.p`
  padding: 0 1rem 1rem;
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

export default TemplateSelection; 