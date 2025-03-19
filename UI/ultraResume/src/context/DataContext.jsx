import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true); 
    const [user, setUser] = useState();
    const [formData, setFormData] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = (token, id) => {
        setAccessToken(token);
        setUserId(id);
    };

    const logout = () => {
        setAccessToken(null);
        setUserId(null);
    };


    return <DataContext.Provider
                value = {{
                    user,setUser,
                    loading, setLoading,
                    formData, setFormData,
                    accessToken,
                    userId,
                    login,
                    logout
                }}
            >{ children }</DataContext.Provider>
}

export default DataContextProvider;