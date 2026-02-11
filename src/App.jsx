import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ThankyouPage from "./pages/ThankyouPage";

function App() {
  return (
    <div>
      <Header />
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
