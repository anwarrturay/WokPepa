import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from './routes/Routes';
import Splash from "./views/Splash";
const router = createBrowserRouter(routes);
function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    showSplash ? <Splash setShowSplash={setShowSplash} /> : <RouterProvider path="*" router={router} />
  );
}

export default App;