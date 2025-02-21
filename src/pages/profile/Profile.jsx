import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import ProfileRightbar from "../../components/profileRightbar/ProfileRightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const API = process.env.REACT_APP_API_URL;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API}/api/users?username=${username}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [username]);

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage("");
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || "/assets/coverpic.jpg"}
                alt="Cover"
                onClick={() => openModal(user.coverPicture || "/assets/coverpic.jpg")}
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || "/assets/profilepic.jpg"}
                alt="Profile"
                onClick={() => openModal(user.profilePicture || "/assets/profilepic.jpg")}
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <div className="tagname">@{user.rankTag}</div>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
            <div className="profileDetail">
              <ProfileRightbar user={user} />
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
          </div>
        </div>
      </div>

      {/* Modal for Image Preview */}
      {modalOpen && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent">
            <img src={modalImage} alt="Preview" />
          </div>
        </div>
      )}
    </>
  );
}
