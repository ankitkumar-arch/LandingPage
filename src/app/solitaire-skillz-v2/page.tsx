"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/page.module.css";
import useDeviceType from "@/utils/useDeviceType";
import FBPixel from "@/lib/FBPixel";
import { PIXELS } from "@/constants/pixels";
import AnalyticsProvider from "@/utils/AnalyticsProvider";
import { Suspense } from "react";
import GameScreenShotsV2 from "@/components/GameScreenShotsV2/GameScreenShotsV2";
import DownloadAppButton from "@/components/DownloadAppButton/DownloadAppButton";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HeroV2 from "@/components/HeroV2/HeroV2";
import RatingsAndReviews from "@/components/RatingsAndReviews/RatingsAndReviews";
import AppSpecific from "@/components/AppSpecific/AppSpecific";
import DeveloperSection from "@/components/DeveloperSection/DeveloperSection";
import FlagSection from "@/components/FlagSection/FlagSection";
import Loader from "@/components/Loader/Loader";
import Script from "next/script";

const gameQRImage = "/images/solitaire-skillz/solitaire-skillz-qr.png";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const deviceType = useDeviceType();
  const imageSrcTop =
    deviceType === "mobile"
      ? "/images/solitaire-skillz/ssk_hero_mobile.webp"
      : "/images/solitaire-skillz/ssk_hero_desktop.webp";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.page}>
      {/* <FBPixel pixelId={PIXELS.solitaireSkillz ?? ""} /> */}
      <AnalyticsProvider gtagId="G-1FR83BKXJ1" gtmId="GTM-NCNL72F" />
      <Script
        defer
        src="https://onelinksmartscript.appsflyer.com/onelink-smart-script-latest.js"
      ></Script>
      <main className={styles.main}>
        <Header />
        <HeroV2 imageSrcTop={imageSrcTop} gameQRImage={gameQRImage} />
        <Suspense fallback={<Loader />}>
          <DownloadAppButton oneLinkUrl="https://skillz.onelink.me/QmH9/" />
        </Suspense>
        <div style={{ padding: "0 15px" }}>
          <GameScreenShotsV2 />
          <RatingsAndReviews />
          <AppSpecific />
          {deviceType === "mobile" && <DeveloperSection />}
          <FlagSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}
