import React, { useState } from "react";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import { FiSearch } from "react-icons/fi";
import Button from "../components/ui/Button";

const DischargeSummaryForm = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        admissionDate: "",
        reason: "",
        admittedBy: "",
        finalDiagnosis: "",
        secondaryDiagnosis: "",
        treatment: "",
        procedure: "Appendectomy",
        implant: "Titanium Rod",
        surgery: "Knee Replacement",
        dailyNotes: "",
        complications: "",
        medications: [{ name: "", dosage: "", frequency: "", duration: "" }],
        dietAdvice: "",
        continuation: "",
        warningSigns: "",
        followUp: {
            date: "",
            department: "",
            referredDoctor: "",
            telemedicineLink: "",
        }
    });

    const handleChange = (field, value, section = null) => {
        if (section) {
            setFormData((prev) => ({
                ...prev,
                [section]: { ...prev[section], [field]: value }
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
                            <h1 className='text-2xl font-semibold mb-6'>Discharge Summary</h1>
                            <div className="relative w-full mb-4">

                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Enter UID,Name or Phone Number"
                                    className="w-full pl-10 pr-10 py-2 border rounded-xl bg-[#c5c7c9] bg-opacity-20 text-[#5e3bea]-200 focus:outline-none text-sm"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-lg font-semibold">Eathen Carter</p>
                                    <p className='text-sm text-[#665491]'>UID:1234 | Name: Arjun | Age:25 </p>
                                </div>
                                <img
                                    src="/dishcharge.png"
                                    alt="Patient Image"
                                    className="h-[160px] w-[300px] object-cover rounded"
                                />
                            </div>

                            <h1 className="text-xl font-bold mb-4">Discharge Summary Form</h1>

                            {/* Admission */}
                            <div>
                                <label className="block font-medium mb-1">Admission Date & Time</label>
                                <input
                                    className="w-full pl-2 pr-10 py-2 border rounded-xl bg-[#c5c7c9] bg-opacity-20 text-[#5e3bea]-200 focus:outline-none text-sm"
                                    placeholder="e.g. 2025-06-29 09:30"
                                    value={formData.admissionDate}
                                    onChange={(e) => handleChange("admissionDate", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Reason for Admission</label>
                                <textarea
                                    className="w-full pl-2 border  rounded bg-[#c5c7c9] bg-opacity-20  mb-2 placeholder-[#665491]-200"
                                    placeholder="e.g. Severe abdominal pain"
                                    value={formData.reason}
                                    onChange={(e) => handleChange("reason", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Admitted By</label>
                                <input
                                    className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20  mb-2 placeholder-[#665491]-200"
                                    value={formData.admittedBy}
                                    onChange={(e) => handleChange("admittedBy", e.target.value)}
                                />
                            </div>

                            {/* Diagnosis */}
                            <div>
                                <label className="block font-medium mb-1">Final Diagnosis</label>
                                <input
                                    className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]-200"
                                    value={formData.finalDiagnosis}
                                    onChange={(e) => handleChange("finalDiagnosis", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Secondary Diagnosis (optional)</label>
                                <input
                                    className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]-200"
                                    value={formData.secondaryDiagnosis}
                                    onChange={(e) => handleChange("secondaryDiagnosis", e.target.value)}
                                />
                            </div>

                            {/* Treatment */}
                            <div>
                                <label className="block font-medium mb-1">Treatment Description</label>
                                <textarea
                                    className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]-200"
                                    value={formData.treatment}
                                    onChange={(e) => handleChange("treatment", e.target.value)}
                                />
                            </div>

                            {/* Procedures */}
                            <div className="border p-4 rounded bg-gray-50 mb-4">
                                <div className="font-semibold mb-2">Procedures / Surgery</div>
                                <p><strong>Procedure:</strong> {formData.procedure}</p>
                                <p><strong>Implant:</strong> {formData.implant}</p>
                                <p><strong>Surgery:</strong> {formData.surgery}</p>
                            </div>

                            {/* Clinical Course */}
                            <div>
                                <label className="block font-medium mb-1">Daily Notes</label>
                                <textarea
                                    className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]-200"
                                    value={formData.dailyNotes}
                                    onChange={(e) => handleChange("dailyNotes", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Infection, Complications, Progress</label>
                                <textarea
                                    className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]"
                                    value={formData.complications}
                                    onChange={(e) => handleChange("complications", e.target.value)}
                                />
                            </div>

                            {/* Medications */}
                            <div>
                                <label className="block font-medium mb-2">Medications on Discharge</label>
                                {formData.medications.map((med, i) => (
                                    <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2">
                                        <input
                                            className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]-200"
                                            placeholder="Drug Name"
                                            value={med.name}
                                            onChange={(e) => {
                                                const meds = [...formData.medications];
                                                meds[i].name = e.target.value;
                                                setFormData({ ...formData, medications: meds });
                                            }}
                                        />
                                        <input
                                            className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]-200"
                                            placeholder="Dosage"
                                            value={med.dosage}
                                            onChange={(e) => {
                                                const meds = [...formData.medications];
                                                meds[i].dosage = e.target.value;
                                                setFormData({ ...formData, medications: meds });
                                            }}
                                        />
                                        <input
                                            className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]-200"
                                            placeholder="Frequency"
                                            value={med.frequency}
                                            onChange={(e) => {
                                                const meds = [...formData.medications];
                                                meds[i].frequency = e.target.value;
                                                setFormData({ ...formData, medications: meds });
                                            }}
                                        />
                                        <input
                                            className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491-200" 
                                            placeholder="Duration"
                                            value={med.duration}
                                            onChange={(e) => {
                                                const meds = [...formData.medications];
                                                meds[i].duration = e.target.value;
                                                setFormData({ ...formData, medications: meds });
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Advice */}
                            <div>
                                <label className="block font-medium mb-1">Diet / Lifestyle Advice</label>
                                <textarea
                                    className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]"
                                    value={formData.dietAdvice}
                                    onChange={(e) => handleChange("dietAdvice", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Medication Continuation Instructions</label>
                                <textarea
                                    className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 placeholder-[#665491]"
                                    value={formData.continuation}
                                    onChange={(e) => handleChange("continuation", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Warning Signs (If any)</label>
                                <textarea
                                    className="w-full border p-2 rounded bg-[#c5c7c9] bg-opacity-20 mb-2 "
                                    value={formData.warningSigns}
                                    onChange={(e) => handleChange("warningSigns", e.target.value)}
                                />
                            </div>

                            {/* Follow-up */}
                            <div className="font-semibold mt-4">Follow-up Plan</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium mb-1">Date</label>
                                    <input
                                        className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 w-full mb-2 placeholder-[#665491]-200"
                                        value={formData.followUp.date}
                                        onChange={(e) => handleChange("date", e.target.value, "followUp")}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Department</label>
                                    <input
                                        className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 w-full mb-2 placeholder-[#665491]-200"
                                        value={formData.followUp.department}
                                        onChange={(e) => handleChange("department", e.target.value, "followUp")}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Referred Doctor (if any)</label>
                                    <input
                                        className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 w-full mb-2 placeholder-[#665491]-200"
                                        value={formData.followUp.referredDoctor}
                                        onChange={(e) => handleChange("referredDoctor", e.target.value, "followUp")}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Telemedicine Link (optional)</label>
                                    <input
                                        className="border p-2 rounded bg-[#c5c7c9] bg-opacity-20 w-full mb-2 placeholder-[#665491]-200"
                                        value={formData.followUp.telemedicineLink}
                                        onChange={(e) => handleChange("telemedicineLink", e.target.value, "followUp")}
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between gap-4 mt-6 flex-wrap">
                                <div className="flex gap-6">
                                       <Button className="bg-purple-600 text-white px-4 py-2 rounded">AI Generate Summary</Button>
                                    <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">Download PDF</button>
                                </div>
                                <Button className="bg-[#7042D9] text-gray-700 px-4 py-2 rounded">Share via WhatsApp / Email</Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default DischargeSummaryForm