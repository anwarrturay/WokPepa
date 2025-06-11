const Education = ({ formData, setFormData, resume }) => {
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { level: "", school: "", degree: "", startDate: "", endDate: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
  };

  return (
    <div className="space-y-6 font-Montserrat">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
        {formData && (
          <div className="space-y-8">
            {formData.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
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
                      Education Level
                    </label>
                    <select
                      value={edu.level}
                      onChange={(e) => handleEducationChange(index, "level", e.target.value)}
                      className="resume-field"
                    >
                      <option value="">Select Education Level</option>
                      <option value="High School">High School</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Associate Degree">Associate Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      School/Institution
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                      className="resume-field"
                      placeholder="University or Institution Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Degree/Field of Study
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                      className="resume-field"
                      placeholder="e.g., Computer Science, Business Administration"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                      className="mt-1 block w-full outline-none rounded-md border-gray-300  focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                      className="mt-1 block w-full outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2A5D9E] hover:bg-[#2A5D9E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A5D9E]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Education
          </button>
        </div>
      </div>
    </div>
  );
};

export default Education;
