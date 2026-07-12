import { useEffect, useState } from "react";

export default function CategoryFilter({ onSelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3000/api/category");
        const data = await res.json();

        if (!res.ok) throw new Error(data?.message);

        setCategories(data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSelect = (id) => {
    setSelected(id);
    onSelect?.(id); // gửi lên parent nếu cần filter phim
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {/* All button */}
      <button
        onClick={() => handleSelect("all")}
        className={`px-6 py-3 rounded-full transition ${
          selected === "all"
            ? "bg-[#AA7D36]"
            : "bg-[#1d1d1d] hover:bg-[#AA7D36]"
        }`}
      >
        Tất cả
      </button>

      {/* Loading */}
      {loading && <div className="text-gray-400 px-4 py-2">Đang tải...</div>}

      {/* Categories */}
      {categories.map((item) => (
        <button
          key={item.idCategory}
          onClick={() => handleSelect(item.idCategory)}
          className={`px-6 py-3 rounded-full transition ${
            selected === item.idCategory
              ? "bg-[#AA7D36]"
              : "bg-[#1d1d1d] hover:bg-[#AA7D36]"
          }`}
        >
          {item.name_category}
        </button>
      ))}
    </div>
  );
}
