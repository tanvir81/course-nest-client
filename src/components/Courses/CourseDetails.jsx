import React, { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router";
import useAxios from "../../api/useAxios";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import ReviewForm from "../ReviewForm";
import Swal from "sweetalert2";
import CourseCard from "../Shared/CourseCard";
import ButtonLoader from "../Shared/ButtonLoader";
import {
  HiClock,
  HiAcademicCap,
  HiUser,
  HiStar,
  HiCheckCircle,
  HiArrowRight,
  HiPlay,
} from "react-icons/hi";

const CourseDetails = () => {
  const course = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (course?._id) {
      refreshReviews();
      fetchRelatedCourses();
      if (user?.email) {
        checkEnrollment();
      }
    }
    window.scrollTo(0, 0);
  }, [course, user]);

  const checkEnrollment = async () => {
    try {
      const res = await axiosSecure.get(`/enrollments?studentEmail=${user.email}`);
      const enrolled = res.data.some((e) => e.courseId === course._id);
      setIsEnrolled(enrolled);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRelatedCourses = async () => {
    try {
      const res = await axiosSecure.get("/courses");
      const related = res.data
        .filter((c) => c.category === course.category && c._id !== course._id)
        .slice(0, 4);
      setRelatedCourses(related);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      toast.error("You must be logged in to enroll.");
      return;
    }

    setLoadingEnroll(true);
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
      const res = await axiosSecure.post(
        "/enrollments",
        enrollment
      );
      if (res.data?.insertedId) {
        toast.success("Enrolled successfully!");
        setIsEnrolled(true);
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      toast.error(msg || "Enrollment failed");
    } finally {
      setLoadingEnroll(false);
    }
  };

  const refreshReviews = () => {
    axiosSecure
      .get(`/reviews/${course._id}`)
      .then((res) => setReviews(res.data))
      .catch(() => {});

    axiosSecure
      .get(
        `/courses/${course._id}/average-rating`
      )
      .then((res) => setAverageRating(res.data.average))
      .catch(() => {});
  };

  const handleDeleteReview = async (id) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#666",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(
          `/reviews/${id}`,
          {
            data: { studentEmail: user.email },
          }
        );
        toast.success("Review deleted!");
        refreshReviews();
      } catch {
        toast.error("Failed to delete review");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32 font-['Outfit'] antialiased">
      {/* Hero Header */}
      <div className="section-banner pt-24 pb-48 text-white">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 text-neutral-300 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-white/10">
              <HiAcademicCap className="text-lg" /> {course.category}
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter">
              {course.title}
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-medium">
              {course.description}
            </p>
            <div className="flex flex-wrap gap-10 text-[10px] uppercase font-black tracking-[0.2em] opacity-60 pt-6">
              <div className="flex items-center gap-3">
                <HiUser className="text-xl" /> By{" "}
                {course.ownerName || "Expert Instructor"}
              </div>
              <div className="flex items-center gap-3">
                <HiClock className="text-xl" /> {course.duration}
              </div>
              <div className="flex items-center gap-3">
                <HiStar className="text-xl text-amber-500" />{" "}
                {averageRating ? averageRating.toFixed(1) : "N/A"} Rating
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Course Image */}
            <div className="aspect-video w-full bg-black rounded-[2.5rem] overflow-hidden shadow-2xl group relative border-8 border-white">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-black/5 shadow-sm">
              <div className="flex gap-10 border-b border-black/5 mb-12 overflow-x-auto pb-6">
                {["overview", "curriculum", "assessment", "reviews"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${
                        activeTab === tab
                          ? "text-black"
                          : "text-neutral-400 hover:text-black"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute -bottom-6 left-0 w-full h-1 bg-black rounded-full"></div>
                      )}
                    </button>
                  )
                )}
              </div>

              <div className="min-h-[400px]">
                {activeTab === "overview" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h3 className="text-3xl font-black tracking-tighter mb-8">
                      Course Vision
                    </h3>
                    <p className="text-xl text-neutral-500 font-medium leading-relaxed mb-12">
                      {course.description}
                    </p>
                    <h4 className="text-[10px] uppercase font-black tracking-widest text-neutral-400 mb-8 px-1">
                      Objectives
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        "Deep dive into concepts",
                        "Real-world project building",
                        "Industry best practices",
                        "Elite career growth",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 bg-neutral-50 p-6 rounded-[1.5rem] border border-black/5"
                        >
                          <HiCheckCircle className="text-black text-2xl" />
                          <span className="font-bold tracking-tight">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
                    <h3 className="text-3xl font-black tracking-tighter mb-10">
                      Syllabus Breakdown
                    </h3>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="collapse collapse-arrow bg-neutral-50 rounded-[1.5rem] border border-black/5"
                      >
                        <input type="checkbox" />
                        <div className="collapse-title font-black text-lg py-6 px-8">
                          Module 0{i}: Mastery & Execution
                        </div>
                        <div className="collapse-content px-8 pb-8 text-neutral-500 font-medium">
                          A rigorous deep dive into module 0{i} with advanced
                          drills, real-world case studies, and comprehensive
                          feedback markers to ensure absolute proficiency.
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "assessment" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12 pb-20">
                    <h3 className="text-3xl font-black tracking-tighter mb-4">
                      Elite Assessment Protocol
                    </h3>
                    <p className="text-xl text-neutral-500 font-medium leading-relaxed">
                      To ensure absolute mastery of the concepts, students must
                      undergo a rigorous evaluation sequence designed by our
                      experts.
                    </p>

                    <div className="grid grid-cols-1 gap-6">
                      {[
                        {
                          title: "Conceptual Drill",
                          desc: "A comprehensive analysis of foundational theory and architecture.",
                        },
                        {
                          title: "Execution Milestone",
                          desc: "Live project implementation under industry-standard constraints.",
                        },
                        {
                          title: "Final Synthesis",
                          desc: "A cumulative project demonstrating peak proficiency and innovation.",
                        },
                      ].map((task, i) => (
                        <div
                          key={i}
                          className="flex gap-8 p-10 bg-white text-black rounded-[2.5rem] border border-black/10 group hover:border-black transition-all"
                        >
                          <div className="w-16 h-16 bg-black text-white rounded-xl flex items-center justify-center text-2xl font-black shrink-0">
                            0{i + 1}
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-2xl font-black tracking-tight">
                              {task.title}
                            </h4>
                            <p className="text-neutral-500 font-medium">
                              {task.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white text-black p-12 rounded-[3.5rem] border border-black/10 mt-12 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-5"></div>
                      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div>
                          <h4 className="text-3xl font-black tracking-tighter mb-2 italic text-black">
                            Certification Status
                          </h4>
                          <p className="text-neutral-500 font-medium tracking-tight">
                            Requires 85% aggregate score across all protocols.
                          </p>
                        </div>
                        <div className="px-10 py-5 bg-black text-white font-black rounded-full uppercase tracking-widest text-xs">
                          Submission Terminal Locked
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-16">
                    <div className="flex justify-between items-end border-b border-black/5 pb-10">
                      <h3 className="text-3xl font-black tracking-tighter">
                        Student Success
                      </h3>
                      <div className="flex items-center gap-3 bg-black text-white px-6 py-2 rounded-full font-black text-xs">
                        <HiStar className="text-amber-500" />{" "}
                        {averageRating
                          ? averageRating.toFixed(1)
                          : "No Ratings"}
                      </div>
                    </div>

                    <ReviewForm
                      courseId={course._id}
                      onReviewAdded={refreshReviews}
                      reviewToEdit={reviewToEdit}
                      onCancelEdit={() => setReviewToEdit(null)}
                    />

                    <div className="space-y-10">
                      {reviews.length ? (
                        reviews.map((r) => (
                          <div
                            key={r._id}
                            className="bg-neutral-50 p-10 rounded-[2rem] border border-black/5 group hover:border-black/10 transition-all"
                          >
                            <div className="flex justify-between items-start mb-6">
                              <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-black text-xl">
                                  {r.studentEmail && r.studentEmail.length > 0 ? r.studentEmail[0].toUpperCase() : "U"}
                                </div>
                                <div>
                                  <div className="font-black tracking-tight text-lg">
                                    {r.studentEmail ? r.studentEmail.split("@")[0] : "Anonymous Scholar"}
                                  </div>
                                  <div className="text-[10px] flex gap-1 text-amber-500 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <HiStar
                                        key={i}
                                        className={
                                          i < r.rating
                                            ? "fill-current"
                                            : "opacity-10"
                                        }
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              {user?.email === r.studentEmail && (
                                <div className="flex gap-4">
                                  <button
                                    onClick={() => setReviewToEdit(r)}
                                    className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-black"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteReview(r._id)}
                                    className="text-[10px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-500"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                            <p className="text-neutral-500 font-medium leading-relaxed italic text-lg">
                              "{r.comment}"
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-20 bg-neutral-50 rounded-[2rem] border border-dashed border-black/10">
                          <p className="text-neutral-400 font-black uppercase tracking-widest text-[10px]">
                            No testimony yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Instructor Section */}
            <div className="bg-white text-black rounded-[3.5rem] border border-black/10 p-12 md:p-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-5"></div>
              <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
                <div className="w-48 h-48 rounded-full border-4 border-black/5 overflow-hidden bg-neutral-100 flex-shrink-0 shadow-lg">
                  <img
                    src={
                      course.ownerPhoto || "https://i.ibb.co/placeholder.png"
                    }
                    alt={course.ownerName}
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                    onError={(e) => {
                      e.target.src = "https://i.ibb.co/placeholder.png";
                    }}
                  />
                </div>
                <div className="text-center md:text-left space-y-6">
                  <h3 className="text-4xl font-black tracking-tighter uppercase italic text-black">
                    The Visionary: {course.ownerName}
                  </h3>
                  <p className="text-xl text-neutral-500 font-medium leading-relaxed max-w-xl">
                    Our lead educator has over 12 years of experience at the
                    absolute peak of the industry, delivering high-stakes
                    solutions to Fortune 500 clients worldwide.
                  </p>
                  <button className="px-10 py-4 bg-black text-white font-black rounded-full text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center gap-3">
                    View Portfolio <HiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-10">
              <div className="bg-white rounded-[2.5rem] p-10 md:p-12 border border-black/10 shadow-2xl">
                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 px-1">
                  Investment
                </div>
                <div className="text-6xl font-black mb-10 tracking-tighter">
                  ${course.price}
                </div>
                {isEnrolled ? (
                  <Link
                    to={`/courses/${course._id}/learn`}
                    className="w-full h-20 bg-[#8B5CF6] text-white rounded-[1.5rem] font-black text-xl hover:bg-black transition-all duration-300 shadow-2xl flex items-center justify-center p-0"
                  >
                    Continue Journey →
                  </Link>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={loadingEnroll}
                    className="w-full h-20 bg-black text-white rounded-[1.5rem] font-black text-xl hover:bg-neutral-800 transition-all duration-300 shadow-2xl flex items-center justify-center p-0"
                  >
                    {loadingEnroll ? (
                      <ButtonLoader />
                    ) : (
                      "Enroll Now →"
                    )}
                  </button>
                )}
                <div className="mt-12 space-y-6">
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                    <span className="text-neutral-400">Duration</span>
                    <span>{course.duration}h</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest border-t border-black/5 pt-6">
                    <span className="text-neutral-400">Category</span>
                    <span>{course.category}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest border-t border-black/5 pt-6">
                    <span className="text-neutral-400">Access</span>
                    <span>Lifetime access</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-neutral-50 px-8 py-10 rounded-[2rem] border border-black/5 flex items-center gap-6">
                <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center text-2xl">
                  <HiCheckCircle />
                </div>
                <div>
                  <div className="font-black uppercase tracking-widest text-[10px] text-neutral-400 mb-1">
                    Authentic Care
                  </div>
                  <div className="font-bold tracking-tight">
                    7-Day Guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-32 border-t border-black/5 pt-24">
          <h3 className="text-4xl font-black mb-16 tracking-tighter">
            Continue the{" "}
            <span className="italic text-[#8B5CF6] px-1">Deep Dive.</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {relatedCourses.map((c) => (
              <CourseCard key={c._id} course={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
