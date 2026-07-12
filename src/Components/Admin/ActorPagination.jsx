export default function ActorPagination({
  currentPage,
  totalPage,
  setCurrentPage,
}) {
  return (
    <div className="flex justify-end gap-2">
      {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10 rounded-xl ${
            currentPage === page
              ? "bg-[#AA7D36]"
              : "bg-[#202020] hover:bg-[#2b2b2b]"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
