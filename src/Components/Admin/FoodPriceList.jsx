import { Trash2 } from "lucide-react";

export default function FoodPriceList({
  food,
  onEditSize,
  onDeleteSize,
  onAddSize,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {food.foodSize.map((size) => (
        <div
          key={size.idSize}
          onClick={() => onEditSize(food, size)}
          className="flex items-center gap-2 rounded-lg bg-[#242424] border border-[#343434] px-3 py-2 cursor-pointer hover:border-[#AA7D36]"
        >
          <span className="bg-[#AA7D36] text-xs px-2 py-1 rounded">
            {size.size}
          </span>

          <span className="text-green-400 font-semibold">
            {size.price.toLocaleString()}đ
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteSize(food, size);
            }}
            className="text-red-400"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}

      <button
        onClick={() => onAddSize(food)}
        className="h-[42px] px-4 rounded-lg border border-dashed border-[#AA7D36]"
      >
        + Thêm size
      </button>
    </div>
  );
}
