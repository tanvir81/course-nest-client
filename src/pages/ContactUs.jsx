import React, { useState, useEffect } from "react";
import GlobalLoader from "../components/Shared/GlobalLoader";
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane, HiShare } from "react-icons/hi";
import { toast } from "react-hot-toast";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message received. Our collective will respond shortly.");
    e.target.reset();
  };

  if (loading) return <GlobalLoader message="Initializing communication protocols..." />;

  return (
    <div className="min-h-screen bg-white pb-32 font-['Outfit'] antialiased">
      {/* Banner */}
      <div className="section-banner py-32 text-white text-center">
         <div className="absolute inset-0 bg-black/60"></div>
         <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="inline-block px-4 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Communications Hub</div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none italic text-[#8B5CF6]">Dialogue.</h1>
            <p className="text-xl md:text-2xl text-neutral-400 font-medium max-w-2xl mx-auto leading-relaxed">Initiate a connection. Our team of scholars and support specialists are standing by.</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="bg-black p-12 rounded-[3.5rem] shadow-2xl text-white space-y-12 relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10 group-hover:opacity-20 transition-opacity"></div>
               
               <div className="space-y-10 relative z-10">
                  <div className="flex items-center gap-6 group/item">
                     <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center text-3xl border border-white/10 group-hover/item:bg-white group-hover/item:text-black transition-all duration-500">
                        <HiMail />
                     </div>
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Transmission</div>
                        <div className="font-black text-lg tracking-tight">hello@learnora.com</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-6 group/item">
                     <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center text-3xl border border-white/10 group-hover/item:bg-white group-hover/item:text-black transition-all duration-500">
                        <HiPhone />
                     </div>
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Direct Lane</div>
                        <div className="font-black text-lg tracking-tight">+1 (555) 700-1200</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-6 group/item">
                     <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center text-3xl border border-white/10 group-hover/item:bg-white group-hover/item:text-black transition-all duration-500">
                        <HiLocationMarker />
                     </div>
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Headquarters</div>
                        <div className="font-black text-lg tracking-tight">Digital Arts District, CA</div>
                     </div>
                  </div>
               </div>

               <div className="pt-12 border-t border-white/10 relative z-10">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-neutral-500 flex items-center gap-3"><HiShare /> Social Frequencies</h4>
                  <div className="flex gap-4">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 hover:bg-white hover:text-black transition-all cursor-pointer flex items-center justify-center font-black">0{i}</div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-black/5 border border-black/5">
               <h3 className="text-4xl font-black mb-12 tracking-tighter">Submit a <span className="italic text-[#8B5CF6]">Inquiry.</span></h3>
               <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Identity</label>
                        <input type="text" placeholder="Your Full Name" className="w-full h-16 px-6 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all font-bold" required />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Electronic Mail</label>
                        <input type="email" placeholder="email@example.com" className="w-full h-16 px-6 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all font-bold" required />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Objective</label>
                     <input type="text" placeholder="What is this regarding?" className="w-full h-16 px-6 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all font-bold" required />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Detailed Narrative</label>
                     <textarea placeholder="Elaborate on your requirement or query..." className="w-full h-44 px-8 py-6 rounded-[2.5rem] bg-neutral-50 border border-black/5 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all font-medium resize-none leading-relaxed" required></textarea>
                  </div>
                  <div className="pt-6">
                     <button type="submit" className="px-16 py-6 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all shadow-2xl shadow-black/10 flex items-center gap-4">
                        Dispatch Message <HiPaperAirplane className="rotate-90" />
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ContactUs;
