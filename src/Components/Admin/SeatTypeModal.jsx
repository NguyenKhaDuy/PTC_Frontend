import { useEffect, useState } from "react";
import axios from "axios";

export default function SeatTypeModal({ open, onClose, onSuccess, editData }) {
  const [form, setForm] = useState({
    idSeatType: null,
    type: "",
    priceMultiplier: "",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm({
        idSeatType: null,
        type: "",
        priceMultiplier: "",
      });
    }
  }, [editData, open]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editData) {
        await axios.put("http://localhost:3000/api/admin/seatType", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:3000/api/admin/seatType", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSuccess(); // reload list
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#181818] w-[420px] p-6 rounded-xl border border-[#2d2d2d] space-y-4">
        <h2 className="text-xl font-bold">
          {editData ? "Cập nhật loại ghế" : "Thêm loại ghế"}
        </h2>

        {/* TYPE */}
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type (VIP, STANDARD...)"
          className="w-full bg-[#101010] border border-[#2d2d2d] p-3 rounded-lg"
        />

        {/* MULTIPLIER */}
        <input
          name="priceMultiplier"
          value={form.priceMultiplier}
          onChange={handleChange}
          placeholder="Price multiplier"
          className="w-full bg-[#101010] border border-[#2d2d2d] p-3 rounded-lg"
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded-lg"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#AA7D36] rounded-lg"
          >
            {editData ? "Cập nhật" : "Tạo mới"}
          </button>
        </div>
      </div>
    </div>
  );
}
