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
      <section className="relative h-screen overflow-hidden">
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
          className="absolute inset-0 bg-black/50"
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
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-xl">
            Nourishing Farms,
            <br />
            Growing Futures
          </h1>

          <p className="text-lg md:text-2xl max-w-2xl mb-8 opacity-90 animate-fadeIn delay-150 px-12 drop-shadow-lg">
            Premium quality feeds for healthier high yielding livestock and
            sustainable agriculture
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-700 px-7 py-3 rounded-lg text-white font-semibold transition shadow-lg hover:scale-105"
            >
              View Products
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

      <section className="bg-yellow-50 py-16 px-8 text-center">
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

      <section className="bg-orange-100 text-center py-16 px-8 ">
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

      <section className="flex flex-col items-center text-center gap-6 py-16 px-8 bg-gradient-to-r from-green-800 to-green-400 text-white">
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
