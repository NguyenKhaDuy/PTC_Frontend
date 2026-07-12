import { useNavigate } from "react-router-dom";

export default function MovieInfo({ movie }) {
  const navigate = useNavigate();

  const decodeImage = (base64) => {
    if (!base64) return "https://via.placeholder.com/400x600";
    return `data:image/jpeg;base64,${base64}`;
  };

  const formatDate = (arr) => {
    if (!arr) return "";
    const [y, m, d] = arr;
    return `${d}/${m}/${y}`;
  };

  return (
    <>
      {/* POSTER */}
      <div>
        <img
          src={decodeImage(movie.smallImage)}
          alt={movie.nameMovie}
          className="rounded-2xl shadow-2xl w-full"
        />
      </div>

      {/* INFO */}
      <div className="lg:col-span-2">
        {/* STATUS */}
        <span
          className={`px-4 py-1 rounded-full text-sm ${
            movie.showing ? "bg-[#AA7D36]" : "bg-gray-600"
          }`}
        >
          {movie.showing ? "Đang chiếu" : "Sắp chiếu"}
        </span>

        {/* TITLE */}
        <h1 className="text-5xl font-bold mt-5">{movie.nameMovie}</h1>

        {/* CATEGORY */}
        <p className="text-gray-400 mt-4">{movie.category}</p>

        {/* META */}
        <div className="flex gap-8 mt-8">
          <div>
            <p className="text-gray-500">Thời lượng</p>
            <h3>{movie.duration} phút</h3>
          </div>

          <div>
            <p className="text-gray-500">Khởi chiếu</p>
            <h3>{formatDate(movie.releaseDate)}</h3>
          </div>

          <div>
            <p className="text-gray-500">Độ tuổi</p>
            <h3>{movie.rated}</h3>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-8 text-gray-300 leading-8">{movie.shortDescription}</p>

        {/* BUTTONS */}
        <div className="flex gap-5 mt-10">
          <button
            onClick={() => navigate(`/booking/${movie.idMovie}`)}
            className="bg-[#AA7D36] hover:bg-[#8f6424] px-8 py-4 rounded-xl font-semibold"
          >
            Đặt vé ngay
          </button>

          <button className="border border-[#AA7D36] hover:bg-[#AA7D36] px-8 py-4 rounded-xl">
            ❤️ Yêu thích
          </button>
        </div>
      </div>
    </>
  );
}
