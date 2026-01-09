// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "../User/ChatPage.css";

// const DoctorChatPage = () => {
//   const { userId } = useParams(); // when doctor opens a specific user
//   const doctorLoginId = localStorage.getItem("userId");

//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   // -------------------------------
//   // INITIAL LOAD
//   // -------------------------------
//   useEffect(() => {
//     if (!doctorLoginId) {
//       console.error("DoctorLoginId missing in localStorage");
//       return;
//     }

//     if (userId) {
//       initChatWithUser();
//     } else {
//       fetchChats();
//     }
//   }, [userId, doctorLoginId]);

//   // -------------------------------
//   // CREATE / GET CHAT
//   // -------------------------------
//   const initChatWithUser = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/chat", {
//         userId,
//         doctorLoginId,
//       });

//       const chatId = res.data._id;

//       const listRes = await axios.get(
//         `http://localhost:5000/api/chat/doctor/list/${doctorLoginId}`
//       );

//       setChats(listRes.data);

//       const populatedChat = listRes.data.find(
//         (c) => c._id === chatId
//       );

//       if (populatedChat) openChat(populatedChat);
//     } catch (err) {
//       console.error("initChatWithUser error:", err);
//     }
//   };

//   // -------------------------------
//   // FETCH CHAT LIST
//   // -------------------------------
//   const fetchChats = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/chat/doctor/list/${doctorLoginId}`
//       );
//       setChats(res.data);
//     } catch (err) {
//       console.error("fetchChats error:", err);
//     }
//   };

//   // -------------------------------
//   // OPEN CHAT
//   // -------------------------------
//   const openChat = async (chat) => {
//     setSelectedChat(chat);

//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/chat/messages/${chat._id}`
//       );
//       setMessages(res.data);
//     } catch (err) {
//       console.error("openChat error:", err);
//     }
//   };

//   // -------------------------------
//   // SEND MESSAGE
//   // -------------------------------
//   const sendMessage = async () => {
//     if (!newMessage.trim() || !selectedChat) return;

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/chat/message",
//         {
//           chatId: selectedChat._id,
//           senderRole: "doctor",
//           message: newMessage,
//         }
//       );

//       setMessages((prev) => [...prev, res.data]);
//       setNewMessage("");
//       fetchChats();
//     } catch (err) {
//       console.error("sendMessage error:", err);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="row h-100">

//         {/* CHAT LIST */}
//         <div className="col-4 chat-right">
//           <h4 className="chat-list-title">Patients</h4>

//           {chats.map((chat) => (
//             <div
//               key={chat._id}
//               className="chat-card"
//               onClick={() => openChat(chat)}
//             >
//               <h6>{chat.userId.name}</h6>
//               <p>{chat.lastMessage || "No messages yet"}</p>
//             </div>
//           ))}
//         </div>

//         {/* CHAT WINDOW */}
//         <div className="col-8 chat-left">
//           {!selectedChat ? (
//             <div className="chat-placeholder">
//               <h1>PetCare</h1>
//               <p>Select a patient to start conversation</p>
//             </div>
//           ) : (
//             <>
//               <div className="chat-header">
//                 <h5>{selectedChat.userId.name}</h5>
//               </div>

//               <div className="chat-messages">
//                 {messages.map((msg) => (
//                   <div
//                     key={msg._id}
//                     className={
//                       msg.senderRole === "doctor"
//                         ? "message right"
//                         : "message left"
//                     }
//                   >
//                     {msg.message}
//                   </div>
//                 ))}
//               </div>

//               <div className="chat-input">
//                 <input
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type a message..."
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 />
//                 <button onClick={sendMessage}>Send</button>
//               </div>
//             </>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DoctorChatPage;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DoctorSidebar from "./DoctorSidebar";
import "./DoctorPremium.css";
import { FaUserCircle, FaPaperPlane, FaComments } from "react-icons/fa";

const DoctorChatPage = () => {
  const doctorLoginId = localStorage.getItem("userId");
  const doctorName = localStorage.getItem("name") || "Doctor";

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorLoginId) {
      console.error("DoctorLoginId missing in localStorage");
      return;
    }
    fetchChats();
  }, [doctorLoginId]);

  const fetchChats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/doctor/list/${doctorLoginId}`
      );
      setChats(res.data);
      setLoading(false);
    } catch (err) {
      console.error("fetchChats error:", err);
      setLoading(false);
    }
  };

  const openChat = async (chat) => {
    setSelectedChat(chat);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/messages/${chat._id}`
      );
      setMessages(res.data);
    } catch (err) {
      console.error("openChat error:", err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat/message",
        {
          chatId: selectedChat._id,
          senderRole: "doctor",
          message: newMessage,
        }
      );

      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
      fetchChats();
    } catch (err) {
      console.error("sendMessage error:", err);
    }
  };

  return (
    <div className="doctor-layout">
      <DoctorSidebar />
      <main className="doctor-main" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '0' }}>
        <header className="panel-header" style={{ padding: '30px 40px', marginBottom: '0', borderBottom: '1px solid #e2e8f0', background: 'white' }}>
          <h1 className="panel-title">Chat <span>Center</span></h1>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', flex: 1, overflow: 'hidden' }}>
          {/* Chat List Column */}
          <aside style={{ background: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0 }}>Patients</h3>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
              {chats.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No active chats</div>
              ) : (
                chats.map((chat) => (
                  <motion.div
                    key={chat._id}
                    onClick={() => openChat(chat)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    style={{
                      padding: '15px',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      background: selectedChat?._id === chat._id ? 'var(--doc-accent)' : 'transparent',
                      marginBottom: '8px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ color: selectedChat?._id === chat._id ? 'var(--doc-primary)' : '#cbd5e1', fontSize: '2rem' }}>
                      <FaUserCircle />
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: selectedChat?._id === chat._id ? 'var(--doc-primary)' : 'var(--doc-text)' }}>
                        {chat.userId.userFullname}
                      </h5>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {chat.lastMessage || "Start a conversation"}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </aside>

          {/* Chat Window Column */}
          <section style={{ display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
            {!selectedChat ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', gap: '20px' }}>
                <div style={{ fontSize: '4rem', opacity: 0.2 }}><FaComments /></div>
                <p style={{ fontWeight: '600' }}>Select a patient to start consulting</p>
              </div>
            ) : (
              <>
                <div style={{ padding: '20px 30px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ color: 'var(--doc-primary)', fontSize: '2.5rem' }}>
                    <FaUserCircle />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontWeight: '800' }}>{selectedChat.userId.userFullname}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#4caf50', fontWeight: '700' }}>● Online Consulting</span>
                  </div>
                </div>

                <div style={{ flex: 1, padding: '30px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      style={{
                        alignSelf: msg.senderRole === "doctor" ? "flex-end" : "flex-start",
                        maxWidth: '70%',
                        padding: '12px 18px',
                        borderRadius: msg.senderRole === "doctor" ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                        background: msg.senderRole === "doctor" ? 'var(--doc-primary)' : 'white',
                        color: msg.senderRole === "doctor" ? 'white' : 'var(--doc-text)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        fontSize: '0.95rem',
                        lineHeight: '1.5',
                        fontWeight: '500'
                      }}
                    >
                      {msg.message}
                      <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '5px', textAlign: 'right' }}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '25px 30px', background: 'white', borderTop: '1px solid #e2e8f0' }}>
                  <div style={{ position: 'relative', display: 'flex', gap: '15px' }}>
                    <input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your medical advice..."
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      style={{
                        flex: 1,
                        padding: '15px 25px',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        outline: 'none',
                        background: '#f8fafc',
                        fontSize: '0.95rem'
                      }}
                    />
                    <motion.button
                      onClick={sendMessage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '0 25px',
                        borderRadius: '16px',
                        background: 'var(--doc-primary)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: '700'
                      }}
                    >
                      Send <FaPaperPlane />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default DoctorChatPage;
