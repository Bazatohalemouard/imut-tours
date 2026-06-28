import React from "react";

/**
 * PageHeader
 * -----------------------------------------------------------------------
 * Reusable hero header for listing/collection pages (trips, lodges,
 * journals, etc). Carries the brand's jungle gradient + a hand-drawn
 * "route line" signature that ties every header back to the idea of a
 * journey, while staying generic enough to drop onto any page.
 *
 * Usage:
 *   <PageHeader
 *     eyebrow="Our Journeys"
 *     title="All Trips & Safaris"
 *     subtitle="Hand-picked routes through Africa's wild heart."
 *     meta="128 trips across 14 countries"
 *   >
 *     <ExpandableFilterBar ... />
 *   </PageHeader>
 */

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

    .pgh-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .pgh-eyebrow::before {
      content: "";
      width: 18px;
      height: 1px;
      background: currentColor;
      opacity: 0.7;
      flex-shrink: 0;
    }

    .pgh-title {
      background: linear-gradient(90deg, #ffffff 0%, #f4ead9 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }

    .pgh-breadcrumb a {
      color: inherit;
      text-decoration: none;
      opacity: 0.7;
      transition: opacity 150ms ease;
    }

    .pgh-breadcrumb a:hover,
    .pgh-breadcrumb a:focus-visible {
      opacity: 1;
    }

    .pgh-breadcrumb a:focus-visible {
      outline: 2px solid rgba(255,255,255,0.85);
      outline-offset: 3px;
      border-radius: 3px;
    }

    @media (prefers-reduced-motion: reduce) {
      .pgh-route path,
      .pgh-route circle {
        animation: none !important;
        stroke-dashoffset: 0;
        opacity: 1;
      }
    }

    @media (max-width: 640px) {
      .pgh-route { width: 100%; opacity: 0.35; }
    }
  `;
  document.head.appendChild(style);
}

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  meta,
  breadcrumb,
  colors,
  align = "left",
  children,
  className,
  style,
}) {
  React.useEffect(() => {
    injectStyles();
  }, []);

  const c = { ...defaultTheme, ...colors };
  const isCenter = align === "center";

  return (
    <header
      className={`pgh-root${className ? ` ${className}` : ""}`}
      style={{
        background: `linear-gradient(135deg, ${c.jungle} 0%, ${c.jungleLight} 100%)`,
        padding: "56px 24px 40px",
        ...style,
      }}
    >
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
          textAlign: isCenter ? "center" : "left",
          display: "flex",
          flexDirection: "column",
          alignItems: isCenter ? "center" : "flex-start",
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

        {eyebrow && (
          <p
            className="pgh-eyebrow"
            style={{
              color: c.mist,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            {eyebrow}
          </p>
        )}

        {title && (
          <h1
            className="pgh-title"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
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

        {subtitle && (
          <p
            style={{
              color: c.mist,
              fontSize: 16,
              lineHeight: 1.5,
              maxWidth: 560,
              margin: "14px 0 0",
              fontWeight: 400,
            }}
          >
            {subtitle}
          </p>
        )}

        {meta && (
          <div
            style={{
              marginTop: 22,
              paddingTop: 16,
              borderTop: `1px solid ${c.hairline}`,
              width: isCenter ? "auto" : "100%",
              color: c.mistFaint,
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {meta}
          </div>
        )}

        {children && (
          <div style={{ marginTop: meta ? 20 : 28, width: "100%" }}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}