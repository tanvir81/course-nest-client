import React from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully! Check your email for a gift.");
    e.target.reset();
  };

  return (
    <section className="section-padding bg-white font-['Outfit'] antialiased">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto bg-neutral-50 border border-black/5 rounded-[4rem] p-16 md:p-24 flex flex-col md:flex-row items-center gap-16 shadow-2xl relative group"
      >
        
        <div className="flex-1 text-black text-center md:text-left relative z-10">
           <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 mb-6">Stay Curated</div>
           <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none italic text-[#8B5CF6]">Collaborate.</h2>
           <p className="text-neutral-400 text-xl font-medium max-w-xl leading-relaxed">Join 100k+ students receiving high-fidelity updates on creative industry trends.</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col gap-6 relative z-10">
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email Transmission" 
              required
              className="w-full md:w-96 h-20 bg-white text-black rounded-full px-10 border border-black/10 focus:bg-neutral-50 focus:border-black focus:ring-0 outline-none transition-all font-bold placeholder:text-neutral-400 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em]" 
            />
          </div>
          <button type="submit" className="h-20 px-12 bg-black text-white font-black rounded-full hover:bg-neutral-800 transition-all duration-500 text-[10px] uppercase tracking-[0.4em] shadow-2xl shadow-black/10 whitespace-nowrap">
            Join Perspective →
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Newsletter;
