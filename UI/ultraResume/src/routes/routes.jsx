import Auth from "../views/Auth";
import Register from "../views/Register";
import Dashboard from "../views/Dashboard";
import Settings from "../views/Settings";
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
        path: 'dashboard',
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <Settings />
            }
        ]
    }
]

export default routes;