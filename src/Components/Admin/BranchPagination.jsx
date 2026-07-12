export default function BranchPagination({ currentPage, totalPage, onChange }) {
  return (
    <div className="flex justify-end gap-2">
      {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`w-10 h-10 rounded-xl transition ${
            currentPage === page
              ? "bg-[#AA7D36] text-white"
              : "bg-[#202020] hover:bg-[#2b2b2b] text-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
