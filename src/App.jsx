import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { LocationsPage } from "./pages/LocationsPage";
import { TripsPage } from "./pages/TripsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { TripDetailsPage } from "./pages/TripDetailsPage";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const setPage = (page, trip = null) => {
    const routes = {
      home: "/",
      locations: "/locations",
      trips: "/trips",
      about: "/about",
      contact: "/contact",
      "trip-detail": trip ? `/trips/${trip.id}` : "/trips",
    };

    if (trip) {
      navigate(routes[page], { state: { trip } });
    } else {
      navigate(routes[page]);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Derive activePage from current URL for Navbar highlighting
  const getActivePage = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path.startsWith("/trips/")) return "trip-detail";
    return path.replace("/", "") || "home";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;0,900;1,700&family=Dancing+Script:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #FAF7F2; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hide-on-small { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

      <Navbar activePage={getActivePage()} setPage={setPage} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage setPage={setPage} />} />
          <Route path="/locations" element={<LocationsPage setPage={setPage} />} />
          <Route path="/trips" element={<TripsPage setPage={setPage} />} />
          <Route path="/trips/:id" element={<TripDetailsPage setPage={setPage} />} />
          <Route path="/about" element={<AboutPage setPage={setPage} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage setPage={setPage} />} />
        </Routes>
      </main>
      <Footer setPage={setPage} />
    </>
  );
}