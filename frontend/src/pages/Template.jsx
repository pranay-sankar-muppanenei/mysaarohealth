import React, { useState } from "react";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import Button from '../components/ui/Button';
import Modal from '../components/ui/GenericModal'
import Pagination from "../components/ui/Pagination"; // ✅ imported

const initialData = [
  {
    name: "Template A",
    type: "Investigations",
    items: "Blood Test, Urine Analysis",
    creator: "Dr. Emily Carter",
  },
  {
    name: "Template B",
    type: "Advice",
    items: "Dietary Recommendations, Exercise Plan",
    creator: "Dr. David Lee",
  },
  {
    name: "Template C",
    type: "Medicine Set",
    items: "Antibiotics, Pain Relievers",
    creator: "Dr. Sarah Jones",
  },
];

const columns = [
  { label: "Template Name", accessor: "name" },
  { label: "Type", accessor: "type" },
  { label: "Items", accessor: "items" },
  { label: "Created By", accessor: "creator" },
  { label: "Actions", accessor: "actions" },
];

const Templates = () => {
  const [templateData, setTemplateData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: '', items: '', creator: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(templateData.length / pageSize);

  const paginatedData = templateData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCreateTemplate = () => {
    setFormData({ name: '', type: '', items: '', creator: '' });
    setEditIndex(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Template name is required.";
    if (!formData.type.trim()) newErrors.type = "Type is required.";
    if (!formData.items.trim()) newErrors.items = "Items are required.";
    if (!formData.creator.trim()) newErrors.creator = "Creator is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      if (editIndex !== null) {
        // Update existing template
        const updated = [...templateData];
        updated[editIndex] = formData;
        setTemplateData(updated);
      } else {
        // Add new template
        const newData = [...templateData, formData];
        setTemplateData(newData);

        // Move to last page if new data overflows
        const newTotalPages = Math.ceil(newData.length / pageSize);
        if (currentPage !== newTotalPages) {
          setCurrentPage(newTotalPages);
        }
      }
      setFormData({ name: '', type: '', items: '', creator: '' });
      setEditIndex(null);
      setErrors({});
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({ name: '', type: '', items: '', creator: '' });
    setEditIndex(null);
    setErrors({});
  };

  const handleEdit = (index) => {
    setFormData(templateData[index]);
    setEditIndex(index);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      const updated = [...templateData];
      updated.splice(index, 1);
      setTemplateData(updated);

      if ((currentPage - 1) * pageSize >= updated.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Templates</h2>
              <Button
                onClick={handleCreateTemplate}
                className="bg-[#7042D9] text-black font-semibold px-4 py-2 rounded-full hover:bg-[#e0dbf6]"
              >
                + Create Template
              </Button>
            </div>

            <div className="overflow-x-auto rounded-xl">
              <GenericTable
                columns={columns}
                data={paginatedData.map((item, index) => ({
                  ...item,
                  actions: (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit((currentPage - 1) * pageSize + index)}
                        className="text-blue-600 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete((currentPage - 1) * pageSize + index)}
                        className="text-red-500 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  ),
                }))}
                renderCell={(row, accessor) => (
                  <span className={accessor === "actions" ? "" : "text-md"}>
                    {row[accessor]}
                  </span>
                )}
              />
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </main>
      </div>
                {isModalOpen && (
  <Modal
    isOpen={isModalOpen}
    onClose={handleCancel}
    title={editIndex !== null ? "Edit Template" : "Create Template"}
  >
    <div className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Template Name"
          className="w-full border rounded px-3 py-2"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Section</option>
          <option value="History">History</option>
          <option value="Advice">Advice</option>
          <option value="Complaints">Complaints</option>
          <option value="Medications">Medications</option>
          <option value="Investigation Advice">Investigation Advice</option>
          <option value="Physical Examination">Physical Examination</option>
          <option value="Diagnosis">Diagnosis</option>
        </select>
        {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
      </div>

      <div>
        <textarea
          name="items"
          value={formData.items}
          onChange={handleInputChange}
          placeholder="Items"
          className="w-full border rounded px-3 py-2"
        />
        {errors.items && <p className="text-red-500 text-sm mt-1">{errors.items}</p>}
      </div>

      <div>
        <input
          type="text"
          name="creator"
          value={formData.creator}
          onChange={handleInputChange}
          placeholder="Created By"
          className="w-full border rounded px-3 py-2"
        />
        {errors.creator && <p className="text-red-500 text-sm mt-1">{errors.creator}</p>}
      </div>
    </div>

    <div className="flex justify-end gap-4 mt-6">
      <Button
        type="button"
        onClick={handleCancel}
        className="text-white font-semibold"
      >
        Cancel
      </Button>
      <Button
        type="button"
        onClick={handleSave}
        className="text-blue-600 font-semibold"
      >
        Save
      </Button>
    </div>
  </Modal>
)}

      
    </div>
  );
};

export default Templates;


{/*{isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4">{editIndex !== null ? "Edit Template" : "Create Template"}</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Template Name"
                  className="w-full border rounded px-3 py-2"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Section</option>
                  <option value="History">History</option>
                  <option value="Advice">Advice</option>
                  <option value="Complaints">Complaints</option>
                  <option value="Medications">Medications</option>
                  <option value="Investigation Advice">Investigation Advice</option>
                  <option value="Physical Examination">Physical Examination</option>
                  <option value="Diagnosis">Diagnosis</option>
                </select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>

              <div>
                <textarea
                  name="items"
                  value={formData.items}
                  onChange={handleInputChange}
                  placeholder="Items"
                  className="w-full border rounded px-3 py-2"
                />
                {errors.items && <p className="text-red-500 text-sm mt-1">{errors.items}</p>}
              </div>

              <div>
                <input
                  type="text"
                  name="creator"
                  value={formData.creator}
                  onChange={handleInputChange}
                  placeholder="Created By"
                  className="w-full border rounded px-3 py-2"
                />
                {errors.creator && <p className="text-red-500 text-sm mt-1">{errors.creator}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                onClick={handleCancel}
                className="text-white font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="text-blue-600 font-semibold"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}*/}