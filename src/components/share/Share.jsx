// import "./share.css";
// import {
//   PermMedia,
//   Label,
//   Room,
//   Cancel,
//   LocalMovies,
// } from "@mui/icons-material";
// import { useContext, useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";


// export default function Share() {
//   const { user } = useContext(AuthContext);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const desc = useRef();
//   const [file, setFile] = useState(null);
//   const [isReviewModalOpen, setReviewModalOpen] = useState(false);
//   const [isLocationModalOpen, setLocationModalOpen] = useState(false);
//   const [isGenreModalOpen, setGenreModalOpen] = useState(false);
//   const [location, setLocation] = useState("");
//   const [genre, setGenre] = useState("");

//   const locations = ["Tokyo", "Paris", "New York", "Kyoto", "London"];
//   const genres = ["Action", "Romance", "Fantasy", "Comedy"];

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     // Step 1: Create FormData to include all fields
//     const data = new FormData();
//     data.append("userId", user._id); // Add userId
//     data.append("desc", desc.current.value); // Add description
//     data.append("location", location); // Add location
//     data.append("genre", genre); // Add genre
  
//     // Attach file if it exists
//     if (file) {
//       data.append("file", file);
//     }
  
//     try {
//       // Step 2: Make a single POST request to create the post
//       const res = await axios.post("/posts", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
  
//       // Step 3: Reset the form
//       setFile(null); // Clear the file input
//       desc.current.value = ""; // Clear the description
//       setLocation(""); // Clear the location state
//       setGenre(""); // Clear the genre state
//       setReviewModalOpen(false); // Close the modal if applicable
//       // Optional: Reload or navigate to refresh the post display
//       window.location.reload();
//     } catch (err) {
//       console.error("Error in post submission:", err);
  
//       // Optional: Display an error message to the user
//       alert("Failed to submit the post. Please try again.");
//     }
//   };
  

//   // const submitHandler = async (e) => {
//   //   e.preventDefault();
//   //   const newPost = {
//   //     userId: user._id,
//   //     desc: desc.current.value,
//   //     location,
//   //     genre,
//   //   };
  

//   //   try {
//   //     // Step 1: Upload the file if it exists
//   //     if (file) {
//   //       const data = new FormData();
//   //       data.append("file", file); // Attach the file
//   //       const uploadRes = await axios.post("/posts", data); // Upload file to Cloudinary
//   //       newPost.media = uploadRes.data.url; // Save the Cloudinary URL in the post
//   //     }
  
//   //     // Step 2: Create a new post
//   //     await axios.post("/posts", newPost);
  
//   //     // Step 3: Reset the form
//   //     setFile(null); // Clear the file input
//   //     desc.current.value = ""; // Clear the description
//   //     setLocation(""); // Clear the location state
//   //     setGenre(""); // Clear the genre state
//   //     setReviewModalOpen(false); // Close the modal if applicable
  
//   //     // Optional: Reload or navigate to refresh the post display
//   //     window.location.reload();
//   //   } catch (err) {
//   //     console.error("Error in post submission:", err);
  
//   //     // Optional: Display an error message to the user
//   //     alert("Failed to submit the post. Please try again.");
//   //   }
//   // };

 

  
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setReviewModalOpen(true);
//   };

//   const closeModal = () => {
//     setFile(null);
//     setReviewModalOpen(false);
//   };

//   return (
//     <div className="share">
//       <div className="shareWrapper">
//         <div className="shareTop">
//           <img
//             className="shareProfileImg"
//             src={
//               user.profilePicture
//                 ? PF + user.profilePicture
//                 :   "/assets/profilepic.jpg"
//             }
//             alt=""
//           />
//           <textarea
//             placeholder={`Write a description, ${user.username}!`}
//             className="shareInput"
//             ref={desc}
//           />
//         </div>
//         <div className="shareDetails">
//           {location && <span className="hashtag">#{location}</span>}
//           {genre && <span className="hashtag">#{genre}</span>}
//         </div>
//         <hr className="shareHr" />
//         <form className="shareBottom" onSubmit={submitHandler}>
//           <div className="shareOptions">
//             <label htmlFor="file" className="shareOption">
//               <PermMedia htmlColor="tomato" className="shareIcon" />
//               <span className="shareOptionText">Photo/Video</span>
//               <input
//                 style={{ display: "none" }}
//                 type="file"
//                 id="file"
//                 accept=".png,.jpeg,.jpg,.mp4,.webm"
//                 onChange={handleFileChange}
//               />
//             </label>
//             <div
//               className="shareOption"
//               onClick={() => setLocationModalOpen(true)}
//             >
//               <Room htmlColor="green" className="shareIcon" />
//               <span className="shareOptionText">Location</span>
//             </div>
//             <div
//               className="shareOption"
//               onClick={() => setGenreModalOpen(true)}
//             >
//               <LocalMovies htmlColor="purple" className="shareIcon" />
//               <span className="shareOptionText">Genre</span>
//             </div>
//           </div>
//           <button className="shareButton" type="submit">
//             Post
//           </button>
//         </form>
//       </div>

    //   {/* Review Modal */}
    //   {isReviewModalOpen && (
    //     <div className="modal">
    //       <div className="modalContent">
    //         <h3>Review Your Post</h3>
    //         {file && (
    //           <div className="modalPreview">
    //             {file.type.startsWith("image/") ? (
    //               <img
    //                 src={URL.createObjectURL(file)}
    //                 alt="Preview"
    //                 className="modalImage"
    //               />
    //             ) : (
    //               <video
    //                 src={URL.createObjectURL(file)}
    //                 controls
    //                 className="modalVideo"
    //               ></video>
    //             )}
    //           </div>
    //         )}
    //         <div className="modalActions">
    //           <button className="modalButton" onClick={submitHandler}>
    //             Post
    //           </button>
    //           <button
    //             className="modalButton"
    //             onClick={() => setReviewModalOpen(false)}
    //           >
    //             Edit
    //           </button>
    //           <button className="modalButton" onClick={closeModal}>
    //             Cancel
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   {/* Location Modal */}
    //   {isLocationModalOpen && (
    //     <div className="modal">
    //       <div className="modalContent">
    //         <h3>Choose Location</h3>
    //         {locations.map((loc) => (
    //           <div key={loc}>
    //             <input
    //               type="radio"
    //               id={`location-${loc}`}
    //               value={loc}
    //               checked={location === loc}
    //               onChange={(e) => setLocation(e.target.value)}
    //             />
    //             <label htmlFor={`location-${loc}`}>{loc}</label>
    //           </div>
    //         ))}
    //         <button onClick={() => setLocationModalOpen(false)}>Done</button>
    //       </div>
    //     </div>
    //   )}

    //   {/* Genre Modal */}
    //   {isGenreModalOpen && (
    //     <div className="modal">
    //       <div className="modalContent">
    //         <h3>Choose Genre</h3>
    //         {genres.map((g) => (
    //           <div key={g}>
    //             <input
    //               type="radio"
    //               id={`genre-${g}`}
    //               value={g}
    //               checked={genre === g}
    //               onChange={(e) => setGenre(e.target.value)}
    //             />
    //             <label htmlFor={`genre-${g}`}>{g}</label>
    //           </div>
    //         ))}
    //         <button onClick={() => setGenreModalOpen(false)}>Done</button>
    //       </div>
    //     </div>
    //   )}
    // </div>
//   );
// }


import "./share.css";
import {
  PermMedia,
  Room,
  LocalMovies,
} from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const API = process.env.REACT_APP_API_URL;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [isGenreModalOpen, setGenreModalOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [genre, setGenre] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const locations = ["Tokyo", "Paris", "New York", "Kyoto", "London"];
  const genres = ["Action", "Romance", "Fantasy", "Comedy"];

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading bar

    const data = new FormData();
    data.append("userId", user._id);
    data.append("desc", desc.current.value);
    data.append("location", location);
    data.append("genre", genre);

    if (file) {
      data.append("file", file);
    }

    try {
      await axios.post(`${API}/api/posts`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFile(null);
      desc.current.value = "";
      setLocation("");
      setGenre("");
      setReviewModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Error in post submission:", err);
      alert("Failed to submit the post. Please try again.");
    } finally {
      setIsLoading(false); // Hide loading bar
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setReviewModalOpen(true);
  };

  const closeModal = () => {
    setFile(null);
    setReviewModalOpen(false);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : "/assets/profilepic.jpg"
            }
            alt=""
          />
          <textarea
            placeholder={`Write a description, ${user.username}!`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <div className="shareDetails">
          {location && <span className="hashtag">#{location}</span>}
          {genre && <span className="hashtag">#{genre}</span>}
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,.mp4,.webm"
                onChange={handleFileChange}
              />
            </label>
            <div className="shareOption" onClick={() => setLocationModalOpen(true)}>
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption" onClick={() => setGenreModalOpen(true)}>
              <LocalMovies htmlColor="purple" className="shareIcon" />
              <span className="shareOptionText">Genre</span>
            </div>
          </div>
          <button className="shareButton" type="submit" disabled={isLoading}>
            {isLoading ? "Posting..." : "Post"}
          </button>
        </form>

        {/* Loading bar */}
        {isLoading && <div className="loadingBar">Loading...</div>}
      </div>
            {/* Review Modal */}
            {isReviewModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h3>Review Your Post</h3>
            {file && (
              <div className="modalPreview">
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="modalImage"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(file)}
                    controls
                    className="modalVideo"
                  ></video>
                )}
              </div>
            )}
            <div className="modalActions">
              <button className="modalButton" onClick={submitHandler}>
                Post
              </button>
              <button
                className="modalButton"
                onClick={() => setReviewModalOpen(false)}
              >
                Edit
              </button>
              <button className="modalButton" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h3>Choose Location</h3>
            {locations.map((loc) => (
              <div key={loc}>
                <input
                  type="radio"
                  id={`location-${loc}`}
                  value={loc}
                  checked={location === loc}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <label htmlFor={`location-${loc}`}>{loc}</label>
              </div>
            ))}
            <button onClick={() => setLocationModalOpen(false)}>Done</button>
          </div>
        </div>
      )}

      {/* Genre Modal */}
      {isGenreModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h3>Choose Genre</h3>
            {genres.map((g) => (
              <div key={g}>
                <input
                  type="radio"
                  id={`genre-${g}`}
                  value={g}
                  checked={genre === g}
                  onChange={(e) => setGenre(e.target.value)}
                />
                <label htmlFor={`genre-${g}`}>{g}</label>
              </div>
            ))}
            <button onClick={() => setGenreModalOpen(false)}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}


