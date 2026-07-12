import { useEffect, useState } from "react";
import { Ticket, Clapperboard } from "lucide-react";

const banners = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80&auto=format&fit=crop",
    title: "Avengers: Secret Wars",
    description: "Bom tấn siêu anh hùng 2026",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&q=80&auto=format&fit=crop",
    title: "Mission Impossible",
    description: "Khởi chiếu toàn quốc",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1600&q=80&auto=format&fit=crop",
    title: "Ưu đãi thành viên",
    description: "Giảm đến 30% khi đặt vé online",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl">
      {/* SLIDES */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`
            absolute inset-0
            transition-all duration-1000 ease-in-out
            ${current === index ? "opacity-100 scale-105" : "opacity-0 scale-100"}
          `}
        >
          {/* IMAGE */}
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-10 text-white">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl max-w-xl">
                <p className="text-sm text-red-400 font-medium tracking-wider flex items-center gap-2">
                  <Clapperboard size={16} />
                  NOW SHOWING
                </p>

                <h2 className="text-4xl md:text-5xl font-bold mt-2">
                  {banner.title}
                </h2>

                <p className="mt-3 text-gray-200">{banner.description}</p>

                <button
                  className="
    mt-6
    px-6 py-3
    bg-[#AA7D36]
    hover:bg-[#c08a3d]
    text-white
    rounded-xl
    font-medium
    shadow-lg shadow-[#AA7D36]/30
    hover:scale-105
    transition
    flex items-center gap-2
  "
                >
                  <Ticket size={18} />
                  Đặt vé ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* DOT NAVIGATION */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              transition-all duration-300
              rounded-full
              ${
                current === index
                  ? "w-8 h-2 bg-red-500"
                  : "w-2 h-2 bg-white/60 hover:bg-white"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
