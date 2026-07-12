import { Pencil, Trash2 } from "lucide-react";
import DrinkPriceList from "./DrinkPriceList";

export default function DrinkRow({
  drink,
  onEdit,
  onDelete,
  onEditSize,
  onDeleteSize,
  onAddSize,
}) {
  return (
    <tr className="border-t border-[#2d2d2d] hover:bg-[#202020]">
      <td className="py-5 px-5">
        <div>
          <div className="font-semibold">{drink.name}</div>
          <div className="text-sm text-gray-500">ID #{drink.idDrink}</div>
        </div>
      </td>

      <td>
        <div className="flex flex-wrap justify-center gap-2">
          {drink.drinkSizeDTOS.map((size) => (
            <span
              key={size.idSize}
              className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm"
            >
              {size.size}
            </span>
          ))}
        </div>
      </td>

      <td>
        <DrinkPriceList
          drink={drink}
          onEditSize={onEditSize}
          onDeleteSize={onDeleteSize}
          onAddSize={onAddSize}
        />
      </td>

      <td>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit(drink)}
            className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(drink)}
            className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
