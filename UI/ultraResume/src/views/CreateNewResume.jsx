import React, { useState } from "react";
import logo from "../assets/ultraResume-book.png";
import {useNavigate} from "react-router";
import { countries, skillsList } from "../utils/Countries";

const CreateNewResume = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    personalDetails: {
      name: "",
      email: "",
      phone: "",
      address: "",
      dob: "",
      country: "",
    },
    experience: {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
    },
    education: {
      level: "",
      school: "",
      year: "",
    },
    skills: [],
    image: null,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  // Handles input change
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSkillChange = (skill) => {
    setFormData((prev) => {
      const updatedSkills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: updatedSkills };
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Submitting form data:", formData);
    // Send data to your backend API
    fetch("YOUR_BACKEND_ENDPOINT", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  const goHome = ()=>{
	navigate("/user-resume-dashboard")
  }

  return (
    <section className="flex flex-col font-montserrat">
      <div className="flex justify-between">
        <div onClick={goHome} className="flex flex-col items-start">
          <img src={logo} alt="" className="w-[30px] h-[30px] m-2" />
        </div>
        <div className="flex flex-col items-center mt-1">
          <h1 className="text-2xl font-bold">Create New Resume</h1>
          <p className="text-xs font-medium text-slate-500">
            Keep striving for progress over perfection
          </p>
        </div>
        <div></div>
      </div>

      {/* Step 1: Personal Details */}
      {step === 1 && (
        <section className="flex flex-col items-left mt-5">
          <h1 className="text-lg font-bold ml-2">Personal Details</h1>
          <form onSubmit={(e) => e.preventDefault()}>
			<div className="flex justify-start items-start m-2">
				<label className="relative w-[307px] h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition">
					<input
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleFileChange}
					/>
					{selectedFile ? (
					<img
						src={selectedFile}
						alt="Selected"
						className="absolute inset-0 w-full h-full object-cover rounded-lg"
					/>
					) : (
						<span className="text-gray-500">Upload Photo</span>
					)}
				</label>
			</div>
            <input
              type="text"
              autoComplete="off"
              value={formData.personalDetails.name}
              onChange={(e) =>
                handleChange("personalDetails", "name", e.target.value)
              }
              placeholder="Name"
              className="border border-gray-300 w-[307px] mx-2 my-1 px-1.5 py-3 outline-none focus:ring-2 focus:ring-[#2A5D9E]"
            />
            <input
              type="email"
              autoComplete="off"
              value={formData.personalDetails.email}
              onChange={(e) =>
                handleChange("personalDetails", "email", e.target.value)
              }
              placeholder="example@gmail.com"
              className="border border-gray-300 w-[307px] mx-2 my-1 px-1.5 py-3 outline-none focus:ring-2 focus:ring-[#2A5D9E]"
            />
            <input
              type="number"
              autoComplete="off"
              value={formData.personalDetails.phone}
              onChange={(e) =>
                handleChange("personalDetails", "phone", e.target.value)
              }
              placeholder="Telephone"
              className="border border-gray-300 w-[307px] mx-2 my-1 px-1.5 py-3 outline-none focus:ring-2 focus:ring-[#2A5D9E]"
            />
            <input
              type="text"
              autoComplete="off"
              value={formData.personalDetails.address}
              onChange={(e) =>
                handleChange("personalDetails", "address", e.target.value)
              }
              placeholder="Address"
              className="border border-gray-300 w-[307px] mx-2 my-1 px-1.5 py-3 outline-none focus:ring-2 focus:ring-[#2A5D9E]"
            />
            <input
              type="date"
              autoComplete="off"
              value={formData.personalDetails.dob}
              onChange={(e) =>
                handleChange("personalDetails", "dob", e.target.value)
              }
              className="border border-gray-300 w-[307px] my-1 mx-2 px-1.5 py-3 outline-none focus:ring-2 focus:ring-[#2A5D9E]"
            />
            <select
              id="country"
              name="country"
              className="w-[307px] px-1.5 py-3 my-1 mx-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.personalDetails.country}
              onChange={(e) =>
                handleChange("personalDetails", "country", e.target.value)
              }
            >
              <option value="">-- Select a Country --</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="m-2 next-btn bg-[#2A5D9E] text-white px-4 py-2 rounded-md"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </form>
        </section>
      )}


      {/* Step 2: Experience */}
      {step === 2 && (
        <section className="flex flex-col items-left mt-5">
          <h1 className="text-lg font-bold ml-2">Work Experience</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Job Title"
              value={formData.experience.jobTitle}
              onChange={(e) =>
                handleChange("experience", "jobTitle", e.target.value)
              }
              className="border border-gray-300 w-[307px] mx-2 my-1 px-1.5 py-3"
            />
            <input
              type="text"
              placeholder="Company"
              value={formData.experience.company}
              onChange={(e) =>
                handleChange("experience", "company", e.target.value)
              }
              className="border border-gray-300 w-[307px] mx-2 my-1 px-1.5 py-3"
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
				className="border border-gray-300 w-[307px] mx-2 my-1 px-1.5 py-3"
				/>
			</div>
			<div className="flex-flex-col">
				<label htmlFor="" className="m-2 font-medium">End Date:</label>
				<input
				type="date"
				placeholder="EndDate"
				value={formData.experience.endDate}
				onChange={(e) =>
					handleChange("experience", "endDate", e.target.value)
				}
				className="border border-gray-300 w-[307px] mx-2 my-1 px-1.5 py-3"
				/>
			</div>
            <button
              type="button"
              className="m-2 bg-gray-400 text-white px-4 py-2 rounded-md"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              type="button"
              className="m-2 next-btn bg-[#2A5D9E] text-white px-4 py-2 rounded-md"
              onClick={() => setStep(3)}
            >
              Next
            </button>
          </form>
        </section>
      )}


	  {/* step 3: Education section */}
      {step === 3 && (
        <section className="flex flex-col items-left mt-5">
          <h1 className="text-lg font-bold ml-2">Education</h1>
          <form onSubmit={(e) => e.preventDefault()}>
		  	<select
				value={formData.education.level}
				onChange={(e) => handleChange("education", "level", e.target.value)}
				className="border border-gray-300 w-[307px] mx-2 my-1 px-1.5 py-3"
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
              className="border border-gray-300 w-[307px] mx-2 my-1 px-1.5 py-3"
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
				className="border border-gray-300 w-[307px] mx-2 my-1 px-1.5 py-3"
				/>
			</div>
			<div className="flex-flex-col">
				<label htmlFor="" className="m-2 font-medium">End Date:</label>
				<input
				type="date"
				placeholder="EndDate"
				value={formData.education.endDate}
				onChange={(e) =>
					handleChange("education", "endDate", e.target.value)
				}
				className="border border-gray-300 w-[307px] mx-2 my-1 px-1.5 py-3"
				/>
			</div>
            <button
              type="button"
              className="m-2 bg-gray-400 text-white px-4 py-2 rounded-md"
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
          </form>
        </section>
      )}


	  {/* step 4: Skills selection section */}
		{step === 4 && (
			<section className="flex flex-col items-left mt-5">
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

				{/* Buttons */}
				<button
					type="button"
					className="m-2 bg-gray-400 text-white px-4 py-2 rounded-md"
					onClick={() => setStep(3)}
				>
					Back
				</button>
				<button
					type="button"
					className="m-2 bg-[#2A5D9E] text-white px-4 py-2 rounded-md"
					onClick={()=> setStep(5)}
				>
					Next
				</button>
			</section>
		)}


      {/* Final Step: Submit Form */}
      {step === 5 && (
        <section className="flex flex-col items-left mt-5">
          <h1 className="text-lg font-bold ml-2">Review & Submit</h1>
          <p className="text-sm text-gray-600 ml-2">
            Please review your details before submitting.
          </p>
          <button
            type="button"
            className="m-2 bg-gray-400 text-white px-4 py-2 rounded-md"
            onClick={() => setStep(4)}
          >
            Back
          </button>
          <button
            type="button"
            className="m-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Create Resume
          </button>
        </section>
      )}
    </section>
  );
};

export default CreateNewResume;
