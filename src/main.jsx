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
import CoursePlayer from "./components/Courses/CoursePlayer.jsx";
import RootLayout from "./Layout/RootLayout.jsx";
import NotFound from "./components/NotFound.jsx";
import Profile from "./components/Auth/Profile.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import GlobalLoader from "./components/Shared/GlobalLoader.jsx";
const API_URL = import.meta.env.VITE_API_BASE_URL || "https://course-nest-server-six.vercel.app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "courses", element: <AllCourses /> },
      {
        path: "courses/:id",
        loader: async ({ params }) => {
          if (!params.id || params.id === "undefined") {
            throw new Response("Invalid Course Identifier", { status: 400 });
          }
          try {
             const res = await fetch(`${API_URL}/courses/${params.id}`);
             if (!res.ok) throw new Response("Course Not Found", { status: 404 });
             const data = await res.json();
             return data;
          } catch (err) {
             if (err instanceof Response) throw err;
             throw new Response("Failure to Resolve Data", { status: 500 });
          }
        },
        element: <CourseDetails />,
        hydrateFallbackElement: <GlobalLoader message="Loading Details..." />,
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
      { path: "enrolled", element: <PrivateRoute><MyEnrolledCourses /></PrivateRoute> },
      { path: "about", element: <AboutUs /> },
      { path: "contact", element: <ContactUs /> },

      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "courses/:id/learn",
    loader: async ({ params }) => {
      if (!params.id || params.id === "undefined") {
        throw new Response("Learning Module Not Specified", { status: 400 });
      }
      try {
         const res = await fetch(`${API_URL}/courses/${params.id}`);
         if (!res.ok) throw new Response("Unit Access Denied", { status: 404 });
         const data = await res.json();
         return data;
      } catch (err) {
         if (err instanceof Response) throw err;
         throw new Response("Learning Matrix Offline", { status: 500 });
      }
    },
    element: (
      <PrivateRoute>
        <CoursePlayer />
      </PrivateRoute>
    ),
    hydrateFallbackElement: <GlobalLoader message="Initializing Learning Environment..." />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
