"use client";
import React, { useState } from "react";
import styles from "./Accordion.module.scss";

interface AccordionItem {
  image?: string;
  item: string;
  text: string;
}

interface AccordionProps {
  items?: AccordionItem[];
}

const defaultItems: AccordionItem[] = [
  {
    image: "/images/free-matches-icon.svg",
    item: "Free Matches",
    text: "All Skillz-Powered games feature free Practice matches. Play for fun or to practice before you go Pro.",
  },
  {
    image: "/images/cash-matches-icon.svg",
    item: "Cash Matches",
    text: "Level up your game & play Pro matches for cash prizes.",
  },
  {
    image: "/images/real-world-prizes-icon.svg",
    item: "Real-World Prizes",
    text: "Cash in some winnings and redeem prizes - from Bonus Cash to a Porsche - in our Rewards Store.",
  },
  {
    image: "/images/all-games-account-icon.svg",
    item: "All-Games Account",
    text: "Your account is a passport to 400+ Skillz-Powered Games. All deposits and rewards are available across all games.",
  },
  {
    image: "/images/progression-rewards.svg",
    item: "Progression Rewards",
    text: "Level up your status the more (and better) you play.",
  },
  {
    image: "/images/vs-friends-icon.svg",
    item: "VS Friends",
    text: "Challenge friends (or rivals) to head-to-head matches.",
  },
  {
    image: "/images/player-chat-icon.svg",
    item: "Player Chat",
    text: "Chat with other players to get tips & tricks or just for fun.",
  },
  {
    image: "/images/live-events-icon.svg",
    item: "Live Events",
    text: "Play exciting (limited time) opportunities to win unique prizes.",
  },
];

const Accordion: React.FC<AccordionProps> = ({ items = defaultItems }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.wrapper}>
      {/* Left / Top Section */}
      <div className={styles.leftSection}>
        <h2 className={styles.playText}>
          Multiple ways to play, one way to win
        </h2>
        <span className={styles.poweredBy}>
          Powered By{" "}
          <img
            src="/images/skillz-logo-horizontal.svg"
            alt="Skillz Logo"
            className={styles.skillzLogo}
          />
        </span>
      </div>
      {/* Accordion Section */}
      <div className={styles.items}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            <button
              className={styles.accordionButton}
              onClick={() => toggleAccordion(index)}
            >
              <span className={styles.label}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.item}
                    className={styles.icon}
                  />
                )}
                {item.item}
              </span>
              <span
                className={`${styles.accordionIcon} ${
                  openIndex === index ? styles.open : ""
                }`}
              >
                <img
                  src="/images/accordion-down-icon.svg"
                  alt="down icon"
                  className={styles.downIcon}
                />
              </span>
            </button>
            {openIndex === index && (
              <div className={styles.accordionContent}>
                <p>{item.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
