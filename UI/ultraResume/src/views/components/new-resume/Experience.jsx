
const Experience = ({ formData, setFormData}) => {
  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData({ ...formData, experience: updatedExperience });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { jobTitle: "", company: "", responsibilities: "", startDate: "", endDate: "" },
      ],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
  };

  return (
    <div className="space-y-6 font-Montserrat">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
        {formData && (
          <div className="space-y-8">
            {formData.experience.map((exp, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
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
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) => handleExperienceChange(index, "jobTitle", e.target.value)}
                      className="mt-1 block w-full outline-none rounded-md border border-[#ccc] focus:ring-blue-500 sm:text-sm py-2 px-1"
                      placeholder="e.g., Software Engineer, Project Manager"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                      className="mt-1 block w-full outline-none rounded-md border border-[#ccc] focus:ring-blue-500 sm:text-sm py-2 px-1"
                      placeholder="e.g., Google, Microsoft"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                      className="mt-1 block w-full outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                      className="mt-1 block w-full outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Responsibilities & Achievements
                    </label>
                    <textarea
                      value={exp.responsibilities}
                      onChange={(e) => handleExperienceChange(index, "responsibilities", e.target.value)}
                      rows={3}
                      className="mt-1 block w-full outline-none rounded-md border border-[#ccc] focus:ring-blue-500 sm:text-sm py-2 px-1"
                      placeholder="Describe your key responsibilities and achievements"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3">
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2A5D9E] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
