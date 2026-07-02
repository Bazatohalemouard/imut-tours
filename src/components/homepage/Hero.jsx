import { useState } from "react";
import PropTypes from "prop-types";
import { IconTrekking, IconCompass, IconArrowUpRight } from "@tabler/icons-react";
import { SERVICES, HERO_COPY } from "../../api/datasets/herodata";

/**
 * Design language: "Field Dossier" — a guide outfit's expedition manifest,
 * not a postcard. Bold geometric display type, a mono "data" face for
 * tags/labels, a single serif-italic accent for the one line that should
 * feel handwritten. Layout is deliberately uneven: a stamp overlaps the
 * headline, a framed field photo overlaps the services panel, and the
 * panel itself sits lower than the copy beside it.
 */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=Newsreader:ital,wght@1,500;1,600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

  :root {
    --exp-ink: #14160F;
    --exp-moss: #2E3A26;
    --exp-clay: #8A5A3C;
    --exp-ochre: #C99A3B;
    --exp-rust: #A8512A;
    --exp-sand: #ECE3CC;
    --exp-stone: #9CA68C;
  }

  @keyframes exp-reveal {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes exp-rowIn {
    from { opacity: 0; transform: translateX(14px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes exp-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes exp-spin {
    to { transform: rotate(360deg); }
  }

  .exp-reveal-1 { opacity: 0; animation: exp-reveal 0.7s ease-out forwards; animation-delay: 0.05s; }
  .exp-reveal-2 { opacity: 0; animation: exp-reveal 0.7s ease-out forwards; animation-delay: 0.16s; }
  .exp-reveal-3 { opacity: 0; animation: exp-reveal 0.7s ease-out forwards; animation-delay: 0.28s; }
  .exp-reveal-4 { opacity: 0; animation: exp-reveal 0.7s ease-out forwards; animation-delay: 0.4s; }
  .exp-row { opacity: 0; animation: exp-rowIn 0.5s ease-out forwards; }

  @media (prefers-reduced-motion: reduce) {
    .exp-reveal-1, .exp-reveal-2, .exp-reveal-3, .exp-reveal-4, .exp-row {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
    .exp-marquee-dup { display: none !important; }
    *[class*="animate-["] { animation: none !important; }
  }
`;

if (typeof document !== "undefined" && !document.getElementById("expedition-hero-styles")) {
  const tag = document.createElement("style");
  tag.id = "expedition-hero-styles";
  tag.textContent = STYLES;
  document.head.appendChild(tag);
}

// ─── Decorative geometry ───────────────────────────────────────────────────

/** Angular, off-axis shapes standing in for the soft circular "orbs" of a
 *  templated hero — bolder edges, asymmetric placement, earthy tints only. */
const GeoShapes = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <span className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--exp-ochre)_0%,transparent_70%)] opacity-20" />
    <span className="absolute left-[-3.5rem] top-1/3 hidden h-56 w-56 rotate-45 border border-[var(--exp-sand)]/10 sm:block" />
    <span className="absolute bottom-6 right-[10%] hidden h-36 w-36 rotate-12 border border-[var(--exp-ochre)]/25 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] lg:block" />
  </div>
);

// ─── Field stamp (signature element) ───────────────────────────────────────

/** A slowly spinning, dashed "verified route" stamp — the one piece of
 *  flourish the rest of the page stays quiet around. */
const FieldStamp = ({ className }) => (
  <div className={`inline-flex flex-col items-center gap-2 ${className}`} aria-hidden="true">
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full">
      <span className="absolute inset-0 animate-[exp-spin_22s_linear_infinite] rounded-full border-2 border-dashed border-[var(--exp-ochre)]/60" />
      <span className="absolute inset-2 rounded-full border border-[var(--exp-sand)]/15" />
      <IconCompass size={26} className="relative text-[var(--exp-ochre)]" />
    </div>
    <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.2em] text-[var(--exp-stone)]">
      Field Verified
    </span>
  </div>
);

FieldStamp.propTypes = { className: PropTypes.string };
FieldStamp.defaultProps = { className: "" };

// ─── Destination ticker ────────────────────────────────────────────────────

/** Thin, full-width data strip above the fold — earns its motion by acting
 *  like a live manifest readout rather than ambient decoration. */
const DestinationTicker = ({ countries, countriesLoading, fetchCountryFlag }) => {
  let content;

  if (countriesLoading) {
    content = Array.from({ length: 5 }).map((_, i) => (
      <span key={`load-${i}`} className="h-3 w-20 animate-pulse rounded-full bg-[var(--exp-sand)]/10" />
    ));
  } else if (countries && countries.length > 0) {
    content = countries.map((c) => (
      <span key={c.id} className="inline-flex items-center gap-2 whitespace-nowrap">
        <img src={fetchCountryFlag(c.name)} alt="" className="h-3 w-5 rounded-[2px] object-cover" />
        {c.name}
      </span>
    ));
  } else {
    content = ["Kenya", "Tanzania", "Uganda", "Rwanda", "Namibia"].map((name) => (
      <span key={name} className="whitespace-nowrap">
        {name}
      </span>
    ));
  }

  return (
    <div className="relative z-10 flex items-center gap-4 overflow-hidden border-y border-[var(--exp-ochre)]/15 bg-[var(--exp-moss)] py-2 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.18em] text-[var(--exp-stone)]">
      <span className="hidden shrink-0 border-r border-[var(--exp-sand)]/10 pl-4 pr-4 sm:inline">Field Notes</span>
      <div className="flex shrink-0 animate-[exp-marquee_26s_linear_infinite] items-center gap-10 pr-10">
        {content}
        <span aria-hidden="true" className="exp-marquee-dup contents">
          {content}
        </span>
      </div>
    </div>
  );
};

DestinationTicker.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string.isRequired })
  ),
  countriesLoading: PropTypes.bool,
  fetchCountryFlag: PropTypes.func.isRequired,
};
DestinationTicker.defaultProps = { countries: [], countriesLoading: false };

// ─── Framed field photo ────────────────────────────────────────────────────

/** A single contained, mat-framed photo instead of a full-bleed background
 *  — it carries the warmth on its own and straightens up on hover. */
const FramedPhoto = ({ className }) => {
  const [tilted, setTilted] = useState(true);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setTilted(false)}
      onMouseLeave={() => setTilted(true)}
      onFocus={() => setTilted(false)}
      onBlur={() => setTilted(true)}
      style={{ transform: tilted ? "rotate(-4deg)" : "rotate(0deg)", transition: "transform 0.4s ease" }}
    >
      <div className="border-[6px] border-[var(--exp-sand)] bg-[var(--exp-sand)] p-1 shadow-[0_18px_40px_rgba(10,12,8,0.45)]">
        <img
          src="/images/giraffe-bg.jpg"
          alt="Guides leading a trek across open savanna"
          className="h-40 w-full object-cover sm:h-48 lg:h-56"
        />
      </div>
      <span className="absolute -bottom-3 -right-3 rounded-full bg-[var(--exp-ochre)] px-3 py-1 font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.16em] text-[var(--exp-ink)] shadow-md">
        On Route
      </span>
    </div>
  );
};

FramedPhoto.propTypes = { className: PropTypes.string };
FramedPhoto.defaultProps = { className: "" };

// ─── Manifest row (service entry) ──────────────────────────────────────────

const getCode = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/** One catalog entry in the services manifest. The two-letter code is a
 *  gear-tag reference, not a step number — these aren't sequential. */
const ManifestRow = ({ service, setPage }) => {
  const Icon = service.icon;
  const code = getCode(service.name);

  return (
    <button
      type="button"
      onClick={() => setPage("services", { id: service.id })}
      aria-label={`Go to ${service.name}`}
      className={`group flex w-full items-center justify-between gap-4 border-l-2 py-4 pl-4 pr-3 text-left transition-colors hover:bg-[var(--exp-rust)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--exp-ochre)] ${
        service.isPrimary ? "border-[var(--exp-ochre)] bg-[var(--exp-ochre)]/5" : "border-transparent"
      }`}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--exp-sand)]/15 font-['IBM_Plex_Mono'] text-[10px] font-semibold text-[var(--exp-ochre)]">
          {code}
        </span>
        <Icon size={18} className="shrink-0 text-[var(--exp-sand)]/70" aria-hidden="true" />
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-['Inter'] text-sm font-semibold text-[var(--exp-sand)]">
            {service.name}
          </span>
          <span className="truncate font-['Inter'] text-xs text-[var(--exp-stone)]">{service.tagline}</span>
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {service.isPrimary && (
          <span className="hidden font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.16em] text-[var(--exp-ochre)] sm:inline">
            Featured
          </span>
        )}
        <IconArrowUpRight
          size={16}
          className="text-[var(--exp-stone)] transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--exp-ochre)]"
        />
      </span>
    </button>
  );
};

ManifestRow.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    isPrimary: PropTypes.bool,
  }).isRequired,
  setPage: PropTypes.func.isRequired,
};

// ─── Hero ───────────────────────────────────────────────────────────────────

/**
 * Hero section.
 *
 * Props:
 *   countries        – array of country objects (falls back to a static list)
 *   countriesLoading – show a skeleton ticker while countries load
 *   setPage          – navigate to a named page
 *   fetchCountryFlag – (countryName: string) => flagImageUrl: string
 */
export const HeroServices = ({ countries, countriesLoading, setPage, fetchCountryFlag }) => {
  const destinationCount = (countries && countries.length) || 4;

  return (
    <section
      className="relative w-full overflow-hidden font-['Inter']"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% -10%, rgba(201,154,59,0.16), transparent 45%), radial-gradient(circle at 100% 115%, rgba(177,80,43,0.18), transparent 50%), linear-gradient(180deg, var(--exp-ink), #10140d)",
      }}
    >
      <GeoShapes />

      <DestinationTicker
        countries={countries}
        countriesLoading={countriesLoading}
        fetchCountryFlag={fetchCountryFlag}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-10 lg:pb-28 lg:pt-16">
        <div className="relative lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10">
          {/* ── Copy column ─────────────────────────────────────────────── */}
          <div className="relative lg:col-span-7">
            <FieldStamp className="exp-reveal-1 mb-6 lg:absolute lg:-top-2 lg:right-0 lg:mb-0 lg:translate-x-4" />

            <p className="exp-reveal-1 max-w-sm font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.22em] text-[var(--exp-ochre)]">
              Guided Expeditions · Field-Tested Routes
            </p>

            <h1 className="exp-reveal-2 mt-4 max-w-xl font-['Space_Grotesk'] text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-[var(--exp-sand)] sm:text-5xl lg:text-[3.75rem]">
              {HERO_COPY.headline}
              <span className="mt-1 block font-['Newsreader'] text-[1.05em] font-medium italic text-[var(--exp-ochre)]">
                {HERO_COPY.headlineEm}
              </span>
            </h1>

            <p className="exp-reveal-3 mt-5 max-w-md font-['Inter'] text-[15px] leading-relaxed text-[var(--exp-stone)]">
              {HERO_COPY.subheadline}
            </p>

            <div className="exp-reveal-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setPage("trips")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--exp-ochre)] px-6 py-3.5 font-['Inter'] text-sm font-semibold text-[var(--exp-ink)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--exp-rust)] hover:text-[var(--exp-sand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--exp-sand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--exp-ink)]"
              >
                <IconTrekking size={18} aria-hidden="true" />
                {HERO_COPY.ctaPrimary}
              </button>

              <button
                type="button"
                onClick={() => setPage("services")}
                className="group inline-flex items-center justify-center gap-1.5 rounded-sm px-1 font-['Inter'] text-sm font-semibold text-[var(--exp-sand)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--exp-ochre)]"
              >
                See all services
                <IconArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="exp-reveal-4 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.16em] text-[var(--exp-stone)]">
              <span>{SERVICES.length} Service Lines</span>
              <span className="h-1 w-1 rounded-full bg-[var(--exp-stone)]/50" aria-hidden="true" />
              <span>{destinationCount}+ Countries Mapped</span>
            </div>
          </div>

          {/* ── Manifest column (offset lower for the asymmetric feel) ───── */}
          <div className="relative mt-12 lg:col-span-5 lg:col-start-8 lg:mt-28">
            <FramedPhoto className="mb-6 w-40 sm:w-48 lg:absolute lg:-left-14 lg:-top-16 lg:z-10 lg:mb-0 lg:w-44" />

            <div className="relative rounded-2xl border border-[var(--exp-sand)]/10 bg-[var(--exp-moss)]/60 p-5 backdrop-blur-sm sm:p-6">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.2em] text-[var(--exp-stone)]">
                  {HERO_COPY.servicesLabel}
                </h2>
                <span className="font-['IBM_Plex_Mono'] text-[10px] text-[var(--exp-stone)]/70">
                  {SERVICES.length} Lines
                </span>
              </div>

              <div className="divide-y divide-[var(--exp-sand)]/10">
                {SERVICES.map((service, i) => (
                  <div key={service.id} className="exp-row" style={{ animationDelay: `${0.35 + i * 0.08}s` }}>
                    <ManifestRow service={service} setPage={setPage} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroServices.propTypes = {
  /** Runtime country data from API/CMS. Falls back to a static list if omitted or empty. */
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      stats: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
      ).isRequired,
      experiences: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  countriesLoading: PropTypes.bool,
  setPage: PropTypes.func.isRequired,
  fetchCountryFlag: PropTypes.func.isRequired,
};

HeroServices.defaultProps = {
  countries: [],
  countriesLoading: false,
};

export default HeroServices;