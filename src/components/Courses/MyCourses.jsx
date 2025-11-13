import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const MyCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

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
      <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-neutral dark:to-base-300 animate-[pulse_6s_ease-in-out_infinite]" />
        <p className="relative z-10 text-lg opacity-70">
          You haven't added any courses yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 bg-base-100 text-base-content relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-neutral dark:to-base-300 animate-[pulse_6s_ease-in-out_infinite]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-10" data-aos="fade-down">
          <h1 className="text-4xl font-bold">My Courses</h1>
        </div>

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
                    {course.duration} hour
                  </span>
                </div>

                <p className="mt-2">{course.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold text-yellow-600">
                    ${course.price}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleToggleFeatured(course._id, course.isFeatured)
                      }
                      className="btn bg-yellow-400 rounded-lg hover:bg-yellow-600 text-black "
                    >
                      {course.isFeatured ? "Unfeature" : "Feature"}
                    </button>
                    <Link
                      to={`/update-course/${course._id}`}
                      className="btn bg-yellow-400 rounded-lg hover:bg-yellow-600 text-black "
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="btn bg-red-500 rounded-lg text-black"
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
