import React from "react";
import styles from "./GameQR.module.scss";

interface GameQRProps {
  gameQRImage: string;
}

const GameQR: React.FC<GameQRProps> = ({ gameQRImage }) => {
  return (
    <div className={styles.qrSection}>
      <div className={styles.container}>
        <div className={styles.qrText}>
          <h2 className={styles.getGame}>Get the game on your phone</h2>
          <span className={styles.getLink}>Get a link through our QR code</span>
        </div>
        <div className={styles.steps}>
          <div className={styles.stepOne}>
            <img
              src="/images/step-one.webp"
              alt="step-one"
              className={styles.stepImage}
            />
            Open your phone&apos;s camera
          </div>
          <div className={styles.stepTwo}>
            <img
              src="/images/step-two.webp"
              alt="step-one"
              className={styles.stepImage}
            />
            Scan the QR code to the right
          </div>
          <div className={styles.stepThree}>
            <img
              src="/images/step-three.webp"
              alt="step-one"
              className={styles.stepImage}
            />
            When the option appears, tap to open browser, then tap the &quot;Get&quot;
            button
          </div>
        </div>
        <div className={styles.qrCode}>
            <img src={gameQRImage} alt="qr-code" />
        </div>
      </div>
    </div>
  );
};

export default GameQR;
