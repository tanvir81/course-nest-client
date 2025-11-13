import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className="px-3 py-2 text-gray-700 hover:text-yellow-500 hover:scale-105 transition-transform duration-200"
      >
        Home
      </NavLink>
      <NavLink
        to="/courses"
        className="px-3 py-2 text-gray-700 hover:text-yellow-500 hover:scale-105 transition-transform duration-200"
      >
        Courses
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/my-courses"
            className="px-3 py-2 text-gray-700 hover:text-yellow-500 hover:scale-105 transition-transform duration-200"
          >
            My Courses
          </NavLink>
          <NavLink
            to="/enrolled"
            className="px-3 py-2 text-gray-700 hover:text-yellow-500 hover:scale-105 transition-transform duration-200"
          >
            Enrolled
          </NavLink>
          <NavLink
            to="/add-course"
            className="px-3 py-2 text-gray-700 hover:text-yellow-500 hover:scale-105 transition-transform duration-200"
          >
            Add Course
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo on the left */}
        <Link to="/" className="text-2xl font-bold text-yellow-500">
          CourseNest
        </Link>

        <div className="hidden md:flex flex-1 justify-center space-x-4">
          {navLinks}
        </div>

        <div className="hidden md:flex items-center">
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 text-white bg-yellow-400 rounded hover:bg-yellow-700 transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 text-white bg-yellow-400 rounded hover:bg-yellow-600 transition"
            >
              Login
            </NavLink>
          )}

          {/* Theme toggle */}
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-2">
          {navLinks}
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
