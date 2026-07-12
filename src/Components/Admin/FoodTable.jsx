import FoodRow from "./FoodRow";

export default function FoodTable(props) {
  return (
    <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#202020]">
          <tr>
            <th className="py-4 px-5 text-left">Tên món ăn</th>
            <th>Size</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {props.foods.map((food) => (
            <FoodRow
              key={food.idFood}
              food={food}
              onEdit={props.onEdit}
              onDelete={props.onDelete}
              onEditSize={props.onEditSize}
              onDeleteSize={props.onDeleteSize}
              onAddSize={props.onAddSize}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
