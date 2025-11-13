import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { Link } from "react-router";

const MyCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/courses?owner=${user.email}`)
        .then((res) => setCourses(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/courses/${id}`);
      toast.success("Course deleted successfully!");
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete course");
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      await axios.patch(`http://localhost:3000/courses/${id}`, {
        isFeatured: !currentStatus,
      });
      toast.success("Course updated!");
      setCourses(
        courses.map((c) =>
          c._id === id ? { ...c, isFeatured: !currentStatus } : c
        )
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to update course");
    }
  };

  if (!courses.length) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/pattern.jpg')" }}
      >
        <p className="text-lg text-gray-700">
          You haven't added any courses yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/pattern.jpg')" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">My Courses</h1>
        </div>

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
                    {course.duration} hour
                  </span>
                </div>

                <p className="mt-2">{course.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold">${course.price}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleToggleFeatured(course._id, course.isFeatured)
                      }
                      className="btn btn-sm btn-outline"
                    >
                      {course.isFeatured ? "Unfeature" : "Feature"}
                    </button>
                    <Link
                      to={`/update-course/${course._id}`}
                      className="btn btn-sm"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
