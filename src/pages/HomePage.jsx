import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchTrips, fetchCountries } from "../api/APIHandler";

import { colors } from "../theme/colors";
import { Spinner } from "../components/Spinner";
import { TripCard } from "../components/TripCard";
import { StarRating } from "../components/StarRating";
import locationIcon from "../assets/icons/placeholder.png";
import gorillaIcon from "../assets/icons/gorilla.png";
import elephantIcon from "../assets/icons/elephant.png";
import monkeyIcon from "../assets/icons/monkey.png";
import kayakIcon from "../assets/icons/kayaking.png";
import hikingIcon from "../assets/icons/hiking.png";
import birdWatchingIcon from "../assets/icons/birds.png";
import rwandaFlag from "../assets/flags/rwanda.png";
import ugandaFlag from "../assets/flags/uganda.png";
import tanzaniaFlag from "../assets/flags/tanzania.png";
import kenyaFlag from "../assets/flags/kenya.png";
import burundiFlag from "../assets/flags/burundi.png";


// ─── Home Page ────────────────────────────────────────────────────────────────
export const HomePage = ({ setPage }) => {
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);

  const fetchCountryFlag = (country) => {
    if (country === "Rwanda") return rwandaFlag;
    if (country === "Uganda") return ugandaFlag;
    if (country === "Tanzania") return tanzaniaFlag;
    if (country === "Burundi") return burundiFlag;
    if (country === "Kenya") return kenyaFlag;
    return "";
  }

  useEffect(() => {
    fetchTrips().then((data) => {
      setTrips(data.slice(0, 3));
      setTripsLoading(false);
    });
  }, []);


  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data);
      setCountriesLoading(false);
    });
  }, []);

  const countryList = countries.map((c) => c.name);
  const countryText =
    countryList.length > 1
      ? `${countryList.slice(0, -1).join(", ")} and ${countryList.slice(-1)}`
      : countryList[0];

  const stats = [
    { value: "500+", label: "Safaris Completed" },
    { value: "98%", label: "Happy Travelers" },
    { value: countryList.length.toString(), label: "Countries" },
    { value: "10+", label: "Years Experience" },
  ];

  const categories = [
    { icon: gorillaIcon, label: "Gorilla Trekking", count: "4 experiences" },
    { icon: elephantIcon, label: "Big Five Safari", count: "6 experiences" },
    { icon: monkeyIcon, label: "Chimp Tracking", count: "3 experiences" },
    { icon: kayakIcon, label: "Kayaking", count: "2 experiences" },
    { icon: hikingIcon, label: "Hiking", count: "5 experiences" },
    { icon: birdWatchingIcon, label: "Bird Watching", count: "3 experiences" },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      country: "United Kingdom",
      text: "Watching mountain gorillas in their natural habitat was the single most profound experience of my life. IMUT made every detail seamless.",
      trip: "Rwanda Gorilla Trek",
      rating: 5,
    },
    {
      name: "James K.",
      country: "United States",
      text: "From the moment we landed to our departure, everything was handled with incredible professionalism. The guides' knowledge was unmatched.",
      trip: "Uganda Double Gorilla Safari",
      rating: 5,
    },
    {
      name: "Amara N.",
      country: "Germany",
      text: "Lake Kivu at sunset with a cup of freshly brewed Rwandan coffee — I still dream about it. IMUT knows how to curate magical moments.",
      trip: "Lake Kivu Weekend",
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${colors.brandDark} 0%, ${colors.brand} 60%, #5C3A1E 100%)`,
          }}
        />
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: "45vw",
            height: "45vw",
            maxWidth: 560,
            maxHeight: 560,
            borderRadius: "50%",
            border: `1px solid rgba(200,146,42,0.25)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "5%",
            right: "0%",
            width: "36vw",
            height: "36vw",
            maxWidth: 450,
            maxHeight: 450,
            borderRadius: "50%",
            border: `1px solid rgba(200,146,42,0.15)`,
            pointerEvents: "none",
          }}
        />

        {/* Hero image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "55%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85"
            alt="Gorilla in Rwanda"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.35,
              mixBlendMode: "luminosity",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(61,31,31,1) 0%, rgba(61,31,31,0.2) 80%)",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "120px 24px 80px",
            width: "100%",
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(200,146,42,0.2)",
                border: `1px solid rgba(200,146,42,0.4)`,
                padding: "6px 14px",
                borderRadius: 99,
                marginBottom: 24,
              }}
            >
              <img src={locationIcon} alt="globe" width={12} height={12} />
              <span
                style={{
                  fontSize: 12,
                  color: colors.goldLight,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                East Africa Specialists
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(38px, 6vw, 72px)",
                color: "#fff",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                lineHeight: 1.1,
                margin: "0 0 24px",
                letterSpacing: "-0.02em",
              }}
            >
              Wild Africa,
              <br />
              <span style={{ color: colors.goldLight }}>Unforgettable</span>
              <br />
              Encounters
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: 1.7,
                margin: "0 0 40px",
                maxWidth: 480,
              }}
            >
              Embark on the journey of a lifetime — trekking with mountain
              gorillas, tracking chimpanzees, and witnessing the Big Five across
              East African Parks.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => setPage("trips")}
                style={{
                  background: colors.gold,
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  padding: "16px 32px",
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  transition: "transform 0.15s, background 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                Explore Trips →
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            animation: "bounce 2s ease-in-out infinite",
          }}
        >
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>SCROLL</span>
          <div
            style={{
              width: 1,
              height: 40,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
            }}
          />
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: colors.brand, padding: "28px 24px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 24,
            textAlign: "center",
          }}
        >
          {stats.map((s, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: "clamp(24px, 4vw, 36px)",
                  fontWeight: 700,
                  color: colors.goldLight,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                  marginTop: 2,
                  letterSpacing: "0.04em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section
        style={{ background: colors.cream, padding: "80px 24px" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
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
              Experience Categories
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                color: colors.brand,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              What Will You Discover?
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
            }}
          >
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setPage("trips")}
                style={{
                  background: "#fff",
                  border: `1px solid ${colors.sand}`,
                  borderRadius: 16,
                  padding: "28px 16px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(61,31,31,0.1)";
                  e.currentTarget.style.borderColor = colors.gold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = colors.sand;
                }}
              >
                <img src={cat.icon} alt={cat.label} width={52} height={52} />
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.brand,
                  }}
                >
                  {cat.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: colors.textMuted,
                  }}
                >
                  {cat.count}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trips */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <p
                style={{
                  color: colors.gold,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Featured Journeys
              </p>
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 40px)",
                  color: colors.brand,
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Most Popular Trips
              </h2>
            </div>
            <button
              onClick={() => setPage("trips")}
              style={{
                background: "none",
                border: `1.5px solid ${colors.brand}`,
                color: colors.brand,
                cursor: "pointer",
                padding: "10px 24px",
                borderRadius: 99,
                fontSize: 14,
                fontWeight: 600,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.brand;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = colors.brand;
              }}
            >
              View All Trips
            </button>
          </div>

          {tripsLoading ? (
            <Spinner />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} setPage={setPage} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Destinations Banner */}
      <section
        style={{
          background: colors.brand,
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "-10%",
            width: "60%",
            paddingBottom: "60%",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: colors.goldLight,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Our Territories
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                color: "#fff",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                lineHeight: 1.2,
                margin: "0 0 20px",
              }}
            >
              East Africa,
              <br />
              Endless Wonder
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 16,
                lineHeight: 1.7,
                margin: "0 0 32px",
              }}
            >
              IMUT Tours operates deep in the heart of East Africa — our
              destinations span {countryText}, each with its own wild beauty and
              unforgettable experiences.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {countriesLoading && (<Spinner />)}
            {!countriesLoading && countries.map((c) => (
              <div
                key={c.name}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 16,
                  padding: "24px 20px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <img
                  src={fetchCountryFlag(c.name)}
                  alt={`${c.name} flag`}
                  width={56}
                  height={40}
                  style={{
                    objectFit: "contain",
                    marginBottom: 12,
                    display: "block",
                  }}
                />
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: 4,
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: 16,
                  }}
                >
                  {c.desc}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: colors.goldLight,
                    letterSpacing: "0.06em",
                  }}
                >
                  {c.experiences} EXPERIENCES
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: colors.cream, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
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
              Traveler Stories
            </p>
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                color: colors.brand,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                margin: 0,
              }}
            >
              What Our Guests Say
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "28px 24px",
                  border: `1px solid ${colors.sand}`,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: 56,
                    color: colors.goldPale,
                    fontFamily: "serif",
                    lineHeight: 0.8,
                    marginBottom: 16,
                  }}
                >
                  "
                </div>
                <p
                  style={{
                    color: colors.charcoal,
                    fontSize: 15,
                    lineHeight: 1.7,
                    margin: "0 0 20px",
                    fontStyle: "italic",
                  }}
                >
                  {t.text}
                </p>
                <div style={{ borderTop: `1px solid ${colors.sand}`, paddingTop: 16 }}>
                  <StarRating value={t.rating} />
                  <div
                    style={{
                      fontWeight: 700,
                      color: colors.brand,
                      fontSize: 14,
                      marginTop: 6,
                    }}
                  >
                    {t.name}
                  </div>
                  <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}>
                    {t.country} · {t.trip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: `linear-gradient(135deg, ${colors.jungle} 0%, ${colors.jungleLight} 100%)`,
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "#fff",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              margin: "0 0 16px",
            }}
          >
            Ready for Your African Adventure?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 16,
              lineHeight: 1.7,
              margin: "0 0 36px",
            }}
          >
            Our expert team is ready to craft your perfect itinerary. Every
            journey is unique — let's build yours together.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setPage("contact")}
              style={{
                background: "#fff",
                color: colors.jungle,
                border: "none",
                cursor: "pointer",
                padding: "16px 32px",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Plan My Trip
            </button>
            <button
              onClick={() => setPage("trips")}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.4)",
                cursor: "pointer",
                padding: "16px 32px",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Browse Itineraries
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

HomePage.propTypes = {
  setPage: PropTypes.func.isRequired,
};
