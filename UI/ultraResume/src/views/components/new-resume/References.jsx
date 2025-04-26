import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const References = ({ formData, setFormData, setStep }) => {
  const [reference, setReference] = useState({
    name: '',
    relationship: '',
    contact: '',
  });

  const handleAddReference = () => {
    if (reference.name.trim() && reference.contact.trim()) {
      setFormData((prev) => ({
        ...prev,
        references: [...(prev.references || []), reference],
      }));
      setReference({ name: '', relationship: '', contact: '' });
    }
  };

  const handleRemoveReference = (index) => {
    const updated = [...formData.references];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      references: updated,
    }));
  };

  return (
    <section className="flex flex-col items-center justify-center mt-5 w-full">
      <h1 className="text-lg font-bold mb-2">References (Optional)</h1>
      <p className="text-sm text-gray-600 mb-4">Add references for professional recommendations</p>

      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Reference Name"
          value={reference.name}
          onChange={(e) => setReference({ ...reference, name: e.target.value })}
          className="resume-field"
        />

        <input
          type="text"
          placeholder="Relationship (optional)"
          value={reference.relationship}
          onChange={(e) => setReference({ ...reference, relationship: e.target.value })}
          className="resume-field mt-2"
        />

        <input
          type="text"
          placeholder="Contact (email/phone)"
          value={reference.contact}
          onChange={(e) => setReference({ ...reference, contact: e.target.value })}
          className="resume-field mt-2"
        />

        <button
          type="button"
          onClick={handleAddReference}
          className="next-btn mt-3"
        >
          <div className="flex items-center justify-center">
            <Plus size={20} className="mr-2" />
            Add Reference
          </div>
        </button>

        {formData.references && formData.references.length > 0 && (
          <ul className="mt-4 space-y-2">
            {formData.references.map((ref, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>
                  {ref.name} - {ref.relationship && `(${ref.relationship})`} <br />
                  Contact: {ref.contact}
                </span>
                <button
                  onClick={() => handleRemoveReference(idx)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col mt-4">
          <button
            type="button"
            className="back-btn"
            onClick={() => setStep(9)}
          >
            Back
          </button>
          <button
            type="button"
            className="m-2 next-btn"
            onClick={() => setStep(11)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default References;