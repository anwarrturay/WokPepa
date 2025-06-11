import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import PersonalDetails from "./new-resume/PersonalDetails";
import Experience from "./new-resume/Experience";
import Skills from "./new-resume/Skills";
import Education from "./new-resume/Education";
import Summary from "./new-resume/Summary";
import Projects from "./new-resume/Projects";
import Certifications from "./new-resume/Certifications";
import Languages from "./new-resume/Languages";
import Hobbies from "./new-resume/Hobbies";
import References from "./new-resume/References";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { LoaderPinwheel } from "lucide-react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import NewResumeHeader from "./new-resume/NewResumeHeader";

const EditResume = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const userId = auth?.userId;
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [resume, setResume] = useState({});
  const [formData, setFormData] = useState({
    personalDetails: {
      title: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      nationality: "",
      dob: "",
      country: "",
    },
    summary: "",
    experience: [
      {
        jobTitle: "",
        company: "",
        responsibilities: "",
        startDate: "",
        endDate: "",
      },
    ],
    education: [
      {
        level: "",
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
      },
    ],
    certifications: [
      {
        name: "",
        issuingOrganization: "",
        issueDate: "",
      },
    ],
    languages: [],
    references: [
      {
        name: "",
        position: "",
        contact: "",
      },
    ],
    hobbies: [],
    skills: [],
    image: null,
  });

  // Fetch resume data on component mount
  useEffect(() => {
    const fetchResumeData = async () => {
      setIsFetchingData(true);
      try {
        const response = await axiosPrivate.get(`/resumes/${resumeId}`);
        if (response.status === 200) {
          setResume(response.data);
          setFormData(response.data);
        }
      } catch (err) {
        console.error(err.message);
        setErrMsg("Failed to fetch resume data. Please try again.");
      } finally {
        setIsFetchingData(false);
      }
    };
    fetchResumeData();
  }, [resumeId, axiosPrivate]);

  // Handle form field changes
  const handleChange = (section, field, value) => {
    if (section === "image") {
      setFormData((prev) => ({
        ...prev,
        image: value,
      }));
    } else if (section === "summary") {
      setFormData((prev) => ({
        ...prev,
        summary: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  // Save resume data
  const saveResume = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      const response = await axiosPrivate.patch(`/resumes/${resumeId}`, formData);
      if (response.status === 200) {
        alert("Resume saved successfully!");
        navigate("/my-resumes");
      }
    } catch (err) {
      console.error("Error saving resume:", err);
      alert(err.response?.data?.message || "Unable to save resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      {/* Header */}
      <NewResumeHeader />
      {/* Add padding to account for fixed header */}
      <div className="pt-12 sm:pt-16">
        {isFetchingData ? (
          <div className="flex flex-col items-center justify-center relative top-52">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A5D9E]"></div>
            <p className="mt-2">Fetching Resume Data...</p>
          </div>
        ) : errMsg ? (
          <div className="flex flex-col items-center justify-center relative top-52">
            <ExclamationTriangleIcon className="text-red-500 size-6" />
            <p className="text-red-500 font-medium">{errMsg}</p>
          </div>
        ) : (
          <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <form onSubmit={saveResume} className="space-y-8">
              {/* Personal Details */}
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <PersonalDetails
                    handleChange={handleChange}
                    formData={formData}
                    setFormData={setFormData}
                    resume={resume}
                    isEditable={location.pathname === "/create-new-resume"}
                  />
                </div>
              </div>

              {/* Other Sections */}
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Summary handleChange={handleChange} formData={formData} setFormData={setFormData} resume={resume} />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Experience handleChange={handleChange} formData={formData} setFormData={setFormData} resume={resume} />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Education handleChange={handleChange} formData={formData} setFormData={setFormData} resume={resume} />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Skills handleChange={handleChange} formData={formData} setFormData={setFormData} resume={resume} />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Projects handleChange={handleChange} formData={formData} setFormData={setFormData} resume={resume} />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Certifications handleChange={handleChange} formData={formData} setFormData={setFormData} resume={resume} />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Languages handleChange={handleChange} formData={formData} setFormData={setFormData} resume={resume} />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <References handleChange={handleChange} formData={formData} setFormData={setFormData} resume={resume} />
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Hobbies handleChange={handleChange} formData={formData} setFormData={setFormData} resume={resume} />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pb-8">
                <button
                  type="submit"
                  className={`${
                    loading ? "bg-gray-500" : "bg-[#2A5D9E]"
                  } text-white px-4 py-2 rounded-sm cursor-pointer`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center text-white">
                      <LoaderPinwheel className="animate-spin" />
                      <p className="ml-2">Saving...</p>
                    </div>
                  ) : (
                    "Save Resume"
                  )}
                </button>
              </div>
            </form>
          </main>
        )}
      </div>
    </div>
  );
};

export default EditResume;
