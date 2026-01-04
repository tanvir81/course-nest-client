import React from "react";
import SectionHeader from "./Shared/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const instructors = [
  {
    name: "Baily-Riff",
    role: "Visual Art Specialist",
    experience: "5+ Years",
    image: "https://i.ibb.co/20KpRPBC/pexels-moose-photos-170195-1036622.jpg",
    description:
      "Christina Brown blends creativity with code, helping students master responsive design and modern UI frameworks like React and Tailwind CSS.",
  },
  {
    name: "Albert Dera",
    role: "Full-Stack Mentor",
    experience: "8+ Years",
    image: "https://i.ibb.co/ZRVyYT3z/albert-dera.jpg",
    description:
      "Albert guides learners through full-stack development with hands-on projects, focusing on scalable architecture and clean code practices.",
  },
  {
    name: "Alice Dean",
    role: "Backend Architect",
    experience: "10+ Years",
    image: "https://i.ibb.co/PzwJh60P/manager-1.jpg",
    description:
      "Guillaume teaches backend mastery with Node.js and MongoDB, emphasizing performance, security, and real-world deployment.",
  },
  {
    name: "Paul Kapischka",
    role: "UI/UX Designer",
    experience: "6+ Years",
    image: "https://i.ibb.co/5X8JjxMF/paul-kapischka.jpg",
    description:
      "Paul helps students craft intuitive interfaces, combining design thinking with practical Figma and prototyping skills.",
  },
];

const TopInstructors = () => {
  return (
    <section className="section-padding bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Expert"
          highlight="Instructors"
          subtitle="Learn from industry-leading creatives who have worked with the world's most innovative brands."
        />

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
          className="pb-20 instructor-swiper"
        >
          {instructors.map((instructor, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border border-black/5 rounded-[2.5rem] overflow-hidden flex flex-col sm:flex-row h-full sm:h-[400px] group hover:border-black/10 transition-all duration-500">
                {/* Image */}
                <div className="w-full sm:w-1/2 h-80 sm:h-full overflow-hidden">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 p-8"
                  />
                </div>

                {/* Content */}
                <div className="w-full sm:w-1/2 p-10 flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight mb-2">
                      {instructor.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 uppercase tracking-widest text-[10px] font-black text-neutral-500">
                      <span>{instructor.role}</span>
                      <span className="opacity-30">•</span>
                      <span>{instructor.experience} Exp</span>
                    </div>
                  </div>
                  <p className="text-black font-medium leading-relaxed italic text-sm md:text-base">
                    "{instructor.description}"
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopInstructors;
