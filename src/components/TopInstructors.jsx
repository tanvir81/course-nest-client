import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const instructors = [
  {
    name: "Christina Brown",
    role: "Frontend Specialist",
    experience: "5+ Years",
    image: "https://i.ibb.co/nq8y14C4/kelly-sikkema-JN0-SUc-TOig0-unsplash.jpg",
    description:
      "Christina Brown blends creativity with code, helping students master responsive design and modern UI frameworks like React and Tailwind CSS.",
  },
  {
    name: "Albert-Dera",
    role: "Full-Stack Mentor",
    experience: "8+ Years",
    image: "https://i.ibb.co/ZRVyYT3z/albert-dera.jpg",
    description:
      "Albert-Dera guides learners through full-stack development with hands-on projects, focusing on scalable architecture and clean code practices.",
  },
  {
    name: "Guillaume-Bleyer",
    role: "Backend Architect",
    experience: "10+ Years",
    image: "https://i.ibb.co/Kj01JPNN/guillaume-bleyer.jpg",
    description:
      "Guillaume-Bleyer teaches backend mastery with Node.js, Express, and MongoDB, emphasizing performance, security, and real-world deployment.",
  },
  {
    name: "Paul-Kapischka",
    role: "UI/UX Designer",
    experience: "6+ Years",
    image: "https://i.ibb.co/5X8JjxMF/paul-kapischka.jpg",
    description:
      "Paul-Kapischka helps students craft intuitive interfaces and user journeys, combining design thinking with practical Figma and prototyping skills.",
  },
  {
    name: "Samuel-Raita",
    role: "DevOps Coach",
    experience: "7+ Years",
    image: "https://i.ibb.co/HTZq5bLS/samuel-raita.jpg",
    description:
      "Samuel-Raita empowers developers to automate workflows, manage CI/CD pipelines, and deploy confidently with Docker and cloud tools.",
  },
  {
    name: "Stefan-Stefancik",
    role: "AI & ML Trainer",
    experience: "9+ Years",
    image: "https://i.ibb.co/SXWSq04w/stefan-stefancik.jpg",
    description:
      "Stefan-Stefancik simplifies complex AI concepts, guiding learners through machine learning models, data pipelines, and ethical AI practices.",
  },
];

const TopInstructors = () => {
  return (
    <section className="pb-20 bg-base-100 text-base-content px-4 md:px-10">
      <h2 className="text-4xl font-bold text-center mb-10">
        Top <span className="text-yellow-500">Instructors</span>
      </h2>
      <Swiper
        key={instructors.length}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          768: { slidesPerView: 2 },
        }}
      >
        {instructors.map((instructor, index) => (
          <SwiperSlide key={index}>
            <div className="w-full bg-base-200 text-base-content shadow-md border border-yellow-300 rounded-xl overflow-hidden flex flex-col sm:flex-row sm:h-80">
              {/* Image */}
              <div className="w-full sm:w-1/2 h-64 sm:h-full overflow-hidden">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover object-center p-6 sm:p-8"
                />
              </div>

              {/* Content */}
              <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center space-y-2">
                <h3 className="text-lg font-semibold">{instructor.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-yellow-200 text-gray-800 dark:text-gray-900 text-xs px-2 py-1 rounded-full">
                    {instructor.role}
                  </span>
                  <span className="bg-green-200 text-gray-800 dark:text-gray-900 text-xs px-2 py-1 rounded-full">
                    {instructor.experience}
                  </span>
                </div>
                <p className="text-sm">{instructor.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopInstructors;
