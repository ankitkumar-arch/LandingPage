"use client";
import styles from "./RatingBar.module.scss";

interface RatingData {
  score: number;
  stars: number;
  ratings: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  tags: string[];
}

interface RatingBarProps {
  gameRating: number;
  tags: string[];
}

export default function RatingBar({ gameRating, tags }: RatingBarProps) {
  const score = gameRating || 4.8;
  const stars = Math.round(score);

  // Fake distribution for now (can improve later)
  const ratingsDistribution = {
    5: score >= 4.5 ? 85 : 60,
    4: 10,
    3: 3,
    2: 1,
    1: 1,
  };

  const renderStars = (count: number) => {
    return "★".repeat(count);
  };

  return (
    <div className={styles.ratingComponent}>
      <div className={styles.topSection}>
        <div className={styles.scoreBlock}>
          <div className={styles.number}>{score.toFixed(1)}</div>
          <div className={styles.stars}>{renderStars(stars)}</div>
        </div>

        <div className={styles.barsBlock}>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className={styles.barRow}>
              <span className={styles.starLabel}>{star}</span>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${ratingsDistribution[star as keyof typeof ratingsDistribution]}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
