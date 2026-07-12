import { Calendar } from "lucide-react";

export default function TicketCard({ ticket, onClick }) {
  const formatDate = (date) => {
    if (!date) return "";

    const [y, m, d] = date;
    return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  };

  const formatTime = (time) => {
    if (!time) return "";

    const [h, m] = time;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#AA7D36]"
    >
      <div className="flex justify-between">
        <div>
          {/* Tên phim */}
          <h3 className="font-bold">
            {ticket.scheduleDTO?.movieDTO?.nameMovie}
          </h3>

          {/* Ngày + giờ */}
          <p className="flex items-center gap-2 text-gray-400">
            <Calendar size={14} />
            {formatDate(ticket.scheduleDTO?.date)} •{" "}
            {formatTime(ticket.scheduleDTO?.timeStart)}
          </p>

          {/* Chi nhánh */}
          <p>{ticket.branchDTO?.nameBranch}</p>

          {/* Phòng */}
          <p className="text-sm text-gray-400">
            {ticket.ticketDTO?.seatDTOS?.[0]?.nameRoom}
          </p>
        </div>

        <div className="text-right">
          {/* Ghế */}
          <p className="text-[#AA7D36]">
            {ticket.ticketDTO?.seatDTOS?.map((seat) => seat.name).join(", ")}
          </p>

          {/* Trạng thái */}
          <p
            className={
              ticket.status === "UNUSE"
                ? "text-green-400"
                : ticket.status === "USED"
                  ? "text-blue-400"
                  : "text-red-400"
            }
          >
            {ticket.status}
          </p>

          {/* Tổng tiền */}
          <p className="text-sm text-gray-400 mt-1">
            {ticket.totalAmount?.toLocaleString("vi-VN")}đ
          </p>
        </div>
      </div>
    </div>
  );
}
