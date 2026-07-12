import { X, Star, PlayCircle, CalendarDays, Clock } from "lucide-react";

export default function MovieDetailModal({ open, movie, onClose }) {
  if (!open || !movie) return null;

  const formatDate = (date) => {
    if (!date) return "";
    return `${String(date[2]).padStart(2, "0")}/${String(date[1]).padStart(
      2,
      "0",
    )}/${date[0]}`;
  };

  const formatTime = (time) => {
    if (!time) return "";
    return `${String(time[0]).padStart(2, "0")}:${String(time[1]).padStart(
      2,
      "0",
    )}`;
  };

  const actors = movie.movieActorDTOS?.filter((item) => item.idActor);

  const ratings = movie.ratingDTOS?.filter((item) => item.idRating);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-5">
      <div className="bg-[#181818] w-full max-w-6xl rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#202020] flex justify-between items-center px-6 py-4 border-b border-[#333]">
          <h2 className="text-2xl font-bold">Chi tiết phim</h2>

          <button onClick={onClose} className="hover:text-red-400">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Thông tin chính */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <img
                src={
                  movie.smallImage
                    ? `data:image/jpeg;base64,${movie.smallImage}`
                    : "https://picsum.photos/350/500"
                }
                className="rounded-2xl w-full shadow-lg"
              />
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-4xl font-bold">{movie.nameMovie}</h1>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">Đạo diễn</span>
                  <p>{movie.director}</p>
                </div>

                <div>
                  <span className="text-gray-400">Thể loại</span>
                  <p>{movie.category}</p>
                </div>

                <div>
                  <span className="text-gray-400">Thời lượng</span>
                  <p>{movie.duration} phút</p>
                </div>

                <div>
                  <span className="text-gray-400">Ngôn ngữ</span>
                  <p>{movie.language}</p>
                </div>

                <div>
                  <span className="text-gray-400">Rated</span>
                  <p>{movie.rated}</p>
                </div>

                <div>
                  <span className="text-gray-400">Khởi chiếu</span>
                  <p>{formatDate(movie.releaseDate)}</p>
                </div>

                <div>
                  <span className="text-gray-400">Trạng thái</span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      movie.showing
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {movie.showing ? "Đang chiếu" : "Sắp chiếu"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Mô tả</h3>

                <div className="bg-[#222] rounded-xl p-4 leading-7 text-gray-300">
                  {movie.shortDescription}
                </div>
              </div>

              <a
                href={movie.trailer}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition"
              >
                <PlayCircle size={20} />
                Xem Trailer
              </a>
            </div>
          </div>

          {/* Diễn viên */}

          <div>
            <h3 className="text-2xl font-bold mb-5">Diễn viên</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {actors?.map((actor) => (
                <div key={actor.idActor} className="bg-[#222] rounded-xl p-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3">
                    <img
                      src={
                        actor.image
                          ? `data:image/jpeg;base64,${actor.image}`
                          : "https://picsum.photos/120"
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4 className="font-semibold text-center">{actor.name}</h4>

                  <p className="text-gray-400 text-sm mt-2 text-center">
                    {actor.description}
                  </p>

                  {actor._main && (
                    <div className="text-center mt-3">
                      <span className="bg-yellow-600 px-3 py-1 rounded-full text-xs">
                        Vai chính
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Đánh giá */}

          <div>
            <h3 className="text-2xl font-bold mb-5">Đánh giá</h3>

            <div className="space-y-4">
              {ratings?.map((item) => (
                <div key={item.idRating} className="bg-[#222] rounded-xl p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold">{item.nameUser}</h4>

                      <p className="text-gray-400 mt-2">{item.comment}</p>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: item.star }).map((_, i) => (
                        <Star key={i} fill="currentColor" size={18} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lịch chiếu */}

          <div>
            <h3 className="text-2xl font-bold mb-5">Lịch chiếu</h3>

            <div className="space-y-4">
              {movie.scheduleDTOS?.map((schedule) => (
                <div
                  key={schedule.idSchedule}
                  className="bg-[#222] rounded-xl p-5 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">
                      {schedule.roomDTO.branchDTO.nameBranch}
                    </p>

                    <p className="text-gray-400">{schedule.roomDTO.name}</p>

                    <p className="text-sm text-gray-500">
                      {schedule.roomDTO.branchDTO.address}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="flex items-center gap-2 justify-end">
                      <CalendarDays size={18} />
                      {formatDate(schedule.date)}
                    </p>

                    <p className="flex items-center gap-2 justify-end mt-2">
                      <Clock size={18} />
                      {formatTime(schedule.timeStart)} -{" "}
                      {formatTime(schedule.timeEnd)}
                    </p>

                    <p className="mt-2 text-yellow-400 font-semibold">
                      {schedule.basePrice.toLocaleString()} VNĐ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
