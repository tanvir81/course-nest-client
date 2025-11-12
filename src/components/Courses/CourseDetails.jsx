import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import axios from "axios";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import ReviewForm from "../ReviewForm";

const CourseDetails = () => {
  const course = useLoaderData();
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewToEdit, setReviewToEdit] = useState(null);

  // Fetch reviews + average rating
  useEffect(() => {
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

  // Refresh reviews after new submission/edit/delete
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

  // Enter edit mode
  const handleEdit = (review) => {
    setReviewToEdit(review);
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setReviewToEdit(null);
  };

  // Delete review
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

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
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="mb-4">{course.description}</p>

      <div className="flex items-center justify-between mb-6">
        <span className="font-semibold">${course.price}</span>
        <button onClick={handleEnroll} className="btn btn-primary">
          Enroll Now
        </button>
      </div>

      {/* Average Rating */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Average Rating</h2>
        <p>{averageRating ? averageRating.toFixed(1) : "No ratings yet"}</p>
      </div>

      {/* Reviews List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {reviews.length ? (
          <ul className="space-y-2 mt-2">
            {reviews.map((r) => (
              <li key={r._id} className="border p-2 rounded">
                <strong>{r.studentEmail}</strong> rated {r.rating}/5
                <p>{r.comment}</p>
                {user?.email === r.studentEmail && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(r)}
                      className="btn btn-sm btn-outline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      <ReviewForm
        courseId={course._id}
        onReviewAdded={refreshReviews}
        reviewToEdit={reviewToEdit}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
};

export default CourseDetails;
