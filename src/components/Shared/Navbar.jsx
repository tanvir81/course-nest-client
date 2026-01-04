import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import {
  HiMenuAlt3,
  HiX,
  HiChevronDown,
  HiUserCircle,
  HiLogout,
  HiViewGrid,
  HiArrowRight,
} from "react-icons/hi";
import Avatar from "./Avatar";

const Navbar = ({ setTheme }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Lock for Mobile Menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-black transition-all duration-300 uppercase tracking-widest ${
      isActive
        ? scrolled || isOpen ? "text-black scale-110" : "text-white scale-110"
        : scrolled || isOpen ? "text-black/60 hover:text-black hover:scale-105" : "text-white/70 hover:text-white hover:scale-105"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/courses" className={navLinkClass}>
        Courses
      </NavLink>
      <NavLink to="/about" className={navLinkClass}>
        About
      </NavLink>
      <NavLink to="/contact" className={navLinkClass}>
        Contact
      </NavLink>
      {user && (
        <>
          <NavLink to="/enrolled" className={navLinkClass}>
            Learning
          </NavLink>
          <NavLink to="/add-course" className={navLinkClass}>
            Teach
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav
      className={`px-6 md:px-12 transition-[padding,background-color] duration-500 font-['Outfit'] antialiased ${
        isOpen
          ? "!bg-white !transition-none fixed top-0 left-0 right-0 z-[1000] !backdrop-blur-none py-5"
          : scrolled
          ? "glass-nav py-3 shadow-sm"
          : "fixed top-0 w-full z-50 py-6 bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group flex-1">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-all duration-500 group-hover:rounded-[1.2rem] group-hover:rotate-12 ${scrolled || isOpen ? "bg-black text-white" : "bg-white text-black"}`}>
            CN
          </div>
          <span className={`text-xl font-black tracking-tighter uppercase ${scrolled || isOpen ? "text-black" : "text-white"}`}>
            Course<span className={`italic ${scrolled || isOpen ? "text-black/40" : "text-white/50"}`}>Nest</span>
          </span>
        </Link>

        {/* Center Nav (Desktop) */}
        <div className="hidden lg:flex items-center justify-center flex-[2] space-x-6">
          {navLinks}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center justify-end gap-8 flex-1">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className={`w-11 h-11 rounded-2xl border-2 overflow-hidden transition-all duration-500 shadow-lg ${scrolled || isOpen ? "border-black/5 group-hover:border-black shadow-black/5" : "border-white/20 group-hover:border-white shadow-white/10"}`}>
                  <Avatar
                    user={user}
                    className="w-full h-full object-cover"
                  />
                </div>
                <HiChevronDown className={`group-hover:translate-y-1 transition-transform duration-300 ${scrolled || isOpen ? "text-black" : "text-white"}`} />
              </div>
              <ul
                tabIndex={0}
                className="mt-6 z-[200] p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] menu menu-sm dropdown-content bg-white rounded-[2rem] w-64 border border-black/5 animate-in fade-in slide-in-from-top-4 duration-300"
              >
                <li className="px-4 py-3 mb-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black">
                      Authorized Persona
                    </span>
                    <span className="text-sm font-bold truncate max-w-[150px] text-black">
                      {user?.displayName || "Guest"}
                    </span>
                  </div>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="py-4 px-5 rounded-2xl flex items-center gap-3 font-bold hover:bg-neutral-50 transition-all text-black"
                  >
                    <HiUserCircle className="text-xl" /> Persona Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-courses"
                    className="py-4 px-5 rounded-2xl flex items-center gap-3 font-bold hover:bg-neutral-50 transition-all text-black"
                  >
                    <HiViewGrid className="text-xl" /> Instructor Desk
                  </Link>
                </li>
                <div className="h-px bg-black/5 my-2 mx-4"></div>
                <li>
                  <button
                    onClick={logout}
                    className="py-4 px-5 text-red-500 hover:bg-red-50 rounded-2xl flex items-center gap-3 font-black transition-all"
                  >
                    <HiLogout className="text-xl" /> Release Session
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <Link
                to="/login"
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${scrolled || isOpen ? "text-black hover:text-neutral-400" : "text-white hover:text-white/70"}`}
              >
                Access
              </Link>
              <Link
                to="/register"
                className={`h-12 px-8 rounded-full flex items-center justify-center font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl ${scrolled || isOpen ? "bg-black text-white hover:bg-neutral-800 shadow-black/10" : "bg-white text-black hover:bg-neutral-200 shadow-white/10"}`}
              >
                Initiate Journey
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden w-12 h-12 flex items-center justify-center text-2xl border border-black/5 rounded-xl hover:bg-black hover:text-white transition-all duration-500"
          onClick={() => setIsOpen(true)}
        >
          <HiMenuAlt3 />
        </button>
      </div>

      {/* Hardened Opaque Slide-in Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-[9999] ${
          isOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Dark Solid Backdrop */}
        <div
          className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Solid Pure White Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[300px] !bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "#ffffff", opacity: 1 }}
        >
          <div className="flex flex-col h-full p-8 font-['Outfit'] !bg-white">
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">
                Navigation
              </span>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <HiX className="text-xl text-black" />
              </button>
            </div>

            {/* Core Registry (Nav Links) */}
            <div className="flex flex-col gap-1 mb-8 !bg-white">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8B5CF6] mb-2 px-2">
                Primary Registry
              </span>
              {["Home", "Courses", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="px-4 py-3 text-2xl font-black tracking-tight text-black hover:text-neutral-500 transition-all border-b border-black/5 last:border-0 !bg-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                  <span className="text-neutral-300">.</span>
                </Link>
              ))}
            </div>

            {/* Account Terminal (User actions) */}
            <div className="mt-auto -mx-8 p-8 border-t border-black/5 space-y-6 bg-white">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8B5CF6]">
                Identity / Terminal
              </span>
              {user ? (
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 rounded-full border border-black/5 overflow-hidden shadow-sm">
                      <Avatar
                        user={user}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-black truncate max-w-[140px]">
                        {user?.displayName || "Member"}
                      </span>
                      <span className="text-[10px] text-neutral-400 truncate max-w-[140px]">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 text-sm font-black text-black hover:text-[#8B5CF6] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <HiUserCircle className="text-xl" /> Profile
                  </Link>
                  <Link
                    to="/my-courses"
                    className="flex items-center gap-3 text-sm font-black text-black hover:text-[#8B5CF6] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <HiViewGrid className="text-xl" /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 text-sm font-black text-red-500 mt-2"
                  >
                    <HiLogout className="text-xl" /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link
                    to="/login"
                    className="w-full py-4 text-center font-black border border-black/10 rounded-2xl text-black hover:bg-black hover:text-white transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full py-4 text-center font-black bg-black text-white rounded-2xl shadow-xl shadow-black/10"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
