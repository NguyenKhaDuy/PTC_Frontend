export default function ShowtimeButtons({ cinema, date, showtimes }) {
  const times = showtimes?.[cinema]?.[date];

  if (!cinema)
    return <p className="text-gray-500">Chọn rạp để xem suất chiếu</p>;

  if (!times) return <p className="text-gray-500">Không có suất chiếu</p>;

  return (
    <div className="flex flex-wrap gap-3">
      {times.map((t) => (
        <button
          key={t}
          className="px-4 py-2 rounded-lg bg-[#1c1c1c] hover:bg-[#333]"
        >
          {t}
        </button>
      ))}
    </div>
  );
}
