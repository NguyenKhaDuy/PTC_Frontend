import { ChevronRight, LogOut, Lock } from "lucide-react";
import { useState } from "react";
import { useToast } from "../Common/ToastProvider";
import GlobalLoading from "../Common/GlobalLoading";

export default function SettingsTab({ navigate }) {
  const { showToast } = useToast();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
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

  const handleChangePassword = async () => {
    if (
      !passwordForm.oldPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      showToast("Vui lòng nhập đầy đủ thông tin", "error");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("Xác nhận mật khẩu không khớp", "error");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch("http://localhost:3000/api/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idUser: user.idUser,
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      showToast("Đổi mật khẩu thành công", "success");

      setShowPasswordModal(false);

      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-2xl font-bold mb-6 text-white">
          Cài đặt tài khoản
        </h3>

        <div className="space-y-4">
          <Item
            icon={Lock}
            title="Đổi mật khẩu"
            description="Thay đổi mật khẩu đăng nhập"
            onClick={() => setShowPasswordModal(true)}
          />

          <Item
            icon={LogOut}
            title="Đăng xuất"
            description="Kết thúc phiên đăng nhập hiện tại"
            onClick={handleLogout}
            warning
          />
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-[#AA7D36]/20 bg-[#181818] p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Đổi mật khẩu</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Mật khẩu hiện tại
                </label>

                <input
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      oldPassword: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-white outline-none focus:border-[#AA7D36]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Mật khẩu mới
                </label>

                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-white outline-none focus:border-[#AA7D36]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Xác nhận mật khẩu
                </label>

                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-white outline-none focus:border-[#AA7D36]"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="rounded-xl border border-white/10 px-5 py-3 text-white"
              >
                Hủy
              </button>

              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="rounded-xl bg-[#AA7D36] px-5 py-3 font-semibold text-white hover:bg-[#8f6424]"
              >
                {loading ? "Đang cập nhật..." : "Cập nhật"}
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </>
  );
}
