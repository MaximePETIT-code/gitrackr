import PropTypes from "prop-types";
import styles from "./TitleChart.module.scss";

export default function TitleChart({ children }) {
  return (
    <h2 className={styles.titleChart}>{children}</h2>
  );
}

TitleChart.propTypes = {
  children: PropTypes.node.isRequired,
};
