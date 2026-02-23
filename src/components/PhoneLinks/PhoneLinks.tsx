"use client";
import React from "react";
import styles from "./PhoneLinks.module.scss";
import Image from "next/image";
import { generateAFOneLink } from "@/utils/generateOneLink";

interface PhoneLinksProps {
  applePlayUrl: string;
  androidPlayUrl: string;
  width?: number;
  height?: number;
}

const PhoneLinks: React.FC<PhoneLinksProps> = ({
  applePlayUrl,
  androidPlayUrl,
  width = 180,
  height = 60,
}) => {
  const openLink = async (url: string) => {
    const appsFlyerResult = await generateAFOneLink(url);
    const clickURL = appsFlyerResult?.clickURL;
    if (!clickURL) {
      window.location.href = url;
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
    <div className={styles.imageContainer}>
      <div onClick={() => openLink(applePlayUrl)}>
        <Image
          src="/images/AppleStore.webp"
          alt="apple store"
          className={styles.StoreImage}
          width={width}
          height={height}
        />
      </div>
      <div onClick={() => openLink(androidPlayUrl)}>
        <Image
          src="/images/android_apk.webp"
          alt="android store"
          className={styles.androidStoreImage}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default PhoneLinks;
