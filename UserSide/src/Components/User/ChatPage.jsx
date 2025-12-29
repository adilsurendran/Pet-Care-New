// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./ChatPage.css";

// // const ChatPage = () => {
// //   const userId = localStorage.getItem("user");

// //   const [chats, setChats] = useState([]);
// //   const [selectedChat, setSelectedChat] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [newMessage, setNewMessage] = useState("");

// //   // -----------------------------
// //   // Fetch chat list (RIGHT SIDE)
// //   // -----------------------------
// //   useEffect(() => {
// //     fetchChats();
// //   }, []);

// //   const fetchChats = async () => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:5000/api/chat/list/${userId}`
// //       );
// //       setChats(res.data);
// //     } catch (err) {
// //       console.error("Fetch chats error:", err);
// //     }
// //   };

// //   // -----------------------------
// //   // Open chat & load messages
// //   // -----------------------------
// //   const openChat = async (chat) => {
// //     setSelectedChat(chat);
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:5000/api/chat/messages/${chat._id}`
// //       );
// //       setMessages(res.data);
// //     } catch (err) {
// //       console.error("Fetch messages error:", err);
// //     }
// //   };

// //   // -----------------------------
// //   // Send message
// //   // -----------------------------
// //   const sendMessage = async () => {
// //     if (!newMessage.trim()) return;

// //     try {
// //       const res = await axios.post(
// //         "http://localhost:5000/api/chat/message",
// //         {
// //           chatId: selectedChat._id,
// //           senderRole: "user",
// //           message: newMessage,
// //         }
// //       );

// //       setMessages([...messages, res.data]);
// //       setNewMessage("");
// //       fetchChats(); // update last message ordering
// //     } catch (err) {
// //       console.error("Send message error:", err);
// //     }
// //   };

// //   return (
// //     <div className="chat-container">
// //       <div className="row h-100">

// //         {/* ================= Left SIDE (CHAT LIST) ================= */}
// //         <div className="col-4 chat-right">
// //           <h4 className="chat-list-title">Chats</h4>

// //           {chats.map((chat) => (
// //             <div
// //               key={chat._id}
// //               className="chat-card"
// //               onClick={() => openChat(chat)}
// //             >
// //               <h6>{chat.doctorId.doctorName}</h6>
// //               <small>{chat.doctorId.doctorQualification}</small>
// //               <p>{chat.lastMessage || "No messages yet"}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* ================= Right SIDE (CHAT WINDOW) ================= */}
// //         <div className="col-8 chat-left">
// //           {!selectedChat ? (
// //             <div className="chat-placeholder">
// //               <h1>PetCare</h1>
// //               <p>Select a chat to start conversation</p>
// //             </div>
// //           ) : (
// //             <>
// //               {/* Header */}
// //               <div className="chat-header">
// //                 <h5>{selectedChat.doctorId.doctorName}</h5>
// //                 <small>{selectedChat.doctorId.doctorQualification}</small>
// //               </div>

// //               {/* Messages */}
// //               <div className="chat-messages">
// //                 {messages.map((msg) => (
// //                   <div
// //                     key={msg._id}
// //                     className={
// //                       msg.senderRole === "buyer"
// //                         ? "message right"
// //                         : "message left"
// //                     }
// //                   >
// //                     {msg.message}
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Input */}
// //               <div className="chat-input">
// //                 <input
// //                   type="text"
// //                   placeholder="Type a message..."
// //                   value={newMessage}
// //                   onChange={(e) => setNewMessage(e.target.value)}
// //                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// //                 />
// //                 <button onClick={sendMessage}>Send</button>
// //               </div>
// //             </>
// //           )}
// //         </div>

        

// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatPage;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./ChatPage.css";

// const ChatPage = () => {
//   const { doctorLoginId } = useParams(); // 🔹 from URL (optional)
//   const userId = localStorage.getItem("user"); // ✅ User table ID

//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   // ----------------------------------
//   // INITIAL LOAD
//   // ----------------------------------
//   useEffect(() => {
//     if (!userId) return;

//     if (doctorLoginId) {
//       createOrOpenChat();
//     } else {
//       fetchChats();
//     }
//   }, [doctorLoginId]);

//   // ----------------------------------
//   // Create or get chat (AUTO)
//   // ----------------------------------
//   const createOrOpenChat = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/chat", {
//         userId,
//         doctorLoginId,
//       });

//       const chat = res.data;

//       await fetchChats(chat._id);
//       openChat(chat);
//     } catch (err) {
//       console.error("Create/Get chat error:", err);
//     }
//   };

//   // ----------------------------------
//   // Fetch chat list
//   // ----------------------------------
//   const fetchChats = async (openChatId = null) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/chat/list/${userId}`
//       );
//       setChats(res.data);

//       if (openChatId) {
//         const found = res.data.find(c => c._id === openChatId);
//         if (found) openChat(found);
//       }
//     } catch (err) {
//       console.error("Fetch chats error:", err);
//     }
//   };

//   // ----------------------------------
//   // Open chat
//   // ----------------------------------
//   const openChat = async (chat) => {
//     setSelectedChat(chat);

//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/chat/messages/${chat._id}`
//       );
//       setMessages(res.data);
//     } catch (err) {
//       console.error("Fetch messages error:", err);
//     }
//   };

//   // ----------------------------------
//   // Send message
//   // ----------------------------------
//   const sendMessage = async () => {
//     if (!newMessage.trim() || !selectedChat) return;

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/chat/message",
//         {
//           chatId: selectedChat._id,
//           senderRole: "user",
//           message: newMessage,
//         }
//       );

//       setMessages(prev => [...prev, res.data]);
//       setNewMessage("");
//       fetchChats();
//     } catch (err) {
//       console.error("Send message error:", err);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="row h-100">

//         {/* ============ CHAT LIST (RIGHT col-4) ============ */}
//         <div className="col-4 chat-right">
//           <h4 className="chat-list-title">Chats</h4>

//           {chats.map(chat => (
//             <div
//               key={chat._id}
//               className="chat-card"
//               onClick={() => openChat(chat)}
//             >
//               <h6>{chat.doctorId.doctorName}</h6>
//               <small>{chat.doctorId.doctorQualification}</small>
//               <p>{chat.lastMessage || "No messages yet"}</p>
//             </div>
//           ))}
//         </div>

//         {/* ============ CHAT WINDOW (LEFT col-8) ============ */}
//         <div className="col-8 chat-left">
//           {!selectedChat ? (
//             <div className="chat-placeholder">
//               <h1>PetCare</h1>
//               <p>Select a chat to start conversation</p>
//             </div>
//           ) : (
//             <>
//               <div className="chat-header">
//                 <h5>{selectedChat.doctorId.doctorName}</h5>
//                 <small>{selectedChat.doctorId.doctorQualification}</small>
//               </div>

//               <div className="chat-messages">
//                 {messages.map(msg => (
//                   <div
//                     key={msg._id}
//                     className={
//                       msg.senderRole === "user"
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
//                   type="text"
//                   placeholder="Type a message..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
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

// export default ChatPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ChatPage.css";

const ChatPage = () => {
  const { doctorLoginId } = useParams();
  const userId = localStorage.getItem("user"); // ✅ FIXED
// console.log("userId (User table):", userId);
// console.log("doctorLoginId:", doctorLoginId);

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // -------------------------------
  // INITIAL LOAD
  // -------------------------------
  useEffect(() => {
    if (!userId) {
      console.error("UserId missing in localStorage");
      return;
    }

    if (doctorLoginId) {
      initChatWithDoctor();
    } else {
      fetchChats();
    }
  }, [doctorLoginId, userId]);

  // -------------------------------
  // CREATE OR GET CHAT
  // -------------------------------
//   const initChatWithDoctor = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/chat", {
//         userId,
//         doctorLoginId,
//       });

//       const chat = res.data;

//       await fetchChats(chat._id);
//       await openChat(chat);
//     } catch (err) {
//       console.error("initChatWithDoctor error:", err);
//     }
//   };
const initChatWithDoctor = async () => {
  try {
    // 1️⃣ Create or get chat (unpopulated)
    const res = await axios.post("http://localhost:5000/api/chat", {
      userId,
      doctorLoginId,
    });

    const chatId = res.data._id;

    // 2️⃣ Fetch populated chat list
    const listRes = await axios.get(
      `http://localhost:5000/api/chat/list/${userId}`
    );

    setChats(listRes.data);

    // 3️⃣ Find populated chat & open it
    const populatedChat = listRes.data.find(
      (c) => c._id === chatId
    );

    if (populatedChat) {
      openChat(populatedChat);
    }

  } catch (err) {
    console.error("initChatWithDoctor error:", err);
  }
};


  // -------------------------------
  // FETCH CHAT LIST
  // -------------------------------
  const fetchChats = async (openChatId = null) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/list/${userId}`
      );

      setChats(res.data);

      if (openChatId) {
        const found = res.data.find((c) => c._id === openChatId);
        if (found) openChat(found);
      }
    } catch (err) {
      console.error("fetchChats error:", err);
    }
  };

  // -------------------------------
  // OPEN CHAT
  // -------------------------------
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

  // -------------------------------
  // SEND MESSAGE
  // -------------------------------
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat/message",
        {
          chatId: selectedChat._id,
          senderRole: "user",
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
    <div className="chat-container">
      <div className="row h-100">

        {/* CHAT LIST */}
        <div className="col-4 chat-right">
          <h4 className="chat-list-title">Chats</h4>

          {chats.map((chat) => (
            <div
              key={chat._id}
              className="chat-card"
              onClick={() => openChat(chat)}
            >
              <h6>{chat.doctorId.doctorName}</h6>
              <small>{chat.doctorId.doctorQualification}</small>
              <p>{chat.lastMessage || "No messages yet"}</p>
            </div>
          ))}
        </div>

        {/* CHAT WINDOW */}
        <div className="col-8 chat-left">
          {!selectedChat ? (
            <div className="chat-placeholder">
              <h1>PetCare</h1>
              <p>Select a chat to start conversation</p>
            </div>
          ) : (
            <>
              <div className="chat-header">
                <h5>{selectedChat.doctorId.doctorName}</h5>
                <small>{selectedChat.doctorId.doctorQualification}</small>
              </div>

              <div className="chat-messages">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={
                      msg.senderRole === "user"
                        ? "message right"
                        : "message left"
                    }
                  >
                    {msg.message}
                  </div>
                ))}
              </div>

              <div className="chat-input">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default ChatPage;
