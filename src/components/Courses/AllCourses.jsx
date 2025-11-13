import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Spinner from "../Spinner";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchCourses();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/pattern.jpg')" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">All Courses</h1>
        </div>

        {/* Filter Controls */}
        <form
          onSubmit={handleFilter}
          className="mb-8 flex flex-wrap justify-end items-center gap-3"
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

          <button type="submit" className="btn bg-yellow-400">
            Filter
          </button>
          <button
            type="button"
            className="btn btn-outline"
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
            {courses.map((course) => (
              <div key={course._id} className="card bg-base-100 shadow">
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
                    <span className="bg-yellow-200 text-gray-800 text-sm px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="bg-green-200 text-gray-800 text-sm px-2 py-1 rounded-full">
                      {course.duration}
                    </span>
                  </div>
                  <p>{course.description}</p>
                  <div className="card-actions justify-between items-center">
                    <span className="font-semibold">${course.price}</span>
                    <Link
                      to={`/courses/${course._id}`}
                      className="btn btn-outline btn-sm"
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
