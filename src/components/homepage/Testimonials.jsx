import PropTypes from "prop-types";
import { colors } from "../../theme/colors";
import { StarRating } from "../../components/StarRating";

export const Testimonials = ({ testimonials }) => {
    return (
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
    );
}

Testimonials.propTypes = {
    testimonials: PropTypes.array.isRequired
};