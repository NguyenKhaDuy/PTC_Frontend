import {
  X,
  MonitorPlay,
  Building2,
  Armchair,
  MapPin,
  Phone,
  Calendar,
  Clock,
  Ticket,
} from "lucide-react";

export default function RoomDetailModal({ open, room, onClose }) {
  if (!open || !room) return null;

  const formatDate = (date) => {
    if (!date) return "-";
    if (Array.isArray(date)) {
      const [y, m, d] = date;
      return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
    }
    return date;
  };

  const formatTime = (time) => {
    if (!time) return "-";
    if (Array.isArray(time)) {
      const [h, m] = time;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }
    return time;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      style={{ margin: 0 }}
    >
      <div className="bg-[#181818] border border-[#2d2d2d] rounded-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#2d2d2d] sticky top-0 bg-[#181818]">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Chi tiết phòng chiếu
            </h2>

            <p className="text-gray-400 mt-1">ID #{room.idRoom}</p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-[#2a2a2a] flex items-center justify-center"
          >
            <X />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* INFO */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#202020] rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <MonitorPlay className="text-[#AA7D36]" />
                Thông tin phòng
              </h3>

              <div className="flex justify-between">
                <span className="text-gray-400">Tên phòng</span>
                <span>{room.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Sức chứa</span>
                <span>{room.capacity} ghế</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Diện tích</span>
                <span>{room.totalArea} m²</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Lịch chiếu</span>
                <span>{room.scheduleDTOS?.length || 0}</span>
              </div>
            </div>

            <div className="bg-[#202020] rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Building2 className="text-[#AA7D36]" />
                Chi nhánh
              </h3>

              <div className="flex gap-3">
                <Building2 size={18} className="text-gray-400 mt-1" />
                <span>{room.branchDTO?.nameBranch}</span>
              </div>

              <div className="flex gap-3">
                <MapPin size={18} className="text-gray-400 mt-1" />
                <span>{room.branchDTO?.address}</span>
              </div>

              <div className="flex gap-3">
                <Phone size={18} className="text-gray-400 mt-1" />
                <span>{room.branchDTO?.phone}</span>
              </div>
            </div>
          </div>

          {/* SCHEDULE */}
          <div>
            <h3 className="text-xl font-bold mb-5">Danh sách lịch chiếu</h3>

            {room.scheduleDTOS?.length > 0 ? (
              <div className="space-y-4">
                {room.scheduleDTOS.map((schedule) => (
                  <div
                    key={schedule.idSchedule}
                    className="bg-[#202020] rounded-xl border border-[#2d2d2d] p-5"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold">
                          {schedule.movieDTO?.nameMovie}
                        </h4>

                        <p className="text-gray-400 text-sm mt-1">
                          Đạo diễn: {schedule.movieDTO?.director}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          schedule.movieDTO?.showing
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {schedule.movieDTO?.showing
                          ? "Đang chiếu"
                          : "Sắp chiếu"}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-5">
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-[#AA7D36]" />
                        <span>{formatDate(schedule.date)}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock size={18} className="text-[#AA7D36]" />
                        <span>
                          {formatTime(schedule.timeStart)} -{" "}
                          {formatTime(schedule.timeEnd)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Ticket size={18} className="text-[#AA7D36]" />
                        <span>
                          {Number(schedule.basePrice).toLocaleString()} đ
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400">Phân loại: </span>
                        {schedule.movieDTO?.rated}
                      </div>

                      <div>
                        <span className="text-gray-400">Ngôn ngữ: </span>
                        {schedule.movieDTO?.language}
                      </div>

                      <div>
                        <span className="text-gray-400">Thể loại: </span>
                        {schedule.movieDTO?.category}
                      </div>
                    </div>

                    <div className="mt-5 border-t border-[#2d2d2d] pt-4">
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {schedule.movieDTO?.shortDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#202020] rounded-xl py-16 text-center text-gray-400">
                Chưa có lịch chiếu
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
