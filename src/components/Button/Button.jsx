import PropTypes from "prop-types";
import "./Button.scss";

export default function Button({
  external = false,
  url,
  children,
  type = "primary",
  action = null,
  marginTop = "0",
  marginBottom = "0",
}) {
  const buttonStyle = {
    marginTop: marginTop,
    marginBottom: marginBottom,
  };

  if (action != null) {
    return (
      <div
        className={`button button--${type}`}
        onClick={action}
        style={buttonStyle}
      >
        <div className={"button__action"}>{children}</div>
      </div>
    );
  }
  return (
    <div className={`button button--${type}`}>
      <a
        href={url}
        target={external ? "_blank" : "null"}
        rel={external ? "noreferrer" : "null"}
        style={buttonStyle}
      >
        {children}
      </a>
    </div>
  );
}

Button.propTypes = {
  external: PropTypes.bool,
  url: PropTypes.string,
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  action: PropTypes.func,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
};
