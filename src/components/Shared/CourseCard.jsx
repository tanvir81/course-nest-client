import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../api/useAxios";
import { HiClock, HiTag, HiArrowRight, HiCurrencyDollar, HiUsers, HiStar } from "react-icons/hi";

const CourseCard = ({ course }) => {
  const [rating, setRating] = useState(null);
  const axiosPublic = useAxios();

  useEffect(() => {
    if (course?._id) {
      axiosPublic
        .get(`/courses/${course._id}/average-rating`)
        .then((res) => setRating(res.data.average))
        .catch(() => setRating(0));
    }
  }, [course?._id, axiosPublic]);

  return (
    <div className="flex flex-col h-full bg-white group overflow-hidden border border-black/10 transition-all duration-300 hover:shadow-2xl">
      {/* Image Container - Sharp Corners */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={course.imageUrl || "https://i.ibb.co/placeholder.png"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        {/* Category Badge overlay */}
        <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] z-10">
          {course.category || "General"}
        </div>
      </div>

      {/* Content Area - White & Minimal */}
      <div className="p-6 flex flex-col flex-1 gap-4 bg-white text-black border-t border-black/5">
        <div className="space-y-1">
           {/* Title */}
           <h3 className="text-xl font-black tracking-tighter leading-tight group-hover:text-neutral-600 transition-colors line-clamp-2 min-h-[2.5rem]">
             {course.title}
           </h3>
           
           {/* Instructor */}
           <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
             Architected by: <span className="text-black">{course.ownerName || "Expert"}</span>
           </div>
        </div>

        {/* Info Grid - Compact */}
        <div className="grid grid-cols-2 gap-y-3 py-4 border-y border-black/5">
           <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-500">
              <HiClock className="text-base text-black" />
              <span>{course.duration}h</span>
           </div>
           <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-500">
              <HiStar className="text-base text-amber-500" />
              <span>{rating !== null ? (rating > 0 ? rating.toFixed(1) : "N/A") : "..."}</span>
           </div>
           <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-500">
              <HiUsers className="text-base text-black" />
              <span>{course.enrollmentCount || "New"}</span>
           </div>
           <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-500">
              <HiTag className="text-base text-black" />
              <span>{course.category}</span>
           </div>
        </div>

        {/* Price and Action */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Investment</span>
             <span className="text-2xl font-black tracking-tighter">
               ${course.price}
             </span>
          </div>
          
          <Link 
            to={`/courses/${course._id}`}
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-xl"
          >
            <HiArrowRight className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
