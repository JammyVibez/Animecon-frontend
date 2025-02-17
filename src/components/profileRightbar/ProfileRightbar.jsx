import "./UserInfo.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ProfileRightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const API = process.env.REACT_APP_API_URL;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [followed, setFollowed] = useState(
    currentUser?.following?.includes(user?._id) || false
  );
  const [activeSection, setActiveSection] = useState("info");

  const handleStartChat = async () => {
    try {
      const res = await axios.get(`${API}/api/conversations/${user?._id}`);
      const existingConversation = res.data.find((c) =>
        c.members.includes(user?._id)
      );

      if (existingConversation) {
        navigate(`/messenger?conversationId=${existingConversation._id}`);
      } else {
        const newConversation = await axios.post("/conversations", {
          senderId: currentUser._id,
          receiverId: user?._id
        });
        navigate(`/messenger?conversationId=${newConversation.data._id}`);
      }
    } catch (err) {
      console.error("Error starting conversation:", err);
    }
  };

  useEffect(() => {
    setFollowed(currentUser?.following?.includes(user?._id) || false);
  }, [currentUser.following, user?._id]);

  useEffect(() => {
    if (user?._id) {
      const getFriends = async () => {
        try {
          const res = await axios.get(`${API}/api/users/friends/${user?._id}`);
          setFriends(res.data);
        } catch (err) {
          console.error("Failed to fetch friends:", err);
        }
      };
      getFriends();
    }
  }, [user]);

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(`${API}/api/users/${user?._id}/unfollow`, {
          userId: currentUser._id
        });
        dispatch({ type: "UNFOLLOW", payload: user?._id});
      } else {
        await axios.put(`${API}/api/users/${user?._id}/follow`, {
          userId: currentUser._id
        });
        dispatch({ type: "FOLLOW", payload: user?._id});
      }
      setFollowed(!followed);
    } catch (err) {
      console.error("Failed to update follow status:", err);
    }
  };

  return (
    
    <div className="rightbar">
      <div className="rightbarWrapper">
         <div className="flipButtons">
          <span 
            className={`flipButton ${activeSection === "info" ? "active" : ""}`}
            onClick={() => setActiveSection("info")}
          >
            User Info
          </span>
          <span
            className={`flipButton ${activeSection === "friends" ? "active" : ""}`}
            onClick={() => setActiveSection("friends")}
          >
            User Friends
          </span>
        </div>
    
       

        <div className="rightbarContent">
          {activeSection === "info" && (
            <div className="rightbarMobile">
              <h4 className="rightbarTitle">User Information</h4>
              <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                  <strong>Followers:</strong> {user?.followers?.length || 0}
                </div>
                <div className="rightbarInfoItem">
                  <strong>Following:</strong> {user?.following?.length || 0}
                </div>
                <div className="rightbarInfoItem">
                  <strong>Level:</strong> {user?.level || "N/A"}
                </div>
                <div className="rightbarInfoItem">
                  <strong>Rank:</strong> {user?.rank || "N/A"}
                </div>
                <div className="rightbarInfoItem">
                  <strong>Favourite Genres:</strong> {user?.favoriteGenres?.length > 0 ? user.favoriteGenres.join(", ") : "None"}
                </div>
              </div>
            </div>
          )}

          {activeSection === "friends" && (
            <div className="rightbarMobile">
              <h4 className="rightbarTitle">User Friends</h4>
              <div className="rightbarFollowings">
                {friends.map((friend, index) => (
                  <Link
                    to={`/profile/${friend.username}`}
                    key={friend._id || index}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="rightbarFollowing">
                      <img
                        src={friend.profilePicture ? PF + friend.profilePicture : PF + "noProfile.jpg"}
                        className="rightbarFollowingImg"
                        alt={friend.username}
                      />
                      <span className="rightbarFollowingName">{friend.username}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        {user?.username && user.username !== currentUser?.username && (
          <button className="messageButton" onClick={handleStartChat}>
            Chat
          </button>
        )}

        {user?.username && user.username !== currentUser?.username && (
          <button className="rightbarFollowButton" onClick={followHandler}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
      </div>
    </div>
  );
}
