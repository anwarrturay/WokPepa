import React from 'react';
import { Plus, X } from 'lucide-react';

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
                  <X size={20} strokeWidth={3} className='mr-2'/>
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
            <Plus size={20} strokeWidth={3} className='mr-2'/>
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
