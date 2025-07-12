import React, { useState } from "react";
import Header2 from "../components/layout/Header2";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const StepThreePage = () => {
    const navigate = useNavigate();
  const [registrationCert, setRegistrationCert] = useState(null);
  const [degreeCert, setDegreeCert] = useState(null);
  const [govID, setGovID] = useState(null);
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(50); // Starts at 66% (after previous steps)

  const handleFileChange = (e, field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    const file = e.target.files[0];
    if (file) {
      if (field === "registrationCert") setRegistrationCert(file);
      else if (field === "degreeCert") setDegreeCert(file);
      else if (field === "govID") setGovID(file);
    }
  };

  const handleNext = () => {
    let newErrors = {};
    if (!registrationCert) newErrors.registrationCert = "Please upload certificate.";
    if (!degreeCert) newErrors.degreeCert = "Please upload certificate.";
    if (!govID) newErrors.govID = "Please upload ID.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Add +25% only if not already added
      if (progress === 50) {
        setProgress(progress + 25);
      }
      navigate('/step4')
      console.log("Proceed to next step");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header2 />
      <div className="flex flex-1">
        {/* Left form area */}
        <div className="w-1/2 px-10 py-8 flex flex-col justify-center">
          <p className="text-sm mb-2">Step 3 of 4</p>
          <h2 className="text-lg md:text-xl font-semibold mb-1 text-center">Upload Your Credentials</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">Please upload the necessary documents to verify your profile.</p>

          {/* Medical Certificate */}
          <div className="mb-5">
            <p className="font-medium mb-2">Medical Registration Certificate</p>
            <label className="inline-block px-4 py-2 bg-gray-200 rounded-full cursor-pointer text-sm">
              Upload Certificate
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                className="hidden"
                onChange={(e) => handleFileChange(e, "registrationCert")}
              />
            </label>
            <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG</p>
            {errors.registrationCert && (
              <p className="text-red-500 text-xs mt-1">{errors.registrationCert}</p>
            )}
          </div>

          {/* Degree Certificate */}
          <div className="mb-5">
            <p className="font-medium mb-2">Degree Certificate</p>
            <label className="inline-block px-4 py-2 bg-gray-200 rounded-full cursor-pointer text-sm">
              Upload Certificate
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                className="hidden"
                onChange={(e) => handleFileChange(e, "degreeCert")}
              />
            </label>
            <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG</p>
            {errors.degreeCert && (
              <p className="text-red-500 text-xs mt-1">{errors.degreeCert}</p>
            )}
          </div>

          {/* Government ID */}
          <div className="mb-5">
            <p className="font-medium mb-2">Government-issued ID</p>
            <label className="inline-block px-4 py-2 bg-gray-200 rounded-full cursor-pointer text-sm">
              Upload ID
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                className="hidden"
                onChange={(e) => handleFileChange(e, "govID")}
              />
            </label>
            <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG</p>
            {errors.govID && (
              <p className="text-red-500 text-xs mt-1">{errors.govID}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-2">
            <button
              className="px-5 h-9 bg-gray-200 text-[#000000] text-sm rounded-full hover:bg-gray-300 transition"
              onClick={() => navigate('./step2')}
            >
              Back
            </button>
            <Button
              className="px-5 h-9  text-white text-sm rounded-full hover:bg-purple-700 transition"
              onClick={handleNext}
            >
              Next
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <p className="text-xs mb-1">Verification Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-black h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-right mt-1">{progress}%</p>
          </div>
        </div>

        {/* Right side image area */}
        <div className="w-1/2 h-[calc(100vh-20px)] bg-[#fde7d9] flex items-center justify-center">
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

export default StepThreePage;
