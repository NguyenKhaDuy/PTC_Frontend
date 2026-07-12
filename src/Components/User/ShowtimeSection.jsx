export default function ShowtimeSection({
  schedules = [],
  selectedSchedule,
  setSelectedSchedule,
}) {
  // ===== GROUP BY BRANCH =====
  const grouped = schedules.reduce((acc, s) => {
    const branch = s.roomDTO?.branchDTO?.nameBranch || "Unknown";

    if (!acc[branch]) acc[branch] = [];
    acc[branch].push(s);

    return acc;
  }, {});

  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold mb-8">Lịch chiếu</h2>

      {Object.keys(grouped).length === 0 && (
        <p className="text-gray-500">Chưa có lịch chiếu</p>
      )}

      <div className="space-y-10">
        {Object.entries(grouped).map(([branchName, items]) => (
          <div key={branchName}>
            {/* BRANCH HEADER */}
            <h3 className="text-[#AA7D36] text-xl font-bold mb-4">
              {branchName}
            </h3>

            <div className="grid gap-4">
              {items.map((s) => (
                <button
                  key={s.idSchedule}
                  onClick={() => setSelectedSchedule(s)}
                  className={`text-left p-5 rounded-2xl border transition
                    ${
                      selectedSchedule?.idSchedule === s.idSchedule
                        ? "border-[#AA7D36] bg-[#1c1c1c]"
                        : "border-[#2a2a2a] bg-[#151515] hover:border-[#AA7D36]"
                    }`}
                >
                  {/* ROOM */}
                  <div className="text-sm text-gray-400">
                    Phòng: {s.roomDTO?.name} • Sức chứa: {s.roomDTO?.capacity}
                  </div>

                  {/* TIME */}
                  <div className="mt-2 text-white font-medium">
                    {s.date?.join("/")} • {s.timeStart?.join(":")} -{" "}
                    {s.timeEnd?.join(":")}
                  </div>

                  {/* PRICE */}
                  <div className="mt-2 text-gray-300">
                    Giá: {s.basePrice?.toLocaleString()}đ
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
