import { useNavigate } from "react-router-dom";

export default function SectionTitle({ title, icon, showViewAll = true }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      {showViewAll && (
        <button
          onClick={() => navigate("/movies")}
          className="text-[#AA7D36] hover:text-[#c99b4a] transition"
        >
          Xem tất cả →
        </button>
      )}
    </div>
  );
}
