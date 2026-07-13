export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#151515] to-[#0f0f0f] py-20">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#AA7D36]/20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-[#AA7D36] uppercase tracking-[6px]">Promotions</p>

        <h1 className="mt-4 text-6xl font-black">Voucher ưu đãi</h1>

        <p className="mt-5 max-w-xl text-lg text-gray-400">
          Nhận ngay các mã giảm giá mới nhất dành cho thành viên và áp dụng khi
          đặt vé trực tuyến.
        </p>
      </div>
    </div>
  );
}
