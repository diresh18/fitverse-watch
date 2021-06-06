import React, { useState } from "react";
import { useParams } from "react-router";
import { useData } from "../../context/DataContext";
import { videos } from "../../videosDB";
import styles from "./VideoDetails.module.css";

export const VideoDetails = () => {
  const { videoId } = useParams();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const { state, dispatch } = useData();
  const video = videos.find((video) => video.id === videoId);
  const { id, title } = video;
  const likedVideo = state.liked.find((video) => video.id === videoId);
  const watchLaterVideo = state.watchLater.find(
    (video) => video.id === videoId
  );
  const newPlaylistHandler = () => {
    dispatch({
      type: "CREATE_PLAYLIST",
      payload: { playlistName, videoId: id },
    });
    setPlaylistName("");
  };

  return (
    <div className={`${styles.main_container}`}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen="allowfullscreen"
        allowAutoplay="autoplay"
      ></iframe>
      <h2 style={{ textAlign: "left" }}>{title}</h2>
      <div className={`flex ${styles.options}`}>
        {!watchLaterVideo ? (
          <div>
            <span
              onClick={() =>
                dispatch({ type: "ADD_TO_WATCH_LATER", payload: video })
              }
              className={`${styles.pointer} material-icons-outlined`}
            >
              watch_later
            </span>
            <div>Add to WatchLater</div>
          </div>
        ) : (
          <div>
            <span
              onClick={() =>
                dispatch({ type: "ADD_TO_WATCH_LATER", payload: video })
              }
              className={`${styles.pointer} material-icons`}
            >
              watch_later
            </span>
            <div>Remove from WatchLater</div>
          </div>
        )}{" "}
        {likedVideo ? (
          <div>
            <span
              onClick={() => dispatch({ type: "LIKE_UNLIKE", payload: video })}
              className={`${styles.pointer} material-icons`}
            >
              thumb_up
            </span>
            <div>Unlike</div>
          </div>
        ) : (
          <div>
            <span
              onClick={() => dispatch({ type: "LIKE_UNLIKE", payload: video })}
              className={`${styles.pointer} material-icons-outlined`}
            >
              thumb_up
            </span>
            <div>Like</div>
          </div>
        )}
        <div>
          <span
            onClick={() => setShowPlaylistModal((state) => !state)}
            className={`${styles.pointer} material-icons`}
          >
            playlist_add
          </span>
          <div>Add to Playlist</div>
        </div>
      </div>

      {showPlaylistModal && (
        <div
          onClick={() => setShowPlaylistModal((state) => !state)}
          className={`${styles.modal_container}`}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className={`${styles.modal}`}
          >
            <h4>Playlists</h4>
            {state?.playlist?.map((playlistItem) => {
              return (
                <div>
                  <label>
                    {console.log(
                      playlistItem.videos.find((videoId) => videoId === id)
                    )}
                    <input
                      onChange={() =>
                        dispatch({
                          type: "ADD_TO_PLAYLIST",
                          payload: { playlistId: playlistItem.id, videoId: id },
                        })
                      }
                      type="checkbox"
                      checked={
                        playlistItem.videos.find(
                          (playlistVideo) => playlistVideo === id
                        )
                          ? true
                          : false
                      }
                    />
                    {playlistItem.name}
                  </label>
                </div>
              );
            })}
            <input
              onChange={(event) => setPlaylistName(event.target.value)}
              type="text"
              value={playlistName}
            />{" "}
            <button onClick={newPlaylistHandler}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};
