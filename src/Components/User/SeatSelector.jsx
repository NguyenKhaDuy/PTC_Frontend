import { MdMeetingRoom } from "react-icons/md";
import { useToast } from "../Common/ToastProvider";
import { useMemo } from "react";

export default function SeatSelector({
    seats,
    selectedSeats,
    setSelectedSeats
}){
  const { showToast } = useToast();


  // ===================== CHECK BOOKED =====================
  const isBooked = (seat) => ["BOOKED", "BOOKING"].includes(seat.status);

  const groupedSeats = useMemo(() => {
    const map = {};

    seats.forEach((seat) => {
        const row = seat.name[0];

        if (!map[row]) {
            map[row] = [];
        }

        map[row].push(seat);
    });

    Object.values(map).forEach((list) =>
        list.sort(
            (a, b) =>
                Number(a.name.slice(1)) -
                Number(b.name.slice(1))
        )
    );

    return map;
  }, [seats])
  
  const isValidDoubleSelection = (row, seatAName, seatBName) => {
    const current = selectedSeats
      .filter((seat) => seat.name.startsWith(row))
      .map((seat) => getIndex(seat.name));

    const all = [...current, getIndex(seatAName), getIndex(seatBName)].sort(
      (a, b) => a - b,
    );

    for (let i = 0; i < all.length - 1; i++) {
      if (all[i + 1] - all[i] > 1) {
        return false;
      }
    }

    return true;
  };

  // ===================== GET INDEX =====================
  const getIndex = (seatId) => parseInt(seatId.slice(1), 10);

  // ===================== VALIDATE CONTINUOUS =====================
  const isValidRowSelection = (row, newSeatName) => {
    const current = selectedSeats
      .filter((seat) => seat.name.startsWith(row))
      .map((seat) => getIndex(seat.name))
      .sort((a, b) => a - b);

    const newIndex = getIndex(newSeatName);

    const all = [...current, newIndex].sort((a, b) => a - b);

    for (let i = 0; i < all.length - 1; i++) {
      if (all[i + 1] - all[i] > 1) {
        return false;
      }
    }

    return true;
  };

  // ===================== CLICK =====================
  const handleClick = (row, num) => {
    const seatId = `${row}${num}`;
    const seat = seats.find((s) => s.name === seatId);

    if (!seat || isBooked(seat)) return;

    setSelectedSeats((prev) => {
      // ================= GHẾ ĐÔI =================
      if (seat.seatTypeDTO?.type === "Ghế Đôi") {
        const pairStart = num % 2 === 0 ? num - 1 : num;

        const seatA = seats.find((s) => s.name === `${row}${pairStart}`);
        const seatB = seats.find((s) => s.name === `${row}${pairStart + 1}`);

        if (!seatA || !seatB) return prev;

        // Nếu 1 trong 2 ghế đã được đặt thì không cho chọn
        if (isBooked(seatA) || isBooked(seatB)) {
          return prev;
        }

        // Kiểm tra đã chọn chưa
        const existsA = prev.some((s) => s.idSeat === seatA.idSeat);
        const existsB = prev.some((s) => s.idSeat === seatB.idSeat);

        // Nếu đã chọn thì bỏ chọn cả cặp
        if (existsA || existsB) {
          return prev.filter(
            (s) => s.idSeat !== seatA.idSeat && s.idSeat !== seatB.idSeat,
          );
        }

        // Kiểm tra liên tiếp
        if (!isValidDoubleSelection(row, seatA.name, seatB.name)) {
          showToast(
            "Bạn phải chọn ghế liên tiếp (không bỏ trống ghế giữa)",
            "error",
          );
          return prev;
        }

        // Chọn cả cặp ghế
        return [...prev, seatA, seatB];
      }

      // ================= GHẾ THƯỜNG =================

      const isSelected = prev.some((s) => s.idSeat === seat.idSeat);

      // Bỏ chọn
      if (isSelected) {
        return prev.filter((s) => s.idSeat !== seat.idSeat);
      }

      // Kiểm tra chọn liên tiếp
      if (!isValidRowSelection(row, seat.name)) {
        showToast(
          "Bạn phải chọn ghế liên tiếp (không bỏ trống ghế giữa)",
          "error",
        );
        return prev;
      }

      // Thêm ghế
      return [...prev, seat];
    });
  };
  

  return (
    <div className="max-w-6xl mx-auto">
      {/* TITLE */}
      <h2 className="text-xl font-bold mb-6">Chọn ghế</h2>

      {/* SCREEN */}
      <div className="text-center mb-6 text-gray-400">
        ─────────── MÀN HÌNH ───────────
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-6 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#1c1c1c] rounded"></div>
          <span>Còn trống</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#AA7D36] rounded"></div>
          <span>Đang chọn</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-600 rounded"></div>
          <span>Đã đặt</span>
        </div>
      </div>

      {/* EXIT */}
      <div className="flex items-center text-xs text-gray-500 mb-4 ml-20">
        <MdMeetingRoom className="text-lg mr-1" />
        LỐI RA / VÀO
      </div>

      {/* SEATS */}
      <div className="flex flex-col gap-3 items-center">
        {Object.entries(groupedSeats).map(([row, seatList]) => {
          const isDoubleRow = seatList.every(
            (seat) => seat.seatTypeDTO.type === "Ghế Đôi"
          );
          return (
            <div key={row} className="flex items-center gap-4">
              {/* ROW I (DOUBLE SEATS) */}
              {isDoubleRow ? (
                <div className="flex gap-2">
                  {seatList.map((seat) => {
                    const seatId = seat.name;
                    const booked = isBooked(seat);

                    return (
                      <button
                        key={seatId}
                        onClick={() =>
                          handleClick(row, Number(seat.name.slice(1)))
                        }
                        disabled={booked}
                        className={`w-10 h-10 rounded-md text-[11px] font-semibold transition ${
                          booked
                            ? "bg-gray-600 cursor-not-allowed"
                            : selectedSeats.some(
                                  (s) => s.idSeat === seat.idSeat,
                                )
                              ? "bg-[#AA7D36]"
                              : "bg-[#1c1c1c] hover:bg-[#333]"
                        }`}
                      >
                        {seatId}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <>
                  {/* LEFT */}
                  <div className="flex gap-2">
                    {seatList
                      .filter((seat) => Number(seat.name.slice(1)) <= 5)
                      .map((seat) => {
                        const seatId = seat.name;
                        const booked = isBooked(seat);

                        return (
                          <button
                            key={seatId}
                            onClick={() =>
                              handleClick(row, Number(seat.name.slice(1)))
                            }
                            disabled={booked}
                            className={`w-10 h-10 rounded-md text-[11px] font-semibold transition ${
                              booked
                                ? "bg-gray-600 cursor-not-allowed"
                                : selectedSeats.some(
                                      (s) => s.idSeat === seat.idSeat,
                                    )
                                  ? "bg-[#AA7D36]"
                                  : "bg-[#1c1c1c] hover:bg-[#333]"
                            }`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                  </div>

                  <div className="w-10 text-center text-gray-600">┃</div>

                  {/* RIGHT */}
                  <div className="flex gap-2">
                    {seatList
                      .filter((seat) => Number(seat.name.slice(1)) > 5)
                      .map((seat) => {
                        const seatId = seat.name;
                        const booked = isBooked(seat);

                        return (
                          <button
                            key={seatId}
                            onClick={() =>
                              handleClick(row, Number(seat.name.slice(1)))
                            }
                            disabled={booked}
                            className={`w-10 h-10 rounded-md text-[11px] font-semibold transition ${
                              booked
                                ? "bg-gray-600 cursor-not-allowed"
                                : selectedSeats.some(
                                      (s) => s.idSeat === seat.idSeat,
                                    )
                                  ? "bg-[#AA7D36]"
                                  : "bg-[#1c1c1c] hover:bg-[#333]"
                            }`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          );
          
        })}
      </div>
    </div>
  );
}
