import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: getWelcomeMessage(templateId)
    }
  ]);
  const [input, setInput] = useState('');
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    templateId: templateId
  });
  const [loading, setLoading] = useState(false);

  function getWelcomeMessage(templateId) {
    switch(templateId) {
      case '1':
        return "Hi! I'm your resume assistant. Let's create a professional resume together. What's your full name?";
      case '2':
        return "Welcome! I'll help you build a creative resume. What's your full name?";
      default:
        return "Hello! I'll guide you through creating your resume. What's your full name?";
    }
  }

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    setLoading(true);

    // Process input based on current step
    const steps = [
      { field: 'name', question: "Great! What's your email address?" },
      { field: 'email', question: "Perfect! What's your phone number?" },
      { field: 'phone', question: "What's your current location (city, state)?" },
      { field: 'address', question: "Now, write a brief professional summary about yourself." },
      { field: 'summary', question: "Let's add your work experience. What was your most recent job title?" },
      { field: 'experience', question: "What's your highest level of education?" },
      { field: 'education', question: "Finally, list your key skills (separate with commas)." },
      { field: 'skills', question: "Great! I'll generate your resume now." }
    ];

    // Update formData based on current step
    const currentField = steps[currentStep].field;
    const updatedFormData = { ...formData };
    
    if (currentStep < steps.length - 1) {
      // Add bot response after a short delay
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: steps[currentStep + 1].question }]);
        setLoading(false);
      }, 1000);

      // Update form data
      if (currentField === 'experience' || currentField === 'education') {
        updatedFormData[currentField] = [...formData[currentField], input];
      } else if (currentField === 'skills') {
        updatedFormData[currentField] = input.split(',').map(skill => skill.trim());
      } else {
        updatedFormData.personalInfo[currentField] = input;
      }

      setFormData(updatedFormData);
      setCurrentStep(prev => prev + 1);
    } else {
      // Final step - generate resume
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/resumes`,
          updatedFormData,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (response.data.success) {
          navigate('/history');
        }
      } catch (error) {
        console.error('Error creating resume:', error);
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: "Sorry, there was an error creating your resume. Please try again." 
        }]);
      }
    }

    setInput('');
  };

  return (
    <Container>
      <BuilderCard>
        <Header>Resume Builder Assistant</Header>
        
        <ChatContainer>
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              type={message.type}
            >
              {message.text}
            </MessageBubble>
          ))}
          {loading && <TypingIndicator>Assistant is typing...</TypingIndicator>}
        </ChatContainer>

        <InputForm onSubmit={handleInputSubmit}>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer here..."
            disabled={loading}
          />
          <SubmitButton
            type="submit"
            disabled={loading || !input.trim()}
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </SubmitButton>
        </InputForm>

        <ProgressBar>
          <Progress width={(currentStep / 7) * 100} />
        </ProgressBar>
        <ProgressText>Step {currentStep + 1} of 8</ProgressText>
      </BuilderCard>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f6f7ff 0%, #ffffff 100%);
`;

// ... Add all the styled components here ...

export default ResumeBuilder;