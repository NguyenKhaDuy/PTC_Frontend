import { Search, Bell, UserCircle2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function AdminHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.log("logout api fail, ignore");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth-change"));

    navigate("/", { replace: true });
  };

  return (
    <header className="h-20 bg-[#111827] border-b border-[#1F2937] flex items-center justify-between px-8">
      {/* SEARCH */}
      <div className="relative w-[420px]">
        <Search className="absolute left-4 top-3 text-gray-400" size={18} />
        <input
          placeholder="Tìm kiếm..."
          className="w-full h-11 bg-[#1F2937] rounded-xl pl-11 outline-none text-white"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* NOTIFICATION */}
        <button className="relative text-gray-300 hover:text-white">
          <Bell />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* USER HOVER AREA */}
        <div
          className="relative"
          onMouseEnter={() => {
            clearTimeout(timeoutRef.current);
            setOpen(true);
          }}
          onMouseLeave={() => {
            timeoutRef.current = setTimeout(() => {
              setOpen(false);
            }, 150); // delay để không bị mất khi rê chuột
          }}
        >
          {/* USER INFO */}
          <div className="flex items-center gap-3 cursor-pointer">
            <UserCircle2 size={38} />

            <div>
              <p className="font-semibold text-white">Admin</p>
              <p className="text-xs text-gray-400">Super Administrator</p>
            </div>
          </div>

          {/* DROPDOWN */}
          {open && (
            <div
              className="absolute right-0 top-14 bg-[#1F2937] border border-gray-700 rounded-xl shadow-lg w-40 overflow-hidden"
              onMouseEnter={() => {
                clearTimeout(timeoutRef.current);
                setOpen(true);
              }}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => {
                  setOpen(false);
                }, 150);
              }}
            >
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 text-red-400 hover:bg-[#111827]"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
