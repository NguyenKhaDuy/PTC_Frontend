import { useEffect, useState } from "react";
import GlobalLoading from "../../Components/Common/GlobalLoading";

export default function CinemaPage() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState(null);

  // ===== FETCH BRANCH =====
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3000/api/branch");
        const data = await res.json();

        if (!res.ok) throw new Error(data?.message);

        setBranches(data?.data || []);
        setSelectedBranch(data?.data?.[0] || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen">
      {/* ================= BANNER ================= */}
      <div className="relative h-[350px] bg-[url('https://picsum.photos/1600/600?cinema')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold">Hệ thống rạp chiếu phim</h1>
          <p className="text-gray-300 mt-3">Trải nghiệm điện ảnh đỉnh cao</p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* BRANCH FILTER */}
        <div className="flex gap-3 flex-wrap mb-10">
          {branches.map((b) => (
            <button
              key={b.idBranch}
              onClick={() => setSelectedBranch(b)}
              className={`px-5 py-2 rounded-xl transition ${
                selectedBranch?.idBranch === b.idBranch
                  ? "bg-[#AA7D36]"
                  : "bg-[#1c1c1c] hover:bg-[#333]"
              }`}
            >
              {b.nameBranch}
            </button>
          ))}
        </div>

        {/* CINEMA DETAIL */}
        {selectedBranch && (
          <div className="grid md:grid-cols-2 gap-6">
            {selectedBranch.roomDTOS?.length === 0 && (
              <p className="text-gray-500">Chưa có phòng chiếu</p>
            )}

            {selectedBranch.roomDTOS?.map((room) => (
              <div
                key={room.idRoom}
                className="bg-[#151515] border border-[#222] rounded-2xl p-6 hover:border-[#AA7D36] transition"
              >
                {/* ROOM INFO */}
                <h2 className="text-xl font-bold">{room.name}</h2>

                <p className="text-gray-400 mt-1">
                  Sức chứa: {room.capacity} ghế
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  Diện tích: {room.totalArea} m²
                </p>

                {/* ACTION */}
                <div className="mt-6 flex justify-between items-center">
                  <button className="text-sm text-[#AA7D36] hover:underline">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {loading && <GlobalLoading open={loading} text = {"Đang xử lý..."} />}
    </div>
  );
}
