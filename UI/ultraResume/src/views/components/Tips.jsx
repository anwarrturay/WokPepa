import { useState } from 'react';
import {useNavigate} from 'react-router'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation } from 'react-router';
import { 
  Lightbulb, 
  Pencil, 
  FileText, 
  Download, 
  Layers, 
  FolderKanban, 
  Settings, 
  UserCircle,
  LoaderCircle 
} from "lucide-react";

const tipsData = [
  {
    icon: <Lightbulb className="text-blue-600 w-6 h-6 sm:w-10 sm:h-10 mt-1" />,
    title: "Get Started",
    description: "Click on 'Create Resume' from your dashboard to begin building your professional resume in minutes.",
  },
  {
    icon: <Pencil className="text-green-600 w-6 h-6 sm:w-10 sm:h-10 mt-1" />,
    title: "Fill Out Sections",
    description: "Provide your personal info, education, experience, skills, and more through our guided form.",
  },
  {
    icon: <FileText className="text-purple-600 w-6 h-6 sm:w-10 sm:h-10 mt-1" />,
    title: "Live Builder & Instant Preview",
    description: "Clicking 'Create Resume' instantly opens the builder, where you can preview your resume in real time—and when you're ready, save or download it with a single click.",
  },
  {
    icon: <Layers className="text-pink-600 w-6 h-6 sm:w-10 sm:h-10 mt-1" />,
    title: "Choose a Template",
    description: "Browse wokPepa's curated library of resume templates and select one that matches your style and goals.",
  },
  {
    icon: <FolderKanban className="text-orange-600 w-6 h-6 sm:w-10 sm:h-10 mt-1" />,
    title: "Manage Saved Resumes",
    description: "The 'My Resumes' section lets you revisit, edit, delete, or download any resumes you've previously built.",
  },
  {
    icon: <Settings className="text-sky-600 w-6 h-6 sm:w-10 sm:h-10 mt-1" />,
    title: "Customize Your Account",
    description: "In the Settings tab, you can update your profile image, modify personal details, or change your password securely.",
  },
  {
    icon: <UserCircle className="text-indigo-600 w-6 h-6 sm:w-10 sm:h-10 mt-1" />,
    title: "Profile Actions Menu",
    description: "Click your profile photo in the dashboard to access quick actions like View Profile, Preferences, Manage Account, and Logout.",
  },
  {
    icon: <Download className="text-[#2A5D9E] w-6 h-6 sm:w-10 sm:h-10 mt-1" />,
    title: "Download & Share",
    description: "Once satisfied, download your resume as a PDF or share it directly from the app.",
  }
];
const Tips = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setUser } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleNext = async () => {
    const nextIndex = currentTip + 1;

    if (nextIndex < tipsData.length) {
      setCurrentTip(nextIndex);
    } else {
      setIsLoading(true)
      try {
        await axiosPrivate.patch(
          "/users/is-new",
          { id: auth?.userId }
        );
        setUser(prev => ({ ...prev, isNewUser: false }));

        setTimeout(() => {
          navigate("/user-resume-dashboard");
          setIsLoading(false)
        }, 1000);
      } catch (err) {
        setIsLoading(false)
        console.error("Failed to update isNewUser status:", err);
      }
    }
  };

  const handlePrev = () => {
    if (currentTip > 0) setCurrentTip(prev => prev - 1);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="w-full max-w-2xl bg-[#f5f5f5] shadow-sm p-5 sm:p-8 font-montserrat transition-all duration-300 border border-[#ccc]">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
          👋 Welcome to Wokpepa!
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 text-center">
          Learn how to work around WokPepa in a few simple steps:
        </p>

        <div className="flex items-start gap-4 bg-gray-50 p-4 sm:p-6 rounded-xl">
          <div>
            {tipsData[currentTip].icon}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700">{tipsData[currentTip].title}</h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1">{tipsData[currentTip].description}</p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={currentTip === 0}
            className={`px-4 py-2 text-sm rounded-md font-medium transition ${
              currentTip === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-[#2A5D9E] text-white hover:bg-[#2a5c9ecf]'
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
             className="bg-[#2A5D9E] px-4 py-2 text-sm rounded-md font-medium transition text-white hover:bg-[#2a5c9eef]"
          >
            {!(currentTip === tipsData.length - 1) ? "Next" : isLoading ? <LoaderCircle className="animate-spin" /> : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tips;
