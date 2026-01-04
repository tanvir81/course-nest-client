import React, { useState, useEffect } from "react";

import { useAuth } from "../contexts/AuthProvider";
import useAxios from "../api/useAxios";
import { toast } from "react-hot-toast";
import { HiStar, HiX } from "react-icons/hi";
import ButtonLoader from "./Shared/ButtonLoader";

const ReviewForm = ({
  courseId,
  onReviewAdded,
  reviewToEdit,
  onCancelEdit,
}) => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    try {
      setLoading(true);
      if (reviewToEdit) {
        await axiosSecure.patch(
          `/reviews/${reviewToEdit._id}`,
          {
            rating: Number(rating),
            comment,
            studentEmail: user.email,
          }
        );
        toast.success("Review updated!");
        onCancelEdit();
      } else {
        await axiosSecure.post("/reviews", {
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
      console.error(err);
      toast.error("Failed to save review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-50 p-8 md:p-12 rounded-[2.5rem] border border-black/5 shadow-2xl shadow-black/5 font-['Outfit'] antialiased">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="flex flex-col gap-4">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 ml-1">Satisfaction Rating</label>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 scale-100 hover:scale-110 active:scale-95 ${
                  rating >= n 
                    ? "bg-amber-500 text-white shadow-xl shadow-amber-500/20" 
                    : "bg-white text-neutral-200 border border-black/5 hover:text-black hover:border-black"
                }`}
              >
                <HiStar className="text-2xl" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 ml-1">Narrative Critique</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Document your intellectual experience..."
            className="w-full h-44 px-8 py-6 rounded-[2rem] bg-white border border-black/5 focus:border-black focus:ring-0 outline-none transition-all font-medium resize-none leading-relaxed"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-5 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all shadow-2xl shadow-black/10 flex items-center justify-center gap-4"
          >
            {loading ? (
              <ButtonLoader />
            ) : (
              <>{reviewToEdit ? "Commit Revision" : "Post Critique"} <HiStar className="text-lg opacity-30" /></>
            )}
          </button>
          
          {reviewToEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="w-16 h-16 rounded-full flex items-center justify-center bg-white border border-black/5 text-neutral-400 hover:text-black hover:border-black transition-all"
            >
              <HiX className="text-2xl" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
