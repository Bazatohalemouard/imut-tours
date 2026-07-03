import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useSEO } from "../utils/useSEO";
import { fetchTrips, fetchCountries } from "../api/APIHandler";
import { colors } from "../theme/colors";
import { Spinner } from "../components/Spinner";
import { TripCard } from "../components/TripCard";
import PageHeader from "../components/PageHeader";
import TripFilterBar from "../components/TripFilterBar";

// ─── Layout constants ──────────────────────────────────────────────────────
// Mobile: 3 columns × 3 rows = 9 cards/page.
// Large screens (≥1024px): 4 columns × 4 rows = 16 cards/page.
const LARGE_BREAKPOINT = "(min-width: 1024px)";
const MOBILE_COLUMNS = 3;
const MOBILE_ROWS = 3;
const LARGE_COLUMNS = 4;
const LARGE_ROWS = 4;

const accent = {
  jungle: "#16302A",
  jungleLight: "#2F5D45",
  sunset: "#E8964A",
  sunsetSoft: "rgba(232, 150, 74, 0.12)",
  border: "#E4E0D6",
};

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.setAttribute("data-trips-page", "true");
  style.textContent = `
    .tp-section {
      max-width: 1280px;
      margin: 0 auto;
      padding: 24px 14px 40px;
    }

    .tp-grid {
      display: grid;
      grid-template-columns: repeat(${MOBILE_COLUMNS}, 1fr);
      gap: 10px;
    }

    @media (min-width: 480px) {
      .tp-grid { gap: 14px; }
    }

    @media (min-width: 640px) {
      .tp-section { padding: 32px 20px 48px; }
      .tp-grid { gap: 18px; }
    }

    @media ${LARGE_BREAKPOINT} {
      .tp-section { padding: 56px 24px 64px; }
      .tp-grid {
        grid-template-columns: repeat(${LARGE_COLUMNS}, 1fr);
        gap: 28px;
      }
    }

    .tp-empty {
      text-align: center;
      padding: 60px 0;
    }

    /* Pagination */
    .tp-pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 28px;
    }

    @media ${LARGE_BREAKPOINT} {
      .tp-pagination { margin-top: 40px; gap: 8px; }
    }

    .tp-page-btn {
      min-width: 34px;
      height: 34px;
      padding: 0 8px;
      border-radius: 8px;
      border: 1.5px solid ${accent.border};
      background: #ffffff;
      color: ${accent.jungle};
      font-size: 13.5px;
      font-weight: 700;
      font-family: 'Inter', -apple-system, sans-serif;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;
    }

    @media ${LARGE_BREAKPOINT} {
      .tp-page-btn { min-width: 38px; height: 38px; font-size: 14px; }
    }

    .tp-page-btn:hover:not(:disabled):not(.tp-page-btn--active) {
      border-color: ${accent.sunset};
      background: ${accent.sunsetSoft};
    }

    .tp-page-btn:focus-visible {
      outline: 2px solid ${accent.sunset};
      outline-offset: 1px;
    }

    .tp-page-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .tp-page-btn--active {
      background: ${accent.jungle};
      border-color: ${accent.jungle};
      color: #ffffff;
    }

    .tp-page-ellipsis {
      min-width: 34px;
      height: 34px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: ${colors.textMuted};
      font-size: 13.5px;
    }

    .tp-page-status {
      width: 100%;
      text-align: center;
      font-size: 12.5px;
      color: ${colors.textMuted};
      margin-top: 8px;
    }
  `;
  document.head.appendChild(style);
}

// Builds a compact page list with ellipses, e.g. [1, '…', 4, 5, 6, '…', 12]
function buildPageList(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const withEllipses = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) {
      withEllipses.push("…");
    }
    withEllipses.push(page);
  });
  return withEllipses;
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pageList = buildPageList(currentPage, totalPages);

  return (
    <nav className="tp-pagination" aria-label="Trips pagination">
      <button
        type="button"
        className="tp-page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pageList.map((page, i) =>
        page === "…" ? (
          <span key={`ellipsis-${i}`} className="tp-page-ellipsis">…</span>
        ) : (
          <button
            key={page}
            type="button"
            className={`tp-page-btn${page === currentPage ? " tp-page-btn--active" : ""}`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        className="tp-page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        ›
      </button>

      <span className="tp-page-status">
        Page {currentPage} of {totalPages}
      </span>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

// ─── Trips Page ───────────────────────────────────────────────────────────────
export const TripsPage = ({ setPage }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("All");
  const [category, setCategory] = useState("All");
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== "undefined" ? window.matchMedia(LARGE_BREAKPOINT).matches : false
  );
  const [currentPage, setCurrentPage] = useState(1);

  useSEO({
    title: "Trips | IMUT Tours & Travel",
    description: "Explore our range of exciting trips and safaris across East Africa. Find the perfect adventure for you.",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Trips", url: "/trips" },
    ],
  });

  useEffect(() => {
    injectStyles();
  }, []);

  // Track the large-screen breakpoint so pagination can switch between
  // the 3×3 (mobile) and 4×4 (large screen) grid sizes.
  useEffect(() => {
    const mql = window.matchMedia(LARGE_BREAKPOINT);
    const handleChange = (e) => setIsLargeScreen(e.matches);
    mql.addEventListener ? mql.addEventListener("change", handleChange) : mql.addListener(handleChange);
    return () => {
      mql.removeEventListener ? mql.removeEventListener("change", handleChange) : mql.removeListener(handleChange);
    };
  }, []);

  useEffect(() => {
    fetchTrips().then((data) => {
      setTrips(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchCountries().then((data) => {
      const countriesWithAll = [
        { id: "all", name: "All" },
        ...data
      ];
      setCountries(countriesWithAll);
      setCountriesLoading(false);
    });
  }, []);

  const categories = [
    "All",
    "Parks & Wildlife",
    "Eco-Parks",
    "Cultural & Heritage",
    "Historical",
    "City Tour",
    "Leisure",
    "Relax",
  ];

  const filtered = useMemo(
    () =>
      trips.filter(
        (t) =>
          (country === "All" || t.country === country) &&
          (category === "All" || (Array.isArray(t.category) ? t.category.includes(category) : t.category === category))
      ),
    [trips, country, category]
  );

  const itemsPerPage = isLargeScreen
    ? LARGE_COLUMNS * LARGE_ROWS
    : MOBILE_COLUMNS * MOBILE_ROWS;

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  // Reset back to page 1 whenever the filters change, the result set
  // changes, or the page size changes (mobile ↔ large screen).
  useEffect(() => {
    setCurrentPage(1);
  }, [country, category, isLargeScreen, filtered.length]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", background: "#fff" }}>
      <PageHeader
        title={'Tours & Safaris'}
        breadcrumb={
          <span>
            <a href="/">Home</a> / <span>Trips</span>
          </span>
        }
      />
      <TripFilterBar
        countries={countries}
        categories={categories}
        country={country}
        setCountry={setCountry}
        category={category}
        setCategory={setCategory}
        tripCount={filtered.length}
      />

      <div className="tp-section">
        {(loading || countriesLoading) && <Spinner />}

        {!loading && !countriesLoading && filtered.length === 0 && (
          <div className="tp-empty">
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ color: colors.textMuted, fontSize: 16 }}>
              No trips match your filters. Try adjusting them.
            </p>
          </div>
        )}

        {!loading && !countriesLoading && filtered.length > 0 && (
          <>
            <div className="tp-grid">
              {paginated.map((trip) => (
                <TripCard key={trip.id} trip={trip} setPage={setPage} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

TripsPage.propTypes = {
  setPage: PropTypes.func.isRequired,
};