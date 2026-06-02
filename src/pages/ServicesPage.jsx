import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSEO } from "../utils/useSEO";
import {
  IconMail,
  IconPhone,
  IconCopy,
  IconCheck,
  IconHandClick
} from "@tabler/icons-react";
import { SERVICES_LIST, SERVICES_COPY, PROMISE_CARDS } from "../api/datasets/servicesdata";

// ─── Keyframe injection ───────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@700&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  .svc-card-wrap {
    animation: fadeUp 0.5s ease both;
  }
  .svc-card-inner {
    position: relative;
    background: rgba(26,12,6,0.82);
    border: 1px solid rgba(200,146,42,0.28);
    border-radius: 16px;
    padding: 32px 28px;
    height: 100%;
    cursor: default;
    transition: border-color 0.25s, transform 0.22s, background 0.25s;
    overflow: hidden;
  }
  .svc-card-inner:hover {
    border-color: #C8921A;
    background: rgba(36,18,6,0.92);
    transform: translateY(-4px);
  }
  .svc-card-inner.primary {
    border-color: rgba(200,146,42,0.65);
    background: rgba(200,146,42,0.07);
  }
  .svc-card-inner.primary:hover {
    background: rgba(200,146,42,0.12);
  }
  .svc-card-inner::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(200,146,42,0.06) 0%, transparent 60%);
    pointer-events: none;
  }

  .highlight-chip {
    border-radius: 6px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.78); /* was 0.58 — lifted to pass AA */
    transition: background 0.2s, color 0.2s;
    cursor: default;
  }
  .highlight-chip:hover {
    background: rgba(200, 146, 42, 0.1);
    color: #ffffff;
  }

  .stat-card {
    background: rgba(26,12,6,0.7);
    border: 1px solid rgba(200,146,42,0.22);
    border-radius: 12px;
    padding: 22px 18px;
    text-align: center;
    transition: border-color 0.2s, transform 0.2s;
  }
  .stat-card:hover {
    border-color: rgba(200,146,42,0.55);
    transform: translateY(-2px);
  }

  .contact-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: #C8921A;
    color: #fff;
    border: none;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    letter-spacing: 0.01em;
    transition: background 0.2s, transform 0.15s;
  }
  .contact-btn-primary:hover {
    background: #d9a020;
    transform: translateY(-2px);
  }

  .contact-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.72);
    border: 1px solid rgba(255,255,255,0.14);
    padding: 15px 22px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s, color 0.2s;
  }
  .contact-btn-ghost:hover {
    background: rgba(255,255,255,0.13);
    color: #fff;
  }

  .contact-meta-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.52);
    font-size: 13px;
    text-decoration: none;
    transition: color 0.18s;
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
    padding: 0;
  }
  .contact-meta-link:hover {
    color: #E8B84B;
  }

  .nav-tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 99px;
    border: 1px solid transparent;
    background: transparent;
    color: rgba(255,255,255,0.45);
    font-size: 13px;
    font-weight: 400;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.18s;
    white-space: nowrap;
  }
  .nav-tab:hover {
    color: rgba(255,255,255,0.8);
    background: rgba(200,146,42,0.08);
    border-color: rgba(200,146,42,0.28);
  }
  .nav-tab.active {
    background: rgba(200,146,42,0.15);
    border-color: rgba(200,146,42,0.5);
    color: #E8B84B;
    font-weight: 600;
  }

  .divider-line {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, rgba(200,146,42,0.35), rgba(200,146,42,0.05), transparent);
  }

  .whatsapp-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(37,211,102,0.12);
    border: 1px solid rgba(37,211,102,0.35);
    color: #4ade80;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
  }
  .whatsapp-btn:hover {
    background: rgba(37,211,102,0.2);
    border-color: rgba(37,211,102,0.55);
  }
  .highlight-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 11px;
    color: rgba(255,255,255,0.58);
    transition: background 0.2s, color 0.2s;
    cursor: default;
  }
  .highlight-chip:hover {
    background: rgba(200,146,42,0.08);
    color: rgba(255,255,255,0.9);
  }
`;

if (typeof document !== "undefined" && !document.getElementById("services-styles")) {
  const tag = document.createElement("style");
  tag.id = "services-styles";
  tag.textContent = STYLES;
  document.head.appendChild(tag);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionLabel = ({ children }) => (
  <p style={{
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "rgba(255,255,255,0.3)",
    fontWeight: 500,
    marginBottom: 12,
    fontFamily: "'DM Sans', sans-serif",
  }}>
    {children}
  </p>
);

const AmbientOrbs = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
    <div style={{
      position: "absolute", width: 600, height: 600,
      top: -200, right: -150, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(200,146,42,0.1) 0%, transparent 65%)",
    }} />
    <div style={{
      position: "absolute", width: 400, height: 400,
      top: "35%", left: -150, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(200,146,42,0.07) 0%, transparent 70%)",
    }} />
    <div style={{
      position: "absolute", width: 500, height: 500,
      bottom: -100, right: "20%", borderRadius: "50%",
      background: "radial-gradient(circle, rgba(200,146,42,0.06) 0%, transparent 70%)",
    }} />
    {/* Decorative rings */}
    <div style={{
      position: "absolute", width: 360, height: 360,
      top: "8%", right: "4%", borderRadius: "50%",
      border: "1px solid rgba(200,146,42,0.12)",
    }} />
    <div style={{
      position: "absolute", width: 220, height: 220,
      top: "18%", right: "14%", borderRadius: "50%",
      border: "1px solid rgba(200,146,42,0.08)",
    }} />
  </div>
);

/** Individual service card */
const ServiceCard = ({ service, index, onContact, highlighted }) => {
  const Icon = service.icon;
  return (
    <div className="svc-card-wrap" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className={`svc-card-inner${service.isPrimary ? " primary" : ""}`}
        style={highlighted ? {
          borderColor: "#C8921A",
          boxShadow: "0 0 0 3px rgba(200,146,42,0.25), 0 0 24px rgba(200,146,42,0.15)",
        } : undefined}
      >
        {/* Icon */}
        <div style={{
          width: 52, height: 52, borderRadius: 14, marginBottom: 18, flexShrink: 0,
          background: service.isPrimary ? "rgba(200,146,42,0.22)" : "rgba(200,146,42,0.12)",
          border: `1.5px solid ${service.isPrimary ? "rgba(200,146,42,0.7)" : "rgba(200,146,42,0.35)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon aria-hidden="true" style={{ width: 24, height: 24, color: "#F0C060" }} />
        </div>

        {/* Name */}
        <div style={{
          fontFamily: "'Nunito', sans-serif", fontSize: 18, fontWeight: 700,
          color: "#FFFFFF", lineHeight: 1.25, marginBottom: 4,
        }}>
          {service.name}
        </div>

        {/* Tagline — bumped size, weight and contrast */}
        <div style={{
          fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
          fontFamily: "'Telma', cursive",
          color: "#F0C060", marginBottom: 14,
        }}>
          {service.tagline}
        </div>

        {/* Description — weight 400 + contrast lifted to ~7:1 */}
        <p style={{
          fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.75,
          fontWeight: 400, margin: "0 0 20px",
        }}>
          {service.description}
        </p>

        {/* Highlights */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 22 }}>
          {service.highlights.map(h => (
            <span key={h} className="highlight-chip"
              style={{ display: "flex", alignItems: "center", gap: 9, padding: "5px 8px" }}>
              <IconCheck aria-hidden="true"
                style={{ width: 13, height: 13, color: "#F0C060", strokeWidth: 2.5, flexShrink: 0 }} />
              {h}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => onContact(service.name)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer",
            background: service.isPrimary ? "#C8921A" : "rgba(200,146,42,0.15)",
            border: service.isPrimary ? "none" : "1.5px solid rgba(200,146,42,0.55)",
            color: service.isPrimary ? "#FFFFFF" : "#F5C842",
            borderRadius: 9, padding: "10px 18px", fontSize: 13,
            fontWeight: 700, fontFamily: "inherit", transition: "background 0.2s, transform 0.15s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = service.isPrimary ? "#d9a020" : "rgba(200,146,42,0.28)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = service.isPrimary ? "#C8921A" : "rgba(200,146,42,0.15)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <IconHandClick aria-hidden="true" style={{ width: 14, height: 14 }} />
          {service.isPrimary ? "Book a Tour" : "Reach Out"}
        </button>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onContact: PropTypes.func.isRequired,
  highlighted: PropTypes.string,
};

/** Trust stats row */
const TrustBar = ({ stats }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: 12,
    marginBottom: 72,
    animation: "fadeUp 0.5s ease 0.15s both",
  }}>
    {stats.map(s => (
      <div key={s.label} className="stat-card">
        <i
          className={`ti ${s.icon}`}
          aria-hidden="true"
          style={{ fontSize: 20, color: "#E8B84B", display: "block", marginBottom: 10 }}
        />
        <div style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: 26,
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1,
          marginBottom: 6,
        }}>
          {s.num}
        </div>
        <div style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.38)",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
        }}>
          {s.label}
        </div>
      </div>
    ))}
  </div>
);

TrustBar.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    num: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  })).isRequired,
};

/** Quick-nav filter tabs */
const ServiceNav = ({ services, activeId, onSelect }) => (
  <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 48,
  }}
    role="tablist"
    aria-label="Filter services"
  >
    <button
      role="tab"
      aria-selected={activeId === "all"}
      className={`nav-tab${activeId === "all" ? " active" : ""}`}
      onClick={() => onSelect("all")}
    >
      <i className="ti ti-layout-grid" aria-hidden="true" style={{ fontSize: 13 }} />
      All Services
    </button>
    {services.map(s => (
      <button
        key={s.id}
        role="tab"
        aria-selected={activeId === s.id}
        className={`nav-tab${activeId === s.id ? " active" : ""}`}
        onClick={() => onSelect(s.id)}
      >
        <i className={`ti ${s.icon}`} aria-hidden="true" style={{ fontSize: 13 }} />
        {s.name.split(" ")[0]}
      </button>
    ))}
  </div>
);

ServiceNav.propTypes = {
  services: PropTypes.array.isRequired,
  activeId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

/** Contact / CTA section */
const ContactSection = ({ copy, prefillService }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(copy.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      style={{
        position: "relative",
        borderTop: "1px solid rgba(200,146,42,0.22)",
        paddingTop: 72,
        marginTop: 80,
        animation: "fadeUp 0.5s ease 0.3s both",
      }}
      id="contact"
      aria-labelledby="contact-heading"
    >
      {/* Decorative corner accent */}
      <div style={{
        position: "absolute",
        top: -1,
        left: 0,
        width: 120,
        height: 2,
        background: "linear-gradient(to right, #C8921A, transparent)",
      }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 32,
          alignItems: "start",
        }}
        className="lg:grid-cols-[1fr_1fr]"
      >
        {/* Left — copy */}
        <div style={{ minWidth: 0 }}>
          <SectionLabel>{copy.contactLabel}</SectionLabel>

          <h2
            id="contact-heading"
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 900,
              lineHeight: 1.08,
              color: "#fff",
              margin: "0 0 18px",
              letterSpacing: "-0.02em",
            }}
          >
            {copy.contactHeadline.split(" ").slice(0, -2).join(" ")}{" "}
            <em
              style={{
                color: "#E8B84B",
                fontStyle: "italic",
                fontFamily: "'Telma', cursive",
              }}
            >
              {copy.contactHeadline.split(" ").slice(-2).join(" ")}
            </em>
          </h2>

          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
              fontWeight: 300,
              margin: "0 0 32px",
              maxWidth: 420,
            }}
          >
            {copy.contactBody}
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexDirection: "column",
              marginBottom: 24,
              width: "100%",
            }}
            className="sm:flex-row"
          >
            <a
              href={`mailto:${copy.email}?subject=Trip Enquiry${prefillService ? ` – ${prefillService}` : ""
                }`}
              className="contact-btn-primary"
              style={{
                textDecoration: "none",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <IconMail
                aria-hidden="true"
                className="h-[18px] w-[18px]"
              />
              {copy.contactCta}
            </a>

            <a
              href={copy.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
              style={{
                width: "100%",
                justifyContent: "center",
              }}
            >
              <IconPhone
                aria-hidden="true"
                className="h-[17px] w-[17px]"
              />
              WhatsApp Us
            </a>
          </div>

          {/* Meta links */}
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <button
              className="contact-meta-link"
              onClick={copyEmail}
            >
              <IconCopy
                aria-hidden="true"
                className="h-[14px] w-[14px]"
              />
              {copied ? "Copied!" : copy.email}
            </button>

            <a
              href={`tel:${copy.phone}`}
              className="contact-meta-link"
              style={{ textDecoration: "none" }}
            >
              <IconPhone
                aria-hidden="true"
                className="h-[14px] w-[14px]"
              />
              {copy.phone}
            </a>
          </div>
        </div>

        {/* Right — promise cards */}
        <div
          style={{
            display: "none",
            flexDirection: "column",
            gap: 12,
          }}
          className="lg:flex"
        >
          {PROMISE_CARDS.map((card, i) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                style={{
                  display: "flex",
                  gap: 16,
                  background: "rgba(26,12,6,0.6)",
                  border: "1px solid rgba(200,146,42,0.18)",
                  borderRadius: 12,
                  padding: "16px 18px",
                  animation: `fadeUp 0.4s ease ${0.1 + i * 0.07}s both`,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "rgba(200,146,42,0.12)",
                    border: "1px solid rgba(200,146,42,0.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    aria-hidden="true"
                    className="h-[18px] w-[18px] text-[#E8B84B]"
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: 4,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {card.title}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}
                  >
                    {card.body}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

ContactSection.propTypes = {
  copy: PropTypes.object.isRequired,
  prefillService: PropTypes.string,
};

// ─── ServicesPage ─────────────────────────────────────────────────────────────

/**
 * ServicesPage
 *
 * Props:
 *   setPage  – navigate to a named page (for back-nav or CTA links)
 */
export const ServicesPage = ({ setPage }) => {
  const { state } = useLocation();
  const initialServiceId = state?.id ?? null;

  const [highlightedId, setHighlightedId] = useState(initialServiceId);
  const [contactPrefill, setContactPrefill] = useState(null);
  const contactRef = useRef(null);

  const visibleServices = SERVICES_LIST;

  useSEO({
    title: "Our Services | Safaris, Transfers & More | IMUT Tours & Travel",
    description: "Explore guided safaris, car hire, airport transfers, accommodation and visa support across East Africa.",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
    ],
  });

  const handleContact = (serviceName) => {
    setContactPrefill(serviceName);
    setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  useEffect(() => {
    if (!initialServiceId) return;
    const el = cardRefs.current[initialServiceId];
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
    const timer = setTimeout(() => setHighlightedId(null), 2200);
    return () => clearTimeout(timer);
  }, [initialServiceId]);

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(160deg, #1a0c06 0%, #2e1510 50%, #3a2008 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Background image layer */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url('/images/img_placeholder.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.08,
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(160deg, #1a0c06 0%, #2e1510dd 50%, #3a200888 100%)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      <AmbientOrbs />

      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1120,
        margin: "0 auto",
        padding: "clamp(48px,8vw,80px) clamp(16px,5vw,40px) clamp(64px,8vw,100px)",
      }}>

        {/* ── Page header ───────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 56, animation: "fadeUp 0.45s ease both" }}>

          <h1 style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(36px, 6.5vw, 64px)",
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            color: "#fff",
            margin: "26px 0 18px",
          }}>
            {SERVICES_COPY.headline}
            <br />
            <em style={{
              color: "#E8B84B",
              fontStyle: "italic",
              fontFamily: "'Telma', cursive",
              fontWeight: 700,
            }}>
              {SERVICES_COPY.headlineEm}
            </em>
          </h1>

          <p style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.75,
            fontWeight: 300,
            maxWidth: 600,
            margin: "0 0 30px",
          }}>
            {SERVICES_COPY.subheadline}
          </p>
        </div>

        <div className="divider-line" style={{ marginBottom: 48 }} />

        {/* ── Services grid ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
            marginBottom: 16,
          }}
          role="tabpanel"
          aria-label="Services list"
        >
          {visibleServices.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              onContact={handleContact}
              highlighted={highlightedId === service.id}
            />
          ))}
        </div>

        {/* ── Contact section ───────────────────────────────────────────────── */}
        <div ref={contactRef}>
          <ContactSection
            copy={SERVICES_COPY}
            prefillService={contactPrefill}
          />
        </div>

      </div>
    </main>
  );
};

ServicesPage.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default ServicesPage;