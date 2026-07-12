export default function ProfileTabs({ tabs, tab, setTab }) {
  return (
    <div className="flex gap-2 mt-6 overflow-auto">
      {tabs.map((t) => {
        const Icon = t.icon;

        return (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full flex items-center gap-2
            ${tab === t.id ? "bg-[#AA7D36]" : "bg-white/5"}`}
          >
            <Icon size={16} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
