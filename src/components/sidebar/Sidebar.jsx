import { useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "../../dummyData";
import Friend from "../friend/Friend";
import {
  Menu, Close, QuestionAnswer, Settings, RssFeed, Article, ShortText, Cached, HelpOutline, Event, ConnectedTv, WorkOutline, Group, WatchLater,
} from "@mui/icons-material";
import "./sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebarWrapper">
        {/* Toggle Button */}
        {/* <button className="sidebarToggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Close /> : <Menu />}
        </button> */}

        <ul className="sidebarList">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          </Link>
          <Link to="/admin-update-page" style={{ color: "inherit", textDecoration: "none" }}>
          <li className="sidebarListItem">
            <Cached className="sidebarIcon" />
            <span className="sidebarListItemText">Updates</span>
          </li>
          </Link>
          <Link to="/animecon-event" style={{ color: "inherit", textDecoration: "none" }}>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          </Link>
          <Link to="/animecon-jobs" style={{ color: "inherit", textDecoration: "none" }}>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          </Link>
          <Link to="/quest" style={{ color: "inherit", textDecoration: "none" }}>
          <li className="sidebarListItem">
            <QuestionAnswer className="sidebarIcon" />
            <span className="sidebarListItemText">Quest</span>
          </li>
          </Link>
          <Link to="/animecon-news" style={{ color: "inherit", textDecoration: "none" }}>
          <li className="sidebarListItem">
            <Article className="sidebarIcon" />
            <span className="sidebarListItemText">News</span>
          </li>
          </Link>
          <Link to="/find" style={{ color: "inherit", textDecoration: "none" }}>
          <li className="sidebarListItem">
            <ShortText className="sidebarIcon" />
            <span className="sidebarListItemText">Stories</span>
          </li>
          </Link>
          <Link to="/Question" style={{ color: "inherit", textDecoration: "none" }}>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Question</span>
          </li>
          </Link>
          <Link to={"/redirect-to=website"}>
            <li className="sidebarListItem">
              <ConnectedTv className="sidebarIcon" />
              <span className="sidebarListItemText">Unime-stream</span>
            </li>
          </Link>
          <Link to="/community" style={{ color: "inherit", textDecoration: "none" }}>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Community</span>
          </li>
          </Link>
          <Link to="/settings" style={{ color: "inherit", textDecoration: "none" }}>
          <li className="sidebarListItem">
            <Settings className="sidebarIcon" />
            <span className="sidebarListItemText">Settings</span>
          </li>
          </Link>
        </ul>

        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <Friend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
