import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { IconTrekking, IconChevronDown } from "@tabler/icons-react";
import { SERVICES, HERO_COPY } from "../../api/datasets/herodata";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@300;400;500;600;700&display=swap');

  :root {
    --htw-dusk: #2A130A;
    --htw-clay: #8C3F1F;
    --htw-sunset: #2D5A27;
    --htw-sunset-hi: #4A8C41;
    --htw-gold: #F2B705;
    --htw-acacia: #4F6B4A;
    --htw-sand: #FBF1E4;
    --htw-ink: #3A1C10;
  }

  @keyframes floatUp {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    33% { transform: translateY(-8px) rotate(1deg); }
    66% { transform: translateY(-4px) rotate(-1deg); }
  }

  @keyframes floatAcross {
    0% { transform: translateX(-20px) translateY(0); opacity: 0; }
    20% { opacity: 0.4; }
    80% { opacity: 0.4; }
    100% { transform: translateX(calc(100vw + 20px)) translateY(-10px); opacity: 0; }
  }

  @keyframes gentlePulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.3); opacity: 0.3; }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes slideUpFade {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes ripple {
    0% { transform: scale(0); opacity: 0.6; }
    100% { transform: scale(4); opacity: 0; }
  }

  .float-particle-1 { animation: floatAcross 12s linear infinite; }
  .float-particle-2 { animation: floatAcross 15s linear 4s infinite; }
  .float-particle-3 { animation: floatAcross 10s linear 8s infinite; }
  .float-particle-4 { animation: floatAcross 14s linear 2s infinite; }
  .float-particle-5 { animation: floatAcross 11s linear 6s infinite; }
  
  .pulse-slow { animation: gentlePulse 4s ease-in-out infinite; }
  .pulse-medium { animation: gentlePulse 3s ease-in-out 1s infinite; }
  
  .fade-in-up { animation: slideUpFade 0.6s ease-out both; }
  .fade-in-up-1 { animation-delay: 0.1s; }
  .fade-in-up-2 { animation-delay: 0.2s; }
  .fade-in-up-3 { animation-delay: 0.3s; }

  .htw-scrollbar-hide::-webkit-scrollbar { display: none; }
  .htw-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

  @media (prefers-reduced-motion: reduce) {
    .float-particle-1, .float-particle-2, .float-particle-3, 
    .float-particle-4, .float-particle-5, .pulse-slow, .pulse-medium {
      animation: none;
    }
  }
`;

if (typeof document !== "undefined" && !document.getElementById("tours-hero-styles")) {
  const tag = document.createElement("style");
  tag.id = "tours-hero-styles";
  tag.textContent = STYLES;
  document.head.appendChild(tag);
}

// ─── Abstract Background Elements ────────────────────────────────────────────

/**
 * Rich abstract overlay system with visible moving elements.
 * Mobile-optimized with reduced complexity but maintained visual impact.
 */
const AbstractOverlay = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>

      {/* Large floating geometric shapes - visible on all screens */}
      <div style={{
        position: "absolute",
        top: "8%",
        right: "-8%",
        width: "min(300px, 45vw)",
        height: "min(300px, 45vw)",
        border: "2px solid rgba(242,183,5,0.15)",
        borderRadius: "40% 60% 55% 45% / 45% 50% 50% 55%",
        transform: "rotate(-15deg)",
        animation: "floatUp 8s ease-in-out infinite",
      }} />

      <div style={{
        position: "absolute",
        bottom: "15%",
        left: "-5%",
        width: "min(200px, 35vw)",
        height: "min(200px, 35vw)",
        border: "1.5px solid rgba(242,183,5,0.1)",
        borderRadius: "55% 45% 50% 50% / 45% 55% 45% 55%",
        transform: "rotate(25deg)",
        animation: "floatUp 10s ease-in-out 2s infinite",
      }} />

      {/* Diamond pattern grid - African textile inspired */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="diamondMesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20,0 L40,20 L20,40 L0,20 Z"
              fill="none"
              stroke="rgba(242,183,5,0.08)"
              strokeWidth="0.5"
            />
            <circle cx="20" cy="20" r="1" fill="rgba(242,183,5,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamondMesh)" opacity="0.6" />
      </svg>

      {/* Drifting particles - visible movement */}
      <div className="float-particle-1" style={{
        position: "absolute",
        top: "20%",
        left: 0,
        display: "flex",
        gap: "30px",
      }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="pulse-slow" style={{
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: "rgba(242,183,5,0.6)",
            boxShadow: "0 0 8px rgba(242,183,5,0.4)",
            animationDelay: `${i * 0.8}s`,
          }} />
        ))}
      </div>

      <div className="float-particle-2" style={{
        position: "absolute",
        top: "45%",
        left: 0,
        display: "flex",
        gap: "40px",
      }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="pulse-medium" style={{
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            background: "rgba(232,121,42,0.5)",
            boxShadow: "0 0 6px rgba(232,121,42,0.3)",
            // animationDelay: `${i * 1s}`,
          }} />
        ))}
      </div>

      <div className="float-particle-3" style={{
        position: "absolute",
        top: "70%",
        left: 0,
        display: "flex",
        gap: "35px",
      }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            width: "2.5px",
            height: "2.5px",
            borderRadius: "50%",
            background: "rgba(45,90,39,0.4)",
            boxShadow: "0 0 5px rgba(45,90,39,0.3)",
            animation: `gentlePulse ${3 + i}s ease-in-out ${i * 0.6}s infinite`,
          }} />
        ))}
      </div>

      {/* Diagonal accent lines */}
      <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }} aria-hidden="true">
        <line x1="80%" y1="0%" x2="100%" y2="40%" stroke="rgba(242,183,5,0.08)" strokeWidth="1" />
        <line x1="85%" y1="0%" x2="100%" y2="30%" stroke="rgba(242,183,5,0.05)" strokeWidth="0.5" />
        <line x1="0%" y1="70%" x2="20%" y2="100%" stroke="rgba(242,183,5,0.06)" strokeWidth="1" />
      </svg>
    </div>
  );
};

// ─── Service Card (Compact, Horizontal Layout) ───────────────────────────────

const ServiceCard = ({ service, setPage, index }) => {
  const Icon = service.icon;
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setPage("services", { id: service.id }, "Hero Section")}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className="fade-in-up"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        padding: "14px 16px",
        background: service.isPrimary
          ? "white" // Changed to pure white for clarity
          : "white", // Changed to pure white for clarity
        backdropFilter: "blur(8px)",
        border: service.isPrimary
          ? "1.5px solid rgba(45,90,39,0.1)"
          : "1px solid rgba(45,90,39,0.08)",
        borderRadius: "12px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s ease",
        transform: isPressed ? "scale(0.98)" : "scale(1)",
        boxShadow: service.isPrimary
          ? "0 4px 16px rgba(20,8,4,0.08)"
          : "0 2px 8px rgba(20,8,4,0.05)",
        position: "relative",
        overflow: "hidden",
        animationDelay: `${index * 0.1}s`,
      }}
      aria-label={'Go to ${service.name}'}
    >
      {/* Hover shimmer effect */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(90deg, transparent, rgba(242,183,5,0.06), transparent)",
        backgroundSize: "200% 100%",
        animation: "shimmer 3s ease-in-out infinite",
        opacity: service.isPrimary ? 1 : 0.5,
      }} />

      {/* Icon container */}
      <div style={{
        width: "42px",
        height: "42px",
        borderRadius: "10px",
        background: service.isPrimary
          ? "linear-gradient(135deg, rgba(45,90,39,0.08), rgba(74,140,65,0.04))"
          : "rgba(45,90,39,0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
        zIndex: 1,
      }}>
        <Icon aria-hidden="true" size={20} style={{ color: "var(--htw-sunset)" }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(13px, 2.2vw, 14px)",
          fontWeight: 600,
          color: "var(--htw-ink)",
          lineHeight: 1.3,
          marginBottom: "2px",
        }}>
          {service.name}
        </div>
        <div
          className="hide-on-small"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(11px, 1.8vw, 12px)",
            color: "var(--htw-acacia)",
            lineHeight: 1.3,
            fontWeight: 400,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
          {service.tagline}
        </div>
      </div>

      {/* Arrow indicator */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--htw-sunset)"
        strokeWidth="2"
        style={{ flexShrink: 0, opacity: 0.5, position: "relative", zIndex: 1 }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>

      {/* Primary badge */}
      {service.isPrimary && (
        <div style={{
          position: "absolute",
          top: "6px",
          right: "6px",
          background: "var(--htw-sunset)",
          color: "white",
          fontSize: "9px",
          fontWeight: 700,
          padding: "2px 8px",
          borderRadius: "10px",
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          zIndex: 2,
        }}>
          Top
        </div>
      )}
    </button>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────

export const HeroServices = ({ countries, countriesLoading, setPage, fetchCountryFlag }) => {
  const [visibleServices, setVisibleServices] = useState(4);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const servicesRef = useRef(null);
  const isDesktop = window.innerWidth >= 1200;

  // Responsive service display logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleServices(showAllMobile ? SERVICES.length : 4);
      } else if (width < 1024) {
        setVisibleServices(4);
      } else {
        setVisibleServices(SERVICES.length);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showAllMobile]);

  const displayedServices = SERVICES.slice(0, visibleServices);
  const hasMoreServices = visibleServices < SERVICES.length;

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: "linear-gradient(155deg, #26100A 0%, #5E2B16 48%, #C45A1E 100%)",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      {/* Background image */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url('/images/giraffe-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
        zIndex: 0,
      }} />

      {/* Warm overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(38,16,9,0.5) 0%, rgba(94,43,22,0.45) 50%, rgba(38,16,9,0.6) 100%)",
        zIndex: 1,
      }} />

      {/* Abstract design overlay */}
      <AbstractOverlay />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "clamp(82px, 6vh, 60px) clamp(16px, 4vw, 32px) 0",
      }}>

        {/* Hero text - optimized for responsive sizing */}
        <div style={{ marginBottom: "clamp(24px, 4vh, 40px)" }}>
          {/* Optimized headline */}
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(28px, 6vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#FFF8EE",
            margin: "20px 0 12px",
            textShadow: "0 2px 12px rgba(18,7,3,0.5)",
          }}>
            {HERO_COPY.headline}{" "}
            <em style={{
              fontFamily: "'Dancing Script', cursive",
              fontWeight: 500,
              color: "var(--htw-gold)",
              fontSize: "clamp(24px, 5vw, 48px)", // Slightly smaller than main headline
            }}>
              {HERO_COPY.headlineEm}
            </em>
          </h1>

          {/* Optimized subheadline */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              // fontSize: "clamp(13px, 2vw, 15px)",
              fontSize: isDesktop ? "22px" : "13px",
              color: "rgba(255,248,238,0.9)",
              fontWeight: 400,
              lineHeight: isDesktop ? 1.9 : 1.6,
              maxWidth: "1000px",
              margin: "20px 0 20px",
              textShadow: "0 1px 8px rgba(18,7,3,0.4)",
            }}
          >
            {HERO_COPY.subheadline}
          </p>
        </div>

        {/* CTA - compact */}
        <div style={{ marginBottom: "clamp(28px, 5vh, 20px)" }}>
          <button
            type="button"
            onClick={() => setPage("trips", null, "Hero section")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--htw-sunset)",
              color: "#fff",
              border: "none",
              padding: "clamp(10px, 2vh, 14px) clamp(20px, 4vw, 28px)",
              borderRadius: "10px",
              fontSize: "clamp(13px, 2vw, 15px)",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 4px 12px rgba(45,90,39,0.3)",
              transition: "all 0.2s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(45,90,39,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(45,90,39,0.3)";
            }}
          >
            <IconTrekking aria-hidden="true" size={18} />
            {HERO_COPY.ctaPrimary}
          </button>
        </div>

        {/* Services section */}
        <div style={{
          marginTop: "auto",
          paddingBottom: "clamp(24px, 4vh, 40px)",
        }}>
          {/* Section label */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "rgba(255,248,238,0.7)",
            fontWeight: 600,
            marginBottom: "12px",
          }}>
            {HERO_COPY.servicesLabel}
          </p>

          {/* Mobile: 2-column vertical scroll | Tablet+: auto grid */}
          <div
            ref={servicesRef}
            className="htw-scrollbar-hide"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
              maxHeight: showAllMobile ? "none" : "min(320px, 45vh)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {displayedServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                setPage={setPage}
                index={index}
              />
            ))}
          </div>

          {/* Mobile: Show more/less button */}
          {hasMoreServices && (
            <button
              onClick={() => setShowAllMobile(!showAllMobile)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                background: "rgba(251,241,228,0.1)",
                border: "1px solid rgba(251,241,228,0.15)",
                borderRadius: "10px",
                color: "rgba(251,241,228,0.8)",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                backdropFilter: "blur(4px)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(251,241,228,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(251,241,228,0.1)";
              }}
            >
              {showAllMobile ? "Show Less" : 'View More'}
              <IconChevronDown
                size={16}
                style={{
                  transform: showAllMobile ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            </button>
          )}
        </div>
      </div>

      {/* Scroll indicator - subtle */}
      <div style={{
        position: "absolute",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
      }}>
        <div style={{
          width: "1px",
          height: "24px",
          background: "linear-gradient(to bottom, rgba(251,241,228,0.3), transparent)",
        }} />
      </div>
    </section>
  );
};

HeroServices.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    stats: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })).isRequired,
    experiences: PropTypes.arrayOf(PropTypes.string).isRequired,
  })),
  countriesLoading: PropTypes.bool,
  setPage: PropTypes.func.isRequired,
  fetchCountryFlag: PropTypes.func.isRequired,
};

HeroServices.defaultProps = {
  countries: [],
  countriesLoading: false,
};

export default HeroServices;