import { Search } from "lucide-react";

export default function ActorSearch({ search, setSearch }) {
  return (
    <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Tìm kiếm theo tên diễn viên..."
          className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#AA7D36]"
        />
      </div>
    </div>
  );
}
