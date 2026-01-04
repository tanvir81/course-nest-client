import React from "react";

const GlobalLoader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-8">
        {/* Animated Logo */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 w-32 h-32 border-4 border-black/10 rounded-full animate-spin" 
               style={{ borderTopColor: '#000', animationDuration: '1.5s' }}>
          </div>
          
          {/* Logo */}
          <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center transform transition-all duration-700 hover:scale-110">
            <span className="text-5xl font-black text-white tracking-tighter">CN</span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-black tracking-tighter text-black">
            Course<span className="italic text-neutral-400">Nest</span>
          </h3>
          <p className="text-sm font-medium text-neutral-400 animate-pulse">
            {message}
          </p>
        </div>

        {/* Dots Animation */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-black rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
