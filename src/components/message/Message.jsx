import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  const isImage = (url) => /\.(jpeg|jpg|gif|png)$/i.test(url);
  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt="User Avatar"
        />
        {isImage(message.text) ? (
          <img className="messageMedia" src={message.text} alt="Message Content" />
        ) : isVideo(message.text) ? (
          <video className="messageMedia" controls>
            <source src={message.text} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="messageText">{message.text}</p>
        )}
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
