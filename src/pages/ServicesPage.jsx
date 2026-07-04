import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSEO } from "../utils/useSEO";
import { colors } from "../theme/colors";
import {
  IconMail,
  IconPhone,
  IconCopy,
} from "@tabler/icons-react";
import { SERVICES_LIST, SERVICES_COPY, PROMISE_CARDS } from "../api/datasets/servicesdata";
import PageHeader from "../components/PageHeader";
import ServiceCard from "../components/ServiceCard";
import { trackEvent } from "../utils/analytics";

// ─── Keyframe injection ───────────────────────────────────────────────────────
// Same light theme as AboutPage — cream / white sections, brand + gold accents.
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@700&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .svc-card-wrap {
    animation: fadeUp 0.5s ease both;
  }
  .svc-card-inner {
    position: relative;
    background: #ffffff;
    border: 1px solid ${colors.sand};
    border-radius: 16px;
    padding: 32px 28px;
    height: 100%;
    cursor: default;
    transition: border-color 0.25s, transform 0.22s, box-shadow 0.25s;
  }
  .svc-card-inner:hover {
    border-color: ${colors.gold};
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(31, 61, 43, 0.08);
  }
  .svc-card-inner.primary {
    border-color: ${colors.gold};
    background: ${colors.cream};
  }

  .highlight-chip {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    border-radius: 6px;
    padding: 5px 8px;
    font-size: 13px;
    color: ${colors.textMuted};
    transition: background 0.2s, color 0.2s;
    cursor: default;
  }
  .highlight-chip:hover {
    background: ${colors.cream};
    color: ${colors.brand};
  }

  .contact-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: ${colors.jungle};
    color: #fff;
    border: none;
    padding: 15px 30px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    letter-spacing: 0.01em;
    transition: background 0.2s, transform 0.15s;
  }
  .contact-btn-primary:hover {
    background: ${colors.brand};
    transform: translateY(-2px);
  }

  .whatsapp-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(37,211,102,0.1);
    border: 1px solid rgba(37,211,102,0.4);
    color: #1f9d55;
    padding: 14px 22px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
  }
  .whatsapp-btn:hover {
    background: rgba(37,211,102,0.18);
    border-color: rgba(37,211,102,0.6);
  }

  .contact-meta-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: ${colors.textMuted};
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
    color: ${colors.gold};
  }

  .svc-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    cursor: pointer;
    border-radius: 9px;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 700;
    font-family: inherit;
    transition: background 0.2s, transform 0.15s;
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
  <p
    style={{
      color: colors.gold,
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginBottom: 12,
    }}
  >
    {children}
  </p>
);

SectionLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

/** Contact / CTA section — styled to match the About page's "Get in Touch" tone */
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
        background: "#fff",
        borderRadius: 24,
        border: `1px solid ${colors.sand}`,
        padding: "clamp(32px, 5vw, 56px)",
        marginTop: 24,
        animation: "fadeUp 0.5s ease 0.15s both",
      }}
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 40,
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
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: colors.brand,
              margin: "0 0 18px",
            }}
          >
            {copy.contactHeadline.split(" ").slice(0, -2).join(" ")}{" "}
            <em
              style={{
                color: colors.gold,
                fontStyle: "italic",
                fontFamily: "'Dancing Script', cursive",
              }}
            >
              {copy.contactHeadline.split(" ").slice(-2).join(" ")}
            </em>
          </h2>

          <p
            style={{
              fontSize: 15.5,
              color: colors.textMuted,
              lineHeight: 1.8,
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
              onClick={() =>
                trackEvent(
                  "Lead",
                  "Email",
                  "Services Page"
                )
              }
              className="contact-btn-primary"
              style={{ textDecoration: "none", width: "100%", justifyContent: "center" }}
            >
              <IconMail aria-hidden="true" className="h-[18px] w-[18px]" />
              {copy.contactCta}
            </a>

            <a
              href={copy.whatsapp}
              onClick={() =>
                trackEvent(
                  "Lead",
                  `Whatsapp Contact ${trip.title}`,
                  "Services Page"
                )
              }
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <IconPhone aria-hidden="true" className="h-[17px] w-[17px]" />
              WhatsApp Us
            </a>
          </div>

          {/* Meta links */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="contact-meta-link" onClick={copyEmail}>
              <IconCopy aria-hidden="true" className="h-[14px] w-[14px]" />
              {copied ? "Copied!" : copy.email}
            </button>

            <a href={`tel:${copy.phone}`} className="contact-meta-link" style={{ textDecoration: "none" }}>
              <IconPhone aria-hidden="true" className="h-[14px] w-[14px]" />
              {copy.phone}
            </a>
          </div>
        </div>

        {/* Right — promise cards */}
        <div style={{ display: "none", flexDirection: "column", gap: 12 }} className="lg:flex">
          {PROMISE_CARDS.map((card) => (
            <div
              key={card.id}
              style={{
                background: colors.cream,
                padding: "16px",
                borderRadius: "8px",
                border: `1px solid ${colors.sand}`,
              }}
            >
              <h3 style={{ color: colors.brand, fontSize: 16, fontWeight: 600, margin: "0 0 8px" }}>
                {card.title}
              </h3>
              <p style={{ color: colors.textMuted, fontSize: 14, lineHeight: 1.5 }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

ContactSection.propTypes = {
  copy: PropTypes.object.isRequired,
  prefillService: PropTypes.string,
};

// Improved color definitions for better contrast
const improvedColors = {
  ...colors,
  textMuted: "#4a5568", // Darker gray for better readability
  brand: "#2d3748", // Darker blue-gray for better contrast
  gold: "#d69e2e", // Slightly more saturated gold
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
  const cardRefs = useRef({});

  const visibleServices = SERVICES_LIST;

  useSEO({
    title: "Our Services | Safaris, Transfers & More | IMUT Tours & Travel",
    description:
      "Explore guided safaris, car hire, airport transfers, accommodation and visa support across East Africa.",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
    ],
  });

  const handleContact = (serviceName) => {
    setContactPrefill(serviceName);
    trackEvent(
      "Lead",
      `Contact Us ${serviceName}`,
      "Service Page"
    )
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
    <div style={{ paddingTop: 68, minHeight: "100vh", background: colors.cream }}>
      <PageHeader title={'Our Services'} breadcrumb={
        <span>
          <a href="/">Home</a> / <span>Services</span>
        </span>
      } />

      <main style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
        {/* Intro strip — mirrors the About page's cream-toned story section */}
        <section style={{ background: colors.cream, padding: "40px 24px 8px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
            <SectionLabel>What We Offer</SectionLabel>
            <h1
              style={{
                fontSize: "clamp(28px, 4.5vw, 44px)",
                color: colors.brand,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                margin: "0 0 14px",
              }}
            >
              Everything you need for your adventure
            </h1>
            <p className="hide-on-small"
              style={{
                color: colors.textMuted,
                fontSize: 15.5,
                lineHeight: 1.8,
                maxWidth: 640,
                margin: "0 auto",
              }}
            >
              From guided safaris to airport transfers and visa support, every service is
              handled with the same local knowledge and care that defines IMUT Tours.
            </p>
          </div>
        </section>

        {/* Services grid — white section, matching the About page's "Core Values" block */}
        <section style={{ background: "#fff", padding: "56px 24px 80px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 24,
              }}
              role="list"
              aria-label="Services list"
            >
              {visibleServices.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  onContact={handleContact}
                  highlighted={highlightedId === service.id}
                  cardRef={(el) => {
                    cardRefs.current[service.id] = el;
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact section — cream section, white card, matching About page's tone */}
        <section style={{ background: colors.cream, padding: "0 24px 80px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }} ref={contactRef}>
            <ContactSection copy={SERVICES_COPY} prefillService={contactPrefill} />
          </div>
        </section>
      </main>
    </div>
  );
};

ServicesPage.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default ServicesPage;