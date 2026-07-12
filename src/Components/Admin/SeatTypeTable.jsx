import SeatTypeRow from "./SeatTypeRow";

export default function SeatTypeTable({ seatTypes, onEdit, onDelete }) {
  return (
    <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] overflow-hidden">
      <table className="w-full table-fixed">
        <thead className="bg-[#202020]">
          <tr className="text-gray-300">
            <th className="py-4 px-5 text-left w-[40%]">Type</th>
            <th className="w-[35%] text-center">Hệ số giá</th>
            <th className="w-[25%] text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {seatTypes.map((item) => (
            <SeatTypeRow
              key={item.idSeatType}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
