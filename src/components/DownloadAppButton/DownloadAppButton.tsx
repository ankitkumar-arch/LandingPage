"use client";
import React from "react";
import styles from "./DownloadAppButton.module.scss";
import { generateAFOneLink } from "@/utils/generateOneLink";

interface DownloadAppButtonProps {
  oneLinkUrl: string;
}

const DownloadAppButton: React.FC<DownloadAppButtonProps> = ({
  oneLinkUrl,
}) => {
  const handleClick = async () => {
    const appsFlyerResult = await generateAFOneLink(oneLinkUrl);

    const clickURL = appsFlyerResult?.clickURL;
    if (!clickURL) {
      window.open(oneLinkUrl, "_self");
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
    <div className={styles.floatingContainer}>
      <div className={styles.buttonWrapper}>
        <div className={styles.borderPulse}></div>
        <button className={styles.downloadBtn} onClick={handleClick}>
          <div className={styles.shimmer}></div>
          <div className={styles.content}>
            <p>Download & Claim Bonus</p>
            <img
              src="/images/solitaire-skillz/download_icon.webp"
              className={styles.iconRight}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default DownloadAppButton;
