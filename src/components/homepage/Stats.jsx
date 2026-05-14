import { colors } from "../../theme/colors";
import PropTypes from "prop-types";

export const Stats = ({countries = []}) => {
    const stats = [
        { value: "500+", label: "Safaris Completed" },
        { value: "98%", label: "Happy Travelers" },
        { value: countries?.length?.toString(), label: "Countries" },
        { value: "10+", label: "Years Experience" },
    ];

    return (
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
    );
};

Stats.propTypes = {
    countries: PropTypes.array,
};