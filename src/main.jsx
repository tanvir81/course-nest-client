import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthProvider from "./contexts/AuthProvider.jsx";

import Home from "./components/Home/Home.jsx";
import AllCourses from "./components/Courses/AllCourses.jsx";
import CourseDetails from "./components/Courses/CourseDetails.jsx";
import AddCourse from "./components/Courses/AddCourse.jsx";
import MyCourses from "./components/Courses/MyCourses.jsx";
import MyEnrolledCourses from "./components/Courses/MyEnrolledCourses.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import PrivateRoute from "./components/Route/PrivateRoute.jsx";
import UpdateCourse from "./components/Courses/UpdateCourse.jsx";
import RootLayout from "./Layout/RootLayout.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "courses", element: <AllCourses /> },
      {
        path: "courses/:id",
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/courses/${params.id}`);
          return res.json();
        },
        element: (
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "add-course",
        element: (
          <PrivateRoute>
            <AddCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "my-courses",
        element: (
          <PrivateRoute>
            <MyCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "update-course/:id",
        element: (
          <PrivateRoute>
            <UpdateCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "enrolled",
        element: (
          <PrivateRoute>
            <MyEnrolledCourses />
          </PrivateRoute>
        ),
      },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
