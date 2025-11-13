import React, { useEffect, useState } from "react";
import axios from "axios";

const PopularCourses = () => {
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
    <section className="px-4 md:px-10 py-6">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">
        Popular Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredCourses.map((course) => (
          <div
            key={course._id}
            className="flex bg-base-100 shadow rounded-lg overflow-hidden h-72 cursor-pointer"
          >
            {/* Left Image */}
            <div className="w-1/2 overflow-hidden">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="w-1/2 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {course.title}
                </h3>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-yellow-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="bg-green-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {course.duration}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {course.description || "No description available."}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="font-semibold text-yellow-600">
                  ${course.price}
                </span>
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
  );
};

export default PopularCourses;
