import { colors } from "../../theme/colors";
import PropTypes from "prop-types";
import { Spinner } from "../../components/Spinner";
import { TripCard } from "../../components/TripCard";

export const FeaturedTrips = ({ trips, tripsLoading, setPage }) => {
    return (
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
                                fontFamily: "'Nunito', sans-serif",
                                fontWeight: 700,
                                margin: 0,
                            }}
                        >
                            Most Popular Trips
                        </h2>
                    </div>
                    <button
                        onClick={() => setPage("trips", null, "Featured trips section")}
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
                            <TripCard key={trip.id} trip={trip} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

FeaturedTrips.propTypes = {
    trips: PropTypes.array.isRequired,
    tripsLoading: PropTypes.bool.isRequired,
    setPage: PropTypes.func.isRequired
};