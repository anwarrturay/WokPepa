import React from 'react'

const Education = ({ formData, handleChange, setStep}) => {
  return (
    <section className="flex flex-col items-center justify-center mt-5">
    <h1 className="text-lg font-bold ml-2">Education</h1>
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center">
        <select
            value={formData.education.level}
            onChange={(e) => handleChange("education", "level", e.target.value)}
            className="resume-field"
        >
            <option value="">-- Select Education Level --</option>
            <option value="High School">High School</option>
            <option value="Diploma">Diploma</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate (PhD)">Doctorate (PhD)</option>
            <option value="Other">Other</option>
        </select>
        <input
            type="text"
            placeholder="school"
            value={formData.education.school}
            onChange={(e) =>
                handleChange("education", "school", e.target.value)
            }
            className="resume-field"
        />
        <input
            type="text"
            placeholder="Degree in"
            value={formData.education.degree || ""}
            onChange={(e) =>
                handleChange("education", "degree", e.target.value)
            }
            className="resume-field"
        />
        <div className="flex flex-col">
            <label htmlFor="date" className="m-2 font-medium">Start Date:</label>
            <input
            type="date"
            placeholder="StartDate"
            value={formData.education.startDate}
            onChange={(e) =>
                handleChange("education", "startDate", e.target.value)
            }
            className="resume-field"
            />
        </div>
        <div className="flex flex-col">
            <label htmlFor="" className="m-2 font-medium">End Date:</label>
            <input
            type="date"
            placeholder="EndDate"
            value={formData.education.endDate}
            onChange={(e) =>
                handleChange("education", "endDate", e.target.value)
            }
            className="resume-field"
            />
        </div>
        <div className="flex flex-col">
            <button
                type="button"
                className="back-btn"
                onClick={() => setStep(3)}
            >
            Back
            </button>
            <button
                type="button"
                className="m-2 next-btn bg-[#2A5D9E] text-white px-4 py-2 rounded-md"
                onClick={() => setStep(5)}
            >
            Next
            </button>
        </div>
    </form>
    </section>
  )
}

export default Education