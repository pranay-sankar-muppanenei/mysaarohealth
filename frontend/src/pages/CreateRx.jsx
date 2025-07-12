import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import Modal from '../components/ui/GenericModal';
import SearchBar from "../components/ui/SearchBar"; // adjust path if needed

import Button from "../components/ui/Button";
import { rxData as initialRxData } from "../data/RxDummyData";
import { Link } from "react-router-dom";
import Pagination from "../components/ui/Pagination"; // We'll define this below

const columns = [
  { label: "UID", accessor: "uid" },
  { label: "Name", accessor: "name" },
  { label: "Phone", accessor: "phone" },
  { label: "Last Visit", accessor: "lastVisit" },
  { label: "Category", accessor: "category" },
  { label: "Action", accessor: "action" },
];

const generateUID = () => Math.floor(10000 + Math.random() * 90000).toString();

const CreateRx = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rxData, setRxData] = useState(initialRxData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    phone: "",
    lastVisit: "",
    category: "Follow-up",
  });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const filteredData = rxData.filter((row) =>
    Object.values(row).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, rxData]);

  const handleRegisterPatient = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowMoreOptions(false);
    setNewPatient({ name: "", phone: "", lastVisit: "", category: "Follow-up" });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newPatient.name || newPatient.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    if (!/^[0-9]{10}$/.test(newPatient.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (newPatient.altPhone && !/^[0-9]{10}$/.test(newPatient.altPhone)) {
      newErrors.altPhone = "Alternate phone must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPatient = () => {
    if (!validateForm()) return;
    const newEntry = {
      uid: generateUID(),
      name: newPatient.name,
      phone: newPatient.phone,
      lastVisit: new Date().toISOString().split("T")[0],
      category: newPatient.category || "Follow-up",
    };
    setRxData([...rxData, newEntry]);
    handleCloseModal();
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl leading-10 font-semibold">Create Rx</h1>
              <Button onClick={handleRegisterPatient}>Register Patient</Button>
            </div>

            <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search by Name, UID, Phone"
      />

            <GenericTable
              columns={columns}
              data={currentRows}
              renderCell={(row, accessor) => {
                if (accessor === "category") {
                  const colorMap = {
                    "Follow-up": "bg-purple-100 text-purple-700",
                    "Emergency": "bg-red-100 text-red-600",
                    "Chronic": "bg-blue-100 text-blue-600",
                  };
                  return (
                    <span className={`text-sm px-3 py-1 rounded-full ${colorMap[row.category]}`}>
                      {row.category}
                    </span>
                  );
                }

                if (accessor === "action") {
                  return (
                    <Link to={`/${row.uid}/consult`}>
                      <span className={`text-sm px-3 py-1 text-[#69598C] text-700 hover:underline cursor-pointer`}>
                        Consult
                      </span>
                    </Link>
                  );
                }

                const highlightColor = ["uid", "phone", "lastVisit"].includes(accessor)
                  ? "text-[#69598C] text-400"
                  : "";

                return <span className={`text-sm ${highlightColor}`}>{row[accessor]}</span>;
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

        
        {<Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Add Patient"
        >
          {/* move your entire patient form code inside here */}
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl space-y-4 overflow-y-auto max-h-[90vh]">
                      <h2 className="text-xl font-semibold mb-4">Add Patient</h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input value="+91" disabled className="w-full border rounded-md px-4 py-2 text-sm bg-gray-100" />
                        <input
                          type="text"
                          placeholder="Primary Phone Number"
                          value={newPatient.phone}
                          onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                          className="w-full border rounded-md px-4 py-2 text-sm md:col-span-2"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

                      <input
                        type="text"
                        placeholder="Alternate Phone Number (Optional)"
                        value={newPatient.altPhone || ""}
                        onChange={(e) => setNewPatient({ ...newPatient, altPhone: e.target.value })}
                        className="w-full border rounded-md px-4 py-2 text-sm"
                      />
                      {errors.altPhone && <p className="text-red-500 text-xs">{errors.altPhone}</p>}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                          value={newPatient.title || ""}
                          onChange={(e) => setNewPatient({ ...newPatient, title: e.target.value })}
                          className="w-full border rounded-md px-4 py-2 text-sm"
                        >
                          <option value="">Title</option>
                          <option>Mr</option>
                          <option>Ms</option>
                          <option>Mrs</option>
                          <option>Dr</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={newPatient.name}
                          onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                          className="w-full border rounded-md px-4 py-2 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Father/Spouse Name"
                          value={newPatient.fatherName || ""}
                          onChange={(e) => setNewPatient({ ...newPatient, fatherName: e.target.value })}
                          className="w-full border rounded-md px-4 py-2 text-sm"
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="date"
                          value={newPatient.dob || ""}
                          onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })}
                          className="w-full border rounded-md px-4 py-2 text-sm"
                        />
                        <input
                          type="number"
                          placeholder="Age"
                          value={newPatient.age || ""}
                          onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                          className="w-full border rounded-md px-4 py-2 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                          value={newPatient.gender || ""}
                          onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                          className="w-full border rounded-md px-4 py-2 text-sm"
                        >
                          <option value="">Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                        <input
                          type="email"
                          placeholder="Email Address (Optional)"
                          value={newPatient.email || ""}
                          onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                          className="w-full border rounded-md px-4 py-2 text-sm"
                        />
                      </div>

                      <textarea
                        placeholder="Address"
                        value={newPatient.address || ""}
                        onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                        className="w-full border rounded-md px-4 py-2 text-sm"
                        rows={2}
                      />

                      <button
                        className="px-4 py-1 border rounded-full text-sm font-semibold text-purple-700 bg-purple-100 hover:bg-purple-200"
                        onClick={() => setShowMoreOptions((prev) => !prev)}
                      >
                        {showMoreOptions ? "Hide Options" : "... More Options"}
                      </button>

                      {showMoreOptions && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Blood Group"
                            value={newPatient.bloodGroup || ""}
                            onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}
                            className="w-full border rounded-md px-4 py-2 text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Allergies (Optional)"
                            value={newPatient.allergies || ""}
                            onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
                            className="w-full border rounded-md px-4 py-2 text-sm"
                          />
                          <select
                            value={newPatient.category}
                            onChange={(e) => setNewPatient({ ...newPatient, category: e.target.value })}
                            className="w-full border rounded-md px-4 py-2 text-sm"
                          >
                            <option value="Follow-up">Follow-up</option>
                            <option value="Emergency">Emergency</option>
                            <option value="Chronic">Chronic</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Referred By"
                            value={newPatient.referredBy || ""}
                            onChange={(e) => setNewPatient({ ...newPatient, referredBy: e.target.value })}
                            className="w-full border rounded-md px-4 py-2 text-sm"
                          />
                        </div>
                      )}

                      <div className="flex justify-end gap-4 mt-4">
                        <button
                          onClick={handleCloseModal}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddPatient}
                          className="px-4 py-2 bg-[#5e3bea] text-white rounded-md"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
          </div>
        </Modal>}

      </div>
    </div>
  );
};

export default CreateRx;




{/*{isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl space-y-4 overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-semibold mb-4">Add Patient</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input value="+91" disabled className="w-full border rounded-md px-4 py-2 text-sm bg-gray-100" />
                <input
                  type="text"
                  placeholder="Primary Phone Number"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                  className="w-full border rounded-md px-4 py-2 text-sm md:col-span-2"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

              <input
                type="text"
                placeholder="Alternate Phone Number (Optional)"
                value={newPatient.altPhone || ""}
                onChange={(e) => setNewPatient({ ...newPatient, altPhone: e.target.value })}
                className="w-full border rounded-md px-4 py-2 text-sm"
              />
              {errors.altPhone && <p className="text-red-500 text-xs">{errors.altPhone}</p>}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={newPatient.title || ""}
                  onChange={(e) => setNewPatient({ ...newPatient, title: e.target.value })}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                >
                  <option value="">Title</option>
                  <option>Mr</option>
                  <option>Ms</option>
                  <option>Mrs</option>
                  <option>Dr</option>
                </select>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Father/Spouse Name"
                  value={newPatient.fatherName || ""}
                  onChange={(e) => setNewPatient({ ...newPatient, fatherName: e.target.value })}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={newPatient.dob || ""}
                  onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={newPatient.age || ""}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={newPatient.gender || ""}
                  onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                >
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input
                  type="email"
                  placeholder="Email Address (Optional)"
                  value={newPatient.email || ""}
                  onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
              </div>

              <textarea
                placeholder="Address"
                value={newPatient.address || ""}
                onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                className="w-full border rounded-md px-4 py-2 text-sm"
                rows={2}
              />

              <button
                className="px-4 py-1 border rounded-full text-sm font-semibold text-purple-700 bg-purple-100 hover:bg-purple-200"
                onClick={() => setShowMoreOptions((prev) => !prev)}
              >
                {showMoreOptions ? "Hide Options" : "... More Options"}
              </button>

              {showMoreOptions && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Blood Group"
                    value={newPatient.bloodGroup || ""}
                    onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}
                    className="w-full border rounded-md px-4 py-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Allergies (Optional)"
                    value={newPatient.allergies || ""}
                    onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
                    className="w-full border rounded-md px-4 py-2 text-sm"
                  />
                  <select
                    value={newPatient.category}
                    onChange={(e) => setNewPatient({ ...newPatient, category: e.target.value })}
                    className="w-full border rounded-md px-4 py-2 text-sm"
                  >
                    <option value="Follow-up">Follow-up</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Chronic">Chronic</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Referred By"
                    value={newPatient.referredBy || ""}
                    onChange={(e) => setNewPatient({ ...newPatient, referredBy: e.target.value })}
                    className="w-full border rounded-md px-4 py-2 text-sm"
                  />
                </div>
              )}

              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPatient}
                  className="px-4 py-2 bg-[#5e3bea] text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}*/}