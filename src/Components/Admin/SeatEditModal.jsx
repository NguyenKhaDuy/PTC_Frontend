import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";

export default function SeatEditModal({
  open,
  mode,
  seat,
  seatTypes,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    idSeat: "",
    name: "",
    idSeatType: "",
  });

  useEffect(() => {
    if (open) {
      if (mode === "edit" && seat) {
        setForm({
          idSeat: seat.idSeat,
          name: seat.name,
          idSeatType: seat.seatTypeDTO.idSeatType,
        });
      } else {
        setForm({
          idSeat: "",
          name: "",
          idSeatType: "",
        });
      }
    }
  }, [open, mode, seat]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#181818] rounded-2xl w-full max-w-md border border-[#2d2d2d]">
        <div className="flex justify-between items-center p-5 border-b border-[#2d2d2d]">
          <h2 className="text-xl font-semibold">
            {mode === "add" ? "Thêm ghế" : "Cập nhật ghế"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="text-sm text-gray-400">Tên ghế</label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full mt-2 h-11 rounded-xl bg-[#101010] border border-[#2d2d2d] px-4"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Loại ghế</label>

            <div className="relative mt-2">
              <select
                value={form.idSeatType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    idSeatType: Number(e.target.value),
                  })
                }
                className="w-full h-11 bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 pr-10 text-white appearance-none outline-none cursor-pointer focus:border-[#AA7D36] focus:ring-1 focus:ring-[#AA7D36] transition"
              >
                <option value="">Chọn loại ghế</option>

                {seatTypes.map((type) => (
                  <option key={type.idSeatType} value={type.idSeatType}>
                    {type.type}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-[#2d2d2d]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2d2d2d]"
          >
            Hủy
          </button>

          <button
            onClick={() => onSave(form)}
            className="px-5 py-2 rounded-xl bg-[#AA7D36]"
          >
            {mode === "add" ? "Thêm mới" : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}
