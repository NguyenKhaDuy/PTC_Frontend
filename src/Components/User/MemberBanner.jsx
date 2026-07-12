import { Gift } from "lucide-react";

export default function MemberBanner() {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-12 mb-16">
      <div className="bg-gradient-to-r from-[#AA7D36] to-[#8a5d1f] rounded-2xl p-6 md:p-10 text-center">
        <Gift className="mx-auto mb-3" size={30} />

        <h2 className="text-xl md:text-2xl font-bold">
          Đăng ký thành viên để nhận thêm ưu đãi
        </h2>

        <p className="text-white/80 mt-2">
          Nhận voucher mỗi tuần và giảm giá lên đến 50%
        </p>

        <button className="mt-4 bg-black/30 px-6 py-2 rounded-full font-semibold">
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
}
