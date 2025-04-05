import React from 'react'

const Experience = ({formData, handleChange, setStep}) => {
  return (
    <section className="flex flex-col items-center justify-center mt-5">
		<h1 className="text-lg font-bold ml-2">Work Experience</h1>
		<form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center">
			<input
				type="text"
				placeholder="Job Title"
				value={formData.experience.jobTitle}
				onChange={(e) =>
					handleChange("experience", "jobTitle", e.target.value)
				}
				className="resume-field"
			/>
			<input
				type="text"
				placeholder="Company"
				value={formData.experience.company}
				onChange={(e) =>
					handleChange("experience", "company", e.target.value)
				}
				className="resume-field"
			/>
			<input
				type="text"
				placeholder="Responsibilities"
				value={formData.experience.responsibilities}
				onChange={(e) =>
					handleChange("experience", "responsibilities", e.target.value)
				}
				className="resume-field"
			/>
			<div className="flex flex-col">
				<label htmlFor="date" className="m-2 font-medium">Start Date:</label>
				<input
					type="date"
					placeholder="StartDate"
					value={formData.experience.startDate}
					onChange={(e) =>
						handleChange("experience", "startDate", e.target.value)
					}
					className="resume-field"
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor="" className="m-2 font-medium">End Date:</label>
				<input
					type="date"
					placeholder="EndDate"
					value={formData.experience.endDate}
					onChange={(e) =>
						handleChange("experience", "endDate", e.target.value)
					}
					className="resume-field"
				/>
			</div>
			<div className="flex">
				<button
					type="button"
					className="back-btn"
					onClick={() => setStep(2)}
				>
				Back
				</button>
				<button
					type="button"
					className="m-2 next-btn bg-[#2A5D9E] text-white px-4 py-2 rounded-md"
					onClick={() => setStep(4)}
				>
				Next
				</button>
			</div>
		</form>
    </section>
  )
}

export default Experience