import CountUp from "react-countup";

const Statistics = () => {
  const stats = [
    { label: "Active Students", end: 15000, suffix: "+" },
    { label: "Total Courses", end: 200, suffix: "+" },
    { label: "Expert Instructors", end: 50, suffix: "+" },
    { label: "Success Stories", end: 5000, suffix: "+" },
  ];

  return (
    <section className="bg-white text-black section-padding relative overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
        {stats.map((stat, index) => (
          <div key={index} className="text-center group" data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="text-5xl md:text-7xl font-black mb-3 tracking-tighter group-hover:scale-110 transition-transform duration-500">
              <CountUp 
                end={stat.end} 
                duration={2.5} 
                separator="," 
                suffix={stat.suffix} 
                enableScrollSpy 
                scrollSpyOnce 
              />
            </div>
            <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-neutral-500">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
