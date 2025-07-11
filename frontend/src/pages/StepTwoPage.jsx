import React, { useState } from "react";
import Header2 from "../components/layout/Header2";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
 // Replace with your image

const StepTwoPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    specialization: "",
    regNumber: "",
    clinicName: "",
    address: "",
    location: "",
  });

  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(25); // Start with 25% from step 1

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.specialization) newErrors.specialization = "Specialization is required.";
    if (!formData.regNumber.trim()) newErrors.regNumber = "Registration number is required.";
    if (!formData.clinicName.trim()) newErrors.clinicName = "Clinic/Hospital name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Only after valid submission, set to 50%
      setProgress(50);
      navigate("/step3")

      console.log("Profile completed:", formData);
      // Move to next step logic here if needed
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header2 />
      <div className="flex flex-col md:flex-row items-center justify-between  max-w-full mx-auto">
        <div className="flex-1 max-w-md ml-20 w-full">
          <p className="text-sm mb-2">Step 2 of 4</p>
          <h2 className="text-xl text-center font-bold mb-6">Complete your profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select your specialization</option>
                <option value="General Physician">General Physician</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Dentist">Dentist</option>
                <option value="Pediatrician">Pediatrician</option>
                {/* Add more if needed */}
              </select>
              {errors.specialization && <p className="text-red-500 text-xs">{errors.specialization}</p>}
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="regNumber"
                placeholder="Medical Registration Number"
                value={formData.regNumber}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.regNumber && <p className="text-red-500 text-xs">{errors.regNumber}</p>}
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="clinicName"
                placeholder="Clinic/Hospital Name"
                value={formData.clinicName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.clinicName && <p className="text-red-500 text-xs">{errors.clinicName}</p>}
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="location"
                placeholder="City/Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-10 text-white text-sm rounded-md hover:bg-purple-700 transition mt-2"
            >
              Save Profile
            </Button>
          </form>

          <p className="mt-2 text-xs text-center">
            Verification Progress
            <span className="ml-2">{progress}%</span>
          </p>
          <div className="h-1 bg-gray-300 w-full mt-1 rounded">
            <div
              className="h-1 bg-black rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="w-1/2 h-[calc(100vh-80px)] bg-gray-200 flex items-center justify-center ml-6">
  <span className="text-gray-500">Image Placeholder</span>
</div>


      </div>
    </div>
  );
};

export default StepTwoPage;
