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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Courses</h1>

      {/* Typed Category Filter */}
      <form onSubmit={handleFilter} className="mb-6 flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Enter category (e.g. Design)"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary">
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

      {/*  loading */}
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
                <p>
                  {course.category} • {course.duration}
                </p>
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
  );
};

export default AllCourses;
