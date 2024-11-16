import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateSelection = () => {
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
      description: 'A clean and professional resume template perfect for corporate applications',
      image: '/images/professional-template.png',
      bgColor: 'linear-gradient(135deg, #f6f7ff 0%, #e9ebff 100%)'
    },
    {
      id: 2,
      name: 'Creative Resume',
      type: 'resume',
      description: 'Modern and creative resume template ideal for design and creative roles',
      image: '/images/creative-template.png',
      bgColor: 'linear-gradient(135deg, #fff6e5 0%, #ffe4bc 100%)'
    },
    {
      id: 3,
      name: 'Standard Cover Letter',
      type: 'coverLetter',
      description: 'Professional cover letter template that complements your resume',
      image: '/images/cover-letter-template.png',
      bgColor: 'linear-gradient(135deg, #e5f4ff 0%, #b3e0ff 100%)'
    }
  ];

  return (
    <Container>
      <Title
        as={motion.h1}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose Your Template
      </Title>
      <TemplateGrid>
        {templates.map((template, index) => (
          <TemplateCard
            key={template.id}
            as={motion.div}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            style={{ background: template.bgColor }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 20px 30px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (template.type === 'resume') {
                navigate(`/builder/${template.id}`);
              } else {
                navigate(`/cover-letter-builder/${template.id}`);
              }
            }}
          >
            <CardContent>
              <ImageWrapper>
                <TemplateImage 
                  src={template.image} 
                  alt={template.name}
                  as={motion.img}
                  whileHover={{ scale: 1.05 }}
                />
                <ImageOverlay />
              </ImageWrapper>
              <TemplateName>{template.name}</TemplateName>
              <TemplateDescription>{template.description}</TemplateDescription>
              <SelectButton
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Select Template
              </SelectButton>
            </CardContent>
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
  perspective: 1000px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const TemplateCard = styled(motion.div)`
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  overflow: hidden;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
`;

const TemplateImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.1) 100%
  );
  pointer-events: none;
`;

const TemplateName = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const TemplateDescription = styled.p`
  color: #666;
  font-size: 1rem;
  text-align: center;
  line-height: 1.5;
  margin: 0;
`;

const SelectButton = styled(motion.button)`
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  &:hover {
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
    box-shadow: 0 6px 8px rgba(0,0,0,0.2);
  }
`;

export default TemplateSelection; 