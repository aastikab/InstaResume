const { OpenAI } = require('openai');
const { Document, Packer, Paragraph, TextRun, AlignmentType } = require("docx");
const fs = require("fs");
const path = require("path");

// Set up OpenAI configuration
require("dotenv").config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const Resume = require('../models/Resume');

const createResume = async (req, res) => {
  try {
    const { personalInfo, experience, education, skills, templateId } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Template-specific prompts
    const getPrompt = (templateId) => {
      const basePrompt = `
        Personal Information:
        Name: ${personalInfo.name}
        Email: ${personalInfo.email}
        Phone: ${personalInfo.phone}
        Address: ${personalInfo.address}
        
        Professional Summary:
        ${personalInfo.summary}

        Work Experience:
        ${experience.join('\n')}

        Education:
        ${education.join('\n')}

        Technical Skills:
        ${skills.join(', ')}
      `;

      switch(templateId) {
        case '1':
          return `Create a professional, corporate-style resume with the following information:
            ${basePrompt}
            Format this as a traditional business resume with:
            1. Clear section headers in a professional font
            2. Emphasis on business achievements and metrics
            3. Traditional formatting suitable for corporate environments
            4. Professional language and tone throughout`;
        
        case '2':
          return `Create a creative, modern resume with the following information:
            ${basePrompt}
            Format this as a creative resume with:
            1. Modern, eye-catching section headers
            2. Emphasis on creative achievements and innovative solutions
            3. Dynamic formatting that stands out
            4. Engaging language that shows personality while maintaining professionalism`;
        
        default:
          return `Create a standard resume with the following information:
            ${basePrompt}`;
      }
    };

    const prompt = getPrompt(templateId);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are an expert resume writer who creates professional, ATS-friendly resumes. Format the content with clear section breaks using '###' between sections and use '-' for bullet points." 
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const generatedResume = response.choices[0].message?.content?.trim() || "No response content";
    const sections = generatedResume.split('###').map(section => section.trim());

    // Template-specific document styling
    const getDocumentStyle = (templateId) => {
      switch(templateId) {
        case '1':
          return {
            headerSize: 32,
            subHeaderSize: 28,
            textSize: 24,
            headerColor: '000000',
            accentColor: '2563eb'
          };
        case '2':
          return {
            headerSize: 36,
            subHeaderSize: 30,
            textSize: 24,
            headerColor: '4F46E5',
            accentColor: '6366F1'
          };
        default:
          return {
            headerSize: 32,
            subHeaderSize: 28,
            textSize: 24,
            headerColor: '000000',
            accentColor: '2563eb'
          };
      }
    };

    const style = getDocumentStyle(templateId);

    // Update document creation with template-specific styling
    const doc = new Document({
      creator: "InstaResume",
      title: `${personalInfo.name} - Resume`,
      description: "Professional Resume",
      sections: [{
        properties: {},
        children: [
          // Name at the top, centered
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: personalInfo.name,
                bold: true,
                size: style.headerSize,
                color: style.headerColor
              }),
            ],
          }),

          // Contact information, centered
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 200,
            },
            children: [
              new TextRun({
                text: personalInfo.phone,
                size: style.textSize,
                color: style.headerColor
              }),
              new TextRun({
                text: " | ",
                size: style.textSize,
                color: style.headerColor
              }),
              new TextRun({
                text: personalInfo.email,
                size: style.textSize,
                color: style.headerColor
              }),
            ],
          }),

          // Address, centered
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 400,
            },
            children: [
              new TextRun({
                text: personalInfo.address,
                size: style.textSize,
                color: style.headerColor
              }),
            ],
          }),

          // Education Section Header
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "EDUCATION",
                bold: true,
                size: style.subHeaderSize,
                color: style.headerColor
              }),
            ],
          }),

          // Education content
          ...education.map(edu => 
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { before: 100, after: 100 },
              children: [
                new TextRun({
                  text: edu,
                  size: style.textSize,
                  color: style.headerColor
                }),
              ],
            })
          ),

          // Skills Section Header
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "SKILLS",
                bold: true,
                size: style.subHeaderSize,
                color: style.headerColor
              }),
            ],
          }),

          // Skills content
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 100, after: 100 },
            children: [
              new TextRun({
                text: skills.join(", "),
                size: style.textSize,
                color: style.headerColor
              }),
            ],
          }),

          // Experience Section Header
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "EXPERIENCE",
                bold: true,
                size: style.subHeaderSize,
                color: style.headerColor
              }),
            ],
          }),

          // Experience content
          ...experience.map(exp => 
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { before: 100, after: 100 },
              children: [
                new TextRun({
                  text: exp,
                  size: style.textSize,
                  color: style.headerColor
                }),
              ],
            })
          ),
        ],
      }],
    });

    // Update the file path to be relative to the project root
    const fileName = `${personalInfo.name.replace(/\s+/g, '-')}-Resume.docx`;
    const filePath = path.join(__dirname, '..', 'uploads', 'resumes', fileName);

    // Ensure the uploads/resumes directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the document
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(filePath, buffer);

    // Save resume to database with templateId and correct file path
    const resume = await Resume.create({
      fileName,
      filePath,
      user: req.user._id,
      templateId,
      personalInfo,
      experience,
      education,
      skills
    });

    res.status(200).json({ 
      message: "Resume created successfully",
      resumeId: resume._id,
      fileName
    });

  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ 
      message: 'Error creating resume',
      error: error.message 
    });
  }
};

const getResumes = async (req, res) => {
  try {
    console.log('Fetching resumes for user:', req.user._id);
    const resumes = await Resume.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    console.log('Found resumes:', resumes);
    res.json(resumes);
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ message: 'Error fetching resumes' });
  }
};

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ message: 'Error fetching resume' });
  }
};

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ message: 'Error updating resume' });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Error deleting resume' });
  }
};

const downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    const filePath = resume.filePath;
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Resume file not found' });
    }

    // Set the appropriate headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.fileName}"`);

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Download resume error:', error);
    res.status(500).json({ message: 'Error downloading resume' });
  }
};

module.exports = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  downloadResume
}; 