"use client";
import React from "react";
import styles from "./Hero.module.scss";
import "dotenv/config";
import GameQR from "../GameQR/GameQR";
import GameStatsBar from "../GameStatsBar/GameStatsBar";
import useDeviceType from "@/utils/useDeviceType";
import dynamic from "next/dynamic";
import Loader from "../Loader/Loader";
import { Suspense } from "react";

const PhoneLinks = dynamic(() => import("../PhoneLinks/PhoneLinks"), {
  ssr: false,
});
const PlayButton = dynamic(() => import("../Button/Button"), { ssr: false });
interface HeroPropsTypes {
  imageSrcTop: string;
  gameQRImage: string;
  bgImage: string;
  gameRating?: number;
}

const Hero: React.FC<HeroPropsTypes> = ({
  imageSrcTop,
  gameQRImage,
  bgImage,
  gameRating,
}) => {
  const deviceType = useDeviceType();
  return (
    <div className={styles.hero_bgImage}>
      <div className={styles.topSection}>
        <div
          className={styles.heroImageTop}
          style={
            bgImage
              ? { backgroundImage: `url(${bgImage})` }
              : { background: "linear-gradient(135deg, #1e3c72, #2a5298)" }
          }
        />
        <div className={styles.overlayCenter}>
          <Suspense fallback={<Loader />}>
            <PlayButton
              location="hero_section"
              game="Solitaire-Skillz"
              text="Play Now"
              oneLinkUrl="https://skillz.onelink.me/VcoS/SSKWeb"
            />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <div className={styles.phoneLinksContainer}>
              <PhoneLinks
                applePlayUrl="https://skillz.onelink.me/VcoS/SSKWeb"
                androidPlayUrl="https://skillz.onelink.me/VcoS/SSKWeb"
              />
            </div>
          </Suspense>
        </div>
        {deviceType === "desktop" && (
          <div className={styles.qrContainer}>
            <GameQR gameQRImage={gameQRImage} />
          </div>
        )}
      </div>

      <GameStatsBar gameRating={gameRating} />

      <div className={styles.bottomSection}>
        <div className={styles.overlayBottomContent}>
          <h2 className={styles.bottomText}>WHAT WE OFFER?</h2>

          <div className={styles.cardsWrapper}>
            <div className={styles.card}>
              <img
                src="/images/secure.png"
                alt="Secured"
                className={styles.cardImage}
              />
              <p className={styles.cardText}>100%</p>
              <p className={styles.cardText1}>Secure</p>
            </div>

            <div className={styles.card}>
              <img
                src="/images/nobots.png"
                alt="No Bots"
                className={styles.cardImage}
              />
              <p className={styles.cardText}>NO BOTS</p>
              <p className={styles.cardText1}>Real Players</p>
            </div>

            <div className={styles.card}>
              <img
                src="/images/support.png"
                alt="Support"
                className={styles.cardImage}
              />
              <p className={styles.cardText}>24X7</p>
              <p className={styles.cardText1}>Support</p>
            </div>

            <div className={styles.card}>
              <img
                src="/images/refer.png"
                alt="Refer"
                className={styles.cardImage}
              />
              <p className={styles.cardText}>REFER</p>
              <p className={styles.cardText1}>& Earn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
