import { useEffect, useState } from "react";
import logo from "../../assets/ultraResume-book.png";
import {useNavigate} from "react-router";
import PersonalDetails from "./new-resume/PersonalDetails";
import Experience from "./new-resume/Experience";
import Skills from "./new-resume/Skills";
import Education from "./new-resume/Education";
import Summary from "./new-resume/Summary"
import Projects from "./new-resume/Projects";
import Certifications from "./new-resume/Certifications";
import Languages from "./new-resume/Languages"
import Hobbies from "./new-resume/Hobbies"
import References from "./new-resume/References";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { LoaderCircle, X, Download, Save } from "lucide-react";
import { BlobProvider, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./new-resume/resumepdf/MyDocument";

const CreateNewResume = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const userId = auth?.userId;
  const [loading, setLoading] = useState(false);
  const [resumeGenerated, setResumeGenerated] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const [formData, setFormData] = useState({
    personalDetails: {
      name: "",
      email: "",
      phone: "",
      address: "",
      nationality: "",
      dob: "",
      country: ""
    },
    summary: [],
    experience: [{
      jobTitle: "",
      company: "",
      responsibilities: "",
      startDate: "",
      endDate: "",
    }],
    education: [{
      level: "",
      school: "",
      degree: "",
      startDate: "",
      endDate: ""
    }],
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
    image: null
  });

  const [selectedFile, setSelectedFile] = useState("");
  // const [imageFile, setImageFile] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    console.log("Form Data To Send", formDataToSend);

    if(formData.image){
      formDataToSend.append('image', formData.image);
    }

    // Append personalDetails fields
    Object.keys(formData.personalDetails).forEach((key) => {
      formDataToSend.append(`personalDetails[${key}]`, formData.personalDetails[key]);
    });
  
    // Append other arrays/fields (stringify if necessary)
    formDataToSend.append('summary', JSON.stringify(formData.summary));
    formDataToSend.append('experience', JSON.stringify(formData.experience));
    formDataToSend.append('education', JSON.stringify(formData.education));
    formDataToSend.append('skills', JSON.stringify(formData.skills));
    formDataToSend.append('projects', JSON.stringify(formData.projects));
    formDataToSend.append('certifications', JSON.stringify(formData.certifications));
    formDataToSend.append('languages', JSON.stringify(formData.languages));
    formDataToSend.append('references', JSON.stringify(formData.references));
    formDataToSend.append('hobbies', JSON.stringify(formData.hobbies));


    try {
      const response = await axiosPrivate.post(
        `/resumes/${userId}`, 
        formDataToSend,
        {headers:{"Content-Type": "multipart/form-data"}}
      );
      console.log(response.data);

      if (response.status === 201) {
        // alert("Resume Created Successfully");
        setResumeGenerated(true);
        setShowForm(false);
        // navigate("/user-resume-dashboard");
      }
    } catch (err) {
      console.error("Unable to create a new resume", err);
      alert("Failed to create resume. Please try again.");
    }finally{
      setLoading(false)
    }
  };

  const handleSaveResume = async ()=>{
    console.log("Saved Resume");
  }

  useEffect(()=>{
    console.log(formData);
  }, [])

  const goHome = () => {
    navigate("/user-resume-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div onClick={goHome} className="flex items-center space-x-2 cursor-pointer min-w-[80px] sm:min-w-[100px]">
              <img src={logo} alt="UltraResume" className="h-6 sm:h-8 w-auto" />
              <div className="flex items-center">
                <span className="text-[#2A5D9E] font-semibold text-lg sm:text-xl lg:hidden">WP</span>
                <span className="text-[#2A5D9E] font-semibold text-xl hidden lg:block">WokPepa</span>
              </div>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 px-2 text-nowrap">Create New Resume</h1>
            <div className="min-w-[80px] sm:min-w-[100px]"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="pt-12 sm:pt-16">
        {showForm && (
          <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <PersonalDetails 
                    handleChange={handleChange} 
                    formData={formData}
                    setSelectedFile={setSelectedFile}
                    // setImageFile={setImageFile}
                    setStep={() => {}}
                  />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Summary 
                    handleChange={handleChange} 
                    formData={formData} 
                    setStep={() => {}}
                  />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Experience 
                    handleChange={handleChange} 
                    formData={formData} 
                    setFormData={setFormData} 
                    setStep={() => {}}
                  />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Education 
                    handleChange={handleChange} 
                    formData={formData} 
                    setFormData={setFormData} 
                    setStep={() => {}}
                  />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Skills 
                    formData={formData} 
                    setFormData={setFormData} 
                    setStep={() => {}}
                  />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Projects 
                    handleChange={handleChange} 
                    formData={formData} 
                    setFormData={setFormData} 
                    setStep={() => {}}
                  />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Certifications 
                    handleChange={handleChange} 
                    formData={formData} 
                    setFormData={setFormData} 
                    setStep={() => {}}
                  />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Languages 
                    formData={formData} 
                    setFormData={setFormData} 
                    setStep={() => {}}
                  />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <References 
                    handleChange={handleChange} 
                    formData={formData} 
                    setFormData={setFormData} 
                    setStep={() => {}}
                  />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Hobbies 
                    formData={formData} 
                    setFormData={setFormData} 
                    setStep={() => {}}
                  />
                </div>
              </div>

              <div className="flex justify-center pt-6 pb-8">
                <button
                  type="submit"
                  className="next-btn"
                >
                  {loading ? 
                    <div className="flex items-center justify-center">
                      <LoaderCircle className="animate-spin"/>
                    </div> : 
                    "Create Resume"
                  }
                </button>
              </div>
            </form>
          </main>
        )}

        {/* Resume Generated */}
        {resumeGenerated && !showForm && (
          <div className="relative w-full min-h-screen bg-gray-50 py-4 sm:py-8 mt-12 sm:mt-16">
            <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 space-y-4 sm:space-y-6">
              <div className="relative bg-white rounded-lg shadow-lg p-2 sm:p-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="absolute -right-2 sm:-right-3 -top-2 sm:-top-3 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors cursor-pointer z-10"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
                
                <div className="w-full">
                  <BlobProvider document={<MyDocument formData={formData} />}>
                    {({ url }) => (
                      <div className="w-full flex items-center justify-center">
                        <iframe
                          src={`${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                          className="w-full aspect-[1/1.414] border-none rounded-lg"
                          style={{
                            maxHeight: "calc(100vh - 180px)",
                            height: "auto",
                            WebkitOverflowScrolling: "touch",
                            overflow: "hidden"
                          }}
                          title="Resume Preview"
                          frameBorder="0"
                        />
                      </div>
                    )}
                  </BlobProvider>
                </div>
              </div>

              {/* Buttons below PDF */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 px-2">
                <PDFDownloadLink
                  document={<MyDocument formData={formData} />}
                  fileName="my_resume.pdf"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-[#2A5D9E] hover:bg-[#234e86] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A5D9E] transition-colors cursor-pointer w-full sm:w-auto"
                >
                  {({ loading }) => (
                    <>
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      {loading ? "Preparing..." : "Download"}
                    </>
                  )}
                </PDFDownloadLink>

                <button
                  onClick={handleSaveResume}
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-[#2A5D9E] hover:bg-[#234e86] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A5D9E] transition-colors cursor-pointer w-full sm:w-auto"
                >
                  <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Save Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNewResume;
