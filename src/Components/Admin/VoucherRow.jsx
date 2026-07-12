import { Pencil, Trash2, TicketPercent } from "lucide-react";

export default function VoucherRow({ voucher, onEdit, onDelete }) {
  return (
    <tr className="border-t border-[#2d2d2d]">
      <td className="py-5 px-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#AA7D36]/20 rounded-xl flex items-center justify-center">
            <TicketPercent className="text-[#AA7D36]" size={18} />
          </div>

          <div>
            <p className="font-semibold">{voucher.code}</p>
            <p className="text-xs text-gray-500">#{voucher.id}</p>
          </div>
        </div>
      </td>

      <td className="text-center font-semibold text-green-400">
        {voucher.discount}%
      </td>

      <td className="text-center">{voucher.quality}</td>

      <td className="text-center text-gray-400">{voucher.expiration}</td>

      <td className="text-center">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            voucher.status === "Hoạt động"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {voucher.status}
        </span>
      </td>

      <td>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit(voucher)}
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => onDelete(voucher)}
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-red-500/20 text-red-400 hover:bg-red-500/30"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
