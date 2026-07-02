/**
 * heroData.js
 * All static content for the Hero section.
 * No JSX, no component logic — pure data only.
 */

import {
  IconTrekking,
  IconCarSuv,
  IconCar,
  IconBuildingAirport,
  IconBuildingEstate,
} from "@tabler/icons-react";

export const SERVICES = [
  {
    id: "tours",
    name: "Tours & Safaris",
    tagline: "Expert-led safari & cultural tours",
    icon: IconTrekking,
    isPrimary: false,
    page: "tours",
  },
  {
    id: "car-rentals",
    name: "Car Rentals",
    tagline: "Self-drive or chauffeured",
    icon: IconCarSuv,
    isPrimary: false,
    page: "car-rentals",
  },
  {
    id: "airport-transfers",
    name: "Airport Transfers",
    tagline: "Meet & greet included",
    icon: IconBuildingAirport,
    isPrimary: false,
    page: "airport-transfers",
  },
  {
    id: "taxi",
    name: "Transport Services",
    tagline: "City & inter-city rides",
    icon: IconCar,
    isPrimary: false,
    page: "taxi",
  },
  {
    id: "hotels",
    name: "Hotel Bookings",
    tagline: "Budget to luxury stays",
    icon: IconBuildingEstate,
    isPrimary: false,
    page: "hotels",
  },
];

// ─── Hero copy ────────────────────────────────────────────────────────────────
export const HERO_COPY = {
  badge: "East Africa's Premier Travel Partner",
  headline: "One Partner.",
  headlineEm: "For, Every Tour & Safari Detail.",
  subheadline:
    "From guided tours & wildlife safaris, to hotel bookings and airport pickups; we handle every detail so you travel with full comfort. Specialized in Rwanda adventures, communities, city tours; and other East Africa destinations.",
  servicesLabel: "Our services",
  destinationsLabel: "Where do you want to go?",
  ctaPrimary: "Available Trips",
  ctaSecondary: "Our Services",
};