// import axios from "axios";
// import { useEffect, useState, useContext } from "react";
// import "./chatonline.css";
// import { SocketContext } from "../../context/SocketContext";

// export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
//   const [friends, setFriends] = useState([]);
//   const [onlineFriends, setOnlineFriends] = useState([]);
//   const [newMessages, setNewMessages] = useState({});
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const socket = useContext(SocketContext);

//   useEffect(() => {
//     const getFriends = async () => {
//       try {
//         const res = await axios.get(`/users/friends/${currentId}`);
//         setFriends(res.data);
//         console.log("Fetched Friends:", res.data);
//       } catch (err) {
//         console.error("Error fetching friends:", err);
//       }
//     };

//     if (currentId) getFriends();
//   }, [currentId]);

//   useEffect(() => {
//     const onlineUserIds = onlineUsers.map((user) => user._id || user);
//     console.log("Online User IDs:", onlineUserIds);
    
//     setOnlineFriends(
//       friends.filter((friend) => onlineUserIds.includes(friend._id))
//     );
    
//   }, [friends, onlineUsers]);

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = ({ senderId }) => {
//       setNewMessages((prev) => ({
//         ...prev,
//         [senderId]: (prev[senderId] || 0) + 1,
//       }));
//     };

//     socket.on("newMessageNotification", handleNewMessage);

//     return () => {
//       socket.off("newMessageNotification", handleNewMessage);
//     };
//   }, [socket]);

//   const handleClick = async (user) => {
//     try {
//       const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
//       setCurrentChat(res.data);

//       // Reset unread message count for this user
//       setNewMessages((prev) => {
//         const updated = { ...prev };
//         delete updated[user._id];
//         return updated;
//       });
//     } catch (err) {
//       console.error("Error fetching conversation:", err);
//     }
//   };

//   return (
//     <div className="chatOnline">
//       {onlineFriends.length === 0 ? (
//         <p>No friends online</p>
//       ) : (
//         onlineFriends.map((o) => (
//           <div
//             key={o._id}
//             className="chatOnlineFriend"
//             onClick={() => handleClick(o)}
//           >
//             <div className="chatOnlineImgContainer">
//               <img
//                 className="chatOnlineImg"
//                 src={PF + (o?.profilePicture || "assets/profilepic.jpeg")}

//                 alt=""
//               />
//               <div className="chatOnlineBadge"></div>
//             </div>
//             <span className="chatOnlineName">{o?.username}</span>
//             {newMessages[o._id] && (
//               <span className="chatOnlineNewMessageBadge">
//                 {newMessages[o._id]}
//               </span>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "./chatonline.css";
import { SocketContext } from "../../context/SocketContext";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [newMessages, setNewMessages] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const socket = useContext(SocketContext);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`/users/friends/${currentId}`);
        setFriends(res.data);
        console.log("Fetched Friends:", res.data);
      } catch (err) {
        console.error("Error fetching friends:", err);
      }
    };

    if (currentId) getFriends();
  }, [currentId]);

  useEffect(() => {
    if (!socket) return;

    const updateOnlineUsers = (users) => {
      console.log("Received online users from socket:", users);
      setOnlineFriends(friends.filter((f) => users.includes(f._id)));
    };

    socket.on("getOnlineUsers", updateOnlineUsers);

    return () => socket.off("getOnlineUsers", updateOnlineUsers);
  }, [socket, friends]);

  useEffect(() => {
    if (socket && currentId) {
      socket.emit("userOnline", currentId);
    }
  }, [socket, currentId]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user?._id}`);
      setCurrentChat(res.data);

      // Reset unread message count for this user
      setNewMessages((prev) => {
        const updated = { ...prev };
        delete updated[user?._id];
        return updated;
      });
    } catch (err) {
      console.error("Error fetching conversation:", err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.length === 0 ? (
        <p>No friends online</p>
      ) : (
        onlineFriends.map((o) => (
          <div
            key={o._id}
            className="chatOnlineFriend"
            onClick={() => handleClick(o)}
          >
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={PF + (o?.profilePicture || "assets/profilepic.jpeg")}
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o?.username}</span>
          </div>
        ))
      )}
    </div>
  );
}

