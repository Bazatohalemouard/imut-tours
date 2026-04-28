import PropTypes from "prop-types";
import { colors } from "../theme/colors";

// ─── Logo Component ───────────────────────────────────────────────────────────
export const IMUTLogo = ({ size = 40, light = false }) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 10, userSelect: "none" }}
  >
    <div
      style={{
        width: size,
        height: size,
        background: light ? "rgba(255,255,255,0.15)" : colors.brand,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: size * 0.42,
          fontWeight: 900,
          color: light ? "#fff" : colors.goldLight,
          fontFamily: "'Playfair Display', serif",
          letterSpacing: "-1px",
        }}
      >
        IM
      </span>
    </div>
    <div>
      <div
        style={{
          fontSize: size * 0.38,
          fontWeight: 700,
          color: light ? "#fff" : colors.brand,
          letterSpacing: "0.04em",
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1.1,
        }}
      >
        IMUT Tours
      </div>
      <div
        style={{
          fontSize: size * 0.22,
          color: light
            ? "rgba(255,255,255,0.7)"
            : colors.textMuted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        East Africa Adventures
      </div>
    </div>
  </div>
);

IMUTLogo.propTypes = {
  size: PropTypes.number,
  light: PropTypes.bool,
};
