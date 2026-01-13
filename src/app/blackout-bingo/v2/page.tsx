"use client";
import styles from "@/styles/page.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import HeroV2 from "@/components/HeroV2/HeroV2";
import Testimonial from "@/components/Testimonial/Testimonial";
import Accordion from "@/components/Accordion/Accordion";
import FooterWidgets from "@/components/FooterWidgets/FooterWidgets";
import TipsAndTricks from "@/components/TipsAndTricks/TipsAndTricks";
import GameQR from "@/components/GameQR/GameQR";
import useDeviceType from "@/utils/useDeviceType";
import FBPixel from "@/lib/FBPixel";
import { PIXELS } from "@/constants/pixels";
import AnalyticsProvider from "@/utils/AnalyticsProvider";

const gameImage = "/images/blackout-bingo-logo.svg";
const gameStatsImage = "/images/bb_statistics.webp";
const gamePlayNowImage = "/images/hero-bob-image.webp";
const gameIconImages = [
  "/images/game-icon-1-desk.webp",
  "/images/game-icon-2-desk.webp",
  "/images/game-icon-3-desk.webp",
];

const gameQRImage = "/images/QR-code.webp";
const gameTipsImage = [
  "/images/icon-1.webp",
  "/images/icon-2.webp",
  "/images/icon-3.webp",
  "/images/icon-4.webp",
];
const gameTipsText = [
  "Travel the world with Chelsea and play in amazing and exotic places.",
  "Play for free or enter a cash game or match with an entry fee as low as $0.60.",
  "Score as many bingos as possible before the timer runs out and win real cash.",
  "Win up to $200 per game.",
];

export default function HomeV2() {
  const deviceType = useDeviceType();
  const imageSrcTop =
    deviceType === "mobile"
      ? "/images/hero-top-image-mob.webp"
      : "/images/hero-top-image-desk.webp";
  const imageSrcBottom =
    deviceType === "mobile"
      ? "/images/hero-bottom-image-mob.webp"
      : "/images/hero-bottom-image-desk.webp";
  return (
    <div className={styles.page}>
      <FBPixel pixelId={PIXELS.blackoutBingo ?? ""} />
      <AnalyticsProvider gtagId="G-1FR83BKXJ1" gtmId="GTM-NCNL72F" />
      <Header title="Limited Time Offer: New players get $8 bonus cash with a $12 deposit!" />
      <main className={styles.main}>
        <HeroV2
          imageSrcTop={imageSrcTop}
          imageSrcBottom={imageSrcBottom}
          gameImage={gameImage}
          gameStatsImage={gameStatsImage}
          gamePlayNowImage={gamePlayNowImage}
          gameIconImages={gameIconImages}
        />
        <GameQR gameQRImage={gameQRImage} />
        <Testimonial />
        <Accordion />
        <TipsAndTricks
          gameTipsImages={gameTipsImage}
          gameTipsText={gameTipsText}
        />
        <FooterWidgets />
      </main>
      <Footer />
    </div>
  );
}
