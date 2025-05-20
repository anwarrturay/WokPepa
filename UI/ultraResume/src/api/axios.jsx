import axios from "axios";
export const BASE_URL = "http://localhost:3500"
// export const BASE_URL = "https://wokpepa-api-service.onrender.com"

export default axios.create({
    baseURL: BASE_URL
})

// Creating an instance of axios.
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Content-Type': 'application/json'
    },
    withCredentials: true  
})