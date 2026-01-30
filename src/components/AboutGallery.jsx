import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Users,
  ZoomIn,
  CheckCircle2,
  Settings,
  Factory,
  Egg
} from "lucide-react";

const images = [
  {
    src: "/images/healthy-chicken.webp",
    title: "Healthy Layer Flocks",
    description:
      "Well-nourished laying hens supported by balanced, farm-tested feed formulations.",
    icon: <CheckCircle2 size={24} />,
  },
  {
    src: "/images/control-room.webp",
    title: "Production Control Center",
    description:
      "Centralized monitoring systems that ensure precision, consistency, and safety in feed processing.",
    icon: <Settings size={24} />,
  },
  {
    src: "/images/supporting farmers.jpeg",
    title: "Farmer Training & Support",
    description:
      "Hands-on guidance and education to help farmers maximize productivity and sustainability.",
    icon: <Users size={24} />,
  },
  {
    src: "/images/facility-image.webp",
    title: "Modern Feed Manufacturing",
    description:
      "Automated mixing and processing equipment designed for accuracy, hygiene, and efficiency.",
    icon: <Factory size={24} />,
  },
  {
    src: "/images/trusted feeds.jpeg",
    title: "Proven Farm Results",
    description:
      "Quality feed in action — healthy birds, strong egg production, and visible results on the farm.",
    icon: <Egg size={24} />,
  },
];


export default function AboutGallery() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 },
    );

    sectionRef.current && observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="py-24 px-4 ">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm mb-6">
            <Camera size={18} />
            Our Facility
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600 mb-6">
            Inside Our World
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A glimpse into our people, processes, and passion for quality animal
            nutrition.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedImage(img)}
              className={`relative cursor-pointer overflow-hidden rounded-2xl shadow-xl group
                ${i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}`}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-base sm:text-lg md:text-xl font-bold leading-snug">
                  {img.title}
                </h3>

                <p className="text-xs sm:text-sm md:text-sm opacity-90 leading-relaxed">
                  {img.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 bg-white/20 p-3 rounded-full opacity-0 group-hover:opacity-100">
                <ZoomIn className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            className="max-h-[90vh] rounded-xl"
          />
        </div>
      )}
    </>
  );
}
