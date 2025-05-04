import { Plus } from 'lucide-react';
import React, { useState } from 'react';

const Projects = ({ formData, setFormData, setStep }) => {
  const { projects = [] } = formData;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tools, setTools] = useState('');

  const handleSubmitProject = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim() && tools.trim()) {
      addProject(title, description, tools);
      setTitle('');
      setDescription('');
      setTools('');
    } else {
      alert('Please fill out all fields before adding a project.');
    }
  };

  const addProject = (title, description, tools) => {
    const newProject = { title, description, tools };
    setFormData({
      ...formData,
      projects: [...projects, newProject],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  return (
    <section className="flex flex-col items-center justify-center mt-5 w-full px-4">
      <h1 className="text-xl font-bold mb-4">Projects</h1>

      <form
        onSubmit={handleSubmitProject}
        className="w-full max-w-2xl flex flex-col items-center justify-center gap-6"
      >
        <div className="p-4 rounded-md space-y-4 relative flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-[#2A5D9E]">Add a New Project</h2>

          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-[#ccc] outline-none focus:ring focus:ring-[#2A5D9E] py-2 w-[280px] xs:w-[312px] sm:w-[385px] md:w-[480px]"
            aria-label="Project Title"
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-28 resize-none border border-[#ccc] w-[280px] outline-none focus:ring focus:ring-[#2A5D9E] xs:w-[312px] sm:w-[385px] md:w-[480px]"
            aria-label="Project Description"
          />

          <input
            type="text"
            placeholder="Tools Used (e.g. React, Node.js)"
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            className="border border-[#ccc] outline-none py-2 w-[280px] focus:ring focus:ring-[#2A5D9E] xs:w-[312px] sm:w-[385px] md:w-[480px]"
            aria-label="Project Tools"
          />

          <button
            type="submit"
            className="flex items-center justify-center bg-[#2A5D9E] rounded-md text-white font-medium text-center py-2 cursor-pointer text-lg w-[280px] xs:w-[312px] sm:w-[385px] md:w-[480px]"
          >
            <Plus size={24} className="mr-3" />
            Add Project
          </button>
        </div>

        {projects.length > 0 && (
          <div className="w-[280px] xs:w-[312px] sm:w-[385px] md:w-[480px] space-y-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border p-4 rounded-md bg-gray-50 relative w-full"
              >
                <h3 className="font-semibold text-[#2A5D9E] mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                <p className="text-sm text-gray-600 italic">{project.tools}</p>

                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 text-sm absolute top-2 right-4 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col space-y-4 mb-5 items-center">
          <button
            onClick={() => setStep(5)}
            type="button"
            className="m-2 bg-gray-400 text-white p-2.5 text-lg rounded-md cursor-pointer w-[280px] xs:w-[312px] sm:w-[385px] md:w-[480px]"
          >
            Back
          </button>
          <button
            onClick={() => setStep(7)}
            type="button"
            className="bg-[#2A5D9E] rounded-md text-white font-medium text-center py-2 cursor-pointer text-lg w-[280px] xs:w-[312px] sm:w-[385px] md:w-[480px]"
          >
            Next
          </button>
        </div>
      </form>
    </section>
  );
};

export default Projects;
