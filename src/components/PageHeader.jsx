import React from "react";
import PropTypes from "prop-types";

const defaultTheme = {
  jungle: "#16302A",
  jungleLight: "#2F5D45",
  sunset: "#E8964A",
  mist: "rgba(255,255,255,0.78)",
  mistFaint: "rgba(255,255,255,0.55)",
  hairline: "rgba(255,255,255,0.22)",
};

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.setAttribute("data-page-header", "true");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

    .pgh-root {
      position: relative;
      overflow: hidden;
      isolation: isolate;
      font-family: 'Inter', -apple-system, sans-serif;
    }

    .pgh-route {
      position: absolute;
      top: 0;
      right: 0;
      width: min(720px, 70%);
      height: 100%;
      pointer-events: none;
      opacity: 0.55;
      z-index: 1;
    }

    .pgh-route path {
      stroke-dasharray: 5 9;
      stroke-dashoffset: 340;
      animation: pgh-draw 1.8s ease-out forwards;
    }

    .pgh-route circle {
      opacity: 0;
      animation: pgh-pin-in 0.5s ease-out forwards;
      animation-delay: 1.5s;
    }

    @keyframes pgh-draw {
      to { stroke-dashoffset: 0; }
    }

    @keyframes pgh-pin-in {
      to { opacity: 1; }
    }

    .pgh-title {
      background: linear-gradient(90deg, #ffffff 0%, #f4ead9 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }

    /* -----------------------------------------------------------------
       "Thousand Hills" background system
       - .pgh-hills-glow  : soft dawn light, sets the mood
       - .pgh-hills-far   : furthest, faintest ridge (always shown)
       - .pgh-hills-mid   : middle ridge, added from small screens up
       - .pgh-hills-near  : nearest ridge, carries the terrace banding,
                             always shown (it anchors the header base)
       - .pgh-hills-mist  : thin drifting fog line along the ridgeline
       All colors are drawn from the theme tokens passed into the
       component (jungle / jungleLight / sunset / mist) — no new hues.
    ----------------------------------------------------------------- */

    .pgh-hills-glow,
    .pgh-hills-far,
    .pgh-hills-mid,
    .pgh-hills-near,
    .pgh-hills-mist {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .pgh-hills-mid { display: none; }

    .pgh-hills-mist {
      opacity: 0.5;
      animation: pgh-mist-drift 22s ease-in-out infinite;
    }

    @keyframes pgh-mist-drift {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(3%); }
    }

    @media (min-width: 640px) {
      .pgh-hills-mid { display: block; }
    }

    @media (prefers-reduced-motion: reduce) {
      .pgh-route path,
      .pgh-route circle {
        animation: none !important;
        stroke-dashoffset: 0;
        opacity: 1;
      }

      .pgh-hills-mist {
        animation: none !important;
      }
    }

    @media (max-width: 640px) {
      .pgh-route { width: 100%; opacity: 0.3; }
    }

    /* Reduce space on mobile */
    @media (max-width: 768px) {
      .pgh-breadcrumb {
        margin-bottom: 8px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default function PageHeader({
  title,
  breadcrumb,
  colors,
  className,
  style,
}) {
  React.useEffect(() => {
    injectStyles();
  }, []);

  const c = { ...defaultTheme, ...colors };
  const uid = React.useId ? React.useId().replace(/:/g, "") : "pgh";

  return (
    <header
      className={`pgh-root${className ? ` ${className}` : ''}`}
      style={{
        background: `linear-gradient(135deg, ${c.jungle} 0%, ${c.jungleLight} 100%)`,
        padding: "20px 16px 24px",
        ...style
      }}
    >
      {/* Dawn glow — the sun catching the ridgelines at first light */}
      <svg className="pgh-hills-glow" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient id={`glow-${uid}`} cx="78%" cy="8%" r="55%">
            <stop offset="0%" stopColor={c.sunset} stopOpacity="0.22" />
            <stop offset="100%" stopColor={c.sunset} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#glow-${uid})`} />
      </svg>

      {/* Far ridge — faintest, sets the sense of many hills receding into haze */}
      <svg className="pgh-hills-far" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0,190 C90,140 170,205 260,170 C350,135 430,195 520,160 C610,125 690,190 780,155
             C870,120 950,185 1040,150 C1110,125 1160,155 1200,140 L1200,300 L0,300 Z"
          fill={c.mistFaint}
          opacity="0.14"
        />
      </svg>

      {/* Mid ridge — hidden on the smallest screens to keep the mobile header calm */}
      <svg className="pgh-hills-mid" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0,220 C110,165 210,235 310,190 C410,145 500,215 600,175
             C700,135 790,205 890,170 C990,135 1080,190 1200,175 L1200,300 L0,300 Z"
          fill={c.jungleLight}
          opacity="0.35"
        />
      </svg>

      {/* Near ridge — anchors the header base and carries a fine terrace
          banding (hillside agricultural terraces are one of the most
          recognisable features of the Rwandan countryside) */}
      <svg className="pgh-hills-near" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <clipPath id={`ridge-clip-${uid}`}>
            <path d="M0,255 C130,200 230,265 340,225 C450,185 540,250 650,215
                     C760,180 850,240 960,210 C1050,185 1130,220 1200,205 L1200,300 L0,300 Z" />
          </clipPath>
          <pattern id={`terrace-${uid}`} width="6" height="9" patternUnits="userSpaceOnUse">
            <rect width="6" height="9" fill={c.jungle} />
            <rect width="6" height="1.4" fill={c.mist} opacity="0.16" />
          </pattern>
        </defs>
        <g clipPath={`url(#ridge-clip-${uid})`}>
          <rect width="1200" height="300" fill={`url(#terrace-${uid})`} />
        </g>
      </svg>

      {/* Fog line — a thin drifting band of mist sitting along the ridge,
          nodding to the mist that famously hangs over Rwanda's hills */}
      <svg className="pgh-hills-mist" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0,225 C150,195 300,240 450,210 C600,180 750,220 900,195 C1000,178 1100,195 1200,190"
          fill="none"
          stroke={c.mist}
          strokeOpacity="0.28"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Signature: a hand-drawn route line plotting a "journey" across the hero */}
      <svg
        className="pgh-route"
        viewBox="0 0 720 220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M -20 150 C 120 40, 280 210, 420 90 S 640 30, 740 60"
          fill="none"
          stroke={c.sunset}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="740" cy="60" r="5" fill={c.sunset} />
      </svg>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {breadcrumb && (
          <nav
            className="pgh-breadcrumb"
            aria-label="Breadcrumb"
            style={{
              color: c.mistFaint,
              fontSize: 12,
              fontWeight: 500,
              marginBottom: 14,
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {breadcrumb}
          </nav>
        )}

        {title && (
          <h1
            className="pgh-title"
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            {title}
          </h1>
        )}
      </div>
    </header>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumb: PropTypes.node,
  colors: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object
};