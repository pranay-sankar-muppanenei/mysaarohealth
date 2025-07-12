import React, { useState } from "react";
import { FiSend, FiPaperclip, FiSearch } from "react-icons/fi";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import { contacts } from "../data/MessagesDummyData";

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { from: "Owen", text: "Hi Dr. Chen, I've been experiencing a persistent cough and some shortness of breath.", date: "Today", img: "/Owen Bennett.png" },
    { from: "Dr. Amelia Chen", text: "Hello", date: "Today", img: "/amelia chen.png" },
    { from: "Owen", text: "Thank you, Dr. Chen. I appreciate your prompt response.", date: "Yesterday", img: "/Owen Bennett.png" },
    { from: "Dr. Amelia Chen", text: "You're welcome, Owen. I'm here to help.", date: "Yesterday", img: "/amelia chen.png" },
  ]);
  const [status, setStatus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { from: selectedContact.name, text: message, date: "Today", img: "/karen.png" }]);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const callUser = () => alert("Calling " + selectedContact.name);
  const shareFile = () => alert("Opening file dialog");

  const filteredData = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      filterCategory === "All" ||
      contact.role.toLowerCase() + 's' === filterCategory.toLowerCase() ||
      contact.role.toLowerCase() === filterCategory.toLowerCase();
    const matchStatus = status ? contact.status === "unread" : true;

    return matchesSearch && matchesCategory && matchStatus;
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-white overflow-hidden">
          <div className="max-w-[100%] mx-auto  h-full flex flex-col">
            <div className="flex flex-1 overflow-hidden bg-white rounded-lg shadow-lg">
              
              {/* Sidebar */}
              <div className="w-1/3 bg-white p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
">
                <h1 className="text-3xl leading-10 text-[#120F1A] font-semibold mb-6">Chat</h1>

                <div className="relative w-[89%] mb-4">
                  <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#665491] text-lg" />
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search by Name / UID / Role"
className="w-full pl-10 pr-10 py-2 border rounded-xl bg-[#c5c7c9] bg-opacity-20 text-[#5e3bea] focus:outline-none text-sm"
                  />
                </div>
                

                <div className="flex flex-wrap gap-2 mb-4">
                  {["All", "Patients", "Staff", "Doctors"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-1 py-1 text-xs rounded-full ${
                        filterCategory === cat
                          ? "bg-[#6B3DD6] text-[#FAFAFA] h-[32px] w-[82px] rounded-2xl"
                          : "bg-[#EBE8F2] h-[32px] w-[81px] text-[#120F1A] hover:bg-purple-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  <button
                    onClick={() => setStatus(!status)}
                    className={`px-1 py-1 text-xs rounded-full ${
                      status
                        ? "bg-[#6B3DD6] text-[#FAFAFA] h-[32px] w-[82px] rounded-2xl"
                        : "bg-[#EBE8F2] h-[32px] w-[81px] text-[#120F1A] hover:bg-purple-300"
                    }`}
                  >
                    Unread
                  </button>
                </div>

                {filteredData.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-purple-100 ${selectedContact.id === contact.id ? "bg-purple-50" : ""}`}
                  >
                    <img
                      src={contact.img}
                      alt="avatar"
                      className="w-[56px] h-[56px] rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-[16px] text-[#120F1A]">{contact.name}</p>
                      <p className="text-xs text-[#665491]">{contact.time}</p>
                    </div>
                    {contact.status === 'unread' && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                  </div>
                ))}
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                
                <div className="flex flex-col items-center py-2 h-1/3">
                  <img
                    src={`${selectedContact.img}`}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-900">{selectedContact.name}</h2>
                  <p className="text-sm text-[#665491]">UID: 12345</p>
                  <p className="text-sm text-[#665491] font-medium">
                    {selectedContact.name.toLowerCase().startsWith("dr.")
                      ? "Doctor"
                      : selectedContact.role || "Patient"}
                  </p>
                </div>

                <div className="flex justify-between px-8 mt-4">
                  <button
                    onClick={callUser}
                    className="px-4 py-1 rounded-full h-[40px] w-[84px] bg-[#EBE8F2] text-sm font-medium"
                  >
                    Call
                  </button>
                  <button
                    onClick={shareFile}
                    className="px-4 py-1 rounded-full bg-[#EBE8F2] h-[40px] w-[100px] text-sm font-medium"
                  >
                    Share File
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-none ">
                  {messages.map((msg, index) => {
                    const isDoctor = msg.from.toLowerCase().startsWith("dr.");

                    return (
                      <div
                        key={index}
                        className={`flex items-end gap-2 ${isDoctor ? "justify-end" : "justify-start"}`}
                      >
                        {!isDoctor && (
                          <img
                            src={msg.img}
                            alt={msg.from}
                            className="w-8 h-8 rounded-full"
                          />
                        )}

                        <div className="h-[48px] mt-5 max-w-md">
                          <p className={`text-xs text-[#665491] mb-1 ${isDoctor ? "text-right" : "text-left"}`}>
                            {msg.from}
                          </p>
                          <div
                            className={`px-4 py-2 rounded-xl text-sm ${isDoctor
                              ? "bg-[#6B3DD6] text-white"
                              : "bg-[#EBE8F2] text-gray-900"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>

                        {isDoctor && (
                          <img
                            src={msg.img}
                            alt={msg.from}
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="border-t p-4 flex items-center gap-2">
                  <img
                    src={"/karen.png"}
                    className="w-8 h-8 rounded-full"
                    alt="You"
                  />
                  <div className="relative flex items-center w-full">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 p-2 pr-32 rounded bg-gray-200"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />

                    <div className="absolute right-2 flex items-center gap-2">
                      <button className="text-gray-500">
                        <FiPaperclip />
                      </button>
                      <button className="text-gray-500">
                        <img src="/mic.svg" className="w-5 h-5" />
                      </button>
                      <button className="text-gray-500">
                        <img src="/emo.svg" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={sendMessage}
                    className="bg-[#6B3DD6] text-white px-4 py-2 rounded flex items-center gap-1"
                  >
                    <FiSend /> Send
                  </button>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;