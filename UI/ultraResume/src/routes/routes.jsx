import Auth from "../views/Auth";
import Register from "../views/Register";
import Layout from "../views/Layout";
import CreateNewResume from "../views/createNewResume";
import RequireAuth from "../utils/RequireAuth";
import Roles_List from "../utils/Roles_List"
import AdminUI from "../views/admin/AdminUI";
import PersistentLogin from "../utils/PersistentLogin";
import Preferences from "../views/settings/Preferences";
import Account from "../views/settings/Account";
import PrivacyPolicy from "../views/settings/PrivacyPolicy";
import HelpSupport from "../views/settings/HelpSupport";
import Settings from "../views/settings/Settings";
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
        path: 'settings',
        element: (
            <PersistentLogin>
                <RequireAuth allowedRoles={[Roles_List.USER]}>
                    <Settings />
                </RequireAuth>
            </PersistentLogin>
        )
    },
    {
        path: 'preferences',
        element: (
            <PersistentLogin>
                <RequireAuth allowedRoles={[Roles_List.USER]}>
                    <Preferences />
                </RequireAuth>
            </PersistentLogin>
        )
    },
    {
        path: 'account',
        element: (
            <PersistentLogin>
                <RequireAuth allowedRoles={[Roles_List.USER]}>
                    <Account />
                </RequireAuth>
            </PersistentLogin>
        )
    },
    {
        path: 'help-support',
        element: (
            <PersistentLogin>
                <RequireAuth allowedRoles={[Roles_List.USER]}>
                    <HelpSupport />
                </RequireAuth>
            </PersistentLogin>
        )
    },
    {
        path: 'privacy-policy',
        element: (
            <PersistentLogin>
                <RequireAuth allowedRoles={[Roles_List.USER]}>
                    <PrivacyPolicy />
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