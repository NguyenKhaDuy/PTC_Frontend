export default function SectionTitle({ title, icon }) {
  return (
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-3">
        {icon}

        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      <button className="text-[#AA7D36] hover:text-[#c99b4a] transition">
        Xem tất cả →
      </button>
    </div>
  );
}
