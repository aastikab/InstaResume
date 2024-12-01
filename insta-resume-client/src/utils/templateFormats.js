// Professional Resume Format
export const professionalResumeFormat = (formData) => `
  <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="margin: 0; font-size: 28px; text-transform: uppercase;">${formData.personalInfo.name || 'YOUR NAME'}</h1>
      <p style="color: #666; margin: 10px 0;">
        ${formData.personalInfo.title || 'Professional Title'} | ${formData.personalInfo.location || 'Location'}
      </p>
      <p style="margin: 5px 0;">
        ${formData.personalInfo.email || 'Email'} | ${formData.personalInfo.phone || 'Phone'}
      </p>
    </div>
    
    <!-- Professional Resume Sections -->
    ${formData.personalInfo.summary ? `
      <div style="margin-bottom: 20px;">
        <h2 style="border-bottom: 2px solid #000; padding-bottom: 5px;">SUMMARY</h2>
        <p>${formData.personalInfo.summary}</p>
      </div>
    ` : ''}

    <!-- Rest of professional sections -->
  </div>
`;

// Modern Resume Format
export const modernResumeFormat = (formData) => `
  <div style="font-family: 'Helvetica', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
      <div>
        <h1 style="margin: 0; font-size: 32px; color: #6366f1;">${formData.personalInfo.name || 'YOUR NAME'}</h1>
        <p style="color: #4a5568; margin: 5px 0;">${formData.personalInfo.title || 'Professional Title'}</p>
      </div>
      <div style="text-align: right;">
        <p style="margin: 5px 0;">${formData.personalInfo.email || 'Email'}</p>
        <p style="margin: 5px 0;">${formData.personalInfo.phone || 'Phone'}</p>
        <p style="margin: 5px 0;">${formData.personalInfo.location || 'Location'}</p>
      </div>
    </div>
    
    <!-- Modern Resume Sections -->
    ${formData.personalInfo.summary ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 5px;">About Me</h2>
        <p style="color: #4a5568;">${formData.personalInfo.summary}</p>
      </div>
    ` : ''}

    <!-- Rest of modern sections -->
  </div>
`;

// Cover Letter Format
export const coverLetterFormat = (formData) => `
  <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px;">
    <div style="text-align: right; margin-bottom: 40px;">
      <p style="margin: 5px 0;">${formData.personalInfo.name || 'YOUR NAME'}</p>
      <p style="margin: 5px 0;">${formData.personalInfo.email || 'Email'}</p>
      <p style="margin: 5px 0;">${formData.personalInfo.phone || 'Phone'}</p>
      <p style="margin: 5px 0;">${formData.personalInfo.location || 'Location'}</p>
    </div>

    <div style="margin-bottom: 30px;">
      <p>${new Date().toLocaleDateString()}</p>
    </div>

    <div style="margin-bottom: 30px;">
      <p>Dear Hiring Manager,</p>
    </div>

    ${formData.personalInfo.summary ? `
      <div style="margin-bottom: 30px; line-height: 1.6;">
        <p>${formData.personalInfo.summary}</p>
      </div>
    ` : ''}

    <div style="margin-top: 30px;">
      <p>Sincerely,</p>
      <p style="margin-top: 20px;">${formData.personalInfo.name || 'YOUR NAME'}</p>
    </div>
  </div>
`; 