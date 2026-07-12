export default function QuickBooking() {
  return (
    <section className="-mt-16 relative z-30">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#161616] border border-[#AA7D36]/30 p-8 backdrop-blur-lg shadow-xl">
          <div className="grid lg:grid-cols-5 gap-5">
            <select className="bg-[#222] rounded-xl p-4">
              <option>Chọn phim</option>
            </select>

            <select className="bg-[#222] rounded-xl p-4">
              <option>Rạp</option>
            </select>

            <select className="bg-[#222] rounded-xl p-4">
              <option>Ngày</option>
            </select>

            <select className="bg-[#222] rounded-xl p-4">
              <option>Suất chiếu</option>
            </select>

            <button className="rounded-xl bg-[#AA7D36] hover:bg-[#8f6424] font-bold">
              Đặt vé ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
