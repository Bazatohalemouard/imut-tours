/**
 * useSEO.js — Generic, reusable SEO hook + schema builder utilities
 *
 * Architecture:
 *   SITE          — single source of truth for brand/contact constants
 *   buildX()      — pure functions that return schema objects (no DOM, testable)
 *   useSEO()      — hook that ONLY handles DOM side-effects (title, meta, LD+JSON)
 *
 * The hook is completely decoupled from any page's data shape.
 * Each page constructs its own config and passes it in.
 *
 * Usage examples at the bottom of this file.
 */

import { useEffect, useRef } from "react";

// ─── Site constants ───────────────────────────────────────────────────────────
// Single source of truth — update once, reflected everywhere.
export const SITE = {
  name:    "IMUT Tours & Travel",
  url:     "https://www.imut-tours.com",
  phone:   "+250 788 608 794",
  email:   "info@imut-tours.com",
  locale:  "en_RW",
  address: {
    country:  "RW",
    locality: "Kigali",
  },
};

// ─── Provider object (shared across all schemas) ──────────────────────────────
export function buildProvider() {
  return {
    "@type":     "TravelAgency",
    "name":      SITE.name,
    "url":       SITE.url,
    "telephone": SITE.phone,
    "email":     SITE.email,
    "address": {
      "@type":           "PostalAddress",
      "addressCountry":  SITE.address.country,
      "addressLocality": SITE.address.locality,
    },
  };
}

// ─── Schema builders — pure functions, no DOM ─────────────────────────────────

/**
 * BreadcrumbList schema from a simple array.
 *
 * @param {Array<{ name: string, url: string }>} crumbs
 *
 * Example:
 *   buildBreadcrumbSchema([
 *     { name: "Home",     url: "/" },
 *     { name: "Services", url: "/services" },
 *     { name: "Safaris",  url: "/services/tours" },
 *   ])
 */
export function buildBreadcrumbSchema(crumbs = []) {
  return {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, i) => ({
      "@type":  "ListItem",
      "position": i + 1,
      "name":   crumb.name,
      "item":   crumb.url.startsWith("http")
        ? crumb.url
        : `${SITE.url}${crumb.url}`,
    })),
  };
}

/**
 * Service schema — for individual service detail pages.
 *
 * @param {{ name, description, id }} service
 */
export function buildServiceSchema(service) {
  return {
    "@context":    "https://schema.org",
    "@type":       "Service",
    "name":        service.name,
    "description": service.description,
    "serviceType": service.name,
    "areaServed":  { "@type": "Place", "name": "East Africa" },
    "provider":    buildProvider(),
    "offers": {
      "@type":        "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency":"USD",
    },
  };
}

/**
 * TouristTrip schema — for individual trip/safari detail pages.
 *
 * @param {{ name, description, id, destination?: string }} trip
 */
export function buildTripSchema(trip) {
  return {
    "@context":    "https://schema.org",
    "@type":       "TouristTrip",
    "name":        trip.name,
    "description": trip.description,
    "touristType": "Adventure",
    "itinerary": {
      "@type": "ItemList",
      "name":  trip.destination ?? "East Africa",
    },
    "provider": buildProvider(),
    "offers": {
      "@type":         "Offer",
      "availability":  "https://schema.org/InStock",
      "priceCurrency": "USD",
    },
  };
}

/**
 * WebPage schema — for static pages (About, Contact, Home, etc.)
 *
 * @param {{ name, description, path }} page
 *   path — e.g. "/about" or "/contact"
 */
export function buildWebPageSchema({ name, description, path }) {
  return {
    "@context":    "https://schema.org",
    "@type":       "WebPage",
    "name":        name,
    "description": description,
    "url":         `${SITE.url}${path}`,
    "isPartOf": {
      "@type": "WebSite",
      "name":  SITE.name,
      "url":   SITE.url,
    },
    "publisher": buildProvider(),
  };
}

/**
 * Organization schema — used on the About page.
 */
export function buildOrganizationSchema() {
  return {
    "@context":   "https://schema.org",
    "@type":      "TravelAgency",
    "name":       SITE.name,
    "url":        SITE.url,
    "telephone":  SITE.phone,
    "email":      SITE.email,
    "foundingDate": "2014",
    "address": {
      "@type":           "PostalAddress",
      "addressCountry":  SITE.address.country,
      "addressLocality": SITE.address.locality,
    },
    "areaServed": { "@type": "Place", "name": "East Africa" },
  };
}

// ─── useSEO hook ──────────────────────────────────────────────────────────────
/**
 * useSEO — handles all SEO-related DOM side-effects for a page.
 *
 * @param {object} config
 * @param {string}   config.title        — Full <title> string (required)
 * @param {string}   config.description  — Meta description, ideally ≤155 chars
 * @param {Array}    [config.schemas]    — Array of JSON-LD schema objects.
 *                                         BreadcrumbList is auto-appended when
 *                                         `breadcrumbs` is provided.
 * @param {Array}    [config.breadcrumbs]— [{ name, url }] — auto-builds
 *                                         BreadcrumbList and appends to schemas.
 *
 * The hook injects/updates <title>, <meta name="description">,
 * and a single <script type="application/ld+json"> block.
 * Everything is cleaned up on unmount.
 */
export function useSEO({ title, description, schemas = [], breadcrumbs = [] }) {
  const ldRef = useRef(null);

  useEffect(() => {
    if (!title) return;

    // 1. <title>
    document.title = title;

    // 2. <meta name="description">
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    // Enforce ≤ 155 char limit Google uses
    const safeDesc = description
      ? description.length > 155
        ? `${description.slice(0, 152).trimEnd()}…`
        : description
      : "";
    metaDesc.setAttribute("content", safeDesc);

    // 3. JSON-LD
    // Auto-append BreadcrumbList if breadcrumbs were supplied
    const allSchemas = [
      ...schemas,
      ...(breadcrumbs.length > 0 ? [buildBreadcrumbSchema(breadcrumbs)] : []),
    ];

    ldRef.current?.remove();

    if (allSchemas.length > 0) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      // Wrap multiple schemas in an array; single schema as plain object
      script.textContent = JSON.stringify(
        allSchemas.length === 1 ? allSchemas[0] : allSchemas
      );
      document.head.appendChild(script);
      ldRef.current = script;
    }

    return () => {
      ldRef.current?.remove();
    };
  }, [title, description, schemas, breadcrumbs]);
}
