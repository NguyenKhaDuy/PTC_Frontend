export default function ScheduleStats({ total, today, opening, finished }) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-6">
        <p className="text-gray-400">Tổng suất chiếu</p>
        <h2 className="text-4xl font-bold mt-2">{total}</h2>
      </div>

      <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-6">
        <p className="text-gray-400">Suất chiếu hôm nay</p>
        <h2 className="text-4xl font-bold mt-2 text-blue-400">{today}</h2>
      </div>

      <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-6">
        <p className="text-gray-400">Sắp chiếu</p>
        <h2 className="text-4xl font-bold mt-2 text-green-400">{opening}</h2>
      </div>

      <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-6">
        <p className="text-gray-400">Đã chiếu</p>
        <h2 className="text-4xl font-bold mt-2 text-red-400">{finished}</h2>
      </div>
    </div>
  );
}
