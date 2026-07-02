// ─── Trip Card Component (Safari-Inspired Abstract Visual System) ─────────
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../theme/colors";
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

/**
 * ── Design system notes ─────────────────────────────────────────────────
 * Every decorative element below is grounded in one idea: a game-drive at
 * golden hour. Instead of generic dots/blobs, the card now carries three
 * coordinated marks, all built from the existing color tokens only:
 *
 *  1. SIGNATURE — "Acacia Horizon": a low-opacity sunburst + acacia-tree
 *     silhouette sitting in the header corner, the single bold moment.
 *  2. "Migration trail": a dotted route line with waypoint marks replaces
 *     the old wavy contour paths over the image — reads as a map/GPS track.
 *  3. "Beadwork trim": a thin zig-zag (triangle) strip borrowed from East
 *     African beadwork patterns, used sparingly as a footer divider instead
 *     of a flat rule.
 *
 * Restraint: only #1 is bold. #2 and #3 stay quiet so the photo still leads.
 */

const AcaciaHorizonMark = ({ gold, hovered }) => (
  <svg
    width="110"
    height="110"
    viewBox="0 0 110 110"
    style={{
      position: "absolute",
      top: -14,
      right: -14,
      pointerEvents: "none",
      zIndex: 1,
    }}
  >
    <g
      style={{
        transformOrigin: "88px 22px",
        transform: hovered ? "rotate(14deg)" : "rotate(0deg)",
        transition: "transform 0.6s ease",
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const x2 = 88 + Math.cos(angle) * 34;
        const y2 = 22 + Math.sin(angle) * 34;
        return (
          <line
            key={i}
            x1={88 + Math.cos(angle) * 18}
            y1={22 + Math.sin(angle) * 18}
            x2={x2}
            y2={y2}
            stroke={gold}
            strokeWidth="1"
            opacity="0.22"
          />
        );
      })}
      <circle cx="88" cy="22" r="15" fill={gold} opacity="0.14" />
    </g>
    {/* Acacia silhouette on the horizon */}
    <g opacity="0.28">
      <line x1="0" y1="62" x2="110" y2="62" stroke={gold} strokeWidth="0.75" opacity="0.5" />
      <path
        d="M46 62 L50 40 L48 40 L52 26 L54 34 L58 20 L60 34 L64 26 L62 40 L60 40 L64 62 Z"
        fill={gold}
      />
      <line x1="55" y1="62" x2="55" y2="40" stroke={gold} strokeWidth="1.5" />
    </g>
  </svg>
);

const MigrationTrail = ({ gold, sand }) => (
  <svg
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "34%",
      zIndex: 3,
      pointerEvents: "none",
    }}
    viewBox="0 0 400 120"
    preserveAspectRatio="none"
  >
    <path
      id="trailPath"
      d="M-10,70 Q90,30 180,72 T410,50"
      fill="none"
      stroke={sand}
      strokeWidth="1"
      strokeDasharray="1 9"
      strokeLinecap="round"
      opacity="0.55"
    />
    {[0.08, 0.3, 0.52, 0.74, 0.94].map((t, i) => {
      // approximate points along the quadratic path for waypoint dots
      const x = -10 + t * 420;
      const y = 70 - Math.sin(t * Math.PI) * 28;
      return <circle key={i} cx={x} cy={y} r="2.2" fill={gold} opacity="0.5" />;
    })}
  </svg>
);

const BeadworkTrim = ({ gold, sand }) => (
  <div
    style={{
      height: 6,
      width: "100%",
      backgroundImage: `linear-gradient(45deg, ${gold} 25%, transparent 25%), linear-gradient(-45deg, ${sand} 25%, transparent 25%)`,
      backgroundSize: "12px 12px",
      backgroundPosition: "0 0, 0 0",
      opacity: 0.5,
    }}
  />
);

export const TripCard = ({ trip }) => {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const fetchCountryFlag = (country) => {
    if (country === "Rwanda") return rwandaFlag;
    if (country === "Uganda") return ugandaFlag;
    if (country === "Tanzania") return tanzaniaFlag;
    if (country === "Burundi") return burundiFlag;
    if (country === "Kenya") return kenyaFlag;
    if (country === "South Sudan") return southSudanFlag;
    return "";
  };

  return (
    <button
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        border: `1px solid ${colors.sand}`,
        outline: hovered ? `1px solid ${colors.gold}33` : "1px solid transparent",
        outlineOffset: 3,
        cursor: "pointer",
        transition: "all 0.25s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 48px rgba(61,31,31,0.12)" : "none",
        padding: 0,
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/trips/${trip.id}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/trips/${trip.id}`)}
    >
      {/* Header */}
      <div style={{ padding: "10px 20px 10px", position: "relative", overflow: "hidden" }}>
        <AcaciaHorizonMark gold={colors.gold} hovered={hovered} />
        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: colors.brand,
            fontFamily: "'Nunito', sans-serif",
            margin: "0 0 4px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {trip.title}
        </h3>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "'Nunito', sans-serif",
            color: colors.gold,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 6,
            position: "relative",
            zIndex: 2,
          }}
        >
          {Array.isArray(trip.category)
            ? trip.category.join(", ")
            : trip.category}
        </div>
      </div>

      {/* Image Section */}
      <div style={{ position: "relative", paddingBottom: "60%", overflow: "hidden" }}>
        <img
          src={`/images/img_placeholder.png`}
          alt={`${trip.title} placeholder`}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(12px)",
            transform: "scale(1.05)",
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
              />
            )}
            {trip.country}
          </span>
        </div>

        <MigrationTrail gold={colors.gold} sand={colors.sand} />
      </div>

      {/* Details Section */}
      <div style={{ padding: "20px 20px 22px" }}>
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
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img
                src={m.icon}
                alt={m.val}
                style={{ width: 16, height: 16, borderRadius: "50%", objectFit: "cover" }}
              />
              <span style={{ fontSize: 12, color: colors.textMuted }}>
                {m.val}
              </span>
            </div>
          ))}
        </div>

        <BeadworkTrim gold={colors.gold} sand={colors.sand} />

        <div
          style={{
            paddingTop: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: colors.brand,
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            More Details
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
};