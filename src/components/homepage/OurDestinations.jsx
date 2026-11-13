import PropTypes from "prop-types";
import { colors } from "../../theme/colors";
import { Spinner } from "../../components/Spinner";

export const OurDestinations = ({ countries, countriesLoading, fetchCountryFlag }) => {
    const countryText =
        countries.length > 1
            ? `${countries.slice(0, -1).join(", ")} and ${countries.slice(-1)}`
            : countries[0];

    return (
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
                            fontFamily: "'Nunito', sans-serif",
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
                        Rwanda Noble Tours operates deep in the heart of East Africa — our
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
                                    fontFamily: "'Nunito', sans-serif",
                                    marginBottom: 4,
                                }}
                            >
                                {c.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

OurDestinations.propTypes = {
    countries: PropTypes.array.isRequired,
    countriesLoading: PropTypes.bool.isRequired,
    fetchCountryFlag: PropTypes.func.isRequired
};
