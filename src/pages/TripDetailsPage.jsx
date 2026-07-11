import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSEO, buildTripSchema } from "../utils/useSEO";
import PropTypes from "prop-types";
import { colors } from "../theme/colors";
import { StarRating } from "../components/StarRating";
import { Badge } from "../components/Badge";
import { BookingModal } from "../components/BookingModal";
import rwandaFlag from "../assets/flags/rwanda.png";
import ugandaFlag from "../assets/flags/uganda.png";
import tanzaniaFlag from "../assets/flags/tanzania.png";
import burundiFlag from "../assets/flags/burundi.png";
import kenyaFlag from "../assets/flags/kenya.png";
import clockIcon from "../assets/icons/clock.png";
import groupIcon from "../assets/icons/group-users.png";
import difficultyIcon from "../assets/icons/challenge.png";
import secureIcon from "../assets/icons/shield.png";
import guaranteeIcon from "../assets/icons/authenticity.png";
import whatsappIcon from "../assets/icons/whatsapp.png";
import { Spinner } from "../components/Spinner";
import { fetchTrips } from "../api/APIHandler";
import PageHeader from "../components/PageHeader";
import { trackEvent } from "../utils/analytics";


// ─── Helpers ──────────────────────────────────────────────────────────────────
const fetchCountryFlag = (country) => {
  if (country === "Rwanda") return rwandaFlag;
  if (country === "Uganda") return ugandaFlag;
  if (country === "Tanzania") return tanzaniaFlag;
  if (country === "Burundi") return burundiFlag;
  if (country === "Kenya") return kenyaFlag;
  return "";
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const MetaPill = ({ icon, label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 7,
      background: "rgba(255,255,255,0.12)",
      border: "1px solid rgba(255,255,255,0.22)",
      borderRadius: 99,
      padding: "7px 14px",
      backdropFilter: "blur(6px)",
    }}
  >
    <img src={icon} alt={label} style={{ width: 15, height: 15, objectFit: "contain", opacity: 0.9 }} />
    <span style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{label}</span>
  </div>
);

MetaPill.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const SectionTitle = ({ children }) => (
  <h2
    style={{
      fontSize: "clamp(20px, 3vw, 26px)",
      fontWeight: 700,
      color: colors.brand,
      fontFamily: "'Nunito', sans-serif",
      margin: "0 0 20px",
      paddingBottom: 12,
      borderBottom: `2px solid ${colors.sand}`,
    }}
  >
    {children}
  </h2>
);

SectionTitle.propTypes = { children: PropTypes.node.isRequired };

// ─── Trip Detail Page ─────────────────────────────────────────────────────────
export const TripDetailsPage = ({ setPage }) => {
  const { tripId } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [imgLoaded, setImgLoaded] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const trips = await fetchTrips();
        const foundTrip = trips.find(
          (item) => String(item.id) === String(tripId)
        );

        setTrip(foundTrip || null);
      } finally {
        setLoading(false);
      }
    };

    loadTrip();
  }, [tripId]);

  useSEO({
    title: trip ? `${trip.title} | IMUT Tours & Travel` : "Trip Details | IMUT Tours & Travel",
    description: trip?.description,
    schemas: trip ? [buildTripSchema(trip)] : [],
    breadcrumbs: trip ? [
      { name: "Home", url: "/" },
      { name: "Trips", url: "/trips" },
      { name: trip.name, url: `/trips/${trip.id}` },
    ] : [],
  });

  if (!trip && !loading) {
    return (
      <div style={{ paddingTop: 68, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <span style={{ fontSize: 48 }}>🔍</span>
        <p style={{ color: colors.textMuted, fontSize: 16 }}>No trip selected.</p>
        <button onClick={() => setPage("trips")} style={backBtnStyle}>← Back to Trips</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ paddingTop: 68, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <Spinner />
      </div>
    );
  }

  const flag = fetchCountryFlag(trip.country);

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", background: colors.cream }}>
      <PageHeader title={trip.title} breadcrumb={
        <span>
          <a href="/">Home</a> / <a href="/trips">Trips</a>
        </span>
      } />
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", width: "100%", height: "clamp(320px, 55vw, 580px)", overflow: "hidden" }}>
        {/* Blurred placeholder */}
        <img
          src="/images/img_placeholder.png"
          aria-hidden
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(14px)", transform: "scale(1.05)" }}
        />
        {/* Main image */}
        {!loading && (<img
          src={trip.image}
          alt={trip.title}
          onLoad={() => setImgLoaded(true)}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />)}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 75%, transparent 100%)"
        }} />

        {/* Back button */}
        <button
          className="hide-on-small"
          onClick={() => setPage("trips")}
          style={{
            position: "absolute", top: 20, left: 20,
            background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.25)", color: "#fff",
            borderRadius: 99, padding: "8px 16px", fontSize: 13,
            fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            marginBottom: 14
          }}
        >
          ← Trips
        </button>

        {/* Hero content */}
        {!loading && (<div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "clamp(20px, 4vw, 40px) clamp(20px, 5vw, 48px)",
            maxWidth: 1200, margin: "0 auto",
          }}
        >
          {/* Badges row */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14, alignItems: "center" }}>
            <span
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
                color: "#fff", fontSize: 12, fontWeight: 600,
                padding: "4px 10px", borderRadius: 99,
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              {flag && <img src={flag} alt={trip.country} style={{ width: 16, height: 16, borderRadius: "50%", objectFit: "cover" }} />}
              {trip.country}
            </span>
            {trip.badge && <Badge>{trip.badge}</Badge>}
            <span
              style={{
                background: "rgba(200,146,42,0.85)", color: "#fff",
                fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 99,
                textShadow: "0 1px 2px rgba(0,0,0,0.35)",
              }}
            >
              {trip.category.join(" / ")}
            </span>
          </div>

          {/*
            Subtitle previously sat directly on the photo at 80%-opacity
            white with nothing behind it — the weakest point on a bright
            image. Now full-opacity white plus its own text-shadow, so
            legibility doesn't rely on the gradient alone.
          */}
          <p style={{
            fontSize: "clamp(14px, 2vw, 17px)", color: "#fff", margin: "0 0 20px",
            textShadow: "0 1px 4px rgba(0,0,0,0.65)",
          }}>
            {trip.subtitle}
          </p>

          {/* Meta pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <MetaPill icon={clockIcon} label={trip.duration} />
            <MetaPill icon={groupIcon} label={`${trip.groupSize} pax`} />
            <MetaPill icon={difficultyIcon} label={trip.difficulty} />
            {/* <MetaPill icon={calendarIcon} label={`From $${trip.price.toLocaleString()} ${trip.currency}`} /> */}
          </div>
        </div>)}
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px clamp(16px, 4vw, 24px) 80px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 360px)",
          gap: "clamp(24px, 4vw, 48px)",
          alignItems: "start",
        }}
        className="trip-detail-grid"
      >
        {loading && <Spinner />}
        {!loading && (<>
          {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            {/* Highlights */}
            <div>
              <SectionTitle>Trip Highlights</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {trip.highlights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 12,
                      background: "#fff", border: `1px solid ${colors.sand}`,
                      borderRadius: 12, padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: colors.goldPale,
                        border: `1.5px solid rgba(200,146,42,0.3)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, fontSize: 14,
                      }}
                    >
                      ✓
                    </div>
                    <span style={{ fontSize: 15, color: colors.charcoal, lineHeight: 1.5, paddingTop: 4 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            {trip.itinerary?.length > 0 && (
              <div>
                <SectionTitle>Day-by-Day Itinerary</SectionTitle>

                {/* Day tabs */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                  {trip.itinerary.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveDay(i)}
                      style={{
                        background: activeDay === i ? colors.brand : "#fff",
                        color: activeDay === i ? "#fff" : colors.textMuted,
                        border: `1.5px solid ${activeDay === i ? colors.brand : colors.sand}`,
                        borderRadius: 99, padding: "7px 16px",
                        fontSize: 13, fontWeight: 600, cursor: "pointer",
                        transition: "all 0.18s",
                      }}
                    >
                      Day {item.day}
                    </button>
                  ))}
                </div>

                {/* Active day card */}
                {trip.itinerary.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: activeDay === i ? "flex" : "none",
                      background: "#fff",
                      border: `1px solid ${colors.sand}`,
                      borderRadius: 16,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        background: colors.brand,
                        padding: "24px 20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 72,
                        gap: 4,
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, color: colors.goldLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>Day</span>
                      <span style={{ fontSize: 32, fontWeight: 800, color: "#fff", fontFamily: "'Nunito', sans-serif", lineHeight: 1 }}>{item.day}</span>
                    </div>
                    <div style={{ padding: "20px 22px" }}>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: colors.brand, fontFamily: "'Nunito', sans-serif", margin: "0 0 8px" }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: 14.5, color: colors.textMuted, lineHeight: 1.7, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Timeline strip */}
                <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 0 }}>
                  {trip.itinerary.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
                      {/* Line + dot */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                        <div style={{
                          width: 12, height: 12, borderRadius: "50%",
                          background: activeDay === i ? colors.gold : colors.sand,
                          border: `2px solid ${activeDay === i ? colors.gold : colors.textMuted}`,
                          flexShrink: 0, marginTop: 4, transition: "background 0.2s",
                        }} />
                        {i < trip.itinerary.length - 1 && (
                          <div style={{ width: 2, flex: 1, background: colors.sand, margin: "4px 0" }} />
                        )}
                      </div>
                      <div style={{ paddingBottom: i < trip.itinerary.length - 1 ? 16 : 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: colors.brand, margin: "0 0 2px" }}>
                          Day {item.day} · {item.title}
                        </p>
                        <p style={{ fontSize: 12.5, color: colors.textMuted, margin: 0, lineHeight: 1.6 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN — Booking card ──────────────────────────────────── */}
          <div style={{ position: "sticky", top: 88 }}>
            <div
              style={{
                background: "#fff",
                border: `1px solid ${colors.sand}`,
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(61,31,31,0.08)",
              }}
            >
              {/* Price header */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${colors.brand} 0%, ${colors.brandLight} 100%)`,
                  padding: "24px 24px 20px",
                }}
              >
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px" }}>
                  Duration
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: "clamp(30px, 5vw, 40px)", fontWeight: 800, color: "#fff", fontFamily: "'Nunito', sans-serif", lineHeight: 1 }}>
                    {trip.duration}
                  </span>
                </div>
              </div>

              {/* Booking details */}
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Group Size", val: trip.groupSize, icon: groupIcon },
                  { label: "Difficulty", val: trip.difficulty, icon: difficultyIcon },
                ].map(({ label, val, icon }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <img src={icon} alt={label} style={{ width: 15, height: 15, objectFit: "contain", opacity: 0.6 }} />
                      <span style={{ fontSize: 13.5, color: colors.textMuted }}>{label}</span>
                    </div>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: colors.brand }}>{val}</span>
                  </div>
                ))}

                <div style={{ height: 1, background: colors.sand }} />

                {/* CTA */}
                <button
                  onClick={() => {
                    trackEvent(
                      "Lead",
                      `Booking Trip ${trip.title}`,
                      "Trip Details Page"
                    );
                    setBookingOpen(true);
                  }}
                  style={{
                    width: "100%", background: colors.gold, color: "#fff",
                    border: "none", borderRadius: 12, padding: "15px",
                    fontSize: 16, fontWeight: 700, cursor: "pointer",
                    letterSpacing: "0.02em", transition: "background 0.2s, transform 0.1s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.goldLight; e.currentTarget.style.transform = "scale(1.02)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = colors.gold; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  Book This Trip
                </button>

                <a
                  href="https://wa.me/250788608794"
                  onClick={() =>
                    trackEvent(
                      "Lead",
                      `Whatsapp Contact ${trip.title}`,
                      "Trip Details Page"
                    )
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <button
                    style={{
                      width: "100%", background: "#25D366", color: "#fff",
                      border: "none", borderRadius: 12, padding: "13px",
                      fontSize: 14, fontWeight: 600, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <img src={whatsappIcon} alt="WhatsApp" style={{ width: 18, height: 18, objectFit: "contain" }} />
                    Chat on WhatsApp
                  </button>
                </a>
              </div>
            </div>

            {/* Trust badges */}
            <div
              style={{
                marginTop: 16,
                background: colors.goldPale,
                border: `1px solid rgba(200,146,42,0.2)`,
                borderRadius: 14,
                padding: "14px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {[
                { icon: secureIcon, text: "Secure booking" },
                { icon: guaranteeIcon, text: "Required permits guaranteed" },
              ].map((item, i) => (
                <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={item.icon} alt={item.text} style={{ width: 18, height: 18, objectFit: "contain", flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, color: colors.brand, fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </>)}
      </div>

      {/* ── Responsive grid collapse ────────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .trip-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <BookingModal
        trip={trip}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

    </div>
  );
};

TripDetailsPage.propTypes = {
  // trip: PropTypes.shape({
  //   image: PropTypes.string,
  //   title: PropTypes.string.isRequired,
  //   subtitle: PropTypes.string,
  //   badge: PropTypes.string,
  //   country: PropTypes.string.isRequired,
  //   category: PropTypes.string,
  //   duration: PropTypes.string,
  //   groupSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //   difficulty: PropTypes.string,
  //   price: PropTypes.number.isRequired,
  //   currency: PropTypes.string,
  //   rating: PropTypes.number,
  //   reviews: PropTypes.number,
  //   highlights: PropTypes.arrayOf(PropTypes.string),
  //   itinerary: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       day: PropTypes.number,
  //       title: PropTypes.string,
  //       desc: PropTypes.string,
  //     })
  //   ),
  // }).isRequired,
  setPage: PropTypes.func.isRequired,
};

// ─── Shared back button style ─────────────────────────────────────────────────
const backBtnStyle = {
  background: colors.brand,
  color: "#fff",
  border: "none",
  borderRadius: 99,
  padding: "10px 22px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};