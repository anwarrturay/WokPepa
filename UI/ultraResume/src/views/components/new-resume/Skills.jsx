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
        <div className="flex flex-wrap items-center justify-center gap-2 mx-2">
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
        <div className="flex flex-col items-center justify-center mt-3 mb-5 gap-2">
            <button
                type="button"
                className="bg-gray-400 text-white p-2.5 text-lg rounded-md cursor-pointer w-[280px] xs:w-[312px] sm:w-[385px] md:w-[480px]"
                onClick={() => setStep(4)}
            >
                Back
            </button>
            <button
                type="button"
                className="bg-[#2A5D9E] rounded-md text-white font-medium text-center py-2 cursor-pointer text-lg w-[280px] xs:w-[312px] sm:w-[385px] md:w-[480px]"
                onClick={()=> setStep(6)}
            >
                Next
            </button>
        </div>
    </section>
  )
}

export default Skills