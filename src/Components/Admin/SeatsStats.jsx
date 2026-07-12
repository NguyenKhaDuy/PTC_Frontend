export default function SeatsStats({ filteredSeats, seatTypes }) {
  return (
    <div
      className="grid gap-5"
      style={{
        gridTemplateColumns: `repeat(${seatTypes.length + 1}, minmax(0,1fr))`,
      }}
    >
      <div className="bg-[#181818] p-5 rounded-2xl">
        <p className="text-gray-400">Tổng ghế</p>
        <h2 className="text-3xl font-bold mt-2">{filteredSeats.length}</h2>
      </div>

      {seatTypes.map((type) => (
        <div key={type.idSeatType} className="bg-[#181818] p-5 rounded-2xl">
          <p className="text-gray-400">{type.type}</p>
          <h2 className="text-3xl font-bold text-[#AA7D36] mt-2">
            {
              filteredSeats.filter(
                (s) => s.seatTypeDTO?.idSeatType === type.idSeatType,
              ).length
            }
          </h2>
        </div>
      ))}
    </div>
  );
}
