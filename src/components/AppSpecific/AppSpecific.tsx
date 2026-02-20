import styles from "./AppSpecific.module.scss";

const AppSpecific = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.headingRow}>
        <h2 className={styles.title}>What&apos;s new ➜</h2>
      </div>

      <p className={styles.description}>
        If you like Spider, Freecell, Patience, Pyramid, Blackout, Big Run, 21
        Blitz, or Solitaire Cash, you&apos;ll LOVE Solitaire Skillz! You&apos;re matched
        with players of the same skill level to keep the gameplay 100% fast,
        fair, and fun!
      </p>

      <div className={styles.card}>
        <div className={styles.item}>
          <div className={styles.icon}>
            <img src="/images/share.png" />{" "}
          </div>
          <div>
            <p className={styles.itemTitle}>
              This app may share these data types with third parties
            </p>
            <p className={styles.itemSub}>
              Personal info, Messages and 3 others
            </p>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.icon}>
            <img src="/images/upload.png" />{" "}
          </div>
          <div>
            <p className={styles.itemTitle}>
              This app may collect these data types
            </p>
            <p className={styles.itemSub}>
              Location, Personal info and 6 others
            </p>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.icon}>
            <img src="/images/lock.png" />{" "}
          </div>
          <div>
            <p className={styles.itemTitle}>Data is encrypted in transit</p>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.icon}>
            <img src="/images/delete.png" />
          </div>
          <div>
            <p className={styles.itemTitle}>
              You can request that data be deleted
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSpecific;
