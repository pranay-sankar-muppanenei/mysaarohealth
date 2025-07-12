import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import Modal from "../components/ui/GenericModal"
import { patientsData as dummyPatientsData } from "../data/AllPatientsDummyData";
import Button from "../components/ui/Button";
import SearchBar from '../components/ui/SearchBar';
import Pagination from "../components/ui/Pagination"; // using your existing Pagination

const categoryOptions = ["All", "New", "Follow-up", "Chronic", "Emergency"];

const columns = [
  { label: "UID", accessor: "uid" },
  { label: "Name", accessor: "name" },
  { label: "Phone", accessor: "phone" },
  { label: "Last Visit", accessor: "lastVisit" },
  { label: "Category", accessor: "category" },
  { label: "Action", accessor: "action" },
];


const AllPatients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Category");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [patients, setPatients] = useState(dummyPatientsData);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    primaryPhone: "",
    alternatePhone: "",
    title: "",
    fullName: "",
    fatherSpouseName: "",
    dob: "",
    age: "",
    gender: "",
    email: "",
    address: "",
    bloodGroup: "",
    allergies: "",
    category: "",
    referredBy: "",
  });
  const [errors, setErrors] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (formData.primaryPhone.length !== 10) {
      newErrors.primaryPhone = "Primary phone must be exactly 10 digits.";
    }
    if (formData.alternatePhone.length !== 0 && formData.alternatePhone.length !== 10) {
      newErrors.alternatePhone = "Alternate phone must be exactly 10 digits.";
    }
    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters.";
    }
    return newErrors;
  };

  const handleRegisterPatient = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newPatient = {
      uid: (patients.length + 1).toString().padStart(5, "0"),
      name: formData.fullName,
      phone: formData.primaryPhone,
      lastVisit: new Date().toISOString().split("T")[0],
      category: formData.category || "New",
      action: "Consult",
    };

    setPatients([newPatient, ...patients]);
    setFormData({
      primaryPhone: "",
      alternatePhone: "",
      title: "",
      fullName: "",
      fatherSpouseName: "",
      dob: "",
      age: "",
      gender: "",
      email: "",
      address: "",
      bloodGroup: "",
      allergies: "",
      category: "",
      referredBy: "",
    });
    setErrors({});
    setShowMoreOptions(false);
    setIsModalOpen(false);
  };

  const filteredPatients = patients.filter((row) => {
    const matchesSearch = Object.values(row).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCategory =
      categoryFilter === "Category" || categoryFilter === "All" || row.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPatients.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, patients]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl leading-10 font-semibold">All Patients</h1>
              <Button onClick={() => setIsModalOpen(true)}>
                Register Patient
              </Button>
            </div>

             <SearchBar
      value={searchTerm}
      onChange={setSearchTerm}
      placeholder="Name, Phone, UID"
    />

            <div className="mb-4 relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="px-3 py-1 bg-gray-100 rounded-lg text-sm flex items-center gap-2"
              >
                <span>{categoryFilter}</span>
                <IoIosArrowDown />
              </button>
              {categoryDropdownOpen && (
                <div className="absolute mt-2 bg-white border rounded shadow text-sm z-50">
                  {categoryOptions.map((category) => (
                    <button
                      key={category}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                        categoryFilter === category ? "bg-gray-200" : ""
                      }`}
                      onClick={() => {
                        setCategoryFilter(category);
                        setCategoryDropdownOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <GenericTable
              columns={columns}
              data={currentRows}
              renderCell={(row, accessor) => {
                if (accessor === "category") {
                  return (
                    <span className="text-sm px-3 py-1 bg-purple-100 text-purple-800 w-[120px] text-center rounded-full inline-block">
                      {row.category}
                    </span>
                  );
                }
                if (accessor === "action") {
                  return (
                    <button
  className="text-[#7c69a7] font-medium text-sm"
  onClick={() => navigate(`/view-history/${row.uid}`, { state: { patient: row } })}
>
  View History
</button>
                  );
                }
                if (accessor === "name") {
                  return <span className="text-sm">{row[accessor]}</span>;
                }
                return (
                  <span className="text-sm text-[#69598C]">
                    {row[accessor]}
                  </span>
                );
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

        {/*{isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white max-h-[90vh] rounded-xl shadow-lg w-full max-w-3xl p-6 relative overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4">Add Patient</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    placeholder="Primary Phone Number"
                    value={formData.primaryPhone}
                    onChange={(e) => handleInputChange("primaryPhone", e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                  />
                  {errors.primaryPhone && (
                    <p className="text-red-500 text-xs mt-1">{errors.primaryPhone}</p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="Alternate Phone Number (Optional)"
                    value={formData.alternatePhone}
                    onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                  />
                  {errors.alternatePhone && (
                    <p className="text-red-500 text-xs mt-1">{errors.alternatePhone}</p>
                  )}
                </div>
                <input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <div>
                  <input
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>
                <input
                  placeholder="Father/Spouse Name"
                  value={formData.fatherSpouseName}
                  onChange={(e) => handleInputChange("fatherSpouseName", e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <input
                  placeholder="DOB (dd/mm/yyyy)"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <input
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="border px-3 py-2 rounded"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  placeholder="Email Address (Optional)"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <input
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="border px-3 py-2 rounded col-span-2"
                />
              </div>

              <button
                onClick={() => setShowMoreOptions(!showMoreOptions)}
                className="mt-4 text-purple-600 font-medium"
              >
                {showMoreOptions ? "Hide Options" : "More Options"}
              </button>

              {showMoreOptions && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    placeholder="Blood Group"
                    value={formData.bloodGroup}
                    onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                    className="border px-3 py-2 rounded"
                  />
                  <input
                    placeholder="Allergies (Optional)"
                    value={formData.allergies}
                    onChange={(e) => handleInputChange("allergies", e.target.value)}
                    className="border px-3 py-2 rounded"
                  />
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="border px-3 py-2 rounded"
                  >
                    <option value="">Select Category</option>
                    <option value="New">New</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Chronic">Chronic</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                  <input
                    placeholder="Referred By"
                    value={formData.referredBy}
                    onChange={(e) => handleInputChange("referredBy", e.target.value)}
                    className="border px-3 py-2 rounded"
                  />
                </div>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegisterPatient}
                  className="px-4 py-2 bg-[#5e3bea] text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}*/}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Patient">
           {/* ⬇ Paste all your form elements inside here ⬇ */}
           <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white max-h-[90vh] rounded-xl shadow-lg w-full max-w-xl p-6 relative overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4">Add Patient</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    placeholder="Primary Phone Number"
                    value={formData.primaryPhone}
                    onChange={(e) => handleInputChange("primaryPhone", e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                  />
                  {errors.primaryPhone && (
                    <p className="text-red-500 text-xs mt-1">{errors.primaryPhone}</p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="Alternate Phone Number (Optional)"
                    value={formData.alternatePhone}
                    onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                  />
                  {errors.alternatePhone && (
                    <p className="text-red-500 text-xs mt-1">{errors.alternatePhone}</p>
                  )}
                </div>
                <input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <div>
                  <input
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>
                <input
                  placeholder="Father/Spouse Name"
                  value={formData.fatherSpouseName}
                  onChange={(e) => handleInputChange("fatherSpouseName", e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <input
                  placeholder="DOB (dd/mm/yyyy)"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <input
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="border px-3 py-2 rounded"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  placeholder="Email Address (Optional)"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <input
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="border px-3 py-2 rounded col-span-2"
                />
              </div>

              <button
                onClick={() => setShowMoreOptions(!showMoreOptions)}
                className="mt-4 text-purple-600 font-medium"
              >
                {showMoreOptions ? "Hide Options" : "More Options"}
              </button>

              {showMoreOptions && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    placeholder="Blood Group"
                    value={formData.bloodGroup}
                    onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                    className="border px-3 py-2 rounded"
                  />
                  <input
                    placeholder="Allergies (Optional)"
                    value={formData.allergies}
                    onChange={(e) => handleInputChange("allergies", e.target.value)}
                    className="border px-3 py-2 rounded"
                  />
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="border px-3 py-2 rounded"
                  >
                    <option value="">Select Category</option>
                    <option value="New">New</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Chronic">Chronic</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                  <input
                    placeholder="Referred By"
                    value={formData.referredBy}
                    onChange={(e) => handleInputChange("referredBy", e.target.value)}
                    className="border px-3 py-2 rounded"
                  />
                </div>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegisterPatient}
                  className="px-4 py-2 bg-[#5e3bea] text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Modal>

      </div>
    </div>
  );
};

export default AllPatients;
