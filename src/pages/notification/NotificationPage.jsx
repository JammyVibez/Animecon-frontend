import { useState, useEffect } from "react";
import "./notificatioPage.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

const dummyNotifications = [
  { id: 1, title: "Welcome!", message: "Thanks for joining us!" },
  { id: 2, title: "New Update", message: "Check out our latest features." },
  {
    id: 3,
    title: "Reminder",
    message: "Don't forget to complete your profile!"
  }
];

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    setNotifications([dummyNotifications[0]]);

    const interval = setInterval(() => {
      const randomNotification =
        dummyNotifications[
          Math.floor(Math.random() * dummyNotifications.length)
        ];
      setNotifications((prev) => [...prev, randomNotification]);
    }, 5 * 24 * 60 * 60 * 1000); // Every 5 days

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Topbar />
      <div className="notify">
        <Sidebar />
        <div className="notificationRight">
          <div className="notification-container">
            <h1 className="notification-title">Notifications</h1>
            <div className="notification-list">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="notification-card"
                  onClick={() => setSelectedNotification(notif)}
                >
                  <h2>{notif.title}</h2>
                  <p>Tap to view details</p>
                </div>
              ))}
            </div>

            {selectedNotification && (
              <div className="notification-modal">
                <div className="notification-modal-content">
                  <h2>{selectedNotification.title}</h2>
                  <p>{selectedNotification.message}</p>
                  <button onClick={() => setSelectedNotification(null)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
