import React, { useState } from "react";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import SearchBar from "../components/ui/SearchBar";
import { MdDelete } from "react-icons/md";

const dummyUsers = [
  {
    id: 1,
    name: "Dr. Amit Sharma",
    email: "amit.sharma@example.com",
    role: "custom",
    avatar: "Ava Evans.png",
    permissions: {
      dashboard: true,
      invoice: false,
      patientQueue: true,
      createRx: true,
      allPatients: true,
      appointments: true,
      ipd: true,
      messages: true,
      social: true,
      automation: false,
      library: true,
    },
    permissionType: "Full Access",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya.verma@example.com",
    role: "custom",
    avatar: "Olivia Carter.png",
    permissions: {
      dashboard: true,
      invoice: true,
      patientQueue: false,
      createRx: true,
      allPatients: true,
      appointments: true,
      ipd: false,
      messages: false,
      social: false,
      automation: false,
      library: true,
    },
    permissionType: "Limited Access",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    role: "receptionist",
    avatar: "Owen Bennett.png",
    permissions: {
      dashboard: true,
      invoice: true,
      patientQueue: true,
      createRx: false,
      allPatients: false,
      appointments: true,
      ipd: false,
      messages: true,
      social: false,
      automation: false,
      library: false,
    },
    permissionType: "Basic Access",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    role: "admin",
    avatar: "Sophia Carter.png",
    permissions: {
      dashboard: true,
      invoice: true,
      patientQueue: true,
      createRx: true,
      allPatients: true,
      appointments: true,
      ipd: true,
      messages: true,
      social: true,
      automation: true,
      library: true,
    },
    permissionType: "Full Access",
  },
];


const UserManagementPage = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleCheckboxChange = (section) => {
    setSelectedUser((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [section]: !prev.permissions[section],
      },
    }));
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
    if (selectedUser?.id === userId) {
      setSelectedUser(null);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex gap-6 max-w-7xl mx-auto">
            {/* Left Form */}
            <div className="flex-1 bg-white p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">User Roles and Permissions</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={selectedUser ? selectedUser.name : ""}
                    readOnly
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={selectedUser ? selectedUser.email : ""}
                    readOnly
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Role</label>
                  <input
                    type="text"
                    value={selectedUser ? selectedUser.role : ""}
                    readOnly
                    className="border p-2 w-full rounded"
                  />
                </div>
              </div>

              <h3 className="text-md font-medium mb-2">Section Access Control</h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedUser &&
                  Object.keys(selectedUser.permissions).map((section) => (
                    <label key={section} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedUser.permissions[section]}
                        onChange={() => handleCheckboxChange(section)}
                      />
                      <span className="capitalize">{section.replace(/([A-Z])/g, " $1")}</span>
                    </label>
                  ))}
              </div>
               <div className="mt-10">
                  <label className="block text-sm font-medium">Permission Type</label>
                  <input
                    type="text"
                    value={selectedUser ? selectedUser.permissionType : ""}
                    readOnly
                    className="border p-2 w-full rounded"
                  />
                </div>
            </div>

            {/* Right User List */}
            <div className="w-74 bg-white p-2 rounded-xl  flex flex-col h-[calc(100vh-120px)]">
              <SearchBar
  searchTerm={searchQuery}
  setSearchTerm={setSearchQuery}
  placeholder="Search users"
/>

              <div className="mt-3 flex-1 overflow-y-auto space-y-2">
                {filteredUsers.map((user) => (
  <div
    key={user.id}
    className={`p-2 rounded flex items-center justify-between cursor-pointer hover:bg-gray-100 ${
      selectedUser?.id === user.id ? "bg-gray-200" : ""
    }`}
    onClick={() => handleSelectUser(user)}
  >
    <div className="flex items-center space-x-2">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p className="font-medium">{user.name}</p>
        <p className="text-[14px] text-[#736e7D] text-600">{user.email}</p>
        <p className="text-[14px] text-[#736e7D]  italic">{user.role}</p>
      </div>
    </div>
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteUser(user.id);
      }}
      className="text-gray-500 hover:text-red-600 transition"
    >
      <MdDelete size={16} />
    </button>
  </div>
))}

              </div>

              <div className="flex gap-2 mt-4">
                <button className="px-4 h-10 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition">
  Cancel
</button>
<Button className="px-5 h-10 text-white text-sm rounded-md hover:bg-purple-700 transition">
  Save & Apply Permissions
</Button>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagementPage;
