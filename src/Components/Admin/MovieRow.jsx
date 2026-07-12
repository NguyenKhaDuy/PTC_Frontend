import { Eye, Pencil, Trash2, Users } from "lucide-react";

export default function MovieRow({ movie, onView, onEdit, onDelete, onActor }) {
  const formatDate = (date) => {
    if (!date) return "";
    return `${String(date[2]).padStart(2, "0")}/${String(date[1]).padStart(
      2,
      "0",
    )}/${date[0]}`;
  };

  const status = movie.showing === true ? "Đang chiếu" : "Sắp chiếu";

  const imageSrc = movie.smallImage
    ? `data:image/jpeg;base64,${movie.smallImage}`
    : "https://picsum.photos/80/120";

  return (
    <tr className="border-t border-[#2d2d2d] hover:bg-[#202020] transition">
      <td className="px-6 py-4">
        <img
          src={imageSrc}
          alt={movie.nameMovie}
          className="w-16 h-24 rounded-xl object-cover shadow"
        />
      </td>

      <td className="px-6 py-4 font-semibold">{movie.nameMovie}</td>

      <td className="px-6 py-4">{movie.director}</td>

      <td className="px-6 py-4">{movie.category}</td>

      <td className="px-6 py-4 text-center">{formatDate(movie.releaseDate)}</td>

      <td className="px-6 py-4 text-center">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            status === "Đang chiếu"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => onView(movie.idMovie)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 hover:bg-sky-500 hover:text-white transition"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onEdit?.(movie.idMovie)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500 hover:text-white transition"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete?.(movie.idMovie)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            <Trash2 size={18} />
          </button>

          <button
            onClick={() => onActor?.(movie.idMovie)}
            className="flex items-center justify-center w-10 h-10 rounded-xl
  bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white transition"
          >
            <Users size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
