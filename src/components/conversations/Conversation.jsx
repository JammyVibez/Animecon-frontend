import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser, newMessages, setNewMessages, setCurrentChat }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation?.members?.find((m) => m !== currentUser?._id); // Safe access

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    if (friendId) getUser(); // Only fetch if friendId exists
  }, [currentUser, conversation]);

  const handleConversationClick = () => {
    if (conversation) {
      const friendId = conversation.members.find((m) => m !== currentUser?._id);
      setNewMessages((prev) => {
        const updated = { ...prev };
        if (friendId) delete updated[friendId]; // Clear badge only if friendId exists
        return updated;
      });
      setCurrentChat(conversation); // Open conversation
    }
  };

  return (
    <div className="conversation" onClick={handleConversationClick}>
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "noProfile.jpg"
        }
        alt=""
      />
      <span className="conversationName">{user?.username || "Unknown User"}</span>
      {user?._id && newMessages?.[user._id] && (
        <span className="conversationNewMessageBadge">
          {newMessages[user._id]}
        </span>
      )}
    </div>
  );
}
