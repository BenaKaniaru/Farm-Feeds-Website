import { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Leaf, ChevronRight } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false); // New state for mobile
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setMobileProductsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth scroll to section
  const scrollToCategory = (categoryId) => {
    // Close all dropdowns and menus
    setProductsDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);

    // If not on products page, navigate first then scroll
    if (location.pathname !== "/products") {
      sessionStorage.setItem("scrollToCategory", categoryId);
      navigate("/products");
      return;
    }

    // If on products page, scroll directly with a slight delay
    setTimeout(() => {
      const element = document.getElementById(categoryId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Check for saved scroll on products page load
  useEffect(() => {
    if (location.pathname === "/products") {
      const scrollTo = sessionStorage.getItem("scrollToCategory");
      if (scrollTo) {
        sessionStorage.removeItem("scrollToCategory");

        const tryScroll = () => {
          const element = document.getElementById(scrollTo);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          } else {
            setTimeout(tryScroll, 200);
          }
        };

        setTimeout(tryScroll, 500);
      }
    }
  }, [location.pathname]);

  const productCategories = [
    { id: "dairy", name: "Dairy Feeds", icon: "🐄" },
    { id: "poultry", name: "Poultry Feeds", icon: "🐔" },
    { id: "pig", name: "Pig Feeds", icon: "🐷" },
    { id: "dog", name: "Dog Food", icon: "🐕" },
  ];

  const navLinkClass = ({ isActive }) => `
    relative font-medium transition-all duration-300
    ${
      isActive
        ? "text-green-700 font-semibold"
        : "text-gray-700 hover:text-green-600"
    }
  `;

  const activeIndicatorClass = ({ isActive }) =>
    isActive
      ? "absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"
      : "";

  return (
    <>
      <header
        className={`
          fixed top-0 w-full z-50 transition-all duration-500
          ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
              : "bg-white shadow-md py-4"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center gap-3"
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileProductsOpen(false);
              }}
            >
              <div>
                <h1 className="text-base md:text-xl lg:text-2xl font-black tracking-tight bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
                  FARM FEEDS
                </h1>
                <p className="text-[8px] md:text-[10px] text-gray-500 font-medium tracking-wide">
                  Healthy, High Yielding Livestock
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <NavLink to="/" className={navLinkClass} end>
                {({ isActive }) => (
                  <span className="relative px-3 py-2">
                    Home
                    <span className={activeIndicatorClass({ isActive })} />
                  </span>
                )}
              </NavLink>

              <NavLink to="/about" className={navLinkClass}>
                {({ isActive }) => (
                  <span className="relative px-3 py-2">
                    About Us
                    <span className={activeIndicatorClass({ isActive })} />
                  </span>
                )}
              </NavLink>

              {/* Products Dropdown Trigger - Desktop */}
              <div
                className="relative"
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <NavLink to="/products" className={navLinkClass}>
                  {({ isActive }) => (
                    <span className="relative px-3 py-2 flex items-center gap-1">
                      Products
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          productsDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                      <span className={activeIndicatorClass({ isActive })} />
                    </span>
                  )}
                </NavLink>

                {/* Dropdown Menu - Desktop */}
                <AnimatePresence>
                  {productsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      {productCategories.map((category, idx) => (
                        <button
                          key={idx}
                          onClick={() => scrollToCategory(category.id)}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors flex items-center gap-2"
                        >
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/contact" className={navLinkClass}>
                {({ isActive }) => (
                  <span className="relative px-3 py-2">
                    Contact
                    <span className={activeIndicatorClass({ isActive })} />
                  </span>
                )}
              </NavLink>

              {/* CTA Button */}
              <Link
                to="/contact"
                className="ml-4 px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Get Quote
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setMobileProductsOpen(false); // Reset products dropdown when closing menu
              }}
              className="md:hidden relative w-10 h-10 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - WITH COLLAPSIBLE PRODUCTS DROPDOWN */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-4 space-y-1">
                <NavLink
                  to="/"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileProductsOpen(false);
                  }}
                  className={({ isActive }) => `
                    block px-4 py-3 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/about"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileProductsOpen(false);
                  }}
                  className={({ isActive }) => `
                    block px-4 py-3 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  About Us
                </NavLink>

                {/* Products section with collapsible dropdown - MOBILE */}
                <div className="space-y-1">
                  {/* Products header - clickable to toggle dropdown */}
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    <span className="font-medium">Products</span>
                    <motion.div
                      animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/* Mobile subcategories - dropdown content */}
                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-6 space-y-1 overflow-hidden"
                      >
                        {/* Direct link to all products */}
                        <NavLink
                          to="/products"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileProductsOpen(false);
                          }}
                          className={({ isActive }) => `
                            block px-4 py-2 text-sm rounded-lg transition-all
                            ${
                              isActive
                                ? "bg-green-50 text-green-700 font-semibold"
                                : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                            }
                          `}
                        >
                          🛍️ All Products
                        </NavLink>

                        {/* Category links */}
                        {productCategories.map((category, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileProductsOpen(false);
                              setTimeout(() => {
                                scrollToCategory(category.id);
                              }, 300);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <NavLink
                  to="/contact"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileProductsOpen(false);
                  }}
                  className={({ isActive }) => `
                    block px-4 py-3 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  Contact
                </NavLink>

                {/* Mobile CTA */}
                <Link
                  to="/contact"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileProductsOpen(false);
                  }}
                  className="block mt-4 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center font-semibold rounded-xl"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-16 md:h-[72px]" />
    </>
  );
}
