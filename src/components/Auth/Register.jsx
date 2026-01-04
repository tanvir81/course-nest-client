import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate, Link } from "react-router";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { HiUser, HiMail, HiLockClosed, HiPhotograph, HiArrowLeft, HiCheckCircle, HiUpload } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";
import ButtonLoader from "../Shared/ButtonLoader";
import { auth } from "../../firebase/firebase.config";

const Register = () => {
  const { register, googleLogin, setUser } = useAuth();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    return /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && pwd.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error(
        "Password needs an uppercase, a lowercase, and 6+ characters."
      );
      return;
    }
    setLoading(true);
    try {
      const userCredential = await register(email, password);
      const currentUser = userCredential.user;

      await updateProfile(currentUser, {
        displayName: name || "Anonymous",
        photoURL: photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=random`,
      });

      await currentUser.reload();
      
      // Force immediate state sync with the new profile data to prevent the auth observer's "nano-second glitch"
      const finalUser = {
        ...auth.currentUser,
        displayName: name || "Anonymous",
        photoURL: photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=random`
      };
      
      setUser(finalUser); 
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Welcome aboard!");
      navigate("/");
    } catch (err) {
      toast.error("Google sign-in failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white antialiased font-['Outfit']">
      {/* Left Side: Visual */}
      <div className="hidden lg:flex section-banner items-center justify-center p-20">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center space-y-10">
           <h2 className="text-6xl font-black text-white leading-[1.1] tracking-tighter">Elevate Your <br/><span className="text-[#8B5CF6] italic">Potential.</span></h2>
           <p className="text-neutral-400 text-xl font-medium max-w-md mx-auto leading-relaxed">Join the most active community of elite learners and educators in the digital age.</p>
           <div className="w-80 h-80 mx-auto border border-white/10 rounded-[3rem] p-8 flex items-center justify-center group hover:border-white transition-all duration-700">
              <div className="w-full h-full border border-white/5 rounded-[2rem] flex items-center justify-center text-8xl font-black text-white group-hover:bg-white group-hover:text-black transition-all duration-700">
                CN
              </div>
           </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-8 md:p-20 relative">
        <Link to="/" className="absolute top-10 left-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-all">
           <HiArrowLeft className="text-lg" /> Back to Home
        </Link>

        <div className="max-w-md w-full space-y-10">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-4 text-neutral-900 leading-tight">Create <br/> Account</h1>
            <p className="text-neutral-500 font-medium text-lg leading-relaxed">Begin your creative journey with us today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-neutral-400 ml-1">Full Name</label>
                  <div className="relative">
                     <HiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 text-xl" />
                     <input
                       type="text"
                       placeholder="Identity"
                       className="w-full pl-14 h-16 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:border-black focus:bg-white focus:ring-0 outline-none transition-all font-medium"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       required
                     />
                  </div>
               </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-neutral-400 ml-1">Profile Photo</label>
                  <div className="relative group">
                     {photo ? (
                        <div className="relative w-full h-16 rounded-[1.5rem] overflow-hidden border border-black/5 group-hover:border-black/20 transition-all">
                           <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                           <button 
                              type="button" 
                              onClick={() => setPhoto("")}
                              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white font-bold text-xs uppercase tracking-widest"
                           >
                              Remove
                           </button>
                        </div>
                     ) : (
                        <label className="flex items-center gap-4 w-full h-16 pl-6 rounded-[1.5rem] bg-neutral-50 border border-black/5 cursor-pointer hover:bg-neutral-100 hover:border-black/20 transition-all">
                           <HiUpload className="text-xl text-neutral-400" />
                           <span className="text-neutral-400 font-medium select-none">Upload Image</span>
                           <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                 const file = e.target.files[0];
                                 if (!file) return;
                                 setLoading(true);
                                 try {
                                    const formData = new FormData();
                                    formData.append("image", file);
                                    const res = await axios.post(
                                       `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY || "51cf2af8b48eb5d916dd2d4dd09b0a3f"}`,
                                       formData
                                    );
                                    setPhoto(res.data.data.display_url);
                                    toast.success("Photo uploaded!");
                                 } catch (err) {
                                    toast.error("Upload failed");
                                 } finally {
                                    setLoading(false);
                                 }
                              }}
                              className="hidden"
                           />
                        </label>
                     )}
                  </div>
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-neutral-400 ml-1">Email Address</label>
              <div className="relative">
                <HiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 text-xl" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full pl-14 h-16 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:border-black focus:bg-white focus:ring-0 outline-none transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-neutral-400 ml-1">Secure Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 text-xl" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-14 h-16 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:border-black focus:bg-white focus:ring-0 outline-none transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Validation List */}
            <div className="grid grid-cols-2 gap-4 p-2">
               <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${password.length >= 6 ? "text-black" : "opacity-30"}`}>
                  <HiCheckCircle /> 6+ Characters
               </div>
               <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${/[A-Z]/.test(password) ? "text-black" : "opacity-30"}`}>
                  <HiCheckCircle /> Uppercase
               </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-black text-white rounded-[1.5rem] font-black text-lg hover:bg-neutral-800 transition-all duration-300 shadow-2xl shadow-black/10 flex items-center justify-center"
            >
              {loading ? <ButtonLoader /> : "Get Started →"}
            </button>
          </form>

          <div className="relative py-4">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/5"></div></div>
             <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-neutral-400 bg-white px-4">OR REGISTER WITH</div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full h-16 rounded-[1.5rem] border border-black/10 flex items-center justify-center gap-4 font-bold hover:bg-neutral-50 transition-all duration-300"
          >
            <FaGoogle className="text-xl" />
            Sign up with Google
          </button>

          <p className="text-center font-bold text-neutral-500">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-black font-black hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
