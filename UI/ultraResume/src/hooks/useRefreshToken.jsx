import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh  = async()=>{
        try{
            const response = await axios.get(
                "/refresh",
                { withCredentials: true }
            );
            setAuth(prev=>{
                console.log("Previous auth state: ",JSON.stringify(prev)),
                console.log("New access token secret: ", response.data.accessToken)

               return {
                    ...prev, 
                    roles: response.data.roles,
                    accessToken:response.data.accessToken
                }
            })

            return response.data.accessToken;
        }catch(err){
            console.error("Refresh Token error: ", err);
        }
    }

    return refresh

}

export default useRefreshToken