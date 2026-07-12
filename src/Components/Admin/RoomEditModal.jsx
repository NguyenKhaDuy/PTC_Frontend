import { useEffect, useState } from "react";
import axios from "axios";
import { X, ChevronDown } from "lucide-react";

export default function RoomEditModal({
  open,
  mode = "add",
  room,
  onClose,
  onSave,
}) {
  const [branches, setBranches] = useState([]);

  const [form, setForm] = useState({
    idRoom: null,
    name: "",
    capacity: "",
    totalArea: "",
    idBranch: "",
  });

  useEffect(() => {
    if (!open) return;

    const fetchBranches = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/branch");

        setBranches(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBranches();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && room) {
      setForm({
        idRoom: room.idRoom,
        name: room.name || "",
        capacity: room.capacity || "",
        totalArea: room.totalArea || "",
        idBranch: room.branchDTO?.idBranch || "",
      });
    } else {
      setForm({
        idRoom: null,
        name: "",
        capacity: "",
        totalArea: "",
        idBranch: "",
      });
    }
  }, [open, room, mode]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.name.trim()) {
      return alert("Vui lòng nhập tên phòng.");
    }

    if (!form.capacity) {
      return alert("Vui lòng nhập số ghế.");
    }

    if (!form.totalArea.trim()) {
      return alert("Vui lòng nhập diện tích.");
    }

    if (!form.idBranch) {
      return alert("Vui lòng chọn chi nhánh.");
    }

    onSave({
      idRoom: form.idRoom,
      name: form.name.trim(),
      capacity: Number(form.capacity),
      totalArea: form.totalArea.trim(),
      idBranch: Number(form.idBranch),
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-5"
      style={{ margin: 0 }}
    >
      <div className="w-full max-w-xl bg-[#181818] rounded-2xl border border-[#2d2d2d]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#2d2d2d]">
          <h2 className="text-2xl font-bold">
            {mode === "add" ? "Thêm phòng chiếu" : "Cập nhật phòng chiếu"}
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-[#2a2a2a] flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Tên phòng
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 outline-none focus:border-[#AA7D36]"
              placeholder="Nhập tên phòng"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm text-gray-400">Số ghế</label>

              <input
                type="number"
                value={form.capacity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    capacity: e.target.value,
                  })
                }
                className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 outline-none focus:border-[#AA7D36]"
                placeholder="80"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Diện tích (m²)
              </label>

              <input
                type="text"
                value={form.totalArea}
                onChange={(e) =>
                  setForm({
                    ...form,
                    totalArea: e.target.value,
                  })
                }
                className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 outline-none focus:border-[#AA7D36]"
                placeholder="120"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Chi nhánh
            </label>

            <div className="relative">
              <select
                value={form.idBranch}
                onChange={(e) =>
                  setForm({
                    ...form,
                    idBranch: Number(e.target.value),
                  })
                }
                className="w-full appearance-none bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 pr-12 py-3 outline-none focus:border-[#AA7D36]"
              >
                <option value="">-- Chọn chi nhánh --</option>

                {branches.map((branch) => (
                  <option key={branch.idBranch} value={branch.idBranch}>
                    {branch.nameBranch}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-5 border-t border-[#2d2d2d]">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-[#2a2a2a] hover:bg-[#333]"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-[#AA7D36] hover:bg-[#8d682e] font-semibold"
          >
            {mode === "add" ? "Thêm phòng" : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}
