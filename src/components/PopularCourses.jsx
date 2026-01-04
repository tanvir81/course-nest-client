import React, { useEffect, useState } from "react";
import useAxios from "../api/useAxios";
import CourseCard from "./Shared/CourseCard";
import SectionHeader from "./Shared/SectionHeader";
import CourseGridSkeleton from "./Shared/CourseGridSkeleton";

const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxios();

  useEffect(() => {
    fetchPopularCourses();
  }, []);

  const fetchPopularCourses = async () => {
    try {
      setLoading(true);
      // Fetch all courses
      const coursesRes = await axiosPublic.get("/courses");
      const courses = coursesRes.data;

      // Fetch ratings for each course
      const coursesWithRatings = await Promise.all(
        courses.map(async (course) => {
          try {
            const ratingRes = await axiosPublic.get(
              `/courses/${course._id}/average-rating`
            );
            return {
              ...course,
              averageRating: ratingRes.data.average || 0,
            };
          } catch (err) {
            return {
              ...course,
              averageRating: 0,
            };
          }
        })
      );

      // Sort all courses by rating
      const sortedByRating = coursesWithRatings.sort((a, b) => b.averageRating - a.averageRating);

      // Get unique categories
      const categories = [...new Set(courses.map(c => c.category))];

      // Select at least 1 course from each category (highest rated in that category)
      const selectedCourses = [];
      const usedCourseIds = new Set();

      categories.forEach(category => {
        const categoryTopCourse = sortedByRating.find(
          course => course.category === category && !usedCourseIds.has(course._id)
        );
        if (categoryTopCourse) {
          selectedCourses.push(categoryTopCourse);
          usedCourseIds.add(categoryTopCourse._id);
        }
      });

      // Fill remaining slots with highest-rated courses (up to 8 total)
      const remainingSlots = 8 - selectedCourses.length;
      const additionalCourses = sortedByRating
        .filter(course => !usedCourseIds.has(course._id))
        .slice(0, remainingSlots);

      const finalCourses = [...selectedCourses, ...additionalCourses];

      setPopularCourses(finalCourses);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Most Popular" 
          highlight="Courses" 
          subtitle="Discover our most trending and high-impact courses, curated for your career success."
        />

        {loading ? (
          <CourseGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCourses.map((course, index) => (
              <div 
                key={course._id} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                className="h-full"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
        
        {popularCourses.length === 0 && !loading && (
          <p className="text-center opacity-30 py-20 font-bold uppercase tracking-widest text-xs">No popular courses available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;
