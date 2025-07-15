import React, { useState } from "react";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import SearchBar from "../components/ui/SearchBar";
import { MdDelete } from "react-icons/md";
import { dummyUsers, defaultRolePermissions } from "../data/dummyUserData";
import { toast } from "react-toastify";

const emptyUserTemplate = {
  id: null,
  name: "",
  email: "",
  role: "custom",
  permissions: {
    dashboard: "none",
    appointments: "none",
    billing: "none",
    patients: "none",
    inventory: "none",
    reports: "none",
    settings: "none",
  },
  avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
};

const UserManagementPage = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState({ ...emptyUserTemplate });
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({ name: false, email: false });

  const handleSelectUser = (user) => {
    setSelectedUser({ ...user });
    setErrors({ name: false, email: false });
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    if (newRole !== "custom") {
      setSelectedUser((prev) => ({
        ...prev,
        role: newRole,
        permissions: defaultRolePermissions[newRole],
      }));
    } else {
      setSelectedUser((prev) => ({
        ...prev,
        role: "custom",
      }));
    }
  };

  const handlePermissionCheckboxChange = (section) => {
    const current = selectedUser.permissions[section];
    setSelectedUser((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [section]: current === "none" ? "view" : "none",
      },
    }));
  };

  const handlePermissionDropdownChange = (section, value) => {
    setSelectedUser((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [section]: value,
      },
    }));
  };

  const handleAddNewUser = () => {
    let hasError = false;
    const newErrors = { name: false, email: false };

    if (!selectedUser.name.trim()) {
      newErrors.name = true;
      hasError = true;
    }
    if (!selectedUser.email.trim()) {
      newErrors.email = true;
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      toast.error("Name and Email are required!");
      return;
    }

    const newUser = {
      ...selectedUser,
      id: Date.now(),
    };
    setUsers((prev) => [newUser, ...prev]);
    toast.success("New user added successfully!");

    // Clear form after adding
    setSelectedUser({ ...emptyUserTemplate });
    setErrors({ name: false, email: false });
  };

  const handleSave = () => {
    if (!selectedUser.id) {
      toast.error("Please add a user first!");
      return;
    }

    setUsers((prev) =>
      prev.map((user) => (user.id === selectedUser.id ? selectedUser : user))
    );

    toast.success("User permissions updated!");
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...emptyUserTemplate });
      setErrors({ name: false, email: false });
    }
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
        <main className="relative flex-1 p-6 overflow-y-auto">
          <div className="flex gap-6 max-w-7xl mx-auto">
            {/* Left */}
            <div className="flex-1 bg-white p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl leading-10 font-semibold">User Roles and Permissions</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) => {
                      setSelectedUser({ ...selectedUser, name: e.target.value });
                      setErrors((prev) => ({ ...prev, name: false }));
                    }}
                    className={`border p-2 w-full rounded ${errors.name ? "border-red-500" : ""}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => {
                      setSelectedUser({ ...selectedUser, email: e.target.value });
                      setErrors((prev) => ({ ...prev, email: false }));
                    }}
                    className={`border p-2 w-full rounded ${errors.email ? "border-red-500" : ""}`}
                  />
                </div>
               <div>
  <label className="block text-sm font-medium">Role</label>
  <div className="relative">
    <select
      value={selectedUser.role}
      onChange={handleRoleChange}
      className="border p-2 w-full rounded appearance-none"
    >
      <option value="doctor">Doctor</option>
      <option value="receptionist">Receptionist</option>
      <option value="billingStaff">Billing Staff</option>
      <option value="admin">Admin</option>
      <option value="custom">Custom</option>
    </select>
    <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
      ▼
    </div>
  </div>
</div>

              </div>

              <Button
                className="px-4 py-2  text-white text-sm rounded-md hover:bg-purple-700"
                onClick={handleAddNewUser}
              >
                + Add New User
              </Button>

              <h3 className="text-md font-medium mt-6 mb-2">Section Access Control</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(selectedUser.permissions).map(([section, level]) => {
                  const isChecked = level !== "none";
                  return (
                    <div key={section} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handlePermissionCheckboxChange(section)}
                      />
                      <span className="capitalize w-32">
                        {section.replace(/([A-Z])/g, " $1")}
                      </span>
                      {isChecked && (
                         <select
                          value={level}
                          onChange={(e) => handlePermissionDropdownChange(section, e.target.value)}
                          className="border p-1 rounded"
                        >
                          <option value="view">View</option>
                          <option value="edit">Edit</option>
                          <option value="full">Full</option>
                        </select> 

                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right */}
            <div className="w-74 bg-white p-2 rounded-xl flex flex-col h-[calc(100vh-120px)]">
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
                        <p className="text-[14px] text-[#736e7D]">{user.email}</p>
                        <p className="text-[14px] text-[#736e7D] italic">{user.role}</p>
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

              <div className="absolute bottom-2 right-3 flex gap-2 mt-4">
                <button
                  className="px-4 h-10 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition"
                  onClick={() => {
                    setSelectedUser({ ...emptyUserTemplate });
                    setErrors({ name: false, email: false });
                  }}
                >
                  Cancel
                </button>
                <Button
                  className="px-5 h-10 text-white text-sm rounded-md hover:bg-purple-700 transition"
                  onClick={handleSave}
                  disabled={!selectedUser}
                >
                  Save & Apply
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
