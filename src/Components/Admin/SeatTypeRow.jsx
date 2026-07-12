import { Ticket, Pencil, Trash2 } from "lucide-react";

export default function SeatTypeRow({ item, onEdit, onDelete }) {
  return (
    <tr className="border-t border-[#2d2d2d] hover:bg-[#202020]">
      <td className="py-5 px-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#AA7D36]/20 flex items-center justify-center">
            <Ticket size={18} className="text-[#AA7D36]" />
          </div>

          <div>
            <div className="font-semibold">{item.type}</div>
            <div className="text-xs text-gray-500">#{item.idSeatType}</div>
          </div>
        </div>
      </td>

      <td className="text-center font-semibold text-green-400">
        {item.priceMultiplier}
      </td>

      <td>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit(item)}
            className="w-10 h-10 bg-yellow-500/20 text-yellow-400 rounded-xl"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(item.idSeatType)}
            className="w-10 h-10 bg-red-500/20 text-red-400 rounded-xl"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
