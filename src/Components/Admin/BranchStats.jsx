export default function BranchStats({
  totalBranch,
  totalRoom,
  totalSeat,
  activeBranch,
}) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-[#181818] rounded-2xl p-6 border border-[#2d2d2d]">
        <p className="text-gray-400">Chi nhánh</p>
        <h2 className="text-4xl font-bold mt-2">{totalBranch}</h2>
      </div>

      <div className="bg-[#181818] rounded-2xl p-6 border border-[#2d2d2d]">
        <p className="text-gray-400">Phòng chiếu</p>
        <h2 className="text-4xl font-bold mt-2">{totalRoom}</h2>
      </div>

      <div className="bg-[#181818] rounded-2xl p-6 border border-[#2d2d2d]">
        <p className="text-gray-400">Ghế</p>
        <h2 className="text-4xl font-bold mt-2">{totalSeat}</h2>
      </div>

      <div className="bg-[#181818] rounded-2xl p-6 border border-[#2d2d2d]">
        <p className="text-gray-400">Đang hoạt động</p>
        <h2 className="text-4xl font-bold text-green-400 mt-2">
          {activeBranch}
        </h2>
      </div>
    </div>
  );
}
