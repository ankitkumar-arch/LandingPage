import React from "react";
import styles from "./RatingsAndReviews.module.scss";
import RatingBar from "../RatingBar/RatingBar";
import DataSafety from "../DataSafety/DataSafety";
import DeveloperSection from "../DeveloperSection/DeveloperSection";

const reviews = [
  {
    name: "Chloe Jane",
    initial: "C",
    stars: 5,
    date: "March 09, 2025",
    text: "I’ve played a lot of solitaire games but this one feels like the only genuine one out there! It’s nice that you always play against real people and I’ve already made a withdrawal less than a week after playing. Customer service are very helpful and respond quickly. It’s 5 stars from me!",
    helpful: 55,
  },
  {
    name: "Los Pebes rb",
    initial: "L",
    stars: 4,
    date: "August 14th, 2025",
    text: "Having a great time on this game, looking forward to the the tournament! Join in the fun & show off your Skillz, so far I have made of good progress and I was able to withdraw quickly!",
    helpful: 57,
  },
  {
    name: "Gelfetch07",
    initial: "G",
    stars: 5,
    date: "Sep 20, 2025",
    text: "I love the Skillz games! Solitaire is a trusted company with a stack of great games! Monitors are always helpful and games are fun! I don’t play many game but when I do, I play Skillz games!!",
    helpful: 54,
  },
  {
    name: "Maclara@NY",
    initial: "M",
    stars: 4,
    date: "April 09, 2025",
    text: "I love playing solitaire! If I had a stressful day I will play to take my mind off it. It’s nice to win a few bucks here and there but playing for free is fun too!",
    helpful: 52,
  },
  {
    name: "Rodger1989",
    initial: "R",
    stars: 5,
    date: "Feb 09, 2025",
    text: "The best solitaire game on Skillz. Just needs to keep building up the users to make matching faster.",
    helpful: 60,
  },
  {
    name: "Joyinabasket",
    initial: "J",
    stars: 4,
    date: "April 09, 2025",
    text: "This game is so much fun. I love that it actually feels like I’m playing against people at my skill level, which makes it so exciting. The best part is you can win real money while enjoying a game of solitaire! The app is super clean and easy to use too.",
    helpful: 50,
  },
];

interface Reviews {
  name: string;
  text: string;
  rating: number;
  gameName: string;
  gameDesc: string;
  gameRating: number;
  gameGenres: string[];
}

const RatingsAndReviews = ({
  gameName,
  gameDesc,
  reviews,
  gameRating,
  gameGenres,
}: {
  gameName: string;
  gameDesc: string;
  reviews: Reviews[];
  gameRating: number;
  gameGenres: string[];
}) => {
  function cleanDescription(text: string) {
    if (!text) return "";

    const keywords = ["KEY FEATURES", "Features:", "Contact", "support@"];

    let cutIndex = text.length;

    keywords.forEach((keyword) => {
      const index = text.indexOf(keyword);
      if (index !== -1 && index < cutIndex) {
        cutIndex = index;
      }
    });

    return text.substring(0, cutIndex).trim();
  }

  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.mainContent}>
          <div className={styles.gameText}>
            <span className={styles.title}>
              Love {gameName} We&apos;ve got you covered! ➜
            </span>
            <div className={styles.subTitle}>
              Compete against other players in tournaments and WIN REAL MONEY!
            </div>
            <p className={styles.gameDetailText}>
              {cleanDescription(gameDesc)}
            </p>
          </div>

          <RatingBar gameRating={gameRating} tags={gameGenres} />

          <DataSafety />

          <section className={styles.wrapper}>
            <h2 className={styles.heading}>Rating & Reviews ➜</h2>

            {reviews.map((rev, i) => {
              const avatarColors = [
                "#3b82f6",
                "#22c55e",
                "#f97316",
                "#a855f7",
                "#ef4444",
                "#14b8a6",
                "#8b5cf6",
              ];

              const avatarColor =
                avatarColors[Math.abs(rev.name.length % avatarColors.length)];

              // ✅ Auto-generate initial
              const initial = rev.name.charAt(0).toUpperCase();

              // ✅ Auto-generate random helpful count
              const helpful = Math.floor(Math.random() * 40) + 20;

              // ✅ Auto-generate realistic past date (within last 6 months)
              const randomDaysAgo = Math.floor(Math.random() * 180);
              const dateObj = new Date();
              dateObj.setDate(dateObj.getDate() - randomDaysAgo);

              const formattedDate = dateObj.toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              });

              return (
                <div key={i} className={styles.reviewCard}>
                  <div className={styles.row}>
                    <div
                      className={styles.avatar}
                      style={{ backgroundColor: avatarColor }}
                    >
                      {initial}
                    </div>

                    <div>
                      <p className={styles.name}>{rev.name}</p>
                    </div>
                  </div>

                  <div className={styles.starsRow}>
                    {Array(rev.rating)
                      .fill(0)
                      .map((_, idx) => (
                        <span
                          key={`filled-${idx}`}
                          className={styles.starFilled}
                        >
                          ★
                        </span>
                      ))}

                    {Array(5 - rev.rating)
                      .fill(0)
                      .map((_, idx) => (
                        <span key={`empty-${idx}`} className={styles.starEmpty}>
                          ☆
                        </span>
                      ))}

                    <span className={styles.date}>{formattedDate}</span>
                  </div>

                  <p className={styles.text}>{rev.text}</p>

                  <p className={styles.helpful}>
                    {helpful.toLocaleString()} people found this review helpful
                  </p>
                </div>
              );
            })}
          </section>
        </div>

        <aside className={styles.sidebar}>
          <DeveloperSection />
        </aside>
      </div>
    </>
  );
};

export default RatingsAndReviews;
