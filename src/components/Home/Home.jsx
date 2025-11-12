import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};
// for cards

const cardContainer = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2, // stagger by index
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

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
      <section className="relative min-h-[70vh] flex flex-col md:flex-row mt-12">
        {/* Hero Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center items-center md:order-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src="/hero.jpg"
            alt="CourseNest Hero"
            className="w-full h-64 md:h-full object-cover rounded-xl"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="w-full md:w-1/2 px-6 md:px-12 text-center md:text-left flex flex-col justify-center  py-8 md:py-0"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold leading-tight text-gray-900"
            variants={item}
          >
            Welcome to <span className="text-yellow-500">CourseNest</span>
          </motion.h1>

          <motion.p
            className="mt-4 md:mt-6 text-base md:text-lg text-gray-700"
            variants={item}
          >
            Explore, enroll, and grow with expert-led courses.
          </motion.p>

          <motion.div
            className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            variants={item}
          >
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
          </motion.div>
        </motion.div>
      </section>
      {/* Popular Courses */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Popular Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredCourses.map((course, i) => (
            <motion.div
              key={course._id}
              className="flex bg-base-100 shadow rounded-lg overflow-hidden h-72 cursor-pointer"
              variants={cardContainer}
              initial="hidden"
              animate="visible"
              custom={i}
              whileHover={{ y: -5, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
            >
              {/* Left Image */}
              <motion.div
                className="w-1/2 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Right Content */}
              <div className="w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {course.category} • {course.duration}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold text-yellow-600">
                    ${course.price}
                  </span>
                  <motion.a
                    href={`/courses/${course._id}`}
                    className="btn btn-outline btn-sm"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    View Details
                  </motion.a>
                </div>
              </div>
            </motion.div>
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
