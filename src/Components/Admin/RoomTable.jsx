import {
  MonitorPlay,
  Building2,
  Armchair,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function RoomTable({ rooms, onView, onEdit, onDelete }) {
  return (
    <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#202020]">
          <tr>
            <th className="py-4 px-5 text-left">Phòng</th>
            <th className="text-left">Chi nhánh</th>
            <th className="text-center">Ghế</th>
            <th className="text-center">Diện tích</th>
            <th className="text-center">Trạng thái</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr
              key={room.idRoom}
              className="border-t border-[#2d2d2d] hover:bg-[#202020]"
            >
              <td className="py-5 px-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#AA7D36]/20 flex items-center justify-center">
                    <MonitorPlay className="text-[#AA7D36]" size={22} />
                  </div>

                  <div>
                    <div className="font-semibold">{room.name}</div>

                    <div className="text-sm text-gray-400">
                      ID #{room.idRoom}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-4">
                <div className="flex items-center gap-2">
                  <Building2 size={18} className="text-gray-400" />

                  <span
                    className="truncate max-w-[220px]"
                    title={room.branchDTO?.nameBranch}
                  >
                    {room.branchDTO?.nameBranch}
                  </span>
                </div>
              </td>

              <td className="text-center">
                <div className="flex justify-center gap-2">
                  <Armchair size={18} />
                  {room.capacity} ghế
                </div>
              </td>

              <td className="text-center">{room.totalArea} m²</td>

              <td className="text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    room.scheduleDTOS?.length
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {room.scheduleDTOS?.length ? "Đang sử dụng" : "Chưa có lịch"}
                </span>
              </td>

              <td>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onView(room.idRoom)}
                    className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => onEdit(room)}
                    className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(room.idRoom)}
                    className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
