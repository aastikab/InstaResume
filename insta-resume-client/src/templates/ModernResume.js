export const modernQuestions = [
  // Personal Information with creative focus
  { field: 'name', question: "What's your name? Let's make it stand out!" },
  { field: 'title', question: "What's your creative title? (e.g., UI/UX Designer, Creative Director)" },
  { field: 'email', question: "What's your email address?" },
  { field: 'phone', question: "What's your phone number?" },
  { field: 'location', question: "Where are you based?" },
  
  // Portfolio & Social
  { field: 'add_portfolio', question: "Would you like to showcase your portfolio? (yes/no)" },
  { field: 'portfolio_url', question: "What's your portfolio website URL?" },
  { field: 'social_media', question: "Add your professional social media handles (separate with commas)" },
  
  // Creative Summary
  { field: 'add_summary', question: "Let's write a creative bio! Ready? (yes/no)" },
  { field: 'summary', question: "Tell your story in a few sentences. What makes you unique?" },
  
  // Projects
  { field: 'add_projects', question: "Would you like to showcase your projects? (yes/no)" },
  { field: 'project_title', question: "What's the project name?" },
  { field: 'project_description', question: "Describe this project's impact and your role" },
  { field: 'project_url', question: "Add a link to view this project (optional)" },
  { field: 'add_more_projects', question: "Want to add another project? (yes/no)" },
  
  // Skills with creative focus
  { field: 'add_skills', question: "Let's highlight your creative toolkit! Ready? (yes/no)" },
  { field: 'design_skills', question: "List your design skills (e.g., Figma, Photoshop)" },
  { field: 'technical_skills', question: "Any technical skills to add? (e.g., HTML, CSS)" },
  
  // Awards & Recognition
  { field: 'add_awards', question: "Have you won any awards or recognition? (yes/no)" },
  { field: 'award_title', question: "What's the award/recognition?" },
  { field: 'award_date', question: "When did you receive it?" }
]; 

export const modernFormat = (formData) => `
  <div style="font-family: 'Helvetica', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px;">
      <div>
        <h1 style="margin: 0; font-size: 36px; color: #6366f1;">${formData.personalInfo.name || 'YOUR NAME'}</h1>
        <p style="color: #4a5568; margin: 10px 0; font-size: 20px;">${formData.personalInfo.title || 'Professional Title'}</p>
      </div>
      <div style="text-align: right;">
        <p style="margin: 5px 0;">${formData.personalInfo.email || 'Email'}</p>
        <p style="margin: 5px 0;">${formData.personalInfo.phone || 'Phone'}</p>
        <p style="margin: 5px 0;">${formData.personalInfo.location || 'Location'}</p>
      </div>
    </div>

    ${formData.personalInfo.summary ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #6366f1; font-size: 24px; margin-bottom: 15px;">About Me</h2>
        <p style="color: #4a5568; line-height: 1.6;">${formData.personalInfo.summary}</p>
      </div>
    ` : ''}

    ${formData.projects?.length > 0 ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #6366f1; font-size: 24px; margin-bottom: 15px;">Featured Projects</h2>
        ${formData.projects.map(project => `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #1a1a1a; margin-bottom: 10px;">${project.title}</h3>
            <p style="color: #4a5568; margin-bottom: 10px;">${project.description}</p>
            ${project.url ? `<a href="${project.url}" style="color: #6366f1; text-decoration: none;">View Project →</a>` : ''}
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${formData.skills?.length > 0 ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #6366f1; font-size: 24px; margin-bottom: 15px;">Skills</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${formData.skills.map(skill => `
            <span style="background: rgba(99, 102, 241, 0.1); color: #6366f1; padding: 5px 15px; border-radius: 20px; font-size: 14px;">${skill}</span>
          `).join('')}
        </div>
      </div>
    ` : ''}
  </div>
`; 