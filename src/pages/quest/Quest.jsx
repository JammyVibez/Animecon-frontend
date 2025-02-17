import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./quest.css"

export default function Quest() {
    return (
        <>
            <Topbar />
            <div className="quest">
                <Sidebar />
                <div className="questRight">
                    <main className="quest-page">
                        <h1 className="page-title">Daily Anime Quests</h1>
                        <div className="quest-list">
                            <div className="quest-card">
                                <h2>Post Your Fisrt Anime post</h2>
                                <span className="reward">Reward: get a chance to win a Clueless gift and Join the discord community for your reward</span>
                                <button className="btn claim-btn">Claim Reward</button>
                            </div>
                            {/* <div className="quest-card">
                                <h2>Complete a Season</h2>
                                <span className="reward">Reward: 500 XP</span>
                                <button className="btn claim-btn">Claim Reward</button>
                            </div> */}
                        </div>
                    </main>

                </div>
            </div>

        </>

    );
}