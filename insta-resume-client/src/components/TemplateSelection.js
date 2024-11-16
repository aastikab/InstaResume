import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TemplateSelection = () => {
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      name: 'Professional Resume',
      type: 'resume',
      description: 'A clean and professional resume template perfect for corporate applications',
      image: '/templates/professional-resume.png'
    },
    {
      id: 2,
      name: 'Creative Resume',
      type: 'resume',
      description: 'Modern and creative resume template ideal for design and creative roles',
      image: '/templates/creative-resume.png'
    },
    {
      id: 3,
      name: 'Standard Cover Letter',
      type: 'coverLetter',
      description: 'Professional cover letter template that complements your resume',
      image: '/templates/cover-letter.png'
    }
  ];

  const handleTemplateSelect = (template) => {
    if (template.type === 'resume') {
      navigate(`/builder/${template.id}`);
    } else {
      navigate(`/cover-letter-builder/${template.id}`);
    }
  };

  return (
    <Container>
      <Title>Choose Your Template</Title>
      <TemplateGrid>
        {templates.map((template) => (
          <TemplateCard key={template.id} onClick={() => handleTemplateSelect(template)}>
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

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const TemplateCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const TemplateImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const TemplateName = styled.h3`
  margin: 0.5rem 0;
  color: #333;
`;

const TemplateDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

export default TemplateSelection; 