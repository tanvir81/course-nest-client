import React, { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const NotFound = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-base-100 text-base-content">
      <img
        src="/Notfound.jpg"
        alt="404 Not Found"
        className="w-150 mb-6"
        data-aos="zoom-in"
      />
      <h1 className="text-3xl font-bold mb-2" data-aos="fade-up">
        Page Not Found
      </h1>
      <p
        className="text-red-500 mb-6 font-semi-bold text-2xl"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="btn bg-yellow-400 rounded-lg hover:bg-yellow-600 text-black"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
