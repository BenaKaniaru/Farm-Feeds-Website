import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  Award,
  Shield,
  TrendingUp,
  Quote,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

/* -----------------------------
   Static Data
------------------------------ */
const HERO_IMAGES = [
  "/images/farmcows.jpg",
  "/images/farmdairy.jpg",
  "/images/farmpigs.jpg",
  "/images/farmdogs.jpg",
  "/images/farmkienyeji.jpg",
  "/images/farmlayers.jpg",
];

const FEEDS = [
  {
    title: "Dairy Feeds",
    desc: "Energy-rich dairy feeds designed to boost milk yield while maintaining animal health.",
    image: "/images/Dairy Meal.jpg",
    features: ["Higher milk production", "Improved health", "High vitality"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Layers Mash & Pellets",
    desc: "High-nutrition feeds formulated to improve egg production, shell strength, and flock health.",
    image: "/images/layersmash.jpg",
    features: ["Higher egg output", "Stronger shells", "Better immunity"],
    color: "from-orange-500 to-amber-500",
  },

  {
    title: "Kienyeji Mash & Pellets",
    desc: "Designed for indigenous poultry to improve hardiness, growth, and egg yield.",
    image: "/images/Kienyeji.jpg",
    features: [
      "Improved egg laying and hatchability",
      "Well-balanced nutrition",
    ],
  },

  {
    title: "Broiler Starter & Finisher Meals",
    desc: "High-performance feeds for rapid growth and high yield of quality meat.",
    image: "/images/broilers.jpg",
    features: ["Rapid growth", "Improved meat quality", "Low visceral fat"],
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Chick & Grower Feeds",
    desc: "Scientifically balanced for strong early growth, immunity, and smooth transition to maturity.",
    image: "/images/chicks.jpg",
    features: ["Strong foundation", "Smooth maturity", "High vitality"],
    color: "from-blue-500 to-cyan-500",
  },

  {
    title: "Pig Feeds",
    desc: "Optimized formulations for fast growth, efficient feed utilization, and weight gain.",
    image: "/images/pigs.jpg",
    features: ["Strong foundation", "Smooth maturity", "High vitality"],
  },
  {
    title: "Skipa Dog Meal",
    desc: "Balanced nutrition for healthy, active dogs",
    image: "/images/Puppies.jpg",
    features: [
      "Aflatoxin free",
      "Supports development of strong bones and teeth",
      "Contains high quality toxin binders",
    ],
  },
];

/* -----------------------------
   Helpers
------------------------------ */
const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

/* -----------------------------
   Component
------------------------------ */
export default function Home() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [animating, setAnimating] = useState(false);
  const isMobile = window.innerWidth < 768;

  /* Hero slideshow */
  useEffect(() => {
    const timer = setInterval(() => {
      if (animating) return;

      const upcoming = (current + 1) % HERO_IMAGES.length;
      preloadImage(HERO_IMAGES[upcoming]);

      setAnimating(true);
      setNext(upcoming);

      setTimeout(
        () => {
          setCurrent(upcoming);
          setAnimating(false);
        },
        isMobile ? 1200 : 2500,
      );
    }, 9000);

    return () => clearInterval(timer);
  }, [current, animating, isMobile]);

  return (
    <div className="font-sans text-gray-900">
      {/* ---------------- HERO ---------------- */}
      <section className="relative h-[100svh] overflow-hidden playfair-font">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: `url(${HERO_IMAGES[current]})` }}
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
          <div className="max-w-4xl transform transition-all duration-1000 delay-300">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-8 leading-tight animate-fadeInUp">
              Economy Farm Products (K) Ltd
              <span className="block text-2xl md:text-3xl lg:text-4xl font-light mt-4 opacity-90">
                Premium Animal Nutrition Solutions
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed animate-fadeInUp delay-500">
              Two decades of excellence in scientifically formulated feeds for
              optimal livestock health and productivity.
            </p>

            <div className="flex flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-green-600 hover:bg-green-700 px-7 py-3 rounded-lg text-white font-semibold transition shadow-lg hover:scale-105"
              >
                Explore Products
              </Link>

              <Link
                to="/contact"
                className="border border-white px-7 py-3 rounded-lg hover:bg-white hover:text-black transition shadow-lg hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TOP FEEDS ---------------- */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2
            className="text-center text-green-600 font-black 
            text-[clamp(1.8rem,5vw,2.8rem)] playfair-font"
          >
            Our Top of the Range Feeds
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {FEEDS.map((feed, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white shadow-md overflow-hidden"
              >
                <img
                  src={feed.image}
                  alt={feed.title}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-lg font-bold">{feed.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{feed.desc}</p>

                  <ul className="mt-4 space-y-2 text-sm">
                    {feed.features.map((f, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-green-600">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/products"
                    className="mt-6 inline-block text-sm font-semibold text-green-700"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA with image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg mt-8">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/farmlayers.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12 text-white">
              <div>
                <h3 className="text-2xl md:text-3xl font-black mb-2">
                  Feed Your Farm for Better Results
                </h3>
                <p className="text-sm md:text-lg opacity-90 max-w-xl">
                  Explore our full range of high-performance feeds designed to
                  improve yields, animal health, and farm profitability.
                </p>
              </div>

              <Link
                to="/products"
                className="bg-lime-500 hover:bg-lime-400 text-black font-bold px-6 py-3 rounded-lg transition hover:scale-105"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 py-10 px-10 md:px-20 lg:px-32 text-center">
        <div className="mb-12">
          <h2 className="text-black font-black text-2xl md:text-4xl mb-8">
            Why Choose Us?
          </h2>
          <p className="text-green-800 font-normal text-sm md:text-lg lg:text-xl px-16 md:px-24">
            We combine scientific expertise with natural ingredients to deliver
            exceptional nutrition that supports your livestock's health and
            productivity
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="flex items-center text-center flex-col gap-2 bg-white py-8 px-4 rounded-lg shadow-md ">
              <span className="bg-gradient-to-r from-green-800 to-green-400 p-3 md:p-4 rounded-full">
                <Sprout size={30} className="text-white sm:size-[20]" />
              </span>

              <span className="text-black font-bold">Premium Quality</span>
              <p className="text-green-800 font-normal text-sm">
                Scientifically formulated feeds using the finest natural
                ingredients
              </p>
            </div>

            <div className="flex items-center text-center flex-col gap-2 bg-white py-8 px-4 rounded-lg shadow-md ">
              <span className="bg-gradient-to-r from-green-800 to-green-400 p-3 md:p-4 rounded-full">
                <Award size={30} className="text-white" />
              </span>

              <span className="text-black font-bold">Proven results</span>
              <p className="text-green-800 font-normal text-sm">
                Over 20 years of excellence in animal nutrition and farm
                productivity
              </p>
            </div>

            <div className="flex items-center text-center flex-col gap-2 bg-white py-8 px-4 rounded-lg shadow-md ">
              <span className="bg-gradient-to-r from-green-800 to-green-400 p-3 md:p-4 rounded-full">
                <Shield size={30} className="text-white" />
              </span>

              <span className="text-black font-bold">Safety Certified</span>
              <p className="text-green-800 font-normal text-sm">
                All our products meet stringent safety and quality standards
              </p>
            </div>

            <div className="flex items-center text-center flex-col gap-2 bg-white py-8 px-4 rounded-lg shadow-md ">
              <span className="bg-gradient-to-r from-green-800 to-green-400 p-3 md:p-4 rounded-full">
                <TrendingUp size={30} className="text-white" />
              </span>

              <span className="text-black font-bold">Better Growth</span>
              <p className="text-green-800 font-normal text-sm">
                Optimized nutrition for enhanced animal health and better yields
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orange-100 text-center py-10 pb-20 px-10 md:px-20 lg:px-32 ">
        <h2 className="text-black font-bold text-4xl">
          Trusted by Farmers NationWide
        </h2>
        <p className="text-green-800 font-normal mt-4 text-sm md:text-lg lg:text-xl ">
          See what some of our customers say about their experience with our
          products
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start text-left gap-4 mt-8 bg-white p-4 rounded-lg shadow-md">
            <Quote size={30} className="text-green-900" />

            <span className="italic text-sm">
              "Since switching to Economy Farm Feeds, our milk production has
              increased by 15%. The quality of the feeds is unmatched and our
              cows are healthier than ever."
            </span>

            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="text-green-800"
                  fill="currentColor"
                />
              ))}
            </div>

            <div className="flex flex-col items-start border-t mt-4 pt-4 w-full">
              <span className="font-semibold text-sm">John Mwangi</span>
              <span className="text-green-900 font-normal text-[14px]">
                Mwangi Dairy Farm
              </span>
              <span className="text-green-900 font-normal text-[12px]">
                Nakuru
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start text-left gap-4 mt-8 bg-white p-4 rounded-lg shadow-md">
            <Quote size={30} className="text-green-900" />

            <span className="italic text-sm">
              "The poultry feeds from Economy Farm Products have transformed our
              operation. Better egg quality, improved bird health, and
              outstanding customer service."
            </span>

            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="text-green-800"
                  fill="currentColor"
                />
              ))}
            </div>

            <div className="flex flex-col items-start border-t mt-4 pt-4 w-full">
              <span className="font-semibold text-sm">Eliud Tentuan</span>
              <span className="text-green-900 font-normal text-[14px]">
                Eliud Poultry Ranch
              </span>
              <span className="text-green-900 font-normal text-[12px] ">
                Narok
              </span>
            </div>
          </div>

          <div>
            <div className="flex flex-col items-start text-left gap-4 mt-8 bg-white p-4 rounded-lg shadow-md">
              <Quote size={30} className="text-green-900" />

              <span className="italic text-sm ">
                "The feeds deliver consistent results. Our animals are thriving,
                growing faster and healthier. Highly recommend to any serious
                farmer."
              </span>

              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className="text-green-800"
                    fill="currentColor"
                  />
                ))}
              </div>

              <div className="flex flex-col items-start border-t mt-4 pt-4 w-full">
                <span className="font-semibold text-md">Michael Kamune</span>
                <span className="text-green-900 font-normal text-[14px]">
                  Mt. Kenya Dairy Land
                </span>
                <span className="text-green-900 font-normal text-[12px]">
                  Meru
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="bg-gradient-to-r from-green-800 to-green-500 py-14 px-4 text-center text-white">
        <h2 className="text-2xl font-bold">Ready to increase your yields?</h2>
        <p className="mt-2 text-sm opacity-90">
          Join thousands of farmers using Economy Farm Feeds.
        </p>

        <Link
          to="/contact"
          className="mt-6 inline-block rounded-lg bg-lime-400 px-6 py-3 font-bold text-black hover:bg-lime-300"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
