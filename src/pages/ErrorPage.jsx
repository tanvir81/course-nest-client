import React from "react";
import { useRouteError, Link } from "react-router";
import { HiArrowLeft, HiRefresh, HiShieldExclamation } from "react-icons/hi";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-['Outfit'] antialiased">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Cinematic Icon */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#8B5CF6] opacity-20 blur-3xl rounded-full"></div>
          <div className="relative w-32 h-32 bg-black rounded-[2.5rem] flex items-center justify-center text-6xl text-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <HiShieldExclamation />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black">
            System <span className="italic text-[#8B5CF6]">Divergence.</span>
          </h1>
          <div className="space-y-2">
             <p className="text-xl text-neutral-500 font-medium">
               An unexpected anomaly has been detected in the curriculum grid.
             </p>
             <p className="text-sm font-black uppercase tracking-[0.2em] text-neutral-300">
               {error.statusText || error.message || "Unknown Core Exception"}
             </p>
          </div>
        </div>

        {/* Action Terminal */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
          <Link
            to="/"
            className="px-10 py-5 bg-black text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all shadow-2xl shadow-black/10 flex items-center gap-3"
          >
            <HiArrowLeft className="text-lg" /> Return to Base
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-10 py-5 bg-neutral-50 text-black border border-black/5 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all flex items-center gap-3"
          >
            <HiRefresh className="text-lg" /> Re-initialize
          </button>
        </div>

        {/* Decorative Grid */}
        <div className="pt-12 opacity-10">
          <div className="h-px bg-black w-full"></div>
          <div className="flex justify-between mt-4 font-black text-[10px] uppercase tracking-[0.5em] text-black">
            <span>Err_Identity_0x404</span>
            <span>Protocol_Failure</span>
            <span>Course_Nest_Core</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
