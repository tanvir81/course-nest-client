import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";

const Navbar = ({ setTheme }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass =
    "px-3 py-2 text-base-content hover:text-yellow-500 hover:scale-105 transition-transform duration-200";

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/courses" className={navLinkClass}>
        Courses
      </NavLink>
      {user && (
        <>
          <NavLink to="/my-courses" className={navLinkClass}>
            My Courses
          </NavLink>
          <NavLink to="/enrolled" className={navLinkClass}>
            Enrolled
          </NavLink>
          <NavLink to="/add-course" className={navLinkClass}>
            Add Course
          </NavLink>
        </>
      )}
    </>
  );

  const avatarSrc =
    user?.photoURL || "https://i.postimg.cc/3x3QzSGq/profile.png";

  return (
    <nav className="bg-base-100 text-base-content shadow-md px-6 py-3 transition-colors duration-300">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-yellow-500">
          CourseNest
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center space-x-4">
          {navLinks}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <img
                src={avatarSrc}
                alt="User"
                className="w-10 h-10 rounded-full border object-cover"
              />
              <button
                onClick={logout}
                className="px-4 py-2 text-black bg-yellow-400 rounded-lg hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 transition"
            >
              Login
            </NavLink>
          )}

          {/* Theme Toggle part */}
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn text-black  bg-yellow-400 rounded-lg hover:bg-yellow-600"
            >
              Theme
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
            >
              <li>
                <button onClick={() => setTheme("light")}>☀️ Light</button>
              </li>
              <li>
                <button onClick={() => setTheme("dark")}>🌙 Dark</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-base-content focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown part*/}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-2">
          {navLinks}
          {user ? (
            <>
              <div className="flex items-center gap-3 px-4">
                <img
                  src={avatarSrc}
                  alt="User"
                  className="w-10 h-10 rounded-full border object-cover"
                />
                <span className="text-sm font-medium">{user.displayName}</span>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-white bg-yellow-400 rounded hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 text-white bg-yellow-400 rounded hover:bg-yellow-500 transition text-center"
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
