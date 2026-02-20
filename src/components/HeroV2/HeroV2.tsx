// import React from "react";
// import useDeviceType from "@/utils/useDeviceType";
// import styles from "./HeroV2.module.scss";
// import PlayButton from "../Button/Button";

// const playFeatures = [
//   {
//     icon: "/images/playing-star.svg",
//     text: (
//       <>
//         Play for free or <strong>real cash and prizes</strong>
//       </>
//     ),
//   },
//   {
//     icon: "/images/playing-star.svg",
//     text: (
//       <>
//         <strong>100% fair play</strong> with same skill level
//       </>
//     ),
//   },
//   {
//     icon: "/images/playing-star.svg",
//     text: (
//       <>
//         <strong>Easily withdraw</strong> your winnings
//       </>
//     ),
//   },
// ];

// interface HeroV2PropsTypes {
//   imageSrcTop: string;
//   imageSrcBottom: string;
//   gameImage: string;
//   gameStatsImage: string;
//   gamePlayNowImage: string;
//   gameIconImages: string[];
// }

// const HeroV2: React.FC<HeroV2PropsTypes> = ({
//   imageSrcTop,
//   imageSrcBottom,
//   gameImage,
//   gameStatsImage,
//   gamePlayNowImage,
//   gameIconImages,
// }) => {
//   const deviceType = useDeviceType();
//   return (
//     <div className={styles.hero_bgImage}>
//       {/* Top Image with overlay */}
//       {deviceType === "mobile" && (
//         <div className={styles.video}>
//           <video
//             className={styles.heroVideo}
//             controls
//             autoPlay
//             muted
//             loop
//             playsInline
//             preload="none"
//           >
//             <source src="/videos/hero-bobpdp-video.mp4" type="video/mp4" />
//           </video>
//         </div>
//       )}
//       <div className={styles.topSection}>
//         <img
//           src={imageSrcTop}
//           alt="Hero Image Top"
//           className={styles.heroImageTop}
//         />

//         <div className={styles.overlayContent}>
//           <div className={styles.leftContent}>
//             <img
//               src={gameImage}
//               alt="Blackout Bingo Logo"
//               className={styles.bbImage}
//             />
//             <h2 className={styles.heroText}>Play to win real money!</h2>

//             <img
//               src={gameStatsImage}
//               alt="BB Statistics"
//               className={styles.bbStatsImage}
//             />

//             <PlayButton location="hero_section" gameId="5638" game="BOB" />

//             <div className={styles.phoneIcon}>
//               <img
//                 src="/images/apple-icon.svg"
//                 alt="IOS Icon"
//                 className={styles.phoneIconImage}
//               />
//               <img
//                 src="/images/android-icon.svg"
//                 alt="Android Icon"
//                 className={styles.phoneIconImage}
//               />
//               <span className={styles.iconText}>Over 25 million downloads</span>
//             </div>
//           </div>
//           {deviceType === "desktop" && (
//             <div className={styles.video}>
//               <video
//                 className={styles.heroVideo}
//                 controls
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 preload="none"
//               >
//                 <source src="/videos/hero-bobpdp-video.mp4" type="video/mp4" />
//               </video>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Bottom Image outside of overlay */}

//       <div className={styles.bottomSection}>
//         <img
//           src={imageSrcBottom}
//           alt="Hero Bottom Image"
//           className={styles.heroImageBottom}
//         />

//         <div className={styles.overlayContent}>
//           <div className={styles.leftContent}>
//             <div className={styles.featuresBox}>
//               {playFeatures.map((feature, index) => (
//                 <div key={index} className={styles.featureItem}>
//                   <img
//                     src={feature.icon}
//                     alt="Feature Icon"
//                     className={styles.featureIcon}
//                   />
//                   <p>{feature.text}</p>
//                 </div>
//               ))}
//             </div>
//             <PlayButton location="hero_section" gameId="5638" game="BOB" />
//           </div>
//           <div className={styles.bottomRightContent}>
//             <img
//               src={gamePlayNowImage}
//               alt="BB Statistics"
//               className={styles.bbPlayNowImage}
//             />

//             <div className={styles.playingIcons}>
//               <img
//                 src="/images/cash-prizes.svg"
//                 alt="Cash Prizes"
//                 className={styles.cashPrizesImage}
//               />

//               <div className={styles.gameIcons}>
//                 {gameIconImages.map((icon, index) => (
//                   <img
//                     key={index}
//                     src={icon}
//                     alt={`Game Icon ${index + 1}`}
//                     className={styles.gameIconImage}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroV2;

"use client";
import React from "react";
import styles from "./HeroV2.module.scss";
import PlayButton from "../Button/Button";
import "dotenv/config";
import PhoneLinks from "../PhoneLinks/PhoneLinks";
import GameQR from "../GameQR/GameQR";
import GameStatsBar from "@/components//GameStatsBar/GameStatsBar";
import useDeviceType from "@/utils/useDeviceType";
import DownloadAppButton from "../DownloadAppButton/DownloadAppButton";

interface HeroPropsTypes {
  // imageSrcTop: string;
  gameQRImage: string;
  appIcon: string;
}

const HeroV2: React.FC<HeroPropsTypes> = ({ gameQRImage, appIcon }) => {
  const deviceType = useDeviceType();
   const imageSrcTop =
    deviceType === "mobile"
      ? "/images/ssk_hero_mobile.webp"
      : "/images/ssk_hero_desktop.webp";
  return (
    <div className={styles.hero_bgImage}>
      <div className={styles.topSection}>
        <img
          src={imageSrcTop}
          alt="Hero Image Top"
          className={styles.heroImageTop}
        />
        <div className={styles.ratingContainer}>
          <div className={styles.gameImage}>
            <img
              src={appIcon}
              alt="Game Icon"
              width="80px"
            />
          </div>
          <div className={styles.ratingBlock}>
            <div className={styles.ratingTop}>
              <span>4.8/5</span>
              <span className={styles.star}>⭐</span>
            </div>
            <span>297 Reviews</span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.downloadBlock}>
            <div className={styles.ratingTop}>100k+</div>
            <div className={styles.subText}>Downloads</div>
          </div>
          {deviceType === "desktop" && (
            <div className={styles.gameQR}>
              <img
                src={gameQRImage}
                alt="Game QR Code"
                className={styles.gameQRImage}
              />
            </div>
          )}
        </div>
        {deviceType === "mobile" && (
          <div className={styles.apkInfo}>
            <div className={styles.apkVerifiedRow}>
              <img
                src="images/security.svg"
                alt="Security Icon"
                width="20"
                height="20"
              />
              <span>APK Verified File</span>
            </div>

            <div className={styles.apkPermission}>
              Manual source permission is needed for install
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroV2;

