export default function ActorStatistics({ actors }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
        <p className="text-gray-400">Tổng diễn viên</p>
        <h2 className="text-3xl font-bold mt-2">{actors.length}</h2>
      </div>

      <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
        <p className="text-gray-400">Tổng phim tham gia</p>
        <h2 className="text-3xl font-bold text-yellow-400 mt-2">
          {actors.reduce(
            (sum, actor) => sum + (actor.actorMovieDTOS?.length ?? 0),
            0,
          )}
        </h2>
      </div>
    </div>
  );
}
