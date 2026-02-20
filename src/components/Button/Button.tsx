"use client";
import React from "react";
import styles from "./Button.module.scss";
import { generateAFOneLink } from "@/utils/generateOneLink";

interface PlayButtonProps {
  /** Text inside the button */
  text: string;
  /** Section/location where button appears (for tracking) */
  location: string;
  /** Optional custom background (gradient/color/transition) */
  background?: string;
  /** Extra classNames for overrides */
  className?: string;
  /** Name of the game */
  game: string;
  /** onelink for the game */
  oneLinkUrl: string;
}

declare global {
  interface Window {
    fbq?: (
      event: string,
      action?: string,
      params?: Record<string, string | number | boolean>
    ) => void;
  }
}
const PlayButton: React.FC<PlayButtonProps> = ({
  text,
  location,
  background,
  className,
  game,
  oneLinkUrl,
}) => {
  const sendEvents = async () => {
    const res = await fetch("/api/meta-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "start_playing_hero",
      }),
    });
    const data = await res.json();
  };
  const handleClick = async () => {
    sendEvents();
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", "button_click", {
        buttonText: text,
        location: location,
        trackType: "cta",
        game,
        page: window.location.href,
      });
    }

    const appsFlyerResult = await generateAFOneLink(oneLinkUrl);

    const clickURL = appsFlyerResult?.clickURL;
    if (!clickURL) {
      window.location.href = oneLinkUrl;
      return;
    }

    setTimeout(() => {
      if (window.AF_SMART_SCRIPT?.fireImpressionsLink) {
        window.AF_SMART_SCRIPT.fireImpressionsLink();
      }
      window.location.href = clickURL;
    }, 500);
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
