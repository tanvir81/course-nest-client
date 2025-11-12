import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate, Link } from "react-router";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const Register = () => {
  const { register, googleLogin } = useAuth();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    return /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && pwd.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      alert("Password must have uppercase, lowercase, and be at least 6 chars");
      return;
    }
    try {
      const userCredential = await register(email, password);
      const currentUser = userCredential.user;

      // Update profile with Name  and photo
      await updateProfile(currentUser, {
        displayName: name || "Anonymous",
        photoURL: photo || "https://i.postimg.cc/3x3QzSGq/profile.png",
      });

      await currentUser.reload();

      toast.success("Registration successfuly");

      console.log("Updated user:", currentUser);

      navigate("/");
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      alert("Google sign‑in failed: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Photo URL"
          className="input input-bordered w-full"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>

      {/* Google option */}
      <button onClick={handleGoogle} className="btn btn-outline w-full mt-4">
        Register with Google
      </button>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="link">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
