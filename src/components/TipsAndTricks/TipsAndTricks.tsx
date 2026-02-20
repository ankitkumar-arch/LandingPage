"use client";
import React from "react";
import styles from "./TipsAndTricks.module.scss";
import PlayButton from "../Button/Button";

interface TipsAndTricksProps {
  gameTipsText: string[];
}

const TipsAndTricks: React.FC<TipsAndTricksProps> = ({
  gameTipsText,
}) => {
  return (
    <div className={styles.container}>
      {/* Top Section */}
      <div className={styles.header}>
        <div className={styles.imagePlaceholder}>
          <img
            src="/images/how-to-win-money-image.webp"
            alt="win money"
            className={styles.winMoney}
          />
        </div>
        <h2 className={styles.title}>
          How to win money playing <br /> Blackout Bingo
        </h2>
        <p className={styles.subtitle}>
          Easy and seamless gameplay to win big!
        </p>
        <div className={styles.tabs}>
          <span>Head-to-head</span>
          <span>Brackets</span>
          <span>Leagues</span>
        </div>
      </div>

      {/* Info Cards */}
      {/* <PlayButton location="tips_trick_section" gameId="5638" game="BOB" /> */}
    </div>
  );
};

export default TipsAndTricks;
