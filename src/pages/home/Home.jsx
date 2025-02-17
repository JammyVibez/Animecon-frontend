import { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";

export default function Home() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const lastShownTime = localStorage.getItem("lastModalTime");
        const currentTime = new Date().getTime();
        const twoHours = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

        // Show modal if it has never been shown or if 2 hours have passed
        if (!lastShownTime || currentTime - lastShownTime > twoHours) {
            setShowModal(true);
            localStorage.setItem("lastModalTime", currentTime); // Update last shown time
        }
    }, []);

    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <h2 className="modal-title">🚧 Site Under Development! 🚧</h2>
                        <p className="modal-description">
                            This site is still under development. If you notice any bugs or have suggestions, 
                            please join our Discord community and let us know!
                        </p>
                        <a href="https://discord.com" className="modal-discord" target="_blank" rel="noopener noreferrer">
                            Join Discord
                        </a>
                        <button className="modal-close" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}
