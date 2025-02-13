import "./online.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";


export default function Online({ onlineUsers, currentId,}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

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

  return (
    <li className="rightbarFriend">
      {onlineFriends.length === 0 ? (
        <p>No friends online</p>
      ) : (
        onlineFriends.map((o) => (
          <div>
            <div className="rightbarProfileImgContainer">
              <img
                src={PF + (o?.profilePicture || "assets/profilepic.jpeg")}
                alt=""
                className="rightbarProfileImg"
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{o?.username}</span>
          </div>
        ))
      )}
    </li>
  );
}
