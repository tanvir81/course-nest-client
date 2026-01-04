import React from "react";

const SectionHeader = ({ title, highlight, subtitle, center = true }) => {
  return (
    <div
      className={`mb-16 ${center ? "text-center" : "text-left"}`}
      data-aos="fade-up"
    >
      <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-neutral-900 leading-[1.1]">
        {title} <span className="text-[#8B5CF6] italic">{highlight}</span>
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl text-neutral-500 text-lg md:text-xl font-medium leading-relaxed ${
            center ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
