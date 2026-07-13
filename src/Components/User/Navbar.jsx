import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Search, UserCircle2, Ticket, Menu, Bell, X } from "lucide-react";
import logo from "../../assets/PTC_LOGO.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuth(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      localStorage.setItem("user", JSON.stringify(data));
      setIsAuth(true);
      setUser(data);
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const handler = () => {
      checkAuth();
    };

    window.addEventListener("auth-change", handler);

    return () => window.removeEventListener("auth-change", handler);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const menus = [
    { name: "Phim", path: "/movies" },
    { name: "Rạp chiếu", path: "/cinemas" },
    { name: "Lịch chiếu", path: "/showtimes" },
    { name: "Khuyến mãi", path: "/promotions" },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* FIX: chừa khoảng cho header fixed */}
      <div className="h-20" />

      <header className="fixed top-0 left-0 right-0 z-[999] bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-[#AA7D36]/20">
        <div className="max-w-[1500px] mx-auto px-4 md:px-10 h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src={logo}
              className="w-10 h-10 md:w-14 md:h-14 object-contain"
              alt="logo"
            />
            <div className="leading-tight">
              <h1 className="text-base md:text-xl font-black bg-gradient-to-r from-[#d8bf84] via-[#AA7D36] to-[#8f6424] bg-clip-text text-transparent">
                PTC CINEMA
              </h1>
              <p className="hidden md:block text-[10px] tracking-[5px] text-[#c9ab73]">
                Premium Movie Experience
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-8">
            {menus.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-[#AA7D36]"
                      : "text-gray-300 hover:text-[#AA7D36]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-2 md:gap-3">

            {!loading && (
              <>
                {isAuth ? (
                  <>
                    {/* Bell */}
                    <button className="relative w-10 h-10 rounded-full bg-[#AA7D36]/10 text-[#AA7D36] flex items-center justify-center">
                      <Bell size={18} />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    {/* Ticket */}
                    <button
                      onClick={() => navigate("/movies")}
                      className="hidden md:flex items-center gap-1 px-4 h-10 rounded-full bg-[#AA7D36] text-white font-semibold text-sm leading-none"
                    >
                      <Ticket size={16} className="shrink-0" />
                      <span className="leading-none">Đặt vé</span>
                    </button>

                    {/* Profile */}
                    <button
                      onClick={() => navigate(`/profile/${user.id_user}`)}
                      className="w-10 h-10 rounded-full bg-[#AA7D36]/10 text-[#AA7D36] flex items-center justify-center overflow-hidden"
                    >
                      {user?.avatarBase64 ? (
                        <img
                          src={`data:image/png;base64,${user.avatarBase64}`}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserCircle2 size={20} />
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="hidden md:flex items-center px-5 h-10 rounded-full bg-[#AA7D36] text-white font-semibold hover:bg-[#91692f] transition"
                  >
                    Đăng nhập
                  </button>
                )}
              </>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden w-10 h-10 rounded-full bg-[#AA7D36]/10 text-[#AA7D36] flex items-center justify-center"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed inset-0 z-[1000]">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70"
          />

          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#111] border-l border-[#AA7D36]/20 flex flex-col">
            {/* header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#222]">
              <span className="text-[#AA7D36] font-bold">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-[#AA7D36]/10 text-[#AA7D36] flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* menu */}
            <div className="flex-1 p-5 flex flex-col gap-2">
              {menus.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-medium transition ${
                      isActive
                        ? "bg-[#AA7D36] text-white"
                        : "text-gray-300 hover:bg-[#222]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* footer */}
            <div className="p-5 border-t border-[#222]">
              {isAuth ? (
                <button
                  onClick={() => {
                    navigate("/movies");
                    setOpen(false);
                  }}
                  className="w-full h-12 rounded-xl bg-[#AA7D36] text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Ticket size={18} />
                  Đặt vé ngay
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="w-full h-12 rounded-xl bg-[#AA7D36] text-white font-semibold"
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
