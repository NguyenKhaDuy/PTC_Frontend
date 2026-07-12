import { Plus } from "lucide-react";

export default function SeatsHeader({
  setSeatModalOpen,
  setModalMode,
  setEditingSeat,
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Quản lý ghế</h1>
        <p className="text-gray-400 mt-1">
          Quản lý toàn bộ ghế trong các phòng chiếu.
        </p>
      </div>

      <button
        onClick={() => {
          setModalMode("add");
          setEditingSeat(null);
          setSeatModalOpen(true);
        }}
        className="bg-[#AA7D36] hover:bg-[#91682d] px-5 py-3 rounded-xl flex items-center gap-2"
      >
        <Plus size={18} />
        Thêm ghế
      </button>
    </div>
  );
}
