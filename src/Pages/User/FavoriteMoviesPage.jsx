import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import FavoriteMovieCard from "../../Components/User/FavoriteMovieCard";
import GlobalLoading from "../../Components/Common/GlobalLoading";

export default function FavoriteMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // gọi API sau
    // fetchFavoriteMovies();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="max-w-7xl mx-auto py-12 px-5">
        <div className="flex items-center gap-3 mb-10">
          <Heart size={34} className="fill-red-500 text-red-500" />

          <h1 className="text-4xl font-bold">Phim yêu thích</h1>
        </div>

        {movies.length === 0 ? (
          <div className="text-center py-28">
            <Heart size={90} className="mx-auto text-gray-700" />

            <h2 className="mt-6 text-2xl font-bold">Chưa có phim yêu thích</h2>

            <p className="text-gray-500 mt-2">
              Hãy thêm những bộ phim bạn thích để xem lại nhanh hơn.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {movies.map((movie) => (
              <FavoriteMovieCard key={movie.idMovie} movie={movie} />
            ))}
          </div>
        )}
      </div>

      <GlobalLoading open={loading} text="Đang tải..." />
    </div>
  );
}
