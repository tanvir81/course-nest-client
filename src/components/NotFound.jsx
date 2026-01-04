import React from "react";
import { Link } from "react-router";
import { HiHome, HiQuestionMarkCircle, HiArrowLeft } from "react-icons/hi";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8 relative overflow-hidden font-['Outfit'] antialiased">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-[0.03]"></div>
      
      <div className="max-w-4xl w-full text-center space-y-16 relative z-10">
         <div className="relative inline-block group">
            <h1 className="text-[12rem] md:text-[20rem] font-black italic text-black leading-none select-none tracking-tighter opacity-5 group-hover:opacity-10 transition-opacity duration-1000">404</h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
               <div className="bg-black text-white px-10 py-4 rounded-full font-black text-xs md:text-sm shadow-[0_0_50px_rgba(0,0,0,0.1)] tracking-[0.5em] uppercase whitespace-nowrap">
                  Void Detected
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Coordinates <span className="italic text-[#8B5CF6]">Lost.</span></h2>
            <p className="text-neutral-500 font-medium text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
               The architectural path you seeking has been decommissioned or remains undiscovered within our current framework.
            </p>
         </div>

         <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Link 
               to="/" 
               className="px-12 py-5 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all shadow-2xl shadow-black/10 flex items-center gap-4"
            >
               <HiHome className="text-lg" /> Return to Origin
            </Link>
            <Link 
               to="/contact" 
               className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 hover:text-black transition-colors flex items-center gap-4"
            >
               Request Assistance <HiArrowLeft className="rotate-180" />
            </Link>
         </div>
      </div>
      
      {/* Decorative minimalist elements */}
      <div className="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-l from-black/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-black/5 to-transparent"></div>
    </div>
  );
};

export default NotFound;
