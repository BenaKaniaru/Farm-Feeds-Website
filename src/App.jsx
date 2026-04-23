import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ThankyouPage from "./pages/ThankyouPage";

// ScrollToTop component - automatically scrolls to top on page change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Instant scroll, no animation
  }, [pathname]); // Runs every time the route/path changes

  return null;
}

function App() {
  return (
    <div>
      <Header />
      <ScrollToTop /> {/* Add this - it handles auto-scrolling */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/dairy" element={<Products />} />
        <Route path="/products/poultry" element={<Products />} />
        <Route path="/products/pig" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankyouPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;