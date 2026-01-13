import React from "react";
import useDeviceType from "@/utils/useDeviceType";
import styles from "./HeroV3.module.scss";
import PlayButton from "../Button/Button";

const playFeatures = [
  {
    icon: "/images/playing-star.svg",
    text: (
      <>
        Play for free or <strong>real cash and prizes</strong>
      </>
    ),
  },
  {
    icon: "/images/playing-star.svg",
    text: (
      <>
        <strong>100% fair play</strong> with same skill level
      </>
    ),
  },
  {
    icon: "/images/playing-star.svg",
    text: (
      <>
        <strong>Easily withdraw</strong> your winnings
      </>
    ),
  },
];
interface HeroV3PropsTypes {
  imageSrcTop: string;
  imageSrcBottom: string;
  gameImage: string;
  gameStatsImage: string;
  gamePlayNowImage: string;
  gameIconImages: string[];
}

const HeroV3: React.FC<HeroV3PropsTypes> = ({
  imageSrcTop,
  imageSrcBottom,
  gameImage,
  gameStatsImage,
  gamePlayNowImage,
  gameIconImages,
}) => {
  const deviceType = useDeviceType();
  return (
    <div className={styles.hero_bgImage}>
      {/* Top Image with overlay */}
      {deviceType === "mobile" && (
        <div className={styles.video}>
          <video
            className={styles.heroVideo}
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          >
            <source src="/videos/hero-bobpdp-video.mp4" type="video/mp4" />
          </video>
        </div>
      )}
      <div className={styles.topSection}>
        <img
          src={imageSrcTop}
          alt="Hero Image Top"
          className={styles.heroImageTop}
        />

        <div className={styles.overlayContent}>
          <div className={styles.leftContent}>
            <img
              src={gameImage}
              alt="Blackout Bingo Logo"
              className={styles.bbImage}
            />
            <h2 className={styles.heroText}>Play to win real money!</h2>

            <div className={styles.stepsBox}>
              <ol className={styles.stepsList}>
                <li>
                  <span className={styles.textContent}>
                    <strong>Download the file</strong> (accept the download
                    notification to continue)
                  </span>
                </li>
                <li>
                  <span className={styles.textContent}>
                    <strong>Double-click</strong> the downloaded file to start
                    the installation.
                  </span>
                </li>
                <li>
                  <span className={styles.textContent}>
                    <strong>Play</strong> the game and{" "}
                    <strong>win real cash.</strong>
                  </span>
                </li>
              </ol>
            </div>

            <PlayButton location="hero_section" gameId="5638" game="BOB" />

            <div className={styles.phoneIcon}>
              <img
                src="/images/apple-icon.svg"
                alt="IOS Icon"
                className={styles.phoneIconImage}
              />
              <img
                src="/images/android-icon.svg"
                alt="Android Icon"
                className={styles.phoneIconImage}
              />
              <span className={styles.iconText}>Over 25 million downloads</span>
            </div>
          </div>
          {deviceType === "desktop" && (
            <div className={styles.video}>
              <video
                className={styles.heroVideo}
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="none"
              >
                <source src="/videos/hero-bobpdp-video.mp4" type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Image outside of overlay */}

      <div className={styles.bottomSection}>
        <img
          src={imageSrcBottom}
          alt="Hero Bottom Image"
          className={styles.heroImageBottom}
        />

        <div className={styles.overlayContent}>
          <div className={styles.leftContent}>
            <div className={styles.featuresBox}>
              {playFeatures.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <img
                    src={feature.icon}
                    alt="Feature Icon"
                    className={styles.featureIcon}
                  />
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
            <PlayButton location="hero_section" gameId="5638" game="BOB" />
          </div>
          <div className={styles.bottomRightContent}>
            <img
              src={gamePlayNowImage}
              alt="BB Statistics"
              className={styles.bbPlayNowImage}
            />

            <div className={styles.playingIcons}>
              <img
                src="/images/cash-prizes.svg"
                alt="Cash Prizes"
                className={styles.cashPrizesImage}
              />

              <div className={styles.gameIcons}>
                {gameIconImages.map((icon, index) => (
                  <img
                    key={index}
                    src={icon}
                    alt={`Game Icon ${index + 1}`}
                    className={styles.gameIconImage}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroV3;
