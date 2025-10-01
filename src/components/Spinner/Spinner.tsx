import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div className={styles.ldsSpinner} style={{ color: "#0d6efd" }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i}></div>
      ))}
    </div>
  );
};

export default Spinner;
