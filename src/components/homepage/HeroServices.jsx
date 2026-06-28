import { useState } from "react";
import PropTypes from "prop-types";
import {
  IconTrekking,
} from "@tabler/icons-react";
import { SERVICES, HERO_COPY } from "../../api/datasets/herodata";

// ─── Keyframe injection (once, at module level) ───────────────────────────────
const STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%       { transform: translateX(-50%) translateY(7px); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

if (typeof document !== "undefined" && !document.getElementById("hero-keyframes")) {
  const tag = document.createElement("style");
  tag.id = "hero-keyframes";
  tag.textContent = STYLES;
  document.head.appendChild(tag);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Ambient background orbs — purely decorative */
const AmbientOrbs = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
    <div style={{
      position: "absolute", width: 520, height: 520,
      top: -120, right: -120, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(200,146,42,0.13) 0%, transparent 70%)",
    }} />
    <div style={{
      position: "absolute", width: 320, height: 320,
      bottom: 60, left: -80, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(200,146,42,0.08) 0%, transparent 70%)",
    }} />
    <div style={{
      position: "absolute", width: 280, height: 280,
      top: "12%", right: "6%", borderRadius: "50%",
      border: "1px solid rgba(200,146,42,0.18)",
    }} />
    <div style={{
      position: "absolute", width: 180, height: 180,
      top: "22%", right: "16%", borderRadius: "50%",
      border: "1px solid rgba(200,146,42,0.12)",
    }} />
  </div>
);

/** Section label in small all-caps gold */
const SectionLabel = ({ children }) => (
  <p style={{
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "rgba(255,255,255,0.3)",
    fontWeight: 500,
    marginBottom: 12,
  }}>
    {children}
  </p>
);

/** Single service card */
const ServiceCard = ({ service, setPage }) => {
  const [hovered, setHovered] = useState(false);

  const base = {
    background: service.isPrimary
      ? "rgba(200,146,42,0.12)"
      : "rgba(26,12,6,0.75)",
    border: service.isPrimary
      ? "1px solid rgba(200,146,42,0.65)"
      : "1px solid rgba(200,146,42,0.28)",
    borderRadius: 12,
    padding: "14px 13px",
    cursor: "pointer",
    textAlign: "left",
    transition: "border-color 0.2s, background 0.2s, transform 0.15s",
    transform: hovered ? "translateY(-3px)" : "translateY(0)",
    ...(hovered && !service.isPrimary
      ? { borderColor: "#C8921A", background: "rgba(200,146,42,0.1)" }
      : {}),
  };
  const Icon = service.icon;

  return (
    <button
      style={base}
      onClick={() => setPage("services", { id: service.id })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Go to ${service.name}`}
    >
      <Icon
        aria-hidden="true"
        className="mb-2 block h-6 w-6 text-[#E8B84B]"
        style={{ fontSize: 22, color: "#E8B84B", display: "block", marginBottom: 9 }}
      />
      <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: 4 }}>
        {service.name}
      </div>
      <div style={{
        fontSize: 10,
        color: service.isPrimary ? "#E8B84B" : "rgba(255,255,255,0.38)",
        letterSpacing: "0.03em",
        fontWeight: service.isPrimary ? 500 : 400,
      }}>
        {service.tagline}
      </div>
    </button>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isPrimary: PropTypes.bool.isRequired,
    page: PropTypes.string.isRequired,
  }).isRequired,
  setPage: PropTypes.func.isRequired,
};

/** Scroll indicator */
const ScrollIndicator = () => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      bottom: 28,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
      animation: "bounce 2.5s ease-in-out infinite",
    }}
  >
    <span style={{
      fontSize: 9,
      letterSpacing: "0.15em",
      color: "rgba(255,255,255,0.28)",
      textTransform: "uppercase",
    }}>
      Scroll
    </span>
    <div style={{
      width: 1,
      height: 36,
      background: "linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)",
    }} />
  </div>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────

/**
 * Hero section.
 *
 * Props:
 *   countries        – array of country objects (falls back to COUNTRIES from heroData)
 *   countriesLoading – show spinner while countries load
 *   setPage          – navigate to a named page
 *   fetchCountryFlag – (countryName: string) => flagImageUrl: string
 */
export const HeroServices = ({ countries, countriesLoading, setPage, fetchCountryFlag }) => {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        overflow: "hidden",
        background: "linear-gradient(150deg, #1a0c06 0%, #2e1510 45%, #3a2008 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Background image */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url('https://res.cloudinary.com/dht699doy/image/upload/v1782245381/karongi-island_a7za0o.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 0,
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(150deg, #1a0c06 10%, #2e1510cc 45%, #3a200899 100%)",
        zIndex: 1,
      }} />

      {/* All content */}
      <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <AmbientOrbs />

        <div style={{
          position: "relative",
          maxWidth: 1120,
          margin: "0 auto",
          padding: "clamp(48px,8vw,80px) clamp(16px,5vw,32px) clamp(80px,10vw,120px)",
          width: "100%",
        }}>

          {/* ── Headline ──────────────────────────────────────────────────── */}
          <h1 style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(36px,7vw,68px)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "20px 0 16px",
          }}>
            {HERO_COPY.headline}
            <br />
            <em style={{
              color: "#E8B84B",
              fontStyle: "italic",
              fontFamily: "'Dancing Script', cursive",
              fontWeight: 700,
            }}>
              {HERO_COPY.headlineEm}
            </em>
          </h1>

          {/* ── Subheadline ───────────────────────────────────────────────── */}
          <p style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.58)",
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: 36,
          }}>
            {HERO_COPY.subheadline}
          </p>

          {/* ── Services grid ─────────────────────────────────────────────── */}
          <SectionLabel>{HERO_COPY.servicesLabel}</SectionLabel>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 10,
            marginBottom: 32,
          }}>
            {SERVICES.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                setPage={setPage}
              />
            ))}
          </div>

          {/* ── Primary CTA row ───────────────────────────────────────────── */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
            <button
              onClick={() => setPage?.("trips")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#C8921A",
                color: "#fff",
                border: "none",
                padding: "14px 28px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                letterSpacing: "0.01em",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#d9a020";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#C8921A";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
               <IconTrekking
                aria-hidden="true"
                className="h-[18px] w-[18px]"
              />
              {HERO_COPY.ctaPrimary}
            </button>
          </div>
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
};

HeroServices.propTypes = {
  /** Runtime country data from API/CMS. Falls back to heroData.COUNTRIES if omitted or empty. */
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      stats: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
      ).isRequired,
      experiences: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  countriesLoading: PropTypes.bool,
  setPage: PropTypes.func.isRequired,
  fetchCountryFlag: PropTypes.func.isRequired,
};

HeroServices.defaultProps = {
  countries: [],
  countriesLoading: false,
};

export default HeroServices;