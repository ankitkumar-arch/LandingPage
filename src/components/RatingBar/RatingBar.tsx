'use client';
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
  data?: RatingData;
}

export default function RatingBar({ data }: RatingBarProps) {
  const defaultData: RatingData = {
    score: 4.8,
    stars: 5,
    ratings: {
      5: 92,
      4: 5,
      3: 2,
      2: 1,
      1: 0.5,
    },
    tags: ['#1 top grossing casual', 'Casual', 'Solitaire', 'Cardgame', 'Stylized'],
  };

  const ratingData = data || defaultData;

  const renderStars = (count: number) => {
    return '★'.repeat(count);
  };

  return (
    <div className={styles.ratingComponent}>
      <div className={styles.topSection}>
        <div className={styles.scoreBlock}>
          <div className={styles.number}>{ratingData.score}</div>
          <div className={styles.stars}>{renderStars(ratingData.stars)}</div>
        </div>
        <div className={styles.barsBlock}>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className={styles.barRow}>
              <span className={styles.starLabel}>{star}</span>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${
                      ratingData.ratings[
                        star as keyof typeof ratingData.ratings
                      ]
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tags}>
        {ratingData.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}