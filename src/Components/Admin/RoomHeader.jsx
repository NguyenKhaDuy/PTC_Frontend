import { Plus } from "lucide-react";

export default function RoomHeader({ onAdd }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">Quản lý phòng chiếu</h1>

        <p className="text-gray-400 mt-1">
          Quản lý tất cả phòng chiếu trong hệ thống.
        </p>
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-[#AA7D36] hover:bg-[#8d682e] px-5 py-3 rounded-xl font-semibold transition"
      >
        <Plus size={18} />
        Thêm phòng
      </button>
    </div>
  );
}
