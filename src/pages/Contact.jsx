import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  User,
  MessageSquare,
} from "lucide-react";


export default function Contact() {
  const imageUrl = "/images/farm-feeds-ariel.webp";

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) {
      newErrors.name = "Please provide your name.";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Please provide an email so we can get back to you";
      isValid = false;
    }

    if (!emailRegex.test(form.email)) {
       newErrors.email = "Please provide a valid email";
     }

    if (!form.message.trim()) {
      newErrors.message = "What is your message?";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

 const handleSubmit = (e) => {
   if (!validate()) {
     e.preventDefault();
     return;
   }

   setLoading(true);
 };


  return (
    <div>
      <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Background */}
          <div
            className={`absolute inset-0 bg-center bg-cover bg-no-repeat bg-fixed transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>

        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 md:px-8 text-white gap-8">
          <h1 className="text-4xl md:text-6xl font-black">Get In Touch</h1>
          <p className="text-lg md:text-xl mb-8 animate-fadeIn delay-150 px-12 text-white">
            Have questions or want to learn more about our products? Reach out
            to us! We are here to serve you.
          </p>
        </div>
        {!loaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
      </section>

      <section className="bg-yellow-50 py-16 px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <a
          href="https://maps.app.goo.gl/RU4WmdsuaPfPa5uk6"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-2 text-center items-center p-6 bg-white rounded-lg shadow-md hover:cursor-pointer"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-300 text-white p-3 md:p-4 rounded-full">
            <MapPin className="text-white" size={30} />
          </div>
          <span className="text-xl font-bold">Visit Us</span>
          <span className="text-sm md:text-[16px">
            Thigio-Ndeiya, along Ng'amba Kanyayo Road Off Gikambura Mutarakwa
            Road – Limuru
          </span>
        </a>

        <a
          href="tel:+254722209838"
          className="flex flex-col gap-2 text-center items-center p-6 bg-white rounded-lg shadow-md hover:cursor-pointer"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-300 text-white p-3 md:p-4  rounded-full">
            <Phone size={30} />
          </div>
          <span className="text-xl font-bold">Call Us</span>
          <span className="text-sm md:text-[16px]">0722 209 838</span>
        </a>

        <a
          href="mailto:sales@farmfeeds.org"
          className="flex flex-col gap-2 text-center items-center p-6 bg-white rounded-lg shadow-md"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-300 text-white p-3 md:p-4  rounded-full">
            <Mail size={30} />
          </div>
          <span className="text-xl font-bold">Mail Us</span>
          <span className="text-sm md:text-[16px]">sales@farmfeeds.org</span>
        </a>

        <div className="flex flex-col gap-2 text-center items-center p-6 bg-white rounded-lg shadow-md">
          <div className="bg-gradient-to-r from-green-600 to-green-300 text-white p-3 md:p-4 rounded-full">
            <Clock size={30} />
          </div>
          <span className="text-xl font-bold">Business Hours</span>
          <span className="text-sm md:text-[16px]">Mon-Fri: 8:00 AM - 6:00 PM</span>
          <span className="text-sm md:text-[16px]">Sat:9:00 AM - 2:00 PM</span>
        </div>
      </section>

      <section className="py-16 px-6 md:px-20 bg-green-50">
        <h3 className="text-2xl md:text-3xl font-black text-green-900 text-center mb-8">
          Send Us a Message
        </h3>

        <form
          onSubmit={handleSubmit}
          action="https://formsubmit.co/sales@farmfeeds.org"
          method="POST"
          className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          {/*Hidden inputs for form submission*/}
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_subject"
            value="You have a new message from the company website!"
          />

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <span className="italic text-sm text-red-500 px-2">
              {errors.name}
            </span>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-3">
              <User size={18} className="text-green-600 mr-2" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email *</label>
            <span className="italic text-sm text-red-500 px-2">
              {errors.email}
            </span>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-3">
              <Mail size={18} className="text-green-600 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-3">
              <Phone size={18} className="text-green-600 mr-2" />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone (optional)"
                value={form.phone}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Message *
            </label>
            <span className="italic text-sm text-red-500 px-2">
              {errors.message}
            </span>
            <div className="flex items-start border rounded-lg px-3 py-2 mt-3">
              <MessageSquare size={18} className="text-green-600 mr-2 mt-1" />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full outline-none resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg font-semibold transition
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-700 hover:bg-green-800 text-white"
    }
  `}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </section>

      <section className="py-16 px-4 md:px-20 bg-white">
        <h3 className="text-2xl md:text-3xl font-black text-green-900 text-center mb-8">
          Find Our Location
        </h3>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border">
          {/* Map Container */}
          <div className="relative w-full h-[300px] md:h-[450px]">
            {/* Google Map Embed */}
            <iframe
              title="Economy Farm Products Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127644.50995085419!2d36.5323267!3d-1.2353766!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f13d153f18c67%3A0xd97d7dce3c5f9a7e!2sEconomy%20Farm%20Products%20(K)%20Ltd!5e0!3m2!1sen!2ske!4v1768489811613!5m2!1sen!2ske"
              className="absolute top-0 left-0 w-full h-full border-0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Animated Pin Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="w-5 h-5 bg-green-600 rounded-full animate-ping absolute"></div>
                <div className="w-5 h-5 bg-green-700 rounded-full relative border-2 border-white"></div>
              </div>
            </div>
          </div>

          {/* Bottom Card with Info & Button */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white">
            <div className="text-center md:text-left">
              <p className="font-bold text-green-900 text-lg">
                Economy Farm Products
              </p>
              <p className="text-gray-600 text-sm">
                Thigio-Ndeiya, Limuru, Kenya
              </p>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Economy+Farm+Products+K+Ltd+Thigio-Ndeiya+Limuru+Kenya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              🧭 Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
