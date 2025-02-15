import React, { useState, useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import "./setting.css"

const SettingsPage = () => {
  const API = process.env.REACT_APP_API_URL;
  const { user, setUser } = useContext(AuthContext); 
  const [userData, setUserData] = useState(user);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = user._id;


    const handleLogout = () => {
      localStorage.removeItem("user"); // Remove user data
      setUser(null); // Reset context
      window.location.href = "/login"; // Redirect to login page
    };


    const handleDeleteAccount = async () => {
      const confirmDelete = window.confirm("Are you sure you want to delete your account?");
      if (!confirmDelete) return;
  
      try {
        const response = await fetch(`http://localhost:3001/delete-account/${user._id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          alert("Account deleted successfully.");
          localStorage.removeItem("user");
          setUser(null);
          window.location.href = "/register";
        } else {
          alert("Failed to delete account.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    };
  


  // Handle text input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleFileChange = (e, type) => {
    if (type === 'profilePicture') setProfilePicture(e.target.files[0]);
    if (type === 'coverPicture') setCoverPicture(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userId = user._id;
      let updatedUser = { ...userData };
  
      // Update profile picture
      if (profilePicture) {
        const formData = new FormData();
        formData.append("profilePicture", profilePicture);

        const response = await axios.put(
          `${API}/api/users/update-profilePicture/${userId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        updatedUser = response.data;
      }

      // Upload cover picture if selected
      if (coverPicture) {
        const formData = new FormData();
        formData.append("coverPicture", coverPicture);

        const response = await axios.put(
          `${API}/api/users/update-coverPicture/${userId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        updatedUser = response.data;
      }


      // Update other fields
      const response = await axios.put(`${API}/api/users/${userId}`, userData);
      setUserData(response.data);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  

  return (
   <>
    <Topbar />
    <div className="settings-container">
       <Sidebar />
      <div className="settingRight">
      <div className="card">
        <h1 className="title">Settings</h1>
        <form onSubmit={handleSubmit} className="settings-form">
          {/* Username */}
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Bio */}
          <div className="form-group">
            <label>Bio:</label>
            <textarea
              name="desc"
              value={userData.desc}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            ></textarea>
          </div>

          {/* Favorite Genres */}
          <div className="form-group">
            <label>Favorite Genres:</label>
            <input
              type="text"
              name="favoriteGenres"
              value={userData.favoriteGenres}
              onChange={handleChange}
              placeholder="e.g., Sci-fi, Adventure"
            />
          </div>

          {/* Profile Picture */}
          <div className="form-group file-upload">
            <label>Profile Picture:</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "profilePicture")}
            />
          </div>

          {/* Cover Picture */}
          <div className="form-group file-upload">
            <label>Cover Picture:</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "coverPicture")}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Leave empty to keep current password"
              onChange={handleChange}
            />
          </div>

 <button type="submit" className="btn-setting">
                {loading ? "Saving..." : "Save Changes"}
              </button>
      
          </form>

          <button onClick={handleLogout}>Logout</button>;
          <button onClick={handleDeleteAccount}>Delete Account</button>;
      </div>
    </div>
      </div>

    </>
  );
};

export default SettingsPage;





