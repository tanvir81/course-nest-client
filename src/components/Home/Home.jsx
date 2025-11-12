import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses")
      .then((res) => {
        const featured = res.data.filter((c) => c.isFeatured).slice(0, 6);
        setFeaturedCourses(featured);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-12 px-4 md:px-8">
      {/* Hero */}

      <section
        className="relative min-h-[70vh] rounded-xl flex items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        {/* Content */}
        <motion.div
          className="px-6 md:px-16 text-center md:text-left max-w-xl text-white"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Welcome to <span className="text-yellow-400">CourseNest</span>
          </h1>
          <p className="mt-6 text-lg text-gray-200">
            Explore, enroll, and grow with expert-led courses.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.a
              href="/courses"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
              whileHover={{ scale: 1.05 }}
            >
              Explore Courses
            </motion.a>
            <motion.a
              href="/login"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
              whileHover={{ scale: 1.05 }}
            >
              Get Started
            </motion.a>
          </div>
        </motion.div>
      </section>
      {/* Popular Courses */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Popular Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <div key={course._id} className="card bg-base-100 shadow">
              <figure>
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{course.title}</h3>
                <p className="text-sm">
                  {course.category} • {course.duration}
                </p>
                <div className="card-actions justify-between items-center">
                  <span className="font-semibold">${course.price}</span>
                  <a
                    href={`/courses/${course._id}`}
                    className="btn btn-outline btn-sm"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Why Choose Us */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-base-200">Expert mentors</div>
          <div className="p-6 rounded-xl bg-base-200">
            Project-based learning
          </div>
          <div className="p-6 rounded-xl bg-base-200">
            Career-focused tracks
          </div>
        </div>
      </section>
      {/* Top Instructors */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Top Instructors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-base-200">Instructor A</div>
          <div className="p-6 rounded-xl bg-base-200">Instructor B</div>
          <div className="p-6 rounded-xl bg-base-200">Instructor C</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
