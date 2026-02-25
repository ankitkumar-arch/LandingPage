import React from "react";
import styles from "./GameStatsBar.module.scss";

interface GameStatsBarProps {
  gameRating?: number;
}
const GameStatsBar: React.FC<GameStatsBarProps> = ({ gameRating }) => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.statsWrapper}>
        <div className={styles.statItem}>
          <span className={styles.highlight}>{gameRating}★</span>
          <span className={styles.text}>RATED</span>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.statItem}>
          <span className={styles.highlight}>1 Mn+</span>
          <span className={styles.text}>Skillz Players*</span>
        </div>
      </div>
    </section>
  );
};

export default GameStatsBar;
