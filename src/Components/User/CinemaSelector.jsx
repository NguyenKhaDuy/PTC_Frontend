export default function CinemaSelector({
  branches,
  selectedBranch,
  setSelectedBranch,
}) {
  return (
    <div className="max-w-6xl mx-auto mb-10">
      <h2 className="text-xl font-bold mb-4">Chọn rạp chiếu</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch) => (
          <button
            key={branch.idBranch}
            onClick={() => setSelectedBranch(branch)}
            className={`rounded-2xl border p-5 text-left transition ${
              selectedBranch?.idBranch === branch.idBranch
                ? "bg-[#AA7D36] border-[#AA7D36]"
                : "bg-[#151515] border-white/10 hover:border-[#AA7D36]"
            }`}
          >
            <h3 className="font-bold text-lg">{branch.nameBranch}</h3>

            <p className="text-sm text-white mt-2">{branch.address}</p>

            <p className="text-sm text-white mt-2">☎ {branch.phone}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
