import Auth from "../views/Auth";
import Register from "../views/Register";
import Layout from "../views/Layout";
import CreateNewResume from "../views/createNewResume";
import RequireAuth from "../utils/RequireAuth";
import Roles_List from "../utils/Roles_List"
import AdminUI from "../views/admin/AdminUI";
import PersistentLogin from "../utils/PersistentLogin";
const routes = [
    {
        path: '/',
        element: <Auth />
    },
    {
        path: 'register',
        element: <Register />
    },
    {
        path: 'user-resume-dashboard',
        element: (
            <PersistentLogin>
                <RequireAuth allowedRoles={[Roles_List.USER]}>
                    <Layout />
                </RequireAuth>
            </PersistentLogin>
        ) 
    },
    {
        path: 'create-new-resume',
        element: (
            <PersistentLogin>
                <RequireAuth allowedRoles={[Roles_List.USER]}> 
                        <CreateNewResume />
                </RequireAuth> 
            </PersistentLogin>
        )
    },
    {
        path: '/admin-ui',
        element: (
            <PersistentLogin>
                <RequireAuth allowedRoles={[Roles_List.ADMIN]}>
                    <AdminUI />
                </RequireAuth>
            </PersistentLogin>
        )
    }
]

export default routes;