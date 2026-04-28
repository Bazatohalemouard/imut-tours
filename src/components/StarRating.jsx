// ─── Utility ─────────────────────────────────────────────────────────────────
import PropTypes from 'prop-types';
import { colors } from "../theme/colors";

export const StarRating = ({ value, size = 14 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        style={{
          fontSize: size,
          color: i <= Math.round(value) ? colors.gold : "#D4C9BB",
          lineHeight: 1,
        }}
      >
        ★
      </span>
    );
  }
  return <span style={{ letterSpacing: "-1px" }}>{stars}</span>;
};

StarRating.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.number,
};