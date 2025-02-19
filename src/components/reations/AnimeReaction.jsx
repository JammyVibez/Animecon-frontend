import { useState, useEffect } from "react";
import anime from "animejs";
import axios from "axios";
import { Sparkles, HeartHandshake, Angry, Laugh } from "lucide-react";
import "./AnimeReactions.css";

const reactions = [
  { id: "sugoi", icon: <Sparkles size={24} />, color: "#ff6b6b", text: "Sugoi! 😍" },
  { id: "yamete", icon: <HeartHandshake size={24} />, color: "#ffa502", text: "Yamete! 😱" },
  { id: "baka", icon: <Angry size={24} />, color: "#ff4757", text: "Baka! 🤬" },
  { id: "uwu", icon: <Laugh size={24} />, color: "#70a1ff", text: "UwU! 😊" },
];

const AnimeReactions = ({ post, currentUser, onReactionUpdate }) => {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showReactions, setShowReactions] = useState(false);
  const [like, setLike] = useState(post?.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [reactionCounts, setReactionCounts] = useState({});
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!post || !Array.isArray(post.likes)) return; // Ensure post and likes exist
  
    const userLike = post.likes?.find((like) => like.userId === currentUser?._id);
    setIsLiked(!!userLike);
    setSelectedReaction(userLike ? reactions.find((r) => r.id === userLike.reaction) : null);
  
    // Aggregate reaction counts
    const counts = reactions.reduce((acc, reaction) => {
      acc[reaction.id] = post.likes?.filter((like) => like.reaction === reaction.id).length || 0;
      return acc;
    }, {});
  
    setReactionCounts(counts);
  }, [currentUser?._id, post?.likes]);
  

  const handleReaction = async (reaction) => {
    try {
      await axios.put(`${API}/api/posts/${post._id}/like`, {
        userId: currentUser._id,
        reaction: reaction.id,
      });

      anime({
        targets: ".reaction-text",
        scale: [0, 1.2, 1],
        opacity: [0, 1],
        duration: 600,
        easing: "easeOutElastic",
      });

      setSelectedReaction((prev) => (prev?.id === reaction.id ? null : reaction));
      setLike((prev) => (isLiked && selectedReaction?.id === reaction.id ? prev - 1 : prev + 1));
      setIsLiked((prev) => !prev);
      onReactionUpdate(reaction.id);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return (
    <div className="reaction-container">
      <div
        className="like-button-container"
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setTimeout(() => setShowReactions(false), 500)}
      >
        <button
          className="like-button"
          style={{ color: selectedReaction?.color || "#666" }}
          onClick={() => selectedReaction && handleReaction(selectedReaction)}
        >
          {selectedReaction?.icon || <Sparkles size={24} />}
          <span>{selectedReaction?.text || "React"}</span>
          <span className="postLikeCounter">{like}</span>
        </button>

        {showReactions && (
          <div className="reaction-popup" onMouseEnter={() => setShowReactions(true)}>
            {reactions.map((reaction) => (
              <button
                key={reaction.id}
                onClick={() => handleReaction(reaction)}
                style={{ backgroundColor: reaction.color }}
                className="reaction-popup-button"
              >
                {reaction.icon}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedReaction && (
        <p className="reaction-text" style={{ color: selectedReaction.color }}>
          {selectedReaction.text}
        </p>
      )}

      <div className="reaction-summary">
        {reactions.map(
          (reaction) =>
            reactionCounts[reaction.id] > 0 && (
              <span key={reaction.id} className="reaction-count">
                {reaction.icon} {reactionCounts[reaction.id]}
              </span>
            )
        )}
      </div>
    </div>
  );
};

export default AnimeReactions;
