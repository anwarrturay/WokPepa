import { useNavigate, useLocation } from 'react-router';
import WokPepaLogo from "../../../assets/WokPepaLogo.png";
import { ArrowLeft } from 'lucide-react';
const NewResumeHeader = () => {
    const navigate = useNavigate();
    const location  = useLocation();
    const goHome = () => {
        navigate("/user-resume-dashboard");
      };
  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
            <div onClick={goHome} className="flex items-center space-x-2 cursor-pointer min-w-[80px] sm:min-w-[100px]">
            <div className="flex items-center">
                {location.pathname === "/create-new-resume" ? (
                    <>                    
                    <img src={WokPepaLogo} alt="WokPepaLogo" className="h-6 sm:h-8 w-auto" />
                    <span className="text-[#2A5D9E] font-semibold text-lg sm:text-xl lg:hidden">WP</span>
                    <span className="text-[#2A5D9E] font-semibold text-xl hidden lg:block">WokPepa</span>
                    </>
                ) : (
                    <div onClick={()=> navigate(-1)}>
                        <ArrowLeft size={20} strokeWidth={3} className='ml-2'/>
                    </div>
                )}
            </div>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 px-2 text-nowrap">
                {location.pathname === "/create-new-resume" ? "Create New Resume": "Edit Resume"}
            </h1>
            <div className="min-w-[80px] sm:min-w-[100px]"></div> {/* Spacer for alignment */}
        </div>
        </div>
    </header>
  )
}

export default NewResumeHeader