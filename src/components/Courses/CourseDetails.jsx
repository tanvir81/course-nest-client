import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import axios from "axios";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import ReviewForm from "../ReviewForm";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const CourseDetails = () => {
  const course = useLoaderData();
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewToEdit, setReviewToEdit] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    if (course?._id) {
      axios
        .get(`http://localhost:3000/reviews/${course._id}`)
        .then((res) => setReviews(res.data))
        .catch(() => toast.error("Failed to load reviews"));

      axios
        .get(`http://localhost:3000/courses/${course._id}/average-rating`)
        .then((res) => setAverageRating(res.data.average))
        .catch(() => toast.error("Failed to load average rating"));
    }
  }, [course]);

  const handleEnroll = async () => {
    if (!user) {
      toast.error("You must be logged in to enroll.");
      return;
    }

    const enrollment = {
      courseId: course._id,
      courseTitle: course.title,
      courseImage: course.imageUrl,
      courseCategory: course.category,
      courseDuration: course.duration,
      coursePrice: course.price,
      studentEmail: user.email,
      studentName: user.displayName || "Anonymous",
      description: course.description,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/enrollments",
        enrollment
      );
      if (res.data?.insertedId) {
        toast.success("Enrolled successfully!");
      } else {
        toast.error("Enrollment did not complete");
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg) toast.error(msg);
      else toast.error("Enrollment failed");
    }
  };

  const refreshReviews = () => {
    axios
      .get(`http://localhost:3000/reviews/${course._id}`)
      .then((res) => setReviews(res.data))
      .catch(() => toast.error("Failed to refresh reviews"));

    axios
      .get(`http://localhost:3000/courses/${course._id}/average-rating`)
      .then((res) => setAverageRating(res.data.average))
      .catch(() => toast.error("Failed to refresh rating"));
  };

  const handleEdit = (review) => {
    setReviewToEdit(review);
  };

  const handleCancelEdit = () => {
    setReviewToEdit(null);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "Are you sure you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/reviews/${id}`, {
        data: { studentEmail: user.email },
      });
      toast.success("Review deleted!");
      refreshReviews();
    } catch {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-neutral dark:to-base-300 animate-[pulse_6s_ease-in-out_infinite]" />

      <div
        className="relative z-10 max-w-4xl w-full bg-base-200 text-base-content shadow-md rounded-lg p-6"
        data-aos="fade-up"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">{course.title}</h1>

        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-64 object-cover rounded mb-6"
        />

        <p className="mb-6">{course.description}</p>

        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold text-yellow-600">
            ${course.price}
          </span>
          <button
            onClick={handleEnroll}
            className="btn text-black bg-yellow-400 rounded-lg hover:bg-yellow-600 "
          >
            Enroll Now
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Average Rating</h2>
          <p>{averageRating ? averageRating.toFixed(1) : "No ratings yet"}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Reviews</h2>
          {reviews.length ? (
            <ul className="space-y-4 mt-4">
              {reviews.map((r) => (
                <li key={r._id} className="bg-base-100 p-4 rounded shadow-sm">
                  <strong>{r.studentEmail}</strong> rated {r.rating}/5
                  <p className="mt-1 text-sm">{r.comment}</p>
                  {user?.email === r.studentEmail && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(r)}
                        className="btn text-black bg-yellow-400 rounded-lg hover:bg-yellow-600 "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="btn bg-red-500 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="opacity-70 mt-2">No reviews yet.</p>
          )}
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold mb-4">
            {reviewToEdit ? "Edit Your Review" : "Leave a Review"}
          </h2>
          <ReviewForm
            courseId={course._id}
            onReviewAdded={refreshReviews}
            reviewToEdit={reviewToEdit}
            onCancelEdit={handleCancelEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
