import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const HeroSection = () => {
  const images = ["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg"];
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] w-full bg-black overflow-hidden">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${
              index === currentImage
                ? "opacity-40 scale-105"
                : "opacity-0 scale-100"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
        <div className="max-w-4xl space-y-10">
          <div className="inline-block overflow-hidden">
            <span
              className={`block text-white/50 text-xs font-bold uppercase tracking-[0.4em] transition-all duration-1000 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Future-Proof Your Career
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
            <span className="block overflow-hidden">
              <span
                className={`block transition-all duration-1000 delay-200 ease-out ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Learn Through A
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className={`block transition-all duration-1000 delay-500 ease-out ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Collection Of Over 100
              </span>
            </span>
            <span className="block overflow-hidden text-[#8B5CF6]">
              <span
                className={`block transition-all duration-1000 delay-700 ease-out italic ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Creative Courses
              </span>
            </span>
          </h1>

          <p
            className={`text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed transition-all duration-1000 delay-1000 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            From creative design to business strategy, explore practical online
            courses led by experts who've been there, done that. Built for
            digital creatives.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-6 pt-10 transition-all duration-1000 delay-[1200ms] ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              to="/courses"
              className="px-12 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-[#8B5CF6] hover:text-white transition-all duration-300 shadow-2xl shadow-white/10 text-center"
            >
              Browse Courses
            </Link>
            <button className="px-12 py-5 bg-transparent text-white border border-white/20 font-bold text-lg rounded-full hover:bg-white/10 transition-all duration-300 text-center">
              Our Story
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Slide Indicator */}
      <div className="absolute bottom-12 right-12 z-20 flex gap-4">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === currentImage ? "w-12 bg-white" : "w-4 bg-white/20"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
