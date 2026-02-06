import { MapPin, Phone, Mail } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 pb-20 px-10 md:px-20 lg:px-32 pt-10 text-sm">
      <div className="flex flex-col md:flex-row mb-10 gap-10 justify-between">
        {/* Brand */}
        <div className="max-w-sm">
          <h2 className="text-lg md:text-xl lg:text-2xl font-cooper-custom font-bold tracking-wide text-green-700">
            FARM FEEDS
          </h2>
          <p className="text-green-600 font-light leading-relaxed">
            Premium farm feeds and animal nutrition solutions for sustainable
            agriculture.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-black font-medium text-lg mb-4">Quick Links</h2>

          <div className="flex flex-col space-y-3 text-green-600 font-light">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition hover:text-green-700 ${
                  isActive ? "font-semibold text-green-700" : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition hover:text-green-700 ${
                  isActive ? "font-semibold text-green-700" : ""
                }`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `transition hover:text-green-700 ${
                  isActive ? "font-semibold text-green-700" : ""
                }`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `transition hover:text-green-700 ${
                  isActive ? "font-semibold text-green-700" : ""
                }`
              }
            >
              Contact
            </NavLink>
          </div>
        </div>

        {/* Products */}
        <div>
          <h2 className="text-black font-medium text-lg mb-4">Products</h2>
          <div className="flex flex-col space-y-3 text-green-600 font-light">
            {["Cattle Feed", "Poultry Feed", "Pig Feed", "Dog Meal"].map(
              (product) => (
                <span key={product} className="hover:text-green-700 transition">
                  {product}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-black font-medium text-lg mb-4">Contact Info</h2>
          <div className="flex flex-col space-y-4 text-green-600 font-light">
            {/* Address */}
            <a
              href="https://maps.app.goo.gl/RU4WmdsuaPfPa5uk6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 hover:text-green-700 transition"
            >
              <MapPin size={20} className="mt-1" />
              <div className="flex flex-col leading-snug">
                <span>Thigio-Ndeiya, along Ng'amba Kanyayo Road</span>
                <span>Off Gikambura Mutarakwa Road – Limuru</span>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+254722209838"
              className="flex items-center gap-3 hover:text-green-700 transition"
            >
              <Phone size={20} />
              <span>0722 209 838</span>
            </a>

            {/* Email */}
            <a
              href="mailto:sales@farmfeeds.org"
              className="flex items-center gap-3 hover:text-green-700 transition"
            >
              <Mail size={20} />
              <span>sales@farmfeeds.org</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t pt-4 pb-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Farm Feeds. All rights reserved.
      </div>
    </footer>
  );
}
