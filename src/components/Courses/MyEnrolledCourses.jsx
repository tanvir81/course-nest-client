import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";

const MyEnrolledCourses = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
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
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/pattern.jpg')" }}
      >
        <p className="text-lg text-gray-700">
          You haven't enrolled in any courses yet.
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
          <h1 className="text-4xl font-bold text-gray-900">
            My Enrolled Courses
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enrollments.map((enroll) => (
            <div key={enroll._id} className="card bg-base-100 shadow">
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
                  <span className="bg-yellow-200 text-gray-800 text-sm px-2 py-1 rounded-full">
                    {enroll.courseCategory}
                  </span>
                  <span className="bg-green-200 text-gray-800 text-sm px-2 py-1 rounded-full">
                    {enroll.courseDuration}
                  </span>
                </div>

                <p className="mt-2">{enroll.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold">${enroll.coursePrice}</span>
                  <button
                    onClick={() => handleUnenroll(enroll._id)}
                    className="btn btn-sm btn-error"
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
