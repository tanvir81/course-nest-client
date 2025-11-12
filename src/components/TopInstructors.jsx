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
      "Christina Brown creativity with code, helping students master responsive design and modern UI frameworks like React and Tailwind CSS.",
  },
  {
    name: "Albert-Dera",
    role: "Full-Stack Mentor",
    experience: "8+ Years",
    image: "https://i.ibb.co/ZRVyYT3z/albert-dera.jpg",
    description:
      "Albert-Dera learners through full-stack development with hands-on projects, focusing on scalable architecture and clean code practices.",
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
    <section className="pb-20">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">
        Top Instructors
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
        }}
      >
        {instructors.map((instructor, index) => (
          <SwiperSlide key={index}>
            <div className="flex bg-base-100 shadow-sm rounded-xl overflow-hidden h-80">
              {/* Left Image */}
              <div className="w-1/2 h-full overflow-hidden">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Right Content */}
              <div className="w-1/2 p-4 flex flex-col justify-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {instructor.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {instructor.role} • {instructor.experience}
                </p>
                <p className="text-sm text-gray-700">
                  {instructor.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopInstructors;
