import { useState } from "react";
import PropTypes from 'prop-types';
import { Spinner } from "../Spinner";

export const Hero = ({countries, countriesLoading, setPage, fetchCountryFlag }) => {
    const [activeId, setActiveId] = useState("rwanda");
    const [animKey, setAnimKey] = useState(0);

    const country = countries?.find((c) => c.id === activeId);

    const handleSelect = (id) => {
        setActiveId(id);
        setAnimKey((k) => k + 1);
    };

    return (
        <section
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "flex-start",
                overflow: "hidden",
                background: "linear-gradient(150deg, #1a0c06 0%, #2e1510 45%, #3a2008 100%)",
                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            }}
        >
            {/* Ambient orbs */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div
                    style={{
                        position: "absolute",
                        width: 520,
                        height: 520,
                        top: -120,
                        right: -120,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(200,146,42,0.13) 0%, transparent 70%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        width: 320,
                        height: 320,
                        bottom: 60,
                        left: -80,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(200,146,42,0.08) 0%, transparent 70%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        width: 280,
                        height: 280,
                        top: "12%",
                        right: "6%",
                        borderRadius: "50%",
                        border: "1px solid rgba(200,146,42,0.18)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        width: 180,
                        height: 180,
                        top: "22%",
                        right: "16%",
                        borderRadius: "50%",
                        border: "1px solid rgba(200,146,42,0.12)",
                    }}
                />
            </div>

            <div
                style={{
                    position: "relative",
                    maxWidth: 1120,
                    margin: "0 auto",
                    padding: "clamp(48px, 8vw, 80px) clamp(16px, 5vw, 32px) clamp(48px, 6vw, 64px)",
                    width: "100%",
                }}
            >

                {/* Headline */}
                <h1
                    style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "clamp(36px, 7vw, 68px)",
                        fontWeight: 900,
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        color: "#fff",
                        margin: "20px 0 16px",
                    }}
                >
                    Beyond Wild Africa,
                    <br />
                    <em style={{ color: "#E8B84B", fontStyle: "italic" }}>Unforgettable Experiences Await</em>
                    <br />
                    
                </h1>

                {/* Country selector */}
                <p
                    style={{
                        fontSize: 10,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.38)",
                        marginBottom: 10,
                        fontWeight: 500,
                    }}
                >
                    Choose your destination
                </p>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 28,
                    }}
                    role="tablist"
                    aria-label="Select a country"
                >
                    {countriesLoading && <Spinner />}
                    {!countriesLoading && countries?.map((c) => {
                        const isActive = c.id === activeId;
                        return (
                            <button
                                key={c.id}
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => handleSelect(c.id)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "8px 16px",
                                    borderRadius: 99,
                                    border: isActive
                                        ? "1px solid #C8921A"
                                        : "1px solid rgba(200,146,42,0.28)",
                                    background: isActive ? "#C8921A" : "rgba(200,146,42,0.08)",
                                    color: isActive ? "#fff" : "rgba(255,255,255,0.62)",
                                    fontFamily: "inherit",
                                    fontSize: 13,
                                    fontWeight: isActive ? 600 : 400,
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    transition: "all 0.18s ease",
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = "rgba(200,146,42,0.2)";
                                        e.currentTarget.style.borderColor = "rgba(200,146,42,0.55)";
                                        e.currentTarget.style.color = "#fff";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = "rgba(200,146,42,0.08)";
                                        e.currentTarget.style.borderColor = "rgba(200,146,42,0.28)";
                                        e.currentTarget.style.color = "rgba(255,255,255,0.62)";
                                    }
                                }}
                            >
                                {/* <img src={fetchCountryFlag(c.name)} alt={`${c.name} flag`} width={20} height={14} /> */}
                                {c.name}
                            </button>
                        );
                    })}
                </div>

                {/* Detail card */}
                <div
                    key={animKey}
                    role="tabpanel"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(200,146,42,0.22)",
                        borderRadius: 14,
                        padding: "clamp(18px, 4vw, 28px)",
                        marginBottom: 32,
                        animation: "fadeUp 0.28s ease",
                    }}
                >
                    {/* Card header */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: 12,
                            marginBottom: 14,
                            flexWrap: "wrap",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    fontSize: "clamp(22px, 4vw, 32px)",
                                    fontWeight: 700,
                                    color: "#fff",
                                    lineHeight: 1.1,
                                }}
                            >
                                {country && <img src={fetchCountryFlag(country.name)} alt={`${country.name} flag`} width={40} height={34} />} {country?.name}
                            </div>
                            <div
                                style={{
                                    fontSize: 13,
                                    color: "#E8B84B",
                                    fontStyle: "italic",
                                    marginTop: 3,
                                }}
                            >
                                "{country?.nickname}"
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                background: "rgba(200,146,42,0.18)",
                                border: "1px solid rgba(200,146,42,0.38)",
                                borderRadius: 99,
                                padding: "5px 12px",
                                fontSize: 12,
                                color: "#E8B84B",
                                fontWeight: 500,
                                flexShrink: 0,
                                maxWidth: 280,
                                textAlign: "right",
                            }}
                        >
                            ★ {country?.highlight}
                        </div>
                    </div>

                    {/* Description */}
                    <p
                        style={{
                            fontSize: 14,
                            color: "rgba(255,255,255,0.62)",
                            lineHeight: 1.7,
                            margin: "0 0 20px",
                            fontWeight: 300,
                        }}
                    >
                        {country?.desc}
                    </p>

                    {/* Stats */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
                            gap: 10,
                            marginBottom: 20,
                        }}
                    >
                        {country?.stats.map((s) => (
                            <div
                                key={s.label}
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: 10,
                                    padding: "12px 10px",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: "'Playfair Display', Georgia, serif",
                                        fontSize: 20,
                                        fontWeight: 700,
                                        color: "#E8B84B",
                                        lineHeight: 1,
                                        marginBottom: 5,
                                    }}
                                >
                                    {s.num}
                                </div>
                                <div
                                    style={{
                                        fontSize: 10,
                                        color: "rgba(255,255,255,0.42)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.07em",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Experiences */}
                    <p
                        style={{
                            fontSize: 10,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "rgba(255,255,255,0.32)",
                            marginBottom: 10,
                            fontWeight: 500,
                        }}
                    >
                        Experiences await
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {country?.experiences.map((exp) => (
                            <span
                                key={exp}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 5,
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 8,
                                    padding: "5px 11px",
                                    fontSize: 12,
                                    color: "rgba(255,255,255,0.7)",
                                }}
                            >
                                {exp}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTA buttons */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                        onClick={() => setPage?.("trips")}
                        style={{
                            background: "#C8921A",
                            color: "#fff",
                            border: "none",
                            padding: "14px 28px",
                            borderRadius: 10,
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            letterSpacing: "0.01em",
                            transition: "background 0.2s, transform 0.15s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#d9a020";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#C8921A";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Book a Trip to {country?.name} →
                    </button>
                    <button
                        onClick={() => setPage?.("trips")}
                        style={{
                            background: "rgba(255,255,255,0.07)",
                            color: "rgba(255,255,255,0.72)",
                            border: "1px solid rgba(255,255,255,0.14)",
                            padding: "14px 22px",
                            borderRadius: 10,
                            fontSize: 14,
                            fontWeight: 500,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "background 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.13)";
                            e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                            e.currentTarget.style.color = "rgba(255,255,255,0.72)";
                        }}
                    >
                        Explore All Trips
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    bottom: 28,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 5,
                    animation: "bounce 2.5s ease-in-out infinite",
                }}
            >
                <span
                    style={{
                        fontSize: 9,
                        letterSpacing: "0.15em",
                        color: "rgba(255,255,255,0.28)",
                        textTransform: "uppercase",
                    }}
                >
                    Scroll
                </span>
                <div
                    style={{
                        width: 1,
                        height: 36,
                        background: "linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)",
                    }}
                />
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
        </section>
    );
};
Hero.propTypes = {
    countries: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        highlight: PropTypes.string.isRequired,
        stats: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })).isRequired,
        experiences: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
    countriesLoading: PropTypes.bool.isRequired,
    setPage: PropTypes.func.isRequired,
    fetchCountryFlag: PropTypes.func.isRequired
};


export default Hero;