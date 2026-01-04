import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 border border-white/20 rounded-lg flex items-center justify-center font-black text-white text-sm group-hover:bg-white group-hover:text-black transition-all">
                CN
              </div>
              <span className="text-xl font-bold tracking-tight text-white">CourseNest</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs font-medium">
              A high-end platform for digital creative learning. We empower professionals to master industry-relevant skills with elegant precision.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"><FaFacebook /></a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"><FaTwitter /></a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"><FaLinkedin /></a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"><FaGithub /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-500">Platform</h4>
            <ul className="space-y-4 text-sm font-medium text-neutral-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-500">Creative Hub</h4>
            <ul className="space-y-4 text-sm font-medium text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Branding</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Creative Strategy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-500">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-neutral-400">
              <li className="flex items-center gap-3"><FaEnvelope className="text-white/20" /> support@coursenest.com</li>
              <li className="flex items-center gap-3"><FaPhone className="text-white/20" /> +1 (800) 123-4567</li>
              <li className="flex items-center gap-3"><FaMapMarkerAlt className="text-white/20" /> Silicon Valley, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
          <p>© 2026 CourseNest Learning. Elegant Intelligence.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Status: Operational</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
