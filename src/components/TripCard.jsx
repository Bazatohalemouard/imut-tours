// ─── Trip Card Component ──────────────────────────────────────────────────────
import PropTypes from "prop-types";
import { useState } from "react";
import { colors } from "../theme/colors";
import { StarRating } from "./StarRating";
import { Badge } from "./Badge";

export const TripCard = ({ trip, setPage }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        border: `1px solid ${colors.sand}`,
        cursor: "pointer",
        transition: "all 0.25s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 48px rgba(61,31,31,0.12)" : "none",
        padding: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setPage("trips")}
      onKeyDown={(e) => e.key === "Enter" && setPage("trips")}
    >
      <div style={{ position: "relative", paddingBottom: "60%", overflow: "hidden" }}>
        <img
          src={trip.image}
          alt={trip.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {trip.badge && <Badge>{trip.badge}</Badge>}
          <span
            style={{
              background: "rgba(0,0,0,0.45)",
              color: "#fff",
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 9px",
              borderRadius: 99,
              backdropFilter: "blur(4px)",
            }}
          >
            {trip.country === "Both" ? "🇷🇼🇺🇬" : trip.country === "Rwanda" ? "🇷🇼" : "🇺🇬"}{" "}
            {trip.country}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            background: colors.gold,
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            padding: "5px 12px",
            borderRadius: 99,
          }}
        >
          ${trip.price.toLocaleString()}
        </div>
      </div>
      <div style={{ padding: "20px 20px 22px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: colors.gold,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          {trip.category}
        </div>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.brand,
            fontFamily: "'Playfair Display', serif",
            margin: "0 0 4px",
          }}
        >
          {trip.title}
        </h3>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "0 0 14px" }}>
          {trip.subtitle}
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 14,
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: "🕐", val: trip.duration },
            { icon: "👥", val: `${trip.groupSize} pax` },
            { icon: "🥾", val: trip.difficulty },
          ].map((m, i) => (
            <span key={i} style={{ fontSize: 12, color: colors.textMuted }}>
              {m.icon} {m.val}
            </span>
          ))}
        </div>
        <div
          style={{
            borderTop: `1px solid ${colors.sand}`,
            paddingTop: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <StarRating value={trip.rating} size={13} />
            <span style={{ fontSize: 12, color: colors.textMuted }}>
              {trip.rating} ({trip.reviews})
            </span>
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: colors.brand,
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            View Details
          </span>
        </div>
      </div>
    </button>
  );
};

TripCard.propTypes = {
  trip: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    badge: PropTypes.string,
    country: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    subtitle: PropTypes.string,
    duration: PropTypes.string,
    groupSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    difficulty: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
  }).isRequired,
  setPage: PropTypes.func.isRequired,
};

