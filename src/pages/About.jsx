import { useEffect, useState, useRef } from "react";
import { Shield, Scale, Users, CheckCircle, Clipboard } from "lucide-react";

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
    <span className="text-4xl font-black flex items-center justify-center gap-1">
      <span
        className={`transition-transform duration-500 ${
          animate ? "scale-110 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {formatted}
      </span>
      {showPlusSign && (
        <span className="text-4xl font-black text-green-700 animate-pulse">
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
      { threshold: 0.3 }
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
      { threshold: 0.3 }
    );
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
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
          <h1 className="text-4xl md:text-6xl font-black">
            About Economy Farm Products
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8 animate-fadeIn delay-150 px-12 text-white">
            Over two decades of experience in providing premium animal feeds and
            ensuring sustained customer delight
          </p>
        </div>
        {!loaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
      </section>
      <section className="flex flex-col items-center text-left text-green-900 gap-2 py-16 md:px-20 lg:px-32 px-8 bg-yellow-50">
        <div>
          <h2 className="text-3xl font-black italic mb-8 text-green-900 text-center">
            Our Story
          </h2>
          <div className="flex flex-col gap-2">
            <p>
              Founded in 2003, Economy Farm Products has been at the forefront
              of agricultural innovation, providing farmers with the highest
              quality animal nutrition backed by scientific research and decades
              of agricultural expertise.
            </p>

            <p>
              What started as a small operation has grown into a trusted partner
              for thousands of farms across the region. Our commitment to
              quality, sustainability, and innovation has never wavered.
            </p>

            <p>
              Today, we combine traditional agricultural wisdom with
              cutting-edge nutritional science to formulate feeds that optimize
              animal health, improve farm productivity, and support sustainable
              farming practices.
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

      {/* Counters */}
      <section
        ref={counterRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-green-900 py-16 px-8"
      >
        <div className="flex flex-col items-center gap-4">
          {counterVisible && <Counter target={20} showPlus={true} />}
          <span className="font-normal">
            Years of Experience and Excellence
          </span>
        </div>
        <div className="flex flex-col items-center gap-4">
          {counterVisible && <Counter target={1000} showPlus={true} />}
          <span>Satisfied Farmers</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          {counterVisible && <Counter target={20} showPlus={true} />}
          <span>Varieties of Quality Animal Feeds</span>
        </div>
      </section>
    </>
  );
}


