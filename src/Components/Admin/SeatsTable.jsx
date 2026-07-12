import { Armchair, DoorOpen, Eye, Pencil, Trash2 } from "lucide-react";

export default function SeatsTable({
  filteredSeats,
  handleViewSeat,
  setModalMode,
  setEditingSeat,
  setSeatModalOpen,
  setDeleteSeat,
  setDeleteOpen,
}) {
  return (
    <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] overflow-hidden">
      <table className="w-full">
        {/* HEADER */}
        <thead className="bg-[#202020]">
          <tr>
            <th className="py-4 px-5 text-left">Ghế</th>
            <th className="text-center">Phòng</th>
            <th className="text-center">Loại ghế</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {filteredSeats?.length > 0 ? (
            filteredSeats.map((seat) => (
              <tr
                key={seat.idSeat}
                className="border-t border-[#2d2d2d] hover:bg-[#202020] transition"
              >
                {/* GHẾ */}
                <td className="py-5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#AA7D36]/20 flex items-center justify-center">
                      <Armchair className="text-[#AA7D36]" size={18} />
                    </div>

                    <div>
                      <div className="font-semibold">{seat.name}</div>
                      <div className="text-sm text-gray-500">
                        ID #{seat.idSeat}
                      </div>
                    </div>
                  </div>
                </td>

                {/* PHÒNG */}
                <td className="text-center text-gray-300">
                  <div className="flex items-center justify-center gap-2">
                    <DoorOpen size={16} />
                    {seat.nameRoom}
                  </div>
                </td>

                {/* LOẠI GHẾ */}
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      seat.seatTypeDTO?.type === "Ghế VIP"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : seat.seatTypeDTO?.type === "Ghế Sweetbox"
                          ? "bg-pink-500/20 text-pink-400"
                          : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {seat.seatTypeDTO?.type}
                  </span>
                </td>

                {/* ACTION */}
                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleViewSeat(seat.idSeat)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-500/20 text-sky-400 hover:bg-sky-500/30 transition"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setModalMode("edit");
                        setEditingSeat(seat);
                        setSeatModalOpen(true);
                      }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setDeleteSeat(seat);
                        setDeleteOpen(true);
                      }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-10 text-center text-gray-500">
                Không có dữ liệu ghế.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
