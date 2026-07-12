export default function FoodStats({ foods }) {
  const prices = foods.flatMap((f) => f.foodSize.map((s) => s.price));

  return (
    <div className="grid grid-cols-4 gap-5">
      <Card title="Tổng món ăn" value={foods.length} />

      <Card
        title="Tổng size"
        value={foods.reduce((sum, f) => sum + f.foodSize.length, 0)}
        color="text-green-400"
      />

      <Card
        title="Giá thấp nhất"
        value={
          prices.length ? `${Math.min(...prices).toLocaleString()} đ` : "0 đ"
        }
        color="text-blue-400"
      />

      <Card
        title="Giá cao nhất"
        value={
          prices.length ? `${Math.max(...prices).toLocaleString()} đ` : "0 đ"
        }
        color="text-yellow-400"
      />
    </div>
  );
}

function Card({ title, value, color = "" }) {
  return (
    <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
      <p className="text-gray-400">{title}</p>
      <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}
