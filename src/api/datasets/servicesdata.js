import {
  IconWorld,
  IconCar,
  IconPlaneArrival,
  IconMapPin,
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
  email: "intermut.rwanda7@gmail.com",
  whatsapp: "https://wa.me/250788608794",
};

// ─── Services ─────────────────────────────────────────────────────────────────
// icon  → Tabler outline icon class (ti-{name}, never -filled)
// color → accent hue used for the icon glow, matches the brand palette

export const SERVICES_LIST = [
  {
    id: "tours",
    name: "Guided Safari & Cultural Tours",
    tagline: "Our signature experience",
    description:
      "Our seasoned guides:naturalists, historians, and cultural storytellers; design each journey around your pace, your interests, and your sense of adventure. Whether you're tracking rare wildlife at dawn, sitting with a community elder at dusk, or simply absorbing a landscape that feels like the beginning of time, we make sure every moment is intentional. Choose from private, small-group, or family-oriented formats, all led by guides who treat knowledge-sharing as a craft.",
    icon: IconWorld,
    isPrimary: false,
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
      "Freedom starts with the right vehicle. Our fleet is maintained to a standard that handles everything from smooth city boulevards to unpaved bush tracks without a second thought. Every car leaves clean, GPS-equipped, fully insured, and fuelled — ready the moment your journey begins. Prefer to drive yourself, or would rather sit back and let a professional handle the roads? Both options are available, and both come with the same commitment to reliability.",
    icon: IconCar,
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
      "The moment you land should feel like the beginning of something great, not a scramble for a cab. Our transfer team monitors your flight in real time, so whether you're early, delayed, or simply exhausted, someone is already waiting. You'll be greeted by name, assisted with luggage, and seated in a clean, air-conditioned vehicle within minutes of clearing arrivals. Drop-offs are scheduled with the same precision. We get you to the terminal with time to spare, never cutting it close.",
    icon: IconPlaneArrival,
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
    name: "Taxi & Cab Service",
    tagline: "Reliable rides, any time",
    description:
      "Dependable ground transport shouldn't require guesswork. Our cab service runs on fixed, pre-agreed rates — no meters, no surge pricing, no awkward negotiation at the end of a long day. Whether you need a quick in-town ride, a scheduled early-morning pickup, or a point-to-point journey between destinations, the process is the same: tell us where and when, and we handle the rest. Book instantly via WhatsApp or through our team, and receive confirmation within minutes.",
    icon: IconMapPin,
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
    name: "Hotel & Lodge Booking",
    tagline: "Rest as well as you explored",
    description:
      "Where you sleep shapes how you travel. We source and book accommodation across the full spectrum. From intimate wilderness lodges and design-forward boutique hotels to reliable mid-range properties and budget guesthouses that punch well above their price. As established partners with properties across the region, we regularly access rates, room categories, and availability that aren't listed publicly. Tell us your style and your ceiling, and we'll find the right fit. No decision fatigue, no booking surprises.",
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
      "Entry requirements change — sometimes with little notice. Our advisory team stays current so you don't have to second-guess a single form. From selecting the right visa category and walking you through the online application to flagging vaccination requirements and travel health considerations, we cover the administrative side of your trip thoroughly. If anything changes between booking and departure, we'll notify you and help you adapt. Travel light on worry; we carry that part.",
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