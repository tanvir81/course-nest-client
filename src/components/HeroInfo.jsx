import React from "react";
import { HiLightningBolt, HiSparkles, HiShieldCheck, HiArrowRight } from "react-icons/hi";

const HeroInfo = () => {
  const infoItems = [
    {
      icon: <HiLightningBolt className="text-3xl" />,
      title: "Real-World Impact",
      description: "Our courses are designed by industry veterans to give you actionable skills that you can use on day one."
    },
    {
      icon: <HiSparkles className="text-3xl" />,
      title: "Creative Mastery",
      description: "Dive deep into specialized creative niches that traditional education systems often overlook."
    },
    {
      icon: <HiShieldCheck className="text-3xl" />,
      title: "Verified Excellence",
      description: "Join a community of 100k+ students and get certified by the world's leading creative instructors."
    }
  ];

  return (
    <section className="bg-white py-24 px-6 md:px-12 border-b border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {infoItems.map((item, index) => (
            <div 
               key={index} 
               className="space-y-6 group cursor-default"
               data-aos="fade-up"
               data-aos-delay={index * 100}
            >
              <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center border border-black/5 group-hover:bg-black group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black tracking-tight text-neutral-900 leading-tight">
                {item.title}
              </h3>
              <p className="text-neutral-500 font-medium leading-relaxed">
                {item.description}
              </p>
              <div className="pt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-300 group-hover:text-black transition-colors">
                 Learn More <HiArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroInfo;
