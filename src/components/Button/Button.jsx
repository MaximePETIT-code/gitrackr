import PropTypes from "prop-types";
import "./Button.scss";

export default function Button({
  external = false,
  url,
  children,
  type = "primary",
}) {
  return (
    <div className={`button button--${type}`}>
      <a
        href={url}
        target={external ? "_blank" : "null"}
        rel={external ? "noreferrer" : "null"}
      >
        {children}
      </a>
    </div>
  );
}

Button.propTypes = {
  external: PropTypes.bool,
  url: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
};
