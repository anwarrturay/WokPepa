import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const AwardsSection = ({ formData, setFormData, setStep }) => {
  const [award, setAward] = useState({
    title: '',
    issuer: '',
    year: '',
  });

  const handleAddAward = () => {
    if (award.title.trim()) {
      setFormData((prev) => ({
        ...prev,
        awards: [...(prev.awards || []), award],
      }));
      setAward({ title: '', issuer: '', year: '' });
    }
  };

  const handleRemoveAward = (index) => {
    const updated = [...formData.awards];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      awards: updated,
    }));
  };

  return (
    <section className="flex flex-col items-center justify-center mt-5 w-full">
      <h1 className="text-lg font-bold mb-2">Awards (Optional)</h1>
      <p className="text-sm text-gray-600 mb-4">Add any notable awards or recognitions you've received</p>

      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Award Title"
          value={award.title}
          onChange={(e) => setAward({ ...award, title: e.target.value })}
          className="resume-field"
        />

        <input
          type="text"
          placeholder="Issuer (optional)"
          value={award.issuer}
          onChange={(e) => setAward({ ...award, issuer: e.target.value })}
          className="resume-field mt-2"
        />

        <input
          type="text"
          placeholder="Year (optional)"
          value={award.year}
          onChange={(e) => setAward({ ...award, year: e.target.value })}
          className="resume-field mt-2"
        />

        <button
          type="button"
          onClick={handleAddAward}
          className="next-btn mt-3"
        >
          <div className="flex items-center justify-center">
            <Plus size={20} className="mr-2" />
            Add Award
          </div>
        </button>

        {formData.awards && formData.awards.length > 0 && (
          <ul className="mt-4 space-y-2">
            {formData.awards.map((award, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>{award.title}{award.issuer && `, ${award.issuer}`}{award.year && ` - ${award.year}`}</span>
                <button
                  onClick={() => handleRemoveAward(idx)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex">
          <button
            type="button"
            className="back-btn"
            onClick={() => setStep(8)}
          >
            Back
          </button>
          <button
            type="button"
            className="m-2 next-btn"
            onClick={() => setStep(10)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
