import React, { useState } from 'react';

const Hobbies = ({ formData, setFormData, setStep }) => {
  const [newHobby, setNewHobby] = useState('');

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, newHobby.trim()]
      });
      setNewHobby('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddHobby();
    }
  };

  const removeHobby = (indexToRemove) => {
    setFormData({
      ...formData,
      hobbies: formData.hobbies.filter((_, index) => index !== indexToRemove)
    });
  };

  return (
    <div className="space-y-6 font-Montserrat">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Hobbies & Interests</h2>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-grow">
              <label htmlFor="hobby-input" className="block text-sm font-medium text-gray-700">
                Add a Hobby or Interest
              </label>
              <input
                id="hobby-input"
                type="text"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                onKeyPress={handleKeyPress}
                className="resume-field"
                placeholder="e.g., Photography, Hiking, Reading"
              />
            </div>
            <button
              type="button"
              onClick={handleAddHobby}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2A5D9E] hover:bg-[#2A5D9E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 self-end"
            >
              Add
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Your Hobbies & Interests</h3>
            <div className="flex flex-wrap gap-2">
              {formData.hobbies.map((hobby, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {hobby}
                  <button
                    type="button"
                    onClick={() => removeHobby(index)}
                    className="ml-2 inline-flex text-blue-400 hover:text-blue-600 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              ))}
              {formData.hobbies.length === 0 && (
                <p className="text-sm text-gray-500">No hobbies added yet. Start adding your interests above.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hobbies;
