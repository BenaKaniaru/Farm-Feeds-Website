
import { useEffect, useState, useRef } from "react";
import {
  Shield,
  Scale,
  Users,
  CheckCircle,
  Clipboard,
  Award,
  Heart,
  TrendingUp,
} from "lucide-react";
import AboutGallery from "../components/AboutGallery";



function Counter({ target, duration = 2000, showPlus = false }) {
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [showPlusSign, setShowPlusSign] = useState(false);

  useEffect(() => {
    setAnimate(true);
    let start = 0;
    const stepTime = 50;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = start;

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(counter);
        if (showPlus) setShowPlusSign(true);
      }
      setCount(Math.floor(current));
    }, stepTime);

    return () => clearInterval(counter);
  }, [target, duration, showPlus]);

  const formatted = count.toLocaleString();

  return (
    <span className="text-lg sm:text-2xl md:text-4xl font-black flex items-center justify-center gap-1">
      <span
        className={`transition-transform duration-500 ${
          animate ? "scale-110 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {formatted}
      </span>
      {showPlusSign && (
        <span className="text-lg sm:text-2xl md:text-4xl font-black text-green-700 animate-pulse">
          +
        </span>
      )}
    </span>
  );
}

const coreValues = [
  {
    icon: <Shield size={40} className="text-green-600 mb-2" />,
    title: "Integrity",
    description:
      "We never compromise on the quality of our ingredients or manufacturing processes, ensuring quality you can trust.",
  },
  {
    icon: <Scale size={40} className="text-green-600 mb-2" />,
    title: "Fairness",
    description:
      "We treat all our farmers and partners equitably, making quality feeds accessible for everyone.",
  },
  {
    icon: <Users size={40} className="text-green-600 mb-2" />,
    title: "Teamwork",
    description:
      "Collaboration is key. We work together harmoniously with our team, farmers, and partners for sustainable success.",
  },
  {
    icon: <CheckCircle size={40} className="text-green-600 mb-2" />,
    title: "Commitment",
    description:
      "We are persistent, passionate, and willing to invest time and effort to deliver on our promises and maintain consistency in high quality and excellent customer service every day.",
  },
  {
    icon: <Clipboard size={40} className="text-green-600 mb-2" />,
    title: "Accountability",
    description:
      "We take responsibility for our actions, decisions, and outcomes and always listen to feedback for continued improvement.",
  },
];

export default function About() {
  const imageUrl = "/images/farmfeeds.webp";
  const [loaded, setLoaded] = useState(false);

  // Core Values Visibility
  const coreRef = useRef();
  const [coreVisible, setCoreVisible] = useState(false);

  // Counters Visibility
  const counterRef = useRef();
  const [counterVisible, setCounterVisible] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, []);

  // IntersectionObserver for core values
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCoreVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (coreRef.current) observer.observe(coreRef.current);
    return () => observer.disconnect();
  }, []);

  // IntersectionObserver for counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCounterVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[75vh] w-full z-40">
          {/* Background */}
          <div
            className={`absolute inset-0 bg-center bg-cover
      ${loaded ? "opacity-100" : "opacity-0"} bg-fixed`}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 flex flex-col text-center h-full px-4 md:px-8 text-white items-center text-center gap-4">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-black pt-30 md:pt-20">
              About Economy Farm Products
            </h1>

            <p className="text-sm md:text-lg lg:text-2xl max-w-2xl px-6">
              Over two decades of experience in providing premium animal feeds
              and ensuring sustained customer delight
            </p>
          </div>

          <div
            ref={counterRef}
            className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-30 px-6 md:px-12"
          >
            <div className="grid grid-cols-3 text-center bg-white rounded-2xl shadow-lg">
              {/* Card 1 */}
              <div
                className="flex flex-col items-center justify-center gap-1 sm:gap-3
               py-4 px-1 sm:py-4 sm:px-4 md:py-4 md:px-6 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-500 group hover:rounded-2xl"
              >
                <Award
                  className="text-emerald-600 group-hover:scale-110 transition-transform duration-500 sm:size-[30]"
                  size={24}
                />
                {counterVisible && <Counter target={26} showPlus />}
                <span className="font-medium text-[10px] sm:text-base text-gray-700 text-center leading-tight">
                  Years of Excellence
                </span>
              </div>

              {/* Card 2 */}
              <div
                className="flex flex-col items-center justify-center gap-1 sm:gap-3
               py-4 px-1 sm:py-4 sm:px-4 md:py-4 md:px-6 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-500 group hover:rounded-2xl"
              >
                <Heart
                  className="text-rose-500 group-hover:scale-110 transition-transform duration-500 sm:size-[30]"
                  size={20}
                />
                {counterVisible && <Counter target={1000} showPlus />}
                <span className="font-medium text-[10px] sm:text-base text-gray-700 text-center leading-tight">
                  Satisfied Farmers
                </span>
              </div>

              {/* Card 3 */}
              <div
                className="flex flex-col items-center justify-center gap-1 sm:gap-3
               py-4 px-1 sm:py-4 sm:px-4 md:py-4 md:px-6 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-500 group hover:rounded-2xl"
              >
                <TrendingUp
                  className="text-green-600 group-hover:scale-110 transition-transform duration-500 sm:size-[30]"
                  size={24}
                />
                {counterVisible && <Counter target={20} showPlus />}
                <span className="font-medium text-[10px] sm:text-base text-gray-700 text-center leading-tight">
                  Quality Feed Varieties
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center text-left text-green-900 z-10 pt-26 md:pt-40 pb-16 md:px-20 lg:px-32 px-8 bg-yellow-50 ">
          <div>
            <h2 className="text-3xl font-black italic mb-8 text-green-900 text-center">
              Our Story
            </h2>
            <div className="flex flex-col gap-4 mb-8">
              <p className="text-sm md:text-base lg:text-lg">
                Economy Farm Products (K) ltd is a limited liability company
                incorporated on 1 August 1998.The company manufactures and
                distributes animal feeds. The Company is owned and run by Kenyan
                Directors assisted by a team of Competent Managers in Finance,
                Animal Science and Accounting. The Firm is a member of the
                Association of Kenya Feed Manufacturers (AKEFEMA), a nonprofit
                organization that oversees internal quality compliance from
                members and lobbies government agencies that address feed
                industry challenges.
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                At inception the company was situated at Kariobangi producing an
                average of 100 metric tonnes in a month. Through prudent
                management practices, the company realized phenomenal growth and
                in November 1999, it had to relocate to Dakar road into a 5000
                sq. ft Warehouse. While at Dakar road, and before the advent of
                power rationing in the year 2000, the company averaged 350
                metric tonnes in a month. We experienced continued growth and
                moved to a larger go down along Nanyuki road measuring 9,000 sq.
                ft before eventually relocating further to an 18,000 sq.ft
                Godown at the same site.
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                By 2011, the Company was producing 2,100 metric tonnes of animal
                feeds per month and satisfying only 50% of its potential market.
                Due to high warehouse rent and ingredient costs, the Company
                relocated to Kyang’ombe opposite City Cabanas in 2014, producing
                an average of 1,600 Metric Tonnes of Feed per month, all in Mash
                Form. Due to increasing demand for our feeds in the market and
                strategic decision to start making pelleted and crumb feeds, the
                company constructed its own modern feed mill plant in Ndeiya,
                Limuru. Currently, the company has the capacity to produce over
                7000 metric tonnes of animal feed per month.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-4 p-3 bg-white rounded-lg shadow-md mt-8">
                <h3 className="text-xl font-bold text-green-900">Our Vision</h3>
                <p className="text-sm md:text-base lg:text-lg">
                  To be the leading producer of quality animal feeds that
                  contribute to healthy high yielding livestock.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 p-3 bg-white rounded-lg shadow-md mt-8">
                <h3 className="text-xl font-bold text-green-900">
                  Our Mission
                </h3>
                <p className="text-sm md:text-base lg:text-lg">
                  To produce animal feeds and related animal health products
                  while maintaining consistency and reliability for sustained
                  customer delight and market expansion.
                </p>
              </div>
            </div>
          </div>

          <AboutGallery />

          {/* Core Values Section */}

          <section ref={coreRef}>
            <div className="flex flex-col text-center items-center my-12 gap-4 text-green-900">
              <h3 className="text-3xl font-black text-green">
                Our Core Values
              </h3>
              <p className="text-sm md:text-base lg:text-lg">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {coreValues.map((value, idx) => (
                <div
                  key={value.title}
                  className={`flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md transition-all duration-700 ${
                    coreVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-10 scale-95"
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  {value.icon}
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-700 text-sm md:text-base lg:text-lg">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}