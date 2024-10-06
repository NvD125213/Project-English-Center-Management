import React from "react";
import ErrorPage from "../components/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import Post from "../pages/Post/Post";
import HomeIngre from "../pages/Home";
import Subject from "../pages/Admin/Subject/Subject";
import Home from "../pages/Home/Home";
import Admin from "../pages/Admin";
import Login from "../pages/Login/Login";
import Exam from "../pages/Admin/Exam/Exam"
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "post",
            element: <Post />,
          },
          {
            path: "",
            element: <HomeIngre/>
          },
          {
            path: "login",
            element: <Login />
          }
        ],
    },
    {
      path: "/admin",
      element: <Admin />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "subject",
          element: <Subject />,
        },
        {
          path: "exam",
          element: <Exam />,
        },
    
      ],
      
    }
])

export default router