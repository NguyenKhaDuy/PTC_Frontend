import { X, Star } from "lucide-react";

export default function ActorDetailModal({ open, actor, onClose }) {
  if (!open || !actor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#181818] rounded-2xl w-full max-w-3xl border border-[#2d2d2d]">
        <div className="flex justify-between items-center p-6 border-b border-[#2d2d2d]">
          <h2 className="text-2xl font-bold">Chi tiết diễn viên</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-6">
            <img
              src={
                actor.image
                  ? `data:image/jpeg;base64,${actor.image}`
                  : "/images/default-avatar.png"
              }
              className="w-40 h-52 object-cover rounded-xl"
            />

            <div className="flex-1 space-y-4">
              <div>
                <p className="text-gray-500">Tên diễn viên</p>
                <h3 className="text-3xl font-bold">{actor.name}</h3>
              </div>

              <div>
                <p className="text-gray-500">ID</p>
                <p>{actor.idActor}</p>
              </div>

              <div>
                <p className="text-gray-500 mb-2">Mô tả</p>
                <p className="text-gray-300">{actor.description}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-3">Danh sách phim</h4>

            <div className="flex flex-wrap gap-2">
              {actor.actorMovieDTOS?.length > 0 ? (
                actor.actorMovieDTOS.map((movie) => (
                  <span
                    key={movie.idMovie}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${
                      movie._main
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                        : "bg-[#252525] text-gray-300"
                    }`}
                  >
                    {movie._main && <Star size={14} fill="currentColor" />}

                    {movie.nameMovie}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Chưa tham gia phim nào</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
