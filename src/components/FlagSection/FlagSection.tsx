import styles from "./FlagSection.module.scss";

const FlagSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        <img
          src="/images/US.png"
          alt="US Flag"
          loading="lazy"
          width="24"
          height="18"
        />
        <span className={styles.text}>United States(English)</span>
      </div>
    </div>
  );
};

export default FlagSection;
