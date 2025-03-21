import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";

const useAxiosPrivate = ()=>{
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(()=>{

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers["Authorization"]){
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
                }
                return config
            },
            (error)=> Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response=> response,
            async (error) =>{
                const prevRequest = error?.config
                if(error?.response?.status === 403 && !prevRequest?.sent){ // The !prevRequest.sent ensures that the request is only retried once after refreshing the token.
                    prevRequest.sent = true; // This prevents the request from being retried multiple times if the token is still invalid after refresh.
                    const newAccessToken = await refresh(); // getting the accesstoken secret from the useRefresh module.
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; // attaching the accesstoken secret into the authorization headers.
                    return axiosPrivate(prevRequest); // retries the failed request with the updated authorization headers.So here the retried request is sent to the server with the updated token.And this time around it's gonna be successfully.
                }
                return Promise.reject(error)
            }
        )

        // Clean up function.
        return ()=>{
            axiosPrivate.interceptors.request.eject(requestIntercept); // Removing the requestInterceptor.
            axiosPrivate.interceptors.response.eject(responseIntercept); // Removing the responseInterceptor.
        }
    }, [auth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate