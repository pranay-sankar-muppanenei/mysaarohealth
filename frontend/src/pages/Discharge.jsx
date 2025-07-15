import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import { FiSearch } from "react-icons/fi";
import Button from "../components/ui/Button";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const DischargeSummaryForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state;

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!patient) {
      toast.error("No patient selected. Please select a patient first.");
      navigate("/ipd"); // redirect back if no patient data
    }
  }, [patient, navigate]);

  const [formData, setFormData] = useState({
    admissionDate: patient?.admissionDate || "",
    reason: "",
    admittedBy: "",
    finalDiagnosis: "",
    secondaryDiagnosis: "",
    treatment: "",
    procedure: "",
    implant: "",
    surgery: "",
    dailyNotes: "",
    complications: "",
    medications: [
      {
        id: crypto.randomUUID(),
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ],
    dietAdvice: "",
    continuation: "",
    warningSigns: "",
    followUp: {
      date: "",
      department: "",
      referredDoctor: "",
      telemedicineLink: "",
    },
  });

  const handleChange = (field, value, section = null) => {
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="mx-auto">
              <h1 className="text-2xl font-semibold mb-6">Discharge Summary</h1>
              <div className="relative w-full mb-4">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter UID, Name or Phone Number"
                  className="w-full pl-10 pr-10 py-2 border rounded-xl bg-[#c5c7c9] bg-opacity-20 text-[#5e3bea]-200 focus:outline-none text-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
              </div>

              {/* Patient Info */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-[16px] text-700 font-semibold">{patient?.name || "N/A"}</p>
                  <p className="text-sm text-[#665491]">
                    UID: {patient?.id || "-"} | Name: {patient?.name || "-"} | Admission Date:{" "}
                    {patient?.admissionDate || "-"}
                  </p>
                </div>
                <img
                  src={patient?.img || "/placeholder.png"}
                  alt="Patient"
                  className="w-[118px] h-[148px] object-cover border border-gray-300 rounded"
                />
              </div>

              <h1 className="text-[22px] font-bold mb-4">Discharge Summary Form</h1>

              {/* Admission Date & Reason */}
              <div className="mb-4">
                <label className="block font-sm mb-1">Admission Date & Time</label>
                <input
                  className="w-full pl-2 pr-10 py-2 border rounded-xl bg-[#c5c7c9] bg-opacity-20 text-sm"
                  type="datetime-local"
                  value={formData.admissionDate}
                  onChange={(e) => handleChange("admissionDate", e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block font-sm mb-1">Reason for Admission</label>
                <textarea
                  className="w-full pl-2 border rounded bg-[#c5c7c9] bg-opacity-20 mb-2"
                  placeholder="e.g. Severe abdominal pain"
                  value={formData.reason}
                  onChange={(e) => handleChange("reason", e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block font-sm mb-1">Admitted By</label>
                <input
                  className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2"
                  value={formData.admittedBy}
                  onChange={(e) => handleChange("admittedBy", e.target.value)}
                />
              </div>

              {/* Diagnosis */}
              <h1 className="text-[22px] font-bold mb-4">Diagnosis</h1>
              <div className="mb-4">
                <label className="block font-sm mb-1">Final Diagnosis</label>
                <input
                  className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2"
                  value={formData.finalDiagnosis}
                  onChange={(e) => handleChange("finalDiagnosis", e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block font-sm mb-1">Secondary Diagnosis (optional)</label>
                <input
                  className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2"
                  value={formData.secondaryDiagnosis}
                  onChange={(e) => handleChange("secondaryDiagnosis", e.target.value)}
                />
              </div>

              {/* Treatment */}
              <h1 className="text-[22px] font-bold mb-4">Treatment Given</h1>
              <div className="mb-4">
                <label className="block font-sm mb-1">Treatment Description</label>
                <textarea
                  className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2"
                  value={formData.treatment}
                  onChange={(e) => handleChange("treatment", e.target.value)}
                />
              </div>

              {/* Procedures */}
             <div className="mb-2">
  <label className="block font-sm mb-1">Procedure</label>
  <input
    className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]-200"
    value={formData.procedure}
    onChange={(e) => handleChange("procedure", e.target.value)}
  />
</div>

<div className="mb-2">
  <label className="block font-sm mb-1">Implant</label>
  <input
    className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]-200"
    value={formData.implant}
    onChange={(e) => handleChange("implant", e.target.value)}
  />
</div>

<div className="mb-2">
  <label className="block font-sm mb-1">Surgery</label>
  <input
    className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]-200"
    value={formData.surgery}
    onChange={(e) => handleChange("surgery", e.target.value)}
  />
</div>


              {/* Clinical Course */}
              <h1 className="text-[22px] font-bold mb-4">Clinical Course During Stay</h1>
              <div className="mb-4">
                <label className="block font-sm mb-1">Daily Notes</label>
                <textarea
                  className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2"
                  value={formData.dailyNotes}
                  onChange={(e) => handleChange("dailyNotes", e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block font-sm mb-1">Infection, Complications, Progress</label>
                <textarea
                  className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2"
                  value={formData.complications}
                  onChange={(e) => handleChange("complications", e.target.value)}
                />
              </div>

              {/* Medications */}
              <div className="mb-4">
                <h1 className="text-[22px] font-bold mb-4">Medications on Discharge</h1>
                {formData.medications.map((med, i) => (
                  <div key={med.id} className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2">
                    {["name", "dosage", "frequency", "duration"].map((field) => (
                      <input
                        key={field}
                        className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={med[field]}
                        onChange={(e) => {
                          const value = e.target.value;
                          const meds = [...formData.medications];
                          meds[i][field] = value;

                          // Auto-add new row logic
                          const isLast = i === meds.length - 1;
                          const hasValue = ["name", "dosage", "frequency", "duration"].some(
                            (key) => meds[i][key].trim() !== ""
                          );

                          if (isLast && hasValue) {
                            meds.push({
                              id: crypto.randomUUID(),
                              name: "",
                              dosage: "",
                              frequency: "",
                              duration: "",
                            });
                          }

                          setFormData({ ...formData, medications: meds });
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Advice */}
              <h1 className="text-[22px] font-bold mb-4">Advice On Discharge</h1>
              <div className="mb-4">
                <label className="block font-sm mb-1">Diet / Lifestyle Advice</label>
                <textarea
                  className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2"
                  value={formData.dietAdvice}
                  onChange={(e) => handleChange("dietAdvice", e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block font-sm mb-1">Medication Continuation Instructions</label>
                <textarea
                  className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2"
                  value={formData.continuation}
                  onChange={(e) => handleChange("continuation", e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block font-sm mb-1">Warning Signs (If any)</label>
                <textarea
                  className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2"
                  value={formData.warningSigns}
                  onChange={(e) => handleChange("warningSigns", e.target.value)}
                />
              </div>

              {/* Follow-up */}
              <h1 className="text-[22px] font-bold mb-4">Follow Up Plan</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sm mb-1">Date</label>
                  <input
                    className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 w-full mb-2"
                    value={formData.followUp.date}
                    onChange={(e) => handleChange("date", e.target.value, "followUp")}
                    type="date"
                  />
                </div>
                <div>
                  <label className="block font-sm mb-1">Department</label>
                  <input
                    className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 w-full mb-2"
                    value={formData.followUp.department}
                    onChange={(e) => handleChange("department", e.target.value, "followUp")}
                  />
                </div>
                <div>
                  <label className="block font-sm mb-1">Referred Doctor</label>
                  <input
                    className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 w-full mb-2"
                    value={formData.followUp.referredDoctor}
                    onChange={(e) => handleChange("referredDoctor", e.target.value, "followUp")}
                  />
                </div>
                <div>
                  <label className="block font-sm mb-1">Telemedicine Link</label>
                  <input
                    className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 w-full mb-2"
                    value={formData.followUp.telemedicineLink}
                    onChange={(e) => handleChange("telemedicineLink", e.target.value, "followUp")}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between gap-4 mt-6 flex-wrap">
                <div className="flex gap-6">
                  <Button className="text-white px-4 py-2">AI Generate Summary</Button>
                  <Button className="px-4 py-2">Download PDF</Button>
                </div>
                <Button className="text-gray-700 px-4 py-2">Share via WhatsApp / Email</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DischargeSummaryForm;

const EditableField = ({ label, value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onChange(tempValue);
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between gap-2 group">
      <p className="text-sm font-medium min-w-[100px]">{label}:</p>
      {editing ? (
        <>
          <input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="flex-1 border p-1 rounded bg-[#c5c7c9] bg-opacity-20"
          />
          <button onClick={handleSave} className="text-green-600 text-sm ml-2">
            Save
          </button>
        </>
      ) : (
        <>
          <p className="flex-1 text-gray-700">{value}</p>
          <button
            onClick={() => {
              setTempValue(value);
              setEditing(true);
            }}
            className="opacity-0 group-hover:opacity-100 text-gray-500 transition"
          >
            <FaEdit />
          </button>
        </>
      )}
    </div>
  );
};
