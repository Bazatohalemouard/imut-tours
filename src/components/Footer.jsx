import PropTypes from "prop-types";
import { IMUTLogo } from "../components/IMUTLogo";
import { colors } from "../theme/colors";
import { trackEvent } from "../utils/analytics";
import rwandaFlag from "../assets/flags/rwanda.png";
// import southSudanFlag from "../assets/flags/south-sudan.png";

const offices = [
  {
    flag: rwandaFlag,
    city: "Kigali",
    country: "Rwanda",
    address: "KK 35 Ave, Kigali",
    phone: "+250 788 608 794",
    email: "customersupport@imut-tours.com",
  },
  // {
  //   flag: southSudanFlag,
  //   city: "Juba",
  //   country: "South Sudan",
  //   address: "Juba Town",
  //   phone: "+211 (0)917 876 617",
  //   email: null,
  // },
];

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
          <ul style={{ listStyle: "none", padding: 0, marginTop: 10 }}>
            {offices.map((office) => (
              <li key={office.city} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <img
                    src={office.flag}
                    alt={`${office.country} flag`}
                    style={{
                      width: 18,
                      height: 12,
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    {office.city}, {office.country}
                  </span>
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: 13,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {office.address}
                </p>
                <a
                  href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: 13,
                    lineHeight: 1.7,
                    textDecoration: "none",
                    display: "block",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.65)")
                  }
                >
                  {office.phone}
                </a>
                {office.email && (
                  <a
                    href={`mailto:${office.email}`}
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: 13,
                      lineHeight: 1.7,
                      textDecoration: "none",
                      display: "block",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#fff")}
                    onMouseLeave={(e) =>
                      (e.target.style.color = "rgba(255,255,255,0.65)")
                    }
                  >
                    {office.email}
                  </a>
                )}
              </li>
            ))}
          </ul>
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