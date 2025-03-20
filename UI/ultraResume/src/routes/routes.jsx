import Auth from "../views/Auth";
import Register from "../views/Register";
import Layout from "../views/Layout";
import CreateNewResume from "../views/createNewResume";
import RequireAuth from "../utils/RequireAuth";
import Roles_List from "../utils/Roles_List"
// import AdminUI from "../views/admin/AdminUI";
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
            <RequireAuth allowedRoles={[Roles_List.USER]}>
                <Layout />
            </RequireAuth>
        ) 
    },
    {
        path: 'create-new-resume',
        element: (
            <RequireAuth allowedRoles={[Roles_List.USER]}>
                <CreateNewResume />
            </RequireAuth>
        )
    }
    // ,
    // {
    //     path: '/admin-ui',
    //     element: (
    //         <RequireAuth allowedRoles={[Roles_List.ADMIN]}>
    //             <AdminUI />
    //         </RequireAuth>
    //     )
    // }
]

export default routes;