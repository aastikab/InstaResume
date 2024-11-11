import React from 'react';

const TemplatePreview = ({ template, onSelect }) => {
  const getGradientClass = (color) => {
    switch (color) {
      case 'blue':
        return 'from-blue-500 to-blue-600';
      case 'purple':
        return 'from-purple-500 to-purple-600';
      case 'green':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className={`bg-gradient-to-br ${getGradientClass(template.color)} p-8`}>
        <div className="illustration-3d">
          <img
            src={template.image}
            alt={template.name}
            className="w-full h-48 object-contain transform transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>
      
      <div className="bg-white p-6">
        <h3 className="text-xl font-bold mb-2">{template.name}</h3>
        <p className="text-gray-600 mb-4">{template.description}</p>
        
        <button
          onClick={() => onSelect(template)}
          className={`w-full bg-gradient-to-r ${getGradientClass(template.color)} 
            text-white py-2 px-4 rounded hover:opacity-90 transition-opacity duration-200`}
        >
          Select Template
        </button>
      </div>
    </div>
  );
};

export default TemplatePreview;