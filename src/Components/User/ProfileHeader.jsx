import { MapPin, UserCircle2, Camera } from "lucide-react";
import { useRef, useState } from "react";
import GlobalLoading from "../Common/GlobalLoading";

export default function ProfileHeader({ user }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const formatDob = (dob) => {
    if (!dob) return "";
    const [y, m, d] = dob;
    return `${d}/${m}/${y}`;
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("id_user", user.idUser);

    try {
      setUploading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/customer/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error();

      const result = await res.json();

      if (result?.data?.avatar) {
        user.avatar = result.data.avatar;
      }

      window.location.reload();
    } catch (err) {
      console.error("Upload avatar failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl">
      {/* AVATAR + CAMERA */}
      <div
        className="relative w-24 h-24 rounded-full border-2 border-[#AA7D36] overflow-hidden bg-black cursor-pointer group"
        onClick={() => fileRef.current.click()}
      >
        {user?.avatar ? (
          <img
            src={`data:image/png;base64,${user.avatar}`}
            className="w-full h-full object-cover"
            alt="avatar"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <UserCircle2 size={50} className="text-[#AA7D36]" />
          </div>
        )}

        {/* overlay camera icon */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <Camera className="text-white" size={22} />
        </div>

        {/* loading overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs">
            Uploading...
          </div>
        )}
      </div>

      {/* INPUT FILE HIDDEN */}
      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={handleUpload}
      />

      {/* INFO */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl font-bold">{user?.fullName || "Chưa có tên"}</h2>
        <p className="text-gray-400">{user?.email}</p>
        <p className="text-gray-500 text-sm">{user?.phone}</p>

        <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-300">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {formatDob(user?.dob)}
          </span>

          <span className="px-3 py-1 rounded-full bg-[#AA7D36]/20 text-[#AA7D36] text-xs">
            {user?.roles?.[0] || "USER"}
          </span>
        </div>
      </div>
      {uploading && <GlobalLoading open={uploading} text="Đang xử lí..." />}
    </div>
  );
}
