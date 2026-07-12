import { useState } from "react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OTPVerification from "../../Pages/OTPVerification";
import { useToast } from "../../Components/Common/ToastProvider";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const { showToast } = useToast();

  const [email, setEmail] = useState("");

  const [verified, setVerified] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  // ================= GỬI OTP =================
  const sendOtp = async () => {
    if (!email.trim()) {
      showToast("Vui lòng nhập email", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/api/send-otp/forgotPassword?email=${encodeURIComponent(
          email,
        )}`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      showToast("Đã gửi mã OTP tới email.", "success");

      setShowOtp(true);
    } catch (err) {
      showToast(err.message || "Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  // ================= ĐỔI MẬT KHẨU =================
  const handleSubmit = async () => {
    if (!password.trim()) {
      showToast("Vui lòng nhập mật khẩu mới", "error");
      return;
    }

    if (password.length < 6) {
      showToast("Mật khẩu phải có ít nhất 6 ký tự", "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Mật khẩu xác nhận không khớp", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/api/forgot/password?password=${encodeURIComponent(
          password,
        )}`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      showToast("Đổi mật khẩu thành công", "success");

      navigate("/login");
    } catch (err) {
      showToast(err.message || "Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#0d0d0d] flex justify-center items-center px-4">
        <div className="bg-[#151515] w-full max-w-md rounded-3xl p-8 border border-[#2a2a2a] shadow-xl">
          <h1 className="text-3xl font-bold text-center text-white">
            Quên mật khẩu
          </h1>

          <p className="text-center text-gray-400 mt-2 mb-8">
            {!verified ? "Nhập email để nhận mã OTP" : "Đặt mật khẩu mới"}
          </p>

          {/* ================= EMAIL ================= */}
          {!verified && (
            <>
              <div className="relative mb-6">
                <Mail
                  className="absolute left-4 top-4 text-gray-500"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#222] text-white rounded-xl py-3 pl-12 pr-4 outline-none border border-[#333] focus:border-[#AA7D36]"
                />
              </div>

              <button
                disabled={loading}
                onClick={sendOtp}
                className="w-full bg-[#AA7D36] hover:bg-[#94682d] rounded-xl py-3 font-bold text-white transition disabled:opacity-50"
              >
                {loading ? "Đang gửi..." : "Gửi OTP"}
              </button>
            </>
          )}

          {/* ================= PASSWORD ================= */}
          {verified && (
            <>
              <div className="relative mb-5">
                <Lock
                  className="absolute left-4 top-4 text-gray-500"
                  size={20}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu mới"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#222] text-white rounded-xl py-3 pl-12 pr-12 outline-none border border-[#333] focus:border-[#AA7D36]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative mb-6">
                <Lock
                  className="absolute left-4 top-4 text-gray-500"
                  size={20}
                />

                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#222] text-white rounded-xl py-3 pl-12 pr-12 outline-none border border-[#333] focus:border-[#AA7D36]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-3.5 text-gray-400"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-[#AA7D36] hover:bg-[#94682d] rounded-xl py-3 font-bold text-white transition disabled:opacity-50"
              >
                {loading ? "Đang cập nhật..." : "Đổi mật khẩu"}
              </button>
            </>
          )}

          <button
            onClick={() => navigate("/login")}
            className="w-full mt-5 text-gray-400 hover:text-white"
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>

      {/* ================= OTP MODAL ================= */}
      {showOtp && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <OTPVerification
            onSuccess={() => {
              setShowOtp(false);
              setVerified(true);
            }}
          />
        </div>
      )}
    </>
  );
}
