import React from "react";
import styles from "./TipsAndTricks.module.scss";
import PlayButton from "../Button/Button";

interface TipsAndTricksProps {
  gameTipsImages: string[];
  gameTipsText: string[];
}

const TipsAndTricks: React.FC<TipsAndTricksProps> = ({
  gameTipsImages,
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
      <div className={styles.cards}>
        {gameTipsImages.map((image, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              index % 2 === 0 ? styles.colorOne : styles.colorTwo
            }`}
          >
            <div className={styles.cardImage}>
              <img
                src={image}
                alt={`icon ${index + 1}`}
                className={styles.icon}
              />
            </div>
            <p>{gameTipsText[index]}</p>
          </div>
        ))}
      </div>
      <PlayButton location="tips_trick_section" gameId="5638" game="BOB" />
    </div>
  );
};

export default TipsAndTricks;
