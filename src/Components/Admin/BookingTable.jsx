export default function BookingTable({ bookings }) {
  return (
    <div className="bg-[#181818] border border-[#2d2d2d] rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#202020]">
          <tr className="text-left">
            <th className="px-6 py-4">Mã</th>
            <th>Khách hàng</th>
            <th>Phim</th>
            <th>Rạp</th>
            <th>Ghế</th>
            <th>Tổng</th>
            <th>Trạng thái</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-t border-[#2d2d2d]">
              <td className="px-6 py-5 font-semibold">{b.id}</td>
              <td>
                <p>{b.customerName}</p>
                <p className="text-xs text-gray-400">{b.phoneCustomer}</p>
              </td>
              <td>{b.movie}</td>
              <td>{b.branch}</td>
              <td>{b.seats}</td>
              <td className="text-[#AA7D36] font-semibold">
                {b.total.toLocaleString()}đ
              </td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    b.status === "PAID"
                      ? "bg-green-500/20 text-green-400"
                      : b.status === "PENDING"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
