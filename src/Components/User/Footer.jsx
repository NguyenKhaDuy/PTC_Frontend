import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

import logo from "../../assets/CMC_LOGO.png";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] border-t border-[#AA7D36]/20 mt-20">
      <div className="max-w-[1500px] mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center gap-4">
              <img
                src={logo}
                alt="CMC Cinema"
                className="w-24 h-24 object-contain"
              />

              <div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-[#d8bf84] via-[#AA7D36] to-[#8f6424] bg-clip-text text-transparent">
                  CA MAU CINEMA
                </h2>

                <p className="text-xs tracking-[4px] text-[#c9ab73] uppercase mt-1">
                  Premium Movie Experience
                </p>
              </div>
            </Link>

            <p className="text-gray-400 mt-6 leading-7">
              CMC Cinema mang đến trải nghiệm xem phim hiện đại với hệ thống
              phòng chiếu chất lượng cao, âm thanh Dolby Atmos và dịch vụ chuyên
              nghiệp.
            </p>
          </div>

          {/* Điều hướng */}
          <div>
            <h3 className="text-xl font-bold text-[#d8bf84] mb-6">
              Điều hướng
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <Link to="/" className="hover:text-[#AA7D36] transition">
                  Trang chủ
                </Link>
              </li>

              <li>
                <Link to="/movies" className="hover:text-[#AA7D36] transition">
                  Phim
                </Link>
              </li>

              <li>
                <Link to="/cinemas" className="hover:text-[#AA7D36] transition">
                  Rạp chiếu
                </Link>
              </li>

              <li>
                <Link
                  to="/showtimes"
                  className="hover:text-[#AA7D36] transition"
                >
                  Lịch chiếu
                </Link>
              </li>

              <li>
                <Link
                  to="/promotions"
                  className="hover:text-[#AA7D36] transition"
                >
                  Khuyến mãi
                </Link>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-xl font-bold text-[#d8bf84] mb-6">Liên hệ</h3>

            <div className="space-y-5 text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin className="text-[#AA7D36]" size={18} />
                <span>01 Lý Thường Kiệt, TP. Cà Mau</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-[#AA7D36]" size={18} />
                <span>1900 1234</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-[#AA7D36]" size={18} />
                <span>support@cmccinema.vn</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-bold text-[#d8bf84] mb-6">
              Kết nối với chúng tôi
            </h3>

            <div className="flex gap-4 mb-8">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-[#AA7D36]/10 hover:bg-[#AA7D36] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-[#AA7D36]/10 hover:bg-[#AA7D36] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-[#AA7D36]/10 hover:bg-[#AA7D36] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaYoutube size={18} />
              </a>
            </div>

            <button className="bg-[#AA7D36] hover:bg-[#8f6424] transition px-7 py-3 rounded-full font-semibold shadow-lg shadow-[#AA7D36]/30">
              Đặt vé ngay
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-[#AA7D36]/20 flex flex-col lg:flex-row justify-between items-center gap-5">
          <p className="text-gray-500 text-sm">
            © 2026 CMC Cinema. All Rights Reserved.
          </p>

          <div className="flex gap-8 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#AA7D36] transition">
              Điều khoản sử dụng
            </Link>

            <Link to="/" className="hover:text-[#AA7D36] transition">
              Chính sách bảo mật
            </Link>

            <Link to="/" className="hover:text-[#AA7D36] transition">
              Hỗ trợ khách hàng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
