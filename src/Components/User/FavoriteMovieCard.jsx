import { Heart, Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FavoriteMovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#181818] rounded-2xl overflow-hidden border border-[#262626] hover:border-[#AA7D36] transition">
      <div className="flex">
        <img
          src={`data:image/png;base64,${movie.smallImage}`}
          className="w-44 h-64 object-cover"
        />

        <div className="flex-1 p-6 flex flex-col">
          <h2 className="text-2xl font-bold">{movie.nameMovie}</h2>

          <div className="flex gap-5 mt-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
              {movie.rating}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              {movie.duration} phút
            </div>
          </div>

          <p className="mt-5 text-gray-400 line-clamp-3">{movie.description}</p>

          <div className="mt-auto flex gap-3">
            <button
              onClick={() => navigate(`/movie/${movie.idMovie}`)}
              className="flex-1 py-3 rounded-xl bg-[#AA7D36]"
            >
              Xem chi tiết
            </button>

            <button className="w-12 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition">
              <Heart size={20} className="fill-current mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
