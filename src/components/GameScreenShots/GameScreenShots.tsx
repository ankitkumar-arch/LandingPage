"use client";
import React, { useState } from "react";
import styles from "./GameScreenShots.module.scss";
import useDeviceType from "@/utils/useDeviceType";

// const screenShotsImages = [
//   "/images/solitaire-skillz/image1.jpg",
//   "/images/solitaire-skillz/image2.jpg",
//   "/images/solitaire-skillz/image3.jpg",
//   "/images/solitaire-skillz/image4.jpg",
//   "/images/solitaire-skillz/image5.jpg",
//   "/images/solitaire-skillz/image6.jpg",
//   "/images/solitaire-skillz/image7.jpg",
// ];

interface GameScreenShotsProps {
    screenshotsImages: string[];
}

const GameScreenShots: React.FC<GameScreenShotsProps> = ({ screenshotsImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const deviceType = useDeviceType();

  const visibleCount = deviceType === "mobile" ? 2 : 4;
  const maxIndex = screenshotsImages.length - visibleCount;

  let touchStartX = 0;
  let touchEndX = 0;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > 50 && currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
    if (swipeDistance < -50 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlePrev = () =>
    currentIndex > 0 && setCurrentIndex((prev) => prev - 1);
  const handleNext = () =>
    currentIndex < maxIndex && setCurrentIndex((prev) => prev + 1);

  const dotCount = maxIndex + 1;

  return (
    <div className={styles.screenshotContainer}>
      <h2 className={styles.sectionTitle}>Screenshots</h2>

      <div className={styles.sliderOuter}>
        {deviceType !== "mobile" && (
          <img
            src="/images/prev_arrow.svg"
            alt="Previous"
            className={`${styles.arrowImage} ${styles.leftArrow} ${
              currentIndex === 0 ? styles.disabled : ""
            }`}
            onClick={handlePrev}
          />
        )}

        <div
          className={styles.sliderWrapper}
          onTouchStart={deviceType === "mobile" ? onTouchStart : undefined}
          onTouchMove={deviceType === "mobile" ? onTouchMove : undefined}
          onTouchEnd={deviceType === "mobile" ? onTouchEnd : undefined}
        >
          <div
            className={styles.slider}
            style={{
              transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
            }}
          >
            {screenshotsImages.map((src, index) => (
              <div key={index} className={styles.slide}>
                <div className={styles.phoneFrame}>
                  <img src={src} alt={`Screenshot ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {deviceType !== "mobile" && (
          <img
            src="/images/next_arrow.svg"
            alt="Next"
            className={`${styles.arrowImage} ${styles.rightArrow} ${
              currentIndex === maxIndex ? styles.disabled : ""
            }`}
            onClick={handleNext}
          />
        )}
      </div>

      {deviceType === "mobile" && (
        <div className={styles.dotsWrapper}>
          {Array.from({ length: dotCount }).map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${
                currentIndex === i ? styles.activeDot : ""
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameScreenShots;
