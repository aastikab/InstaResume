import React, { useState } from 'react';
import api from '../services/api';

const ContentSuggestions = ({ content, type }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSuggestions = async () => {
    setLoading(true);
    try {
      const response = await api.post('/api/suggestions', {
        content,
        type // 'resume' or 'coverLetter'
      });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error getting suggestions:', error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Improvement Suggestions</h3>
      
      <button
        onClick={getSuggestions}
        className="mb-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        disabled={loading}
      >
        {loading ? 'Getting Suggestions...' : 'Get Suggestions'}
      </button>

      {suggestions.length > 0 && (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 bg-blue-50 rounded border border-blue-100"
            >
              <h4 className="font-medium text-blue-800 mb-1">
                {suggestion.title}
              </h4>
              <p className="text-sm text-blue-600">
                {suggestion.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentSuggestions;