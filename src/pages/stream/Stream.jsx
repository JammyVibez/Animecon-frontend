import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

function StreamingPage() {
  const { id } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [streamingUrl, setStreamingUrl] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/anime/info/${id}`)
      .then((response) => response.json())
      .then((data) => setAnimeDetails(data))
      .catch((error) => console.error("Error fetching anime details:", error));
  }, [id]);

  const handleEpisodeClick = (episodeId) => {
    setSelectedEpisode(episodeId);
    fetch(`${BASE_URL}/decodeurl/${episodeId}`)
      .then((response) => response.json())
      .then((data) => setStreamingUrl(data.url))
      .catch((error) => console.error("Error decoding URL:", error));
  };

  return (
    <div>
      {animeDetails ? (
        <div>
          <h1>{animeDetails.title}</h1>
          <p>{animeDetails.description}</p>
          <h2>Episodes</h2>
          <ul>
            {animeDetails.episodes.map((episode) => (
              <li key={episode.id}>
                <button onClick={() => handleEpisodeClick(episode.id)}>
                  Episode {episode.number}
                </button>
              </li>
            ))}
          </ul>
          {streamingUrl && (
            <div>
              <h3>Now Playing: Episode {selectedEpisode}</h3>
              <video controls autoPlay>
                <source src={streamingUrl} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      ) : (
        <p>Loading anime details...</p>
      )}
    </div>
  );
}

export default StreamingPage;
