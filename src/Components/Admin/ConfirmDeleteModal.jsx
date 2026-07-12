import { TriangleAlert } from "lucide-react";

export default function ConfirmDeleteModal({
  open,
  title = "Xóa phim",
  message,
  onCancel,
  onConfirm,
  loading,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm" style={{margin: 0}}>
      <div className="w-full max-w-md rounded-2xl bg-[#181818] border border-[#333] shadow-2xl">
        <div className="flex flex-col items-center p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20">
            <TriangleAlert className="text-red-500" size={42} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white">{title}</h2>

          <p className="mt-3 text-center text-gray-400">{message}</p>

          <div className="mt-8 flex w-full gap-4">
            <button
              disabled={loading}
              onClick={onCancel}
              className="flex-1 rounded-xl bg-gray-600 py-3 hover:bg-gray-700 transition"
            >
              Hủy
            </button>

            <button
              disabled={loading}
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-red-600 py-3 hover:bg-red-700 transition"
            >
              {loading ? "Đang xóa..." : "Xóa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
