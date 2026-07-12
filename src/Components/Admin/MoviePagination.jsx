export default function MoviePagination({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-end gap-3">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`w-10 h-10 rounded-xl ${
            page === i + 1 ? "bg-[#AA7D36] text-white" : "bg-[#202020]"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
