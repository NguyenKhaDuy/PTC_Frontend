export default function RoomPagination({ currentPage, totalPage, onChange }) {
  return (
    <div className="flex justify-end gap-2">
      {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`w-10 h-10 rounded-xl ${
            currentPage === page ? "bg-[#AA7D36]" : "bg-[#202020]"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
