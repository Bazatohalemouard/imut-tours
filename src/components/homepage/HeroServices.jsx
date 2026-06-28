import { useState } from "react";
import PropTypes from "prop-types";
import { IconTrekking } from "@tabler/icons-react";
import { SERVICES, HERO_COPY } from "../../api/datasets/herodata";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@300;400;500;600;700&display=swap');

  :root {
    --htw-dusk: #2A130A;
    --htw-clay: #8C3F1F;
    --htw-sunset: #2D5A27;
    --htw-sunset-hi: #4A8C41;
    --htw-gold: #F2B705;
    --htw-acacia: #4F6B4A;
    --htw-acacia-hi: #5C7D56;
    --htw-sand: #FBF1E4;
    --htw-ink: #3A1C10;
  }

  @keyframes htw-fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes htw-bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%       { transform: translateX(-50%) translateY(7px); }
  }

  .htw-anim-1, .htw-anim-2, .htw-anim-3, .htw-anim-4 {
    opacity: 0;
    animation: htw-fadeUp 0.7s ease-out forwards;
  }
  .htw-anim-1 { animation-delay: 0.05s; }
  .htw-anim-2 { animation-delay: 0.16s; }
  .htw-anim-3 { animation-delay: 0.27s; }
  .htw-anim-4 { animation-delay: 0.38s; }

  .htw-bounce { animation: htw-bounce 2.5s ease-in-out infinite; }

  .htw-scrollbar-hide::-webkit-scrollbar { display: none; }
  .htw-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

  @media (prefers-reduced-motion: reduce) {
    .htw-anim-1, .htw-anim-2, .htw-anim-3, .htw-anim-4 { animation: none; opacity: 1; }
    .htw-bounce { animation: none; }
  }
`;

if (typeof document !== "undefined" && !document.getElementById("tours-hero-styles")) {
  const tag = document.createElement("style");
  tag.id = "tours-hero-styles";
  tag.textContent = STYLES;
  document.head.appendChild(tag);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Ambient background glow — purely decorative, tuned to the warm palette */
const AmbientOrbs = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        width: 560,
        height: 560,
        top: -140,
        right: -140,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(242,183,5,0.16) 0%, transparent 70%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 340,
        height: 340,
        bottom: 40,
        left: -90,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,121,42,0.14) 0%, transparent 70%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 260,
        height: 260,
        top: "14%",
        right: "8%",
        borderRadius: "50%",
        border: "1px solid rgba(242,183,5,0.2)",
      }}
    />
  </div>
);

/** Eyebrow / section label in small all-caps gold-sand */
const SectionLabel = ({ children }) => (
  <p
    style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      color: "rgba(255,248,238,0.78)",
      fontWeight: 600,
      marginBottom: 14,
    }}
  >
    {children}
  </p>
);

/** Single service card — a solid "waypoint" card. Deliberately opaque:
 *  small text on a translucent tile over a photo is exactly what was
 *  unreadable before, so this card carries its own contrast instead of
 *  borrowing it from whatever's behind the hero. */
const ServiceCard = ({ service, setPage }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  const cardStyle = {
    background: service.isPrimary ? "#FFF8EC" : "var(--htw-sand)",
    border: service.isPrimary
      ? "1.5px solid var(--htw-sunset)"
      : `1.5px solid ${hovered ? "var(--htw-sunset)" : "rgba(58,28,16,0.12)"}`,
    borderRadius: 14,
    padding: "16px 14px",
    cursor: "pointer",
    textAlign: "left",
    transition: "border-color 0.2s, box-shadow 0.2s, transform 0.15s",
    transform: hovered ? "translateY(-3px)" : "translateY(0)",
    boxShadow: hovered
      ? "0 10px 22px rgba(20,8,4,0.28)"
      : "0 4px 12px rgba(20,8,4,0.18)",
    width: "100%",
    height: "100%",
  };

  return (
    <button
      type="button"
      style={cardStyle}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8792A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A130A]"
      onClick={() => setPage("services", { id: service.id })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`Go to ${service.name}`}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 34,
          height: 34,
          borderRadius: 9,
          background: "rgba(232,121,42,0.14)",
          marginBottom: 10,
        }}
      >
        <Icon aria-hidden="true" size={18} style={{ color: "var(--htw-sunset)" }} />
      </span>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13.5,
          fontWeight: 700,
          color: "var(--htw-ink)",
          lineHeight: 1.25,
          marginBottom: 4,
        }}
      >
        {service.name}
      </div>
      <div className="hide-on-small"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          color: "var(--htw-acacia)",
          letterSpacing: "0.01em",
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
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
    icon: PropTypes.elementType.isRequired,
    isPrimary: PropTypes.bool.isRequired,
    page: PropTypes.string.isRequired,
  }).isRequired,
  setPage: PropTypes.func.isRequired,
};

/** Desktop-only "journey route" strip — the signature element, sits above
 *  the services grid at ≥lg and mirrors its column count so the dots land
 *  roughly above each card. Decorative, so it's aria-hidden. */
const RouteStrip = () => (
  <div className="hidden lg:grid lg:grid-cols-5 lg:gap-4 relative h-4 mb-1" aria-hidden="true">
    <div
      style={{
        position: "absolute",
        left: "10%",
        right: "10%",
        top: "50%",
        transform: "translateY(-50%)",
        borderTop: "2px dashed rgba(242,183,5,0.4)",
      }}
    />
    {SERVICES.map((s, i) => (
      <div key={s.id} className="relative z-10 flex justify-center">
        <span
          className={i === 0 ? "animate-pulse" : ""}
          style={{
            display: "block",
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: i === 0 ? "var(--htw-gold)" : "rgba(242,183,5,0.55)",
          }}
        />
      </div>
    ))}
  </div>
);

/** Scroll indicator — desktop/tablet only; on mobile it competes with the
 *  CTA row and services strip for very limited vertical space. */
const ScrollIndicator = () => (
  <div
    aria-hidden="true"
    className="htw-bounce hidden md:flex"
    style={{
      position: "absolute",
      bottom: 22,
      left: "50%",
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
    }}
  >
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 9,
        letterSpacing: "0.15em",
        color: "rgba(251,241,228,0.4)",
        textTransform: "uppercase",
      }}
    >
      Scroll
    </span>
    <div
      style={{
        width: 1,
        height: 32,
        background: "linear-gradient(to bottom, rgba(251,241,228,0.4), transparent)",
      }}
    />
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
        background: "linear-gradient(155deg, #26100A 0%, #5E2B16 48%, #C45A1E 100%)",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/giraffe-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      {/* Warm gradient overlay — stays strong (78%+) all the way down instead
          of fading thin at the bottom. The previous version let opacity
          drop to ~40% near the services row to show more photo through,
          which is exactly what made that text unreadable. Warmth now comes
          from hue (dusk → terracotta → sunset) rather than from sheerness. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(165deg, rgba(38,16,9,0.53) 0%, rgba(94,43,22,0.47) 35%, rgba(196,90,30,0.3) 80%)",
          zIndex: 1,
        }}
      />

      {/* All content */}
      <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <AmbientOrbs />

        <div
          style={{
            position: "relative",
            maxWidth: 1120,
            margin: "0 auto",
            padding: "clamp(44px,8vw,76px) clamp(18px,5vw,32px) clamp(56px,9vw,108px)",
            width: "100%",
          }}
        >
          {/* ── Headline ──────────────────────────────────────────────────── */}
          <h1
            className="htw-anim-2"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(34px,7.5vw,64px)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              color: "#FFF8EE",
              margin: "20px 0 16px",
              textShadow: "0 2px 16px rgba(18,7,3,0.5)",
            }}
          >
            {HERO_COPY.headline}
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                color: "var(--htw-gold)",
                textShadow: "0 2px 16px rgba(18,7,3,0.5)",
              }}
            >
              {HERO_COPY.headlineEm}
            </em>
          </h1>

          {/* ── Subheadline ───────────────────────────────────────────────── */}
          <p
            className="htw-anim-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15.5,
              color: "rgba(255,248,238,0.92)",
              fontWeight: 400,
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: 30,
              textShadow: "0 1px 10px rgba(18,7,3,0.45)",
            }}
          >
            {HERO_COPY.subheadline}
          </p>

          {/* ── Primary + secondary CTAs ─────────────────────────────────── */}
          <div className="htw-anim-3 flex flex-col sm:flex-row gap-3 mb-10 sm:mb-12">
            <button
              type="button"
              onClick={() => setPage("trips")}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A130A]"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "var(--htw-sunset)",
                color: "#fff",
                border: "none",
                padding: "14px 26px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.01em",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--htw-sunset-hi)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--htw-sunset)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <IconTrekking aria-hidden="true" size={18} />
              {HERO_COPY.ctaPrimary}
            </button>
          </div>

          {/* ── Services ──────────────────────────────────────────────────── */}
          <div className="htw-anim-4">
            <SectionLabel>{HERO_COPY.servicesLabel}</SectionLabel>

            <RouteStrip />

            <div className="relative">
              <div
                className="htw-scrollbar-hide flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-[18px] px-[18px] sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-5 lg:gap-4"
              >
                {SERVICES.map((service) => (
                  <div
                    key={service.id}
                    className="min-w-[150px] snap-start sm:min-w-0"
                  >
                    <ServiceCard service={service} setPage={setPage} />
                  </div>
                ))}
              </div>

              {/* Edge fade hinting there's more to swipe — mobile only */}
              <div
                aria-hidden="true"
                className="sm:hidden"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 8,
                  width: 36,
                  pointerEvents: "none",
                }}
              />
            </div>
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