import "./reels.css";
import { MoreVert, Comment, Bookmark, Star, Share, Favorite } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import EmojiPicker from "emoji-picker-react";

export default function Reel({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [ratingVisible, setRatingVisible] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [averageRating, setAverageRating] = useState(post.rating || 0);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mediaPopupVisible, setMediaPopupVisible] = useState(false);
  const [isSharing, setIsSharing] = useState(false);


  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // Check if the current user already liked the post
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);


  const handleShare = async () => {
    if (navigator.share) {
      try {
        // Disable share button or flag sharing in progress
        setIsSharing(true);
  
        await navigator.share({
          title: "Post",
          text: "Check out this post!",
          url: window.location.href,
        });
  
        console.log("Content shared successfully!");
      } catch (err) {
        console.error("Error sharing content:", err);
      } finally {
        // Re-enable share button or reset sharing flag
        setIsSharing(false);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };
  


  // Fetch the post owner information
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users`, { params: { userId: post.userId } });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [post.userId]);

  

  const likeHandler = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, { data: { userId: currentUser._id } });
      alert("Post deleted successfully");
      window.location.reload();
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    }
  };


  const handleSavePost = () => {
    if (post.media) {
      const link = document.createElement("a");
      link.href = post.media;
      link.download = post.media.split("/").pop();
      link.click();
    } else {
      alert("No media to download");
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/posts/${post._id}/comment`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  fetchComments();

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Please write a comment!");
      return;
    }
    try {
      const res = await axios.post(`/posts/${post._id}/comment`, {
        userId: currentUser._id,
        text: newComment,
      });
      setComments([...comments, res.data]);
      setNewComment("");
      setEmojiPickerVisible(false);
    } catch (err) {
      alert("Failed to add comment. Please try again.");
      console.error(err);
    }
  };

  const handleCommentLike = async (commentId, likes, index) => {
    try {
      // Ensure likes is always an array
      if (!Array.isArray(likes)) {
        likes = []; // Initialize as an empty array if it's undefined
      }

      const userId = currentUser._id;
      const hasLiked = likes.includes(userId);  // Check if the user has already liked the comment

      // Toggle like status
      if (hasLiked) {
        // Remove like if already liked
        likes = likes.filter(like => like !== userId);
      } else {
        // Add like if not liked yet
        likes.push(userId);
      }

      // Update likes in the database
      const res = await axios.put(`/posts/${post._id}/comment/${commentId}/like`, {
        userId: currentUser._id,
      });

      // Update the local state with the new likes
      const updatedComments = [...comments];
      updatedComments[index].likes = likes; // Update the likes field for the current comment
      setComments(updatedComments);

    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };


  const handleRatingSubmit = async (rating) => {
    try {
      const res = await axios.put(`/posts/${post._id}/rate`, {
        userId: currentUser._id,
        rating,
      });
      setAverageRating(res.data.averageRating);
      setCurrentRating(rating);
      setRatingVisible(false); // Close the popup after submitting
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewComment((prev) => prev + emojiObject.emoji);
  };

  const toggleMediaPopup = () => {
    setMediaPopupVisible(!mediaPopupVisible);
  };

   // Toggle dropdown visibility
   const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Hide dropdown when clicking outside
  const handleOutsideClick = (e) => {
    if (!e.target.closest(".postTopRight")) {
      setDropdownVisible(false);
    }
  };

  // Add event listener for clicks outside dropdown
  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownVisible]);



  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture ? PF + user.profilePicture : PF + "/noProfile.jpg"}
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username || "Unknown"}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
      <MoreVert onClick={toggleDropdown} />
      {dropdownVisible && (
        <div className="dropdownMenu">
          <span onClick={handleDeletePost}>Delete</span>
          <span onClick={() => navigate("/report")}>Report</span>
          <span onClick={handleSavePost}>Save</span>
        </div>
      )}
    </div>
        </div>
      </div>
      <div className="postCenter" onClick={toggleMediaPopup}>
        {/* Display post description */}
        <span className="postText">{post?.desc}</span>

        {/* Display hashtags for location and genre */}
        <div className="postHashtags">
          {post?.location && <span className="hashtag">#{post.location}</span>}
          {post?.genre && <span className="hashtag">#{post.genre}</span>}
        </div>

        {/* Check if post.media exists and handle rendering */}
        {post?.media ? (
          typeof post.media === 'string' ? (
            <>
              {/* Display Image */}
              {/\.(jpg|png|jpeg)$/i.test(post.media) && (
                <div className="postMedia">
                  <img
                    className="postImg"
                    src={post.media}
                    alt="Post media"
                    loading="lazy"
                  />
                  <div className="watermark">
                    {user?.username || "User"} | AnimeCon
                  </div>
                </div>
              )}

              {/* Display Video */}
              {/\.(mp4|webm)$/i.test(post.media) && (
                <div className="postMedia">
                  <video className="postVideo" controls>
                    <source src={post.media} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="watermark">
                    {user?.username || "User"} | AnimeCon
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>Unsupported media format.</p>
          )
        ) : (
          <p style={{ fontStyle: "italic", color: "gray", fontSize: "14px" }}>
            This post doesn't have any attached media.
          </p>

        )}
      </div>
      {mediaPopupVisible && (
        <div className="mediaPopup" onClick={toggleMediaPopup}>
          <div className="mediaContent">
            {post.media && (
              /\.(jpg|jpeg|png)$/i.test(post.media) ? (
                <img className="popupImg" src={post.media} alt="Post media" />
              ) : (
                <video className="popupVideo" controls>
                  <source src={post.media} type="video/mp4" />
                </video>
              )
            )}
          </div>
        </div>
      )}


      <div className="postBottom">
        <div className="postBottomLeft">
          {/* <img className="likeIcon" src={`${<Heart/>}`} onClick={likeHandler} alt="" /> */}
          <Favorite className="likeIcon" onClick={likeHandler} />
          <span className="postLikeCounter">{like}</span>
        </div>
        <div className="postBottomRight">
          <Comment onClick={() => setCommentsVisible(!commentsVisible)} />
          <span className="postCommentText">{comments.length} comments</span>
          <Bookmark />
          <Star onClick={() => setRatingVisible(true)} />
          <Share
  onClick={() => {
    if (!isSharing) handleShare();
  }}
/>

        </div>
      </div>
      {commentsVisible && (
        <div className="commentsSection">
          {comments.map((c, index) => (
            <div key={c._id} className="comment">
              {/* Link to the commenter's profile */}
              <Link to={`profile/${c.username}`}>
                <img
                  className="commentPostProfileImg"
                  src={c.profilePicture ? PF + c.profilePicture : PF + "/noProfile.jpg"}
                  alt={`${c.username}'s profile`}
                />
              </Link>
              <span className="commentUser">{c.username}:</span>
              <span className="commentText">{c.text}</span>
              <div className="commentActions">
                <img
                  className="likeIcon"
                  src={`${PF}/icons/heart.png`}
                  onClick={() => handleCommentLike(c._id, c.likes, index)}
                  alt="Like"
                />
                <span>{(c.likes && Array.isArray(c.likes)) ? c.likes.length : 0}</span>
                <span className="commentDate">{format(c.createdAt)}</span>
              </div>
            </div>
          ))}
          <textarea
            className="commentInput"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment... 😊"
          ></textarea>
          <button onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}>
            {emojiPickerVisible ? "Close Emoji Picker" : "Add Emoji"}
          </button>
          {emojiPickerVisible && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          <button onClick={handleAddComment}>Post</button>
        </div>
      )}

      {/* Popup Modal for Rating */}
      {ratingVisible && (
        <div className="ratingModal" onClick={() => setRatingVisible(false)}>
          <div className="ratingPopup" onClick={(e) => e.stopPropagation()}>
            <h3>Rate this post</h3>
            {[1, 2, 3, 4, 5].map((rate) => (
              <span
                key={rate}
                className={`ratingStar ${currentRating >= rate ? "active" : ""}`}
                onClick={() => handleRatingSubmit(rate)}
              >
                ★
              </span>
            ))}
            <span>Average Rating: {averageRating.toFixed(1)}</span>
          </div>
        </div>
      )}
    </div>
  );

}
