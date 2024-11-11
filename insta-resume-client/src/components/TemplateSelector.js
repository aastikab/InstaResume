import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplatePreview from './TemplatePreview';

const TemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      name: 'Professional',
      description: 'Clean and modern template perfect for corporate jobs',
      type: 'professional',
      image: 'https://cdn3d.iconscout.com/3d/premium/thumb/business-document-5349862-4468977.png',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Creative',
      description: 'Stand out with this creative design for artistic roles',
      type: 'creative',
      image: 'https://cdn3d.iconscout.com/3d/premium/thumb/creative-document-5349866-4468981.png',
      color: 'purple'
    },
    {
      id: 3,
      name: 'Academic',
      description: 'Detailed template for academic and research positions',
      type: 'academic',
      image: 'https://cdn3d.iconscout.com/3d/premium/thumb/document-5349865-4468980.png',
      color: 'green'
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    navigate('/builder', { state: { template } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Template
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our professionally designed templates to create your standout resume
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplatePreview
              key={template.id}
              template={template}
              onSelect={handleTemplateSelect}
            />
          ))}
        </div>

        {/* Selected Template Info */}
        {selectedTemplate && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">
              Selected Template: {selectedTemplate.name}
            </h3>
            <p className="text-gray-600">
              Click continue to start building your resume with this template.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;