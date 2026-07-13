import { useEffect, useState } from "react";

import BannerSlider from "../../Components/User/BannerSlider";
import FeatureSection from "../../Components/User/FeatureSection";
import MovieSection from "../../Components/User/MovieSection";
import PromotionBanner from "../../Components/User/PromotionBanner";
import NewsSection from "../../Components/User/NewsSection";
import GlobalLoading from "../../Components/Common/GlobalLoading";

import { MdLocalMovies } from "react-icons/md";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:3000/api/movie?page=1&size=100",
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Lỗi tải danh sách phim");
      }

      const movieList = data?.data || [];

      const showingMovies = movieList.filter((movie) => movie.showing);
      const comingSoonMovies = movieList.filter((movie) => !movie.showing);

      // Ưu tiên phim đang chiếu, nếu chưa đủ 4 thì lấy thêm phim sắp chiếu
      const homeMovies = [...showingMovies, ...comingSoonMovies].slice(0, 4);

      setMovies(homeMovies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className="bg-[#0B0B0B] text-white min-h-screen">
      <BannerSlider />

      <FeatureSection />

      <MovieSection
        title="Phim nổi bật"
        icon={<MdLocalMovies size={28} className="text-[#AA7D36]" />}
        movies={movies}
        showViewAll
      />

      <PromotionBanner />

      <NewsSection />

      {loading && (
        <GlobalLoading open={loading} text="Đang tải danh sách phim..." />
      )}
    </main>
  );
}
