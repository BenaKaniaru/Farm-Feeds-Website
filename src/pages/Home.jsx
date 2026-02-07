import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sprout, Award, Shield, TrendingUp, Quote, Star } from "lucide-react";

const images = [
  "/images/farmcows.jpg",
  "/images/farmdairy.jpg",
  "/images/farmpigs.jpg",
  "/images/farmdogs.jpg",
  "/images/farmkienyeji.jpg",
  "/images/farmlayers.jpg",
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [showNext, setShowNext] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const preload = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
    });

  useEffect(() => {
    const interval = setInterval(async () => {
      const upcoming = (current + 1) % images.length;
      await preload(images[upcoming]);

      setNext(upcoming);
      setShowNext(true);

      setTimeout(() => {
        setCurrent(upcoming);
        setShowNext(false);
      }, 1500);
    }, 8000);

    return () => clearInterval(interval);
  }, [current]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/*Hero section or the landing page*/}
      <section className="relative h-screen overflow-hidden px-10 md:px-20 lg:px-32">
        {/* Fixed current background */}
        <div
          className="fixed inset-0 -z-20"
          style={{
            backgroundImage: `url('${images[current]}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Fixed next background (crossfade) */}
        <div
          className={`fixed inset-0 -z-20 transition-opacity duration-[1500ms] ease-in-out ${
            showNext ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${images[next]}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Parallax dark overlay */}
        <div
          className="absolute inset-0 bg-black/60"
          style={{
            transform: `translateY(${scrollY * 0.25}px)`,
          }}
        />

        {/* Foreground content (faster parallax) */}
        <div
          className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 text-white"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <h1 className="text-xl md:text-3xl mb-8 leading-tight drop-shadow-xl">
            Welcome to Economy Farm Products (K) Ltd,
            <br />
            <span className="font-bold text-2xl md:text-4xl">
              Your trusted partner in quality animal feeds.
            </span>
          </h1>

          <p className=" text-[14px] md:text-[20px] max-w-2xl mb-8 opacity-90 animate-fadeIn delay-150 px-8 drop-shadow-lg">
            With over two decades of experience in animal nutrition, at{" "}
            <span className="font-black">Economy Farm Products</span> we are
            committed to producing premium quality feeds for healthier high
            yielding livestock and sustainable agriculture
          </p>

          <div className="flex flex-row gap-4">
            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-700 px-7 py-3 rounded-lg text-white font-semibold transition shadow-lg hover:scale-105"
            >
              View Our Products
            </Link>

            <Link
              to="/contact"
              className="border border-white px-7 py-3 rounded-lg hover:bg-white hover:text-black transition shadow-lg hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Top Selling Feeds + CTA */}
      <section className="bg-green-50 py-14 px-10 md:px-20 lg:px-32">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-black font-black text-2xl md:text-4xl mb-4">
            Our Top-Selling Feeds
          </h2>
          <p className="text-green-800 text-sm md:text-lg max-w-3xl mx-auto">
            Trusted by farmers across Kenya for quality nutrition, consistent
            results, and improved farm productivity.
          </p>
        </div>

        {/* Feed cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {[
            {
              title: "Layers Mash & Pellets",
              desc: "High-nutrition feeds formulated to improve egg production, shell strength, and flock health.",
            },
            {
              title: "Broiler Starter & Finisher Meals",
              desc: "High-performance feeds for rapid growth, excellent feed conversion, and strong birds.",
            },
            {
              title: "Chick & Grower Feeds",
              desc: "Scientifically balanced for strong early growth, immunity, and smooth transition to maturity.",
            },
            {
              title: "Kienyeji Mash & Pellets",
              desc: "Designed for indigenous poultry to improve hardiness, growth, and egg yield.",
            },
            {
              title: "Dairy Feeds",
              desc: "Energy-rich dairy feeds designed to boost milk yield while maintaining animal health.",
            },
            {
              title: "Pig Feeds",
              desc: "Optimized formulations for fast growth, efficient feed utilization, and weight gain.",
            },
            {
              title: "Skipa Dog Meal",
              desc: "Balanced nutrition for healthy, active dogs",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="font-bold text-black mb-2">{item.title}</h3>
              <p className="text-green-800 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA with image */}
        <div className="relative rounded-xl overflow-hidden shadow-lg">
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

      <section className="flex flex-col items-center text-center gap-6 py-10 px-10 md:px-20 lg:px-32 bg-gradient-to-r from-green-800 to-green-400 text-white">
        <h2 className="text-3xl font-black">Ready to increase your yields?</h2>
        <p className="text-sm md:text-lg">
          Join hundreds of satisfied farmers who trust Economy Farm Feeds for
          superior animal nutrition and experience the difference.
        </p>

        <Link
          to="/contact"
          className="bg-lime-500 text-white font-bold py-2 px-4 rounded-lg cursor-pointe hover:bg-lime-400"
        >
          Get Started Today
        </Link>
      </section>
    </div>
  );
}
