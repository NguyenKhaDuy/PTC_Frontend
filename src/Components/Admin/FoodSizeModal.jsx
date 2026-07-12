import { X } from "lucide-react";

export default function FoodSizeModal({
  open,
  onClose,
  form,
  setForm,
  sizes,
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
            {editing ? "Cập nhật size món ăn" : "Thêm size món ăn"}
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
              Chọn size
            </label>

            <select
              value={form.idSize}
              disabled={editing}
              onChange={(e) =>
                setForm({
                  ...form,
                  idSize: Number(e.target.value),
                })
              }
              className={`w-full rounded-xl px-4 py-3 outline-none border ${
                editing
                  ? "bg-[#1f1f1f] border-[#2d2d2d] text-gray-500 cursor-not-allowed"
                  : "bg-[#101010] border-[#2d2d2d] focus:border-[#AA7D36]"
              }`}
            >
              <option value="">-- Chọn size --</option>

              {sizes.map((item) => (
                <option key={item.idSize} value={item.idSize}>
                  {item.size}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Giá bán</label>

            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
              placeholder="Nhập giá..."
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
            disabled={!form.idSize || !form.price}
            className="px-5 py-2 rounded-xl bg-[#AA7D36] hover:bg-[#91682d] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editing ? "Cập nhật" : "Thêm size"}
          </button>
        </div>
      </div>
    </div>
  );
}
