import { useEffect, useState } from "react";
import CinemaFilter from "../../Components/User/CinemaFilter";
import DateFilter from "../../Components/User/DateFilter";
import MovieList from "../../Components/User/MovieList";
import GlobalLoading from "../../Components/Common/GlobalLoading";

function getNext7Days() {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);

    days.push({
      label: d.toLocaleDateString("vi-VN", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      }),
      value: d.toISOString().split("T")[0],
    });
  }
  return days;
}

export default function ShowtimePage() {
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(null);
  const [room, setRoom] = useState(null);
  const [date, setDate] = useState(getNext7Days()[0].value);
  const [loading, setLoading] = useState(false);

  const days = getNext7Days();

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/branch");
        const data = await res.json();

        if (!res.ok) throw new Error(data?.message);

        setBranches(data?.data || []);
        setBranch(data?.data?.[0] || null);
        setRoom(null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const schedules = room?.scheduleDTOS || [];

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      {/* ================= HERO ================= */}
      <div className="relative h-[220px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1600/600?cinema')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0B0B0B]" />

        <div className="relative text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Lịch chiếu phim</h1>
          <p className="text-gray-400 mt-2">
            Chọn rạp • chọn phòng • chọn suất chiếu
          </p>
        </div>
      </div>

      {/* ================= CONTENT WRAPPER ================= */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* ================= BRANCH ================= */}
        <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
          <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-3">
            Hệ thống rạp
          </h2>

          <div className="flex gap-3 flex-wrap">
            {branches.map((b) => (
              <button
                key={b.idBranch}
                onClick={() => {
                  setBranch(b);
                  setRoom(null);
                }}
                className={`px-4 py-2 rounded-xl transition-all border ${
                  branch?.idBranch === b.idBranch
                    ? "bg-[#AA7D36] text-black border-[#AA7D36]"
                    : "bg-[#1c1c1c] border-[#2a2a2a] hover:border-[#AA7D36]"
                }`}
              >
                {b.nameBranch}
              </button>
            ))}
          </div>
        </div>

        {/* ================= ROOM ================= */}
        {branch && (
          <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
            <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-3">
              Phòng chiếu
            </h2>

            <CinemaFilter
              cinemas={branch.roomDTOS || []}
              cinema={room}
              setCinema={setRoom}
            />
          </div>
        )}

        {/* ================= DATE ================= */}
        <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
          <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-3">
            Ngày chiếu
          </h2>

          <DateFilter days={days} date={date} setDate={setDate} />
        </div>

        {/* ================= SCHEDULE ================= */}
        <div className="space-y-6">
          <MovieList schedules={schedules} date={date} />
        </div>
      </div>
      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </div>
  );
}
