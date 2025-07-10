import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";

const PatientHistoryPage = () => {
  const location = useLocation();
  const patient = location.state?.patient;

  if (!patient) return <p>No patient data found.</p>;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-white">
        <Header />

        <main className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-6 space-y-6">

            {/* Title */}
            <h1 className="text-2xl font-semibold text-[#2E2E2E] text-center mb-4">
              Patient Prescription Page
            </h1>

            {/* Patient Info Card */}
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-1 border border-gray-200">
              <p className="text-xl font-bold text-[#2E2E2E]">{patient.name}</p>
              <p className="text-sm text-gray-600">UID: {patient.uid}</p>
              <p className="text-sm text-gray-600">Contact: {patient.phone || "N/A"}</p>
              <p className="text-sm text-gray-600">Gender: {patient.gender || "N/A"}</p>
              <p className="text-sm text-gray-600">Age: {patient.age || "N/A"}</p>
              <p className="text-sm text-gray-600">Date of Birth: {patient.dob || "N/A"}</p>
              <p className="text-sm text-gray-600">Address: {patient.address || "N/A"}</p>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              <SectionWithUpload title="Past Prescriptions" buttonText="View Past Prescriptions" />
              <SectionWithUpload title="Health Records" buttonText="Upload Health Record" isUpload />
              <SectionWithUpload title="IPD Records" buttonText="Upload IPD Record" isUpload />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SectionWithUpload = ({ title, buttonText, isUpload }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (isUpload && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`File "${file.name}" uploaded successfully!`);
      // You can handle the file upload logic here (e.g., API call)
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex justify-between items-center">
      <h2 className="text-lg font-medium text-[#2E2E2E]">{title}</h2>
      <div>
        <Button
          onClick={handleUploadClick}
          className="bg-[#8057D6] text-[#7C69A7] hover:bg-[#d7ccf5] border border-[#7C69A7]"
        >
          {buttonText}
        </Button>
        {isUpload && (
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        )}
      </div>
    </div>
  );
};

export default PatientHistoryPage;
