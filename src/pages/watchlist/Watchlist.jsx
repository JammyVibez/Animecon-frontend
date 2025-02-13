import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./watchlist.css"

export default function Watchlist() {
    return (
        <>
            <Topbar />
            <div className="watch">
                <Sidebar />
                <div className="watchRight">
                    <main className="watchlist-page">
                        <h1 className="page-title">My Watchlist</h1>
                        <div className="anime-grid">
                            <div className="anime-card">
                                <img src="assets/6.jpg" alt="" />
                                    <h2>Demon Slayer</h2>
                                    <span>Status: Watching</span>
                            </div>
                            <div className="anime-card">
                                <img src="assets/6.jpg" alt="" />
                                    <h2>One Piece</h2>
                                    <span>Status: Plan to Watch</span>
                            </div>
                            <div className="anime-card">
                                <img src="assets/6.jpg" alt="" />
                                    <h2>Attack on Titan</h2>
                                    <span>Status: Completed</span>
                            </div>
                        </div>
                    </main>



                </div>

            </div>

        </>

    );
}