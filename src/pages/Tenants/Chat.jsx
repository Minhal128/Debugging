/** @format */

import React, { useState } from "react";
import Header from "../../Components/Header/Header";
// If you're using a custom Button component, import it here:
// import Button from "../../Components/Button/Button";
import { Avatar, Input } from "antd";
import { UserOutlined, PhoneOutlined, SmileOutlined, MoreOutlined } from "@ant-design/icons";
import Button from "../../Components/Button/Button";

/** Sample data: contacts in the sidebar */
const contacts = [
  {
    id: 1,
    name: "Phoenix Baker",
    handle: "@phoenix",
    lastMessage: "Hey Olivia, can you see my latest doc?",
    avatar: "",
  },
  {
    id: 2,
    name: "Mollie Hall",
    handle: "@mollie",
    lastMessage: "Sure thing, I’ll have a look soon.",
    avatar: "",
  },
  {
    id: 3,
    name: "Rosalie Melvin",
    handle: "@rosalie",
    lastMessage: "I’ve just published the site again. Looks good now!",
    avatar: "",
  },
  {
    id: 4,
    name: "Analia Whitten",
    handle: "@analia",
    lastMessage: "All good now! I’ve accepted the offer. Let’s move forward.",
    avatar: "",
  },
  {
    id: 5,
    name: "Koray Okumus",
    handle: "@koray",
    lastMessage: "Thanks! Looks great!",
    avatar: "",
  },
];

/** Sample data: messages in the selected chat */
const sampleMessages = [
  {
    id: 1,
    sender: "Katherine Moss",
    senderHandle: "@kathy",
    text: "Tech requirements.pdf",
    type: "attachment",
    timestamp: "Thursday",
  },
  {
    id: 2,
    sender: "You",
    text: "Awesome! Thanks. I'll check it out.",
    timestamp: "Thursday",
  },
  {
    id: 3,
    sender: "Katherine Moss",
    text: "Hey Olivia, can you please review the latest design when you can?",
    timestamp: "Friday",
  },
  {
    id: 4,
    sender: "You",
    text: "Sure thing, I'll have a look today. They're looking great!",
    timestamp: "Friday",
  },
];

const Chat = () => {
  const [activeContact, setActiveContact] = useState(1); // Which contact is selected
  const [messages, setMessages] = useState(sampleMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      text: inputValue,
      timestamp: "Just now",
    };
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Existing header component */}
      <Header title="Chat" />

      {/* Main content: Sidebar + Chat area */}
      <div className="flex flex-1">
        {/* LEFT SIDEBAR */}
        <div className="hidden md:flex flex-col w-1/3 border-r border-gray-200">
          <div className="p-4 font-bold text-lg border-b border-gray-200">Contacts</div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setActiveContact(contact.id)}
                className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
                  activeContact === contact.id ? "bg-gray-200" : ""
                }`}
              >
                <Avatar icon={<UserOutlined />} className="mr-3" style={{ backgroundColor: "#87d068" }} />
                <div>
                  <div className="font-semibold">{contact.name}</div>
                  <div className="text-xs text-gray-500">{contact.lastMessage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CHAT AREA */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-center">
              <Avatar icon={<UserOutlined />} className="mr-3" style={{ backgroundColor: "#f56a00" }} />
              <div>
                <div className="font-semibold text-base">Katherine Moss</div>
                <div className="text-sm text-green-600">Online</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button type="primary" className="p-2">
                <PhoneOutlined /> Call
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {/* Example date / day label */}
            {/* <div className="text-center text-xs text-gray-400 mb-2">Thursday</div> */}

            {messages.map((msg) => (
              <div key={msg.id} className="mb-4">
                {/* Show a day divider if you want to group by date */}
                {/* For a simpler approach, we just show timestamp inline. */}

                {/* Sender Name */}
                <div className="flex items-center mb-1">
                  <span className={`text-sm font-bold ${msg.sender === "You" ? "text-blue-600" : "text-gray-800"}`}>
                    {msg.sender}
                  </span>
                  <span className="text-xs text-gray-400 ml-2 ">{msg.timestamp}</span>
                </div>

                {/* Message Text */}
                <div
                  className={`inline-block py-2 px-3 rounded-lg ${
                    msg.sender === "You" ? "bg-blue-100 text-gray-700" : "bg-white text-gray-700"
                  } shadow-sm border border-gray-200`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="w-11/12 h-1/5 flex flex-col border border-gray-300 rounded-lg bg-white px-4 py-2 mx-auto justify-between items-end">
            {/* Top row: Input at top-right */}
            <div className="w-full flex justify-start">
              <input
                type="text"
                className="w-full outline-none border-none placeholder-gray-400 text-gray-700"
                placeholder="Send a message"
              />
            </div>

            {/* Bottom row: Icons + Button at bottom-right */}
            <div className="flex items-center space-x-4 justify-end ">
              <SmileOutlined className="text-gray-400 hover:text-gray-600 cursor-pointer" />
              <MoreOutlined className="text-gray-400 hover:text-gray-600 cursor-pointer" />
              <Button type="primary" className="rounded-full px-4 py-1">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
