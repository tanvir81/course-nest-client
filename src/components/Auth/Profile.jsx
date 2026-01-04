import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";
import { HiUser, HiPhotograph, HiMail, HiCheckCircle } from "react-icons/hi";
import Avatar from "../Shared/Avatar";
import GlobalLoader from "../Shared/GlobalLoader";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });
      toast.success("Profile updated successfully!");
      // Force refresh if needed, but Firebase 'user' object might need a reload
      window.location.reload(); 
    } catch (err) {
      toast.error("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <GlobalLoader message="Retrieving persona credentials..." />;

  return (
    <div className="min-h-screen bg-white pb-32 font-['Outfit'] antialiased">
      {/* Profile Header (Cinematic) */}
      <div className="section-banner py-32 text-white">
         <div className="absolute inset-0 bg-black/60"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="relative group">
               <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
               <Avatar
                  user={user}
                  className="w-48 h-48 rounded-full border-4 border-white/5 object-cover shadow-[0_0_50px_rgba(0,0,0,0.5)] relative transition-all duration-700"
               />
               <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black border-4 border-black shadow-2xl">
                  <HiCheckCircle className="text-2xl" />
               </div>
            </div>

            <div className="text-center md:text-left space-y-4">
               <div className="inline-block px-4 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-neutral-400">Verified Identity</div>
               <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic text-[#8B5CF6] uppercase">{user?.displayName || "Member"}</h1>
               <div className="flex items-center justify-center md:justify-start gap-3 text-lg font-medium text-neutral-400">
                  <HiMail className="text-xl" /> {user?.email}
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
         {/* Identity Architecture Form */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6 lg:pt-16">
               <h2 className="text-4xl font-black tracking-tighter">Identity <span className="italic text-[#8B5CF6]">Architecture.</span></h2>
               <p className="text-neutral-500 font-medium text-lg leading-relaxed max-w-sm">Synchronize your digital persona across our ecosystem. High-fidelity updates ensure optimal platform resonance.</p>
            </div>

            <div className="lg:col-span-8 bg-white border border-black/5 rounded-[4rem] p-10 md:p-16 shadow-2xl shadow-black/5 overflow-hidden">
               <form onSubmit={handleUpdate} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 ml-1">Display Persona</label>
                        <div className="relative">
                           <HiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 text-xl" />
                           <input
                              type="text"
                              className="w-full h-18 pl-14 pr-8 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all font-bold text-lg"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                           />
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 ml-1">Visual Identifier</label>
                        <div className="relative">
                           <HiPhotograph className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 text-xl" />
                           <input
                              type="text"
                              className="w-full h-18 pl-14 pr-8 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all font-bold text-lg"
                              value={photo}
                              onChange={(e) => setPhoto(e.target.value)}
                              required
                           />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 ml-1">Channel (Locked)</label>
                     <div className="relative">
                        <HiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 text-xl" />
                        <input
                           type="email"
                           className="w-full h-18 pl-14 pr-8 rounded-[1.5rem] bg-neutral-100 border border-black/5 text-neutral-400 font-bold text-lg cursor-not-allowed"
                           value={user?.email || ""}
                           disabled
                        />
                     </div>
                  </div>

                  <div className="pt-6">
                     <button
                        type="submit"
                        disabled={loading}
                        className="px-16 py-6 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all shadow-2xl shadow-black/10 flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {loading ? <ButtonLoader /> : "Synchronize Identity"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Profile;
