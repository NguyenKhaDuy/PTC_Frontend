export default function ScheduleFilter({
  branches,
  movies,
  selectedBranch,
  selectedMovie,
  setSelectedBranch,
  setSelectedMovie,
}) {
  return (
    <div className="bg-[#181818] border border-[#2d2d2d] rounded-2xl p-5">
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 min-w-[220px]"
        >
          {branches.map((b) => (
            <option key={b.idBranch} value={b.idBranch}>
              {b.nameBranch}
            </option>
          ))}
        </select>

        <select
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
          className="bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 min-w-[250px]"
          disabled={movies.length === 0}
        >
          {movies.length === 0 ? (
            <option>Không có phim</option>
          ) : (
            movies.map((m) => (
              <option key={m.idMovie} value={m.idMovie}>
                {m.nameMovie}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
}
