import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import useAxios from "../../api/useAxios";
import { toast } from "react-hot-toast";
import { HiTag, HiClock, HiCurrencyDollar, HiTranslate, HiPencilAlt, HiUpload, HiArrowLeft, HiSparkles } from "react-icons/hi";
import axios from "axios";
import GlobalLoader from "../Shared/GlobalLoader";
import ButtonLoader from "../Shared/ButtonLoader";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
     try {
        const res = await axiosSecure.get(`/courses/${id}`);
        setCourse(res.data);
     } catch (err) {
        toast.error("Failed to load course");
     }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=51cf2af8b48eb5d916dd2d4dd09b0a3f`,
        formDataImg
      );
      const url = res.data.data.display_url;
      setCourse((prev) => ({ ...prev, imageUrl: url }));
      toast.success("Thumbnail updated!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { _id, ...safeCourse } = course;

    try {
      await axiosSecure.patch(
        `/courses/${id}`,
        safeCourse
      );
      toast.success("Course changes saved!");
      navigate("/my-courses");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <GlobalLoader message="Loading course details..." />;

  return (
    <div className="min-h-screen bg-white pb-32 font-['Outfit'] antialiased">
      <div className="section-banner py-24 text-white">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="max-w-2xl">
              <Link to="/my-courses" className="text-neutral-500 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 mb-8 hover:text-white transition-colors">
                 <HiArrowLeft /> Return to Workspace
              </Link>
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Refine <span className="italic text-[#8B5CF6]">Mastery.</span></h1>
              <p className="text-neutral-400 font-medium text-xl leading-relaxed">Adjust your curriculum to meet the evolving standards of excellence.</p>
           </div>
           {course.imageUrl && (
             <div className="relative group">
                <img src={course.imageUrl} className="w-80 h-44 rounded-[2rem] object-cover shadow-2xl border-2 border-white/10 transition-all duration-700" alt="Preview" />
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-xl shadow-2xl"><HiSparkles /></div>
             </div>
           )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
         <form onSubmit={handleSubmit} className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-black/5 border border-black/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {/* Left Column */}
               <div className="space-y-10">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Composition Title</label>
                     <div className="relative">
                        <HiTag className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 text-xl" />
                        <input name="title" value={course.title} onChange={handleChange} placeholder="e.g. Creative Mastery" className="w-full h-16 pl-14 pr-6 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all font-bold" required />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Valuation ($)</label>
                        <div className="relative">
                           <HiCurrencyDollar className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 text-xl" />
                           <input type="number" name="price" value={course.price} onChange={handleChange} placeholder="0.00" className="w-full h-16 pl-14 pr-6 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all font-bold" required />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Temporal Span</label>
                        <div className="relative">
                           <HiClock className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 text-xl" />
                           <input name="duration" value={course.duration} onChange={handleChange} placeholder="e.g. 24h" className="w-full h-16 pl-14 pr-6 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all font-bold" required />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Classification</label>
                     <div className="relative">
                        <HiTranslate className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 text-xl" />
                        <input name="category" value={course.category} onChange={handleChange} placeholder="e.g. Visual Arts" className="w-full h-16 pl-14 pr-6 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all font-bold" required />
                     </div>
                  </div>
               </div>

               {/* Right Column */}
               <div className="space-y-10">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Update Visual Asset</label>
                     <div className="relative group">
                        <div className="absolute inset-0 bg-neutral-50 rounded-[1.5rem] border border-black/5 group-hover:bg-neutral-100 group-hover:border-black/20 transition-all flex flex-col items-center justify-center p-6">
                           <HiUpload className="text-3xl text-neutral-300 mb-3 group-hover:text-black transition-colors" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Modify Image Material</span>
                        </div>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="opacity-0 w-full h-36 cursor-pointer relative z-10" />
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Philosophical Abstract</label>
                     <div className="relative">
                        <HiPencilAlt className="absolute left-6 top-8 -translate-y-1/2 text-neutral-300 text-xl" />
                        <textarea name="description" value={course.description || ""} onChange={handleChange} placeholder="Elaborate on the learning trajectory..." className="w-full h-44 pl-14 pr-6 py-6 rounded-[2rem] bg-neutral-50 border border-black/5 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all font-medium resize-none leading-relaxed" required />
                     </div>
                  </div>

                  <label className="flex items-center gap-5 cursor-pointer p-6 bg-neutral-50 rounded-[1.5rem] border border-black/5 hover:border-black transition-all group">
                     <input type="checkbox" name="isFeatured" checked={course.isFeatured || false} onChange={handleChange} className="w-6 h-6 border-2 border-black/10 rounded accent-black" />
                     <div className="flex flex-col">
                        <span className="font-black text-xs uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors">Featured Publication</span>
                        <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Visibility Status</span>
                     </div>
                  </label>
               </div>
            </div>

            <div className="pt-12">
               <button type="submit" disabled={loading} className="w-full py-6 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all shadow-2xl shadow-black/10 flex items-center justify-center gap-4">
                  {loading ? <ButtonLoader /> : <>Commit Changes <HiArrowLeft className="rotate-180" /></>}
               </button>
            </div>
         </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
