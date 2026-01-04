import React from "react";

const ButtonLoader = ({ className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Three dots animation */}
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-current rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonLoader;
