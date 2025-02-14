

import "./topbar.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Search, Person, Chat, Notifications, Brightness4, Brightness7 } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const API = process.env.REACT_APP_API_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setShowResults(false);
      return;
    }
    try {
      const res = await fetch(`${API}/api/search?q=${e.target.value}`);
      const data = await res.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">AnimeCon</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className={`searchbar ${isExpanded ? "expanded" : ""}`}>
          <Search className="searchIcon" onClick={() => setIsExpanded(!isExpanded)} />
          <input
            placeholder="Search for friend, post or anime-content"
            className="searchInput"
            value={searchQuery}
            onChange={handleSearch}
            onBlur={() => setIsExpanded(false)} 
          />
          {showResults && (
            <div className="searchResults">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <Link to={`/profile/${result.username}`} key={result.id} className="searchResultItem">
                    {result.username}
                  </Link>
                ))
              ) : (
                <p className="searchResultItem">No results found</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={`topbarRight ${isExpanded ? "hide" : ""}`}>
          <span onClick={toggleTheme} className="themeToggleBtn">
            {theme === "light" ? <Brightness4 /> : <Brightness7 />}
          </span>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Link to="/find" style={{ color: "inherit", textDecoration: "none" }}>
              <Person />
            </Link>
            <span className="topbarIconBadge"></span>
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger" style={{ color: "inherit", textDecoration: "none" }}>
              <Chat />
            </Link>
            <span className="topbarIconBadge"></span>
          </div>
          <Link to="/notifications" style={{ color: "inherit", textDecoration: "none" }}>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge"></span>
          </div>
          </Link>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : "/assets/profilepic.jpg"
            }
            alt="Profile"
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
