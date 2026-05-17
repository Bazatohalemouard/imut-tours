// ─── Trip Card Component ──────────────────────────────────────────────────────
import PropTypes from "prop-types";
import { useState } from "react";
import { colors } from "../theme/colors";
import { StarRating } from "./StarRating";
import { Badge } from "./Badge";
import rwandaFlag from "../assets/flags/rwanda.png";
import ugandaFlag from "../assets/flags/uganda.png";
import tanzaniaFlag from "../assets/flags/tanzania.png";
import burundiFlag from "../assets/flags/burundi.png";
import kenyaFlag from "../assets/flags/kenya.png";
import southSudanFlag from "../assets/flags/south-sudan.png";
import clockIcon from "../assets/icons/clock.png";
import groupIcon from "../assets/icons/group-users.png";
import difficultyIcon from "../assets/icons/challenge.png";

export const TripCard = ({ trip, setPage, setSelectedTrip }) => {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchCountryFlag = (country) => {
    if (country === "Rwanda") return rwandaFlag;
    if (country === "Uganda") return ugandaFlag;
    if (country === "Tanzania") return tanzaniaFlag;
    if (country === "Burundi") return burundiFlag;
    if (country === "Kenya") return kenyaFlag;
    if (country === "South Sudan") return southSudanFlag;
    return "";
  }

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
      onClick={() => setPage("trip-detail", trip)}
      onKeyDown={(e) => e.key === "Enter" && setPage("trips")}
    >
      <div style={{ position: "relative", paddingBottom: "60%", overflow: "hidden" }}>
        <img
          src={`/images/img_placeholder.png`}
          alt={`${trip.title} placeholder`}
          aria-hidden
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", filter: "blur(12px)", transform: "scale(1.05)"
          }}
        />
        <img
          src={trip.image}
          alt={trip.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: loaded ? 1 : 0,
            objectFit: "cover",
            transition: "opacity 0.4s, transform 0.5s",
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
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(0,0,0,0.45)",
              color: "#fff",
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 9px",
              borderRadius: 99,
              backdropFilter: "blur(4px)",
            }}
          >

            {fetchCountryFlag(trip.country) ? (
              <img
                src={fetchCountryFlag(trip.country)}
                alt={trip.country}
                style={{ width: 16, height: 16, borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                }}
              >
              </span>
            )}
            {trip.country}
          </span>
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
          {Array.isArray(trip.category)
            ? trip.category.join(", ")
            : trip.category}
        </div>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.brand,
            fontFamily: "'Montserrat', sans-serif",
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
            { icon: clockIcon, val: trip.duration },
            { icon: groupIcon, val: `${trip.groupSize} pax` },
            { icon: difficultyIcon, val: trip.difficulty },
          ].map((m, i) => (<>
            <img
              src={m.icon}
              alt={m.val}
              style={{ width: 16, height: 16, borderRadius: "50%", objectFit: "cover" }}
            />
            <span key={i} style={{ fontSize: 12, color: colors.textMuted }}>
              {m.val}
            </span>
          </>
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
          {/* <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <StarRating value={trip.rating} size={13} />
            <span style={{ fontSize: 12, color: colors.textMuted }}>
              {trip.rating} ({trip.reviews})
            </span>
          </div> */}
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
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
    subtitle: PropTypes.string,
    duration: PropTypes.string,
    groupSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    difficulty: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
  }).isRequired,
  setPage: PropTypes.func.isRequired,
};

