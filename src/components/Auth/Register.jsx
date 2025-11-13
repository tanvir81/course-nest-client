import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate, Link } from "react-router";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

const Register = () => {
  const { register, googleLogin } = useAuth();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const validatePassword = (pwd) => {
    return /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && pwd.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error(
        "Password must include uppercase, lowercase, and be at least 6 characters."
      );
      return;
    }
    try {
      const userCredential = await register(email, password);
      const currentUser = userCredential.user;

      await updateProfile(currentUser, {
        displayName: name || "Anonymous",
        photoURL: photo || "https://i.postimg.cc/3x3QzSGq/profile.png",
      });

      await currentUser.reload();

      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed: " + err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      toast.error("Google sign-in failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-neutral dark:to-base-300 animate-[pulse_6s_ease-in-out_infinite]" />

      {/* Form Container */}
      <div
        className="relative z-10 max-w-md w-full bg-base-200 text-base-content shadow-md rounded-xl p-6 space-y-6"
        data-aos="fade-up"
      >
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              type="text"
              placeholder="Profile photo URL"
              className="input input-bordered w-full"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn bg-yellow-400 hover:bg-yellow-500 text-black w-full"
          >
            Register
          </button>
        </form>

        <div className="divider">or</div>

        <button
          onClick={handleGoogle}
          className="btn w-full mt-4 bg-base-100 text-base-content border border-base-content"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="mr-2"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Register with Google
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="link text-yellow-400 hover:text-yellow-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
