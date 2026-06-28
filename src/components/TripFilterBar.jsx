import React from "react";

const defaultTheme = {
  jungle: "#16302A",
  jungleLight: "#2F5D45",
  sunset: "#E8964A",
  ink: "#1F2A24",
  paper: "rgba(255,255,255,0.06)",
  hairline: "rgba(255,255,255,0.22)",
  mist: "rgba(255,255,255,0.78)",
  mistFaint: "rgba(255,255,255,0.55)",
};

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.setAttribute("data-expandable-filter-bar", "true");
  style.textContent = `
    .xfb-root {
      font-family: 'Inter', -apple-system, sans-serif;
    }

    .xfb-pill {
      cursor: pointer;
      transition: background 150ms ease, border-color 150ms ease,
        color 150ms ease, transform 150ms ease;
    }
    .xfb-pill:hover { transform: translateY(-1px); }
    .xfb-pill:active { transform: translateY(0); }
    .xfb-pill:focus-visible {
      outline: 2px solid rgba(255,255,255,0.85);
      outline-offset: 2px;
    }

    .xfb-toggle {
      cursor: pointer;
      transition: background 150ms ease, border-color 150ms ease;
    }
    .xfb-toggle:focus-visible {
      outline: 2px solid rgba(255,255,255,0.85);
      outline-offset: 2px;
    }

    .xfb-chevron {
      transition: transform 220ms ease;
    }
    .xfb-toggle[aria-expanded="true"] .xfb-chevron {
      transform: rotate(180deg);
    }

    .xfb-panel-wrap {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 280ms ease;
      overflow: hidden;
    }
    .xfb-panel-wrap.is-open {
      grid-template-rows: 1fr;
    }
    .xfb-panel-inner {
      min-height: 0;
    }

    .xfb-chip {
      animation: xfb-chip-in 180ms ease-out;
    }
    @keyframes xfb-chip-in {
      from { opacity: 0; transform: scale(0.92); }
      to { opacity: 1; transform: scale(1); }
    }

    .xfb-clear-link {
      cursor: pointer;
      transition: opacity 150ms ease;
      background: none;
      border: none;
      padding: 0;
    }
    .xfb-clear-link:hover { opacity: 0.75; }
    .xfb-clear-link:focus-visible {
      outline: 2px solid rgba(255,255,255,0.85);
      outline-offset: 2px;
    }

    .xfb-search input::placeholder {
      color: rgba(255,255,255,0.45);
    }
    .xfb-search input:focus-visible {
      outline: 2px solid rgba(255,255,255,0.85);
      outline-offset: 2px;
    }

    @keyframes xfb-spin {
      to { transform: rotate(360deg); }
    }
    .xfb-spinner {
      animation: xfb-spin 0.7s linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .xfb-panel-wrap, .xfb-chevron, .xfb-pill, .xfb-chip, .xfb-spinner {
        animation: none !important;
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function getOptionValue(opt) {
  return typeof opt === "string" ? opt : opt.value;
}
function getOptionLabel(opt) {
  return typeof opt === "string" ? opt : opt.label;
}

function isOptionSelected(group, optValue) {
  return Array.isArray(group.value)
    ? group.value.includes(optValue)
    : group.value === optValue;
}

function isGroupActive(group) {
  const allLabel = group.allLabel ?? "All";
  if (Array.isArray(group.value)) return group.value.length > 0;
  return Boolean(group.value) && group.value !== allLabel;
}

function handleOptionClick(group, optValue) {
  if (Array.isArray(group.value)) {
    const next = group.value.includes(optValue)
      ? group.value.filter((v) => v !== optValue)
      : [...group.value, optValue];
    group.onChange(next);
  } else {
    group.onChange(optValue);
  }
}

function resetGroup(group) {
  group.onChange(Array.isArray(group.value) ? [] : group.allLabel ?? "All");
}

function Spinner({ color }) {
  return (
    <svg
      className="xfb-spinner"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Loading"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth="2.5"
        strokeOpacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="xfb-chevron"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3 6l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M11 11l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path
        d="M1 1l10 10M11 1L1 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FilterGroup({ group, colors }) {
  return (
    <div>
      <p
        style={{
          fontSize: 11,
          color: colors.mistFaint,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {group.label}
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {group.loading && <Spinner color={colors.mist} />}
        {!group.loading &&
          group.options.map((opt) => {
            const value = getOptionValue(opt);
            const label = getOptionLabel(opt);
            const selected = isOptionSelected(group, value);
            return (
              <button
                key={value}
                type="button"
                className="xfb-pill"
                aria-pressed={selected}
                onClick={() => handleOptionClick(group, value)}
                style={{
                  background: selected ? "#fff" : colors.paper,
                  color: selected ? colors.jungle : colors.mist,
                  border: `1px solid ${
                    selected ? "#fff" : colors.hairline
                  }`,
                  padding: "6px 14px",
                  borderRadius: 99,
                  fontSize: 13,
                  fontWeight: selected ? 700 : 500,
                }}
              >
                {label}
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default function TripFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  groups = [],
  resultsLabel,
  colors,
  defaultExpanded = false,
  className,
  style,
}) {
  React.useEffect(() => {
    injectStyles();
  }, []);

  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const c = { ...defaultTheme, ...colors };

  const primaryGroups = groups.filter((g) => (g.priority ?? "primary") === "primary");
  const moreGroups = groups.filter((g) => g.priority === "more");
  const activeMoreCount = moreGroups.filter(isGroupActive).length;
  const activeGroups = groups.filter(isGroupActive);
  const hasActiveFilters = activeGroups.length > 0 || Boolean(searchValue);

  const clearAll = () => {
    groups.forEach(resetGroup);
    if (onSearchChange) onSearchChange("");
  };

  return (
    <div
      className={`xfb-root${className ? ` ${className}` : ""}`}
      style={style}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", flex: 1 }}>
         

          {primaryGroups.map((group) => (
            <FilterGroup key={group.key} group={group} colors={c} />
          ))}

          {moreGroups.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: 11,
                  color: "transparent",
                  fontWeight: 600,
                  marginBottom: 8,
                  userSelect: "none",
                }}
                aria-hidden="true"
              >
                .
              </p>
              <button
                type="button"
                className="xfb-toggle"
                aria-expanded={expanded}
                aria-controls="xfb-more-panel"
                onClick={() => setExpanded((v) => !v)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: expanded ? "#fff" : c.paper,
                  color: expanded ? c.jungle : c.mist,
                  border: `1px solid ${expanded ? "#fff" : c.hairline}`,
                  padding: "6px 14px",
                  borderRadius: 99,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                More filters
                {activeMoreCount > 0 && (
                  <span
                    style={{
                      background: expanded ? c.jungle : c.sunset,
                      color: "#fff",
                      borderRadius: 99,
                      fontSize: 11,
                      fontWeight: 700,
                      minWidth: 18,
                      height: 18,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 5px",
                    }}
                  >
                    {activeMoreCount}
                  </span>
                )}
                <ChevronIcon />
              </button>
            </div>
          )}
        </div>

        {resultsLabel && (
          <p
            style={{
              fontSize: 13,
              color: c.mistFaint,
              fontWeight: 500,
              margin: 0,
              whiteSpace: "nowrap",
              paddingTop: 28,
            }}
          >
            {resultsLabel}
          </p>
        )}
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            marginTop: 16,
          }}
        >
          {searchValue && (
            <span
              className="xfb-chip"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: c.paper,
                border: `1px solid ${c.hairline}`,
                color: c.mist,
                borderRadius: 99,
                padding: "4px 6px 4px 12px",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              “{searchValue}”
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: c.mist,
                  borderRadius: 99,
                  width: 18,
                  height: 18,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <CloseIcon />
              </button>
            </span>
          )}

          {activeGroups.map((group) => {
            const values = Array.isArray(group.value)
              ? group.value
              : [group.value];
            return values.map((v) => (
              <span
                key={`${group.key}-${v}`}
                className="xfb-chip"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: c.paper,
                  border: `1px solid ${c.hairline}`,
                  color: c.mist,
                  borderRadius: 99,
                  padding: "4px 6px 4px 12px",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                <span style={{ opacity: 0.65 }}>{group.label}:</span> {v}
                <button
                  type="button"
                  onClick={() => handleOptionClick(group, v)}
                  aria-label={`Remove ${group.label} filter: ${v}`}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "none",
                    color: c.mist,
                    borderRadius: 99,
                    width: 18,
                    height: 18,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <CloseIcon />
                </button>
              </span>
            ));
          })}

          <button
            type="button"
            className="xfb-clear-link"
            onClick={clearAll}
            style={{
              color: c.sunset,
              fontSize: 12,
              fontWeight: 700,
              marginLeft: 4,
            }}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Expandable "more filters" panel */}
      {moreGroups.length > 0 && (
        <div
          id="xfb-more-panel"
          className={`xfb-panel-wrap${expanded ? " is-open" : ""}`}
        >
          <div className="xfb-panel-inner">
            <div
              style={{
                marginTop: 20,
                paddingTop: 20,
                borderTop: `1px solid ${c.hairline}`,
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              {moreGroups.map((group) => (
                <FilterGroup key={group.key} group={group} colors={c} />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                marginTop: 16,
              }}
            >
              <button
                type="button"
                className="xfb-clear-link"
                onClick={() => moreGroups.forEach(resetGroup)}
                style={{ color: c.mist, fontSize: 13, fontWeight: 600 }}
              >
                Clear
              </button>
              <button
                type="button"
                className="xfb-pill"
                onClick={() => setExpanded(false)}
                style={{
                  background: "#fff",
                  color: c.jungle,
                  border: "1px solid #fff",
                  padding: "6px 16px",
                  borderRadius: 99,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}