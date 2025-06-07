import React from 'react';

const Summary = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6 font-Montserrat">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Summary</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Write a brief summary of your professional background and career goals
          </label>
          <textarea
            value={formData.summary}
            onChange={(e) => handleChange("summary", null, e.target.value)}
            rows={4}
            className="resume-field"
            placeholder="Highlight your key achievements, skills, and career objectives"
          />
        </div>
      </div>
    </div>
  );
};

export default Summary;
