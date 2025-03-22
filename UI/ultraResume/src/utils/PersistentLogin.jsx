import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const PersistentLogin = ({ children })=>{
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    useEffect(()=>{
            const verifyRefreshToken = async ()=>{
                try{
                    await refresh();
                }catch(err){
                    console.error(err);
                }finally{
                    setIsLoading(false)
                }
            }

            !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
            
    }, [auth?.accessToken, refresh])

    useEffect(()=>{
        console.log(`isLoading: ${isLoading}`)
        console.log(`accessToken: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            { isLoading 
                ? <Loading />
                : children
            }
        </>
    )
}

export default PersistentLogin;