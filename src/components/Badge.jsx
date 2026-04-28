import PropTypes from "prop-types";
import { colors} from "../theme/colors";
export const Badge = ({ children, variant = "gold" }) => {
  const styles = {
    gold: { bg: colors.gold, color: "#fff" },
    green: { bg: colors.jungle, color: "#fff" },
    mist: { bg: colors.mist, color: "#fff" },
  };
  const s = styles[variant] || styles.gold;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "3px 9px",
        borderRadius: 99,
      }}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["gold", "green", "mist"]),
};
