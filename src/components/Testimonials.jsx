import React from "react";
import { motion } from "framer-motion";

// Import images directly
import img1 from "../assets/Reviwer/Reviewer-1.jpg";
import img2 from "../assets/Reviwer/reviewer-2.jpg";
import img3 from "../assets/Reviwer/reviewer-3.jpg";
import img4 from "../assets/Reviwer/reviewer-4.jpg";
import img5 from "../assets/Reviwer/reviewer-5.jpg";
import img6 from "../assets/Reviwer/reviewer-6.jpg";
import img7 from "../assets/Reviwer/reviewer-7.jpg";
import img8 from "../assets/Reviwer/reviewer-8.jpg";
import img9 from "../assets/Reviwer/reviewer-9.png";
import img10 from "../assets/Reviwer/reviewer-10.jpg";
import img11 from "../assets/Reviwer/reviewer-11.jpg";

const reviewers = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Event Manager",
    image: img1,
    text: "CourseNest made organizing my tech conference a breeze. Highly recommended!",
  },
  {
    id: 2,
    name: "David Miller",
    role: "Concert Promoter",
    image: img2,
    text: "The intuitive interface and powerful tools helped us sell out in record time.",
  },
  {
    id: 3,
    name: "Emily Chan",
    role: "Art Director",
    image: img3,
    text: "A game-changer for local art exhibitions. Visibility has increased significantly.",
  },
  {
    id: 4,
    name: "Michael Ross",
    role: "Community Lead",
    image: img4,
    text: "Connecting with attendees has never been easier. Love the new design!",
  },
  {
    id: 5,
    name: "Jessica Lee",
    role: "Workshop Host",
    image: img5,
    text: "Simple, effective, and beautiful. My attendees love the booking experience.",
  },
  {
    id: 6,
    name: "Robert Fox",
    role: "Festival Organizer",
    image: img6,
    text: "Robust features that scale with your event. Exactly what we needed.",
  },
  {
    id: 7,
    name: "Lisa Wong",
    role: "Corporate Events",
    image: img7,
    text: "Professional and reliable. The analytic dashboard is fantastic.",
  },
  {
    id: 8,
    name: "James Carter",
    role: "Music Producer",
    image: img8,
    text: "The best platform for independent artists to promote their gigs.",
  },
  {
    id: 9,
    name: "Maria Garcia",
    role: "Food Critic",
    image: img9,
    text: "Discovering food festivals is a joy with CourseNest's curated lists.",
  },
  {
    id: 10,
    name: "Thomas Anderson",
    role: "Tech Innovator",
    image: img10,
    text: "Seamless integration and top-notch support. 10/10 platform.",
  },
  {
    id: 11,
    name: "Olivia Brown",
    role: "Charity Coordinator",
    image: img11,
    text: "Helped us raise more funds by reaching a wider audience effortlessly.",
  },
];

// Duplicate the array to ensure seamless infinite scroll
const marqueeReviewers = [...reviewers, ...reviewers, ...reviewers];

const ReviewCard = ({ reviewer }) => (
  <div className="card bg-white w-[22rem] md:w-[26rem] border border-gray-200 p-8 rounded-[2rem] flex-shrink-0 mx-4 hover:border-gray-300 transition-colors">
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={reviewer.image}
              alt={reviewer.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base leading-tight">
            {reviewer.name}
          </h3>
          <p className="text-xs font-medium text-gray-500 mt-0.5">
            {reviewer.role}
          </p>
        </div>
      </div>
      {/* Social Icons (Mock) */}
      <div className="flex gap-2 text-gray-400">
        <svg
          className="w-4 h-4 hover:text-gray-600 cursor-pointer"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
        <svg
          className="w-4 h-4 hover:text-gray-600 cursor-pointer"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
        <svg
          className="w-4 h-4 hover:text-gray-600 cursor-pointer"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </div>
    </div>
    <p className="text-gray-600 text-[0.95rem] leading-relaxed font-normal">
      "{reviewer.text}"
    </p>
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 mb-6 shadow-sm">
            Sweet words of love
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
            User comments <br /> <span>about our</span>{" "}
            <span className="text-[#8B5CF6] italic font-black" style={{ fontWeight: 900, fontStyle: 'italic' }}> Courses</span>
          </h2>
        </div>

        {/* Row 1: Left to Right */}
        <div
          className="flex mb-8 w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <motion.div
            className="flex"
            animate={{ x: [0, -2000] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 50,
            }}
          >
            {marqueeReviewers.map((reviewer, index) => (
              <ReviewCard key={`row1-${index}`} reviewer={reviewer} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left */}
        <div
          className="flex w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <motion.div
            className="flex"
            initial={{ x: -2000 }}
            animate={{ x: 0 }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 55,
            }}
          >
            {marqueeReviewers.map((reviewer, index) => (
              <ReviewCard key={`row2-${index}`} reviewer={reviewer} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
