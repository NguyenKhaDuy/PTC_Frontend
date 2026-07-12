import {
  MapPin,
  Phone,
  MonitorPlay,
  Armchair,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function BranchCard({ branch, onView, onEdit, onDelete }) {
  const totalRooms = branch.roomDTOS?.length ?? 0;

  const totalSeats =
    branch.roomDTOS?.reduce(
      (sum, room) => sum + Number(room.capacity ?? 0),
      0,
    ) ?? 0;

  return (
    <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-6 hover:border-[#AA7D36] transition">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{branch.nameBranch}</h2>

          <div className="mt-5 space-y-4 text-gray-300">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#AA7D36]" />
              {branch.address}
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#AA7D36]" />
              {branch.phone}
            </div>

            <div className="flex items-center gap-3">
              <MonitorPlay size={18} className="text-[#AA7D36]" />
              {totalRooms} phòng chiếu
            </div>

            <div className="flex items-center gap-3">
              <Armchair size={18} className="text-[#AA7D36]" />
              {totalSeats} ghế
            </div>
          </div>
        </div>

        <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm">
          Hoạt động
        </span>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          onClick={() => onView(branch.idBranch)}
          className="w-11 h-11 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 flex items-center justify-center"
        >
          <Eye size={19} />
        </button>

        <button
          onClick={() => onEdit(branch)}
          className="w-11 h-11 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 flex items-center justify-center"
        >
          <Pencil size={19} />
        </button>

        <button
          onClick={() => onDelete(branch)}
          className="w-11 h-11 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center"
        >
          <Trash2 size={19} />
        </button>
      </div>
    </div>
  );
}
