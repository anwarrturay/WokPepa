import { createBrowserRouter, RouterProvider } from "react-router";
import routes from './routes/routes';
import Splash from "./views/components/Splash";
import useAuth from "./hooks/useAuth";
const router = createBrowserRouter(routes);
function App() {
  // const { showSplash } = useAuth();
  // showSplash ? <Splash /> : 
  return (
    <RouterProvider path="*" router={router} />
  );
}

export default App;