import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;


export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [followed, setFollowed] = useState(
    currentUser?.following?.includes(user?._id) || false
  );

 

  // Update `followed` state when `currentUser` or `user` changes
  useEffect(() => {
    setFollowed(currentUser?.following?.includes(user?._id) || false);
  }, [currentUser.following, user?._id]);

  // Fetch user's friends
  useEffect(() => {
    if (user?._id) {
      const getFriends = async () => {
        try {
          const res = await axios.get(`${API}/api/users/friends/${user._id}`);
          setFriends(res.data);
        } catch (err) {
          console.error("Failed to fetch friends:", err);
        }
      };
      getFriends();
    }
  }, [user]);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
      <div className="homeRightBar">
        <div className="postUserContainer">
          <Link to="/ads">
    <img className="postUserImg" src="/assets/icons/star.png" alt="" />
   </Link>
          <span className="postUserText">
            <b>App Updates</b> New features every week stay tuned AnimeCon loves
            you
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ads/attachment.jpg" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
            <Online key={user._id} user={user} />
        </ul>
      </div>
      </div>
    </div>
  );
}
