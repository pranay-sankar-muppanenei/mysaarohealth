import React, { useState, useEffect } from "react";
import TabHeader from "../components/ui/TabHeader";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import StatBox from "../components/ui/StatBox";
import { FiSearch } from "react-icons/fi";
import SearchBar from '../components/ui/SearchBar';
import { data } from '../data/PatientQueueDummyData';
import Pagination from "../components/ui/Pagination"; // Make sure you have this reusable pagination component

const columns = [
    { label: "Token", accessor: "token" },
    { label: "Patient Name", accessor: "name" },
    { label: "Age/Gender", accessor: "ageGender" },
    { label: "Type", accessor: "type" },
    { label: "Time", accessor: "time" },
    { label: "Status", accessor: "status" },
    { label: "Actions", accessor: "actions" },
];

const PatientQueue = () => {
    const [activeTabId, setActiveTabId] = useState("Today");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;

    const tabOptions = [
        { id: "Today", label: "Today" },
        { id: "Tomorrow", label: "Tomorrow" },
        { id: "Upcoming", label: "Upcoming" },
    ];

    const currentData = data[activeTabId];

    const filteredData = currentData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTabId, searchTerm]);

    const stats = [
        {
            label: "Total Patients",
            value: Object.values(data).flat().length,
        },
        {
            label: "Waiting",
            value: Object.values(data).flat().filter((p) => p.status === "Waiting").length,
        },
        {
            label: "In Consultation",
            value: Object.values(data).flat().filter((p) => p.status === "In Consultation").length,
        },
        {
            label: "Completed",
            value: Object.values(data).flat().filter((p) => p.status === "Completed").length,
        },
    ];

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-2 bg-white overflow-y-auto relative">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
                        <h1 className="text-2xl font-bold mb-4">Patient Queue</h1>
                        <div className="w-full lg:w-100 mt-6 lg:mt-0 space-y-4">
                            <h1 className="text-lg font-semibold">Quick Stats</h1>
                            <StatBox stats={stats} />
                        </div>
                        <div className="flex justify-start w-max mb-4 ml-0">
                            <TabHeader
                                tabs={tabOptions}
                                activeTabId={activeTabId}
                                setActiveTabId={setActiveTabId}
                            />
                        </div>

                        <div className="flex flex-col lg:flex-row lg:space-x-8">
                            <div className="flex-1">
                                <SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  placeholder="Search Name"
/>
                                <h2 className="text-lg font-semibold mb-2">{`${activeTabId} Queue`}</h2>
                                <div className="overflow-x-auto">
                                    <GenericTable
                                        columns={columns}
                                        data={currentRows}
                                        renderCell={(row, accessor) => {
                                            if (accessor === "status") {
                                                return <span className="bg-[green-100] px-2 py-1 rounded">{row[accessor]}</span>;
                                            }
                                            return <span className="text-sm">{row[accessor]}</span>;
                                        }}
                                    />
                                </div>
                                <div className="flex justify-center mt-4">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PatientQueue;
