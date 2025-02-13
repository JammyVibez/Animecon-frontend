import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { ThumbUp, Comment } from "@mui/icons-material"
import "./update.css"

export default function Update() {
    return (
        <>
            <Topbar />
            <div className="update">
                <Sidebar />
                <div className="updateRight">
                    <main class="updates-page">
                        <h1 className="page-title">Latest Admin Updates</h1>

                        <div className="updates-container">

                            <div className="update-card">
                                <h2 className="update-title">New Episode Alert: My Hero Academia</h2>
                                <p className="update-content">
                                    The latest episode of "My Hero Academia" is now live! Don’t miss out on the action-packed adventure.
                                </p>
                                <div className="media-container">
                                    <img src="assets/4.jpg" alt="" />
                                </div>
                                <div className="update-footer">
                                    <span className="timestamp">Posted 2 hours ago</span>
                                    <div className="interactions">
                                        <button className="like-btn"><ThumbUp /> 2.5K</button>
                                        <button className="comment-btn"><Comment /> 350</button>
                                    </div>
                                </div>
                            </div>


                            <div className="update-card">
                                <h2 className="update-title">Attack on Titan Finale</h2>
                                <p className="update-content">
                                    The grand finale of "Attack on Titan" airs tomorrow! Get ready for an epic conclusion.
                                </p>
                                <div className="media-container">
                                    <video controls>
                                        <source src="aot-finale.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <div className="update-footer">
                                    <span className="timestamp">Posted 5 hours ago</span>
                                    <div className="interactions">
                                        <button className="like-btn"><ThumbUp /> 4K</button>
                                        <button className="comment-btn"><Comment /> 800</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>



            </div>

        </>

    );
}