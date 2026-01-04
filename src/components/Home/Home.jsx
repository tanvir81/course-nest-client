import React from "react";
import { Link } from "react-router";
import HeroSection from "../HeroSection";
import HeroInfo from "../HeroInfo";
import PopularCourses from "../PopularCourses";
import WhyChooseUs from "../WhyChooseUs";
import TopInstructors from "../TopInstructors";
import Statistics from "../Statistics";
import Testimonials from "../Testimonials";
import FAQ from "../FAQ";
import Newsletter from "../Newsletter";

const Home = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <HeroInfo />
      
      {/* Section 2: Statistics */}
      <Statistics />
      
      {/* Section 3: Popular Courses */}
      <PopularCourses />
      
      {/* Section 4: Why Choose Us (Features) */}
      <WhyChooseUs />
      
      {/* Section 5: Top Instructors */}
      <TopInstructors />
      
      {/* Section 6: User Testimonials */}
      <Testimonials />
      
      {/* Section 7: FAQ */}
      <FAQ />

      {/* Section 8: Newsletter */}
      <Newsletter />
      
      {/* Section 9: Join CTA */}
      <section className="section-padding text-center bg-white text-black">
        <div className="max-w-4xl mx-auto relative z-10" data-aos="zoom-in">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Ready to start your <span className="italic text-[#8B5CF6]">Journey?</span></h2>
          <p className="text-lg md:text-xl text-neutral-500 mb-12 max-w-2xl mx-auto font-medium">Don't wait for the right moment. The right moment is now. Create your account and get access to 200+ free and premium courses.</p>
          <div className="flex flex-wrap justify-center gap-6">
             <Link to="/register" className="px-12 py-5 bg-black text-white font-black rounded-full hover:bg-neutral-800 transition-all duration-300 shadow-xl">Register Now</Link>
             <Link to="/courses" className="px-12 py-5 bg-transparent text-black border border-black/10 font-black rounded-full hover:bg-black hover:text-white transition-all duration-300">Browse Courses</Link>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
