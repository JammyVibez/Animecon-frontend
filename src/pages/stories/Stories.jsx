import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./stories.css"

export default function Stories() {
    return (
        <>
            <Topbar />
            <div className="storie">
                <Sidebar />
                <div className="storieRight">
                    <main className="stories-page">
                        <h1 className="page-title">Stories</h1>
                        <div className="stories-container">
                          
                            <div className="story-card add-story">
                                <div className="story-circle">
                                    <img src="assets/post/2.jpg" alt="" />
                                </div>
                                <p className="story-label">Your Story</p>
                            </div>

                           
                            <div className="story-card">
                                <div className="story-circle">
                                <img src="assets/post/5.jpg" alt="" />
                                </div>
                                <p className="story-label">OtakuSam</p>
                            </div>

                            <div className="story-card">
                                <div className="story-circle">
                                <img src="assets/post/3.jpg" alt="" />
                                </div>
                                <p className="story-label">AnimeQueen</p>
                            </div>

                            <div className="story-card">
                                <div className="story-circle">
                                <img src="assets/post/4.jpg" alt="" />
                                </div>
                                <p className="story-label">ChibiMaster</p>
                            </div>

                          
                        </div>


                        <section className="communities-section">
                            <h2 className="section-title">Commuunties Recommendation</h2>
                            <div className="community-grid">
                                <div className="community-card">
                                    <img src="assets/5.jpg" alt="" />
                                        <h3>Shonen Fans</h3>
                                        <p>Join discussions about Naruto, One Piece, and more!</p>
                                        <button className="btn join-btn">Join Community</button>
                                </div>
                                <div className="community-card">
                                    <img src="assets/7.jpg" alt="" />
                                        <h3>Isekai Universe</h3>
                                        <p>Explore new worlds with fellow fans of Isekai anime.</p>
                                        <button className="btn join-btn">Join Community</button>
                                </div>
                            </div>
                        </section>
                    </main>



                </div>
            </div>

        </>

    );
}