import MovieRow from "./MovieRow";

export default function MovieTable({
  movies,
  loading,
  onView,
  onEdit,
  onDelete,
  onActor
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#2d2d2d] bg-[#181818]">
      <table className="w-full">
        <thead className="bg-[#202020] text-gray-300">
          <tr>
            <th className="px-6 py-4 text-left">Poster</th>
            <th className="px-6 py-4 text-left">Tên phim</th>
            <th className="px-6 py-4 text-left">Đạo diễn</th>
            <th className="px-6 py-4 text-left">Thể loại</th>
            <th className="px-6 py-4 text-center">Khởi chiếu</th>
            <th className="px-6 py-4 text-center">Trạng thái</th>
            <th className="px-6 py-4 text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center py-10">
                Đang tải...
              </td>
            </tr>
          ) : movies.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-10">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            movies.map((movie) => (
              <MovieRow
                key={movie.idMovie}
                movie={movie}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onActor={onActor}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
