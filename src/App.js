import { useEffect } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { SocketProvider } from "./context/SocketContext";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/messenger/Messenger";
import Addfriend from "./pages/addFriend/Addfriend";
import Setting from "./pages/setting/Setting";
import Reel from "./pages/reels/Reels";
import Community from "./pages/community/CommunityLandin";
import Notification from "./pages/notpage/NotificationPage";
import Quest from "./pages/quest/Quest";
import  Update from "./pages/update/Update";
import Events from "./pages/event/Event";
import News from "./pages/news/News";
import Stories from "./pages/stories/Stories";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext); // Retrieve user from context

  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          {/* Default route */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

          {/* Auth routes */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

          {/* Protected routes */}
          <Route path="/messenger" element={user ? <Messenger /> : <Navigate to="/login" />} />
          <Route path="/find" element={user ? <Addfriend /> : <Navigate to="/login" />} />
          <Route path="/settings" element={user ? <Setting /> : <Navigate to="/login" />} />
          <Route path="/reels-feed" element={user ? <Reel /> : <Navigate to="/login" />} />
          <Route path="/community" element={user ? <Community /> : <Navigate to="/login" />} />
          <Route path="/redirect-to=website" element={user ? <RedirectToWebsite /> : <Navigate to="/login" />} />
          <Route path="/admin-update-page" element={user ? <Update /> : <Navigate to="/login" />} />
          <Route path="/animecon-event" element={user ? <Events /> : <Navigate to="/login" />} />
          <Route path="/animecon-news" element={user ? <News /> : <Navigate to="/login" />} />
          <Route path="/stories" element={user ? <Stories /> : <Navigate to="/login" />} />
          <Route path="/quest" element={user ? <Quest /> : <Navigate to="/login" />} />
          <Route path="/profile/:username" element={user ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

function RedirectToWebsite() {
  useEffect(() => {
    window.location.href = "http://localhost:3000/";
  }, []);

  return null;
}

export default App;
