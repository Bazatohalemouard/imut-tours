import { useState } from "react";
import PropTypes from 'prop-types';

const COUNTRIES = [
    {
        id: "rwanda",
        name: "Rwanda",
        nickname: "Land of a Thousand Hills",
        highlight: "Home to half the world's remaining mountain gorillas",
        desc: "Rwanda packs astonishing biodiversity into one of Africa's smallest countries. With three national parks, pristine rainforests, and the world's most successful conservation story, it's a must-visit for any nature enthusiast. Expect immaculate roads, warm culture, and zero plastic — Africa's cleanest country.",
        stats: [
            { num: "3", label: "National Parks" },
            { num: "~600", label: "Mountain Gorillas" },
            { num: "700+", label: "Bird Species" },
            { num: "1,000m", label: "Avg Altitude" },
        ],
        experiences: [
            "Gorilla Trekking in Volcanoes NP",
            "Nyungwe Rainforest Canopy Walk",
            "Lake Kivu Kayaking & Sunset Cruise",
            "Congo Nile Trail Cycling",
            "Akagera Big Five Safari",
            "Coffee Farm Tour & Cupping Session",
            "Kigali Genocide Memorial Visit",
            "Kigali City Food & Market Tour",
            "Iby'Iwacu Cultural Village Stay",
            "Traditional Intore Dance Performance",
            "Women's Cooperative Basket Weaving Workshop",
            "Urwagwa (Banana Beer) Brewing with Locals",
            "Community-Led Reforestation Walk",
            "Agahozo-Shalom Youth Village Visit",
            "Rwandan Home Cooking Class",
            "Bike Through Musanze Village",
            "Bird Watching in Rugezi Marsh",
            "Golden Monkey Tracking",
            "Visit to Local Health Center & NGO Projects",
            "Kigali Art & Fashion District Walk",
        ],
    },
    {
        id: "uganda",
        name: "Uganda",
        nickname: "Pearl of Africa",
        highlight: "More primate species than anywhere on Earth",
        desc: "Winston Churchill called it the 'Pearl of Africa' — Uganda's staggering variety proves him right. From Bwindi's mist-covered gorilla forests to the source of the Nile in Jinja, Uganda offers unmatched primate encounters, thrilling white-water rafting, and birding that draws experts from every continent.",
        stats: [
            { num: "10", label: "National Parks" },
            { num: "1,061", label: "Bird Species" },
            { num: "~500", label: "Chimpanzees" },
            { num: "~500", label: "Mountain Gorillas" },
        ],
        experiences: [
            "Gorilla Trekking in Bwindi",
            "Chimpanzee Tracking in Kibale",
            "White-Water Rafting on the Nile",
            "World-Class Birding in Queen Elizabeth NP",
            "Rwenzori Mountain Hiking",
            "Nile Source Boat Cruise in Jinja",
            "Murchison Falls Sunset Safari",
            "Batwa Pygmy Cultural Immersion",
            "Fishing Village Stay on Lake Victoria",
            "Ugandan Cooking Class with a Local Family",
            "Craft Market Tour in Kampala",
            "Community School Visit in Fort Portal",
            "Buganda Kingdom Palace & Royal History Tour",
            "Sipi Falls Trek & Coffee Tour with Farmers",
            "Boda-Boda City Tour through Kampala",
            "Ssese Islands Beach & Village Exploration",
            "Women's Craft Cooperative Workshop",
            "Red Chilli Hideaway Community Garden Tour",
            "Boat Safari on the Albert Nile",
            "Night Game Drive in Ziwa Rhino Sanctuary",
        ],
    },
    {
        id: "kenya",
        name: "Kenya",
        nickname: "Cradle of the Safari",
        highlight: "The Great Migration: nature's most epic show",
        desc: "Kenya invented the word 'safari'. The Maasai Mara's Great Migration — 1.5 million wildebeest crossing the Mara River — is one of nature's grandest spectacles. Beyond the savannah, Kenya offers Indian Ocean beaches, snow-capped Kilimanjaro views, and vibrant Nairobi culture.",
        stats: [
            { num: "60+", label: "Parks & Reserves" },
            { num: "1,100+", label: "Bird Species" },
            { num: "1.5M", label: "Migrating Wildebeest" },
            { num: "480km", label: "Coastline" },
        ],
        experiences: [
            "Maasai Mara Great Migration Safari",
            "Mount Kenya Trekking",
            "Diani Beach Snorkeling & Diving",
            "Big Five Game Drive",
            "Hot Air Balloon Over the Mara",
            "Amboseli & Kilimanjaro Views",
            "Overnight in a Maasai Manyatta",
            "Maasai Warrior Training & Spear Throwing",
            "Nairobi Street Food Safari",
            "Visit to Kibera Community Art Projects",
            "Sheng Language & Hip-Hop Culture Tour in Nairobi",
            "Lamu Old Town Dhow Sailing & Swahili Culture",
            "Kazuri Beads Women's Cooperative Factory Visit",
            "Organic Tea Plantation Walk in Kericho",
            "Camel Trekking with Samburu Herders",
            "Turkana Cultural Heritage Tour",
            "Fishing with Luo Fishermen on Lake Victoria",
            "Nairobi National Museum & Heritage Walk",
            "Community Conservation Project in Laikipia",
            "Bomas of Kenya Traditional Dance & Craft Show",
        ],
    },
    {
        id: "south-sudan",
        name: "South Sudan",
        nickname: "The Untouched Frontier",
        highlight: "One of Earth's last truly undiscovered migrations",
        desc: "For the true adventurer, South Sudan conceals a staggering secret: the world's largest land animal migration after the Serengeti. Over 1.2 million white-eared kob thunder across Boma National Park — a spectacle almost no tourist has ever witnessed. Raw, authentic Africa.",
        stats: [
            { num: "1.2M", label: "Kob Migration" },
            { num: "6", label: "National Parks" },
            { num: "8,000+", label: "Nile Lechwe" },
            { num: "100+", label: "Mammal Species" },
        ],
        experiences: [
            "Boma National Park Migration Expedition",
            "Sudd Wetland Boat Tours",
            "Rare Bird Spotting in Southern Savannahs",
            "Frontier Wildlife Photography",
            "Dinka Cattle Camp Cultural Visit",
            "Mundari Tribe Community Stay",
            "White Nile Fishing with Local Fishermen",
            "Juba City Market & Street Food Discovery",
            "Traditional Wrestling Festival Attendance",
            "Nimule National Park Game Walk",
            "Oral History Sessions with Village Elders",
            "Artisan Basket & Pottery Workshop",
            "Nile Sunset Canoe Paddle",
            "Meeting Returnee Communities & Hearing Their Stories",
            "Peace & Reconciliation Community Forum Visit",
        ],
    },
    {
        id: "tanzania",
        name: "Tanzania",
        nickname: "Land of Kilimanjaro & Serengeti",
        highlight: "Summit, safari, and beach — all in one country",
        desc: "Tanzania holds Africa's highest mountain, its most iconic savannah, and one of the world's most beautiful archipelagos. The Ngorongoro Crater — the world's largest intact volcanic caldera — teems with lions, elephants, and flamingos. Summit, safari, and beach within a single week.",
        stats: [
            { num: "22", label: "National Parks" },
            { num: "5,895m", label: "Kilimanjaro Height" },
            { num: "25,000", label: "Lions in Serengeti" },
            { num: "50+", label: "Zanzibar Beaches" },
        ],
        experiences: [
            "Kilimanjaro Summit Climb",
            "Serengeti Big Five Safari",
            "Zanzibar Beach & Spice Island Exploration",
            "Ngorongoro Crater Game Drive",
            "Ocean Snorkeling off Pemba Island",
            "Chimpanzee Trekking in Mahale",
            "Dar es Salaam Harbour & Makonde Carving Market",
            "Zanzibar Stone Town Swahili History Walk",
            "Spice Farm Tour & Zanzibar Cooking Class",
            "Maasai Village Overnight Stay",
            "Meet the Hadzabe Bushmen of Lake Eyasi",
            "Datoga Tribe Blacksmithing Demonstration",
            "Mikumi Village Cycle Tour",
            "Arusha Coffee Lodge Farm-to-Cup Experience",
            "Tingatinga Art Cooperative Workshop in Dar",
            "Dhow Building Yard Tour with Coastal Craftsmen",
            "Women's Seaweed Farming Cooperative Visit in Zanzibar",
            "Ruaha Community Conservation Walk",
            "Kilimanjaro Porter Welfare Project Tour",
            "Traditional Ngoma Drumming & Dance Evening",
        ],
    },
    {
        id: "burundi",
        name: "Burundi",
        nickname: "The Heart of Africa",
        highlight: "Africa's most underrated lakeside paradise",
        desc: "Overlooked by most tourists, Burundi rewards intrepid travelers with jaw-dropping scenery along Lake Tanganyika — the world's longest and second-deepest freshwater lake. Primates, rolling highlands, and the monument marking the Nile's most southerly source make it one of Africa's most exciting emerging destinations.",
        stats: [
            { num: "3", label: "National Parks" },
            { num: "673km", label: "Lake Tanganyika Shore" },
            { num: "596", label: "Bird Species" },
            { num: "~600", label: "Chimp Population" },
        ],
        experiences: [
            "Lake Tanganyika Swimming & Snorkeling",
            "Chimpanzee Trekking in Kibira Forest",
            "Nile's Most Southerly Source Monument Visit",
            "Lake Tanganyika Sunset Boat Trip",
            "Royal Drummers of Burundi Live Performance",
            "Highland Tea Plantation Hike",
            "Bird Watching in Rusizi Delta",
            "Bujumbura Central Market Food & Craft Tour",
            "Fishing with Lake Tanganyika Fishermen at Dawn",
            "Gishora Royal Drum Sanctuary Cultural Visit",
            "Traditional Rugamba Dance Evening with Village Communities",
            "Burundian Home Cooking Class with a Local Family",
            "Visit to Women's Peace-Building Cooperatives",
            "Kayak Along the Rusizi River",
            "Community School Visit & Education Initiative Tour",
            "Artisan Pottery Workshop in Rural Gitega",
            "Gitega National Museum & Monarchy Heritage Walk",
            "Village Homestay in the Mumirwa Highlands",
            "Emerging Eco-Tourism Trail with Local Guides",
            "Storytelling Evening with Village Elders",
        ],
    },
];

export const Hero = ({ setPage, fetchCountryFlag }) => {
    const [activeId, setActiveId] = useState("rwanda");
    const [animKey, setAnimKey] = useState(0);

    const country = COUNTRIES.find((c) => c.id === activeId);

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
                    {COUNTRIES.map((c) => {
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
                                <img src={fetchCountryFlag(country.name)} alt={`${country.name} flag`} width={40} height={34} /> {country.name}
                            </div>
                            <div
                                style={{
                                    fontSize: 13,
                                    color: "#E8B84B",
                                    fontStyle: "italic",
                                    marginTop: 3,
                                }}
                            >
                                "{country.nickname}"
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
                            ★ {country.highlight}
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
                        {country.desc}
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
                        {country.stats.map((s) => (
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
                        {country.experiences.map((exp) => (
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
                        Book a Trip to {country.name} →
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
    setPage: PropTypes.func.isRequired,
    fetchCountryFlag: PropTypes.func.isRequired
};


export default Hero;