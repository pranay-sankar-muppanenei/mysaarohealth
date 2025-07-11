import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../components/layout/Header2";
import Button from "../components/ui/Button";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

 const handleLogin = () => {
  let newErrors = {};

  // Email presence check
  if (!email) {
    newErrors.email = "Email is required.";
  } else {
    // Email format regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }
  }

  // Password presence and strength check
  if (!password) {
    newErrors.password = "Password is required.";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters.";
  }
  // You can add more password rules here if needed

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    // All validations passed
    navigate("/"); // Replace with your route
  }
};


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header2 />
      <div className="flex flex-1">
        {/* Left form section */}
        <div className="w-1/3 px-10 py-12 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
            Welcome back
          </h2>
          <div className="mb-4">
            <p className="text-sm mb-1">Email Address</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setErrors((prev) => ({ ...prev, email: "" }));
                setEmail(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-xl bg-[#c5c7c9] bg-opacity-20 text-sm focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-1">
            <p className="text-sm mb-1">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setErrors((prev) => ({ ...prev, password: "" }));
                setPassword(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-xl bg-[#c5c7c9] bg-opacity-20 text-sm focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <p className="text-xs text-purple-600 mb-4 cursor-pointer hover:underline">
            Forgot Password?
          </p>

          <Button
            className="w-full  text-white rounded-full py-2 text-sm hover:bg-purple-700 transition"
            onClick={handleLogin}
          >
            Log In
          </Button>

          <p className="text-xs text-center mt-3">
            Need an account?{" "}
            <span
              className="text-purple-600 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
          <p
            className="text-xs text-center text-purple-600 cursor-pointer mt-1 hover:underline"
            onClick={() => navigate("/phonelogin")}
          >
            Login With Phone
          </p>
        </div>

        {/* Right image section */}
        <div className="w-1/2 h-[calc(100vh-80px)] bg-[#fde7d9] flex-1 items-end justify-end">
          <img
            src="/path/to/your/image.png"
            alt="Doctor illustration"
            className="h-full w-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
