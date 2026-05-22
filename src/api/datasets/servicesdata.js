import {
  GlobeAltIcon,
  TruckIcon,
  PaperAirplaneIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  IdentificationIcon,
  ClockIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
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
      "Our expert guides bring East Africa's wilderness and cultures to life. From tracking mountain gorillas in Volcanoes National Park to walking with Maasai elders on the Mara plains, every tour is crafted around what moves you — not a cookie-cutter itinerary. Private, small-group, and family tours available across Rwanda, Kenya, Uganda, Tanzania, and Ethiopia.",
    icon: GlobeAltIcon,
    isPrimary: false,
    highlights: ["Private & group tours", "Multi-country itineraries", "Expert local guides", "All skill levels welcome"],
  },
  {
    id: "car-rentals",
    name: "Car Rentals",
    tagline: "Go at your own pace",
    description:
      "Explore on your own terms with our fleet of well-maintained 4×4s, minivans, and safari land cruisers. All vehicles are GPS-equipped, fully insured, and prepared for both city tarmac and rugged bush tracks. Choose self-drive for ultimate freedom, or add a professional driver who doubles as a local knowledge bank.",
    icon: TruckIcon,
    isPrimary: false,
    highlights: ["4×4 and safari vehicles", "Self-drive or with driver", "GPS & insurance included", "Cross-border permits available"],
  },
  {
    id: "airport-transfers",
    name: "Airport Transfers",
    tagline: "First impressions done right",
    description:
      "We meet you at arrivals — sign in hand — and handle your luggage to a clean, air-conditioned vehicle before you've cleared customs stress. Drop-offs are timed to your flight, never a minute late. Available at Kigali International, JKIA Nairobi, Entebbe, Kilimanjaro, and Addis Ababa Bole airports.",
    icon: PaperAirplaneIcon,
    isPrimary: false,
    highlights: ["Meet & greet at arrivals", "Flight-tracked drop-offs", "5 major airports covered", "24/7 availability"],
  },
  {
    id: "taxi",
    name: "Taxi & Cab Service",
    tagline: "Reliable rides, any time",
    description:
      "Need to get across Kigali for a morning meeting or reach a trailhead before dawn? Our on-demand cab service runs city-to-city and point-to-point across the region. Fixed rates quoted upfront — no surge pricing, no surprises. Book by WhatsApp or through our team for instant confirmation.",
    icon: MapPinIcon,
    isPrimary: false,
    highlights: ["Fixed, transparent rates", "City & inter-city rides", "Pre-bookable or on-demand", "WhatsApp booking"],
  },
  {
    id: "hotels",
    name: "Hotel & Lodge Booking",
    tagline: "Rest as well as you explored",
    description:
      "From eco-lodges perched above the Nyungwe canopy to boutique Zanzibar beach properties, we source and book accommodation that matches your style and budget. As longstanding partners with properties across East Africa, we often secure rates and room types that aren't publicly available.",
    icon: BuildingOffice2Icon,
    isPrimary: false,
    highlights: ["Budget to ultra-luxury", "Exclusive partner rates", "Eco-lodges & boutique stays", "Full trip packages"],
  },
  {
    id: "visa",
    name: "Visa & Travel Advisory",
    tagline: "Paperwork handled, worries gone",
    description:
      "Entry requirements across East Africa shift frequently. Our team tracks the latest e-visa processes, East African Tourist Visa eligibility, and vaccination requirements so you don't have to. We guide you step-by-step through every form and flag any gotchas before your departure date.",
    icon: IdentificationIcon,
    isPrimary: false,
    highlights: ["E-visa guidance", "East Africa Tourist Visa", "Health & entry requirements", "Last-minute updates"],
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
    icon: ClockIcon,
    title: "24-hour response",
    body: "Every enquiry gets a personal reply within one business day — no bots, no templates.",
  },
  {
    icon: DocumentTextIcon,
    title: "Free custom quote",
    body: "We scope your trip and send a detailed, no-obligation itinerary and price breakdown.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Fully insured & licensed",
    body: "All vehicles, guides, and operations are covered under East African tourism regulations.",
  },
  {
    icon: HeartIcon,
    title: "Local knowledge, personal care",
    body: "Our team lives and works in the countries we take you to — no outsourced call centres.",
  },
];