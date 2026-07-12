import { Search } from "lucide-react";

export default function RoomToolbar({ search, setSearch }) {
  return (
    <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm phòng..."
            className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl pl-11 pr-4 py-3 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
