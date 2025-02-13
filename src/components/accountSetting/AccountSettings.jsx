// AccountSettings.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../context/AuthContext";

const AccountSettings = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);
  const { user } = useContext(AuthContext);

  const handleUpdateUsername = async () => {
    if (!username) {
      toast.error('Username cannot be empty.');
      return;
    }

    try {
      await axios.put('/update-username', {
        userId: user.id,
        username,
      });
      toast.success('Username updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update username.');
    }
  };

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      await axios.put('/update-password', {
        userId: user.id,
        password,
      });
      toast.success('Password updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update password.');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirmed) return;

    try {
      setDeletingAccount(true);
      await axios.delete(`/delete-account/${user.id}`);
      toast.success('Account deleted successfully.');
      // Implement logout or redirection logic here
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete account.');
    } finally {
      setDeletingAccount(false);
    }
  };

  return (
    <div className="account-settings">
      <h2>Account Settings</h2>

      <div className="account-section">
        <label>Update Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter new username"
        />
        <button onClick={handleUpdateUsername}>Update Username</button>
      </div>

      <div className="account-section">
        <label>Update Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
        />
        <button onClick={handleUpdatePassword}>Update Password</button>
      </div>

      <div className="account-section">
        <button className="delete-account" onClick={handleDeleteAccount} disabled={deletingAccount}>
          {deletingAccount ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
