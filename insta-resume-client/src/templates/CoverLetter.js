export const coverLetterQuestions = [
  // Header Information (Your Details)
  { field: 'name', question: "What's your full name?" },
  { field: 'location', question: "What's your complete address (Street, City, State, ZIP)?" },
  { field: 'email', question: "What's your email address?" },
  { field: 'phone', question: "What's your phone number?" },
  { field: 'date', question: "Enter today's date (e.g., February 15, 2024):" },

  // Recipient's Information
  { field: 'hiring_manager', question: "Who should this letter be addressed to? (Enter name/title, or press Enter for 'Hiring Manager')" },
  { field: 'company_name', question: "What's the company name?" },
  { field: 'company_address', question: "What's the company's address? (Street, City, State, ZIP)" },
  
  // Position Details
  { field: 'position_title', question: "What position are you applying for?" },
  { field: 'job_source', question: "Where did you find this job posting? (e.g., LinkedIn, company website)" },
  
  // Your Background
  { field: 'current_role', question: "What is your current role/status? (e.g., Software Engineer, Recent Graduate)" },
  { field: 'key_skills', question: "List your top 2-3 relevant skills (separate with commas)" },
  
  // Company Interest & Qualifications
  { field: 'why_company', question: "Why are you interested in this company specifically?" },
  { field: 'achievement', question: "Share a specific achievement that makes you a great fit" },
  { field: 'alignment', question: "How do your values/goals align with the company's mission?" },
  
  // Completion
  { field: 'closing', question: "Great! Your cover letter is ready to download" }
];

export const coverLetterFormat = (formData) => `
  <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6;">
    <!-- Header -->
    <div style="text-align: left; margin-bottom: 40px;">
      <p style="margin: 5px 0; font-weight: bold;">${formData.name || '[Your Name]'}</p>
      <p style="margin: 5px 0;">${formData.location || '[Your Address]'}</p>
      <p style="margin: 5px 0;">${formData.email || '[Your Email]'}</p>
      <p style="margin: 5px 0;">${formData.phone || '[Your Phone]'}</p>
    </div>

    <div style="margin-bottom: 30px;">
      <p>${formData.date || '[Date]'}</p>
    </div>

    <!-- Recipient -->
    <div style="margin-bottom: 30px;">
      <p>${formData.hiring_manager || '[Hiring Manager Name/Title]'}</p>
      <p>${formData.company_name || '[Company Name]'}</p>
      <p>${formData.company_address || '[Company Address]'}</p>
    </div>

    <!-- Salutation -->
    <div style="margin-bottom: 20px;">
      <p>Dear ${formData.hiring_manager || 'Hiring Manager'},</p>
    </div>

    <!-- Opening Paragraph -->
    <div style="margin-bottom: 20px;">
      <p>I am writing to express my strong interest in the ${formData.position_title || '[Position]'} position at ${formData.company_name || '[Company Name]'}, as advertised on ${formData.job_source || '[Job Source]'}. As a ${formData.current_role || '[Current Role]'}, I have developed expertise in ${formData.key_skills || '[Key Skills]'}, which aligns perfectly with this role.</p>
    </div>

    <!-- Body Paragraphs -->
    <div style="margin-bottom: 20px;">
      <p>${formData.achievement || '[Your relevant achievement/experience]'}</p>
    </div>

    <div style="margin-bottom: 20px;">
      <p>I am particularly drawn to ${formData.why_company || '[Company aspects that interest you]'}. ${formData.alignment || '[How your values align with company]'}</p>
    </div>

    <!-- Specific Requirements -->
    ${formData.specific_requirements ? `
      <div style="margin-bottom: 20px;">
        <p>${formData.specific_requirements}</p>
      </div>
    ` : ''}

    <!-- Closing -->
    <div style="margin-bottom: 20px;">
      <p>${formData.closing || 'I would welcome the opportunity to discuss how my background and skills would benefit your organization. Thank you for considering my application.'}</p>
    </div>

    <!-- Signature -->
    <div style="margin-top: 40px;">
      <p>Sincerely,</p>
      <p style="margin-top: 20px; font-weight: bold;">${formData.name || '[Your Name]'}</p>
    </div>
  </div>
`; 