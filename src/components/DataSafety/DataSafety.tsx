import styles from "./DataSafety.module.scss";

const DataSafety = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Data Safety ➜</h2>
      <p className={styles.description}>
        Safety starts with understanding how developers collect and share your
        data. Data privacy and security practices may vary based on your use,
        region, and age. The developer provided this information and may update
        it over time.
      </p>
    </div>
  );
};

export default DataSafety;
