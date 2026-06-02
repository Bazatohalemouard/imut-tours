import { colors } from "../../theme/colors";
import PropTypes from "prop-types";

export const CallToAction = ({ setPage }) => {
    return(
              <section
        style={{
          background: `linear-gradient(135deg, ${colors.jungle} 0%, ${colors.jungleLight} 100%)`,
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "#fff",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              margin: "0 0 16px",
            }}
          >
            Ready for Your African Adventure?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 16,
              lineHeight: 1.7,
              margin: "0 0 36px",
            }}
          >
            Our expert team is ready to craft your perfect itinerary. Every
            journey is unique — let's build yours together.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setPage("contact")}
              style={{
                background: "#fff",
                color: colors.jungle,
                border: "none",
                cursor: "pointer",
                padding: "16px 32px",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Plan My Trip
            </button>
            <button
              onClick={() => setPage("trips")}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.4)",
                cursor: "pointer",
                padding: "16px 32px",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Browse Trips
            </button>
          </div>
        </div>
      </section>
    );
};

CallToAction.propTypes = {
  setPage: PropTypes.func.isRequired,
};