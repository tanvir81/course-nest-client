import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

const MyEnrolledCourses = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    if (user?.email) {
      axios
        .get(`http://localhost:3000/enrollments?studentEmail=${user.email}`)
        .then((res) => setEnrollments(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleUnenroll = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/enrollments/${id}`);
      toast.success("Unenrolled successfully!");
      setEnrollments(enrollments.filter((e) => e._id !== id));
    } catch (err) {
      console.log(err);
      toast.error("Failed to unenroll");
    }
  };

  if (!enrollments.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-neutral dark:to-base-300 animate-[pulse_6s_ease-in-out_infinite]" />
        <p className="relative z-10 text-lg opacity-70">
          You haven't enrolled in any courses yet.
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
          <h1 className="text-4xl font-bold">My Enrolled Courses</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enrollments.map((enroll, index) => (
            <div
              key={enroll._id}
              className="card bg-base-200 text-base-content shadow"
              data-aos="fade-right"
              data-aos-delay={index * 100}
            >
              <figure>
                <img
                  src={enroll.courseImage}
                  alt={enroll.courseTitle}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{enroll.courseTitle}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-yellow-200 text-gray-800 dark:text-gray-900 text-sm px-2 py-1 rounded-full">
                    {enroll.courseCategory}
                  </span>
                  <span className="bg-green-200 text-gray-800 dark:text-gray-900 text-sm px-2 py-1 rounded-full">
                    {enroll.courseDuration}
                  </span>
                </div>

                <p className="mt-2">{enroll.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold text-yellow-600">
                    ${enroll.coursePrice}
                  </span>
                  <button
                    onClick={() => handleUnenroll(enroll._id)}
                    className="btn bg-red-500 rounded-lg  text-black"
                  >
                    Unenroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyEnrolledCourses;
