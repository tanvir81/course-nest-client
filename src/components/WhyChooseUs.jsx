import React from "react";
import SectionHeader from "./Shared/SectionHeader";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Expert Mentorship",
      description:
        "Learn from seasoned professionals with real-world experience. Get personalized feedback and career guidance tailored to your creative path.",
    },
    {
      title: "Hands-On Learning",
      description:
        "Build real projects that showcase your skills. Apply concepts through interactive assignments that strengthen your portfolio.",
    },
    {
      title: "Career-Focused Tracks",
      description:
        "Choose learning paths aligned with your goals. Master frontend, backend, or full-stack development with industry-backed certifications.",
    },
    {
      title: "Real-World Projects",
      description:
        "Build full-stack apps that mirror industry standards. Work with real APIs, databases, and professional deployment tools.",
    },
    {
      title: "Flexible Learning",
      description:
        "Learn at your own pace with lifetime access. Access content anytime, from any device, balancing learning with your personal schedule.",
    },
    {
      title: "Full Career Support",
      description:
        "Get resume tips and interview prep from industry pros. Earn certificates to boost your credibility and join our exclusive hiring network.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Why Choose"
          highlight="CourseNest"
          subtitle="We provide a high-end learning infrastructure designed for the next generation of digital creatives."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-10 border border-black/5 rounded-[2.5rem] bg-neutral-50/30 hover:bg-black hover:text-white transition-all duration-500 group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-4xl font-black mb-6 opacity-10 group-hover:opacity-20 transition-opacity">
                0{index + 1}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="opacity-60 font-medium leading-relaxed group-hover:opacity-80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
