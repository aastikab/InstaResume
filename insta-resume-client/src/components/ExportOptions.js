import React, { useState } from 'react';
import api from '../services/api';

const ExportOptions = ({ documentId, type }) => {
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const handleDownload = async (format) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/${type}/${documentId}/download`, {
        params: { format },
        responseType: 'blob'
      });

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}-${documentId}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading document:', error);
    }
    setLoading(false);
  };

  const handleShare = async () => {
    try {
      const response = await api.post(`/api/${type}/${documentId}/share`);
      setShareUrl(response.data.shareUrl);
      setShowShareModal(true);
    } catch (error) {
      console.error('Error sharing document:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Export Options</h3>
      
      <div className="space-y-3">
        <button
          onClick={() => handleDownload('pdf')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          Download as PDF
        </button>
        
        <button
          onClick={() => handleDownload('docx')}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          disabled={loading}
        >
          Download as Word
        </button>
        
        <button
          onClick={handleShare}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
        >
          Share Link
        </button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h4 className="text-lg font-semibold mb-4">Share Document</h4>
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportOptions;