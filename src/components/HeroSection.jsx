import React from "react";
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

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col md:flex-row mt-12 bg-base-100 text-base-content">
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
        className="w-full md:w-1/2 px-6 md:px-12 text-center md:text-left flex flex-col justify-center py-8 md:py-0"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl md:text-5xl font-bold leading-tight"
          variants={item}
        >
          Welcome to <span className="text-yellow-500">CourseNest</span>
        </motion.h1>

        <motion.p className="mt-4 md:mt-6 text-base md:text-lg" variants={item}>
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
            href="/register"
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-100 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
