import React from "react";
import styles from "./Button.module.scss";
import { userAgent } from "next/server";

interface PlayButtonProps {
  /** Text inside the button */
  text?: string;
  /** Section/location where button appears (for tracking) */
  location: string;
  /** Game ID for redirect */
  gameId: string;
  /** Optional custom background (gradient/color/transition) */
  background?: string;
  /** Extra classNames for overrides */
  className?: string;
  /** Name of the game */
  game: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  text = "START PLAYING",
  location,
  gameId,
  background,
  className,
  game,
}) => {

  const sendEvents = async () => {
    const fbcMatch = document.cookie.match(/_fbc=([^;]+)/);
    const fbc = fbcMatch ? fbcMatch[1] : null;
    console.log("ress", process.env.FB_PIXEL_ID_BOB);
    const res = await fetch("/api/meta-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "start_playing_hero",
        userData: { email: "abc@gmail.com" },
        fbc: fbc,
        userAgent: navigator.userAgent,
      }),
    });
    const data = await res.json();
    console.log("Meta API ", data);
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sendEvents();
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", "StartPlaying", {
        buttonText: text,
        location: location,
        trackType: "cta",
        game,
        page: window.location.href,
      });
    }

    // Redirect to game
    // window.location.href = `https://games.skillz.com/mobile/games/${gameId}`;
  };

  return (
    <button
      className={`${styles.buttonCTA} ${className || ""}`}
      style={background ? { background } : {}}
      data-track="cta"
      data-track-name={text}
      data-track-location={location}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default PlayButton;
