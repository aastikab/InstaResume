import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { generateDocx } from '../utils/docxGenerator';
import { generatePDF } from '../utils/pdfGenerator';
import { professionalQuestions, professionalFormat } from '../templates/ProfessionalResume';
import { modernQuestions, modernFormat } from '../templates/ModernResume';
import { coverLetterQuestions, coverLetterFormat } from '../templates/CoverLetter';

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f6f7ff 0%, #ffffff 100%);
`;

const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: 100vh;
  padding: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const BuilderSection = styled.div`
  overflow-y: auto;
`;

const PreviewSection = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const PreviewHeader = styled.div`
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const PreviewContainer = styled.div.attrs({ className: 'preview-content' })`
  padding: 2rem;
  min-height: 100%;
  background: white;
`;

const DownloadButton = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }
`;

const BuilderCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const ChatContainer = styled.div`
  padding: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled.div`
  padding: 1rem;
  border-radius: 12px;
  max-width: 80%;
  ${props => props.type === 'bot' ? `
    background: #f3f4f6;
    color: #1f2937;
    align-self: flex-start;
  ` : `
    background: #6366f1;
    color: white;
    align-self: flex-end;
  `}
`;

const TypingIndicator = styled.div`
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 12px;
  align-self: flex-start;
  font-size: 0.9rem;
  font-style: italic;
`;

const InputForm = styled.form`
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  margin-top: auto;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  text-align: center;
  padding: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
`;

const DownloadButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const TemplateSelection = styled.div`
  padding: 2rem;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TemplateCard = styled.div`
  padding: 2rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
`;

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
      title: '',
      email: '',
      phone: '',
      location: '',
      urls: []
    },
    experience: [],
    education: {
      school: '',
      degree: '',
      date: '',
      gpa: ''
    },
    achievements: [],
    skills: [],
    certifications: [],
    languages: []
  });
  const [loading, setLoading] = useState(false);
  const [resumePreview, setResumePreview] = useState('');
  const [templates] = useState([
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clean and traditional format suitable for most industries'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary design with creative layout'
    },
    {
      id: 'Cover-Letter',
      name: 'Cover-Letter',
      description: 'Focused on Cover-Letter skills and projects'
    }
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [steps, setSteps] = useState([]);

  // Update preview whenever formData changes
  useEffect(() => {
    updateResumePreview();
  }, [formData]);

  useEffect(() => {
    // Set questions based on template
    switch(templateId) {
      case '1':
        setSteps(professionalQuestions);
        break;
      case '2':
        setSteps(modernQuestions);
        break;
      case '3':
        setSteps(coverLetterQuestions);
        break;
      default:
        setSteps(professionalQuestions);
    }
  }, [templateId]);

  const updateResumePreview = () => {
    let preview;
    
    switch(templateId) {
      case '1':
        preview = professionalFormat(formData);
        break;
      case '2':
        preview = modernFormat(formData);
        break;
      case '3':
        preview = coverLetterFormat(formData);
        break;
      default:
        preview = professionalFormat(formData);
    }

    setResumePreview(preview);
  };

  const handleEditPrompt = async (prompt) => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/resume/edit`, {
        prompt,
        resumeData: formData
      });
      
      if (response.data.updatedContent) {
        setFormData(response.data.updatedContent);
        setMessages(prev => [...prev, 
          { type: 'user', text: prompt },
          { type: 'bot', text: "I've updated your resume based on your request. How else can I help?" }
        ]);
      }
    } catch (error) {
      console.error('Error updating resume:', error);
      setMessages(prev => [...prev, 
        { type: 'bot', text: 'Sorry, I had trouble updating your resume. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

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
  
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    setLoading(true);
  
    const currentField = steps[currentStep].field;
    const updatedFormData = { ...formData };
  
    // Handle "add_more_experience" question FIRST
    if (currentField === 'add_more_experience') {
      if (input.toLowerCase() === 'yes') {
        // Go back to experience company question
        const experienceCompanyIndex = steps.findIndex(s => s.field === 'experience_company');
        setCurrentStep(experienceCompanyIndex);
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'bot', text: steps[experienceCompanyIndex].question }]);
          setLoading(false);
        }, 1000);
        setInput('');
        return;
      } else if (input.toLowerCase() === 'no') {
        // Move to education section
        const educationIndex = steps.findIndex(s => s.field === 'add_education');
        setCurrentStep(educationIndex);
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'bot', text: steps[educationIndex].question }]);
          setLoading(false);
        }, 1000);
        setInput('');
        return;
      }
    }

    // THEN handle other "add_" questions
    if (currentField.startsWith('add_')) {
      if (input.toLowerCase() === 'no') {
        // Find the next section's "add_" question
        const currentIndex = steps.findIndex(s => s.field === currentField);
        let nextSectionIndex = steps.findIndex((s, index) => 
          index > currentIndex && s.field.startsWith('add_') && !s.field.startsWith('add_more_')
        );

        // Skip the questions for the current section
        if (currentField === 'add_summary') {
          // Skip summary question
          nextSectionIndex = steps.findIndex(s => s.field === 'add_experience');
        } else if (currentField === 'add_experience') {
          nextSectionIndex = steps.findIndex(s => s.field === 'add_education');
        } else if (currentField === 'add_education') {
          nextSectionIndex = steps.findIndex(s => s.field === 'add_skills');
        } else if (currentField === 'add_skills') {
          nextSectionIndex = steps.findIndex(s => s.field === 'add_certifications');
        } else if (currentField === 'add_certifications') {
          nextSectionIndex = steps.findIndex(s => s.field === 'add_languages');
        }

        if (nextSectionIndex === -1) {
          nextSectionIndex = steps.length - 1;
        }

        setCurrentStep(nextSectionIndex);
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'bot', text: steps[nextSectionIndex].question }]);
          setLoading(false);
        }, 1000);
        setInput('');
        return;
      }
      // If yes, continue to the next question normally
      setCurrentStep(prev => prev + 1);
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: steps[currentStep + 1].question }]);
        setLoading(false);
      }, 1000);
      setInput('');
      return;
    }

    // Add the URL handling code HERE, before the regular field updates
    if (currentField.startsWith('url')) {
      if (currentField === 'url2' && input.toLowerCase() === 'no') {
        // Skip directly to the next section (summary)
        const nextSectionIndex = steps.findIndex(s => s.field === 'add_summary');
        setCurrentStep(nextSectionIndex);
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'bot', text: steps[nextSectionIndex].question }]);
          setLoading(false);
        }, 1000);
        setInput('');
        return;
      }

      if (currentField.endsWith('_type')) {
        const urlIndex = currentField === 'url1_type' ? 0 : 1;
        if (!updatedFormData.personalInfo.urls[urlIndex]) {
          updatedFormData.personalInfo.urls[urlIndex] = {};
        }
        updatedFormData.personalInfo.urls[urlIndex].type = input;
      } else {
        const urlIndex = currentField === 'url1' ? 0 : 1;
        if (!updatedFormData.personalInfo.urls[urlIndex]) {
          updatedFormData.personalInfo.urls[urlIndex] = {};
        }
        updatedFormData.personalInfo.urls[urlIndex].url = input;
      }
    }

    // Handle regular field updates
    if (currentStep < steps.length - 1) {
      // Update form data based on field type
      if (currentField.startsWith('education_')) {
        const field = currentField.replace('education_', '');
        updatedFormData.education[field] = input;
      } else if (currentField === 'skills') {
        updatedFormData.skills = input.split(',').map(skill => skill.trim());
      } else if (currentField === 'experience_company') {
        updatedFormData.experience.push({
          company: input,
          title: '',
          location: '',
          date: '',
          responsibilities: []
        });
      } else if (currentField.startsWith('experience_')) {
        const field = currentField.replace('experience_', '');
        const currentExp = updatedFormData.experience[updatedFormData.experience.length - 1];
        if (field === 'responsibilities') {
          currentExp[field] = input.split(';').map(resp => resp.trim());
        } else {
          currentExp[field] = input;
        }
      } else if (currentField.startsWith('achievement_')) {
        const [_, index, type] = currentField.split('_');
        if (!updatedFormData.achievements[parseInt(index) - 1]) {
          updatedFormData.achievements[parseInt(index) - 1] = {};
        }
        updatedFormData.achievements[parseInt(index) - 1][type] = input;
      } else if (currentField === 'summary') {
        updatedFormData.personalInfo.summary = input;
      } else if (currentField.startsWith('certification_')) {
        const [_, index, type] = currentField.split('_');
        if (!updatedFormData.certifications[parseInt(index) - 1]) {
          updatedFormData.certifications[parseInt(index) - 1] = {};
        }
        updatedFormData.certifications[parseInt(index) - 1][type === 'description' ? 'description' : 'name'] = input;
      } else if (currentField === 'languages') {
        try {
          // Parse languages
          const languageEntries = input.split(';').map(lang => {
            const [language, level] = lang.split('-').map(s => s.trim());
            return { language, level };
          });
      
          // Create final form data
          const finalFormData = {
            ...updatedFormData,
            languages: languageEntries
          };
      
          // Update form data immediately
          setFormData(finalFormData);
      
          // Just add the user's final input without any bot response
          setMessages(prev => [
            ...prev, 
            { type: 'user', text: input }
          ]);
      
          // Clear input, stop loading, and update preview
          setInput('');
          setLoading(false);
          updateResumePreview();
      
          // Set currentStep to the last step to prevent further questions
          setCurrentStep(steps.length - 1);
      
          // IMPORTANT: Return immediately
          return;
        } catch (error) {
          console.error('Error processing languages:', error);
          setMessages(prev => [...prev, { 
            type: 'bot', 
            text: 'Sorry, there was an error processing your languages. Please try again.' 
          }]);
          setLoading(false);
          return;
        }
      } else if (templateId === '3' && currentField === 'closing') {
        // For cover letter, when we reach the closing message
        updatedFormData[currentField] = 'I would welcome the opportunity to discuss how my background and skills would benefit your organization. Thank you for considering my application.';
        
        // Update form data
        setFormData(updatedFormData);
        
        // Show completion message without waiting for input
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: "Great your cover letter is ready to download" }
        ]);
        
        // Clear input and stop loading
        setInput('');
        setLoading(false);
        
        // Update preview one final time
        updateResumePreview();
        
        // Set to last step to prevent further questions
        setCurrentStep(steps.length - 1);
        
        // Important: Return immediately to prevent further processing
        return;
      } else if (templateId === '3') {
        // Handle other cover letter fields normally
        updatedFormData[currentField] = input;
      } else {
        // Handle other templates as before
        updatedFormData.personalInfo[currentField] = input;
      }
  
      setFormData(updatedFormData);
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: steps[nextStep].question }]);
        setLoading(false);
      }, 1000);
    } else {
      // Handle final submission
      try {
        // ... rest of your submission code ...
      } catch (error) {
        // ... error handling ...
      }
    }
    setInput('');
  };

  const validateInput = (field, value) => {
    switch (field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'phone':
        return /^\+?[\d\s-]{10,}$/.test(value);
      case 'experience_responsibilities':
        return value.split(';').length >= 2; // Ensure at least 2 responsibilities
      default:
        return value.length > 0;
    }
  };

  const getAISuggestions = async (input, field) => {
    try {
      const response = await axios.post('/api/suggestions', {
        input,
        field,
        context: formData
      });
      
      if (response.data.suggestion) {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: `Suggestion: ${response.data.suggestion}`
        }]);
      }
    } catch (error) {
      console.error('Error getting suggestions:', error);
    }
  };

  return (
    <Container>
      <SplitLayout>
        <BuilderSection>
          <BuilderCard>
            <Header>Resume Builder Assistant</Header>
            
            {!selectedTemplate ? (
              <TemplateSelection>
                <h2>Choose a Template</h2>
                <TemplateGrid>
                  {templates.map(template => (
                    <TemplateCard
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template);
                        setMessages([{ 
                          type: 'bot', 
                          text: `Great choice! Let's create your ${template.name} resume. What's your full name?`
                        }]);
                      }}
                    >
                      <h3>{template.name}</h3>
                      <p>{template.description}</p>
                    </TemplateCard>
                  ))}
                </TemplateGrid>
              </TemplateSelection>
            ) : (
              <>
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
                    placeholder="Type your answer or edit request here..."
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
                  <Progress width={(currentStep / (steps.length - 1)) * 100} />
                </ProgressBar>
                <ProgressText>Step {currentStep + 1} of {steps.length}</ProgressText>
              </>
            )}
          </BuilderCard>
        </BuilderSection>

        <PreviewSection>
          <PreviewHeader>
            <h2>Live Preview</h2>
            <DownloadButtons>
              <DownloadButton
                onClick={async () => {
                  try {
                    // Create a styled container with the resume content
                    const styledContent = `
                      <div style="
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 40px;
                        background: white;
                        color: black;
                      ">
                        ${resumePreview}
                      </div>
                    `;
                    await generatePDF(styledContent);
                  } catch (error) {
                    console.error('Error generating PDF:', error);
                  }
                }}
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download as PDF
              </DownloadButton>
              <DownloadButton
                onClick={async () => {
                  try {
                    await generateDocx(formData);
                  } catch (error) {
                    console.error('Error generating DOCX:', error);
                  }
                }}
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download as DOCX
              </DownloadButton>
            </DownloadButtons>
          </PreviewHeader>
          <PreviewContainer 
            dangerouslySetInnerHTML={{ __html: resumePreview }}
            className='preview-content'
          />
        </PreviewSection>
      </SplitLayout>
    </Container>
  );
};

export default ResumeBuilder;