import React from 'react'
import { skillsList } from "../../../utils/Countries";
const Skills = ({formData, setFormData, setStep}) => {

    const handleSkillChange = (skill) => {
        setFormData((prev) => {
          const updatedSkills = prev.skills.includes(skill)
            ? prev.skills.filter((s) => s !== skill)
            : [...prev.skills, skill];
          return { ...prev, skills: updatedSkills };
        });
    };

  return (
    <section className="flex flex-col items-center justify-center mt-5">
                    <h1 className="text-lg font-bold ml-2">Skills</h1>
                    <p className="text-sm text-gray-500 ml-2 mb-3">Select relevant skills for your profession</p>
                    <div className="flex flex-wrap gap-2 mx-2">
                        {skillsList.map((skill, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleSkillChange(skill)}
                                className={`px-3 py-1 border rounded-md ${
                                formData.skills.includes(skill) ? "bg-[#2A5D9E] text-white" : "bg-gray-200"
                                }`}
                            >
                                {skill}
                            </button>
                        ))}
                    </div>
                    <div className="flex mt-3">
                        {/* Buttons */}
                        <button
                            type="button"
                            className="back-btn"
                            onClick={() => setStep(4)}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="m-2 bg-[#2A5D9E] text-white px-32 py-2 rounded-md"
                            onClick={()=> setStep(6)}
                        >
                            Next
                        </button>
                    </div>
    </section>
  )
}

export default Skills