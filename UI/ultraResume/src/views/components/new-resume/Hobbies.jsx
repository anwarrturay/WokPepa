import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const Hobbies = ({ formData, setFormData, setStep }) => {
  const [hobby, setHobby] = useState('');

  const handleAddHobby = () => {
    if (hobby.trim()) {
      setFormData((prev) => ({
        ...prev,
        hobbies: [...(prev.hobbies || []), hobby],
      }));
      setHobby('');
    }
  };

  const handleRemoveHobby = (index) => {
    const updatedHobbies = [...formData.hobbies];
    updatedHobbies.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      hobbies: updatedHobbies,
    }));
  };

  return (
    <section className="flex flex-col items-center justify-center mt-5 w-full">
      <h1 className="text-lg font-bold mb-2">Hobbies (Optional)</h1>
      <p className="text-sm text-gray-600 mb-4">List any hobbies or activities you enjoy outside of work</p>

      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter Hobby"
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
          className="resume-field"
        />

        <button
          type="button"
          onClick={handleAddHobby}
          className="next-btn mt-3"
        >
          <div className="flex items-center justify-center">
            <Plus size={20} className="mr-2" />
            Add Hobby
          </div>
        </button>

        {formData.hobbies && formData.hobbies.length > 0 && (
          <ul className="mt-4 space-y-2">
            {formData.hobbies.map((hobby, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>{hobby}</span>
                <button
                  onClick={() => handleRemoveHobby(idx)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex mt-4">
          <button
            type="button"
            className="back-btn"
            onClick={() => setStep(11)}
          >
            Back
          </button>
          <button
            type="button"
            className="m-2 next-btn"
            onClick={() => setStep(12)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
