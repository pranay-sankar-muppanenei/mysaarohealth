import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import StatBox2 from "../components/ui/StatBox2";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button"
import Modal from "../components/ui/GenericModal";
import { stats, appointments as initialAppointments } from "../data/AppointmentsDummyData";

const AppointmentsDashboard = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    mode: "Online",
    location: "Clinic A",
    date: "2025-07-05",
    time: "8:00 AM",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddAppointment = () => {
    const newApt = {
      id: appointments.length + 1,
      name: formData.name,
      time: `${formData.date} at ${formData.time} (${formData.mode})`,
    };

    setAppointments((prev) => [...prev, newApt]);
    setFormData({
      name: "",
      phone: "",
      mode: "Online",
      location: "Clinic A",
      date: "2025-07-05",
      time: "8:00 AM",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="flex gap-8 w-full">
              {/* Left Section */}
              <div className="w-2/3">
                <h1 className="text-3xl leading-10 font-semibold mb-4">Appointments</h1>
                <h2 className="text-lg text-700 font-semibold mb-2">Latest Appointments</h2>
                <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex justify-between items-center hover:bg-gray-100 p-2 rounded"
                    >
                      <div className="flex items-center gap-3">
                        <img
  src={`/${apt.name}.png`}
  onError={(e) => (e.currentTarget.src = "/Sophia Carter.png")}
  alt="avatar"
  className="rounded-full w-10 h-10"
/>
                        <div>
                          <p className="font-medium">{apt.name}</p>
                          <p className="text-sm text-gray-500">{apt.time}</p>
                        </div>
                      </div>
                      <Button className="text-gray-800 px-4 py-1 rounded-full text-sm">
                        Detail
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  className="mt-6 bg-[#7042D9] hover:bg-purple-600 text-white px-5 py-2 rounded-full flex items-center gap-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FiPlus /> Add Appointment
                </Button>
              </div>

              {/* Right Sidebar */}
              <div className="w-1/3 space-y-6">
                <div>
                  <h2 className="text-lg text-700 font-semibold mb-3">Appointment Stats Overview</h2>
                  <StatBox2 stats={stats} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Share Booking Link</h2>
                  <img
                    src="qr.png"
                    alt="QR Code"
                    className="rounded-xl w-[328px] h-[276px]"
                  />
                  <div className="flex justify-between items-center  mt-3">
                    <Button className="text-700 text-sm text-[#120F1A] px-3 py-1 rounded-full">
                      Copy Link
                    </Button>
                    <Button className="text-700 text-[#120F1A] text-sm px-3 py-1 rounded-full">
                      Share on WhatsApp
                    </Button>
                  </div>
                </div>

                <div>
                  <h2 className="text-md font-semibold mb-1">Patients by Type</h2>
                  <p className="text-sm text-gray-700">Patient Types</p>
                  <p className="text-2xl font-bold">480 Total Patients</p>
                </div>
              </div>
            </div>
          </div>
        </main>

       
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Appointment"
        >
          <form className="space-y-4 max-w-xl">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-3 py-2 border rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-3 py-2 border rounded"
              required
            />
            <div className="relative">
  <select
    name="mode"
    value={formData.mode}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded appearance-none"
  >
    <option>Online</option>
    <option>Offline</option>
  </select>
  <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
    ▼
  </div>
</div>

<div className="relative">
  <select
    name="location"
    value={formData.location}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded appearance-none"
  >
    <option>Clinic A</option>
    <option>Clinic B</option>
  </select>
  <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
    ▼
  </div>
</div>

<div className="relative">
  <select
    name="date"
    value={formData.date}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded appearance-none"
  >
    {Array.from({ length: 8 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      return <option key={i}>{dateStr}</option>;
    })}
  </select>
  <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
    ▼
  </div>
</div>

<div className="relative">
  <select
    name="time"
    value={formData.time}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded appearance-none"
  >
    {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"].map((t, i) => (
      <option key={i}>{t}</option>
    ))}
  </select>
  <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
    ▼
  </div>
</div>


            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddAppointment}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Confirm & Book
              </button>
            </div>
          </form>
        </Modal>

      </div>
    </div>
  );
};

export default AppointmentsDashboard;

 {/* {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Add Appointment</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option>Online</option>
                  <option>Offline</option>
                </select>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option>Clinic A</option>
                  <option>Clinic B</option>
                </select>
                <select
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  {Array.from({ length: 8 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    const dateStr = date.toISOString().split("T")[0];
                    return <option key={i}>{dateStr}</option>;
                  })}
                </select>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"].map((t, i) => (
                    <option key={i}>{t}</option>
                  ))}
                </select>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddAppointment}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Confirm & Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        )} */}