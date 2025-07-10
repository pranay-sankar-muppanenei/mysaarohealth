import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FiSidebar } from "react-icons/fi";
import { motion } from "framer-motion";
import {
  PiCaretDown,
  PiCaretUp,
} from "react-icons/pi";

const navLinks = [
  { name: "Dashboard", icon: <img src="/dashboard.svg" alt="Dashboard" style={{ width: "20px", height: "20px" }} />, to: "/" },
  { name: "Invoice", icon: <img src="/invoice.svg" alt="Invoice" style={{ width: "20px", height: "20px" }} />, to: "/invoice" },
  { name: "Patient Queue", icon: <img src="/patient-queue.svg" alt="Patient Queue" style={{ width: "20px", height: "20px" }} />, to: "/patient-queue" },
  { name: "Create Rx", icon: <img src="/create-rx.svg" alt="Create Rx" style={{ width: "20px", height: "20px" }} />, to: "/create-rx" },
  { name: "All Patients", icon: <img src="/all-patients.svg" alt="All Patients" style={{ width: "20px", height: "20px" }} />, to: "/all-patients" },
  { name: "Appointments", icon: <img src="/appointments.svg" alt="Appointments" style={{ width: "20px", height: "20px" }} />, to: "/appointments" },
  { name: "IPD", icon: <img src="/ipd.svg" alt="IPD" style={{ width: "20px", height: "20px" }} />, to: "/ipd" },
  { name: "Messages", icon: <img src="/messages.svg" alt="Messages" style={{ width: "20px", height: "20px" }} />, to: "/messages" },
  { name: "Social", icon: <img src="/social.svg" alt="Social" style={{ width: "20px", height: "20px" }} />, to: "/social" },
  { name: "Automation", icon: <img src="/automation.svg" alt="Automation" style={{ width: "20px", height: "20px" }} />, to: "/automation" },
  { name: "More" },
  { name: "Library", icon: <img src="/library.svg" alt="Library" style={{ width: "20px", height: "20px" }} /> },
  { name: "User", icon: <img src="/user.svg" alt="User" style={{ width: "20px", height: "20px" }} />, to: "/user" },
  { name: "Settings", icon: <img src="/automation.svg" alt="Settings" style={{ width: "20px", height: "20px" }} />, to: "/settings" },
];

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(() =>
    location.pathname.startsWith("/template-library") ||
    location.pathname.startsWith("/medicine-library") ||
    location.pathname.startsWith("/dropdown-library")
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        {!isOpen && (
          <button className="p-2 rounded-md bg-white shadow" onClick={() => setIsOpen(true)}>
            <FiSidebar size={20} />
          </button>
        )}
      </div>

      {/* Sidebar Mobile */}
      <motion.aside
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg p-4 lg:hidden"
      >
        <div className="flex justify-between items-center mb-6">
          <img src="/saaro-health.png" alt="Saaro Health Logo" className="h-30 w-auto object-contain -mb-20 -mt-20 -ml-5" />
          <button onClick={() => setIsOpen(false)}>
            <RxCross2 size={20} />
          </button>
        </div>
        <SidebarContent isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} />
      </motion.aside>

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col h-screen w-[250px] p-4 bg-white shadow-xl z-10 mr-2 overflow-y-auto">
        <div className="flex items-center mb-4">
          <img src="/saaro-health2.png" alt="Saaro Health Logo" className="h-30 w-auto object-contain -mb-20 -mt-20 -ml-5" />
        </div>
        <SidebarContent isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} />
      </aside>
    </>
  );
};

const SidebarContent = ({ isLibraryOpen, setIsLibraryOpen }) => {
  return (
    <nav className="space-y-1">
      {navLinks.map((link, index) => {
        if (link.name.toLowerCase() === "more") {
          return (
            <div
              key={`section-${index}`}
              className="mt-4 mb-2 px-3 text-sm font-semibold text-gray-400 uppercase"
              style={{ color: "#120D1C" }}
            >
              More
            </div>
          );
        }

        if (link.name.toLowerCase() === "library") {
          return (
            <div key="library">
              <button
                onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-gray-700 rounded-lg hover:bg-[#e6ddfa] transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{link.icon}</span>
                  <span className="text-sm">Library</span>
                </div>
                {isLibraryOpen ? <PiCaretUp /> : <PiCaretDown />}
              </button>
              {isLibraryOpen && (
                <div className="ml-6 space-y-1 text-sm text-gray-600">
                  <NavLink
                    to="/template-library"
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded hover:bg-gray-100 ${isActive ? "font-semibold bg-[#e6ddfa] text-black" : ""}`
                    }
                  >
                    Template
                  </NavLink>
                  <NavLink
                    to="/medicine-library"
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded hover:bg-gray-100 ${isActive ? "font-semibold bg-[#e6ddfa] text-black" : ""}`
                    }
                  >
                    Medicine
                  </NavLink>
                  <NavLink
                    to="/dropdown-library"
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded hover:bg-gray-100 ${isActive ? "font-semibold bg-[#e6ddfa] text-black" : ""}`
                    }
                  >
                    Dropdown
                  </NavLink>
                </div>
              )}
            </div>
          );
        }

        return (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#e6ddfa] transition ${
                isActive ? "bg-[#e6ddfa] font-semibold text-black" : "text-gray-700"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span className="text-sm">{link.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Sidebar;
