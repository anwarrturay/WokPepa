import { useLocation, Navigate} from "react-router";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
const RequireAuth = ({ children, allowedRoles })=>{
    const { auth } = useAuth();
    const location = useLocation();

    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const roles = decoded?.UserInfo?.roles || [];

    return (
        roles?.find(role=> allowedRoles?.includes(role))
            ? children
            : <Navigate to='/' state={{ from:location }} replace />
    )
}

export default RequireAuth;