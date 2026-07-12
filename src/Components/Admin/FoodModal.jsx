import { X } from "lucide-react";

export default function FoodModal({
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
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      style={{ margin: 0 }}
    >
      <div className="w-full max-w-md rounded-2xl bg-[#181818] border border-[#2d2d2d]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2d2d2d]">
          <h2 className="text-xl font-bold">
            {editing ? "Cập nhật món ăn" : "Thêm món ăn"}
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg hover:bg-[#252525] flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Tên món ăn
            </label>

            <input
              type="text"
              value={form.foodName}
              onChange={(e) =>
                setForm({
                  ...form,
                  foodName: e.target.value,
                })
              }
              placeholder="Nhập tên món ăn..."
              className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 outline-none focus:border-[#AA7D36]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-5 border-t border-[#2d2d2d]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2a2a2a] hover:bg-[#343434]"
          >
            Hủy
          </button>

          <button
            onClick={onSubmit}
            disabled={!form.foodName.trim()}
            className="px-5 py-2 rounded-xl bg-[#AA7D36] hover:bg-[#91682d] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editing ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </div>
    </div>
  );
}
