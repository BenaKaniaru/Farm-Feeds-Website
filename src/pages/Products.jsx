import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const imageUrl = "/images/feeds.jfif";
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <div>
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imageUrl}
            alt="Farm background"
            className={`w-full h-full object-cover transition-all duration-[1500ms] ease-out
      ${loaded ? "opacity-100" : "opacity-0"}
      scale-[1.05] sm:scale-[1.1] md:scale-[1.15] lg:scale-[1.2] xl:scale-[1.25]
    `}
          />
        </div>

        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 md:px-8 text-white gap-8">
          <h1 className="text-4xl md:text-6xl font-black">Our Products</h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8 animate-fadeIn delay-150 px-12 text-white">
            Comprehensive range of high-quality feeds for healthier livestock
            and higher yields.
          </p>
        </div>
        {!loaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
      </section>

      <section className="flex flex-col items-center text-center py-12 px-8 md:px-16 gap-3">
        <h2 className="text-xl md:text-2xl  text-green-900 font-black">
          Product Quality Guaranteed
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col text-green-700 gap-4 max-w-3xl mt-6 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Premium Ingredients</h3>
            <p>
              We source only the finest grains, proteins, and vitamins to ensure
              optimal nutrition for higher yields and better animal health.{" "}
            </p>
          </div>

          <div className="flex flex-col text-green-700 gap-4 max-w-3xl mt-6 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Scientific Formulation</h3>
            <p>
              Each of our feed products is carefully formulated by our team of
              experienced animal nutritionists using the latest research and
              field testing.
            </p>
          </div>

          <div className="flex flex-col text-green-700 gap-4 max-w-3xl mt-6 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Quality Control</h3>
            <p>
              Adherence to good production pactices and rigorous testing of our
              products at every stage of production ensures high quality and
              safety standards.
            </p>
          </div>

          <div className="flex flex-col text-green-700 gap-4 max-w-3xl mt-6 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Fresh</h3>
            <p>
              Products are produced fresh and delivered quickly to maintain peak
              nutritional value.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col text-center items-center bg-gradient-to-r from-green-700 to-green-500 px-8 md:px-32 text-white py-12 gap-4">
        <h3 className="text-xl md:text-2xl  font-black">
          Are you ready to elevate your livestock yields?
        </h3>

        <p>
          Our products are formulated to deliver exceptional results for your
          farm and we are ready to help you select the perfect products for you.
        </p>

        <Link
          to="/contact"
          className="bg-lime-500 text-white font-bold py-2 px-4 rounded-lg cursor-pointe hover:bg-lime-400"
        >
          Contact Our Team Today
        </Link>
      </section>
    </div>
  );
}
