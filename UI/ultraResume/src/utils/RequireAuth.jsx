import { useLocation, Navigate} from "react-router";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children, allowedRoles })=>{
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role=> allowedRoles?.includes(role))
            ? children
            : <Navigate to='/' state={{ from:location }} replace />
    )
}

export default RequireAuth;