import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-hot-toast";

const ReviewForm = ({
  courseId,
  onReviewAdded,
  reviewToEdit,
  onCancelEdit,
}) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (reviewToEdit) {
      setRating(reviewToEdit.rating);
      setComment(reviewToEdit.comment);
    }
  }, [reviewToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to leave a review.");
      return;
    }

    try {
      if (reviewToEdit) {
        await axios.patch(`http://localhost:3000/reviews/${reviewToEdit._id}`, {
          rating: Number(rating),
          comment,
          studentEmail: user.email,
        });
        toast.success("Review updated!");
        onCancelEdit();
      } else {
        await axios.post("http://localhost:3000/reviews", {
          courseId,
          studentEmail: user.email,
          rating: Number(rating),
          comment,
        });
        toast.success("Review submitted!");
      }

      setRating(0);
      setComment("");
      onReviewAdded();
    } catch (err) {
      console.log(err);
      toast.error("Failed to save review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-6">
      <label>
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="select select-bordered ml-2"
        >
          <option value="0">Select</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="textarea textarea-bordered w-full"
      />
      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary">
          {reviewToEdit ? "Update Review" : "Submit Review"}
        </button>
        {reviewToEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
