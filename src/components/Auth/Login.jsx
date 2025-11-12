import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-hot-toast";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google login failed: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        {/* forget password */}
        <div className="text-right">
          <span className="text-sm text-gray-500 cursor-pointer">
            Forget Password?
          </span>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      <button onClick={handleGoogle} className="btn btn-outline w-full mt-4">
        Login with Google
      </button>

      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <Link to="/register" className="link">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
