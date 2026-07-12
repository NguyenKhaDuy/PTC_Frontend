import { Mail, Lock, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../Components/Common/ToastProvider";
import GlobalLoading from "../Components/Common/GlobalLoading"

import logo from "../assets/CMC_LOGO.png";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target
      .closest("form")
      .querySelector('input[type="email"]').value;
    const password = e.target
      .closest("form")
      .querySelector('input[type="password"]').value;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || data?.status !== "OK") {
        showToast(data?.message || "Login failed", "error");
        return;
      }

      const loginData = data.data;

      const roles = loginData.roles; // mảng role

      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData));

      if (roles.includes("ADMIN")) {
        navigate("/admin");
      } 
      if(roles.includes("CUSTOMER")){
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error", "error");
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1800&q=80"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      {/* Card */}
      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-[#AA7D36]/30">
        {/* Left */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#1b1b1b] to-[#0B0B0B] p-16">
          <img
            src={logo}
            className="w-48 h-48 object-contain drop-shadow-[0_0_30px_rgba(170,125,54,0.5)]"
            alt=""
          />

          <h1 className="mt-8 text-5xl font-black bg-gradient-to-r from-[#d8bf84] via-[#AA7D36] to-[#8f6424] bg-clip-text text-transparent">
            CMC CINEMA
          </h1>

          <p className="text-gray-400 mt-6 text-center leading-8">
            Trải nghiệm điện ảnh đẳng cấp.
            <br />
            Đặt vé nhanh chóng, tiện lợi và an toàn.
          </p>
        </div>

        {/* Right */}
        <div className="bg-[#111111]/95 backdrop-blur-xl p-12">
          <h2 className="text-4xl font-bold text-white">Đăng nhập</h2>

          <p className="text-gray-400 mt-3">
            Chào mừng bạn quay trở lại CMC Cinema.
          </p>

          <form className="mt-10 space-y-6">
            {/* Email */}

            <div>
              <label className="text-gray-300 mb-2 block">Email</label>

              <div className="flex items-center bg-[#1c1c1c] rounded-xl border border-[#AA7D36]/20 px-4">
                <Mail className="text-[#AA7D36]" />

                <input
                  type="email"
                  placeholder="Nhập email"
                  className="w-full bg-transparent outline-none px-4 py-4 text-white"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="text-gray-300 mb-2 block">Mật khẩu</label>

              <div className="flex items-center bg-[#1c1c1c] rounded-xl border border-[#AA7D36]/20 px-4">
                <Lock className="text-[#AA7D36]" />

                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="w-full bg-transparent outline-none px-4 py-4 text-white"
                />

                <Eye className="cursor-pointer text-gray-500 hover:text-[#AA7D36]" />
              </div>
            </div>

            {/* Remember */}
            <div className="w-full text-right">
              <Link
                to="/forgot-password"
                className="text-[#AA7D36] hover:text-[#d8bf84]"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* Login */}

            <button
              type="submit"
              onClick={handleLogin}
              className="w-full py-4 rounded-xl bg-[#AA7D36] hover:bg-[#8f6424] transition font-bold text-lg shadow-lg shadow-[#AA7D36]/30 hover:scale-[1.02] duration-300"
            >
              Đăng nhập
            </button>

            <div className="text-center pt-2 border-t border-gray-700">
              <p className="text-gray-400 mb-4">Bạn chưa có tài khoản?</p>

              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full py-3 rounded-xl border border-[#AA7D36] text-[#AA7D36] font-semibold hover:bg-[#AA7D36] hover:text-white transition-all duration-300"
              >
                Tạo tài khoản mới
              </Link>
            </div>
          </form>
        </div>
      </div>
      {loading && <GlobalLoading open={loading} text={"Đang xử lý..."} />}
    </div>
  );
}
