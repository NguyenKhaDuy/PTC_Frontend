import { Search } from "lucide-react";

export default function BookingFilter({ search, setSearch }) {
  return (
    <div className="bg-[#181818] border border-[#2d2d2d] rounded-2xl p-5">
      <div className="relative flex-1 min-w-[260px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm mã booking hoặc khách hàng..."
          className="w-full h-12 bg-[#101010] border border-[#2d2d2d] rounded-xl pl-11 pr-4"
        />
      </div>
    </div>
  );
}
