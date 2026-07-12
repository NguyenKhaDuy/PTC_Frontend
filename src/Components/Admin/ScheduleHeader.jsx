import { Plus } from "lucide-react";

export default function ScheduleHeader({ onAdd }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">Quản lý lịch chiếu</h1>
        <p className="text-gray-400 mt-2">
          Quản lý tất cả suất chiếu trong hệ thống
        </p>
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-[#AA7D36] hover:bg-[#8f6424] px-6 py-3 rounded-xl transition"
      >
        <Plus size={20} />
        Thêm lịch chiếu
      </button>
    </div>
  );
}
