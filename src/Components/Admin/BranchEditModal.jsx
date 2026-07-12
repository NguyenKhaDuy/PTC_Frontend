import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function BranchEditModal({
  open,
  mode,
  branch,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    idBranch: "",
    nameBranch: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (mode === "edit" && branch) {
      setForm({
        idBranch: branch.idBranch,
        nameBranch: branch.nameBranch,
        address: branch.address,
        phone: branch.phone,
      });
    } else {
      setForm({
        idBranch: "",
        nameBranch: "",
        address: "",
        phone: "",
      });
    }
  }, [branch, mode, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.nameBranch.trim() || !form.address.trim() || !form.phone.trim()) {
      return;
    }

    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" style={{margin: 0}}>
      <div className="bg-[#181818] rounded-2xl w-full max-w-xl border border-[#2d2d2d]">
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#2d2d2d]">
          <h2 className="text-2xl font-bold">
            {mode === "add" ? "Thêm rạp" : "Cập nhật rạp"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#2d2d2d]"
          >
            <X />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block mb-2">Tên rạp</label>

            <input
              name="nameBranch"
              value={form.nameBranch}
              onChange={handleChange}
              className="w-full bg-[#101010] border border-[#333] rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">Địa chỉ</label>

            <textarea
              rows={3}
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full bg-[#101010] border border-[#333] rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">Số điện thoại</label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-[#101010] border border-[#333] rounded-xl px-4 py-3"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-5 border-t border-[#2d2d2d]">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-[#2d2d2d]"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-3 rounded-xl bg-[#AA7D36] hover:bg-[#8f6424]"
          >
            {mode === "add" ? "Thêm mới" : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}
