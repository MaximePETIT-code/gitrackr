import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./MobileNavItem.module.scss";

export default function MobileNavItem({ title, path, icon }) {
  return (
    <li className={styles.navItem}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${styles.navItem__container} ${styles.active}`
            : styles.navItem__container
        }
        end
        to={`.${path}`}
      >
        <img src={icon} alt={title} />
        <div className={styles.navItem__title}>{title}</div>
      </NavLink>
    </li>
  );
}

MobileNavItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
