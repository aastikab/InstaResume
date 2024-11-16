const { OpenAI } = require('openai');
const { Document, Packer, Paragraph, TextRun } = require("docx");
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

    const prompt = `
      Create a professional resume using template ${templateId} with the following information:

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

      Please format this as a professional resume with the following requirements:
      1. Create a compelling professional summary that highlights key strengths
      2. Format work experience with bullet points highlighting achievements and responsibilities
      3. Use action verbs to begin experience bullet points
      4. Organize skills into relevant categories
      5. Use consistent formatting throughout
      6. Keep the language concise and impactful
      7. Include dates in a consistent format
      8. Separate sections clearly
    `;

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

    // Create a more professional document
    const doc = new Document({
      creator: "InstaResume",
      title: `${personalInfo.name} - Resume`,
      description: "Professional Resume",
      sections: [{
        properties: {},
        children: [
          // Header with name
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.name,
                bold: true,
                size: 32,
              }),
            ],
            spacing: {
              after: 200,
            },
          }),
          // Contact information
          new Paragraph({
            children: [
              new TextRun({
                text: `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.address}`,
                size: 20,
              }),
            ],
            spacing: {
              after: 400,
            },
          }),
          // Main content
          ...sections.map(section => 
            new Paragraph({
              children: [
                new TextRun({
                  text: section,
                  size: 24,
                }),
              ],
              spacing: {
                before: 200,
                after: 200,
              },
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