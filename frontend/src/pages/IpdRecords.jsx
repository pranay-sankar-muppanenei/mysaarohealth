import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import { FiSearch } from "react-icons/fi";
import { ipdData } from "../data/IpdDummyData";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Modal from "../components/ui/GenericModal"
import SearchBar from "../components/ui/SearchBar";
import Pagination from "../components/ui/Pagination"; // assuming you already have this

const columns = [
  { label: "Record ID", accessor: "id" },
  { label: "Patient Name", accessor: "name" },
  { label: "Admission Date", accessor: "admissionDate" },
  { label: "Discharge Date", accessor: "dischargeDate" },
  { label: "Status", accessor: "status" },
  { label: "Actions", accessor: "action" },
];

const IPDRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState(ipdData);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const filteredData = records.filter((row) =>
    row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, records]);

  const handleViewEdit = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setRecords((prev) =>
      prev.map((r) => (r.id === selectedRecord.id ? selectedRecord : r))
    );
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl leading-10 font-semibold mb-0">IPD Records</h1>
              <Link to="/ipd/discharge">
                <Button
                  onClick={() => console.log("Create Discharge Summary button clicked")}
                  className="bg-[#7042D9] text-[#120F1A] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#dcd6f2] transition-colors"
                >
                  Create Discharge Summary
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              View and manage patient records, including medical history, treatments, and outcomes.
            </p>

             <SearchBar
      value={searchTerm}
      onChange={setSearchTerm}
      placeholder="Search by Patient name or record ID"
    />

            <GenericTable
              columns={columns}
              data={currentRows}
              renderCell={(row, accessor) => {
                if (accessor === "status") {
                  return (
                    <span className="bg-purple-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                      {row.status}
                    </span>
                  );
                }

                if (accessor === "action") {
                  return (
                    <button
                      className="text-[#7c69a7] text-sm font-medium"
                      onClick={() => handleViewEdit(row)}
                    >
                      View / Edit Details
                    </button>
                  );
                }

                if (accessor === "name") {
                  return <span className="text-sm">{row[accessor]}</span>;
                }

                return <span className="text-sm text-[#7c69a7]">{row[accessor]}</span>;
              }}
            />

            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal for View / Edit */}
      {isModalOpen && selectedRecord && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="View / Edit Details"
        >
          <div className="space-y-3 max-w-xl">
            <div>
              <label className="block text-sm font-medium">Patient Name</label>
              <input
                type="text"
                value={selectedRecord.name}
                onChange={(e) =>
                  setSelectedRecord({ ...selectedRecord, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Admission Date</label>
              <input
                type="date"
                value={selectedRecord.admissionDate}
                onChange={(e) =>
                  setSelectedRecord({ ...selectedRecord, admissionDate: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Discharge Date</label>
              <input
                type="date"
                value={selectedRecord.dischargeDate}
                onChange={(e) =>
                  setSelectedRecord({ ...selectedRecord, dischargeDate: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                value={selectedRecord.status}
                onChange={(e) =>
                  setSelectedRecord({ ...selectedRecord, status: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="Discharged">Discharged</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#5e3bea] text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}

      
    </div>
  );
};

export default IPDRecords;
{/*{isModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">View / Edit Details</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Patient Name</label>
                <input
                  type="text"
                  value={selectedRecord.name}
                  onChange={(e) =>
                    setSelectedRecord({ ...selectedRecord, name: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Admission Date</label>
                <input
                  type="date"
                  value={selectedRecord.admissionDate}
                  onChange={(e) =>
                    setSelectedRecord({ ...selectedRecord, admissionDate: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Discharge Date</label>
                <input
                  type="date"
                  value={selectedRecord.dischargeDate}
                  onChange={(e) =>
                    setSelectedRecord({ ...selectedRecord, dischargeDate: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={selectedRecord.status}
                  onChange={(e) =>
                    setSelectedRecord({ ...selectedRecord, status: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Discharged">Discharged</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#5e3bea] text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )} */}