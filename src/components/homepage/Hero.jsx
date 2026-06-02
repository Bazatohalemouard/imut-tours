import { useState } from "react";
import PropTypes from 'prop-types';
import { Spinner } from "../Spinner";

export const Hero = ({ countries, countriesLoading, setPage, fetchCountryFlag }) => {
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
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url('/images/img_placeholder.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    zIndex: 0,
                }}
            />

            {/* Gradient overlay layer — preserves your original gradient */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(150deg, #1a0c06 10%, #2e1510cc 45%, #3a200899 100%)",
                    zIndex: 1,
                }}
            />

            {/* Your content sits above both layers */}
            <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
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
                            fontFamily: "'Nunito', sans-serif",
                            fontSize: "clamp(36px, 7vw, 68px)",
                            fontWeight: 900,
                            lineHeight: 1.05,
                            letterSpacing: "-0.02em",
                            color: "#fff",
                            margin: "20px 0 26px",
                        }}
                    >
                        Beyond Wild Africa,
                        <br />
                        <em style={{
                            color: "#E8B84B",
                            fontStyle: "italic",
                            fontFamily: "'Telma', cursive",
                            fontWeight: 700
                        }}>Unforgettable Experiences Await</em>
                        <br />

                    </h1>

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
                            background: "rgba(26,12,6,0.82)",
                            border: "1px solid rgba(200,146,42,0.55)",
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
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    {country && (
                                        <img
                                            src={fetchCountryFlag(country.name)}
                                            alt={`${country.name} flag`}
                                            width={40}
                                            height={34}
                                            style={{ flexShrink: 0 }}
                                        />
                                    )}
                                    <div
                                        style={{
                                            fontFamily: "'Nunito', sans-serif",
                                            fontSize: "clamp(22px, 4vw, 32px)",
                                            fontWeight: 700,
                                            color: "#fff",
                                            lineHeight: 1.1,
                                        }}
                                    >
                                        {country?.name}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        fontSize: 13,
                                        color: "#E8B84B",
                                        fontStyle: "italic",
                                        marginTop: 6,
                                    }}
                                >
                                    "{country?.nickname}"
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p
                            onMouseEnter={e => {
                                e.currentTarget.style.color = "rgba(255,255,255,0.95)";
                                e.currentTarget.style.transition = "color 0.3s ease";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = "rgba(255,255,255,0.62)";
                            }}
                            style={{
                                fontSize: 14,
                                color: "rgba(255,255,255,0.62)",
                                lineHeight: 1.7,
                                margin: "0 0 20px",
                                fontWeight: 300,
                                cursor: "default",
                                transition: "color 0.3s ease",
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
                                            fontFamily: "'Nunito', sans-serif",
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

                        <div className="hide-on-small" style={{ display: "block" }}>
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
                                    <button
                                        key={exp}
                                        onMouseEnter={e => Object.assign(e.currentTarget.style, {
                                            background: "rgba(200,146,42,0.18)",
                                            border: "1px solid rgba(200,146,42,0.6)",
                                            color: "#E8B84B",
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 4px 12px rgba(200,146,42,0.15)",
                                        })}
                                        onMouseLeave={e => Object.assign(e.currentTarget.style, {
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            color: "rgba(255,255,255,0.7)",
                                            transform: "translateY(0)",
                                            boxShadow: "none",
                                        })}
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
                                            cursor: "pointer",
                                            transition: "all 0.25s ease",
                                        }}
                                    >
                                        {exp}
                                    </button>
                                ))}
                            </div>
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
            </div>
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