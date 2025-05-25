import React from 'react';

const References = ({ formData, setFormData, setStep }) => {
  const handleReferenceChange = (index, field, value) => {
    const updatedReferences = [...formData.references];
    updatedReferences[index][field] = value;
    setFormData({ ...formData, references: updatedReferences });
  };

  const addReference = () => {
    setFormData({
      ...formData,
      references: [
        ...formData.references,
        { name: "", position: "", contact: "" },
      ],
    });
  };

  const removeReference = (index) => {
    const updatedReferences = formData.references.filter((_, i) => i !== index);
    setFormData({ ...formData, references: updatedReferences });
  };

  return (
    <div className="space-y-6 font-Montserrat">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">References</h2>
        <div className="space-y-8">
          {formData.references.map((reference, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeReference(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={reference.name}
                    onChange={(e) => handleReferenceChange(index, "name", e.target.value)}
                    className="resume-field"
                    placeholder="e.g., John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Position/Title
                  </label>
                  <input
                    type="text"
                    value={reference.position}
                    onChange={(e) => handleReferenceChange(index, "position", e.target.value)}
                    className="resume-field"
                    placeholder="e.g., Senior Manager"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Information
                  </label>
                  <input
                    type="text"
                    value={reference.contact}
                    onChange={(e) => handleReferenceChange(index, "contact", e.target.value)}
                    className="resume-field"
                    placeholder="Email or Phone Number"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={addReference}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2A5D9E] hover:bg-[#2A5D9E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Reference
          </button>
        </div>
      </div>
    </div>
  );
};

export default References;