import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FEEDS } from "../data/FeedsDetails";
import { motion, AnimatePresence } from "framer-motion";

export default function Products() {
  const imageUrl = "/images/productImage.png";
  const [loaded, setLoaded] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedFeed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedFeed]);

  const categories = [...new Set(FEEDS.map((feed) => feed.category))];

  // Helper function to convert category name to ID for smooth scrolling
  const getCategoryId = (category) => {
    const idMap = {
      "Farm Feeds Dairy Concentrates": "dairy",
      "Farm Feeds Poultry Products": "poultry",
      "Farm Feeds Pig Food": "pig",
      "Farm Feeds Dog Food": "dog",
    };
    return idMap[category] || category.toLowerCase().replace(/\s+/g, "-");
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return "Premium quality feed for your livestock.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* HERO - Enhanced with parallax and green accent */}
      <section className="relative h-[75vh] md:h-[85vh] overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center md:bg-fixed transition-all duration-1000 ${
            loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-green-900/40" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="mb-6 inline-block px-4 py-1 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 text-sm font-semibold tracking-wide"
          >
            Premium Nutrition
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200">
            Our Products
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-200 font-light">
            Premium livestock feeds engineered for performance, health, and
            maximum yield.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10"
          >
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Explore Products
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* PRODUCTS SECTION */}
      <div id="products">
        {categories.map((category, idx) => (
          <motion.section
            key={category}
            id={getCategoryId(category)}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="py-16 px-6 md:px-16 lg:px-24 scroll-mt-24"
          >
            {/* Category header with green accent line */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                transition={{ duration: 0.5 }}
                className="h-1 bg-green-600 mx-auto mb-4 rounded-full"
              />
              <h2 className="text-4xl md:text-5xl font-black text-green-900">
                {category === "Farm Feeds Dairy Concentrates" &&
                  "Farm Feeds Dairy Concentrates"}
                {category === "Farm Feeds Poultry Products" &&
                  "Farm Feeds Poultry Products"}
                {category === "Farm Feeds Pig Food" && "Farm Feeds Pig Food"}
                {category === "Farm Feeds Dog Food" && "Farm Feeds Dog Food"}
              </h2>
              <p className="text-gray-500 mt-2 text-lg">
                Expertly crafted for excellence
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {FEEDS.filter((f) => f.category === category).map((feed) => (
                <motion.div
                  key={feed.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
                  onClick={() => setSelectedFeed(feed)}
                >
                  {/* Image with overlay gradient */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={feed.image || "/images/placeholder-feed.jpg"} // fallback if null/undefined
                      alt={feed.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (
                          img.src !==
                          window.location.origin +
                            "/images/placeholder-feed.jpg"
                        ) {
                          img.src = "/images/placeholder-feed.jpg";
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2">
                        {feed.title}
                      </h3>
                      <svg
                        className="w-5 h-5 text-green-600 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {truncateText(feed.desc)}
                    </p>

                    {feed.feedingInstructions && (
                      <div className="mt-1">
                        <span className="text-xs text-green-600 font-medium">
                          ✓ Feeding guide available
                        </span>
                      </div>
                    )}

                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <span className="text-green-700 text-sm font-semibold inline-flex items-center gap-1">
                        View details
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        ))}
      </div>

      {/* WHY CHOOSE US - Enhanced with green cards and icons */}
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center mb-14">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.5 }}
            className="h-1 bg-green-600 mx-auto mb-4 rounded-full"
          />
          <h2 className="text-4xl md:text-5xl font-black text-green-900">
            Why Choose Our Feeds?
          </h2>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
            Trusted by farmers nationwide for quality, consistency, and results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Premium Ingredients",
              icon: "🌾",
              desc: "Sourced from certified suppliers with strict quality control",
            },
            {
              title: "Scientifically Formulated",
              icon: "🔬",
              desc: "Developed by animal nutrition experts for optimal growth",
            },
            {
              title: "Quality & Safety",
              icon: "✅",
              desc: "ISO-certified facilities with rigorous testing protocols",
            },
            {
              title: "Freshly Delivered",
              icon: "🚚",
              desc: "Guaranteed freshness with just-in-time logistics",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-green-100"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-bold text-xl text-green-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA - More premium */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg...')] opacity-10" />

        <div className="relative z-10 px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to boost your livestock performance?
            </h3>
            <p className="text-green-100 text-lg mb-8">
              Let our experts help you choose the perfect feed for your farm's
              unique needs.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white hover:bg-green-50 text-green-800 font-bold px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Contact Our Team
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedFeed && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeed(null)}
          >
            <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ scale: 0.95, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100"
              >
                <button
                  onClick={() => setSelectedFeed(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-green-600 text-white backdrop-blur-sm flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="relative">
                  <img
                    src={selectedFeed.image}
                    alt={selectedFeed.title}
                    className="w-full h-64 sm:h-80 object-cover rounded-t-3xl"
                    onError={(e) => {
                      e.target.src = "/images/placeholder-feed.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-t-3xl" />
                </div>

                <div className="p-6 md:p-8 pt-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {selectedFeed.title}
                  </h3>

                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                    {selectedFeed.desc ||
                      "Premium quality feed for healthy, high-yielding livestock."}
                  </p>

                  {selectedFeed.feedingInstructions && (
                    <div className="mt-6 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-l-4 border-green-500">
                      <p className="font-semibold text-green-800 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Feeding Instructions
                      </p>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        {selectedFeed.feedingInstructions}
                      </p>
                    </div>
                  )}

                  <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={() => setSelectedFeed(null)}
                      className="px-6 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
