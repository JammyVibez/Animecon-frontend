import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { PermMedia, EmojiEmotions } from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const socket = useRef();
  const { user } = useContext(AuthContext); // Using user from AuthContext
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        image: data.image || null,
        video: data.video || null,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (!user || !user._id) return;

    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings?.filter((f) => users.some((u) => u.userId === f)) || []
      );
    });
  }, [user]);

  useEffect(() => {
    if (!user || !user._id) return;

    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat) return;
      try {
        const res = await axios.get("/messages/" + currentChat._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentChat) {
      console.log("No chat selected.");
      return;
    }

    const formData = new FormData();
    formData.append("sender", user._id);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat._id);
    if (file) {
      formData.append("file", file);
    }

    const receiverId = currentChat.members.find((member) => member !== user._id);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
      setFile(null);
      setEmojiPickerVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <Conversation
                key={c._id}
                conversation={c}
                currentUser={user}
                newMessages={newMessages} // Pass the state
                setNewMessages={setNewMessages} // Pass the updater function
                setCurrentChat={setCurrentChat}
              />
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <label htmlFor="file" className="chatFileInput">
                    <PermMedia htmlColor="tomato" className="shareIcon" />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      accept=".png,.jpeg,.jpg,.mp4,.webm"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="emoji" onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}>
                    {emojiPickerVisible ? "X" : <EmojiEmotions />}
                  </button>
                  {emojiPickerVisible && <EmojiPicker onEmojiClick={handleEmojiClick} />}
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">Open a conversation to start a chat.</span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
              socket={socket}
            />
          </div>
        </div>
      </div>
    </>
  );
}
