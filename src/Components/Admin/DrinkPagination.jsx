export default function DrinkPagination({ page, totalPage, onChange }) {
  return (
    <div className="flex justify-end gap-2">
      {Array.from({ length: totalPage }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={`w-10 h-10 rounded-xl ${
            page === i + 1 ? "bg-[#AA7D36]" : "bg-[#202020]"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
