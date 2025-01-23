import React, { useRef, useState, useEffect } from "react";
import "./App.css"; // Import the CSS file for styling

const MagicalTimer = () => {
  const inputRef = useRef(null); // To handle the input focus
  const timerRef = useRef(null); // To store the timer ID
  const [countdown, setCountdown] = useState(10); // To track the timer value
  const [timeUp, setTimeUp] = useState(false); // To display "Time's Up!"
  const [isDarkMode, setIsDarkMode] = useState(false); // For dark/light mode

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const startTimer = () => {
    if (timerRef.current) return; // Prevent multiple timers

    setTimeUp(false); // Reset the "Time's Up!" state
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timerRef.current);
        timerRef.current = null;
        setTimeUp(true); // Trigger "Time's Up!"
        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setCountdown(10);
    setTimeUp(false);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={isDarkMode ? "dark-mode container" : "light-mode container"}>
      <button className="modeButton" onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <input
        type="text"
        ref={inputRef}
        placeholder="Type something..."
        className="inputBox"
      />

      <div className="buttonGroup">
        <button className="button" onClick={() => inputRef.current.focus()}>
          Focus Box
        </button>
        <button className="button" onClick={startTimer}>
          Start Timer
        </button>
        <button className="button" onClick={stopTimer}>
          Stop Timer
        </button>
        <button className="button" onClick={resetTimer}>
          Reset Timer
        </button>
      </div>

      <div className="timerDisplay">
        {timeUp ? (
          <span className="timeUp">Time's Up!</span>
        ) : (
          <>
            <div className="progressBarContainer">
              <div
                className="progressBar"
                style={{
                  width: `${(countdown / 10) * 100}%`,
                }}
              />
            </div>
            <span>{countdown} seconds left</span>
          </>
        )}
      </div>
    </div>
  );
};

export default MagicalTimer;
