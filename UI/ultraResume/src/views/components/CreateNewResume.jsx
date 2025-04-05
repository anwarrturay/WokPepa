import React, { useState } from "react";
import logo from "../../assets/ultraResume-book.png";
import {useNavigate} from "react-router";
import { skillsList } from "../../utils/Countries";
import PersonalDetails from "./new-resume/PersonalDetails";
import Experience from "./new-resume/Experience";
import Skills from "./new-resume/Skills";
import Education from "./new-resume/Education";
import Review from "./new-resume/Review";
import Summary from "./new-resume/Summary"
import Projects from "./new-resume/Projects";
import Certifications from "./new-resume/Certifications";
import Languages from "./new-resume/Languages"
import AwardsSection from "./new-resume/AwardsSection"
import Hobbies from "./new-resume/Hobbies"
import References from "./new-resume/References";

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
	  linked: "",
	  github: "",
	  x: ""
    },
	summary: "",
    experience: {
      jobTitle: "",
      company: "",
	  responsibilities: "",
      startDate: "",
      endDate: "",
    },
    education: {
      level: "",
      school: "",
      year: "",
    },
	projects: [{
		name: "",
		description: "",
		technologies: ""
	}],
	certifications: [{
		name: "",
		issuingOrganization: "",
		issueDate: "",
		expirationDate: ""
	}],
	languages: [],
	awards:[],
	references: [],
	hobbies: [],
    skills: [],
    image: null,
  });

  // Handles input change
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
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
          <img src={logo} alt="" className="w-[30px] cursor-pointer m-2" />
        </div>
        <div className="flex flex-col items-center mt-1">
          <h1 className="text-2xl font-bold">Create New Resume</h1>
          <p className="text-xs font-medium text-slate-500">
            Keep striving for progress over perfection
          </p>
        </div>
        <div></div>
      </div>

		{step === 1 && (
			<PersonalDetails handleChange={handleChange} formData={formData} setStep={setStep}/>
		)}

		{step === 2 &&(
			<Summary handleChange={handleChange} formData={formData} setStep={setStep}/>
		)}

		{step === 3 && (
			<Experience handleChange={handleChange} formData={formData} setStep={setStep}/>
		)}

		{step === 4 && (
			<Education handleChange={handleChange} formData={formData} setStep={setStep}/>
		)}

		{step === 5 && (
			<Skills formData={formData} setFormData={setFormData} setStep={setStep}/>
		)}

		
		{step === 6 && (
			<Projects handleChange={handleChange} formData={formData} setStep={setStep}/>
		)}

		
		{step === 7 && (
			<Certifications handleChange={handleChange} formData={formData} setFormData={setFormData} setStep={setStep} />
		)}

		{step === 8 && (
			<Languages formData={formData} setFormData={setFormData} setStep={setStep}/>
		)}

		{step === 9 && (
			<AwardsSection handleChange={handleChange} formData={formData} setFormData={setFormData} setStep={setStep} />
		)}

		{step === 10 && (
			<References handleChange={handleChange} formData={formData} setFormData={setFormData} setStep={setStep} />
		)}

		{step === 11 && (
			<Hobbies formData={formData} setFormData={setFormData} setStep={setStep}/>
		)}
		
		{/* Final Step: Submit Form */}
		{step === 12 && (
			// <section className="flex flex-col items-center justify-center mt-5">
			// 	<h1 className="text-lg font-bold ml-2">Review & Submit</h1>
			// 	<p className="text-sm text-gray-600 ml-2 text-center">
			// 		Please review your details before submitting.
			// 	</p>
			// 	<div className="flex flex-col">
			// 		<button
			// 			type="button"
			// 			className="back-btn"
			// 			onClick={() => setStep(4)}
			// 		>
			// 			Back
			// 		</button>
			// 		<button
			// 			type="button"
			// 			className="submit-btn"
			// 			onClick={handleSubmit}
			// 		>
			// 			Create Resume
			// 		</button>
			// 	</div>
			// </section>
			<Review handleSubmit={handleSubmit} setStep={setStep}/>
		)}
    </section>
  );
};

export default CreateNewResume;
