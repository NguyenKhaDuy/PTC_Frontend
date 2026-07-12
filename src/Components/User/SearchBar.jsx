import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center bg-[#181818] rounded-2xl px-5 py-4 border border-[#2d2d2d]">
      <Search size={22} className="text-gray-400" />

      <input
        type="text"
        placeholder="Tìm kiếm phim..."
        className="bg-transparent outline-none ml-4 flex-1"
      />
    </div>
  );
}
