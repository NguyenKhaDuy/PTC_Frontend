import {
  Building2,
  MonitorPlay,
  CalendarDays,
  Clock3,
  Users,
  DollarSign,
  Eye,
  Pencil,
  Trash2,
  Lock,
  LockOpen,
} from "lucide-react";

import { formatDate, formatTime } from "../../Utils/format";
export default function ScheduleCard({
  item,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  const totalSeat = Number(item.roomDTO?.capacity ?? 0);
  const soldSeat = Number(item.soldSeats ?? 0);

  const percent =
    totalSeat > 0 ? Math.min(100, Math.round((soldSeat / totalSeat) * 100)) : 0;

  return (
    <div className="bg-[#181818] border border-[#2d2d2d] rounded-2xl p-5">
      <div className="flex gap-6">
        {/* IMAGE */}
        <img
          src={
            item.movieDTO?.smallImage
              ? `data:image/jpeg;base64,${item.movieDTO.smallImage}`
              : "https://placehold.co/200x300"
          }
          className="w-32 h-44 rounded-xl object-cover"
        />

        {/* CONTENT */}
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">{item.movieDTO?.nameMovie}</h2>

              <div className="mt-4 space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Building2 size={18} />
                  {item.roomDTO?.branchDTO?.nameBranch}
                </div>

                <div className="flex items-center gap-2">
                  <MonitorPlay size={18} />
                  {item.roomDTO?.name}
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={18} />
                  {formatDate(item.date)}
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={18} />
                  {formatTime(item.timeStart)} - {formatTime(item.timeEnd)}
                </div>

                <div className="flex items-center gap-2">
                  <Users size={18} />
                  {soldSeat}/{totalSeat}
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign size={18} />
                  {item.basePrice?.toLocaleString("vi-VN")} đ
                </div>
              </div>
            </div>

            {/* STATUS */}
            <span
              className={`px-4 py-2 rounded-full text-sm h-fit ${
                item.status
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {item.status ? "Đang mở bán" : "Đóng bán"}
            </span>
          </div>

          {/* PROGRESS */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Tiến độ bán vé</span>
              <span>
                {soldSeat}/{totalSeat} ({percent}%)
              </span>
            </div>

            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  percent >= 100
                    ? "bg-red-500"
                    : percent >= 70
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onView}
              className="w-11 h-11 rounded-xl bg-sky-500/20 hover:bg-sky-500 hover:text-white flex items-center justify-center transition"
            >
              <Eye size={18} />
            </button>

            <button
              onClick={onEdit}
              className="w-11 h-11 rounded-xl bg-yellow-500/20 hover:bg-yellow-500 hover:text-white flex items-center justify-center transition"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={onDelete}
              className="w-11 h-11 rounded-xl bg-red-500/20 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={() => onToggleStatus(item)}
              className={`px-4 h-11 rounded-xl flex items-center gap-2 transition ${
                item.status
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                  : "bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white"
              }`}
            >
              {item.status ? <Lock size={18} /> : <LockOpen size={18} />}
              {item.status ? "Đóng bán" : "Mở bán"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
