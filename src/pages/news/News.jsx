import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./news.css"

export default function News() {
    return (
        <>
            <Topbar />
            <div className="news">
                <Sidebar />
                <div className="newsRight">
                    <main className="news-page">
                        <h1 className="page-title">Latest Anime News</h1>
                        <section className="news-container">
                            <div className="news-card">
                               <img src="assets/post/4.jpg" alt="" />
                                    <div className="news-content">
                                        <h3 className="news-title">Attack on Titan Final Season Release Date Announced!</h3>
                                        <p className="news-snippet">The long-awaited finale of Attack on Titan is set to air next month...</p>
                                        <button className="btn read-more">Read More</button>
                                    </div>
                            </div>
                            <div className="news-card">
                                 <img src="assets/post/5.jpg" alt="" />
                                    <div className="news-content">
                                        <h3 className="news-title">One Piece Live-Action Season 2 Confirmed</h3>
                                        <p className="news-snippet">Fans of the Straw Hat crew rejoice as Netflix confirms the second season...</p>
                                        <button className="btn read-more">Read More</button>
                                    </div>
                            </div>
                        </section>
                    </main>

                </div>
            </div>

        </>

    );
}