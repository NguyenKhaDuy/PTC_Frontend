import { Plus } from "lucide-react";

export default function VoucherHeader({ onAdd }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Quản lý voucher</h1>
        <p className="text-gray-400 mt-1">Quản lý mã giảm giá và khuyến mãi.</p>
      </div>

      <button
        onClick={onAdd}
        className="bg-[#AA7D36] px-5 py-3 rounded-xl flex items-center gap-2"
      >
        <Plus size={18} />
        Thêm voucher
      </button>
    </div>
  );
}
