"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./GameScreenShotsV2.module.scss";
import useDeviceType from "@/utils/useDeviceType";

// const screenShotsImages = [
//   "/images/solitaire-skillz/image1.jpg",
//   "/images/solitaire-skillz/image2.jpg",
//   "/images/solitaire-skillz/image3.jpg",
//   "/images/solitaire-skillz/image4.jpg",
//   "/images/solitaire-skillz/image5.jpg",
// ];

interface GameScreenShotsV2Props {
    screenshotsImages: string[];
}

const GameScreenShotsV2 = ({ screenshotsImages }: GameScreenShotsV2Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const deviceType = useDeviceType();
  const isMobile = deviceType === "mobile";
  const maxIndex = screenshotsImages.length - 1;

  const slideWidthPercent = isMobile ? 65 : 28;
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBySlide = () => {
    const track = trackRef.current;
    if (!track) return 0;

    const slideWidthPx = (track.offsetWidth * slideWidthPercent) / 100;
    return slideWidthPx;
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const slideWidthPx = scrollBySlide();
    const index = Math.round(track.scrollLeft / slideWidthPx);

    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: -scrollBySlide(),
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: scrollBySlide(),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let slidePx = scrollBySlide();

    if (slidePx === 0) {
      setTimeout(() => {
        slidePx = scrollBySlide();
        track.scrollTo({ left: slidePx, behavior: "smooth" });
      }, 50);
    }

    const interval = setInterval(() => {
      const next = currentIndex === maxIndex ? 0 : currentIndex + 1;
      const newSlidePx = scrollBySlide();

      setCurrentIndex(next);

      track.scrollTo({
        left: next * newSlidePx,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);

  return (
    <>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderWrapper}>
          <button
            className={`${styles.arrow} ${styles.left} ${
              currentIndex === 0 ? styles.disabled : ""
            }`}
            onClick={handlePrev}
          >
            <img
              src="/images/prev_icon.png"
              alt="Previous"
              className={styles.arrowIcon}
            />
          </button>

          <div
            className={styles.sliderTrack}
            ref={trackRef}
            onScroll={handleScroll}
          >
            {screenshotsImages.map((src, i) => (
              <div
                key={i}
                className={styles.slide}
                style={{ flex: `0 0 ${slideWidthPercent}%` }}
              >
                <img
                  src={src}
                  className={styles.image}
                  alt={`slide image ${i}`}
                />
              </div>
            ))}
          </div>

          <button
            className={`${styles.arrow} ${styles.right} ${
              currentIndex === screenshotsImages.length - 1
                ? styles.disabled
                : ""
            }`}
            onClick={handleNext}
          >
            <img
              src="/images/next_icon.png"
              alt="Next"
              className={styles.arrowIcon}
            />
          </button>
        </div>
      </div>

      <div className={styles.versionInfo}>
        <span className={styles.text}>Active version</span>
        <span className={styles.version}>4.33</span>
      </div>
    </>
  );
};

export default GameScreenShotsV2;
