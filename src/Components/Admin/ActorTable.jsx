import { Eye, Pencil, Trash2, Star } from "lucide-react";

export default function ActorTable({ actors, onView, onEdit, onDelete }) {
  return (
    <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] overflow-hidden">
      <table className="w-full table-fixed">
        <thead className="bg-[#202020]">
          <tr className="text-sm uppercase text-gray-400">
            <th className="w-[30%] px-6 py-4 text-left">Diễn viên</th>

            <th className="w-[20%] px-6 py-4 text-left">Mô tả</th>

            <th className="w-[20%] px-6 py-4 text-left">Phim tham gia</th>

            <th className="w-[10%] px-6 py-4 text-center">Số phim</th>

            <th className="w-[20%] px-6 py-4 text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {actors.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-10 text-center text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            actors.map((actor) => (
              <tr
                key={actor.idActor}
                className="border-t border-[#2d2d2d] hover:bg-[#202020] transition"
              >
                {/* DIỄN VIÊN */}
                <td className="px-6 py-5 align-middle">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        actor.image
                          ? `data:image/jpeg;base64,${actor.image}`
                          : "/images/default-avatar.png"
                      }
                      alt={actor.name}
                      className="w-14 h-14 rounded-xl object-cover border border-[#2d2d2d] shrink-0"
                    />

                    <div className="min-w-0">
                      <p className="font-semibold truncate">{actor.name}</p>

                      <p className="text-xs text-gray-500 mt-1">
                        ID #{actor.idActor}
                      </p>
                    </div>
                  </div>
                </td>

                {/* MÔ TẢ */}
                <td className="px-6 py-5 align-middle">
                  <p
                    className="max-w-[200px] truncate text-sm text-gray-300"
                    title={actor.description}
                  >
                    {actor.description || "-"}
                  </p>
                </td>

                {/* PHIM */}
                <td className="px-6 py-5">
                  {actor.actorMovieDTOS?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {actor.actorMovieDTOS.map((movie) => (
                        <span
                          key={movie.idMovie}
                          title={movie.nameMovie}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm max-w-[180px] truncate ${
                            movie._main
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 font-semibold"
                              : "bg-[#252525] text-gray-300 border border-[#333]"
                          }`}
                        >
                          {movie._main && (
                            <Star size={14} fill="currentColor" />
                          )}

                          <span className="truncate">{movie.nameMovie}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">Chưa tham gia</span>
                  )}
                </td>

                {/* SỐ PHIM */}
                <td className="px-6 py-5 text-center align-middle">
                  <span className="inline-flex w-9 h-9 rounded-full bg-yellow-500/20 text-yellow-400 items-center justify-center font-bold">
                    {actor.actorMovieDTOS?.length ?? 0}
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-6 py-5 align-middle">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(actor.idActor)}
                      className="w-10 h-10 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 flex items-center justify-center transition"
                      title="Xem chi tiết"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(actor)}
                      className="w-10 h-10 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 flex items-center justify-center transition"
                      title="Chỉnh sửa"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(actor)}
                      className="w-10 h-10 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center transition"
                      title="Xóa"
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
