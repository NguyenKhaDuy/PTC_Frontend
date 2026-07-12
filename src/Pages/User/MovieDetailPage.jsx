import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieBanner from "../../Components/User/MovieBanner";
import MovieInfo from "../../Components/User/MovieInfo";
import TrailerSection from "../../Components/User/TrailerSection";
import ShowtimeSection from "../../Components/User/ShowtimeSection";
import MovieDescription from "../../Components/User/MovieDescription";
import CastSection from "../../Components/User/CastSection";
import ReviewSection from "../../Components/User/ReviewSection";
import GlobalLoading from "../../Components/Common/GlobalLoading";

export default function MovieDetailPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // ===== FETCH DETAIL =====
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:3000/api/movie/id-movie=${id}`,
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data?.message);

        setMovie(data?.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieDetail();
  }, [id]);

  if (!movie) {
    return <GlobalLoading open={true} text="Đang tải dữ liệu..." />;
  }

  // ===== DECODE IMAGE BASE64 =====
  // const decodeImage = (base64) =>
  //   base64 ? `data:image/jpeg;base64,${base64}` : null;

  // const showtimesData = {};

  // const provinces = Object.keys(showtimesData);

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen">
      <MovieBanner movie={movie} />

      <div className="max-w-7xl mx-auto px-5 -mt-64 relative z-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <MovieInfo movie={movie} />
        </div>

        <TrailerSection trailer={movie.trailer} />

        <MovieDescription movie={movie} />

        <CastSection casts={movie.movieActorDTOS} />

        <ReviewSection reviews={movie.ratingDTOS || []} />

        {/* SHOWTIME */}
        <ShowtimeSection
          schedules={movie.scheduleDTOS}
          selectedSchedule={selectedSchedule}
          setSelectedSchedule={setSelectedSchedule}
        />
      </div>
    </div>
  );
}
