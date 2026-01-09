import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import "./UserPremium.css";
import "./ChatPage.css"; // Keeping default chat styles for layout specifics, or override if needed
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

const ChatPage = () => {
  const { doctorLoginId } = useParams();
  const userId = localStorage.getItem("user");

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!userId) {
      console.error("UserId missing");
      return;
    }

    if (doctorLoginId) {
      initChatWithDoctor();
    } else {
      fetchChats();
    }
  }, [doctorLoginId, userId]);

  const initChatWithDoctor = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        userId,
        doctorLoginId,
      });

      const chatId = res.data._id;
      const listRes = await axios.get(`http://localhost:5000/api/chat/list/${userId}`);
      setChats(listRes.data);

      const populatedChat = listRes.data.find((c) => c._id === chatId);
      if (populatedChat) {
        openChat(populatedChat);
      }
    } catch (err) {
      console.error("initChatWithDoctor error:", err);
    }
  };

  const fetchChats = async (openChatId = null) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/list/${userId}`);
      setChats(res.data);
      if (openChatId) {
        const found = res.data.find((c) => c._id === openChatId);
        if (found) openChat(found);
      }
    } catch (err) {
      console.error("fetchChats error:", err);
    }
  };

  const openChat = async (chat) => {
    setSelectedChat(chat);
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/messages/${chat._id}`);
      setMessages(res.data);
    } catch (err) {
      console.error("openChat error:", err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const res = await axios.post("http://localhost:5000/api/chat/message", {
        chatId: selectedChat._id,
        senderRole: "user",
        message: newMessage,
      });

      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
      fetchChats();
    } catch (err) {
      console.error("sendMessage error:", err);
    }
  };

  return (
    <div className="user-layout">
      <UserSidebar />
      <main className="user-main" style={{ padding: 0, height: "100vh", overflow: "hidden" }}>
        <div className="chat-container" style={{ height: "100%" }}>
          <div className="row h-100" style={{ margin: 0 }}>

            {/* CHAT LIST */}
            <div className="col-4 chat-right" style={{ borderRight: "1px solid #e2e8f0", background: "white", padding: 0 }}>
              <div style={{ padding: "20px", borderBottom: "1px solid #f1f5f9" }}>
                <h4 style={{ margin: 0, fontWeight: "800", color: "#1e293b" }}>Chats</h4>
              </div>
              <div style={{ overflowY: "auto", height: "calc(100% - 70px)" }}>
                {chats.map((chat) => (
                  <div
                    key={chat._id}
                    className={`chat-card ${selectedChat?._id === chat._id ? "active-chat" : ""}`}
                    onClick={() => openChat(chat)}
                    style={{
                      padding: "15px 20px",
                      borderBottom: "1px solid #f8fafc",
                      cursor: "pointer",
                      background: selectedChat?._id === chat._id ? "#f1f8e9" : "white",
                      transition: "background 0.2s"
                    }}
                  >
                    <h6 style={{ margin: "0 0 5px 0", fontWeight: "700", color: "#334155" }}>{chat.doctorId.doctorName}</h6>
                    <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{chat.lastMessage || "No messages yet"}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CHAT WINDOW */}
            <div className="col-8 chat-left" style={{ padding: 0, background: "#f8fafc", display: "flex", flexDirection: "column" }}>
              {!selectedChat ? (
                <div className="chat-placeholder" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#94a3b8" }}>
                  <FaComments style={{ fontSize: "4rem", marginBottom: "20px", color: "#cbd5e1" }} />
                  <h3>Select a conversation</h3>
                </div>
              ) : (
                <>
                  <div className="chat-header" style={{ padding: "15px 25px", background: "white", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "15px" }}>
                    <FaUserCircle style={{ fontSize: "2.5rem", color: "#cbd5e1" }} />
                    <div>
                      <h5 style={{ margin: 0, fontWeight: "700" }}>{selectedChat.doctorId.doctorName}</h5>
                      <small style={{ color: "#64748b" }}>{selectedChat.doctorId.doctorQualification}</small>
                    </div>
                  </div>

                  <div className="chat-messages" style={{ flex: 1, padding: "25px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        style={{
                          alignSelf: msg.senderRole === "user" ? "flex-end" : "flex-start",
                          maxWidth: "70%",
                          padding: "12px 18px",
                          borderRadius: "15px",
                          background: msg.senderRole === "user" ? "var(--user-primary)" : "white",
                          color: msg.senderRole === "user" ? "white" : "#334155",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                          borderTopRightRadius: msg.senderRole === "user" ? "2px" : "15px",
                          borderTopLeftRadius: msg.senderRole === "user" ? "15px" : "2px",
                        }}
                      >
                        {msg.message}
                      </div>
                    ))}
                  </div>

                  <div className="chat-input" style={{ padding: "20px", background: "white", borderTop: "1px solid #f1f5f9", display: "flex", gap: "15px" }}>
                    <input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      style={{ flex: 1, padding: "12px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", outline: "none" }}
                    />
                    <button
                      onClick={sendMessage}
                      style={{ width: "50px", height: "50px", borderRadius: "12px", background: "var(--user-primary)", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
