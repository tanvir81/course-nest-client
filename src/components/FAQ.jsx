import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: 1,
    question: "How do I get my certificate?",
    answer:
      "Certificates are automatically generated upon 100% completion of course modules and passing the final assessment.",
  },
  {
    id: 2,
    question: "Can I access courses offline?",
    answer:
      "Yes, our mobile app allows you to download modules and watch them even without an internet connection.",
  },
  {
    id: 3,
    question: "Is there a refund policy?",
    answer:
      "We offer a 7-day money-back guarantee if you are not satisfied with the course content, no questions asked.",
  },
  {
    id: 4,
    question: "Do I get lifetime access?",
    answer:
      "Absolutely! Once you enroll in a course, you have permanent access to all its current and future updates.",
  },
];

const FAQItem = ({ faq, isOpen, toggle }) => {
  return (
    <div
      className="bg-white border border-neutral-100 shadow-sm rounded-[1.5rem] overflow-hidden hover:border-[#8B5CF6]/30 transition-all duration-300 cursor-pointer group"
      onClick={toggle}
    >
      <div className="px-8 py-5 flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-bold text-black">
          {faq.question}
        </h3>
        <div
          className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20"
              : "bg-neutral-50 text-neutral-400 group-hover:bg-[#8B5CF6]/10 group-hover:text-[#8B5CF6]"
          }`}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-6 pt-0 text-neutral-500 leading-relaxed text-base">
              <div className="pt-2 border-t border-neutral-100">
                {faq.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 mb-6 shadow-sm">
            Frequently Asked Questions
          </div>
          <h2 className="text-5xl font-extrabold tracking-tighter text-black mb-6">
            Have any <span className="text-[#8B5CF6] font-black italic" style={{ fontWeight: 900, fontStyle: 'italic' }}>questions?</span>
          </h2>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            Everything you need to know about our learning platform. Can't find
            the answer you're looking for? Chat with our team.
          </p>
        </div>

        <div className="space-y-4 ">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              toggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FAQ;
