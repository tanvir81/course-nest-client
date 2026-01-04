import React, { useState, useEffect } from "react";
import GlobalLoader from "../components/Shared/GlobalLoader";
import SectionHeader from "../components/Shared/SectionHeader";
import { HiLightningBolt, HiUserGroup, HiGlobe, HiTrendingUp, HiAcademicCap, HiCube } from "react-icons/hi";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <GlobalLoader message="Deciphering the creative DNA..." />;

  return (
    <div className="min-h-screen bg-white pb-32 font-['Outfit'] antialiased">
      {/* Hero */}
      <div className="section-banner py-32 text-white text-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
           <div className="inline-block px-4 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Evolution of Learning</div>
           <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">Redefining <span className="italic text-[#8B5CF6]">Excellence.</span></h1>
           <p className="text-xl md:text-2xl text-neutral-400 font-medium max-w-2xl mx-auto leading-relaxed">We cultivate a global collective of creative minds, focused on the radical pursuit of knowledge and mastery.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300 mb-4 text-center lg:text-left">Manifesto.</div>
                  <h2 className="text-5xl font-black tracking-tighter mb-8 leading-tight text-center lg:text-left">Our Vision for the <span className="italic text-[#8B5CF6]">Creative Frontier.</span></h2>
                  <p className="text-neutral-500 font-medium text-lg leading-relaxed text-center lg:text-left">We believe that mastery is a continuous evolution. Our mission is to provide the architectural framework for thinkers and creators to transcend boundaries.</p>
               </div>
               
               <div className="space-y-10">
                  <div className="flex gap-6 group">
                     <div className="w-16 h-16 bg-neutral-50 text-black rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:bg-black group-hover:text-white transition-all duration-500">
                        <HiLightningBolt />
                     </div>
                     <div>
                        <h4 className="font-black text-xl tracking-tight mb-2 uppercase">Kinetic Learning</h4>
                        <p className="text-neutral-400 font-medium leading-relaxed">Our methodology is optimized for dynamic retention and immediate application in the real world.</p>
                     </div>
                  </div>
                  <div className="flex gap-6 group">
                     <div className="w-16 h-16 bg-neutral-50 text-black rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:bg-black group-hover:text-white transition-all duration-500">
                        <HiUserGroup />
                     </div>
                     <div>
                        <h4 className="font-black text-xl tracking-tight mb-2 uppercase">Elite Collective</h4>
                        <p className="text-neutral-400 font-medium leading-relaxed">Engage with a curated community of scholars and industry pioneers within our interactive ecosystem.</p>
                     </div>
                  </div>
                  <div className="flex gap-6 group">
                     <div className="w-16 h-16 bg-neutral-50 text-black rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:bg-black group-hover:text-white transition-all duration-500">
                        <HiGlobe />
                     </div>
                     <div>
                        <h4 className="font-black text-xl tracking-tight mb-2 uppercase">Planetary Perspective</h4>
                        <p className="text-neutral-400 font-medium leading-relaxed">With insight from over 40 distinct cultures, we deliver a truly global intellectual experience.</p>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="relative group">
               <div className="absolute -inset-10 bg-neutral-50 rounded-[4rem] group-hover:bg-black transition-all duration-1000 -rotate-2"></div>
               <div className="relative overflow-hidden rounded-[3.5rem] shadow-2xl border border-black/5 rotate-2 group-hover:rotate-0 transition-transform duration-1000">
                  <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-all duration-1000"></div>
                  <img 
                     src="/about.png" 
                     alt="Team" 
                     className="w-full h-[600px] object-cover scale-110 group-hover:scale-100 transition-all duration-1000"
                  />
               </div>
            </div>
         </div>

         {/* Values Section */}
         <div className="mt-48 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-12 bg-neutral-50 rounded-[3rem] border border-black/5 group hover:bg-black hover:text-white transition-all duration-700">
               <HiTrendingUp className="text-5xl mb-8 text-neutral-300 group-hover:text-white transition-colors" />
               <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Integrity</h3>
               <p className="opacity-60 font-medium leading-relaxed text-sm">Upholding the highest standards of intellectual honesty and academic rigor.</p>
            </div>
            <div className="p-12 bg-neutral-50 rounded-[3rem] border border-black/5 group hover:bg-black hover:text-white transition-all duration-700">
               <HiAcademicCap className="text-5xl mb-8 text-neutral-300 group-hover:text-white transition-colors" />
               <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Innovation</h3>
               <p className="opacity-60 font-medium leading-relaxed text-sm">Pioneering new educational architectures for the digital and physical worlds.</p>
            </div>
            <div className="p-12 bg-neutral-50 rounded-[3rem] border border-black/5 group hover:bg-black hover:text-white transition-all duration-700">
               <HiCube className="text-5xl mb-8 text-neutral-300 group-hover:text-white transition-colors" />
               <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Collaboration</h3>
               <p className="opacity-60 font-medium leading-relaxed text-sm">Fostering a symbiotic environment where knowledge is shared and expanded.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AboutUs;
