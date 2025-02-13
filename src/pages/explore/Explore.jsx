import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./explore.css"

export default function Explore() {
    return (
        <>
            <Topbar />
            <div className="explore">
                <Sidebar />
                <div className="exploreRight">
                    <main className="explore-page">
                        <h1 className="page-title">Explore Anime World</h1>


                        <section className="communities-section">
                            <h2 className="section-title">Discover Communities</h2>
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

                       
                        <section className="recommendations-section">
                            <h2 className="section-title">Anime Recommendations</h2>
                            <div className="anime-recommendations">
                                <div className="anime-card">
                                     <img src="assets/6.jpg" alt="" />
                                        <h3>Spirited Away</h3>
                                        <p>A beautiful journey into the spirit world.</p>
                                        <button className="btn watch-btn">Watch Now</button>
                                </div>
                                <div className="anime-card">
                                    <img src="assets/3.jpg" alt="" />
                                        <h3>Your Name</h3>
                                        <p>A heartwarming tale of love and destiny.</p>
                                        <button className="btn watch-btn">Watch Now</button>
                                </div>
                            </div>
                        </section>

                      
                        <section className="events-section">
                            <h2 className="section-title">Featured Events</h2>
                            <div className="event-card">
                                <h3>Anime Expo 2024</h3>
                                <p>Join the biggest anime event of the year. July 15-18, Tokyo Dome.</p>
                                <button className="btn event-btn">Learn More</button>
                            </div>
                        </section>

                       
                        <section className="trending-topics">
                            <h2 className="section-title">Trending Topics</h2>
                            <ul className="topics-list">
                                <li>#DemonSlayerSeason3</li>
                                <li>#AnimeOfTheYear</li>
                                <li>#IsekaiAdventures</li>
                                <li>#GhibliMagic</li>
                            </ul>
                        </section>
                    </main>

                </div>
            </div>

        </>

    );
}