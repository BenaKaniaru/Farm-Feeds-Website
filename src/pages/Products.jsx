import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FEEDS } from "../data/FeedsDetails";
import { motion, AnimatePresence } from "framer-motion";

export default function Products() {
  const imageUrl = "/images/feeds.webp";
  const [loaded, setLoaded] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, []);

  const categories = [...new Set(FEEDS.map((feed) => feed.category))];

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="relative h-[65vh] md:h-[80vh] overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-6"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Our Products
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200">
            Premium livestock feeds engineered for performance, health, and
            maximum yield.
          </p>
        </motion.div>
      </section>

      {/* PRODUCTS */}
      {categories.map((category) => (
        <motion.section
          key={category}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-14 px-6 md:px-16"
        >
          <h2 className="text-3xl font-black text-green-900 mb-8 text-center">
            {category}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEEDS.filter((f) => f.category === category).map((feed) => (
              <motion.div
                key={feed.id}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={feed.image}
                    alt={feed.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {feed.title}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    {truncateText(feed.desc)}
                  </p>

                  <button
                    onClick={() => setSelectedFeed(feed)}
                    className="mt-2 text-green-700 font-semibold hover:text-green-900 transition"
                  >
                    Read More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}

      {/* WHY SECTION */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-black text-green-900 text-center mb-10">
          Why Choose Our Feeds?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Premium Ingredients",
            "Scientifically Formulated",
            "Quality & Safety",
            "Freshly Delivered",
          ].map((title, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-gray-600 mt-2 text-sm">
                High-quality formulation designed to maximize productivity and
                livestock health.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 text-center text-white bg-gradient-to-r from-green-700 to-green-500">
        <h3 className="text-2xl font-black">
          Ready to boost your livestock performance?
        </h3>
        <p className="mt-3 max-w-xl mx-auto text-gray-200">
          Let us help you choose the perfect feed for your farm.
        </p>

        <Link
          to="/contact"
          className="inline-block mt-6 bg-lime-400 hover:bg-lime-300 text-black font-bold px-6 py-3 rounded-lg transition"
        >
          Contact Our Team
        </Link>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedFeed && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeed(null)}
          >
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 md:p-6 relative shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedFeed(null)}
                  className="absolute top-3 right-4 text-xl text-gray-500 hover:text-black"
                >
                  ✕
                </button>

                {/* Image */}
                <img
                  src={selectedFeed.image}
                  alt={selectedFeed.title}
                  className="rounded-lg w-full h-44 sm:h-52 md:h-60 object-cover mb-4"
                />

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {selectedFeed.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  {selectedFeed.desc}
                </p>

                {/* Feeding Instructions */}
                {selectedFeed.feedingInstructions && (
                  <div>
                    <p className="font-semibold text-sm md:text-base">
                      Feeding Instructions:
                    </p>
                    <p className="text-gray-600 text-sm md:text-base">
                      {selectedFeed.feedingInstructions}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
