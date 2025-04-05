import React, { useState } from 'react';
import { languageOptions, proficiencyLevels } from './LanguagesOptions';
import { Plus } from 'lucide-react';

const Languages = ({ formData, setFormData, setStep }) => {
  const [language, setLanguage] = useState({ name: '', level: '' });

  const handleAddLanguage = () => {
    if (language.name && language.level) {
      setFormData(prev => ({
        ...prev,
        languages: [...(prev.languages || []), language],
      }));
      setLanguage({ name: '', level: '' });
    }
  };

  const handleRemoveLanguage = (languageToRemove) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang !== languageToRemove),
    }));
  };

  return (
    <section className="flex flex-col items-center justify-center mt-5">
      <h1 className="text-lg font-bold mb-4">Languages</h1>

      <div className="flex flex-col items-center w-full max-w-md">
        <select
          value={language.name}
          onChange={(e) => setLanguage({ ...language, name: e.target.value })}
          className="resume-field"
        >
          <option value="">Select Language</option>
          {languageOptions.map((lang, idx) => (
            <option key={idx} value={lang}>{lang}</option>
          ))}
        </select>

        <select
          value={language.level}
          onChange={(e) => setLanguage({ ...language, level: e.target.value })}
          className="resume-field mt-2"
        >
          <option value="">Select Proficiency Level</option>
          {proficiencyLevels.map((level, idx) => (
            <option key={idx} value={level}>{level}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleAddLanguage}
          className="next-btn m-2"
        >
          <div className="flex items-center justify-center">
            <Plus size={24} className="m-2" />
            Add Language
          </div>
        </button>

        {formData.languages && formData.languages.length > 0 && (
          <ul className="mt-4 w-full text-left space-y-2">
            {formData.languages.map((lang, idx) => (
              <li key={idx} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                <span className='flex'>
                  <p className="text-md font-semibold">{lang.name}</p> - {lang.level}
                </span>
                <button
                  type="button"
                  className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded"
                  onClick={() => handleRemoveLanguage(lang)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex mt-3">
          <button
            type="button"
            className="back-btn"
            onClick={() => setStep(7)}
          >
            Back
          </button>
          <button
            type="button"
            className="m-2 next-btn"
            onClick={() => setStep(9)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Languages;
