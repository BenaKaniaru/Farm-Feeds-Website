import { useEffect, useState, useRef } from "react";
import { MapPin, Phone, Mail, Clock, User, MessageSquare } from "lucide-react";

export default function Contact() {
  const imageUrl = "/images/farm-feeds-ariel.webp";
  const [loaded, setLoaded] = useState(false);
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Load background image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate form
  const validate = () => {
    let isValid = true;
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) {
      newErrors.name = "Please provide your name.";
      isValid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Please provide an email.";
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please provide a valid email.";
      isValid = false;
    }
    if (!form.message.trim()) {
      newErrors.message = "Please provide a message.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Submit the form normally so FormSubmit handles redirect
    formRef.current.submit();
  };

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
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 md:px-8 text-white gap-8">
          <h1 className="text-4xl md:text-6xl font-black">Get In Touch</h1>
          <p className="text-lg md:text-xl mb-8 animate-fadeIn delay-150 px-12">
            Have questions or want to learn more about our products? Reach out
            to us! We are here to serve you.
          </p>
        </div>
        {!loaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
      </section>

      {/* Contact Info Section */}
      <section className="bg-yellow-50 py-16 px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <a
          href="https://maps.app.goo.gl/RU4WmdsuaPfPa5uk6"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-2 text-center items-center p-6 bg-white rounded-lg shadow-md hover:cursor-pointer"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-300 text-white p-3 md:p-4 rounded-full">
            <MapPin size={30} />
          </div>
          <span className="text-xl font-bold">Visit Us</span>
          <span className="text-sm md:text-[16px]">
            Thigio-Ndeiya, along Ng'amba Kanyayo Road Off Gikambura Mutarakwa
            Road – Limuru
          </span>
        </a>

        <a
          href="tel:+254722209838"
          className="flex flex-col gap-2 text-center items-center p-6 bg-white rounded-lg shadow-md hover:cursor-pointer"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-300 text-white p-3 md:p-4 rounded-full">
            <Phone size={30} />
          </div>
          <span className="text-xl font-bold">Call Us</span>
          <span className="text-sm md:text-[16px]">0722 209 838</span>
        </a>

        <a
          href="mailto:sales@farmfeeds.org"
          className="flex flex-col gap-2 text-center items-center p-6 bg-white rounded-lg shadow-md"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-300 text-white p-3 md:p-4 rounded-full">
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
          <span className="text-sm md:text-[16px]">
            Mon-Fri: 8:00 AM - 6:00 PM
          </span>
          <span className="text-sm md:text-[16px]">Sat: 9:00 AM - 2:00 PM</span>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6 md:px-20 bg-green-50">
        <h3 className="text-2xl md:text-3xl font-black text-green-900 text-center mb-8">
          Send Us a Message
        </h3>

        <form
          ref={formRef} // add ref for programmatic submission
          onSubmit={handleSubmit}
          action="https://formsubmit.co/sales@farmfeeds.org"
          method="POST"
          className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          {/* Hidden Inputs */}
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_subject"
            value="You have a new message from the website!"
          />
          <input
            type="hidden"
            name="_next"
            value="http://farmfeeds.org/#/thank-you"
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
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
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
                value={form.phone}
                onChange={handleChange}
                placeholder="Your Phone (optional)"
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
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                className="w-full outline-none resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg font-semibold transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800 text-white"}
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
    </div>
  );
}
