import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import styles from "./HistoryCard.module.css";

export const HistoryCard = ({ videoId }) => {
  const { videos, dispatch } = useData();
  const video = videos.find((video) => video._id === videoId);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={`flex ${styles.card}`}
      onClick={() => showOptionsModal && setShowOptionsModal(() => false)}
    >
      <img src={video?.image} alt="thumbnail" className={`${styles.img}`} />

      <div className={`${styles.video_details}`}>
        <div
          onClick={() => navigate(`/video/${video?._id}`)}
          className={`${styles.title} pointer`}
        >
          {video?.title}
        </div>
        <div className={`${styles.channel_name}`}>{video?.channelName}</div>
        <div>
          <span>{video?.statistics.viewCount} views</span>
          <span>{video?.publishedOn}</span>
        </div>
      </div>

      <span
        className={`material-icons-outlined pointer ${styles.more_options_icon}`}
        onClick={() => setShowOptionsModal((state) => !state)}
      >
        more_vert
      </span>

      {showOptionsModal && (
        <div className={`${styles.more_options} pointer`}>
          <div
            onClick={() => {
              dispatch({
                type: "REMOVE_FROM_HISTORY",
                payload: { videoId },
              });
              setShowOptionsModal(() => false);
            }}
          >
            Remove from History
          </div>
          <div
            className="pointer"
            onClick={() => setShowOptionsModal(() => false)}
          >
            Cancel
          </div>
        </div>
      )}
    </div>
  );
};