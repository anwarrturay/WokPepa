import React, { useState } from 'react';
import { skillsList } from "../../../utils/Countries";

const Skills = ({ formData, setFormData, setStep }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const removeSkill = (indexToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, index) => index !== indexToRemove)
    });
  };

  return (
    <div className="space-y-6 font-Montserrat">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-grow">
              <label htmlFor="skill-input" className="block text-sm font-medium text-gray-700">
                Add a Skill
              </label>
              <input
                id="skill-input"
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                className="mt-1 block w-full outline-none border rounded-md border-[#ccc] focus:border-[#2A5D9E] focus:ring-blue-500 sm:text-sm py-2 px-1"
                placeholder="Enter a skill (e.g., JavaScript, Project Management)"
              />
            </div>
            <button
              type="button"
              onClick={handleAddSkill}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2A5D9E] hover:bg-[#2A5D9E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 self-end"
            >
              Add
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Your Skills</h3>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="ml-2 inline-flex text-blue-400 hover:text-blue-600 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              ))}
              {formData.skills.length === 0 && (
                <p className="text-sm text-gray-500">No skills added yet. Start adding your skills above.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;