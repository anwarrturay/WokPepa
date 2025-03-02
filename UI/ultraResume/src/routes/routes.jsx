import Auth from "../views/Auth";
import Register from "../views/Register";
import Sidebar from "../views/Sidebar";
import Settings from "../views/Settings";
import Layout from "../views/Layout";
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
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Settings />
            }
        ]
    }
]

export default routes;