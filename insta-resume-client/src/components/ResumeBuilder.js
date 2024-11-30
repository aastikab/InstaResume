import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { generateDocx } from '../utils/docxGenerator';
import { generatePDF } from '../utils/pdfGenerator';

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

  // Update preview whenever formData changes
  useEffect(() => {
    updateResumePreview();
  }, [formData]);

  const updateResumePreview = () => {
    const preview = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div style="text-align: left;">
            <div>(Phone)</div>
            ${formData.personalInfo.phone || ''}<br/>
            <div>(Email)</div>
            ${formData.personalInfo.email || ''}
          </div>
          <div style="text-align: center; flex-grow: 1;">
            <h1 style="margin: 0; font-size: 24px; text-transform: uppercase; font-weight: bold;">
              ${formData.personalInfo.name || 'Your Name'}
            </h1>
            <div style="color: #666; margin-top: 5px;">
              ${formData.personalInfo.title || 'Professional Title'} | ${formData.personalInfo.location || 'Location'}
            </div>
          </div>
          <div style="text-align: right;">
            <div>(URL)</div>
            ${formData.personalInfo.urls.map(url => 
              `${url.type}: ${url.url}<br/>`
            ).join('')}
          </div>
        </div>

        ${formData.personalInfo.summary ? `
          <!-- Summary Section -->
          <div style="margin-bottom: 20px;">
            <h2 style="text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px;">
              Summary
            </h2>
            <p style="margin: 0; color: #333;">
              ${formData.personalInfo.summary}
            </p>
          </div>
        ` : ''}

        ${formData.experience.length > 0 ? `
          <!-- Experience Section -->
          <div style="margin-bottom: 20px;">
            <h2 style="text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px;">
              Relevant Experience
            </h2>
            ${formData.experience.map(exp => `
              <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <div>
                    <div style="font-weight: bold;">${exp.company || 'Company Name'}</div>
                    <div style="font-style: italic;">${exp.title || 'Position Title'}</div>
                  </div>
                  <div style="text-align: right;">
                    <div>${exp.location || 'Location'}</div>
                    <div>${exp.date || 'Date Range'}</div>
                  </div>
                </div>
                <ul style="margin: 5px 0; padding-left: 20px;">
                  ${exp.responsibilities ? exp.responsibilities.map(resp => 
                    `<li>${resp}</li>`
                  ).join('') : ''}
                </ul>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${formData.education.school ? `
          <!-- Education Section -->
          <div style="margin-bottom: 20px;">
            <h2 style="text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px;">
              Education
            </h2>
            <div style="display: flex; justify-content: space-between;">
              <div>
                <div style="font-weight: bold;">${formData.education.school}</div>
                <div>${formData.education.degree}</div>
                ${formData.education.gpa ? `<div>GPA: ${formData.education.gpa}</div>` : ''}
              </div>
              <div style="text-align: right;">
                ${formData.education.date}
              </div>
            </div>
          </div>
        ` : ''}

        ${formData.achievements.length > 0 ? `
          <!-- Achievements Section -->
          <div style="margin-bottom: 20px;">
            <h2 style="text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px;">
              Achievements
            </h2>
            <div style="display: flex; justify-content: space-between; gap: 20px;">
              ${formData.achievements.map(achievement => `
                <div style="flex: 1; text-align: center;">
                  <div style="font-weight: bold;">✦ ${achievement.title || ''}</div>
                  <div style="color: #666; font-size: 0.9em;">${achievement.description || ''}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${formData.skills.length > 0 ? `
          <!-- Skills Section -->
          <div style="margin-bottom: 20px;">
            <h2 style="text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px;">
              Skills
            </h2>
            <p style="margin: 0;">
              ${formData.skills.join(' • ') || 'List your skills here...'}
            </p>
          </div>
        ` : ''}

        ${formData.certifications.length > 0 ? `
          <!-- Certifications Section -->
          <div style="margin-bottom: 20px;">
            <h2 style="text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px;">
              Certification
            </h2>
            ${formData.certifications.map(cert => `
              <div style="margin-bottom: 5px;">
                <strong>${cert.name}</strong> — ${cert.description}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${formData.languages.length > 0 ? `
          <!-- Languages Section -->
          <div style="margin-bottom: 20px;">
            <h2 style="text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px;">
              Languages
            </h2>
            <div style="display: flex; gap: 30px;">
              ${formData.languages.map(lang => `
                <div>
                  <span>${lang.language}</span>
                  <span style="margin-left: 10px;">
                    ${'●'.repeat(lang.level === 'Native' ? 5 : 4)}${lang.level !== 'Native' ? '○' : ''}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
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

    const steps = [
      // Personal Information (Required)
      { field: 'name', question: "What's your full name?" },
      { field: 'title', question: "What's your professional title? (e.g., Product Marketing Manager)" },
      { field: 'email', question: "What's your email address?" },
      { field: 'phone', question: "What's your phone number?" },
      { field: 'location', question: "Where are you located? (e.g., Virginia Beach, VA)" },
      
      // URLs
      { field: 'add_urls', question: "Would you like to add any professional URLs (LinkedIn, GitHub, Portfolio)? (yes/no)" },
      { field: 'url1', question: "Please provide your first professional URL" },
      { field: 'url1_type', question: "What type of URL is this? (e.g., LinkedIn, GitHub, Portfolio)" },
      { field: 'url2', question: "Would you like to add another URL? If yes, enter the URL, if no, type 'no'" },
      { field: 'url2_type', question: "What type of URL is this?" },

      // Summary
      { field: 'add_summary', question: "Would you like to add a professional summary? (yes/no)" },
      { field: 'summary', question: "Please provide a brief professional summary highlighting your key achievements." },

      // Experience
      { field: 'add_experience', question: "Would you like to add work experience? (yes/no)" },
      { field: 'experience_company', question: "What's the company name?" },
      { field: 'experience_title', question: "What was your position title?" },
      { field: 'experience_location', question: "Where was this position located?" },
      { field: 'experience_date', question: "When did you work here? (e.g., 01/2022 - Present)" },
      { field: 'experience_responsibilities', question: "List 3-4 key achievements or responsibilities (separate with semicolons)" },
      { field: 'add_more_experience', question: "Would you like to add another position? (yes/no)" },

      // Education
      { field: 'add_education', question: "Would you like to add education details? (yes/no)" },
      { field: 'education_school', question: "What's your university name?" },
      { field: 'education_degree', question: "What degree did you receive?" },
      { field: 'education_date', question: "What are your attendance dates?" },
      { field: 'education_gpa', question: "What was your GPA? (Optional)" },

      // Achievements
      { field: 'add_achievements', question: "Would you like to add key achievements? (yes/no)" },
      { field: 'achievement_1_title', question: "What's your first achievement title?" },
      { field: 'achievement_1_description', question: "Briefly describe this achievement" },
      { field: 'add_more_achievements', question: "Would you like to add another achievement? (yes/no)" },

      // Skills
      { field: 'add_skills', question: "Would you like to add skills? (yes/no)" },
      { field: 'skills', question: "List your key skills, separated by commas" },

      // Certifications
      { field: 'add_certifications', question: "Would you like to add certifications? (yes/no)" },
      { field: 'certification_1', question: "What's your first certification?" },
      { field: 'certification_1_description', question: "Briefly describe this certification" },
      { field: 'add_more_certification', question: "Would you like to add another certification? (yes/no)" },

      // Languages
      { field: 'add_languages', question: "Would you like to add language proficiencies? (yes/no)" },
      { field: 'languages', question: "List your languages and proficiency levels (e.g., English - Native, Spanish - Advanced). Separate with semicolons." }
    ];

    // Process input based on current step
    const currentField = steps[currentStep].field;
    const updatedFormData = { ...formData };

    if (currentField.startsWith('add_')) {
      if (input.toLowerCase() === 'no') {
        // Find the next section's "add_" question
        const currentIndex = steps.findIndex(s => s.field === currentField);
        let nextSectionIndex = steps.findIndex((s, index) => 
          index > currentIndex && s.field.startsWith('add_')
        );

        // If no more sections found, go to the last step
        if (nextSectionIndex === -1) {
          nextSectionIndex = steps.length - 1;
        }

        // Skip to next section
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'bot', text: steps[nextSectionIndex].question }]);
          setLoading(false);
        }, 1000);
        
        setCurrentStep(nextSectionIndex);
        setInput('');
        return;
      }
      // If yes, continue to next question normally
      setCurrentStep(prev => prev + 1);
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: steps[currentStep + 1].question }]);
        setLoading(false);
      }, 1000);
      setInput('');
      return;
    }

    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: steps[currentStep + 1].question }]);
        setLoading(false);
      }, 1000);

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
        updatedFormData.languages = input.split(';').map(lang => {
          const [language, level] = lang.split('-').map(s => s.trim());
          return { language, level };
        });
      } else if (currentField.startsWith('url')) {
        if (currentField === 'url2' && input.toLowerCase() === 'no') {
          // Skip the url2_type question if user doesn't want to add second URL
          const nextSectionIndex = steps.findIndex(s => 
            s.field.startsWith('add_') && s.field !== 'add_urls'
          );
          setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', text: steps[nextSectionIndex].question }]);
            setLoading(false);
          }, 1000);
          setCurrentStep(nextSectionIndex);
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
      } else {
        // Handle basic personal info fields
        updatedFormData.personalInfo[currentField] = input;
      }

      setFormData(updatedFormData);
      setCurrentStep(prev => prev + 1);
    } else {
      // Handle final submission
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
      <SplitLayout>
        <BuilderSection>
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
              <Progress width={(currentStep / 7) * 100} />
            </ProgressBar>
            <ProgressText>Step {currentStep + 1} of 8</ProgressText>
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

// Styled components
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

export default ResumeBuilder;