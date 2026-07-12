import { useEffect, useState } from "react";

import BannerSlider from "../../Components/User/BannerSlider";
import QuickBooking from "../../Components/User/QuickBooking";
import MovieSection from "../../Components/User/MovieSection";
import PromotionBanner from "../../Components/User/PromotionBanner";
import NewsSection from "../../Components/User/NewsSection";
import GlobalLoading from "../../Components/Common/GlobalLoading";

import { MdLocalMovies } from "react-icons/md";

export default function HomePage() {
  const [nowShowing, setNowShowing] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
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

      const movies = data?.data || [];

      // Đang chiếu
      setNowShowing(movies.filter((movie) => movie.showing === true));

      // Sắp chiếu
      setComingSoon(movies.filter((movie) => movie.showing === false));
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

      <QuickBooking />

      <MovieSection
        title="Phim đang chiếu"
        icon={<MdLocalMovies size={28} className="text-[#AA7D36]" />}
        movies={nowShowing}
      />

      <PromotionBanner />

      <MovieSection
        title="Phim sắp chiếu"
        icon={<MdLocalMovies size={28} className="text-[#AA7D36]" />}
        movies={comingSoon}
      />

      <NewsSection />

      {loading && (
        <GlobalLoading open={loading} text="Đang tải danh sách phim..." />
      )}
    </main>
  );
}
