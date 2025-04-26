import React, { useState } from "react";
import logo from "../../assets/ultraResume-book.png";
import {useNavigate} from "react-router";
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
import MyDocument from "./new-resume/resumepdf/MyDocument";
import { PDFViewer } from '@react-pdf/renderer';

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
		title: "",
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

		<div className="flex flex-col xl:flex-row xl:items-start xl:justify-evenly justify-center items-center w-full">
			<div className="flex flex-col w-full xl:w-[500px]">
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
				
				{step === 12 && (
					<Review handleSubmit={handleSubmit} setStep={setStep}/>
				)}
			</div>
			<div className="mt-5 flex flex-col items-center justify-center">
				Resume Preview
				<div style={{ border: '1px solid #ddd', height: '500px' }}>
					<PDFViewer 
						style={{
							// width: '100%',
							height: '100%',
							backgroundColor: '#fff',
							border: 'none',
						}}
					>
						<MyDocument />
					</PDFViewer>
				</div>
			</div>
		</div>
    </section>
  );
};

export default CreateNewResume;
