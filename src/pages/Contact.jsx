import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  MapPin, Phone, Mail, Clock, User, MessageSquare, 
  Send, CheckCircle, ArrowRight, Building, Globe 
} from "lucide-react";

export default function Contact() {
  const imageUrl = "/images/farm-feeds-ariel.webp";
  const [loaded, setLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef();
  const contactInfoRef = useRef();
  const isContactInfoInView = useInView(contactInfoRef, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState({});

  // Load background image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: false });
  };

  // Validate form
  const validate = () => {
    let isValid = true;
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) {
      newErrors.name = "Please provide your name";
      isValid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Please provide an email";
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please provide a valid email";
      isValid = false;
    }
    if (!form.message.trim()) {
      newErrors.message = "Please provide a message";
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

    // Simulate form submission with animation
    setTimeout(() => {
      formRef.current.submit();
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  const contactMethods = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Thigio-Ndeiya, along Ng'amba Kanyayo Road", "Off Gikambura Mutarakwa Road – Limuru"],
      link: "https://maps.app.goo.gl/RU4WmdsuaPfPa5uk6",
      linkText: "Get Directions →",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["0722 209 838", "Available Mon-Sat 8AM-6PM"],
      link: "tel:+254722209838",
      linkText: "Call Now →",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["sales@farmfeeds.org", "We respond within 24 hours"],
      link: "mailto:sales@farmfeeds.org",
      linkText: "Send Email →",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
      link: null,
      linkText: null,
      color: "from-orange-500 to-amber-600",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-green-900/40" />
        
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="mb-4 inline-block px-4 py-1 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 text-sm font-semibold"
            >
              We're Here to Help
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">
              Get In Touch
            </h1>
            
            <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto">
              Have questions or want to learn more about our products? 
              Our team is ready to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section - Enhanced */}
      <section ref={contactInfoRef} className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContactInfoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="h-1 w-20 bg-green-600 mx-auto mb-4 rounded-full" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-green-900">
              Connect With Us
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Multiple ways to reach our team
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isContactInfoInView ? "visible" : {}}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactMethods.map((method, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${method.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                {method.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-sm mb-1">{detail}</p>
                ))}
                {method.link && (
                  <a
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-4 text-green-700 font-semibold text-sm hover:gap-2 transition-all"
                  >
                    {method.linkText}
                    <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section - Enhanced */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <div className="h-1 w-16 bg-green-600 mb-4 rounded-full" />
                <h3 className="text-2xl md:text-3xl font-black text-green-900 mb-2">
                  Send Us a Message
                </h3>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                action="https://formsubmit.co/sales@farmfeeds.org"
                method="POST"
                className="space-y-6"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_subject"
                  value="New message from Farm Feeds website"
                />
                <input
                  type="hidden"
                  name="_next"
                  value={`${window.location.origin}/thank-you`}
                />

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${focused.name ? 'border-green-500 shadow-md' : 'border-gray-200'} ${errors.name ? 'border-red-500' : ''}`}>
                    <User size={18} className="text-green-600 mr-3" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                      placeholder="John Doe"
                      className="w-full outline-none bg-transparent"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${focused.email ? 'border-green-500 shadow-md' : 'border-gray-200'} ${errors.email ? 'border-red-500' : ''}`}>
                    <Mail size={18} className="text-green-600 mr-3" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                      placeholder="john@example.com"
                      className="w-full outline-none bg-transparent"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${focused.phone ? 'border-green-500 shadow-md' : 'border-gray-200'}`}>
                    <Phone size={18} className="text-green-600 mr-3" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={() => handleBlur('phone')}
                      placeholder="+254 722 209 838"
                      className="w-full outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className={`border-2 rounded-xl px-4 py-3 transition-all ${focused.message ? 'border-green-500 shadow-md' : 'border-gray-200'} ${errors.message ? 'border-red-500' : ''}`}>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={() => handleBlur('message')}
                      placeholder="Tell us about your inquiry..."
                      rows={5}
                      className="w-full outline-none resize-none bg-transparent"
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex justify-center items-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                    loading 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg text-white"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  We respect your privacy. Your information is safe with us.
                </p>
              </form>
            </motion.div>

            {/* Right Side - Trust Badges & Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8"
            >
              <div className="text-center mb-6">
                <Building className="w-12 h-12 text-green-700 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-green-900">Why Contact Us?</h4>
                <p className="text-gray-600 text-sm mt-2">
                  We're committed to providing exceptional customer service
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { text: "24-hour response time", icon: CheckCircle },
                  { text: "Expert consultation available", icon: CheckCircle },
                  { text: "Free farm assessment", icon: CheckCircle },
                  { text: "Bulk order discounts", icon: CheckCircle },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm"
                  >
                    <item.icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-green-200">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Serving farmers across Kenya since 1998</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section - Enhanced */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="h-1 w-20 bg-green-600 mx-auto mb-4 rounded-full" />
            <h3 className="text-3xl md:text-4xl font-black text-green-900">
              Find Our Location
            </h3>
            <p className="text-gray-600 mt-3 text-lg">
              Visit our modern facility in Limuru
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="relative w-full h-[350px] md:h-[450px]">
              <iframe
                title="Economy Farm Products Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127644.50995085419!2d36.5323267!3d-1.2353766!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f13d153f18c67%3A0xd97d7dce3c5f9a7e!2sEconomy%20Farm%20Products%20(K)%20Ltd!5e0!3m2!1sen!2ske!4v1768489811613!5m2!1sen!2ske"
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="text-center md:text-left">
                <p className="font-bold text-green-900 text-lg">Economy Farm Products (K) Ltd</p>
                <p className="text-gray-600 text-sm">Thigio-Ndeiya, Limuru, Kenya</p>
                <p className="text-gray-500 text-xs mt-1">📍 Located along Ng'amba Kanyayo Road</p>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Economy+Farm+Products+K+Ltd+Thigio-Ndeiya+Limuru+Kenya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                🧭 Get Directions
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}