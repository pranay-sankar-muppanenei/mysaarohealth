import React, { useState } from "react";
import Header2 from "../components/layout/Header2";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const SignupStepsPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const validateForm = () => {
  const newErrors = {};
  const { fullName, email, mobile, password, confirmPassword } = formData;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!fullName.trim()) newErrors.fullName = "Full name is required.";

  if (!email.trim()) newErrors.email = "Email is required.";
  else if (!emailRegex.test(email)) newErrors.email = "Invalid email format.";

  if (!mobile.trim()) newErrors.mobile = "Mobile number is required.";
  else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = "Mobile number must be exactly 10 digits.";

  if (!password) newErrors.password = "Password is required.";
  else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";

  if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
  else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleNext = () => {
    if (validateForm()) {
      setStep(step + 1);
      setProgress(25);
      navigate("/step2")
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Header2 />

      <main className="flex-1 flex flex-col md:flex-row bg-white">
  {/* Left Form Section */}
  <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-10">
    <div className="w-full max-w-sm">
      <p className="text-sm mb-1">Step {step} of 4</p>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Create your account</h2>

      <div className="space-y-3">
        {/* Full Name */}
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Mobile */}
        <div>
          <input
            type="text"
            name="mobile"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
          />
          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <Button
        onClick={handleNext}
        className="w-full mt-5 text-white py-2 rounded-xl hover:bg-purple-700 transition"
      >
        Sign Up
      </Button>

      <p className="text-sm mt-3">
        Already have an account?{" "}
        <span
  onClick={() => navigate('/login')}
  className="text-purple-600 underline cursor-pointer"
>
  Log in
</span>

      </p>

      {/* Progress Bar */}
      <div className="mt-5">
        <p className="text-xs mb-1">Verification Progress</p>
        <div className="w-full bg-gray-300 h-2 rounded">
          <div
            className="bg-black h-2 rounded transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs mt-1">{progress}%</p>
      </div>
    </div>
  </div>

  {/* Right Image Section */}
  <div className="hidden md:block w-1/2 bg-[#fde4d2] flex items-center justify-center">
    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
      <span className="text-gray-500">Image Placeholder</span>
    </div>
  </div>
</main>

    </div>
  );
};

export default SignupStepsPage;
