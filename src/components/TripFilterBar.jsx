import React, { useState, useId } from "react";
import PropTypes from "prop-types";
import { colors } from "../theme/colors";

const accent = {
  jungle: "#16302A",
  jungleLight: "#2F5D45",
  sunset: "#E8964A",
  sunsetSoft: "rgba(232, 150, 74, 0.12)",
  sand: "#F4EAD9",
  border: "#E4E0D6",
};

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.setAttribute("data-trip-filter-bar", "true");
  style.textContent = `
    .tfb-root {
      background: #ffffff;
      border-bottom: 1px solid ${accent.border};
      box-shadow: 0 10px 24px -20px rgba(22, 48, 42, 0.35);
      position: relative;
    }

    .tfb-seam {
      height: 3px;
      width: 100%;
      background: linear-gradient(90deg, ${accent.sunset} 0%, ${accent.jungleLight} 65%, ${accent.jungle} 100%);
    }

    .tfb-toggle {
      width: 100%;
      border: none;
      background: #ffffff;
      cursor: pointer;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      text-align: left;
      font-family: 'Inter', -apple-system, sans-serif;
      transition: background-color 0.15s ease;
    }

    .tfb-toggle:hover {
      background-color: ${accent.sunsetSoft};
    }

    .tfb-toggle:focus-visible {
      outline: 2px solid ${accent.sunset};
      outline-offset: -2px;
    }

    .tfb-summary {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .tfb-count {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px 11px;
      border-radius: 999px;
      background: ${accent.jungle};
      color: #ffffff;
      font-family: 'Nunito', 'Inter', sans-serif;
      font-weight: 800;
      font-size: 12.5px;
      letter-spacing: 0.01em;
      white-space: nowrap;
    }

    .tfb-meta {
      font-size: 12.5px;
      color: ${colors.textMuted};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-transform: capitalize;
    }

    .tfb-chevron {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: ${accent.sunsetSoft};
      transition: transform 0.25s ease, background-color 0.15s ease;
    }

    .tfb-toggle[aria-expanded="true"] .tfb-chevron {
      transform: rotate(180deg);
      background: ${accent.sunset};
    }

    .tfb-toggle[aria-expanded="true"] .tfb-chevron svg {
      stroke: #ffffff;
    }

    .tfb-panel {
      display: grid;
      grid-template-rows: 0fr;
      opacity: 0;
      transition: grid-template-rows 0.28s ease, opacity 0.22s ease;
    }

    .tfb-panel--open {
      grid-template-rows: 1fr;
      opacity: 1;
    }

    .tfb-panel-inner {
      min-height: 0;
      overflow: hidden;
    }

    .tfb-grid {
      padding: 18px 20px 22px;
      border-top: 1px solid ${accent.border};
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .tfb-field {
      display: grid;
      grid-template-columns: 84px 1fr;
      align-items: center;
      gap: 10px;
    }

    .tfb-label {
      font-size: 12.5px;
      font-weight: 700;
      color: ${accent.jungle};
      font-family: 'Nunito', 'Inter', sans-serif;
      letter-spacing: 0.01em;
    }

    .tfb-select-wrap {
      position: relative;
    }

    .tfb-select-wrap svg.tfb-select-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }

    .tfb-select {
      width: 100%;
      appearance: none;
      -webkit-appearance: none;
      padding: 11px 34px 11px 36px;
      border-radius: 10px;
      border: 1.5px solid ${accent.border};
      background-color: #fbfaf7;
      font-size: 13.5px;
      font-weight: 600;
      color: ${colors.textPrimary};
      cursor: pointer;
      transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23E8964A' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 10px center;
      background-size: 14px;
    }

    .tfb-select:hover {
      border-color: ${accent.sunset};
      background-color: #ffffff;
    }

    .tfb-select:focus-visible {
      outline: none;
      border-color: ${accent.sunset};
      background-color: #ffffff;
      box-shadow: 0 0 0 3px ${accent.sunsetSoft};
    }

    @media (min-width: 768px) {
      .tfb-grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 18px;
      }

      .tfb-field {
        grid-template-columns: 1fr;
        gap: 8px;
      }

      .tfb-label {
        font-size: 13px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .tfb-panel,
      .tfb-chevron {
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

const PinIcon = () => (
  <svg className="tfb-select-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent.jungle} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const TagIcon = () => (
  <svg className="tfb-select-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent.jungle} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24L4 3a1 1 0 0 0-1 1l.24 5.59a2 2 0 0 0 .59 1.41l9.58 9.59a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83Z" />
    <circle cx="7.5" cy="7.5" r="1.2" fill={accent.jungle} stroke="none" />
  </svg>
);

const TripFilterBar = ({
  countries,
  categories,
  country,
  setCountry,
  category,
  setCategory,
  tripCount
}) => {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  React.useEffect(() => {
    injectStyles();
  }, []);

  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const toggleExpand = () => setExpanded((v) => !v);

  return (
    <div className="tfb-root">
      <div className="tfb-seam" aria-hidden="true" />

      <button
        type="button"
        className="tfb-toggle"
        onClick={toggleExpand}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <span className="tfb-summary">
          <span className="tfb-count">{tripCount} trips</span>
          <span className="tfb-meta">
            {country !== "All" ? country : "All countries"} • {category !== "All" ? category : "All categories"}
          </span>
        </span>

        <span className="tfb-chevron">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent.jungle} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.15s ease" }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      <div id={panelId} className={`tfb-panel${expanded ? " tfb-panel--open" : ""}`}>
        <div className="tfb-panel-inner">
          <div className="tfb-grid">
            <div className="tfb-field">
              <label className="tfb-label" htmlFor="tfb-country">Country</label>
              <div className="tfb-select-wrap">
                <PinIcon />
                <select
                  id="tfb-country"
                  className="tfb-select"
                  value={country}
                  onChange={handleCountryChange}
                >
                  {countries.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="tfb-field">
              <label className="tfb-label" htmlFor="tfb-category">Category</label>
              <div className="tfb-select-wrap">
                <TagIcon />
                <select
                  id="tfb-category"
                  className="tfb-select"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TripFilterBar.propTypes = {
  countries: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  country: PropTypes.string.isRequired,
  setCountry: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  tripCount: PropTypes.number.isRequired
};

export default TripFilterBar;