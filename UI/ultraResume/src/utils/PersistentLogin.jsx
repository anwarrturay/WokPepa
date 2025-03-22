import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const PersistentLogin = ({ children })=>{
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(()=>{
        let isMounted = true;
            const verifyRefreshToken = async ()=>{
                try{
                    await refresh() // generates a new accesstoken secret key.
                }catch(err){
                    console.error(err); // logging the error.
                }finally{
                    isMounted && setIsLoading(false) // setting isLoading back to false.
                }
            }
            !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false); // so if the accesstoken is undefined or null then generate a new accesstoken secret else set isLoading to false.

            return ()=>{
                isMounted = false
            }
    }, [])

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