import { Search, Filter, ChevronDown } from "lucide-react";

export default function MovieToolbar({
  keyword,
  setKeyword,
  categories,
  category,
  setCategory,
  status,
  setStatus,
  onFilter,
}) {
  return (
    <div className="bg-[#181818] border border-[#2d2d2d] rounded-2xl p-5">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="flex-1 relative min-w-[300px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm tên phim..."
            className="w-full h-12 bg-[#101010] border border-[#2d2d2d] rounded-xl pl-11 pr-4 outline-none focus:border-[#AA7D36]"
          />
        </div>

        {/* Select Thể loại */}
        <div className="relative min-w-[220px]">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-12 rounded-xl border border-[#2d2d2d] bg-[#101010] px-4 pr-10 text-white outline-none appearance-none focus:border-[#AA7D36] cursor-pointer"
          >
            <option value="">Tất cả thể loại</option>

            {categories.map((item) => (
              <option key={item.idCategory} value={item.idCategory}>
                {item.name_category}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Select Trạng thái */}
        <div className="relative min-w-[200px]">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-12 rounded-xl border border-[#2d2d2d] bg-[#101010] px-4 pr-10 text-white outline-none appearance-none focus:border-[#AA7D36] cursor-pointer"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="1">Đang chiếu</option>
            <option value="0">Sắp chiếu</option>
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={onFilter}
          className="h-12 px-6 rounded-xl bg-[#AA7D36] hover:bg-[#8d672c] transition flex items-center gap-2"
        >
          <Filter size={18} />
          Lọc
        </button>
      </div>
    </div>
  );
}
