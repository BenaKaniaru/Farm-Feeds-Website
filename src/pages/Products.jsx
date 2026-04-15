import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FEEDS } from "../data/FeedsDetails";

export default function Products() {
  const imageUrl = "/images/feeds.webp";
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, []);

  // Get unique categories
  const categories = [...new Set(FEEDS.map((feed) => feed.category))];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
        <div
          className={`absolute inset-0 bg-center bg-cover bg-no-repeat bg-fixed transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 md:px-8 text-white gap-6">
          <h1 className="text-4xl md:text-6xl font-black">Our Products</h1>
          <p className="text-lg md:text-xl max-w-3xl animate-fadeIn delay-150 px-6 md:px-12">
            Explore our premium feed products designed to maximize livestock
            health, growth, and productivity.
          </p>
        </div>
        {!loaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
      </section>

      {/* Products Grouped by Category */}
      {categories.map((category) => (
        <section
          key={category}
          className="flex flex-col items-center text-center py-12 px-6 md:px-16 gap-8 w-full"
        >
          <h2 className="text-2xl md:text-3xl font-black text-green-900">
            {category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {FEEDS.filter((feed) => feed.category === category).map((feed) => (
              <div
                key={feed.id}
                className="flex flex-col text-green-700 gap-4 bg-white p-6 rounded-lg shadow-lg shadow-green-200 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <img
                  src={feed.image}
                  alt={feed.title}
                  className="rounded-lg w-full h-52 object-cover mb-4"
                />

                {/* Title */}
                <h3 className="text-xl font-bold text-black">{feed.title}</h3>

                {/* Description */}
                <p className="text-sm md:text-base">{feed.desc}</p>

                {/* Feeding Instructions */}
                <div className="mt-2">
                  <p className="text-sm font-semibold text-black">
                    Feeding Instructions:
                  </p>
                  <p className="text-sm md:text-base text-gray-700">
                    {feed.feedingInstructions}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Quality Section */}
      <section className="flex flex-col items-center text-center py-12 px-6 md:px-16 gap-6">
        <h2 className="text-2xl md:text-3xl text-green-900 font-black">
          Why Choose Our Feeds?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="bg-white p-6 rounded-lg shadow-lg shadow-green-200">
            <h3 className="font-bold text-black text-lg">
              Premium Ingredients
            </h3>
            <p className="text-sm text-gray-700 mt-2">
              We source only the finest grains, proteins, and vitamins to ensure
              optimal nutrition for higher yields and healthy livestock.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg shadow-green-200">
            <h3 className="font-bold text-black text-lg">
              Scientifically Formulated
            </h3>
            <p className="text-sm text-gray-700 mt-2">
              Our feeds are formulated by experienced animal nutritionists using
              research-backed methods and field testing.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg shadow-green-200">
            <h3 className="font-bold text-black text-lg">Quality & Safety</h3>
            <p className="text-sm text-gray-700 mt-2">
              Rigorous testing at every stage of production ensures high quality
              and safe feed for your herd.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg shadow-green-200">
            <h3 className="font-bold text-black text-lg">Freshly Delivered</h3>
            <p className="text-sm text-gray-700 mt-2">
              Products are produced fresh and delivered quickly to maintain peak
              nutritional value.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col text-center items-center bg-gradient-to-r from-green-700 to-green-500 px-8 md:px-32 text-white py-12 gap-4">
        <h3 className="text-xl md:text-2xl font-black">
          Ready to boost your livestock performance?
        </h3>
        <p className="text-sm md:text-[18px] max-w-2xl">
          Our feeds are formulated to deliver measurable results for milk yield,
          growth, and herd health. Let us help you select the perfect product
          for your farm.
        </p>
        <Link
          to="/contact"
          className="bg-lime-500 text-white font-bold py-3 px-6 rounded-lg cursor-pointer hover:bg-lime-400 mt-4"
        >
          Contact Our Team Today
        </Link>
      </section>
    </div>
  );
}
