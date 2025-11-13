import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="relative py-16 bg-base-100 text-base-content">
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-10">
        <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">
          Why Choose <span className="text-yellow-500">CourseNest</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {[
            {
              title: "Expert Mentorship",
              points: [
                "Learn from seasoned professionals with real-world experience",
                "Get personalized feedback and career guidance",
                "Access mentors who care about your growth",
              ],
              aos: "fade-right",
              delay: 100,
            },
            {
              title: "Hands-On Learning",
              points: [
                "Build real projects that showcase your skills",
                "Apply concepts through interactive assignments",
                "Strengthen your portfolio with practical work",
              ],
              aos: "fade-up",
              delay: 200,
            },
            {
              title: "Career-Focused Tracks",
              points: [
                "Choose learning paths aligned with your goals",
                "Master frontend, backend, or full-stack development",
                "Earn certifications that boost your job prospects",
              ],
              aos: "fade-left",
              delay: 300,
            },
            {
              title: "Real-World Projects",
              points: [
                "Build full-stack apps that mirror industry standards",
                "Work with real APIs, databases, and deployment tools",
                "Showcase your work in a professional portfolio",
              ],
              aos: "fade-up",
              delay: 200,
            },
            {
              title: "Flexible Learning",
              points: [
                "Learn at your own pace with lifetime access",
                "Access content anytime, from any device",
                "Balance learning with your personal schedule",
              ],
              aos: "fade-left",
              delay: 300,
            },
            {
              title: "Career Support",
              points: [
                "Get resume tips and interview prep from industry pros",
                "Earn certificates to boost your credibility",
                "Join a network of learners and hiring partners",
              ],
              aos: "fade-up",
              delay: 400,
            },
          ].map((card, index) => (
            <div
              key={index}
              className="card bg-base-200 text-base-content shadow-md rounded-lg"
              data-aos={card.aos}
              data-aos-delay={card.delay}
            >
              <div className="card-body">
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <ul className="flex flex-col gap-2 text-sm">
                  {card.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
