import { Plus } from "lucide-react";

export default function BranchHeader({ onAdd }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Quản lý rạp chiếu</h1>

        <p className="text-gray-400 mt-2">
          Quản lý tất cả chi nhánh trong hệ thống
        </p>
      </div>

      <button
        onClick={onAdd}
        className="bg-[#AA7D36] hover:bg-[#8f6424] transition rounded-xl px-6 py-3 flex items-center gap-2"
      >
        <Plus size={20} />
        Thêm rạp
      </button>
    </div>
  );
}
