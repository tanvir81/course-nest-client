import React, { useState, useEffect } from "react";
import { useParams, Link, useLoaderData } from "react-router";
import { HiArrowLeft, HiPlay, HiCheckCircle, HiLockClosed, HiAcademicCap, HiMenuAlt3, HiX, HiHome } from "react-icons/hi";
import { useAuth } from "../../contexts/AuthProvider";
import useAxios from "../../api/useAxios";
import { toast } from "react-hot-toast";
import GlobalLoader from "../Shared/GlobalLoader";

const CoursePlayer = () => {
  const course = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [activeLesson, setActiveLesson] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [visitedLessons, setVisitedLessons] = useState(new Set());
  const [completedModules, setCompletedModules] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(true);

  const lessons = [
    { title: "Introduction & Philosophy", duration: "12:45" },
    { title: "Foundational Architecture", duration: "24:20" },
    { title: "Visual Composition Mastery", duration: "45:10" },
    { title: "Interactive Design Systems", duration: "38:15" },
    { title: "Performance Execution", duration: "19:30" },
    { title: "Final Synthesis & Export", duration: "32:00" },
  ];

  useEffect(() => {
    if (user?.email && course?._id) {
      fetchProgress();
    }
  }, [user, course]);

  const fetchProgress = async () => {
    try {
      const res = await axiosSecure.get(`/progress?studentEmail=${user.email}&courseId=${course._id}`);
      setCompletedModules(res.data.completedModules || 0);
      if (res.data.visitedLessons) {
        setVisitedLessons(new Set(res.data.visitedLessons));
      } else {
        // If no visited lessons recorded yet, start fresh with the current session logic
        // But if the user wants 0% at the start, we don't automatically add activeLesson
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setCompletedModules(0);
      } else {
        console.error("Progress fetch error:", err);
      }
    } finally {
      setLoadingProgress(false);
    }
  };

  const handleLessonSwitch = async (idx) => {
    setActiveLesson(idx);
    const newVisited = new Set(visitedLessons);
    newVisited.add(idx);
    setVisitedLessons(newVisited);

    // Persist visit to backend
    try {
      await axiosSecure.patch("/progress", {
        studentEmail: user.email,
        courseId: course._id,
        visitedLessons: Array.from(newVisited)
      });
    } catch (err) {
      console.error("Failed to sync lesson visit", err);
    }
  };

  const handleMarkComplete = async () => {
    if (visitedLessons.size < lessons.length) {
      toast("You must visit all lessons before claiming mastery.", {
        icon: '⚠️',
        style: {
          background: '#1a1a1a',
          color: '#fff',
          borderRadius: '1.5rem',
          padding: '1.2rem',
          fontFamily: 'Outfit',
          fontSize: '0.8rem',
          fontWeight: 'black',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }
      });
      return;
    }

    try {
      await axiosSecure.patch("/progress", {
        studentEmail: user.email,
        courseId: course._id,
        completedModules: lessons.length
      });
      setCompletedModules(lessons.length);
      toast.success("Congratulations! You've mastered this curriculum.", {
        style: {
          background: '#000',
          color: '#fff',
          borderRadius: '1.5rem',
          padding: '1.5rem',
          fontFamily: 'Outfit',
          fontWeight: 'bold'
        },
        icon: '🏆'
      });
    } catch (err) {
      toast.error("Process interrupted. Ensure backend is active.");
    }
  };

  if (!course || loadingProgress) return <GlobalLoader message="Entering the learning matrix..." />;

  const allVisited = visitedLessons.size === lessons.length;

  return (
    <div className="min-h-screen bg-black text-white font-['Outfit'] antialiased flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`fixed md:relative z-50 w-80 h-full bg-[#0A0A0A] border-r border-white/5 transition-all duration-500 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:-translate-x-80"}`}
      >
        <div className="p-8 border-b border-white/5 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-black shadow-[0_0_20px_rgba(255,255,255,0.2)]">CN</div>
              <div className="text-xs font-black tracking-widest uppercase">Curriculum</div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-2xl text-neutral-500 hover:text-white">
              <HiX />
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-neutral-400 hover:text-white">
              <HiHome /> Go Home
            </Link>
            <Link to="/enrolled" className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-neutral-400 hover:text-white">
              <HiArrowLeft /> My Workspace
            </Link>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-220px)] p-4 space-y-2 custom-scrollbar">
          {lessons.map((lesson, idx) => (
            <button
              key={idx}
              onClick={() => handleLessonSwitch(idx)}
              className={`w-full text-left p-6 rounded-2xl transition-all group relative overflow-hidden ${
                activeLesson === idx 
                  ? "bg-white/10 border border-white/10" 
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              {activeLesson === idx && (
                <div className="absolute left-0 top-0 w-1 h-full bg-[#8B5CF6]"></div>
              )}
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${
                  visitedLessons.has(idx) ? "bg-[#8B5CF6] text-white" : "bg-white/5 text-neutral-500"
                }`}>
                  {visitedLessons.has(idx) ? <HiCheckCircle className="text-xl" /> : idx + 1}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-bold tracking-tight mb-1 ${activeLesson === idx ? "text-white" : "text-neutral-400"}`}>
                    {lesson.title}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                    <HiPlay className="text-[#8B5CF6]" /> {lesson.duration}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen flex flex-col relative overflow-hidden">
        {/* Top Navigation */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/50 backdrop-blur-xl sticky top-0 z-40">
           <div className="flex items-center gap-6">
              {!isSidebarOpen && (
                <button onClick={() => setIsSidebarOpen(true)} className="text-2xl text-neutral-400 hover:text-white transition-colors">
                   <HiMenuAlt3 />
                </button>
              )}
              <div>
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-2">Lesson Context</div>
                 <h1 className="text-xl font-black tracking-tight flex items-center gap-3">
                   {course.title} <span className="text-[10px] bg-white/5 px-3 py-1 rounded-full text-neutral-500 font-black uppercase tracking-widest">Enrolled</span>
                 </h1>
              </div>
           </div>
           
           <div className="flex items-center gap-8">
              <div className="hidden lg:flex flex-col items-end">
                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Session Progress</div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#8B5CF6] transition-all duration-1000" 
                      style={{ width: `${(visitedLessons.size / lessons.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-black">{Math.round((visitedLessons.size / lessons.length) * 100)}%</span>
                </div>
              </div>
              <button 
                onClick={handleMarkComplete}
                className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${
                  completedModules === lessons.length
                    ? "bg-[#8B5CF6] text-white opacity-50 cursor-default"
                    : allVisited
                    ? "bg-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105"
                    : "bg-white/5 text-neutral-500 hover:text-white"
                }`}
              >
                {completedModules === lessons.length ? "Mastery Achieved" : "Mark as Completed"}
              </button>
           </div>
        </div>

        {/* Player Area */}
        <div className="flex-1 p-8 lg:p-12 overflow-y-auto custom-scrollbar bg-[#050505]">
           <div className="max-w-6xl mx-auto space-y-12">
              <div className="aspect-video bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative group">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 group-hover:bg-black/20 transition-all pointer-events-none">
                     <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transform group-hover:scale-110 transition-transform">
                        <HiPlay className="text-5xl text-white ml-2" />
                     </div>
                  </div>
                  <img src={course.courseImage || course.imageUrl} className="w-full h-full object-cover opacity-60" alt="" />
                  
                  <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-4">
                     <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#8B5CF6] w-1/3"></div>
                     </div>
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-neutral-500">
                        <span>04:12 / {lessons[activeLesson].duration}</span>
                        <span>HD 1080P</span>
                     </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-20">
                 <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-4xl font-black tracking-tighter">
                      {activeLesson + 1}. {lessons[activeLesson].title}
                    </h2>
                    <p className="text-xl text-neutral-400 leading-relaxed font-medium">
                      In this module, we explore the deep psychological foundations of creative architecture. 
                      You'll learn how to dissect complex design systems and rebuild them with absolute precision 
                      and intentionality.
                    </p>
                    <div className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                          <HiAcademicCap className="text-3xl text-[#8B5CF6]" />
                          <div>
                             <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Learning Outcome</div>
                             <div className="text-sm font-bold tracking-tight">Systematic Dissection</div>
                          </div>
                       </div>
                       <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                          <HiLockClosed className="text-3xl text-neutral-600" />
                          <div>
                             <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Resource Status</div>
                             <div className="text-sm font-bold tracking-tight text-neutral-400">Assignment Locked</div>
                          </div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-6">Instructor Message</h4>
                       <p className="text-sm text-neutral-500 leading-relaxed italic mb-8">
                         "Precision is the only variable that separates excellence from the mundane. Focus on the core architecture and the aesthetics will follow."
                       </p>
                       <div className="flex items-center gap-4">
                          <img 
                            src={course.ownerPhoto || "https://i.ibb.co/placeholder.png"} 
                            className="w-10 h-10 rounded-full object-cover border border-white/10" 
                            alt={course.ownerName}
                          />
                          <div className="text-xs font-black uppercase tracking-widest">{course.ownerName || "Expert Instructor"}</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
