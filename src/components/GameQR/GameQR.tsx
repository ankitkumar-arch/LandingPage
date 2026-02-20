import React from "react";
import styles from "./GameQR.module.scss";

interface GameQRProps {
  gameQRImage: string;
}

const GameQR: React.FC<GameQRProps> = ({ gameQRImage }) => {
  return (
    <div className={styles.qrSection}>
      <div className={styles.qrContainer}>
        <div className={styles.qrWrapper}>
          <img
            src={gameQRImage}
            alt="Scan to download app"
            className={styles.qrImage}
          />
        </div>
        <div className={styles.qrTextContainer}>
          <p className={styles.qrTextLine1}>SCAN CODE TO DOWNLOAD APP</p>
        </div>
      </div>
    </div>
  );
};


export default GameQR;
