import React from "react";
import styles from "./DeveloperSection.module.scss";
import Image from "next/image";

const DeveloperSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Developer Contact</h2>

      <div className={styles.item}>
        <Image
          src="/images/mail.png"
          alt="Email"
          className={styles.icon}
          width={24}
          height={24}
        />
        <div>
          <p className={styles.title}>Email</p>
          <p className={styles.sub}>support@skillz.com</p>
        </div>
      </div>

      <div className={styles.item}>
        <Image
          src="/images/check_circle.png"
          alt="Terms"
          className={styles.icon}
          width={24}
          height={24}
        />
        <div>
          <p className={styles.title}>Terms of Use</p>
          <a href="mailto:support@skillz.com" className={styles.sub}>
            Read →
          </a>
        </div>
      </div>

      <div className={styles.item}>
        <Image
          src="/images/check_circle.png"
          alt="Privacy"
          className={styles.icon}
          width={24}
          height={24}
        />
        <div>
          <p className={styles.title}>Privacy Policy</p>
          <a href="https://www.skillz.com/privacy-policy/" className={styles.sub}>
            Read →
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeveloperSection;