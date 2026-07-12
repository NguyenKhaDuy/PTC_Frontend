export default function PromotionFilter({ tabs, active, setActive }) {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-8 flex gap-3 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActive(tab.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            active === tab.value
              ? "bg-[#AA7D36] text-white"
              : "bg-[#1a1a1a] text-gray-300 hover:bg-[#222]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
