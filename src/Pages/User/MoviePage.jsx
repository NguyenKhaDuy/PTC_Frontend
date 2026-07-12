import SearchBar from "../../Components/User/SearchBar";
import CategoryFilter from "../../Components/User/CategoryFilter";
import MovieSection from "../../Components/User/MovieSection";
import { MdLocalMovies } from "react-icons/md";
import { FaFilm } from "react-icons/fa";
import { useEffect, useState } from "react";
import GlobalLoading from "../../Components/Common/GlobalLoading";

export default function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const url = `http://localhost:3000/api/movie?page=${pageNumber}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message);

      setMovies(data?.data || []);
      setTotalPage(data?.total_page || 1);
      setPage(data?.current_page || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchMovies(1, selectedCategory);
  }, [selectedCategory]);

  const filteredMovies =
    selectedCategory === "all"
      ? movies
      : movies.filter((m) => m.idCategory === selectedCategory);

  const nowShowing = filteredMovies.filter((m) => m.showing === true);
  const comingSoon = filteredMovies.filter((m) => m.showing === false);

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* SEARCH */}
        <div className="mt-12">
          <SearchBar />
        </div>

        {/* CATEGORY */}
        <div className="mt-8">
          <CategoryFilter onSelect={setSelectedCategory} />
        </div>

        {/* NOW SHOWING */}
        <MovieSection
          title="Phim đang chiếu"
          icon={<MdLocalMovies size={28} className="text-[#AA7D36]" />}
          movies={nowShowing}
        />

        {/* COMING SOON */}
        <MovieSection
          title="Phim sắp chiếu"
          icon={<FaFilm size={28} className="text-[#AA7D36]" />}
          movies={comingSoon}
        />

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPage }, (_, i) => (
            <button
              key={i}
              onClick={() => fetchMovies(i + 1, selectedCategory)}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? "bg-[#AA7D36]"
                  : "bg-[#1d1d1d] hover:bg-[#AA7D36]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {loading && <GlobalLoading open={loading} text={"Đang xử lý..."} /> }
    </div>
  );
}
