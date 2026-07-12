export default function CinemaFilter({ cinemas = [], cinema, setCinema }) {
  return (
    <div className="max-w-6xl mx-auto mb-6">
      <h2 className="text-lg font-bold mb-3">Phòng chiếu</h2>

      <div className="flex gap-3 flex-wrap">
        {cinemas.map((c) => (
          <button
            key={c.idRoom}
            onClick={() => setCinema(c)}
            className={`px-4 py-2 rounded-lg transition ${
              cinema?.idRoom === c.idRoom
                ? "bg-[#AA7D36]"
                : "bg-[#1c1c1c] hover:bg-[#333]"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
