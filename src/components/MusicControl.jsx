import React, { useState, useEffect, useRef } from "react";

/**
 * MusicControl: Handles ambient temple soundscape & controls.
 * Uses Web Audio API to create a gentle, meditative tanpura & chime resonance
 * when user interacts or clicks "Open Invitation", or plays an audio file if provided.
 */
export const MusicControl = ({ isPlaying, onToggleMusic }) => {
  return (
    <div className="floating-controls-container">
      <button
        onClick={onToggleMusic}
        className={`floating-audio-btn ${isPlaying ? "playing" : "muted"}`}
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
        title={isPlaying ? "Mute Divine Music" : "Play Divine Music"}
      >
        <div className="audio-icon-wrap">
          {isPlaying ? (
            <div className="equalizer-bars">
              <span className="bar bar-1"></span>
              <span className="bar bar-2"></span>
              <span className="bar bar-3"></span>
              <span className="bar bar-4"></span>
            </div>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </div>
        <span className="audio-label">{isPlaying ? "Music On" : "Music Off"}</span>
      </button>

      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: "Jayaprakash & Srimathi Wedding Invitation",
              text: "With the divine blessings of Lord Murugan, we cordially invite you to the wedding celebrations of Jayaprakash & Srimathi on 1 November 2026. 🌸✨",
              url: window.location.href,
            }).catch(() => {});
          } else {
            const text = encodeURIComponent(
              "You are cordially invited to the Wedding of Jayaprakash & Srimathi on 1 November 2026! 🌸✨\n" + window.location.href
            );
            window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
          }
        }}
        className="floating-share-btn"
        aria-label="Share Wedding Invitation"
        title="Share on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </button>
    </div>
  );
};
