import { X } from "lucide-react";

export default function SizeModal({
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      style={{ margin: 0 }}
    >
      <div className="w-full max-w-md rounded-2xl bg-[#181818] border border-[#2d2d2d]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2d2d2d]">
          <h2 className="text-xl font-bold">
            {editing ? "Cập nhật size" : "Thêm size"}
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg hover:bg-[#252525] flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <label className="block text-sm text-gray-400 mb-2">Tên size</label>

          <input
            type="text"
            value={form.size}
            onChange={(e) =>
              setForm({
                ...form,
                size: e.target.value,
              })
            }
            placeholder="Ví dụ: S, M, L..."
            className="w-full rounded-xl bg-[#101010] border border-[#2d2d2d] px-4 py-3 outline-none focus:border-[#AA7D36]"
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
            disabled={!form.size.trim()}
            onClick={onSubmit}
            className="px-5 py-2 rounded-xl bg-[#AA7D36] disabled:opacity-50"
          >
            {editing ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
}
