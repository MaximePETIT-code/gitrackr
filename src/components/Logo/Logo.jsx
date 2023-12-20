import logo from "./logo.svg";
import styles from "./Logo.module.scss";
import PropTypes from "prop-types";

const sizeConfig = {
  small: {
    imageSize: "34px",
    fontSize: "24px",
  },
  medium: {
    imageSize: "62px",
    fontSize: "48px",
  },
  large: {
    imageSize: "64px",
    fontSize: "64px",
  },
};

export default function Logo({ isTitle = true, size = "medium" }) {
  const TitleTag = isTitle ? "h1" : "span";
  const { imageSize, fontSize } = sizeConfig[size] || sizeConfig.medium;

  return (
    <div className={styles.logo}>
      <img
        className={styles.logo__icon}
        src={logo}
        alt="Logo of Gitrackr"
        style={{ width: imageSize }}
      />
      <TitleTag
        role="heading"
        aria-level="1"
        className={styles.logo__type}
        style={{ fontSize }}
      >
        Gitrackr
      </TitleTag>
    </div>
  );
}

Logo.propTypes = {
  isTitle: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
