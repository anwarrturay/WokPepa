import React, { useState } from 'react';

const Languages = ({ formData, setFormData, setStep }) => {
  const [newLanguage, setNewLanguage] = useState('');
  const [proficiency, setProficiency] = useState('Beginner');

  const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Native/Fluent'];

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setFormData({
        ...formData,
        languages: [...formData.languages, { name: newLanguage.trim(), level: proficiency }]
      });
      setNewLanguage('');
      setProficiency('Beginner');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLanguage();
    }
  };

  const removeLanguage = (indexToRemove) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_, index) => index !== indexToRemove)
    });
  };

  return (
    <div className="space-y-6 font-Montserrat">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Languages</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="language-input" className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <input
                id="language-input"
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="resume-field"
                placeholder="Enter a language (e.g., English, Spanish)"
              />
            </div>

            <div>
              <label htmlFor="proficiency-select" className="block text-sm font-medium text-gray-700">
                Proficiency Level
              </label>
              <select
                id="proficiency-select"
                value={proficiency}
                onChange={(e) => setProficiency(e.target.value)}
                className="resume-field"
              >
                {proficiencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddLanguage}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2A5D9E] hover:bg-[#2A5D9E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Language
            </button>
          </div>

          {formData.languages.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Your Languages</h3>
              <div className="space-y-2">
                {formData.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900">{lang.name}</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {lang.level}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="text-gray-400 hover:text-red-500 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData.languages.length === 0 && (
            <p className="text-sm text-gray-500 text-center bg-gray-50 rounded-lg p-4">
              No languages added yet. Start adding your language proficiencies above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Languages;
