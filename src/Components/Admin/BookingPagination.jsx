export default function BookingPagination({ page, totalPage, setPage }) {
  return (
    <div className="flex justify-end gap-2">
      {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`w-10 h-10 rounded-xl ${
            p === page ? "bg-[#AA7D36]" : "bg-[#202020] hover:bg-[#2d2d2d]"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
