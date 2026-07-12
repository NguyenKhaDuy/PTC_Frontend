import {
  ChevronRight,
  LogOut,
  Lock,
  Bell,
  User,
  Monitor,
  Shield,
  Trash2,
} from "lucide-react";

export default function SettingsTab({ navigate }) {
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

    //notify toàn app
    window.dispatchEvent(new Event("auth-change"));

    navigate("/", { replace: true });
  };
  const Item = ({
    icon: Icon,
    title,
    description,
    onClick,
    danger = false,
    warning = false,
  }) => {
    let color = "text-white";
    let bg = "bg-white/5 hover:bg-white/10";
    let border = "";

    if (warning) {
      color = "text-amber-400";
      bg = "bg-amber-500/10 hover:bg-amber-500/20";
      border = "border border-amber-500/20";
    }

    if (danger) {
      color = "text-red-400";
      bg = "bg-red-500/10 hover:bg-red-500/20";
      border = "border border-red-500/20";
    }

    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between rounded-2xl px-6 py-5 transition ${bg} ${border}`}
      >
        <div className="flex items-start gap-4 text-left">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center bg-black/20 ${color}`}
          >
            <Icon size={20} />
          </div>

          <div>
            <h4 className={`font-semibold text-lg ${color}`}>{title}</h4>

            <p className="text-sm text-gray-400 mt-1">{description}</p>
          </div>
        </div>

        <ChevronRight
          size={20}
          className={
            warning
              ? "text-amber-400"
              : danger
                ? "text-red-400"
                : "text-gray-500"
          }
        />
      </button>
    );
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-white">Cài đặt tài khoản</h3>

      <div className="space-y-4">
        <Item
          icon={User}
          title="Thông tin tài khoản"
          description="Cập nhật tên, email, số điện thoại"
          onClick={() => alert("Mở thông tin tài khoản")}
        />

        <Item
          icon={Lock}
          title="Đổi mật khẩu"
          description="Thay đổi mật khẩu đăng nhập"
          onClick={() => alert("Đổi mật khẩu")}
        />

        <Item
          icon={Bell}
          title="Thông báo"
          description="Quản lý email và thông báo ứng dụng"
          onClick={() => alert("Thông báo")}
        />

        <Item
          icon={Monitor}
          title="Giao diện"
          description="Dark mode, ngôn ngữ..."
          onClick={() => alert("Giao diện")}
        />

        <Item
          icon={Shield}
          title="Bảo mật"
          description="Thiết bị đăng nhập và bảo mật tài khoản"
          onClick={() => alert("Bảo mật")}
        />

        <Item
          icon={LogOut}
          title="Đăng xuất"
          description="Kết thúc phiên đăng nhập hiện tại"
          onClick={handleLogout}
          warning
        />

        <Item
          icon={Trash2}
          title="Xóa tài khoản"
          description="Thao tác này không thể hoàn tác"
          onClick={() => alert("Xóa tài khoản")}
          danger
        />
      </div>
    </div>
  );
}
