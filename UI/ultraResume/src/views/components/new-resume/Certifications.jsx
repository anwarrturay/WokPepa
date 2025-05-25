import React from 'react';

const Certifications = ({ formData, setFormData, setStep }) => {
  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index][field] = value;
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        { name: "", issuingOrganization: "", issueDate: "", expirationDate: "" },
      ],
    });
  };

  const removeCertification = (index) => {
    const updatedCertifications = formData.certifications.filter((_, i) => i !== index);
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  return (
    <div className="space-y-6 font-Montserrat">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h2>
        <div className="space-y-8">
          {formData.certifications.map((cert, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
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
                    Certification Name
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                    className="resume-field"
                    placeholder="e.g., AWS Solutions Architect, PMP Certification"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={cert.issuingOrganization}
                    onChange={(e) => handleCertificationChange(index, "issuingOrganization", e.target.value)}
                    className="resume-field"
                    placeholder="e.g., Amazon Web Services, PMI"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={cert.issueDate}
                    onChange={(e) => handleCertificationChange(index, "issueDate", e.target.value)}
                    className="mt-1 block w-full outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    value={cert.expirationDate}
                    onChange={(e) => handleCertificationChange(index, "expirationDate", e.target.value)}
                    className="mt-1 block w-full outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={addCertification}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2A5D9E] hover:bg-[#2A5D9E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Certification
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
