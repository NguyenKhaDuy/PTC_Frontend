import { Plus } from "lucide-react";

export default function MovieHeader({ onAdd }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">Quản lý phim</h1>

        <p className="mt-1 text-gray-400">
          Quản lý toàn bộ phim trong hệ thống
        </p>
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-xl bg-[#AA7D36] px-5 py-3 transition hover:bg-[#8f6424]"
      >
        <Plus size={18} />
        Thêm phim
      </button>
    </div>
  );
}
