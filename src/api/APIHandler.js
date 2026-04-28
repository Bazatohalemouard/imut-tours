// ─── Dummy Data ───────────────────────────────────────────────────────────────
export const fetchLocations = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 1,
          country: "Rwanda",
          name: "Volcanoes National Park",
          slug: "volcanoes",
          tagline: "Home of the Mountain Gorillas",
          image:
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
          highlights: ["Gorilla Trekking", "Dian Fossey Trail", "Twin Lakes"],
          bestTime: "Jun – Sep, Dec – Feb",
          rating: 4.9,
          reviews: 1240,
          country_flag: "🇷🇼",
        },
        {
          id: 2,
          country: "Rwanda",
          name: "Nyungwe Forest",
          slug: "nyungwe",
          tagline: "Africa's Oldest Rainforest",
          image:
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
          highlights: ["Chimpanzee Tracking", "Canopy Walk", "Bird Watching"],
          bestTime: "Jun – Aug",
          rating: 4.7,
          reviews: 892,
          country_flag: "🇷🇼",
        },
        {
          id: 3,
          country: "Rwanda",
          name: "Lake Kivu",
          slug: "kivu",
          tagline: "Rwanda's Riviera",
          image:
            "https://images.unsplash.com/photo-1580500610052-c1f4a5bde9f9?w=800&q=80",
          highlights: ["Boat Safaris", "Island Hopping", "Coffee Estates"],
          bestTime: "Year-round",
          rating: 4.6,
          reviews: 673,
          country_flag: "🇷🇼",
        },
        {
          id: 4,
          country: "Uganda",
          name: "Bwindi Impenetrable Forest",
          slug: "bwindi",
          tagline: "World's Gorilla Capital",
          image:
            "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
          highlights: [
            "Gorilla Trekking",
            "Community Tours",
            "Forest Hiking",
          ],
          bestTime: "Jun – Aug, Dec – Feb",
          rating: 4.9,
          reviews: 2105,
          country_flag: "🇺🇬",
        },
        {
          id: 5,
          country: "Uganda",
          name: "Queen Elizabeth National Park",
          slug: "queen-elizabeth",
          tagline: "The Big Five Savanna",
          image:
            "https://images.unsplash.com/photo-1611348586755-53f6c3e34ac3?w=800&q=80",
          highlights: [
            "Big Five Safari",
            "Kazinga Channel",
            "Chimpanzee Tracking",
          ],
          bestTime: "Jun – Sep",
          rating: 4.8,
          reviews: 1876,
          country_flag: "🇺🇬",
        },
        {
          id: 6,
          country: "Uganda",
          name: "Murchison Falls",
          slug: "murchison",
          tagline: "World's Most Powerful Waterfall",
          image:
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
          highlights: ["Nile Safari", "Falls Hike", "Shoebill Birding"],
          bestTime: "Dec – Feb, Jun – Sep",
          rating: 4.7,
          reviews: 1034,
          country_flag: "🇺🇬",
        },
      ]);
    }, 800)
  );

export const fetchTrips = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Rwanda Gorilla Trekking",
          subtitle: "3 Days of Pure Wonder",
          duration: "3 Days",
          groupSize: "2–8",
          difficulty: "Moderate",
          price: 2800,
          currency: "USD",
          country: "Rwanda",
          category: "Gorilla Trekking",
          image:
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
          highlights: [
            "Gorilla permit included",
            "Expert naturalist guide",
            "Luxury lodge stay",
          ],
          itinerary: [
            {
              day: 1,
              title: "Arrive Kigali",
              desc: "Airport pickup, city tour & Genocide Memorial",
            },
            {
              day: 2,
              title: "Gorilla Trek",
              desc: "Full-day trek into Volcanoes NP",
            },
            {
              day: 3,
              title: "Twin Lakes & Depart",
              desc: "Morning lake tour, transfer to Kigali",
            },
          ],
          rating: 4.9,
          reviews: 320,
          badge: "Best Seller",
        },
        {
          id: 2,
          title: "Uganda Double Gorilla Safari",
          subtitle: "Bwindi + Queen Elizabeth",
          duration: "7 Days",
          groupSize: "2–10",
          difficulty: "Moderate",
          price: 5400,
          currency: "USD",
          country: "Uganda",
          category: "Gorilla Trekking",
          image:
            "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
          highlights: [
            "Two gorilla treks",
            "Big Five game drives",
            "Kazinga boat cruise",
          ],
          itinerary: [
            { day: 1, title: "Arrive Entebbe", desc: "Transfer to Bwindi" },
            {
              day: 2,
              title: "Gorilla Trek I",
              desc: "Bwindi gorilla habituation",
            },
            {
              day: 3,
              title: "Drive to QENP",
              desc: "Scenic Rift Valley drive",
            },
            { day: 4, title: "Game Drive", desc: "Big Five at QENP" },
            { day: 5, title: "Boat Cruise", desc: "Kazinga Channel" },
            { day: 6, title: "Gorilla Trek II", desc: "Second trek in Bwindi" },
            { day: 7, title: "Entebbe & Fly", desc: "Final day, departure" },
          ],
          rating: 4.8,
          reviews: 214,
          badge: "Top Rated",
        },
        {
          id: 3,
          title: "East Africa Classic",
          subtitle: "Rwanda & Uganda Combined",
          duration: "10 Days",
          groupSize: "4–12",
          difficulty: "Easy–Moderate",
          price: 6200,
          currency: "USD",
          country: "Both",
          category: "Multi-Country",
          image:
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
          highlights: [
            "3 countries in one journey",
            "Gorillas + Chimps + Big Five",
            "All-inclusive luxury",
          ],
          itinerary: [],
          rating: 5.0,
          reviews: 89,
          badge: "Premium",
        },
        {
          id: 4,
          title: "Nyungwe Chimp Trek",
          subtitle: "Into Africa's Ancient Rainforest",
          duration: "4 Days",
          groupSize: "2–6",
          difficulty: "Moderate",
          price: 1900,
          currency: "USD",
          country: "Rwanda",
          category: "Chimpanzee",
          image:
            "https://images.unsplash.com/photo-1611348586755-53f6c3e34ac3?w=800&q=80",
          highlights: [
            "Canopy walkway",
            "Primate tracking",
            "Waterfall hike",
          ],
          itinerary: [],
          rating: 4.7,
          reviews: 156,
          badge: null,
        },
        {
          id: 5,
          title: "Murchison Falls Explorer",
          subtitle: "The Nile's Wildest Secret",
          duration: "5 Days",
          groupSize: "2–8",
          difficulty: "Easy",
          price: 2200,
          currency: "USD",
          country: "Uganda",
          category: "Safari",
          image:
            "https://images.unsplash.com/photo-1611348586755-53f6c3e34ac3?w=800&q=80",
          highlights: [
            "Nile boat cruise",
            "Falls hike",
            "Lion & Elephant sightings",
          ],
          itinerary: [],
          rating: 4.6,
          reviews: 201,
          badge: null,
        },
        {
          id: 6,
          title: "Lake Kivu Weekend Escape",
          subtitle: "Rwanda's Lakeside Retreat",
          duration: "3 Days",
          groupSize: "2–6",
          difficulty: "Easy",
          price: 980,
          currency: "USD",
          country: "Rwanda",
          category: "Leisure",
          image:
            "https://images.unsplash.com/photo-1580500610052-c1f4a5bde9f9?w=800&q=80",
          highlights: [
            "Island boat tour",
            "Coffee farm visit",
            "Sunset cruise",
          ],
          itinerary: [],
          rating: 4.5,
          reviews: 312,
          badge: null,
        },
      ]);
    }, 900)
  );