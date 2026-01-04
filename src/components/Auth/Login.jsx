import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-hot-toast";
import { HiMail, HiLockClosed, HiArrowLeft } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";
import ButtonLoader from "../Shared/ButtonLoader";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back! Happy learning.");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google login failed: " + err.message);
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
           <h2 className="text-6xl font-black text-white leading-[1.1] tracking-tighter">Your Journey <br/><span className="text-[#8B5CF6] italic">Starts Here.</span></h2>
           <p className="text-neutral-400 text-xl font-medium max-w-md mx-auto leading-relaxed">Access the world's best courses and learn from industry experts at your own pace with elegant precision.</p>
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

        <div className="max-w-md w-full space-y-12">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-4 text-neutral-900 leading-tight">Welcome <br/> Back</h1>
            <p className="text-neutral-500 font-medium text-lg leading-relaxed">Enter your credentials to access your creative dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
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
                <label className="text-[10px] uppercase font-black tracking-widest text-neutral-400 ml-1">Password</label>
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
            </div>

            <div className="flex justify-between items-center text-sm">
               <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded-md border-neutral-300 text-black focus:ring-black cursor-pointer" />
                  <span className="text-neutral-500 font-bold group-hover:text-black transition-colors">Remember me</span>
               </label>
               <span className="text-black font-black hover:underline cursor-pointer tracking-tight">Forgot Password?</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-black text-white rounded-[1.5rem] font-black text-lg hover:bg-neutral-800 transition-all duration-300 shadow-2xl shadow-black/10 flex items-center justify-center"
            >
              {loading ? <ButtonLoader /> : "Sign In →"}
            </button>
          </form>

          <div className="relative py-4">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/5"></div></div>
             <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-neutral-400 bg-white px-4">OR CONTINUE WITH</div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full h-16 rounded-[1.5rem] border border-black/10 flex items-center justify-center gap-4 font-bold hover:bg-neutral-50 transition-all duration-300"
          >
            <FaGoogle className="text-xl" />
            Sign in with Google
          </button>

          <p className="text-center font-bold text-neutral-500">
            New here?{" "}
            <Link
              to="/register"
              className="text-black font-black hover:underline"
            >
              Start for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
