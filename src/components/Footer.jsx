import PropTypes from "prop-types";
import { IMUTLogo } from "../components/IMUTLogo";
import { colors } from "../theme/colors";

export const Footer = ({ setPage }) => (
  <footer style={{ background: colors.brandDark, color: "#fff" }}>
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "60px 24px 32px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
          marginBottom: 48,
        }}
      >
        <div>
          <IMUTLogo size={36} light />
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              lineHeight: 1.7,
              margin: "16px 0 0",
              maxWidth: 260,
            }}
          >
            Crafting unforgettable East African adventures since 2014. Gorilla
            treks, safaris, and beyond.
          </p>
        </div>

        {[
          {
            title: "Explore",
            links: ["Home", "Trips", "About Us", "Contact"],
            pages: ["home", "trips", "about", "contact"],
          },
          // {
          //   title: "Destinations",
          //   links: [
          //     "Volcanoes NP",
          //     "Nyungwe Forest",
          //     "Lake Kivu",
          //     "Bwindi Forest",
          //     "Queen Elizabeth NP",
          //   ],
          //   pages: new Array(5).fill("trips"),
          // },
          // {
          //   title: "Experiences",
          //   links: [
          //     "Gorilla Trekking",
          //     "Chimp Tracking",
          //     "Big Five Safari",
          //     "River Safaris",
          //     "Cultural Tours",
          //   ],
          //   pages: new Array(5).fill("trips"),
          // },
        ].map((col) => (
          <div key={col.title}>
            <h4
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: colors.goldLight,
                margin: "0 0 16px",
              }}
            >
              {col.title}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {col.links.map((link, i) => (
                <li key={i} style={{ marginBottom: 10 }}>
                  <button
                    onClick={() => setPage(col.pages[i])}
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.65)",
                      fontSize: 14,
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "left",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#fff")}
                    onMouseLeave={(e) =>
                      (e.target.style.color = "rgba(255,255,255,0.65)")
                    }
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: 0 }}>
          © 2026 IMUT Tours. A division of International Marathon United Technology Rwanda Ltd.
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          {[].map((item) => (
            <button
              key={item}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.45)",
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  setPage: PropTypes.func.isRequired,
};