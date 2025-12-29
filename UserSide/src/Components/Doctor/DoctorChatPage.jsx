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
import "../User/ChatPage.css";

const DoctorChatPage = () => {
  const doctorLoginId = localStorage.getItem("userId");

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // -------------------------------
  // INITIAL LOAD
  // -------------------------------
  useEffect(() => {
    if (!doctorLoginId) {
      console.error("DoctorLoginId missing in localStorage");
      return;
    }

    fetchChats();
  }, [doctorLoginId]);

  // -------------------------------
  // FETCH CHAT LIST
  // -------------------------------
  const fetchChats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/doctor/list/${doctorLoginId}`
      );
      console.log(res);
      
      setChats(res.data);
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
    <div className="chat-container">
      <div className="row h-100">

        {/* CHAT LIST */}
        <div className="col-4 chat-right">
          <h4 className="chat-list-title">Patients</h4>

          {chats.map((chat) => (
            <div
              key={chat._id}
              className="chat-card"
              onClick={() => openChat(chat)}
            >
              <h6>{chat.userId.userFullname}</h6>
              <p>{chat.lastMessage || "No messages yet"}</p>
            </div>
          ))}
        </div>

        {/* CHAT WINDOW */}
        <div className="col-8 chat-left">
          {!selectedChat ? (
            <div className="chat-placeholder">
              <h1>PetCare</h1>
              <p>Select a patient to start conversation</p>
            </div>
          ) : (
            <>
              <div className="chat-header">
                <h5>{selectedChat.userId.userFullname}</h5>
              </div>

              <div className="chat-messages">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={
                      msg.senderRole === "doctor"
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

export default DoctorChatPage;
