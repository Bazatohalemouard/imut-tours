import PropTypes from "prop-types";

// ─── Logo Component ───────────────────────────────────────────────────────────
export const IMUTLogo = ({ size = 40 }) => (
  <img
    src="/imut-logo.png"
    alt="IMUT Tours"
    style={{
      height: size,
      width: "auto",
      objectFit: "contain",
      display: "block",
      flexShrink: 0,
    }}
  />
);

IMUTLogo.propTypes = {
  size: PropTypes.number,
};