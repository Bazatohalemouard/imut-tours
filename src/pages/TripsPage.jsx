import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSEO } from "../utils/useSEO";
import { fetchTrips, fetchCountries } from "../api/APIHandler";
import { colors } from "../theme/colors";
import { Spinner } from "../components/Spinner";
import { TripCard } from "../components/TripCard";
import PageHeader from "../components/PageHeader";
import TripFilterBar from "../components/TripFilterBar";

// ─── Trips Page ───────────────────────────────────────────────────────────────
export const TripsPage = ({ setPage }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("All");
  const [category, setCategory] = useState("All");
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const [countriesLoading, setCountriesLoading] = useState(true);
  useSEO({
    title: "Trips | IMUT Tours & Travel",
    description: "Explore our range of exciting trips and safaris across East Africa. Find the perfect adventure for you.",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Trips", url: "/trips" },
    ],
  });

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
      <PageHeader title={'Tours & Safaris'} subtitle={''} />

      <div
        style={{
          background: `linear-gradient(135deg, ${colors.jungle} 0%, ${colors.jungleLight} 100%)`,
          padding: "60px 24px 48px",
        }}
      >

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <TripFilterBar
            colors={{
              jungle: colors.jungle,
              jungleLight: colors.jungleLight,
              sunset: colors.sunset,
              paper: "rgba(255,255,255,0.15)",
              hairline: "rgba(255,255,255,0.30)",
              mist: "#fff",
              mistFaint: "rgba(255,255,255,0.65)",
            }}
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search destinations, tours..."
            resultsLabel={`${filtered.length} ${filtered.length === 1 ? "trip" : "trips"
              } found`}
            defaultExpanded={false}
            groups={[
              {
                key: "country",
                label: "Country",
                priority: "primary",
                loading: countriesLoading,
                options: countries.map((country) => ({
                  value: country.name,
                  label: country.name,
                })),
                value: country,
                onChange: setCountry,
                allLabel: "All",
              },
              {
                key: "category",
                label: "Category",
                priority: "primary",
                loading: false,
                options: categories.map((category) => ({
                  value: category,
                  label: category,
                })),
                value: category,
                onChange: setCategory,
                allLabel: "All",
              },
            ]}
          />


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
