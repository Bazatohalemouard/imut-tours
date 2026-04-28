import { useState } from 'react';
import { colors } from '../theme/colors';
import { StarRating } from './StarRating';
import PropTypes from 'prop-types';

export const LocationCard = ({ loc }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      style={{
        display: "block",
        width: "100%",
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        border: `1px solid ${colors.sand}`,
        cursor: "pointer",
        transition: "all 0.25s",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(61,31,31,0.1)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "relative", paddingBottom: "56%", overflow: "hidden" }}>
        <img
          src={loc.image}
          alt={loc.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s",
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            background: "rgba(0,0,0,0.45)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 99,
            backdropFilter: "blur(4px)",
          }}
        >
          {loc.country_flag} {loc.country}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 14,
            right: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <h3
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                margin: 0,
                textShadow: "0 1px 6px rgba(0,0,0,0.4)",
              }}
            >
              {loc.name}
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 12,
                margin: "2px 0 0",
              }}
            >
              {loc.tagline}
            </p>
          </div>
        </div>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <StarRating value={loc.rating} size={13} />
          <span style={{ fontSize: 13, fontWeight: 600, color: colors.brand }}>
            {loc.rating}
          </span>
          <span style={{ fontSize: 12, color: colors.textMuted }}>
            ({loc.reviews} reviews)
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {loc.highlights.map((h, i) => (
            <span
              key={i}
              style={{
                background: colors.goldPale,
                color: colors.brand,
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 9px",
                borderRadius: 99,
                border: `1px solid rgba(200,146,42,0.2)`,
              }}
            >
              {h}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${colors.sand}`,
            paddingTop: 12,
          }}
        >
          <span style={{ fontSize: 12, color: colors.textMuted }}>
            🗓 Best: {loc.bestTime}
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: colors.gold,
            }}
          >
            Explore →
          </span>
        </div>
      </div>
    </button>
  );
};

LocationCard.propTypes = {
  loc: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    country_flag: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
    bestTime: PropTypes.string.isRequired,
  }).isRequired,
};