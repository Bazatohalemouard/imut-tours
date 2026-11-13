import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSEO } from "../utils/useSEO";
import { fetchTrips, fetchCountries } from "../api/APIHandler";
import rwandaFlag from "../assets/flags/rwanda.png";
import ugandaFlag from "../assets/flags/uganda.png";
import tanzaniaFlag from "../assets/flags/tanzania.png";
import kenyaFlag from "../assets/flags/kenya.png";
import burundiFlag from "../assets/flags/burundi.png";
import southSudanFlag from "../assets/flags/south-sudan.png";
import { FeaturedTrips } from "../components/homepage/FeaturedTrips";
import { Testimonials } from "../components/homepage/Testimonials";
import { CallToAction } from "../components/homepage/CallToAction";
import HeroServices from "../components/homepage/HeroServices";


// ─── Home Page ────────────────────────────────────────────────────────────────
export const HomePage = ({ setPage }) => {
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  useSEO({
    title: "Home | Rwanda Noble Tours & Travel",
    description: "Discover unforgettable East African adventures with Rwanda Noble Tours & Travel. From thrilling safaris to cultural immersions, we handle every detail for your perfect trip.",
    breadcrumbs: [
      { name: "Home", url: "/" },
    ],
  });

  const fetchCountryFlag = (country) => {
    if (country === "Rwanda") return rwandaFlag;
    if (country === "Uganda") return ugandaFlag;
    if (country === "Tanzania") return tanzaniaFlag;
    if (country === "Burundi") return burundiFlag;
    if (country === "Kenya") return kenyaFlag;
    if (country === "South Sudan") return southSudanFlag;
    return "";
  }

  useEffect(() => {
    fetchTrips().then((data) => {
      setTrips(data.slice(0, 3));
      setTripsLoading(false);
    });
  }, []);


  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data);
      setCountriesLoading(false);
    });
  }, []);

  const testimonials = [
    {
      name: "Sarah M.",
      country: "United Kingdom",
      text: "Watching mountain gorillas in their natural habitat was the single most profound experience of my life. IMUT made every detail seamless.",
      trip: "Rwanda Gorilla Trek",
      rating: 5,
    },
    {
      name: "James K.",
      country: "United States",
      text: "From the moment we landed to our departure, everything was handled with incredible professionalism. The guides' knowledge was unmatched.",
      trip: "Uganda Double Gorilla Safari",
      rating: 5,
    },
    {
      name: "Amara N.",
      country: "Germany",
      text: "Lake Kivu at sunset with a cup of freshly brewed Rwandan coffee — I still dream about it. IMUT knows how to curate magical moments.",
      trip: "Lake Kivu Weekend",
      rating: 5,
    },
  ];

  return (
    <div>
      <HeroServices countries={countries} countriesLoading={countriesLoading} setPage={setPage} fetchCountryFlag={fetchCountryFlag} />
      <FeaturedTrips trips={trips} tripsLoading={tripsLoading} setPage={setPage} />
      <CallToAction setPage={setPage} />
      <Testimonials testimonials={testimonials} />
    </div>
  );
};

HomePage.propTypes = {
  setPage: PropTypes.func.isRequired,
};
