export default function GlobalLoading({
  open = false,
  text = "Đang xử lý...",
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm mt-0 pt-0 top-0"
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-[#AA7D36] border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-sm">{text}</p>
      </div>
    </div>
  );
}
