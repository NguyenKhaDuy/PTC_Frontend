import { useEffect, useState } from "react";
import { Calendar, MapPin, Star, Ticket, Clock } from "lucide-react";
import { useToast } from "../../Components/Common/ToastProvider";
import GlobalLoading from "../Common/GlobalLoading";

export default function HistoryTab({ history = [], setSelectedTicket }) {
  const [historyData, setHistoryData] = useState([]);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!history) return;

    const mapped = history.map((b) => {
      const schedule = b.scheduleDTO;
      const movie = schedule?.movieDTO;

      const seats = b.ticketDTO?.seatDTOS || [];

      const date = schedule?.date
        ? `${String(schedule.date[2]).padStart(2, "0")}/${String(
            schedule.date[1],
          ).padStart(2, "0")}/${schedule.date[0]}`
        : "";

      const start = schedule?.timeStart
        ? `${String(schedule.timeStart[0]).padStart(2, "0")}:${String(
            schedule.timeStart[1],
          ).padStart(2, "0")}`
        : "";

      return {
        ...b,
        id: b.idBill,
        movie: movie?.nameMovie || "Không có tên phim",
        poster: movie?.smallImage
          ? `data:image/png;base64,${movie.smallImage}`
          : "",
        cinema: b.branchDTO?.nameBranch || "",
        room: seats[0]?.nameRoom || "",
        seats: seats.map((s) => s.name).join(", "),
        time: `${date} ${start}`,
        total: b.totalAmount,
        status: b.status,

        rating: 0,
        comment: "",

        // đã đánh giá hay chưa
        reviewed: b.status === "RATED",

        // có được phép đánh giá không
        canReview: b.status === "USED",
      };
    });

    setHistoryData(mapped);
  }, [history]);

  const handleRating = (movieId, star) => {
    setHistoryData((prev) =>
      prev.map((item) =>
        item.id === movieId ? { ...item, rating: star } : item,
      ),
    );
  };

  const handleComment = (movieId, comment) => {
    setHistoryData((prev) =>
      prev.map((item) =>
        item.id === movieId
          ? { ...item, comment: comment.slice(0, 300) }
          : item,
      ),
    );
  };

  const handleSubmitReview = async (billId) => {
    const movie = historyData.find((i) => i.id === billId);

    if (!movie.rating) {
      showToast("Vui lòng chọn số sao.", "error");
      return;
    }

    if (!movie.comment.trim()) {
      showToast("Vui lòng nhập nhận xét.", "error");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        star: movie.rating,
        comment: movie.comment,
        movieId: movie.scheduleDTO.movieDTO.idMovie,
        userId: user.id_user,
        billId: billId
      };

      setLoading(true);

      const res = await fetch("http://localhost:3000/api/customer/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Đánh giá thất bại");
      }

      setHistoryData((prev) =>
        prev.map((item) =>
          item.id === billId ? { ...item, reviewed: true } : item,
        ),
      );

      showToast(result.message || "Đánh giá thành công!", "success");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {historyData.map((item) => (
        <div
          key={item.id}
          className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-5"
        >
          <div className="flex flex-col md:flex-row gap-5">
            <img
              src={item.poster || "https://via.placeholder.com/120x180"}
              className="w-32 h-44 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">{item.movie}</h2>

              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <MapPin size={16} />
                  {item.cinema}
                </p>

                <p className="flex items-center gap-2">
                  <Ticket size={16} />
                  {item.room} • Ghế {item.seats}
                </p>

                <p className="flex items-center gap-2">
                  <Clock size={16} />
                  {item.time}
                </p>

                <p className="flex items-center gap-2">
                  <Calendar size={16} />
                  Mã vé: {item.id}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <span className="text-[#AA7D36] text-xl font-bold">
                  {item.total?.toLocaleString()}đ
                </span>

                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                  {item.status}
                </span>
              </div>

              {item.reviewed ? (
                <div className="mt-6 bg-[#202020] border border-green-500/30 rounded-2xl p-5">
                  <div className="text-green-400 font-semibold text-lg">
                    ✓ Bạn đã đánh giá phim này
                  </div>

                  <p className="text-gray-400 mt-2">
                    Cảm ơn bạn đã gửi đánh giá.
                  </p>
                </div>
              ) : item.canReview ? (
                <div className="mt-6 bg-[#202020] border border-[#2d2d2d] rounded-2xl p-5">
                  <p className="font-semibold mb-4">Đánh giá phim</p>

                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() =>
                          !item.reviewed && handleRating(item.id, star)
                        }
                        disabled={item.reviewed}
                      >
                        <Star
                          size={28}
                          className={
                            star <= item.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-500"
                          }
                        />
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={4}
                    disabled={item.reviewed}
                    value={item.comment || ""}
                    onChange={(e) => handleComment(item.id, e.target.value)}
                    className="w-full rounded-xl bg-[#151515] border border-[#333] p-4"
                  />

                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {(item.comment || "").length}/300 ký tự
                    </span>

                    {item.reviewed ? (
                      <span className="px-4 py-2 rounded-xl bg-green-500/20 text-green-400">
                        ✓ Đã đánh giá
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSubmitReview(item.id)}
                        className="px-5 py-2 rounded-xl bg-[#AA7D36]"
                      >
                        Gửi đánh giá
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-6 bg-[#202020] border border-yellow-500/30 rounded-2xl p-5">
                  <p className="text-yellow-400 font-semibold">
                    Bạn chỉ có thể đánh giá sau khi xem phim.
                  </p>
                </div>
              )}
            </div>

            {/* ACTION (GIỮ NGUYÊN UI) */}
            <div className="flex flex-col justify-between">
              <button
                onClick={() => setSelectedTicket(item)}
                className="px-5 py-3 rounded-xl bg-[#AA7D36]"
              >
                Xem chi tiết vé
              </button>
            </div>
          </div>
        </div>
      ))}
      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </div>
  );
}
