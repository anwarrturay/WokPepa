import Auth from "../views/components/Auth";
import Register from "../views/components/Register";
import ForgotPassword from "../views/components/ForgotPassword";
import ResetPassword from "../views/components/ResetPassword";
import Layout from "../views/components/Layout";
import CreateNewResume from "../views/components/CreateNewResume";
import RequireAuth from "../utils/RequireAuth";
import Roles_List from "../utils/Roles_List"
import AdminUI from "../views/admin/AdminUI";
import PersistentLogin from "../utils/PersistentLogin";
import Preferences from "../views/settings/components/Preferences"
import Account from "../views/settings/components/Account";
import PrivacyPolicy from "../views/settings/components/PrivacyPolicy";
import HelpSupport from "../views/settings/components/help&Support/HelpSupport";
import Settings from "../views/settings/components/Settings";
import GeneratePdf from "../views/components/new-resume/resumepdf/GeneratePdf";
import OAuthRedirect from "../views/components/OAuthRedirect";
const routes = [
    {
        path: '/',
        element: <Auth />
    },
    {
        path: '/:token',
        element: <Auth />
    },
    {
        path: 'register',
        element: <Register />
    },
    {
        path: "forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "reset-password",
        element: <ResetPassword />
    },
    {
        path: "oauth-redirect",
        element: <OAuthRedirect />
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
    },
    {
        path: '/generate-pdf',
        element: (
            <PersistentLogin>
                <RequireAuth allowedRoles={[Roles_List.USER]}>
                    <GeneratePdf />
                </RequireAuth>
            </PersistentLogin>
        )
    }
]

export default routes;