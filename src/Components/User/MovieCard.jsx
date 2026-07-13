import { useNavigate } from "react-router-dom";
import logo from "../../assets/PTC_LOGO.png";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useState } from "react";
import { HiOutlineClock, HiOutlineLanguage } from "react-icons/hi2";
import { MdOutlineLocalMovies } from "react-icons/md";

const DEFAULT_IMAGE = logo;

function decodeBase64Image(base64) {
  if (!base64 || typeof base64 !== "string") return null;

  try {
    return `data:image/jpeg;base64,${base64}`;
  } catch {
    return null;
  }
}

export default function MovieCard({ item }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const imageSrc = decodeBase64Image(item.smallImage) ?? DEFAULT_IMAGE;

  const handleBooking = (e) => {
    e.stopPropagation();

    if (!item.showing) {
      navigate(`/movie/${item.idMovie}`);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    navigate(`/booking/${item.idMovie}`);
  };

  return (
    <div
      onClick={() => navigate(`/movie/${item.idMovie}`)}
      className="cursor-pointer group rounded-2xl overflow-hidden bg-[#151515] border border-[#AA7D36]/20 hover:border-[#AA7D36] transition"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden bg-black">
        {!item.showing && (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-red-600 px-4 py-1 text-sm font-bold text-white shadow-lg">
            Sắp chiếu
          </span>
        )}

        <img
          src={imageSrc}
          alt={item.nameMovie}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
          className="w-full h-[420px] object-cover duration-500 group-hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="flex h-[220px] flex-col p-5">
        {/* Tên phim */}
        <h3
          className="truncate text-xl font-bold text-white"
          title={item.nameMovie}
        >
          {item.nameMovie}
        </h3>

        {/* Thông tin */}
        <div className="mt-4 space-y-3 flex-1">
          <div className="flex items-center gap-2 text-gray-300">
            <MdOutlineLocalMovies
              className="text-[#AA7D36] shrink-0"
              size={18}
            />

            <p className="truncate text-sm" title={item.category}>
              {item.category}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#232323] px-3 py-1 text-xs text-gray-300">
              <HiOutlineClock className="text-[#AA7D36]" />
              {item.duration} phút
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-[#232323] px-3 py-1 text-xs text-gray-300">
              <HiOutlineLanguage className="text-[#AA7D36]" />
              {item.language}
            </span>

            <span className="rounded-full bg-red-600/15 px-3 py-1 text-xs font-semibold text-red-400">
              {item.rated}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleBooking}
          className="mt-5 w-full rounded-xl bg-[#AA7D36] py-3 font-semibold transition hover:bg-[#8f6424]"
        >
          {item.showing ? "Đặt vé" : "Xem chi tiết"}
        </button>
      </div>
      {loading && <GlobalLoading open={loading} text="Đang xử lí...." />}
    </div>
  );
}
