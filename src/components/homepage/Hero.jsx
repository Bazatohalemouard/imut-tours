import { colors } from "../../theme/colors";
import locationIcon from "../../assets/icons/placeholder.png";

export const Hero = () => {
    return (
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
    );
}
