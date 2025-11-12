import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";

const MyEnrolledCourses = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);

  // Fetch enrollments for student who login
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/enrollments?studentEmail=${user.email}`)
        .then((res) => setEnrollments(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // Unenroll
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
    return <div className="p-6">You haven't enrolled in any courses yet.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Enrolled Courses</h1>
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
              <p>
                {enroll.courseCategory} • {enroll.courseDuration}
              </p>
              <span className="font-semibold">${enroll.coursePrice}</span>
              <button
                onClick={() => handleUnenroll(enroll._id)}
                className="btn btn-sm btn-error mt-4"
              >
                Unenroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledCourses;
