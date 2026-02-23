import React from "react";
import styles from "./FooterWidgets.module.scss";
import PhoneLinks from "../PhoneLinks/PhoneLinks";

interface FooterWidgetsProps {
  onelinkUrl: string;
}

const FooterWidgets: React.FC<FooterWidgetsProps> = ({ onelinkUrl }) => {
  return (
    <div className={styles.backgroundContainer}>
      <span className={styles.text}>LET&apos;S PLAY</span>
      <PhoneLinks
        applePlayUrl={onelinkUrl}
        androidPlayUrl={onelinkUrl}
        width={308}
        height={88}
      />
      {/* <span className={styles.footerText}>*Including all Skillz Platform</span> */}
    </div>
  );
};

export default FooterWidgets;
