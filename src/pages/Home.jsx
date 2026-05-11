import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Sprout,
  Award,
  Shield,
  TrendingUp,
  Quote,
  Star,
  ChevronRight,
  ChevronLeft,
  Leaf,
  Truck,
  Clock,
  ThumbsUp,
} from "lucide-react";

/* -----------------------------
   Static Data
------------------------------ */
const HERO_IMAGES = [
  "/images/farmcows.webp",
  "/images/farmdairy.webp",
  "/images/farmpigs1.webp",
  "/images/farmdogs.webp",
  "/images/farmkienyeji.webp",
  "/images/farmlayers.webp",
];

const FEEDS = [
  {
    title: "Dairy Feeds",
    desc: "Energy-rich dairy feeds designed to boost milk yield while maintaining animal health.",
    image: "/images/Dairy Meal.jpg",
    features: ["Higher milk production", "Improved health", "High vitality"],
    badge: "Best Seller",
  },
  {
    title: "Layers Mash & Pellets",
    desc: "High-nutrition feeds formulated to improve egg production, shell strength, and flock health.",
    image: "/images/layersmash.jpg",
    features: ["Higher egg output", "Stronger shells", "Better immunity"],
  },
  {
    title: "Kienyeji Mash & Pellets",
    desc: "Designed for indigenous poultry to improve hardiness, growth, and egg yield.",
    image: "/images/farmkienyeji.webp",
    features: ["Improved egg laying", "Well-balanced nutrition", "Hardiness"],
  },
  {
    title: "Broiler Starter & Finisher",
    desc: "High-performance feeds for rapid growth and high yield of quality meat.",
    image: "/images/broilers.webp",
    features: ["Rapid growth", "Improved meat quality", "Low visceral fat"],
  },
  {
    title: "Chick & Grower Feeds",
    desc: "Scientifically balanced for strong early growth, immunity, and smooth transition.",
    image: "/images/chicks.webp",
    features: ["Strong foundation", "Smooth maturity", "High vitality"],
  },
  {
    title: "Pig Feeds",
    desc: "Optimized formulations for fast growth, efficient feed utilization, and weight gain.",
    image: "/images/farmpigs.webp",
    features: ["Fast weight gain", "Feed efficiency", "Health boost"],
  },
  {
    title: "Skipa Dog Meal",
    desc: "Balanced nutrition for healthy, active dogs",
    image: "/images/Puppies.webp",
    features: ["Aflatoxin free", "Strong bones & teeth", "Quality binders"],
  },
];

const TESTIMONIALS = [
  {
    name: "John Mwangi",
    farm: "Mwangi Dairy Farm",
    location: "Nakuru",
    quote:
      "Since switching to Economy Farm Feeds, our milk production has increased by 15%. The quality of the feeds is unmatched and our cows are healthier than ever.",
    rating: 5,
  },
  {
    name: "Eliud Tentuan",
    farm: "Eliud Poultry Ranch",
    location: "Narok",
    quote:
      "The poultry feeds from Economy Farm Products have transformed our operation. Better egg quality, improved bird health, and outstanding customer service.",
    rating: 5,
  },
  {
    name: "Michael Kamune",
    farm: "Mt. Kenya Dairy Land",
    location: "Meru",
    quote:
      "The feeds deliver consistent results. Our animals are thriving, growing faster and healthier. Highly recommend to any serious farmer.",
    rating: 5,
  },
];

/* -----------------------------
   Helper Components
------------------------------ */
const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? "text-center" : ""}`}>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: "60px" }}
      transition={{ duration: 0.5 }}
      className="h-1 bg-green-600 mx-auto mb-4 rounded-full"
      style={!centered ? { marginLeft: 0 } : {}}
    />
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-green-900 mb-3">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
    )}
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -8 }}
    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
  >
    <div className="mb-4 inline-block p-3 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-600 group-hover:to-emerald-600 transition-colors duration-300">
      <Icon className="w-6 h-6 text-green-700 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </motion.div>
);

/* -----------------------------
   Main Component
------------------------------ */
export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);
  const [heroImagesLoaded, setHeroImagesLoaded] = useState({});
  const heroIntervalRef = useRef(null);

  // Preload hero images
  useEffect(() => {
    HERO_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setHeroImagesLoaded((prev) => ({ ...prev, [src]: true }));
      };
    });
  }, []);

  // Auto-rotate hero images
  useEffect(() => {
    heroIntervalRef.current = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(heroIntervalRef.current);
  }, []);

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      {/* ---------------- HERO - Premium Slideshow ---------------- */}
      <section className="relative h-[100svh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentHero]})` }}
          />
        </AnimatePresence>

        {/* Gradient overlay - more sophisticated */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-green-900/40" />

        {/* Animated pattern overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg...')]" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-5xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="mb-6 inline-block px-4 py-1 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 text-sm font-semibold tracking-wide"
            >
              Since 1998 • Trusted by 10,000+ Farmers
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Economy Farm Products
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold mt-4 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Premium Animal Nutrition Solutions
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Two decades of excellence in producing scientifically formulated
              feeds for optimal healthy, high yielding livestock.
            </p>

            <div className="flex flex-row gap-4 justify-center mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 md:px-8 py-2 md:py-4 text-sm rounded-full text-white font-semibold transition shadow-xl hover:shadow-2xl"
                >
                  Explore Our Products
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border-2 border-white/80 hover:bg-white hover:text-green-900 px-6 md:px-8 py-2 md:py-4 text-sm  rounded-full font-semibold transition backdrop-blur-sm"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>

            {/* Hero indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHero(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentHero
                      ? "w-8 bg-green-500"
                      : "w-4 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TOP FEEDS */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Premium Quality Feeds"
            subtitle="Scientifically formulated for maximum performance"
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEEDS.slice(0, 6).map((feed, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={feed.image}
                    alt={feed.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {feed.badge && (
                    <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {feed.badge}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {feed.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {feed.desc}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {feed.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <Leaf className="w-4 h-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1 text-green-700 font-semibold hover:gap-2 transition-all"
                  >
                    View details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl mt-16"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/farmlayers.webp')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-700/80" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-10 md:p-14 text-white">
              <div>
                <h3 className="text-2xl md:text-3xl font-black mb-2">
                  Ready to Transform Your Farm?
                </h3>
                <p className="text-green-100 max-w-xl">
                  Explore our full range of high-performance feeds designed to
                  improve yields, animal health, and farm profitability.
                </p>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white hover:bg-green-50 text-green-800 font-bold px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                View All Products
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- WHY CHOOSE US - Premium ---------------- */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Why Choose Us?"
            subtitle="Combining scientific expertise with natural ingredients for exceptional nutrition"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Sprout}
              title="Premium Quality"
              desc="Scientifically formulated feeds using the finest natural ingredients"
              delay={0}
            />
            <FeatureCard
              icon={Award}
              title="Proven Results"
              desc="Over 20 years of excellence in animal nutrition and farm productivity"
              delay={0.1}
            />
            <FeatureCard
              icon={Shield}
              title="Safety Certified"
              desc="All products meet stringent safety and quality standards"
              delay={0.2}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Better Growth"
              desc="Optimized nutrition for enhanced animal health and better yields"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS - Enhanced ---------------- */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Trusted by Farmers Nationwide"
            subtitle="See what our customers say about their experience"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Quote className="w-10 h-10 text-green-600 mb-4 opacity-50" />
                <p className="text-gray-700 italic leading-relaxed mb-5">
                  "{testimonial.quote}"
                </p>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-green-700">{testimonial.farm}</p>
                  <p className="text-xs text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FINAL CTA - Premium ---------------- */}
      <section className="py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-green-700 to-green-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg...')] opacity-10" />

        <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              Ready to Increase Your Yields?
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of successful farmers who trust Economy Farm
              Products for premium animal nutrition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white hover:bg-green-50 text-green-800 font-bold px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Get Started Today
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 border-2 border-white/80 hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition"
              >
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
