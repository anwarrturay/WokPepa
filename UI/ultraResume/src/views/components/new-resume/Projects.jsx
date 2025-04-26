import React from 'react';

const Projects = ({ formData, handleChange, setStep }) => {
  const { projects } = formData;
  console.log(Array.isArray(projects))

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    handleChange("projects", null, updatedProjects);
  };

  const addProject = () => {
    const newProject = { title: '', description: '', technologies: '' };
    handleChange("projects", null, [...projects, newProject]);
  };

  const removeProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    handleChange("projects", null, updatedProjects);
  };

  return (
    <section className="flex flex-col items-center justify-center mt-5 w-full px-4">
      <h1 className="text-xl font-bold mb-4">Projects</h1>
      <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-2xl flex flex-col gap-6">

        {Array.isArray(projects) && projects.map((project, index) => (
          <div key={index} className="p-4 border-none space-y-4 relative">
            <h2 className="text-lg font-semibold text-[#2A5D9E]">Project {index + 1}</h2>

            <input
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => handleProjectChange(index, "title", e.target.value)}
              className="resume-field"
              aria-label={`Project ${index + 1} Title`}
            />

            <textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => handleProjectChange(index, "description", e.target.value)}
              className="resume-field h-28 resize-none"
              aria-label={`Project ${index + 1} Description`}
            />

            <input
              type="text"
              placeholder="Technologies Used (e.g. React, Node.js)"
              value={project.technologies}
              onChange={(e) => handleProjectChange(index, "technologies", e.target.value)}
              className="resume-field"
              aria-label={`Project ${index + 1} Technologies`}
            />

            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-500 text-sm absolute top-4 right-4 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addProject}
          className="self-start text-sm text-blue-600 hover:underline"
        >
          + Add Another Project
        </button>

        <div className="flex flex-col justify-between mt-6">
          <button
            type="button"
            className="back-btn px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-100 transition"
            onClick={() => setStep(5)}
          >
            Back
          </button>
          <button
            type="button"
            className="next-btn bg-[#2A5D9E] text-white px-4 py-2 rounded-md hover:bg-[#1f4a7d] transition"
            onClick={() => setStep(7)}
          >
            Next
          </button>
        </div>
      </form>
    </section>
  );
};

export default Projects;
