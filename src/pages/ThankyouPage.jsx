import { CheckCircle, Phone, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ThankyouPage() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center px-6 pt-20 pb-12 text-center">
      {/* Success Icon */}
      <div className="bg-green-100 p-6 rounded-full shadow-lg mb-6 animate-bounce">
        <CheckCircle className="text-green-700" size={60} />
      </div>

      {/* Main Message */}
      <h1 className="text-4xl md:text-5xl font-black text-green-900 mb-4">
        Thank You!
      </h1>

      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
        Your message has been successfully sent to
        <span className="font-semibold text-green-800">
          {" "}
          Economy Farm Products (K) Ltd
        </span>
        . Our team will get back to you shortly.
      </p>

      {/* What Happens Next */}
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full mb-8 border">
        <h2 className="text-xl font-bold text-green-900 mb-4">
          What Happens Next?
        </h2>
        <ul className="text-gray-600 space-y-2 text-left">
          <li>✔ Our sales team reviews your message.</li>
          <li>✔ We respond within 24 working hours.</li>
          <li>✔ We provide product details or quotations if requested.</li>
        </ul>
      </div>

      {/* Back Home */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-green-700 font-semibold hover:underline"
      >
        <ArrowLeft size={16} />
        Return to Homepage
      </Link>
    </div>
  );
}
