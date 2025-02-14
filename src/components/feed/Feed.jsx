import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Feed({ username }) {
  const API = process.env.REACT_APP_API_URL;
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [bgColor, setBgColor] = useState(generateRandomColor());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        if (!/^#[0-9A-F]{6}$/i.test(bgColor)) {
          setBgColor(generateRandomColor());
        }

        const postUrl = username
          ? `${API}/api/posts/profile/${username}?page=${page}`
          : `${API}/api/posts/timeline/${user?._id}?page=${page}`;

        const [res, randomRes] = await Promise.all([
          axios.get(postUrl, { headers: { "Cache-Control": "no-cache" } }),
          axios.get(`${API}/api/posts/random`, { headers: { "Cache-Control": "no-cache" } }),
        ]);

        console.log("API Response:", res.data);
        console.log("Random Post Response:", randomRes.data);

        if (Array.isArray(res.data)) {
          const allPosts = [...posts, ...res.data];

          // Add a random post if available
          if (Array.isArray(randomRes.data) && randomRes.data.length > 0) {
            allPosts.push(...randomRes.data);
          }

          // Remove duplicates based on `_id`
          const uniquePosts = Array.from(new Map(allPosts.map((p) => [p._id, p])).values());

          // Sort posts by `createdAt`
          setPosts(uniquePosts.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)));

          // If no new posts were added, stop loading more
          setHasMore(res.data.length > 0);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [username, user?._id, page]);

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user?.username) && <Share />}
        
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((p, index) => (
            <Post
              key={p._id}
              post={p}
              bgColor={bgColor}
              onLoadMore={index === posts.length - 1 ? loadMorePosts : null}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}

        {loading && <p>Loading more posts...</p>}
        {!hasMore && <p>No more posts to load.</p>}
      </div>
    </div>
  );
}



// import { useContext, useEffect, useState } from "react";
// import Post from "../post/Post";
// import Share from "../share/Share";
// import "./feed.css";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";

// function generateRandomColor() {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

// export default function Feed({ username }) {
//   const [posts, setPosts] = useState([]);
//   const { user } = useContext(AuthContext);
//   const [bgColor, setBgColor] = useState(generateRandomColor());

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         if (!/^#[0-9A-F]{6}$/i.test(bgColor)) {
//           setBgColor(generateRandomColor());
//         }

//         const res = username
//           ? await axios.get(`/posts/profile/${username}`)
//           : await axios.get(`/posts/timeline/${user._id}`);

//         console.log("API Response:", res.data); // Debugging step
        
//         // Ensure res.data is an array before sorting
//         if (Array.isArray(res.data)) {
//           const uniquePosts = Array.from(new Map(res.data.map((p) => [p._id, p])).values());
//           setPosts(uniquePosts.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)));
//         }        
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//         setPosts([]); // Handle API failure gracefully
//       }
//     };

//     fetchPosts();
//   }, [username, user._id, bgColor]);

//   return (
//     <div className="feed">
//       <div className="feedWrapper">
//         {(!username || username === user.username) && <Share />}
//         {posts.length > 0 ? (
//           posts.map((p) => <Post key={p._id} post={p} bgColor={bgColor} />)
//         ) : (
//           <p>No posts available</p>
//         )}
//       </div>
//     </div>
//   );
// }





