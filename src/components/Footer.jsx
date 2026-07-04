import PropTypes from "prop-types";
import { IMUTLogo } from "../components/IMUTLogo";
import { colors } from "../theme/colors";

export const Footer = ({ setPage }) => (
  <footer style={{ background: colors.jungle, color: "#fff" }}>
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
            Crafting unforgettable Rwandan adventures, from gorilla treks to immersive safaris and beyond across East Africa.
          </p>
        </div>

        {[
          {
            title: "Explore",
            links: ["Home", "Trips", "About Us", "Contact"],
            pages: ["home", "trips", "about", "contact"],
            newTab: false,
          },
          {
            title: "Services",
            links: ["Tours", "Car Rentals", "Airport Transfers", "Taxi & Cab Service", "Accommodation"],
            pages: ["services", "services", "services", "services", "services"],
            newTab: false,
          },
          {
            title: "Social Media",
            links: ["Instagram"],
            pages: ["https://www.instagram.com/imut_tours/"],
            newTab: true,
          },
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
                    onClick={() => {
                      if (col.newTab) {
                        trackEvent(
                          "Navigation",
                          `Clicked ${col.pages[i]} Link`,
                          "Footer section"
                        );
                        window.open(col.pages[i], '_blank');
                      } else {
                        setPage(col.pages[i], null, "Footer section");
                      }
                    }}
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
          {["Instagram", "Twitter", "Facebook"].map((item) => (
            <button
              key={item}
              onClick={() => window.open(item.toLowerCase(), '_blank')}
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