import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
// import SignUpPage from "./pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      // {
      //   path: '/signup',
      //   element: <SignUpPage />,
      // },
    ],
  },
]);

const App = () => {
  return (
    <div className="h-100" id="chat">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
