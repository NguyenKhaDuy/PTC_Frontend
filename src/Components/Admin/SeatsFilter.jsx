import { Search, ChevronDown } from "lucide-react";

export default function SeatsFilter(props) {
  const {
    search,
    setSearch,
    selectedBranch,
    selectedRoom,
    selectedSeatType,
    branches,
    rooms,
    seatTypes,
    handleBranchChange,
    handleRoomChange,
    setSelectedSeatType,
  } = props;

  const selectStyle =
    "w-56 h-12 bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 pr-10 appearance-none text-white outline-none cursor-pointer " +
    "focus:border-[#AA7D36] focus:ring-1 focus:ring-[#AA7D36] transition";

  const wrapperStyle = "relative w-56";

  return (
    <div className="bg-[#181818] border border-[#2d2d2d] rounded-2xl p-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* SEARCH */}
        <div className="relative flex-1 min-w-[260px] max-w-[350px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên ghế..."
            className="
              w-full h-12 bg-[#101010]
              border border-[#2d2d2d]
              rounded-xl pl-11 pr-4
              text-white placeholder:text-gray-500
              focus:border-[#AA7D36] focus:ring-1 focus:ring-[#AA7D36]
              outline-none transition
            "
          />
        </div>

        {/* BRANCH */}
        <div className={wrapperStyle}>
          <select
            value={selectedBranch}
            onChange={(e) => handleBranchChange(e.target.value)}
            className={selectStyle}
          >
            <option value="">Chi nhánh</option>
            {branches.map((b) => (
              <option key={b.idBranch} value={b.idBranch}>
                {b.nameBranch}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>

        {/* ROOM */}
        <div className={wrapperStyle}>
          <select
            value={selectedRoom}
            onChange={(e) => handleRoomChange(e.target.value)}
            disabled={!selectedBranch}
            className={`${selectStyle} disabled:opacity-50`}
          >
            <option value="">Phòng</option>
            {rooms.map((r) => (
              <option key={r.idRoom} value={r.idRoom}>
                {r.name}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>

        {/* SEAT TYPE */}
        <div className={wrapperStyle}>
          <select
            value={selectedSeatType}
            onChange={(e) => setSelectedSeatType(e.target.value)}
            className={selectStyle}
          >
            <option value="">Loại ghế</option>
            {seatTypes.map((t) => (
              <option key={t.idSeatType} value={t.idSeatType}>
                {t.type}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
