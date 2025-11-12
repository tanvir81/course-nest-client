// src/components/NotFound.jsx
import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <img src="/Notfound.jpg" alt="404 Not Found" className="w-150 mb-6" />
      {/* <h1 className="text-3xl font-bold mb-2">Page Not Found</h1> */}
      <p className="text-gray-600 mb-6">
        {/* Oops! The page you’re looking for doesn’t exist. */}
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
