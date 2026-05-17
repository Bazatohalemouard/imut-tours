import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchTrips, fetchCountries } from "../api/APIHandler";
import { colors } from "../theme/colors";
import { Spinner } from "../components/Spinner";
import { TripCard } from "../components/TripCard";

// ─── Trips Page ───────────────────────────────────────────────────────────────
export const TripsPage = ({ setPage }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("All");
  const [category, setCategory] = useState("All");
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);

  useEffect(() => {
    fetchTrips().then((data) => {
      setTrips(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchCountries().then((data) => {
      const countriesWithAll = [
        { id: "all", name: "All" },
        ...data
      ];
      setCountries(countriesWithAll);
      setCountriesLoading(false);
    });
  }, []);

  const categories = [
    "All",
    "Parks & Wildlife",
    "Eco-Parks",
    "Cultural & Heritage",
    "Historical",
    "City Tour",
    "Leisure",
    "Relax",
  ];

  const filtered = trips.filter(
    (t) =>
      (country === "All" || t.country === country) &&
      (category === "All" || (Array.isArray(t.category) ? t.category.includes(category) : t.category === category))
  );

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", background: "#fff" }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.jungle} 0%, ${colors.jungleLight} 100%)`,
          padding: "60px 24px 48px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Our Journeys
          </p>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              color: "#fff",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              margin: "0 0 28px",
            }}
          >
            All Trips & Safaris
          </h1>

          {/* Filters */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div>
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Country
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {countriesLoading && <Spinner />}
                {!countriesLoading && countries.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCountry(c.name)}
                    style={{
                      background:
                        country === c.name ? "#fff" : "rgba(255,255,255,0.15)",
                      color: country === c.name ? colors.jungle : "#fff",
                      border: "1px solid rgba(255,255,255,0.3)",
                      cursor: "pointer",
                      padding: "6px 14px",
                      borderRadius: 99,
                      fontSize: 13,
                      fontWeight: country === c ? 700 : 400,
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Category
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {!countriesLoading && categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    style={{
                      background:
                        category === c ? "#fff" : "rgba(255,255,255,0.15)",
                      color: category === c ? colors.jungle : "#fff",
                      border: "1px solid rgba(255,255,255,0.3)",
                      cursor: "pointer",
                      padding: "6px 14px",
                      borderRadius: 99,
                      fontSize: 13,
                      fontWeight: category === c ? 700 : 400,
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        {loading && <Spinner />}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ color: colors.textMuted, fontSize: 16 }}>
              No trips match your filters. Try adjusting them.
            </p>
          </div>
        )}
        {!loading && filtered.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 28,
            }}
          >
            {filtered.map((trip) => (
              <TripCard key={trip.id} trip={trip} setPage={setPage} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

TripsPage.propTypes = {
  setPage: PropTypes.func.isRequired,
};
