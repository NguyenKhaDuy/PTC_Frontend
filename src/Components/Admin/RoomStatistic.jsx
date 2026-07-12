export default function RoomStatistic({ rooms }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
        <p className="text-gray-400">Tổng phòng</p>
        <h2 className="text-3xl font-bold mt-2">{rooms.length}</h2>
      </div>

      <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
        <p className="text-gray-400">Tổng ghế</p>

        <h2 className="text-3xl font-bold text-[#AA7D36] mt-2">
          {rooms.reduce((sum, room) => sum + Number(room.capacity ?? 0), 0)}
        </h2>
      </div>
    </div>
  );
}
