import { useNavigate } from "react-router-dom";
import logo from "../../assets/CMC_LOGO.png";
import GlobalLoading from "../../Components/Common/GlobalLoading"
import { useState } from "react";

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
      <div className="overflow-hidden bg-black">
        <img
          src={imageSrc}
          alt={item.nameMovie}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
          className="w-full h-[420px] object-cover group-hover:scale-110 duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-xl font-bold line-clamp-1">{item.nameMovie}</h3>

        <p className="text-gray-400 mt-2">
          {item.category} • {item.duration} phút
        </p>

        <p className="text-gray-500 text-sm mt-1">
          {item.language} • {item.rated}
        </p>

        <button
          onClick={handleBooking}
          className="mt-6 w-full bg-[#AA7D36] hover:bg-[#8f6424] rounded-xl py-3 font-semibold transition"
        >
          Đặt vé
        </button>
      </div>
      {loading && <GlobalLoading open={loading} text="Đang xử lí...." />}
    </div>
  );
}
