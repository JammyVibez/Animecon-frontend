import "./event.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";


export default function Event() {
    return (
        <>
            <Topbar />
            <div className="event">
                <Sidebar />
                <div className="eventRight">
                    <div className="event-page">
                        <h2 className="event-title">Upcoming Evenets</h2>
                        <div className="event-container">
                            <div className="event-card">
                                <img src="" alt="" className="event-image" />
                                <div className="event-info">
                                    <h3 className="event-name">Anime Convertion 2024</h3>
                                    <p className="event-date">Date: January 20, 2025</p>
                                    <p className="event-time">Time: 10:00 AM - 5:00 PM</p>
                                    <p className="event-location">Location: Tokyo, Japan</p>
                                    <p className="event-description">Join us for an Exciting day filled with anime, cosplay, and esclusive merch!</p>
                                    <div className="event-actions">
                                        <button className="btn join-event">Join Event</button>
                                        <button className="btn learn-more">Learn More</button>
                                    </div>
                                </div>
                            </div>
                            <div className="event-card">
                                <img src="" alt="" className="event-image" />

                                <div className="event-info">
                                    <h3 className="event-name">Cosplay Competition</h3>
                                    <p className="event-date">Date: January 20, 2025</p>
                                    <p className="event-time">Time: 10:00 AM - 5:00 PM</p>
                                    <p className="event-location">Location: Tokyo, Japan</p>
                                    <p className="event-description">Join us for an Exciting day filled with anime, cosplay, and esclusive merch!</p>
                                    <div className="event-actions">
                                        <button className="btn join-event">Join Event</button>
                                        <button className="btn learn-more">Learn More</button>
                                    </div>
                                </div>
                            </div>
                            <div className="event-card">
                                <img src="" alt="" className="event-image" />

                                <div className="event-info">
                                    <h3 className="event-name">Cosplay Competition</h3>
                                    <p className="event-date">Date: January 20, 2025</p>
                                    <p className="event-time">Time: 10:00 AM - 5:00 PM</p>
                                    <p className="event-location">Location: Tokyo, Japan</p>
                                    <p className="event-description">Join us for an Exciting day filled with anime, cosplay, and esclusive merch!</p>
                                    <div className="event-actions">
                                        <button className="btn join-event">Join Event</button>
                                        <button className="btn learn-more">Learn More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>

    );
}