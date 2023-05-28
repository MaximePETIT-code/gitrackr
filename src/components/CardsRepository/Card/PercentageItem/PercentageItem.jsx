import styles from "./PercentageItem.module.scss";

export default function PercentageItem({ value, desciption, desciptionIcon }) {
  return (
    <>
      <div className={styles.percentage}>
        <div className={styles.percentage__container}>
          <div
            className={styles.percentage__value}
            style={{ width: value }}
          ></div>
        </div>

        <div className={styles.percentage__description}>
          <p>{desciption}</p>
          <img src={desciptionIcon} alt="contributor icon" />
        </div>
      </div>
    </>
  );
}
