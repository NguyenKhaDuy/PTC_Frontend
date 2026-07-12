import { Plus } from "lucide-react";

export default function SeatTypeHeader({ onCreate }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Quản lý loại ghế</h1>
        <p className="text-gray-400 mt-1">
          Quản lý các loại ghế và giá vé tương ứng.
        </p>
      </div>

      <button
        onClick={onCreate}
        className="bg-[#AA7D36] hover:bg-[#91682d] px-5 py-3 rounded-xl flex items-center gap-2"
      >
        <Plus size={18} />
        Thêm loại ghế
      </button>
    </div>
  );
}
