import { Search } from "lucide-react";

export default function BranchSearch({ search, setSearch }) {
  return (
    <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm tên rạp..."
          className="w-full pl-12 pr-4 py-3 bg-[#101010] rounded-xl border border-[#2d2d2d] outline-none focus:border-[#AA7D36]"
        />
      </div>
    </div>
  );
}
