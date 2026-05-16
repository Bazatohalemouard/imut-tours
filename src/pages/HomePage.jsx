import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchTrips, fetchCountries } from "../api/APIHandler";
import { Hero } from "../components/homepage/hero";
import { Stats } from "../components/homepage/Stats";
import gorillaIcon from "../assets/icons/gorilla.png";
import elephantIcon from "../assets/icons/elephant.png";
import monkeyIcon from "../assets/icons/monkey.png";
import kayakIcon from "../assets/icons/kayaking.png";
import hikingIcon from "../assets/icons/hiking.png";
import birdWatchingIcon from "../assets/icons/birds.png";
import rwandaFlag from "../assets/flags/rwanda.png";
import ugandaFlag from "../assets/flags/uganda.png";
import tanzaniaFlag from "../assets/flags/tanzania.png";
import kenyaFlag from "../assets/flags/kenya.png";
import burundiFlag from "../assets/flags/burundi.png";
import southSudanFlag from "../assets/flags/south-sudan.png";
import { Categories } from "../components/homepage/Categories";
import { FeaturedTrips } from "../components/homepage/FeaturedTrips";
import { OurDestinations } from "../components/homepage/OurDestinations";
import { Testimonials } from "../components/homepage/Testimonials";
import { CallToAction } from "../components/homepage/CallToAction";


// ─── Home Page ────────────────────────────────────────────────────────────────
export const HomePage = ({ setPage }) => {
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);

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

  const countryList = countries.map((c) => c.name);

  const categories = [
    { icon: gorillaIcon, label: "Gorilla Trekking", count: "4 experiences" },
    { icon: elephantIcon, label: "Big Five Safari", count: "6 experiences" },
    { icon: monkeyIcon, label: "Chimp Tracking", count: "3 experiences" },
    { icon: kayakIcon, label: "Kayaking", count: "2 experiences" },
    { icon: hikingIcon, label: "Hiking", count: "5 experiences" },
    { icon: birdWatchingIcon, label: "Bird Watching", count: "3 experiences" },
  ];

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
      <Hero setPage={setPage} fetchCountryFlag={fetchCountryFlag} />
      <Stats countries={countryList} />
      {/* <Categories categories={categories} setPage={setPage} /> */}
      <FeaturedTrips trips={trips} tripsLoading={tripsLoading} setPage={setPage} />
      <OurDestinations countries={countries} countriesLoading={countriesLoading} fetchCountryFlag={fetchCountryFlag} />
      <Testimonials testimonials={testimonials} />
      <CallToAction setPage={setPage} />
    </div>
  );
};

HomePage.propTypes = {
  setPage: PropTypes.func.isRequired,
};
