import {
  IconTrekking,
  IconCarSuv,
  IconCar,
  IconBuildingAirport,
  IconBuildingEstate,
  IconIdBadge2,
  IconClockHour4,
  IconFileDescription,
  IconShieldCheck,
  IconHeartHandshake,
} from "@tabler/icons-react";
/**
 * servicesData.js
 * All static content for the Services page.
 * No JSX, no component logic — pure data only.
 */

// ─── Page-level copy ─────────────────────────────────────────────────────────
export const SERVICES_COPY = {
  badge: "Everything your journey needs",
  headline: "We Handle",
  headlineEm: "Every Detail.",
  subheadline:
    "Whether you're landing at Kigali airport for the first time or planning a multi-country safari across East Africa, our services travel with you from the first click to the final farewell.",
  ctaLabel: "Get in Touch",
  ctaSubtext: "Custom quotes within 24 hours",
  contactLabel: "Ready to travel?",
  contactHeadline: "Let's Plan Your Trip Together",
  contactBody:
    "Tell us where you want to go and we'll take it from there — itinerary, transfers, accommodation, guides and all. Our team responds within 24 hours.",
  contactCta: "Send Us a Message",
  contactAlt: "Or call us directly",
  phone: "+250 788 608 794",
  email: "customersupport@imut-tours.com",
  whatsapp: "https://wa.me/250788608794",
};

// ─── Services ─────────────────────────────────────────────────────────────────
// icon  → Tabler outline icon class (ti-{name}, never -filled)
// color → accent hue used for the icon glow, matches the brand palette

export const SERVICES_LIST = [
  {
    id: "tours",
    name: "Tours & Safaris",
    tagline: "Our signature experience",
    description:
      "We plan and lead tours that match what you actually want to do — not a fixed programme. Our guides are specialists in wildlife, local history, and culture, and they work around your pace and interests. Whether you're joining a small group or booking a private trip, every detail is arranged for you. All you need to do is show up.",
    icon: IconTrekking,
    isPrimary: true,
    highlights: [
      "Private, small-group & family tours",
      "Day trips & multi-week expeditions",
      "Wildlife safaris & gorilla trekking",
      "Cultural & community immersion tours",
      "Birdwatching & nature walks",
      "Custom itineraries built around you",
    ],
  },
  {
    id: "car-rentals",
    name: "Car Rentals",
    tagline: "Go at your own pace",
    description:
      "Our vehicles are road-ready, fully insured, and suited to both urban driving and rough terrain. Choose to drive yourself on your own schedule, or travel with one of our drivers who knows the roads well. Cross-border permits are arranged on request.",
    icon: IconCarSuv,
    isPrimary: false,
    highlights: [
      "Self-drive - full independence, your schedule",
      "Chauffeured — sit back, local driver included",
      "Inter-city transfers — long-distance comfort",
      "4×4 & off-road safari vehicles",
      "Minivans & people carriers for groups",
      "Insurance & roadside cover included",
    ],
  },
  {
    id: "airport-transfers",
    name: "Airport Transfers",
    tagline: "First impressions done right",
    description:
      "We track your flight and have a driver at arrivals before you clear the gate — no waiting, no confusion. You'll be met by name, assisted with your bags, and on your way in a clean, air-conditioned vehicle within minutes. Departures are handled with the same reliability; we get you to the terminal on time, every time.",
    icon: IconBuildingAirport,
    isPrimary: false,
    highlights: [
      "Named meet & greet at the arrivals gate",
      "Real-time flight tracking — we adjust to delays",
      "Private & shared transfer options",
      "Executive, standard & group vehicles available",
      "Available around the clock, every day of the year",
    ],
  },
  {
    id: "taxi",
    name: "Transport Services",
    tagline: "Reliable rides, any time",
    description:
      "Need a ride across town or a long-distance transfer between destinations? We operate on fixed, pre-agreed rates with no surge pricing or hidden charges. Book in advance or on short notice via WhatsApp or Email, and receive confirmation within minutes. Our drivers are punctual, professional, and familiar with the area.",
    icon: IconCar,
    isPrimary: false,
    highlights: [
      "In-city rides — quick, on-demand pickups",
      "Inter-city journeys — comfortable long-distance",
      "Scheduled bookings — set your time in advance",
      "Fixed rates quoted upfront, no hidden fees",
      "Saloon cars, SUVs & minivans available",
    ],
  },
  {
    id: "hotels",
    name: "Hotel Bookings",
    tagline: "Rest as well as you explored",
    description:
      "We source and book accommodation across all categories. From luxury lodges and boutique hotels to budget-friendly guesthouses. As established partners with properties across the region, we have access to rates and availability not always listed publicly. Tell us your preference and budget, and we'll handle the rest.",
    icon: IconBuildingEstate,
    isPrimary: false,
    highlights: [
      "Luxury lodges & five-star resorts",
      "Boutique & design hotels",
      "Eco-lodges & tented safari camps",
      "Mid-range hotels & guesthouses",
      "Budget accommodation & hostels",
      "Exclusive partner rates & room upgrades",
      "Bundled with full trip packages on request",
    ],
  },
  {
    id: "visa",
    name: "Visa & Travel Advisory",
    tagline: "Paperwork handled, worries gone",
    description:
      "Entry requirements vary by destination and change without much notice. Our team stays up to date so you don't have to. We guide you through the right visa category, the application process, and any health or documentation requirements before you travel. If anything changes closer to your departure date, we'll let you know and help you sort it.",
    icon: IconIdBadge2,
    isPrimary: false,
    highlights: [
      "Single & multiple-entry visa guidance",
      "Tourist visa applications & e-visa support",
      "Vaccination & health entry requirements",
      "Travel insurance recommendations",
      "Document checklist & pre-departure briefing",
      "Real-time updates if requirements change",
    ],
  },
];

// ─── Trust signals ────────────────────────────────────────────────────────────
export const TRUST_STATS = [
  { num: "1,200+", label: "Trips completed", icon: "ti-route" },
  { num: "5", label: "Countries covered", icon: "ti-map" },
  { num: "98%", label: "Client satisfaction", icon: "ti-star" },
  { num: "24 hr", label: "Response guarantee", icon: "ti-clock" },
];

export const PROMISE_CARDS = [
  {
    icon: IconClockHour4,
    title: "24-hour response",
    body: "Every enquiry gets a personal reply within one business day — no bots, no templates.",
  },
  {
    icon: IconFileDescription,
    title: "Free custom quote",
    body: "We scope your trip and send a detailed, no-obligation itinerary and price breakdown.",
  },
  {
    icon: IconShieldCheck,
    title: "Fully insured & licensed",
    body: "All vehicles, guides, and operations are covered under East African tourism regulations.",
  },
  {
    icon: IconHeartHandshake,
    title: "Local knowledge, personal care",
    body: "Our team lives and works in the countries we take you to — no outsourced call centres.",
  },
];