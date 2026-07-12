import { Plus } from "lucide-react";

export default function DrinkHeader({ onAdd }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Quản lý thức ăn</h1>
        <p className="text-gray-400 mt-1">
          Quản lý thức ăn và combo bán tại rạp.
        </p>
      </div>

      <button
        onClick={onAdd}
        className="bg-[#AA7D36] hover:bg-[#91682d] px-5 py-3 rounded-xl flex items-center gap-2"
      >
        <Plus size={18} />
        Thêm thức ăn
      </button>
    </div>
  );
}
