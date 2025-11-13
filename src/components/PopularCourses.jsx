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
    <section className="px-4 md:px-10 py-6 bg-base-100 text-base-content">
      <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">
        Popular <span className="text-yellow-500">Courses</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredCourses.map((course, index) => (
          <div
            key={course._id}
            className="flex flex-col sm:flex-row bg-base-200 text-base-content shadow rounded-lg overflow-hidden sm:h-72 cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Image */}
            <div className="w-full sm:w-1/2 h-48 sm:h-full overflow-hidden">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="w-full sm:w-1/2 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold">{course.title}</h3>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-yellow-200 text-gray-800 dark:text-gray-900 text-xs px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="bg-green-200 text-gray-800 dark:text-gray-900 text-xs px-2 py-1 rounded-full">
                    {course.duration}
                  </span>
                </div>

                <p className="text-sm mt-2 line-clamp-3">
                  {course.description || "No description available."}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="font-semibold text-yellow-600">
                  ${course.price}
                </span>
                <a
                  href={`/courses/${course._id}`}
                  className="btn text-black  bg-yellow-400 rounded-lg hover:bg-yellow-600"
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
