import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./addfriend.css";

export default function Addfriend() {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [visibleFollowers, setVisibleFollowers] = useState(5);
    const [visibleFollowing, setVisibleFollowing] = useState(5);
    const [visibleSuggested, setVisibleSuggested] = useState(5);
    const { user } = useContext(AuthContext);
    const userId = user?._id;

    useEffect(() => {
        const fetchFollowersAndFollowing = async () => {
            if (!userId) return;
            try {
                const followersRes = await axios.get(`/users/${userId}/followers`);
                const followingRes = await axios.get(`/users/${userId}/following`);
                const suggestedRes = await axios.get(`/users/suggested/${userId}`);
                setFollowers(followersRes.data);
                setFollowing(followingRes.data);
                setSuggestedUsers(suggestedRes.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchFollowersAndFollowing();
    }, [userId]);

    const handleFollow = async (id) => {
        try {
            await axios.put(`/users/${id}/follow`, { userId });
            setSuggestedUsers((prev) => prev.filter((user) => user._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleUnfollow = async (id) => {
        try {
            await axios.put(`/users/${id}/unfollow`, { userId });
            setFollowing((prev) => prev.filter((user) => user._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    // const viewProfile = (user) => {
    //     window.location.href = `/profile/${user.username}`;
    // };

    const handleViewMore = (type) => {
        if (type === "followers") {
            setVisibleFollowers((prev) => prev + 5);
        } else if (type === "following") {
            setVisibleFollowing((prev) => prev + 5);
        } else if (type === "suggested") {
            setVisibleSuggested((prev) => prev + 5);
        }
    };

    return (
        <>
            <Topbar />
            <div className="addfriend">
                <Sidebar />
                <div className="addfriendRight">
                    <main className="add-friend-page">
                        <h2 className="page-title">Add New Friends</h2>

                        <div className="friend-list">
                            {suggestedUsers.slice(0, visibleSuggested).map((user) => (
                                <div key={user._id} className="friend-card">
                                    <img
                                        src={user.profilePicture || "/assets/profilepic.jpg"}
                                        className="profile-pic"
                                        alt={user.username}
                                    />
                                    <div className="friend-info">
                                        <h2 className="friend-name">{user.username}</h2>
                                        <p className="friend-bio">{user.desc || "No bio available"}</p>
                                        <span className="profileLevel">
                                            <strong>Level:</strong>
                                            <span className="profileInfoFriend">{user.level || "N/A"}</span>
                                        </span>
                                        <span className="profileRank">
                                            <strong>Rank:</strong>
                                            <span className="profileInfoFriend">{user.rank || "N/A"}</span>
                                        </span>
                                        <span className="profileFollower">
                                            <strong>Followers:</strong>
                                            <span className="profileInfoFriend">
                                                {user.followers?.length || 0}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="friend-actions">
                                        <button className="btn add-btn" onClick={() => handleFollow(user._id)}>
                                            Follow
                                        </button>
                                        <Link to={`/profile/${user.username}`}>
                                            <button className="btn view-btn" >
                                                View Profile
                                            </button>

                                        </Link>

                                        {/* <button className="btn view-btn" onClick={() => viewProfile(user.username)}>
                                            View Profile
                                        </button> */}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => handleViewMore("suggested")} className="view-more-btn">View More</button>

                        <hr />

                        <div className="friendWhoFollowedYou">
                            <h2 className="noText">Users Who Followed You</h2>
                            <div className="friend-list">
                                {followers.slice(0, visibleFollowers).map((user) => (
                                    <div key={user._id} className="friend-card">
                                        <img
                                            src={user.profilePicture || "/assets/profilepic.jpg"}
                                            className="profile-pic"
                                            alt={user.username}
                                        />
                                        <div className="friend-info">
                                            <h2 className="friend-name">{user.username}</h2>
                                            <p className="friend-bio">{user.desc || "No bio available"}</p>
                                        </div>
                                        <div className="friend-actions">
                                            <button className="btn add-btn" onClick={() => handleFollow(user._id)}>
                                                Follow Back
                                            </button>
                                            <Link to={`/profile/${user.username}`}>
                                                <button className="btn view-btn" >
                                                    View Profile
                                                </button>
                                            </Link>

                                            {/* <button className="btn view-btn" onClick={() => viewProfile(user._id)}>
                                                View Profile
                                            </button> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => handleViewMore("followers")} className="view-more-btn">View More</button>

                        <hr />

                        <div className="friendWhoFollowedYou">
                            <h2 className="noText">Users You Are Following</h2>
                            <div className="friend-list">
                                {following.slice(0, visibleFollowing).map((user) => (
                                    <div key={user._id} className="friend-card">
                                        <img
                                            src={user.profilePicture || "/assets/profilepic.jpgjpg"}
                                            className="profile-pic"
                                            alt={user.username}
                                        />
                                        <div className="friend-info">
                                            <h2 className="friend-name">{user.username}</h2>
                                            <p className="friend-bio">{user.desc || "No bio available"}</p>
                                        </div>
                                        <div className="friend-actions">
                                            <button className="btn add-btn" onClick={() => handleUnfollow(user._id)}>
                                                Unfollow
                                            </button>
                                            <Link to={`/profile/${user.username}`}>
                                                <button className="btn view-btn" >
                                                    View Profile
                                                </button>
                                            </Link>

                                            {/* <button className="btn view-btn" onClick={() => viewProfile(user._id)}>
                                                View Profile
                                            </button> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => handleViewMore("following")} className="view-more-btn">View More</button>
                    </main>
                </div>
            </div>
        </>
    );
}
