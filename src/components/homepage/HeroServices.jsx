import { useState } from "react";
import PropTypes from "prop-types";
import { Spinner } from "../Spinner";
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

/** Destination pill button */
const DestinationPill = ({ country, isActive, onClick, fetchCountryFlag }) => {
  const [hovered, setHovered] = useState(false);
  const active = isActive || hovered;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => onClick(country.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "7px 15px",
        borderRadius: 99,
        border: active ? "1px solid #C8921A" : "1px solid rgba(200,146,42,0.28)",
        background: active ? "#C8921A" : "rgba(200,146,42,0.06)",
        color: active ? "#fff" : "rgba(255,255,255,0.6)",
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.18s ease",
        fontFamily: "inherit",
      }}
    >
      <img
        src={fetchCountryFlag(country.name)}
        alt={`${country.name} flag`}
        width={18}
        height={13}
        style={{ borderRadius: 2, flexShrink: 0, objectFit: "cover" }}
      />
      {country.name}
    </button>
  );
};

DestinationPill.propTypes = {
  country: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  fetchCountryFlag: PropTypes.func.isRequired,
};

/** Country detail card shown below the destination pills */
const CountryCard = ({ country, animKey, fetchCountryFlag, setPage }) => (
  <div
    key={animKey}
    role="tabpanel"
    style={{
      background: "rgba(26,12,6,0.82)",
      border: "1px solid rgba(200,146,42,0.55)",
      borderRadius: 14,
      padding: "clamp(18px,4vw,28px)",
      animation: "fadeUp 0.28s ease",
    }}
  >
    {/* Card header */}
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 14,
      flexWrap: "wrap",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={fetchCountryFlag(country.name)}
            alt={`${country.name} flag`}
            width={40}
            height={28}
            style={{ flexShrink: 0, borderRadius: 3, objectFit: "cover" }}
          />
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(20px,4vw,30px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
          }}>
            {country.name}
          </div>
        </div>
        <div style={{ fontSize: 13, color: "#E8B84B", fontStyle: "italic", marginTop: 6 }}>
          "{country.nickname}"
        </div>
      </div>

      {/* Quick-book CTA inside card */}
      <button
        onClick={() => setPage("trips")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(200,146,42,0.15)",
          border: "1px solid rgba(200,146,42,0.45)",
          borderRadius: 8,
          padding: "8px 14px",
          fontSize: 12,
          fontWeight: 600,
          color: "#E8B84B",
          cursor: "pointer",
          fontFamily: "inherit",
          whiteSpace: "nowrap",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(200,146,42,0.28)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(200,146,42,0.15)"}
      >
        <i className="ti ti-calendar-plus" aria-hidden="true" style={{ fontSize: 14 }} />
        Book this destination
      </button>
    </div>

    {/* Description */}
    <p style={{
      fontSize: 14,
      color: "rgba(255,255,255,0.62)",
      lineHeight: 1.7,
      margin: "0 0 20px",
      fontWeight: 300,
    }}>
      {country.desc}
    </p>

    {/* Stats */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
      gap: 10,
      marginBottom: 20,
    }}>
      {country.stats.map(s => (
        <div key={s.label} style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 10,
          padding: "12px 10px",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: "#E8B84B",
            lineHeight: 1,
            marginBottom: 5,
          }}>
            {s.num}
          </div>
          <div style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.42)",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            lineHeight: 1.3,
          }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>

    {/* Experiences */}
    <p className="hide-on-small" style={{
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "rgba(255,255,255,0.32)",
      marginBottom: 10,
      fontWeight: 500,
    }}>
      Experiences await
    </p>
    <div className="hide-on-small" style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {country.experiences.map(exp => (
        <button
          key={exp}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: "5px 11px",
            fontSize: 12,
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={e => Object.assign(e.currentTarget.style, {
            background: "rgba(200,146,42,0.18)",
            borderColor: "rgba(200,146,42,0.6)",
            color: "#E8B84B",
            transform: "translateY(-2px)",
          })}
          onMouseLeave={e => Object.assign(e.currentTarget.style, {
            background: "rgba(255,255,255,0.06)",
            borderColor: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
            transform: "translateY(0)",
          })}
          onClick={() => setPage("trips")}
        >
          <i className="ti ti-sparkles" aria-hidden="true" style={{ fontSize: 12 }} />
          {exp}
        </button>
      ))}
    </div>
  </div>
);

CountryCard.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    stats: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })).isRequired,
    experiences: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  animKey: PropTypes.number.isRequired,
  fetchCountryFlag: PropTypes.func.isRequired,
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
  // Merge: prefer runtime prop (CMS / API data), fall back to static data file
  const countryList = countries && countries.length > 0 ? countries : [];

  const [activeId, setActiveId] = useState(countryList[0]?.id ?? "rwanda");
  const [animKey, setAnimKey] = useState(0);

  const activeCountry = countryList.find(c => c.id === activeId);

  const handleDestinationSelect = (id) => {
    setActiveId(id);
    setAnimKey(k => k + 1);
  };

  const handleServiceClick = (page) => {
    setPage?.(page);
  };

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
        backgroundImage: "url('/images/img_placeholder.png')",
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
            fontFamily: "'Montserrat', sans-serif",
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
              <i className="ti ti-calendar-event" aria-hidden="true" style={{ fontSize: 16 }} />
              {HERO_COPY.ctaPrimary}
            </button>
          </div>

          {/* ── Divider ───────────────────────────────────────────────────── */}
          <div style={{
            width: "100%",
            height: 1,
            background: "linear-gradient(to right, rgba(200,146,42,0.35), transparent)",
            marginBottom: 28,
          }} />

          {/* ── Destination pills ─────────────────────────────────────────── */}
          <SectionLabel>{HERO_COPY.destinationsLabel}</SectionLabel>

          <div
            role="tablist"
            aria-label="Select a destination"
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}
          >
            {countriesLoading && <Spinner />}
            {!countriesLoading && countryList.map(country => (
              <DestinationPill
                key={country.id}
                country={country}
                isActive={country.id === activeId}
                onClick={handleDestinationSelect}
                fetchCountryFlag={fetchCountryFlag}
              />
            ))}
          </div>

          {/* ── Country detail card ───────────────────────────────────────── */}
          {activeCountry && (
            <CountryCard
              key={animKey}
              country={activeCountry}
              animKey={animKey}
              fetchCountryFlag={fetchCountryFlag}
              setPage={setPage}
            />
          )}
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