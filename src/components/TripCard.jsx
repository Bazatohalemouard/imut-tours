// ─── Trip Card Component ───────────────────────────────────────────────────
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
 * Card layout, top to bottom:
 *   1. Image — fixed 4:3 aspect-ratio, always first, always the same
 *      shape. Because nothing above it can vary in height, every card
 *      in a row lines its image up identically regardless of title or
 *      category length.
 *   2. Category — single line, truncated ("Wildlife +2" if there are
 *      several). Always visible.
 *   3. Title — never clipped or ellipsized; it wraps to as many lines
 *      as it needs, with font-size stepping down at smaller
 *      breakpoints so long titles stay readable without being cut.
 *      Always visible (card height simply varies with title length).
 *   4. Subtitle — full 2-line description, hidden on mobile, shown
 *      from the sm breakpoint up.
 *   5. Meta — on mobile, duration/difficulty are swapped out for a
 *      single clipped line of the description instead (more useful
 *      at a glance than "5 Days" alone on a very narrow card). From
 *      sm up, duration + difficulty return as icon+label pairs, with
 *      group size added at lg.
 *   6. Footer — a chevron affordance always shown; the card itself is
 *      the tap target, so a repeated "More details" label is only
 *      added back in on large screens as a design nicety.
 *
 * Hover/focus motion is handled with plain CSS instead of JS state,
 * which is why `hovered` was removed — one less re-render, and it
 * behaves correctly for both mouse and keyboard focus for free.
 */

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.setAttribute("data-trip-card", "true");
  style.textContent = `
    .tc-card {
      appearance: none;
      -webkit-appearance: none;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: column;
      text-align: left;
      font: inherit;
      background: #fff;
      border-radius: 14px;
      border: 1px solid ${colors.sand};
      padding: 0;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }

    .tc-card:hover,
    .tc-card:focus-visible {
      transform: translateY(-4px);
      box-shadow: 0 14px 30px rgba(22, 48, 42, 0.14);
      border-color: transparent;
    }

    .tc-card:focus-visible {
      outline: 2px solid ${colors.gold};
      outline-offset: 2px;
    }

    /* ── Image ────────────────────────────────────────────────── */

    .tc-image-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      background: ${colors.sand}33;
      flex-shrink: 0;
    }

    .tc-image-blur,
    .tc-image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .tc-image-blur {
      filter: blur(10px);
      transform: scale(1.06);
    }

    .tc-image {
      opacity: 0;
      transition: opacity 0.35s ease, transform 0.45s ease;
    }

    .tc-image.is-loaded {
      opacity: 1;
    }

    .tc-card:hover .tc-image,
    .tc-card:focus-visible .tc-image {
      transform: scale(1.05);
    }

    .tc-image-scrim {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.32) 0%, transparent 40%);
      pointer-events: none;
    }

    .tc-badge-wrap {
      display: inline-block;
      transform: scale(0.7);
      transform-origin: top left;
    }

    @media (min-width: 480px) {
      .tc-badge-wrap { transform: scale(0.85); }
    }

    @media (min-width: 640px) {
      .tc-badge-wrap { transform: scale(1); }
    }

    .tc-chip-row {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 6px;
    }

    .tc-country-chip {
      display: flex;
      align-items: center;
      gap: 5px;
      background: rgba(0,0,0,0.45);
      color: #fff;
      font-size: 10px;
      font-weight: 600;
      padding: 3px;
      border-radius: 99px;
      backdrop-filter: blur(4px);
      flex-shrink: 0;
    }

    .tc-country-chip img,
    .tc-country-chip span.tc-flag-fallback {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
    }

    .tc-country-name {
      display: none;
      padding-right: 3px;
      white-space: nowrap;
    }

    @media (min-width: 480px) {
      .tc-country-chip { padding: 3px 8px 3px 3px; }
      .tc-country-name { display: inline; }
    }

    /* ── Body ─────────────────────────────────────────────────── */

    .tc-body {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 10px 10px 10px;
    }

    @media (min-width: 640px) {
      .tc-body { padding: 14px 14px 14px; }
    }

    @media (min-width: 1024px) {
      .tc-body { padding: 16px 18px 16px; }
    }

    .tc-category {
      font-family: 'Nunito', sans-serif;
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: ${colors.gold};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 0 4px;
    }

    @media (min-width: 640px) {
      .tc-category { font-size: 10.5px; margin-bottom: 5px; }
    }

    @media (min-width: 1024px) {
      .tc-category { font-size: 11.5px; margin-bottom: 6px; }
    }

    .tc-title {
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      color: ${colors.brand};
      margin: 0 0 6px;
      font-size: 13px;
      line-height: 1.3;
      /* Intentionally not clamped/truncated — titles wrap in full,
         font-size steps down at smaller breakpoints instead. */
    }

    @media (min-width: 480px) {
      .tc-title { font-size: 13.5px; }
    }

    @media (min-width: 640px) {
      .tc-title { font-size: 15px; margin-bottom: 8px; }
    }

    @media (min-width: 1024px) {
      .tc-title { font-size: 16.5px; }
    }

    .tc-mobile-desc {
      display: block;
      font-size: 10.5px;
      line-height: 1.4;
      color: ${colors.textMuted};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: auto;
      padding-top: 6px;
    }

    @media (min-width: 640px) {
      .tc-mobile-desc { display: none; }
    }

    .tc-subtitle {
      display: none;
      color: ${colors.textMuted};
      margin: 0 0 8px;
    }

    @media (min-width: 640px) {
      .tc-subtitle {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 12px;
        line-height: 1.4;
        min-height: 2.8em;
      }
    }

    @media (min-width: 1024px) {
      .tc-subtitle { font-size: 13px; }
    }

    .tc-meta-row {
      display: none;
      align-items: center;
      gap: 8px;
      margin-top: auto;
      padding-top: 6px;
    }

    @media (min-width: 640px) {
      .tc-meta-row { display: flex; gap: 12px; padding-top: 8px; }
    }

    .tc-meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      color: ${colors.textMuted};
      white-space: nowrap;
    }

    .tc-meta-item img {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    @media (min-width: 640px) {
      .tc-meta-item { font-size: 11px; gap: 5px; }
      .tc-meta-item img { width: 13px; height: 13px; }
    }

    @media (min-width: 1024px) {
      .tc-meta-item { font-size: 12px; }
      .tc-meta-item img { width: 14px; height: 14px; }
    }

    .tc-meta-secondary {
      display: none;
    }

    @media (min-width: 1024px) {
      .tc-meta-secondary { display: flex; }
    }

    .tc-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
      margin-top: 10px;
    }

    .tc-cta-text {
      display: none;
      font-size: 12.5px;
      font-weight: 700;
      color: ${colors.brand};
    }

    @media (min-width: 1024px) {
      .tc-cta-text { display: inline; }
    }

    .tc-chevron {
      flex-shrink: 0;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: ${colors.sand}55;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
    }

    .tc-card:hover .tc-chevron,
    .tc-card:focus-visible .tc-chevron {
      background: ${colors.gold};
    }

    .tc-card:hover .tc-chevron svg,
    .tc-card:focus-visible .tc-chevron svg {
      stroke: #fff;
    }
  `;
  document.head.appendChild(style);
}

const fetchCountryFlag = (country) => {
  if (country === "Rwanda") return rwandaFlag;
  if (country === "Uganda") return ugandaFlag;
  if (country === "Tanzania") return tanzaniaFlag;
  if (country === "Burundi") return burundiFlag;
  if (country === "Kenya") return kenyaFlag;
  if (country === "South Sudan") return southSudanFlag;
  return "";
};

// Keeps the category line to a single row regardless of how many
// categories a trip has: "Wildlife" or "Wildlife +2".
const formatCategory = (category) => {
  if (!Array.isArray(category)) return category;
  if (category.length <= 1) return category[0] ?? "";
  return `${category[0]} +${category.length - 1}`;
};

export const TripCard = ({ trip }) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  if (typeof document !== "undefined") injectStyles();

  const flag = fetchCountryFlag(trip.country);

  return (
    <button
      type="button"
      className="tc-card"
      onClick={() => navigate(`/trips/${trip.id}`)}
    >
      {/* Image — always the first element, fixed aspect-ratio, so it
          lines up identically across every card in the row */}
      <div className="tc-image-wrap">
        <img
          src="/images/img_placeholder.png"
          alt=""
          aria-hidden="true"
          className="tc-image-blur"
        />
        <img
          src={trip.image}
          alt={trip.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`tc-image${loaded ? " is-loaded" : ""}`}
        />
        <div className="tc-image-scrim" aria-hidden="true" />

        <div className="tc-chip-row">
          {trip.badge ? (
            <span className="tc-badge-wrap">
              <Badge>{trip.badge}</Badge>
            </span>
          ) : (
            <span />
          )}
          <span className="tc-country-chip">
            {flag ? (
              <img src={flag} alt="" />
            ) : (
              <span className="tc-flag-fallback" style={{ background: "rgba(255,255,255,0.3)" }} />
            )}
            <span className="tc-country-name">{trip.country}</span>
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="tc-body">
        <p className="tc-category">{formatCategory(trip.category)}</p>
        <h3 className="tc-title">{trip.title}</h3>

        {trip.subtitle && <p className="tc-mobile-desc">{trip.subtitle}</p>}
        {trip.subtitle && <p className="tc-subtitle">{trip.subtitle}</p>}

        <div className="tc-meta-row">
          <span className="tc-meta-item">
            <img src={clockIcon} alt="" />
            {trip.duration}
          </span>
          <span className="tc-meta-item">
            <img src={difficultyIcon} alt="" />
            {trip.difficulty}
          </span>
          <span className="tc-meta-item tc-meta-secondary">
            <img src={groupIcon} alt="" />
            {trip.groupSize} pax
          </span>
        </div>

        <div className="tc-footer">
          <span className="tc-cta-text">View trip</span>
          <span className="tc-chevron" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.brand} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s ease" }}>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
};

TripCard.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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