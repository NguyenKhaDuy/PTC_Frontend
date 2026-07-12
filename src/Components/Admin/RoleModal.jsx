import { X } from "lucide-react";

export default function RoleModal({
  open,
  onClose,
  form,
  setForm,
  onSubmit,
  editing,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      style={{ margin: 0 }}
    >
      <div className="w-full max-w-md rounded-2xl bg-[#181818] border border-[#2d2d2d]">
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#2d2d2d]">
          <h2 className="text-xl font-bold">
            {editing ? "Cập nhật Role" : "Thêm Role"}
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg hover:bg-[#252525] flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <label className="block mb-2 text-gray-400">Tên Role</label>

          <input
            type="text"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
            placeholder="ADMIN"
            className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 outline-none focus:border-[#AA7D36]"
          />
        </div>

        <div className="flex justify-end gap-3 px-6 py-5 border-t border-[#2d2d2d]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2a2a2a]"
          >
            Hủy
          </button>

          <button
            onClick={onSubmit}
            disabled={!form.role.trim()}
            className="px-5 py-2 rounded-xl bg-[#AA7D36] disabled:opacity-50"
          >
            {editing ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
}
