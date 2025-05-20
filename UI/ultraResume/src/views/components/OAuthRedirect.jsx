import { useEffect } from "react";
import {useNavigate} from "react-router";
import useAuth from "../../hooks/useAuth";
import { LoaderCircle } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const OAuthRedirect = () => {
    const navigate = useNavigate();
    const { setAuth, auth } = useAuth();
    console.log("Current Auth State: ", {
        authCurrentAccessToken: auth?.accessToken
    })

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken")
        console.log("AccessToken from URL: ", accessToken);

        if (accessToken && typeof accessToken === "string") {
            try {
                const decodedToken = jwtDecode(accessToken);
                console.log("DecodedToken: ", decodedToken);

                const userId = decodedToken.UserInfo?.id;
                const email = decodedToken.UserInfo?.email;

                setAuth({ accessToken, userId, email });
                setTimeout(() => navigate("/user-resume-dashboard"), 1000);
            } catch (err) {
                console.error("Token decode error:", err.message);
                navigate("/");
            }
        } else {
            navigate("/");
        }

    }, [navigate, setAuth]);

  return (
    <div className="flex flex-col justify-center items-center font-montserrat relative top-1/2">
        <LoaderCircle className="animate-spin text-[#2A5D9E]" size={24} strokeWidth={3}/>
        <p className="text-xl mt-2 font-semibold">Redirecting...</p>
    </div>
  )
}

export default OAuthRedirect;