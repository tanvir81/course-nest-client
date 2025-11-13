import React from "react";
import HeroSection from "../HeroSection";
import PopularCourses from "../PopularCourses";
import WhyChooseUs from "../WhyChooseUs";
import TopInstructors from "../TopInstructors";

const Home = () => {
  return (
    <div className="space-y-12 px-4 md:px-8">
      <HeroSection />
      <PopularCourses />
      <WhyChooseUs />
      <TopInstructors />
    </div>
  );
};

export default Home;
