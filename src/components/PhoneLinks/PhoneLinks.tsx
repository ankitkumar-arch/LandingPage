import React from "react";
import styles from "./PhoneLinks.module.scss";
import Image from "next/image";

interface PhoneLinksProps {
  applePlayUrl: string;
  androidPlayUrl: string;
}

const PhoneLinks: React.FC<PhoneLinksProps> = ({
  applePlayUrl,
  androidPlayUrl,
}) => {
  return (
    <div className={styles.imageContainer}>
      <a href={applePlayUrl} target="_blank" rel="noopener noreferrer">
        <Image
          src="/images/AppleStore.webp"
          alt="apple store"
          className={styles.StoreImage}
          width={180}
          height={60}
        />
      </a>
      <a href={androidPlayUrl} target="_blank" rel="noopener noreferrer">
        <Image
          src="/images/GalaxyStore.webp"
          alt="android store"
          className={styles.androidStoreImage}
          width={180}
          height={60}
        />
      </a>
    </div>
  );
};

export default PhoneLinks;
