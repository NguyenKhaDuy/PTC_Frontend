export default function SeatTypeStats({ seatTypes }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="bg-[#181818] p-5 rounded-2xl border border-[#2d2d2d]">
        <p className="text-gray-400">Tổng loại ghế</p>
        <h2 className="text-3xl font-bold mt-2">{seatTypes.length}</h2>
      </div>

      <div className="bg-[#181818] p-5 rounded-2xl border border-[#2d2d2d]">
        <p className="text-gray-400">Đang hoạt động</p>
        <h2 className="text-3xl font-bold text-green-400 mt-2">
          {seatTypes.length}
        </h2>
      </div>
    </div>
  );
}
