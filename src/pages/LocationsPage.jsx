import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchLocations } from "../api/APIHandler";
import { colors } from "../theme/colors";
import { Spinner } from "../components/Spinner";
import { LocationCard } from "../components/LocationCard";
// ─── Locations Page ───────────────────────────────────────────────────────────
export const LocationsPage = ({ setPage }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchLocations().then((data) => {
      setLocations(data);
      setLoading(false);
    });
  }, []);

  const filtered =
    filter === "All"
      ? locations
      : locations.filter((l) => l.country === filter);

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", background: colors.cream }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.brand} 0%, ${colors.brandLight} 100%)`,
          padding: "60px 24px 48px",
          textAlign: "center",
        }}
      >
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
          Our Destinations
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            color: "#fff",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            margin: "0 0 16px",
          }}
        >
          Where Will You Go?
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: 16,
            maxWidth: 520,
            margin: "0 auto 32px",
            lineHeight: 1.7,
          }}
        >
          From the misty volcanoes of Rwanda to Uganda's sweeping plains —
          discover the heart of East Africa.
        </p>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {["All", "Rwanda", "Uganda"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background:
                  filter === f ? colors.gold : "rgba(255,255,255,0.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
                cursor: "pointer",
                padding: "8px 20px",
                borderRadius: 99,
                fontSize: 14,
                fontWeight: filter === f ? 700 : 400,
                transition: "all 0.2s",
              }}
            >
              {f === "Rwanda" && "🇷🇼 "}
              {f === "Uganda" && "🇺🇬 "}
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        {loading ? (
          <Spinner />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 28,
            }}
          >
            {filtered.map((loc) => (
              <LocationCard key={loc.id} loc={loc} setPage={setPage} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

LocationsPage.propTypes = {
  setPage: PropTypes.func.isRequired,
};