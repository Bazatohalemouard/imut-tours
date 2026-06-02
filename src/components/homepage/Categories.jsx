import PropTypes from "prop-types";
import { colors } from "../../theme/colors";

export const Categories = ({categories = [], setPage}) => {
    return (
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
                            fontFamily: "'Nunito', sans-serif",
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

    );
};

Categories.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string,
            label: PropTypes.string,
            count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        })
    ),
    setPage: PropTypes.func.isRequired,
};