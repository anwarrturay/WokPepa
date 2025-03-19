import Auth from "../views/Auth";
import Register from "../views/Register";
import Settings from "../views/Settings";
import Layout from "../views/Layout";
import CreateNewResume from "../views/createNewResume";
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
        element: <Layout />
    },
    {
        path: 'create-new-resume',
        element: <CreateNewResume />
    }
]

export default routes;