import React from 'react';

export const professionalQuestions = [
  // Personal Information
  { field: 'name', question: "What's your full name?" },
  { field: 'title', question: "What's your professional title? (e.g., Software Engineer)" },
  { field: 'email', question: "What's your email address?" },
  { field: 'phone', question: "What's your phone number?" },
  { field: 'location', question: "Where are you located? (e.g., New York, NY)" },
  
  // Professional URLs
  { field: 'add_urls', question: "Would you like to add any professional URLs (LinkedIn, GitHub)? (yes/no)" },
  { field: 'url1', question: "Please provide your LinkedIn URL" },
  { field: 'url2', question: "Would you like to add your GitHub profile? If yes, enter URL, if no, type 'no'" },
  
  // Professional Summary
  { field: 'add_summary', question: "Would you like to add a professional summary? (yes/no)" },
  { field: 'summary', question: "Provide a brief professional summary highlighting your key achievements and expertise." },
  
  // Experience
  { field: 'add_experience', question: "Let's add your work experience. Ready to start? (yes/no)" },
  { field: 'experience_company', question: "What's the company name?" },
  { field: 'experience_title', question: "What was your position title?" },
  { field: 'experience_location', question: "Where was this position located?" },
  { field: 'experience_date', question: "When did you work here? (e.g., 01/2022 - Present)" },
  { field: 'experience_responsibilities', question: "List 3-4 key achievements or responsibilities (separate with semicolons)" },
  { field: 'add_more_experience', question: "Would you like to add another position? (yes/no)" },
  
  // Education
  { field: 'add_education', question: "Would you like to add education details? (yes/no)" },
  { field: 'education_school', question: "What's your university/college name?" },
  { field: 'education_degree', question: "What degree did you receive?" },
  { field: 'education_date', question: "When did you graduate? (e.g., May 2022)" },
  { field: 'education_gpa', question: "What was your GPA? (Optional, press Enter to skip)" },
  
  // Skills
  { field: 'add_skills', question: "Would you like to add technical skills? (yes/no)" },
  { field: 'skills', question: "List your technical skills, separated by commas" },
  
  // Certifications
  { field: 'add_certifications', question: "Do you have any professional certifications? (yes/no)" },
  { field: 'certification_name', question: "What's the certification name?" },
  { field: 'certification_issuer', question: "Who issued this certification?" },
  { field: 'certification_date', question: "When did you receive it? (e.g., June 2023)" },
  { field: 'add_more_certifications', question: "Would you like to add another certification? (yes/no)" }
];

export const professionalFormat = (formData) => `
  // Your professional template HTML here
`; 