import {
  X,
  Building2,
  MonitorPlay,
  CalendarDays,
  Clock3,
  Film,
  DollarSign,
  Users,
} from "lucide-react";

const formatTime = (time) => {
  if (!time) return "";

  if (Array.isArray(time)) {
    const [hour = 0, minute = 0] = time;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  return time;
};

const formatDate = (date) => {
  if (!date) return "";

  // Nếu backend trả string: 2026-07-25
  if (typeof date === "string") {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  // Nếu backend trả mảng: [2026,7,25]
  if (Array.isArray(date)) {
    const [year, month, day] = date;
    return `${String(day).padStart(2, "0")}/${String(month).padStart(
      2,
      "0",
    )}/${year}`;
  }

  return "";
};

export default function ScheduleDetailModal({ open, schedule, onClose }) {
  if (!open || !schedule) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      style={{ margin: 0 }}
    >
      <div className="w-[850px] bg-[#181818] rounded-2xl border border-[#2d2d2d] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2d2d2d]">
          <h2 className="text-2xl font-bold">Chi tiết lịch chiếu</h2>

          <button onClick={onClose} className="hover:text-red-500">
            <X />
          </button>
        </div>

        <div className="p-6 flex gap-6">
          <img
            src={
              schedule.movieDTO?.smallImage
                ? `data:image/jpeg;base64,${schedule.movieDTO.smallImage}`
                : "https://placehold.co/300x450"
            }
            className="w-60 rounded-xl object-cover"
            alt=""
          />

          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">
              {schedule.movieDTO?.nameMovie}
            </h1>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex gap-3">
                <Building2 className="text-[#AA7D36]" />
                <div>
                  <p className="text-gray-400 text-sm">Chi nhánh</p>
                  <p>{schedule.roomDTO?.branchDTO?.nameBranch}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MonitorPlay className="text-[#AA7D36]" />
                <div>
                  <p className="text-gray-400 text-sm">Phòng</p>
                  <p>{schedule.roomDTO?.name}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <CalendarDays className="text-[#AA7D36]" />
                <div>
                  <p className="text-gray-400 text-sm">Ngày chiếu</p>
                  <p>{formatDate(schedule.date)}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock3 className="text-[#AA7D36]" />
                <div>
                  <p className="text-gray-400 text-sm">Thời gian</p>
                  <p>
                    {formatTime(schedule.timeStart)} -{" "}
                    {formatTime(schedule.timeEnd)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <DollarSign className="text-[#AA7D36]" />
                <div>
                  <p className="text-gray-400 text-sm">Giá vé</p>
                  <p>{schedule.basePrice?.toLocaleString("vi-VN")} đ</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Users className="text-[#AA7D36]" />
                <div>
                  <p className="text-gray-400 text-sm">Sức chứa</p>
                  <p>{schedule.roomDTO?.capacity} ghế</p>
                </div>
              </div>

              <div className="flex gap-3 col-span-2">
                <Film className="text-[#AA7D36]" />
                <div>
                  <p className="text-gray-400 text-sm">Đạo diễn</p>
                  <p>{schedule.movieDTO?.director}</p>
                </div>
              </div>

              <div className="col-span-2">
                <p className="text-gray-400 text-sm mb-2">Mô tả phim</p>

                <div className="bg-[#101010] p-4 rounded-xl leading-7">
                  {schedule.movieDTO?.shortDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
