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
    <span className="text-xl sm:text-3xl md:text-4xl font-black flex items-center justify-center gap-1">
      <span
        className={`transition-transform duration-500 ${
          animate ? "scale-110 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {formatted}
      </span>
      {showPlusSign && (
        <span className="text-xl sm:text-3xl md:text-4xl font-black text-green-700 animate-pulse">
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
      {/* Hero Section */}
      {/* Hero Section */}
      <div className="relative">
  {/* Hero Section */}
  <section className="relative h-[75vh] md:h-[85vh] lg:h-screen w-full overflow-hidden">
    {/* Background */}
    <div
      className={`absolute inset-0 bg-center bg-cover bg-no-repeat transition-opacity duration-[1500ms]
      ${loaded ? "opacity-100" : "opacity-0"} md:bg-fixed`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />

    <div className="absolute inset-0 bg-black/50" />

    <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 md:px-8 text-white gap-8">
      <h1 className="text-4xl md:text-6xl font-black">
        About Economy Farm Products
      </h1>

      <p className="text-xl md:text-2xl max-w-2xl px-6">
        Over two decades of experience in providing premium animal feeds and
        ensuring sustained customer delight
      </p>
    </div>
  </section>

  {/* Counters */}
  <div
    ref={counterRef}
    className="
      absolute left-1/2 bottom-0 z-30
      w-full max-w-6xl px-4 md:px-8
      -translate-x-1/2
      -translate-y-[35%]
      sm:-translate-y-[45%]
      md:-translate-y-[55%]
      lg:-translate-y-[65%]
    "
  >
    <div className="bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
      <div className="grid grid-cols-3 divide-x divide-green-100">
            {/* Card 1 */}
            <div
              className="flex flex-col items-center justify-center gap-1 sm:gap-3
                py-6 px-2 sm:py-12 sm:px-6
                hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50
                transition-all duration-500 group"
            >
              <Award
                className="text-emerald-600 group-hover:scale-110 transition-transform duration-500 sm:size-[30]"
                size={24}
              />
              {counterVisible && <Counter target={26} showPlus />}
              <span className="font-semibold text-gray-700 text-center text-sm sm:text-lg">
                Years of Excellence
              </span>
            </div>

            {/* Card 2 */}
            <div
              className="flex flex-col items-center justify-center gap-1 sm:gap-3
                py-6 px-2 sm:py-12 sm:px-6
                hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50
                transition-all duration-500 group"
            >
              <Heart
                className="text-rose-500 group-hover:scale-110 transition-transform duration-500 sm:size-[30]"
                size={24}
              />
              {counterVisible && <Counter target={1000} showPlus />}
              <span className="font-semibold text-gray-700 text-center text-sm sm:text-lg">
                Satisfied Farmers
              </span>
            </div>

            {/* Card 3 */}
            <div
              className="flex flex-col items-center justify-center gap-1 sm:gap-3
                py-6 px-2 sm:py-12 sm:px-6
                hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50
                transition-all duration-500 group"
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
      </div>

        <div className="h-40 sm:h-48 md:h-56 lg:h-64" />

      <section className="flex flex-col items-center text-left text-green-900 gap-2 pt-35 md:pt-50 pb-16 md:px-20 lg:px-32 px-8 bg-yellow-50">
        <div>
          <h2 className="text-3xl font-black italic mb-8 text-green-900 text-center">
            Our Story
          </h2>
          <div className="flex flex-col gap-2">
            <p>
              Economy Farm Products (K) ltd is a limited liability company
              incorporated on 1 August 1998.The company manufactures and
              distributes animal feeds. The Company is owned and run by Kenyan
              Directors assisted by a team of Competent Managers in Finance,
              Animal Science and Accounting. The Firm is a member of the
              Association of Kenya Feed Manufacturers (AKEFEMA), a nonprofit
              organization that oversees internal quality compliance from
              members and lobbies government agencies that address feed industry
              challenges.
            </p>

            <p>
              At inception the company was situated at Kariobangi producing an
              average of 100 metric tonnes in a month. Through prudent
              management practices, the company realized phenomenal growth and
              in November 1999, it had to relocate to Dakar road into a 5000 sq.
              ft Warehouse. While at Dakar road, and before the advent of power
              rationing in the year 2000, the company averaged 350 metric tonnes
              in a month. We experienced continued growth and moved to a larger
              go down along Nanyuki road measuring 9,000 sq. ft before
              eventually relocating further to an 18,000 sq.ft Godown at the
              same site.
            </p>

            <p>
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
              <p>
                To be the leading producer of quality animal feeds that
                contribute to healthy high yielding livestock.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 p-3 bg-white rounded-lg shadow-md mt-8">
              <h3 className="text-xl font-bold text-green-900">Our Mission</h3>
              <p>
                To produce animal feeds and related animal health products while
                maintaining consistency and reliability for sustained customer
                delight and market expansion.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}

        <section ref={coreRef}>
          <div className="flex flex-col text-center items-center my-12 gap-4 text-green-900">
            <h3 className="text-3xl font-black text-green">Our Core Values</h3>
            <p>The principles that guide everything we do</p>
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
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
