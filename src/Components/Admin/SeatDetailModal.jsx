import {
  X,
  Armchair,
  DoorOpen,
  Tag,
  Hash,
  BadgeDollarSign,
} from "lucide-react";

export default function SeatDetailModal({ open, seat, onClose }) {

  if (!open || !seat.data) return null;

  const getBadgeClass = () => {
    switch (seat.data.seatTypeDTO?.type) {
      case "Ghế VIP":
        return "bg-yellow-500/20 text-yellow-400";
      case "Ghế Sweetbox":
        return "bg-pink-500/20 text-pink-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="w-full max-w-xl bg-[#181818] border border-[#2d2d2d] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2d2d2d]">
          <h2 className="text-xl font-semibold">Chi tiết ghế</h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-[#252525] flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-2xl bg-[#AA7D36]/20 flex items-center justify-center">
              <Armchair size={42} className="text-[#AA7D36]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <InfoRow
              icon={<Hash size={18} />}
              label="ID ghế"
              value={seat.data.idSeat}
            />

            <InfoRow
              icon={<Armchair size={18} />}
              label="Tên ghế"
              value={seat.data.name}
            />

            <InfoRow
              icon={<DoorOpen size={18} />}
              label="Tên phòng"
              value={seat.data.nameRoom}
            />

            <div>
              <p className="text-sm text-gray-500 mb-2">Loại ghế</p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeClass()}`}
              >
                {seat.data.seatTypeDTO?.type}
              </span>
            </div>

            <InfoRow
              icon={<BadgeDollarSign size={18} />}
              label="Hệ số giá"
              value={`${seat.data.seatTypeDTO?.priceMultiplier}x`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#2d2d2d] px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#AA7D36] hover:bg-[#956c30] transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
        {icon}
        {label}
      </p>

      <div className="font-semibold text-white bg-[#101010] border border-[#2d2d2d] rounded-lg px-4 py-2">
        {value}
      </div>
    </div>
  );
}
