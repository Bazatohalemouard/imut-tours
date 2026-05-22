// ─── Navigation ───────────────────────────────────────────────────────────────
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { IMUTLogo } from "../components/IMUTLogo";
import { colors } from "../theme/colors";

const navItems = [
  { id: "home", label: "Home" },
  { id: "trips", label: "Trips" },
  { id: "services", label: "Services" },
  { id: "about", label: "About Us" },
];

export const Navbar = ({ activePage, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = activePage === "home";
  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: transparent ? "transparent" : "rgba(250,247,242,0.97)",
        backdropFilter: transparent ? "none" : "blur(12px)",
        boxShadow: transparent ? "none" : "0 1px 0 rgba(0,0,0,0.06)",
        transition: "background 0.3s, box-shadow 0.3s",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        <button
          onClick={() => { setPage("home"); setMenuOpen(false); }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <IMUTLogo size={36} light={transparent} />
        </button>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: 4,
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 14px",
                fontSize: 14.5,
                fontWeight: activePage === item.id ? 600 : 400,
                color:
                  activePage === item.id
                    ? transparent
                      ? "#fff"
                      : colors.brand
                    : transparent
                    ? "rgba(255,255,255,0.85)"
                    : colors.textMuted,
                borderRadius: 8,
                transition: "all 0.15s",
                letterSpacing: "0.01em",
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setPage("contact")}
            style={{
              marginLeft: 8,
              background: colors.gold,
              color: "#fff",
              border: "none",
              cursor: "pointer",
              padding: "9px 20px",
              borderRadius: 99,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.02em",
              transition: "background 0.2s, transform 0.1s",
            }}
            onMouseEnter={(e) => (e.target.style.background = colors.goldLight)}
            onMouseLeave={(e) => (e.target.style.background = colors.gold)}
          >
            Contact Us
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: 5,
            padding: 8,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 2,
                background: transparent ? "#fff" : colors.brand,
                borderRadius: 2,
                transition: "all 0.2s",
                transformOrigin: "center",
                transform:
                  menuOpen && i === 0
                    ? "translateY(7px) rotate(45deg)"
                    : menuOpen && i === 2
                    ? "translateY(-7px) rotate(-45deg)"
                    : menuOpen && i === 1
                    ? "scaleX(0)"
                    : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: colors.cream,
            padding: "12px 24px 24px",
            borderTop: `1px solid ${colors.sand}`,
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setMenuOpen(false); }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "13px 0",
                fontSize: 16,
                fontWeight: activePage === item.id ? 600 : 400,
                color: activePage === item.id ? colors.brand : colors.textMuted,
                borderBottom: `1px solid ${colors.sand}`,
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { setPage("contact"); setMenuOpen(false); }}
            style={{
              marginTop: 16,
              width: "100%",
              background: colors.gold,
              color: "#fff",
              border: "none",
              cursor: "pointer",
              padding: "14px",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  activePage: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
};
