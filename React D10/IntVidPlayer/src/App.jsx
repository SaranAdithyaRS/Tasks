import React, { useRef, useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      generateThumbnails();
    }
  }, []);

  const generateThumbnails = () => {
    const interval = 10; // seconds
    const thumbnailsArray = [];
    for (let i = 0; i < videoRef.current.duration; i += interval) {
      thumbnailsArray.push(i);
    }
    setThumbnails(thumbnailsArray);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event) => {
    const newTime = parseFloat(event.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (event) => {
    const speed = parseFloat(event.target.value);
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleBookmark = () => {
    setBookmarks([...bookmarks, currentTime]);
  };

  const handlePiP = async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await videoRef.current.requestPictureInPicture();
    }
  };

  return (
    <div className="video-player">
      <h1 className="title">Interactive Video Player</h1>
      <div className="video-container">
        <video
          ref={videoRef}
          width="800"
          height="450"
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onLoadedMetadata={() => setDuration(videoRef.current.duration)}
        >
          <source
            src="https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="controls">
          <button className="play-btn" onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="seek-bar"
          />
          <span>
            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)} /{" "}
            {Math.floor(duration / 60)}:{Math.floor(duration % 60)}
          </span>
          <button className="bookmark-btn" onClick={handleBookmark}>
            Add Bookmark
          </button>
          <label>
            Speed:
            <select
              value={playbackSpeed}
              onChange={handleSpeedChange}
              className="speed-select"
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </label>
          <label>
            Volume:
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </label>
          <button onClick={handleFullScreen}>Full Screen</button>
          <button onClick={handlePiP}>Picture-in-Picture</button>
        </div>
      </div>

      <div className="bookmarks">
        <h2>Bookmarks</h2>
        {bookmarks.map((time, index) => (
          <div
            key={index}
            className="bookmark"
            onClick={() => (videoRef.current.currentTime = time)}
          >
            Bookmark at {Math.floor(time / 60)}:{Math.floor(time % 60)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
