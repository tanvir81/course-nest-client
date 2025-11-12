import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="relative py-16 bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 "></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Why Choose <span className="text-yellow-500">CourseNest</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-6 px-6 md:px-0">
          {/* Card 1 */}
          <div className="card w-full md:w-96 bg-white shadow-sm">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-gray-800">
                Expert Mentorship
              </h2>
              <ul className="mt-6 flex flex-col gap-2 text-sm text-gray-700">
                <li>
                  Learn from seasoned professionals with real-world experience
                </li>
                <li> Get personalized feedback and career guidance</li>
                <li> Access mentors who care about your growth</li>
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card w-full md:w-96 bg-white shadow-sm">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-gray-800">
                Hands-On Learning
              </h2>
              <ul className="mt-6 flex flex-col gap-2 text-sm text-gray-700">
                <li> Build real projects that showcase your skills</li>
                <li> Apply concepts through interactive assignments</li>
                <li> Strengthen your portfolio with practical work</li>
              </ul>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card w-full md:w-96 bg-white shadow-sm">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-gray-800">
                Career-Focused Tracks
              </h2>
              <ul className="mt-6 flex flex-col gap-2 text-sm text-gray-700">
                <li> Choose learning paths aligned with your goals</li>
                <li> Master frontend, backend, or full-stack development</li>
                <li> Earn certifications that boost your job prospects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
