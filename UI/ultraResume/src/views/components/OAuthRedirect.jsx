import { useEffect } from "react";
import {useNavigate} from "react-router";
import useAuth from "../../hooks/useAuth";
import { LoaderCircle } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const OAuthRedirect = () => {
    const navigate = useNavigate();
    const { setAuth, auth } = useAuth();

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken")

        if (accessToken && typeof accessToken === "string") {
            try {
                const decodedToken = jwtDecode(accessToken);
                const userId = decodedToken.UserInfo?.id;
                const email = decodedToken.UserInfo?.email;
                const isNewUser = decodedToken.UserInfo?.isNewUser;

                setAuth({ accessToken, userId, email });
                {isNewUser 
                    ? setTimeout(() => navigate("/tips"), 1000) 
                    : setTimeout(() => navigate("/user-resume-dashboard"), 1000)
                }
            } catch (err) {
                console.error("Token decode error:", err.message);
                navigate("/");
            }
        } else {
            navigate("/");
        }

    }, [navigate, setAuth]);

  return (
    <div className="flex flex-col justify-center items-center font-montserrat relative top-[300px]">
        <LoaderCircle className="animate-spin text-[#2A5D9E]" size={36} strokeWidth={2}/>
        <p className="text-xl mt-2 font-medium">Signing in...</p>
    </div>
  )
}

export default OAuthRedirect;