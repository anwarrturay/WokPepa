import React, { useState } from 'react';
import { Plus } from "lucide-react";

const Certifications = ({ formData, setFormData, setStep }) => {
  const [certification, setCertification] = useState({
    name: "",
    issuingOrganization: "",
    issueDate: "",
    expirationDate: ""
  });

  const handleChange = (field, value) => {
    setCertification((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddCertification = () => {
    const { name, issuingOrganization, issueDate, expirationDate } = certification;
    if (name && issuingOrganization && issueDate && expirationDate) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, certification],
      }));
      setCertification({ name: "", issuingOrganization: "", issueDate: "", expirationDate: "" });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center mt-5">
      <h1 className="text-lg font-bold mb-4">Certifications</h1>
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center w-full max-w-md">
        <input
          type="text"
          name="name"
          value={certification.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Certification Title (e.g., Teacher)"
          className="resume-field"
        />
        <input
          type="text"
          name="issuingOrganization"
          value={certification.issuingOrganization}
          onChange={(e) => handleChange("issuingOrganization", e.target.value)}
          placeholder="Issuing Organization (e.g., Meta)"
          className="resume-field"
        />
        <div className="flex flex-col">
          <label htmlFor='issueDate' className="text-left text-sm text-gray-600 m-2">Issue Date</label>
          <input
            type="date"
            name="issueDate"
            value={certification.issueDate}
            onChange={(e) => handleChange("issueDate", e.target.value)}
            className="resume-field"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="expirationDate" className="text-sm text-left m-2 text-gray-600">Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            value={certification.expirationDate}
            onChange={(e) => handleChange("expirationDate", e.target.value)}
            className="resume-field"
          />
        </div>
        <button
          type="button"
          className="next-btn m-2"
          onClick={handleAddCertification}
        >
          <div className="flex items-center justify-center">
            <Plus size={24}  className='m-2'/>
            Add Certification
          </div>
        </button>

        {formData.certifications.length > 0 && (
          <div className="mt-4 w-full text-sm text-left">
            <h2 className="font-semibold mx-3">Your Certifications:</h2>
            <ul className="space-y-1 mx-3">
              {formData.certifications.map((cert, idx) => (
                <li key={idx} className="bg-gray-100 p-2 rounded">
                  <strong>{cert.name}</strong> – {cert.issuingOrganization} ({cert.issueDate} to {cert.expirationDate})
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex mt-3">
          <button 
            type="button" 
            className="back-btn" 
            onClick={() => setStep(6)}
          >Back</button>
          <button 
            type="button" 
            className="m-2 bg-[#2A5D9E] text-white px-32 py-2 rounded-md" 
            onClick={() => setStep(8)}
          >Next</button>
        </div>
      </form>
    </section>
  );
};

export default Certifications;
