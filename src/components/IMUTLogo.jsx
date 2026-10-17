import PropTypes from "prop-types";
import "../styles/IMUTLogo.css";

export const IMUTLogo = ({ size = 40, light = false }) => (
  <img
    src="/imut-logo.png"
    alt="IMUT Tours"
    className="imut-logo"
    style={{
      height: size,
      width: "auto",
      objectFit: "contain",
      display: "block",
      flexShrink: 0,
      marginTop: 5,
    }}
  />
);

IMUTLogo.propTypes = {
  size: PropTypes.number,
  light: PropTypes.bool,
};