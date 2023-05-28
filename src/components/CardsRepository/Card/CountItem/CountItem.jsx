import PropTypes from "prop-types";
import styles from "./CountItem.module.scss";

export default function CountItem({ icon, name, count }) {
  return (
    <div className={styles.item}>
      <div className={styles.item__container}>
        <div className={styles.item__icon}>
          <img src={icon} alt={`${name} icon`} />
        </div>
        <div className={styles.item__name}><p>{name}</p></div>
        <div className={styles.item__count}>{count}</div>
      </div>
    </div>
  );
}

CountItem.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
