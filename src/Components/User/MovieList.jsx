import ShowtimeMovieCard from "./ShowtimeMovieCard";

const formatDateArray = (arr) => {
  if (!arr || arr.length < 3) return "";
  const [y, m, d] = arr;
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
};

export default function MovieList({ schedules = [], date }) {
  const filtered = schedules.filter((s) => {
    return formatDateArray(s.date) === date;
  });

  if (!filtered.length) {
    return (
      <div className="text-gray-500 text-center mt-10">Không có lịch chiếu</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {filtered.map((s) => (
        <ShowtimeMovieCard key={s.idSchedule} schedule={s} />
      ))}
    </div>
  );
}
