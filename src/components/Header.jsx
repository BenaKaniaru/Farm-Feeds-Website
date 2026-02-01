import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `cursor-pointer transition-colors duration-200 ${
      isActive
        ? "text-green-700 font-semibold border-b-2 border-green-600"
        : "text-green-600 hover:text-green-500"
    }`;

  return (
    <header className="w-full py-4 px-8 bg-white flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex flex-col text-center items-center">
        <h1 className="text-lg md:text-xl lg:text-2xl font-cooper-custom font-bold tracking-wide text-green-700">
          FARM FEEDS
        </h1>
        <p className="text-[10px] md:text-sm italic  text-green-700">
          Healthy, High Yielding Livestock
        </p>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-lg font-medium relative font-cooper-custom tracking-wide text-green-700">
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>

        <NavLink to="/about" className={navClass}>
          About Us
        </NavLink>

        <NavLink to="/products" className={navClass}>
          Products
        </NavLink>

        <NavLink to="/contact" className={navClass}>
          Contact
        </NavLink>
      </nav>

      {/* Hamburger */}
      <button
        className="md:hidden text-3xl text-green-700 transition-transform duration-200 hover:scale-110"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-left text-left gap-4 py-6 px-8 text-green-700 font-normal  text-lg md:hidden transform transition-all duration-300 border-t
        ${
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="hover:font-semibold"
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          onClick={() => setOpen(false)}
          className="hover:font-semibold"
        >
          About Us
        </NavLink>

        <NavLink
          to="/products"
          onClick={() => setOpen(false)}
          className="hover:font-semibold"
        >
          Products
        </NavLink>

        <NavLink
          to="/contact"
          onClick={() => setOpen(false)}
          className="hover:font-semibold"
        >
          Contact
        </NavLink>
      </div>
    </header>
  );
}
