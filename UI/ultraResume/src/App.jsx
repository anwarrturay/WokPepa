import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from './routes/Routes';
import Splash from "./views/components/Splash";
import useAuth from "./hooks/useAuth";
const router = createBrowserRouter(routes);
function App() {
  
  const { showSplash } = useAuth();
  return (
    showSplash ? <Splash /> : <RouterProvider path="*" router={router} />
  );
}

export default App;