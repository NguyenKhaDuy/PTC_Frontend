import { Pencil, Trash2 } from "lucide-react";
import FoodPriceList from "./FoodPriceList";

export default function FoodRow({
  food,
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
          <div className="font-semibold">{food.name}</div>
          <div className="text-sm text-gray-500">ID #{food.idFood}</div>
        </div>
      </td>

      <td>
        <div className="flex flex-wrap justify-center gap-2">
          {food.foodSize.map((size) => (
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
        <FoodPriceList
          food={food}
          onEditSize={onEditSize}
          onDeleteSize={onDeleteSize}
          onAddSize={onAddSize}
        />
      </td>

      <td>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit(food)}
            className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(food)}
            className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
