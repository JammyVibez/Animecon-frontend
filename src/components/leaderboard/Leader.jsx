import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users/top')
      .then(response => setUsers(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Top Anime Fans</h2>
      <ul>
        {users.map((user, index) => (
          <li key={user?._id}>
            <span className="rank-index">{index + 1}.</span>
            <img src={user.profilePicture} alt="User Avatar" className="leaderboard-avatar" />
            <span className="username">{user.username}</span>
            <span className="level">Level {user.level} ({user.rankTag})</span>
            <div className="badges">
              {user.badges.map((badge, index) => (
                <img key={index} src={badge} alt="User Badge" className="badge-icon" />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
