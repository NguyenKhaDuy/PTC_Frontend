import { CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { status } = useParams();

  const isSuccess = status === "success";
  const isFailed = status === "failed";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-4 relative overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-[#AA7D36] opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* CARD */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl">
          {/* ICON */}
          <div className="flex justify-center mb-6">
            <div
              className={`p-5 rounded-full ${
                isSuccess ? "bg-green-500/10" : ""
              } ${isFailed ? "bg-red-500/10" : ""}`}
            >
              {isSuccess && (
                <CheckCircle size={90} className="text-green-400" />
              )}

              {isFailed && <XCircle size={90} className="text-red-400" />}
            </div>
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-bold mb-3">
            {isSuccess && "Thanh toán thành công"}
            {isFailed && "Thanh toán thất bại"}
            {!isSuccess && !isFailed && "Trạng thái không hợp lệ"}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            {isSuccess &&
              "Giao dịch của bạn đã được xử lý thành công. Bạn có thể xem lại vé trong lịch sử đặt vé."}

            {isFailed &&
              "Giao dịch không thành công. Vui lòng thử lại hoặc chọn phương thức thanh toán khác."}

            {!isSuccess && !isFailed && "Không tìm thấy thông tin giao dịch."}
          </p>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-xl font-semibold bg-[#AA7D36] hover:bg-[#8d672f] transition-all duration-300 shadow-lg shadow-[#AA7D36]/20"
          >
            Quay về trang chủ
          </button>
        </div>

        {/* SMALL FOOTER TEXT */}
        <p className="text-center text-xs text-gray-500 mt-5">
          CMC Cinema Payment System
        </p>
      </div>
    </div>
  );
}
