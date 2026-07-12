export default function DateFilter({ days, date, setDate }) {
  return (
    <div className="max-w-6xl mx-auto mb-10">
      <h2 className="text-lg font-bold mb-3">Ngày chiếu</h2>

      <div className="flex gap-3 flex-wrap">
        {days.map((d) => (
          <button
            key={d.value}
            onClick={() => setDate(d.value)}
            className={`px-4 py-2 rounded-lg transition ${
              date === d.value ? "bg-[#AA7D36]" : "bg-[#1c1c1c] hover:bg-[#333]"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}
