import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Spinner from "../Spinner";
import AOS from "aos";
import "aos/dist/aos.css";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const url = categoryInput
        ? `http://localhost:3000/courses?category=${categoryInput}`
        : "http://localhost:3000/courses";
      const res = await axios.get(url);
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchCourses();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-neutral dark:to-base-300 animate-[pulse_6s_ease-in-out_infinite]" />

      <div className="relative z-10 max-w-7xl w-full px-4">
        {/* Heading */}
        <div className="text-center mb-10 mt-10" data-aos="fade-down">
          <h1 className="text-4xl font-bold">All Courses</h1>
        </div>

        {/* Filter Controls */}
        <form
          onSubmit={handleFilter}
          className="mb-8 flex flex-wrap justify-end items-center gap-3"
          data-aos="fade-down"
        >
          <select
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">All Categories</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="FullStack">FullStack</option>
            <option value="DataScience">DataScience</option>
            <option value="Photography">Photography</option>
          </select>

          <button type="submit" className="btn bg-yellow-400 text-black">
            Filter
          </button>
          <button
            type="button"
            className="btn text-black bg-yellow-400 rounded-lg hover:bg-yellow-600 "
            onClick={() => {
              setCategoryInput("");
              fetchCourses();
            }}
          >
            Reset
          </button>
        </form>

        {/* Course Grid */}
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={course._id}
                className="card bg-base-200 text-base-content shadow"
                data-aos="fade-right"
                data-aos-delay={index * 100}
              >
                <figure>
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{course.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-yellow-200 text-gray-800 dark:text-gray-900 text-sm px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="bg-green-200 text-gray-800 dark:text-gray-900 text-sm px-2 py-1 rounded-full">
                      {course.duration}
                    </span>
                  </div>
                  <p className="text-sm mt-2">{course.description}</p>
                  <div className="card-actions justify-between items-center mt-4">
                    <span className="font-semibold text-yellow-600">
                      ${course.price}
                    </span>
                    <Link
                      to={`/courses/${course._id}`}
                      className="btn text-black bg-yellow-400 rounded-lg hover:bg-yellow-600 "
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
