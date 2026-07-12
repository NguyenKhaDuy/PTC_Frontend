import { Pencil, Trash2 } from "lucide-react";

export default function CategoryTable({
  categories,
  loading,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-[#181818] border border-[#2d2d2d] rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#202020]">
          <tr>
            <th className="px-6 py-4 text-left">ID</th>
            <th className="text-left">Tên thể loại</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="text-center py-10">
                Đang tải...
              </td>
            </tr>
          ) : (
            categories.map((item) => (
              <tr key={item.idCategory} className="border-t border-[#2d2d2d]">
                <td className="px-6 py-5">#{item.idCategory}</td>

                <td>{item.name_category}</td>

                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="w-10 h-10 bg-yellow-500/20 rounded-lg flex justify-center items-center"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(item.idCategory)}
                      className="w-10 h-10 bg-red-500/20 rounded-lg flex justify-center items-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
