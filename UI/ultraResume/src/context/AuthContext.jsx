import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) =>{
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist") || false))
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("account");

    return(
        <AuthContext.Provider value={{
            auth, 
            setAuth, 
            persist, 
            setPersist,                    
            isOpen,
            setIsOpen,
            activeSection,
            setActiveSection}}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthContext;
