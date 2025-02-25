import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ xp, level }) => {
  const xpNeeded = level * 100; // Example threshold
  const progress = (xp / xpNeeded) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
