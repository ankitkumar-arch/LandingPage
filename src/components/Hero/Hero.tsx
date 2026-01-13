import React from "react";
import useDeviceType from "@/utils/useDeviceType";
import styles from "./Hero.module.scss";
import PlayButton from "../Button/Button";
import 'dotenv/config';
import PhoneLinks from "../PhoneLinks/PhoneLinks";

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

interface HeroPropsTypes {
  imageSrcTop: string;
  imageSrcBottom: string;
  gameImage: string;
  gameStatsImage: string;
  gamePlayNowImage: string;
  gameIconImages: string[];
  text: string;
}

const Hero: React.FC<HeroPropsTypes> = ({
  imageSrcTop,
  imageSrcBottom,
  gameImage,
  gameStatsImage,
  gamePlayNowImage,
  gameIconImages,
  text,
}) => {
  const deviceType = useDeviceType();
  const sendEvents = async() => {
    console.log("ress", process.env.FB_PIXEL_ID_BOB);
    const res = await fetch("/api/meta-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        eventName: "Send-click",
        userData: {email: "abc@gmail.com"}
      }),
    });
    const data = await res.json();
    console.log("Meta API ", data);
  }
  return (
    <div className={styles.hero_bgImage}>
      {/* Top Image with overlay */}
      <div className={styles.topSection}>
        <img
          src={imageSrcTop}
          alt="Hero Image Top"
          className={styles.heroImageTop}
        />

        <div className={styles.overlayContent}>
          <img
            src={gameImage}
            alt={`${text} logo`}
            className={styles.bbImage}
          />

          <div className={styles.leftContent}>
            <h2 className={styles.heroText}>Play to win real money!</h2>

            <img
              src={gameStatsImage}
              alt={`${text} stats image`}
              className={styles.bbStatsImage}
            />

            <PlayButton location="hero_section" gameId="5638" game="BOB" />
            <PhoneLinks androidPlayUrl="" applePlayUrl="" />
            {/* <div className={styles.phoneIcon}>
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
            </div> */}
          </div>
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
            <PlayButton location="cash_prize_section" gameId="5638" game="BOB" />
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

export default Hero;
