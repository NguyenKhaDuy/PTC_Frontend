export default function CategoryModal({
  open,
  isEdit,
  nameCategory,
  setNameCategory,
  onClose,
  onSave,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-[#181818] p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Cập nhật thể loại" : "Thêm thể loại"}
        </h2>

        <input
          value={nameCategory}
          onChange={(e) => setNameCategory(e.target.value)}
          className="w-full h-12 px-4 rounded-lg bg-[#101010] border border-[#2d2d2d]"
          placeholder="Tên thể loại..."
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded-lg"
          >
            Hủy
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 bg-[#AA7D36] rounded-lg"
          >
            {isEdit ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
}
