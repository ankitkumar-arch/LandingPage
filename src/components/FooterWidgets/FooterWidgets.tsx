import React from "react";
import styles from "./FooterWidgets.module.scss";
import useDeviceType from "@/utils/useDeviceType";
import PlayButton from "../Button/Button";

const FooterWidgets = () => {
  const deviceType = useDeviceType();
  return (
    <div className={styles.footerWidgets}>
      <h4 className={styles.winText}>
        {" "}
        {deviceType === "mobile"
          ? "Do you have what it takes to win?"
          : "Ready to start winning?"}
      </h4>
      <PlayButton location="ready_to_start_section" gameId="5638" game="BOB" />
    </div>
  );
};

export default FooterWidgets;
