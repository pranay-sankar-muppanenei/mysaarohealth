import React, { useState } from "react";
import KPISection from "../components/ui/KpiSection";
import GenericTable from "../components/ui/GenericTable";
import BarGraph from "../components/ui/charts/BarGraph";
import LineGraph from "../components/ui/charts/LineGraph";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import AiModal from "../components/ui/AiModal";
import { BsChatDots } from "react-icons/bs"; 

import {
  kpis,
  todayAppointments,
  patientGrowthData,
  appointmentTypeData,
  plannedSurgeries,
} from "../data/DashboardDummyData";

import { RxCross2 } from "react-icons/rx";

const columns = [
  { label: "Patient Name", accessor: "name" },
  { label: "Time", accessor: "time" },
  { label: "Type", accessor: "type" },
  { label: "Status", accessor: "status" },
];

const columns2 = [
  { label: "Patient Name", accessor: "name" },
  { label: "Procedure", accessor: "procedure" },
  { label: "Date", accessor: "date" },
  { label: "Status", accessor: "status" },
];

const Dashboard = () => {
  const [showAiModal, setShowAiModal] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white overflow-y-auto relative">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="flex flex-row justify-between mb-8">
              <div>
                <h1 className="text-3xl leading-10 font-bold mb-2">Dashboard</h1>
                <p className="text-sm text-gray-500">
                  Welcome back, Dr. Amelia Carter
                </p>
              </div>
              {/* You can remove this old button if not needed anymore */}
            </div>

            <div className="w-max-lg mx-auto mb-8">
              <KPISection kpis={kpis} />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Today's Appointments</h2>
              <GenericTable columns={columns} data={todayAppointments} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-xl">
                <h3 className="text-sm font-medium mb-3">Patient Growth</h3>
                <LineGraph data={patientGrowthData} />
              </div>
              <div className="p-4 border rounded-xl">
                <h3 className="text-sm font-medium mb-3">Appointment Types</h3>
                <BarGraph data={appointmentTypeData} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Planned Surgeries</h2>
              <GenericTable columns={columns2} data={plannedSurgeries} />
            </div>
          </div>

          {/* Floating Chat Button */}
          <div className="fixed bottom-4 right-6 z-50">
            <button
              onClick={() => setShowAiModal(!showAiModal)}
              className="w-14 h-14  rounded-full bg-[#7047D1] shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
            >
              {showAiModal ? (
                <RxCross2 size={24} />
              ) : (
               <BsChatDots size={24} className="text-white"/>
              )}
            </button>
          </div>

          {/* AI Modal */}
          {showAiModal && <AiModal onClose={() => setShowAiModal(false)} />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
