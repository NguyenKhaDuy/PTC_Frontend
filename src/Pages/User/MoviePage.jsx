import SearchBar from "../../Components/User/SearchBar";
import CategoryFilter from "../../Components/User/CategoryFilter";
import MovieSection from "../../Components/User/MovieSection";
import { MdLocalMovies } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
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

      const res = await fetch(
        `http://localhost:3000/api/movie?page=${pageNumber}`,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Lỗi tải danh sách phim");
      }

      setMovies(data?.data || []);
      setTotalPage(data?.total_page || 1);
      setPage(data?.current_page || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const filteredMovies = useMemo(() => {
    const list =
      selectedCategory === "all"
        ? movies
        : movies.filter((m) => m.idCategory === selectedCategory);

    // Đang chiếu trước, sắp chiếu sau
    return [...list].sort((a, b) => {
      if (a.showing === b.showing) return 0;
      return a.showing ? -1 : 1;
    });
  }, [movies, selectedCategory]);

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="relative overflow-hidden rounded-3xl border border-[#AA7D36]/20 bg-gradient-to-r from-[#161616] via-[#1b1b1b] to-[#101010] px-10 py-14">
          {/* Glow */}
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#AA7D36]/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#AA7D36]/40 bg-[#AA7D36]/10 px-4 py-2 text-sm font-medium text-[#AA7D36]">
                <MdLocalMovies size={18} />
                Movie Collection
              </span>

              <h1 className="mt-5 text-5xl font-extrabold leading-tight">
                Khám phá những
                <span className="block text-[#AA7D36]">
                  bộ phim hấp dẫn nhất
                </span>
              </h1>

              <p className="mt-5 text-lg leading-8 text-gray-400">
                Cập nhật liên tục các bộ phim đang chiếu và sắp chiếu với chất
                lượng hình ảnh, âm thanh và trải nghiệm điện ảnh tốt nhất.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl border border-[#AA7D36]/20 bg-black/30 px-8 py-6 text-center backdrop-blur">
                <h2 className="text-4xl font-bold text-[#AA7D36]">
                  {movies.length}
                </h2>
                <p className="mt-2 text-sm text-gray-400">Phim trang này</p>
              </div>

              <div className="rounded-2xl border border-[#AA7D36]/20 bg-black/30 px-8 py-6 text-center backdrop-blur">
                <h2 className="text-4xl font-bold text-green-500">
                  {movies.filter((m) => m.showing).length}
                </h2>
                <p className="mt-2 text-sm text-gray-400">Đang chiếu</p>
              </div>

              <div className="rounded-2xl border border-[#AA7D36]/20 bg-black/30 px-8 py-6 text-center backdrop-blur">
                <h2 className="text-4xl font-bold text-red-500">
                  {movies.filter((m) => !m.showing).length}
                </h2>
                <p className="mt-2 text-sm text-gray-400">Sắp chiếu</p>
              </div>

              <div className="rounded-2xl border border-[#AA7D36]/20 bg-black/30 px-8 py-6 text-center backdrop-blur">
                <h2 className="text-4xl font-bold text-sky-400">{totalPage}</h2>
                <p className="mt-2 text-sm text-gray-400">Trang</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <SearchBar />
        </div>

        <div className="mt-8">
          <CategoryFilter onSelect={setSelectedCategory} />
        </div>

        <MovieSection
          title="Danh sách phim"
          icon={<MdLocalMovies size={28} className="text-[#AA7D36]" />}
          movies={filteredMovies}
          showViewAll={false}
        />

        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPage }, (_, i) => (
            <button
              key={i}
              onClick={() => fetchMovies(i + 1)}
              className={`px-4 py-2 rounded transition ${
                page === i + 1
                  ? "bg-[#AA7D36] text-white"
                  : "bg-[#1d1d1d] hover:bg-[#AA7D36]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </div>
  );
}
