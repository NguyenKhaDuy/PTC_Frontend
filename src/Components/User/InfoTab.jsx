import { useEffect, useState } from "react";
import GlobalLoading from "../Common/GlobalLoading";
import { useToast } from "../Common/ToastProvider";

export default function InfoTab({ user, onRefresh }) {
  const { showToast } = useToast();

  const formatDobToInput = (dob) => {
    if (!dob) return "";
    const [y, m, d] = dob;

    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  };

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  // init
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: formatDobToInput(user.dob),
      });
    }
  }, [user]);

  // detect change
  useEffect(() => {
    if (!user) return;

    const original = {
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      dob: formatDobToInput(user.dob),
    };

    setIsDirty(
      form.fullName !== original.fullName ||
        form.phone !== original.phone ||
        form.dob !== original.dob,
    );
  }, [form, user]);

  // save
  const handleSave = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/customer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idUser: user.idUser,
          fullName: form.fullName,
          phone: form.phone,
          dob: form.dob,
        }),
      });

      if (!res.ok) throw new Error();

      const result = await res.json();

      // update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          ...result.data,
        }),
      );

      showToast("Cập nhật thành công", "success");

      setIsDirty(false);

      // 🔥 trigger reload profile
      onRefresh?.();
    } catch (err) {
      console.error(err);
      showToast("Cập nhật thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <h3 className="font-bold text-lg">Thông tin cá nhân</h3>

      <input
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        className="w-full mt-4 p-3 rounded-lg bg-black/40 text-white"
      />

      <input
        value={form.email}
        disabled
        className="w-full mt-4 p-3 rounded-lg bg-black/40 text-gray-400"
      />

      <input
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full mt-4 p-3 rounded-lg bg-black/40 text-white"
      />

      <input
        type="date"
        value={form.dob}
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
        className="w-full mt-4 p-3 rounded-lg bg-black/40 text-white
        appearance-none
        [&::-webkit-calendar-picker-indicator]:invert"
      />

      <button
        onClick={handleSave}
        disabled={!isDirty || loading}
        className={`mt-4 px-5 py-2 rounded-lg transition ${
          isDirty && !loading
            ? "bg-[#AA7D36] hover:bg-[#8f6424]"
            : "bg-gray-600 opacity-60 cursor-not-allowed"
        }`}
      >
        {loading ? "Đang lưu..." : "Lưu thay đổi"}
      </button>

      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </div>
  );
}
