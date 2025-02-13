import React from "react";
import { motion } from "framer-motion";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Stars } from "@react-three/drei";
import { FaDiscord } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";
import { MdOutlineUpdate } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import Countdown from "../../components/CountDown"; 
import FloatingOrb from "../../components/FloatingOrb"; // 3D effect
import Topbar from "../../components/topbar/Topbar";
import "./communtiy.css";

const CommunityLandingPage = () => {
  return (
<>

   <Topbar />
    <div className="community-container">
      {/* 3D Background
      {typeof window !== "undefined" && (
  <Canvas
    className="canvas-background"
    gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
  >
    <Stars />
    <FloatingOrb />
    <OrbitControls enableZoom={false} />
  </Canvas>
)} */}



      {/* Main Content */}
      <motion.h1
        className="community-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Join the Ultimate Anime Community!
      </motion.h1>

      <motion.p className="community-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Connect with fellow anime fans, participate in discussions, and get exclusive updates.
        Join our Discord community today and be among the first to experience our upcoming 
        In-App Community** packed with incredible features!
      </motion.p>

      <div className="community-grid">
        <motion.div className="community-card" whileHover={{ scale: 1.05 }}>
          <h2 className="card-title">
            <FaDiscord className="icon" /> Discord Community Features
          </h2>
          <ul className="card-list">
            <li>🌟 Real-time anime discussions</li>
            <li>🎙️ Exclusive voice chat events</li>
            <li>📰 Latest anime news & updates</li>
            <li>📢 Special announcements & giveaways</li>
            <li>💬 Dedicated channels for your favorite genres</li>
            <li>👥 Users Created channels, Community, Forums. </li>
          </ul>
        </motion.div>

        <motion.div className="community-card" whileHover={{ scale: 1.05 }}>
          <h2 className="card-title">
            <GiLaurelsTrophy className="icon" /> Upcoming In-App Community Features
          </h2>
          <ul className="card-list">
            <li>🚀 Create & Join Custom Communities</li>
            <li>🏆 Earn Badges & Achievements</li>
            <li>📌 Thread-based anime discussions</li>
            <li>🔥 Trending topics & discussion ranking</li>
            <li>🔔 Instant notifications for replies & mentions</li>
            <li>🎭 Anime-styled profile customization</li>
            <li>🎭 In-App Community Leaderboard</li>
          </ul>
        </motion.div>
      </div>

      <motion.div className="countdown-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="countdown-title">
          <MdOutlineUpdate className="icon" /> In-App Community Launch Countdown
        </h2>
        <Countdown targetDate="2025-03-01T00:00:00" />

      </motion.div>

      {/* Buttons with 3D Hover Effects */}
      <motion.div className="buttons-container">
        <motion.button
          className="discord-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.open("https://discord.gg/nwdsUp6B", "_blank")}
        >
          <FaDiscord className="button-icon" /> Join Discord
        </motion.button>
        <motion.button
          className="register-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.open("/register", "_blank")}
        >
          <FiUsers className="button-icon" /> Register as a Developer
        </motion.button>
      </motion.div>
    </div>
    </>
  );
};


export default CommunityLandingPage;
