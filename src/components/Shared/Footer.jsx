import React from "react";
import { Link } from "react-router";
import { FaYoutube, FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-black text-primary-content p-10">
      <aside>
        <Link to="/" className="text-4xl font-bold text-yellow-500">
          CourseNest
        </Link>
        <p>
          Copyright © {new Date().getFullYear()} - CourseNest All right reserved
        </p>
      </aside>

      <nav>
        <div className="grid grid-flow-col gap-4 text-xl text-gray-700">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTwitterX className="hover:text-blue-500 transition duration-200" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="hover:text-red-600 transition duration-200" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="hover:text-blue-700 transition duration-200" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
