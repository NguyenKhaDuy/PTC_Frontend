import { useNavigate } from "react-router-dom";

export default function ShowtimeMovieCard({ schedule }) {
  const navigate = useNavigate();
  const movie = schedule.movieDTO;

  const image = movie?.smallImage
    ? `data:image/jpeg;base64,${movie.smallImage}`
    : "https://picsum.photos/300/420";

  const formatTime = (arr) => {
    if (!arr) return "";
    return `${String(arr[0]).padStart(2, "0")}:${String(arr[1]).padStart(
      2,
      "0",
    )}`;
  };

  const formatDate = (arr) => {
    if (!arr) return "";
    return `${arr[2]}/${arr[1]}/${arr[0]}`;
  };

  return (
    <div className="group bg-[#141414] border border-[#2a2a2a] rounded-3xl overflow-hidden hover:border-[#AA7D36] transition-all shadow-lg">
      <div className="flex flex-col md:flex-row gap-5 p-5">
        {/* POSTER */}
        <div className="relative w-full md:w-[140px]">
          <img
            src={image}
            className="w-full h-[200px] md:h-[190px] object-cover rounded-2xl"
          />

          {/* BADGE */}
          <div className="absolute top-2 left-2 bg-[#AA7D36] text-black text-xs px-2 py-1 rounded-lg font-semibold">
            {movie?.rated || "P"}
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1">
          <h2 className="text-xl font-bold group-hover:text-[#AA7D36] transition">
            {movie?.nameMovie}
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            {movie?.category} • {movie?.duration} phút • {movie?.language}
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-500 text-xs mt-2 line-clamp-2">
            {movie?.shortDescription}
          </p>

          {/* META */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-300">
            <div>
              <span className="text-gray-500">Ngày:</span>{" "}
              {formatDate(schedule.date)}
            </div>
          </div>

          {/* TIME BUTTONS */}
          <div className="mt-4 flex flex-wrap gap-2">
            {schedule.timeStart && (
              <button className="px-3 py-1 rounded-lg bg-[#1c1c1c] hover:bg-[#AA7D36] transition text-sm">
                {formatTime(schedule.timeStart)}
              </button>
            )}

            {schedule.timeEnd && (
              <button className="px-3 py-1 rounded-lg bg-[#1c1c1c] hover:bg-[#333] transition text-sm">
                {formatTime(schedule.timeEnd)}
              </button>
            )}
          </div>

          {/* ACTION */}
          <div className="mt-5 flex justify-between items-center">
            <button className="text-sm text-gray-400 hover:text-[#AA7D36] transition">
              Chi tiết phim
            </button>

            <button
              onClick={() => navigate(`/booking/${movie.idMovie}`)}
              className="bg-[#AA7D36] hover:bg-[#8f6424] text-black font-semibold px-5 py-2 rounded-xl transition"
            >
              Đặt vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
