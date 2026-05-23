/**
 * heroData.js
 * All static content for the Hero section.
 * No JSX, no component logic — pure data only.
 */

import {
  IconMap,
  IconCar,
  IconPlaneArrival,
  IconBuildingEstate,
} from "@tabler/icons-react";

export const SERVICES = [
  {
    id: "tours",
    name: "Tour Guiding",
    tagline: "Expert-led safari & cultural tours",
    icon: IconMap,
    isPrimary: false,
    page: "tours",
  },
  {
    id: "car-rentals",
    name: "Car Rentals",
    tagline: "Self-drive or chauffeured",
    icon: IconCar,
    isPrimary: false,
    page: "car-rentals",
  },
  {
    id: "airport-transfers",
    name: "Airport Transfers",
    tagline: "Meet & greet included",
    icon: IconPlaneArrival,
    isPrimary: false,
    page: "airport-transfers",
  },
  {
    id: "taxi",
    name: "Taxi & Cab Service",
    tagline: "City & inter-city rides",
    icon: IconCar,
    isPrimary: false,
    page: "taxi",
  },
  {
    id: "hotels",
    name: "Accomodation",
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
  headlineEm: "Every Journey, Handled.",
  subheadline:
    "From guided safaris to airport pickups — we handle every detail so you travel without a worry. Trusted across Rwanda, Kenya, Uganda & beyond.",
  servicesLabel: "Our services",
  destinationsLabel: "Where do you want to go?",
  ctaPrimary: "View Trips",
  ctaSecondary: "View All Services",
};