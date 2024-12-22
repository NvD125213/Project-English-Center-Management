import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import Post from "../pages/Post/Post";
import HomeIngre from "../pages/Home";
import Subject from "../pages/Admin/Subject/Subject";
import Home from "../pages/Home/Home";
import Admin from "../pages/Admin";
import Login from "../pages/Login/Login";
import Exam from "../pages/Admin/Exam/Exam";
import Question from "../pages/Admin/DetailExam/Question";
import PrivateRoute from "./privateRoute";
import TestOnlinePage from "../pages/TestOnline";
import DetailTest from "../pages/DetailTest";
import DetailHistoryExam from "../pages/HistoryExam";
import Blog from "../pages/Admin/Blog/Blog";
import MenuList from "../pages/Admin/Menu/Menu";
import UserManagement from "../pages/Admin/User";
import MenuDetail from "../pages/MenuDetail";
import BlogDetail from "../pages/DetailBlog";
import HistoryManagement from "../pages/HistoryManage";
import DashBoard from "../pages/Admin/Dashboard";
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
        element: <HomeIngre />,
      },
      {
        path: "/:menuName/:subLink",
        element: <MenuDetail />,
      },
      {
        path: "/:blogName",
        element: <BlogDetail />,
      },
      {
        path: "auth",
        element: <Login />,
      },
      {
        path: "test-online",
        element: <TestOnlinePage />,
      },
      {
        path: "history-management",
        element: <HistoryManagement />,
      }
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute rolesAllowed={[1]}> {/* Chỉ cho phép admin */}
        <Admin />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "subject",
        element: (
          <PrivateRoute rolesAllowed={[1]}>
            <Subject />
          </PrivateRoute>
        ),
      },
      {
        path: "",
        element: (
          <PrivateRoute rolesAllowed={[1]}>
            <DashBoard />
          </PrivateRoute>
        ),
      },
      {
        path: "exam",
        element: (
          <PrivateRoute rolesAllowed={[1]}>
            <Exam />
          </PrivateRoute>
        ),
      },
      {
        path: "detailExam",
        element: (
          <PrivateRoute rolesAllowed={[1]}>
            <Question />
          </PrivateRoute>
        ),
      },
      {
        path: "blog",
        element: (
          <PrivateRoute rolesAllowed={[1]}>
            <Blog />
          </PrivateRoute>
        ),
      },
      {
        path: "menu",
        element: (
          <PrivateRoute rolesAllowed={[1]}>
            <MenuList />
          </PrivateRoute>
        ),
      },
      {
        path: "user",
        element: (
          <PrivateRoute rolesAllowed={[1]}>
            <UserManagement />
          </PrivateRoute>
        ),
      }
    ],
  },
  {
    path: '/stm-test/:examId',
    element: (
      <DetailTest />
    )
  },
  {
    path: "history-result/:historyId/:examId",
    element: <DetailHistoryExam />
  }
]);

export default router;
