import logo from "./logo.svg";
import styles from "./Logo.module.scss";
import PropTypes from "prop-types";

export default function Logo({ isTitle = true }) {
  const TitleTag = isTitle ? "h1" : "span";

  return (
    <div className={styles.logo}>
      <img className={styles.logo__icon} src={logo} alt="Logo of Gitrackr" />
      <TitleTag role="heading" aria-level="1" className={styles.logo__type}>Gitrackr</TitleTag>
    </div>
  );
}

Logo.propTypes = {
  isTitle: PropTypes.bool,
};

