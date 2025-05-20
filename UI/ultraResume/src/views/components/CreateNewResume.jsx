import { useEffect, useState } from "react";
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
import Hobbies from "./new-resume/Hobbies"
import References from "./new-resume/References";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
const CreateNewResume = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const userId = auth?.userId;

  const [formData, setFormData] = useState({
    personalDetails: {
      name: "",
      email: "",
      phone: "",
      address: "",
	    nationality: "",
      dob: "",
      country: "",
      imageFile: null
    },
	  summary: [],
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
      degree: "",
      startDate: "",
      endDate: ""
    },
    projects: [{
      title: "",
      description: "",
      tools: ""
    }],
    certifications: [{ 
      name: "",
      issuingOrganization: "",
      issueDate: "",
      expirationDate: ""
    }],
	  languages: [],
	  references: [{
      name: "",
      position: "",
      contact: ""
    }], 
	  hobbies: [],
    skills: [],
    image: null,
  });

    const [selectedFile, setSelectedFile] = useState(""); // For image preview
    const [imageFile, setImageFile] = useState(null); 

    const handleChange = (section, field, value) => {
      if (section === "image") {
        setFormData(prev => ({
          ...prev,
          image: value
        }));
      } else if (section === "summary") {
        setFormData(prev => ({
          ...prev,
          summary: value
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        }));
      }
    };

  // Handle form submission
    const handleSubmit = async () => {
      const buildFormData = (formDataObj) => {
        const form = new FormData();

        // Append image file
        if (formDataObj.image) {
          form.append("image", formDataObj.image);
        }

        const appendNestedData = (data, parentKey = "") => {
          if (data instanceof File || data === null) return;

          if (Array.isArray(data)) {
            data.forEach((item, index) => {
              appendNestedData(item, `${parentKey}[${index}]`);
            });
          } else if (typeof data === "object") {
            Object.entries(data).forEach(([key, value]) => {
              appendNestedData(value, parentKey ? `${parentKey}.${key}` : key);
            });
          } else {
            form.append(parentKey, data);
          }
        };

        Object.entries(formDataObj).forEach(([key, value]) => {
          if (key !== "image") {
            appendNestedData(value, key);
          }
        });

        return form;
      };

      try {
        const payload = buildFormData(formData);
        const response = await axiosPrivate.post(
          `/resumes/${userId}`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        if (response.status === 200) {
          alert("Resume Created Successfully");
        }
      } catch (err) {
        console.error("Unable to create a new resume", err);
      }
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
					<PersonalDetails 
            handleChange={handleChange} 
            formData={formData} setStep={setStep}           
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setImageFile={setImageFile}
          />
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
					<Projects handleChange={handleChange} formData={formData} setFormData={setFormData} setStep={setStep}/>
				)}

				{step === 7 && (
					<Certifications handleChange={handleChange} formData={formData} setFormData={setFormData} setStep={setStep} />
				)}

				{step === 8 && (
					<Languages formData={formData} setFormData={setFormData} setStep={setStep}/>
				)}
				{step === 9 && (
					<References handleChange={handleChange} formData={formData} setFormData={setFormData} setStep={setStep} />
				)}

				{step === 10 && (
					<Hobbies formData={formData} setFormData={setFormData} setStep={setStep}/>
				)}
				
				{step === 11 && (
					<Review handleSubmit={handleSubmit} setStep={setStep}/>
				)}

			</div>
		</div>
    </section>
  );
};

export default CreateNewResume;
