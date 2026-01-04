import React, { useEffect, useState } from "react";
import useAxios from "../../api/useAxios";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { HiCollection, HiClock, HiTrash, HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";
import Swal from "sweetalert2";
import GlobalLoader from "../Shared/GlobalLoader";

const MyEnrolledCourses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    if (user?.email) {
      fetchEnrollments();
    }
  }, [user]);

  const fetchEnrollments = async () => {
     try {
        setLoading(true);
        const res = await axiosSecure.get(`/enrollments?studentEmail=${user.email}`);
        setEnrollments(res.data);
        
        // Fetch progress for each enrollment
        const progressMap = {};
        for (const enroll of res.data) {
           try {
              const pRes = await axiosSecure.get(`/progress?studentEmail=${user.email}&courseId=${enroll.courseId}`);
              progressMap[enroll.courseId] = pRes.data;
           } catch (e) {
              // Quietly handle 404s or network delays from un-updated backends
              progressMap[enroll.courseId] = { completedModules: 0 };
           }
        }
        setProgressData(progressMap);
     } catch (err) {
        console.error(err);
     } finally {
        setLoading(false);
     }
  };

  const handleUnenroll = async (id) => {
    const result = await Swal.fire({
      title: "Drop this course?",
      text: "This action will revoke your access credentials.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#666",
      confirmButtonText: "Yes, drop it"
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/enrollments/${id}`);
        toast.success("Successfully unenrolled.");
        setEnrollments(enrollments.filter((e) => e._id !== id));
      } catch (err) {
        toast.error("Failed to unenroll");
      }
    }
  };

  if (loading) return <GlobalLoader message="Loading enrolled courses..." />;

  // Constants for demo logic
  const TOTAL_LESSONS = 6;

  return (
    <div className="min-h-screen bg-white pb-32 font-['Outfit'] antialiased">
      {/* Header */}
      <div className="section-banner py-24 text-white">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">My <span className="italic text-[#8B5CF6]">Learning.</span></h1>
           <p className="text-neutral-400 font-medium text-xl max-w-2xl leading-relaxed">Tracks your progressive mastery and continue your pursuit of excellence.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
         {/* Stats */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-black/5 group hover:border-black transition-all">
               <div className="text-black text-3xl mb-6 bg-neutral-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all"><HiCollection /></div>
               <div className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mb-1">Active Courses</div>
               <div className="text-4xl font-black tracking-tighter">{enrollments.length}</div>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-black/5 group hover:border-black transition-all">
               <div className="text-black text-3xl mb-6 bg-neutral-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all"><HiClock /></div>
               <div className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mb-1">Total Hours</div>
               <div className="text-4xl font-black tracking-tighter">{enrollments.reduce((acc, curr) => acc + (parseInt(curr.courseDuration) || 0), 0)}h</div>
            </div>
         </div>

         {/* Grid */}
         {enrollments.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {enrollments.map((enroll) => {
               const progressObj = progressData[enroll.courseId] || {};
               const completed = progressObj.completedModules || 0;
               const visitedCount = (progressObj.visitedLessons || []).length;
               
               // If completedModules is set to total, it's 100%. Otherwise calculate based on visits.
               const percentage = completed >= TOTAL_LESSONS 
                 ? 100 
                 : Math.min(Math.round((visitedCount / TOTAL_LESSONS) * 100), 100);
               
               return (
                 <div key={enroll._id} className="bg-white rounded-[2.5rem] border border-black/5 shadow-2xl shadow-black/5 overflow-hidden group hover:border-black transition-all duration-500">
                    <div className="relative overflow-hidden h-56">
                       <img src={enroll.courseImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                          <Link to={`/courses/${enroll.courseId}/learn`} className="px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all">Continue Journey</Link>
                       </div>
                    </div>
                    <div className="p-10 space-y-6">
                       <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">{enroll.courseCategory}</div>
                       <h3 className="text-2xl font-black leading-tight tracking-tighter min-h-[4rem]">{enroll.courseTitle}</h3>
                       
                       <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-400">
                             <span>Mastery</span>
                             <span>{percentage}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                             <div 
                               className="h-full bg-[#8B5CF6] transition-all duration-1000" 
                               style={{ width: `${percentage}%` }}
                             ></div>
                          </div>
                       </div>

                       <div className="flex justify-between items-center pt-8 border-t border-black/5">
                          <button 
                             onClick={() => handleUnenroll(enroll._id)}
                             className="text-[10px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-500 transition-colors flex items-center gap-2"
                          >
                             <HiTrash /> Drop Pursuit
                          </button>
                          <Link to={`/courses/${enroll.courseId}/learn`} className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-colors flex items-center gap-2">
                             Resume <HiArrowRight />
                          </Link>
                       </div>
                    </div>
                 </div>
               );
             })}
           </div>
         ) : (
           <div className="bg-neutral-50 rounded-[3.5rem] p-24 text-center border border-black/5">
              <div className="text-8xl mb-8 opacity-20">🎓</div>
              <h3 className="text-3xl font-black tracking-tighter">Your learning queue is empty.</h3>
              <p className="text-neutral-500 font-medium mt-4 max-w-md mx-auto leading-relaxed">Browse our collection and begin your next creative pursuit today.</p>
              <Link to="/courses" className="mt-10 inline-block px-12 py-5 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all">Discover Courses</Link>
           </div>
         )}
      </div>
    </div>
  );
};

export default MyEnrolledCourses;
