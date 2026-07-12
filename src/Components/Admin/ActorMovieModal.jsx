import { useEffect, useMemo, useState } from "react";
import { X, Search } from "lucide-react";

export default function ActorMovieModal({
  open,
  actors = [],
  selectedActors = [],
  loading = false,
  onClose,
  onSave,
}) {
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (open) {
      setSelected(selectedActors);
      setKeyword("");
    }
  }, [open, selectedActors]);

  const handleCheck = (idActor) => {
    setSelected((prev) => {
      const exist = prev.find((a) => a.idActor === idActor);

      if (exist) {
        return prev.filter((a) => a.idActor !== idActor);
      }

      return [
        ...prev,
        {
          idActor,
          is_main: false,
        },
      ];
    });
  };

  const handleMainChange = (idActor) => {
    setSelected((prev) =>
      prev.map((actor) =>
        actor.idActor === idActor
          ? {
              ...actor,
              is_main: !actor.is_main,
            }
          : actor,
      ),
    );
  };

  const filteredActors = useMemo(() => {
    return actors.filter((actor) =>
      (actor.name || "").toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [actors, keyword]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-5">
      <div className="w-full max-w-2xl rounded-2xl border border-[#333] bg-[#181818] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#333] bg-[#202020] px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            Thêm diễn viên cho phim
          </h2>

          <button
            onClick={onClose}
            className="text-gray-300 hover:text-red-400 transition"
          >
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm diễn viên..."
              className="w-full h-11 rounded-xl border border-[#333] bg-[#111] pl-11 pr-4 text-white outline-none focus:border-[#AA7D36]"
            />
          </div>

          {/* Selected count */}
          <div className="text-sm text-gray-400">
            Đã chọn{" "}
            <span className="font-semibold text-[#AA7D36]">
              {selected.length}
            </span>{" "}
            diễn viên
          </div>

          {/* List */}
          <div className="h-[400px] overflow-y-auto rounded-xl border border-[#333] bg-[#111]">
            {filteredActors.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500">
                Không có diễn viên
              </div>
            )}

            {filteredActors.map((actor) => {
              const checked = selected.some(
                (item) => item.idActor === actor.idActor,
              );

              const actorSelected = selected.find(
                (item) => item.idActor === actor.idActor,
              );

              return (
                <label
                  key={actor.idActor}
                  className={`flex cursor-pointer items-center justify-between border-b px-5 py-4 transition
        ${
          checked
            ? "bg-[#AA7D36]/20 border-[#AA7D36]"
            : "border-[#222] hover:bg-[#202020]"
        }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        actor.image
                          ? `data:image/jpeg;base64,${actor.image}`
                          : "/default-avatar.png"
                      }
                      alt={actor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <div
                        className={`font-medium ${
                          checked ? "text-[#AA7D36]" : "text-white"
                        }`}
                      >
                        {actor.name}
                      </div>

                      <div className="text-sm text-gray-400">
                        {actor.description}
                      </div>

                      {checked && (
                        <label className="mt-2 flex items-center gap-2 text-sm text-yellow-400">
                          <input
                            type="checkbox"
                            checked={actorSelected?.is_main || false}
                            onChange={() => handleMainChange(actor.idActor)}
                            className="accent-yellow-500"
                          />
                          Diễn viên chính
                        </label>
                      )}

                      {/* Danh sách phim đã tham gia */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {actor.actorMovieDTOS?.map((movie) => (
                          <span
                            key={movie.idMovie}
                            className="rounded-full bg-[#333] px-2 py-1 text-xs text-gray-300"
                          >
                            {movie.nameMovie}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCheck(actor.idActor)}
                    className="h-5 w-5 accent-[#AA7D36]"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#333] bg-[#202020] px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl bg-gray-600 px-6 py-3 text-white hover:bg-gray-700"
          >
            Hủy
          </button>

          <button
            disabled={loading}
            onClick={() => {
              onSave(selected);
            }}
            className="rounded-xl bg-[#AA7D36] px-6 py-3 text-white hover:bg-[#8c6529] disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
