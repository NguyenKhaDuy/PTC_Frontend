import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Eye } from "lucide-react";
import { useState } from "react";
import logo from "../assets/CMC_LOGO.png";
import OTPVerification from "./OTPVerification";
import { useToast } from "../Components/Common/ToastProvider";
import GlobalLoading from "../Components/Common/GlobalLoading";

export default function RegisterPage() {
  const [showOtp, setShowOtp] = useState(false);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    try {
      if (
        !form.fullName ||
        !form.email ||
        !form.phone ||
        !form.dob ||
        !form.password
      ) {
        showToast("Vui lòng nhập đầy đủ thông tin", "error");
        return;
      }

      if (form.password !== form.confirmPassword) {
        showToast("Mật khẩu không khớp", "error");
        return;
      }

      setLoading(true); 

      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          dob: form.dob,
          password: form.password,
        }),
      });

      const data = await res.json();

     if (!res.ok) {
       showToast(data?.message || "Đăng ký thất bại", "error");
       setLoading(false);
       return;
     }

      showToast("Mã OTP đã được gửi về email của bạn!", "success");

      setShowOtp(true); 
    } catch (err) {
      console.error(err);
      showToast("Server error", "error");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6 py-10 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1800&q=80"
          className="w-full h-full object-cover opacity-20"
          alt=""
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
      </div>

      {/* Register Card */}
      <div className="relative w-full max-w-7xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-[#AA7D36]/30 shadow-2xl">
        {/* Left */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#1b1b1b] to-[#0B0B0B] p-16">
          <img
            src={logo}
            alt=""
            className="w-44 h-44 object-contain drop-shadow-[0_0_30px_rgba(170,125,54,.4)]"
          />

          <h1 className="mt-8 text-5xl font-black bg-gradient-to-r from-[#d8bf84] via-[#AA7D36] to-[#8f6424] bg-clip-text text-transparent">
            CMC CINEMA
          </h1>

          <p className="text-gray-400 text-center mt-8 leading-8 max-w-md">
            Tạo tài khoản để đặt vé nhanh chóng, lưu lịch sử giao dịch và nhận
            nhiều ưu đãi hấp dẫn dành riêng cho thành viên.
          </p>
        </div>

        {/* Right */}
        <div className="bg-[#111111]/95 backdrop-blur-xl p-10">
          <h2 className="text-4xl font-bold text-white">Đăng ký tài khoản</h2>

          <p className="text-gray-400 mt-2">
            Chỉ mất chưa đến 1 phút để tạo tài khoản.
          </p>

          <form className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-2 text-gray-300">Họ và tên</label>

              <div className="flex items-center bg-[#1c1c1c] rounded-xl border border-[#AA7D36]/20 px-4">
                <User className="text-[#AA7D36]" />

                <input
                  type="text"
                  placeholder="Nhập họ tên"
                  className="w-full bg-transparent outline-none px-4 py-4 text-white"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-gray-300">Email</label>

              <div className="flex items-center bg-[#1c1c1c] rounded-xl border border-[#AA7D36]/20 px-4">
                <Mail className="text-[#AA7D36]" />

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full bg-transparent outline-none px-4 py-4 text-white"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-gray-300">Số điện thoại</label>

              <div className="flex items-center bg-[#1c1c1c] rounded-xl border border-[#AA7D36]/20 px-4">
                <Phone className="text-[#AA7D36]" />

                <input
                  type="text"
                  placeholder="09xxxxxxxx"
                  className="w-full bg-transparent outline-none px-4 py-4 text-white"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            {/* DOB */}
            <div>
              <label className="block mb-2 text-gray-300">Ngày sinh</label>

              <div className="flex items-center bg-[#1c1c1c] rounded-xl border border-[#AA7D36]/20 px-4">
                <input
                  type="date"
                  className="w-full bg-transparent outline-none px-4 py-4 text-white"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-gray-300">Mật khẩu</label>

                <div className="flex items-center bg-[#1c1c1c] rounded-xl border border-[#AA7D36]/20 px-4">
                  <Lock className="text-[#AA7D36]" />

                  <input
                    type="password"
                    placeholder="********"
                    className="w-full bg-transparent outline-none px-4 py-4 text-white"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />

                  <Eye className="text-gray-500 cursor-pointer" />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-300">Xác nhận</label>

                <div className="flex items-center bg-[#1c1c1c] rounded-xl border border-[#AA7D36]/20 px-4">
                  <Lock className="text-[#AA7D36]" />

                  <input
                    type="password"
                    placeholder="********"
                    className="w-full bg-transparent outline-none px-4 py-4 text-white"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        confirmPassword: e.target.value,
                      })
                    }
                  />

                  <Eye className="text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-3 text-gray-400">
              <input type="checkbox" className="mt-1" />

              <span>
                Tôi đồng ý với
                <span className="text-[#AA7D36] cursor-pointer">
                  {" "}
                  Điều khoản sử dụng
                </span>{" "}
                và{" "}
                <span className="text-[#AA7D36] cursor-pointer">
                  Chính sách bảo mật
                </span>
              </span>
            </label>

            {/* Button */}
            <button
              type="button"
              onClick={handleRegister}
              className="w-full py-4 rounded-xl bg-[#AA7D36] hover:bg-[#8f6424] transition font-bold text-lg shadow-lg shadow-[#AA7D36]/30"
            >
              Đăng ký
            </button>

            <p className="text-center text-gray-400">
              Đã có tài khoản?
              <Link
                to="/login"
                className="text-[#AA7D36] ml-2 hover:text-[#d8bf84]"
              >
                Đăng nhập
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* OTP */}
      {showOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative">
            <button
              onClick={() => setShowOtp(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#242424] text-white hover:bg-red-500 flex items-center justify-center"
            >
              ✕
            </button>

            <OTPVerification
              onSuccess={() => {
                setShowOtp(false);
                navigate("/login");
              }}
            />
          </div>
        </div>
      )}

      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </div>
  );
}
