
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { LocationsPage } from "./pages/LocationsPage";
import { TripsPage } from "./pages/TripsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { TripDetailsPage } from "./pages/TripDetailsPage";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedTrip, setSelectedTrip] = useState(null);

  const setPage = (page, trip = null) => {
    if (trip) setSelectedTrip(trip);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage setPage={setPage} />;
      case "locations":
        return <LocationsPage setPage={setPage} />;
      case "trips":
        return <TripsPage setPage={setPage} />;
      case "about":
        return <AboutPage setPage={setPage} />;
      case "contact":
        return <ContactPage />;
      case "trip-detail":
        return <TripDetailsPage trip={selectedTrip} setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;1,700&display=swap');
        
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
      <Navbar activePage={activePage} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
    </>
  );
}