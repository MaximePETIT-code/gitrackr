import PropTypes from "prop-types";
import styles from "./Cards.module.scss";
import ArrowUpIcon from "../../../constants/Icons/ArrowUpIcon.svg";
import ArrowDownIcon from "../../../constants/Icons/ArrowDownIcon.svg";

export default function Card({ title, value, percentage = null }) {
  return (
    <div className={styles.card}>
      <div className={styles.card__left}>
        <h2 className={styles.card__title}>{title}</h2>
        <h3 className={styles.card__value}>{value}</h3>
      </div>
      {percentage && (
        <div className={styles.card__right}>
          <img
            className={styles.card__arrow}
            src={percentage > 0 ? ArrowUpIcon : ArrowDownIcon}
            alt={percentage > 0 ? "Arrow Up" : "Arrow Down"}
          />

          <span className={styles.card__percentage}>{percentage}%</span>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  percentage: PropTypes.string,
};
