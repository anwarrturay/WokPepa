import React from 'react';
import { Plus } from 'lucide-react';

const Projects = ({ formData, setFormData, setStep }) => {
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: "", description: "", tools: "" },
      ],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  return (
    <div className="space-y-6 font-Montserrat">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
        <div className="space-y-8">
          {formData.projects.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
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
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                    className="resume-field"
                    placeholder="e.g., E-commerce Website, Mobile App"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                    rows={3}
                    className="resume-field"
                    placeholder="Describe the project, its goals, and your role"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tools & Technologies
                  </label>
                  <input
                    type="text"
                    value={project.tools}
                    onChange={(e) => handleProjectChange(index, "tools", e.target.value)}
                    className="resume-field"
                    placeholder="e.g., React, Node.js, AWS"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2A5D9E] hover:bg-[#2A5D9E]focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
