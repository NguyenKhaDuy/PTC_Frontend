import { Plus } from "lucide-react";

export default function CategoryHeader({ onAdd }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Quản lý thể loại</h1>

        <p className="text-gray-400 mt-1">Quản lý danh mục thể loại phim.</p>
      </div>

      <button
        onClick={onAdd}
        className="h-12 px-6 rounded-xl bg-[#AA7D36] hover:bg-[#91692f] flex items-center gap-2 font-semibold"
      >
        <Plus size={18} />
        Thêm thể loại
      </button>
    </div>
  );
}
