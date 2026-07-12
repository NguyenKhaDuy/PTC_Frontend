import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";

export default function ActorEditModal({
  open,
  mode = "edit",
  actor,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    idActor: "",
    name: "",
    description: "",
    image: null,
    oldImage: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && actor) {
      setForm({
        idActor: actor.idActor,
        name: actor.name || "",
        description: actor.description || "",
        image: null,
        oldImage: actor.image || null,
      });

      setPreview(actor.image ? `data:image/jpeg;base64,${actor.image}` : null);
    } else {
      setForm({
        idActor: "",
        name: "",
        description: "",
        image: null,
        oldImage: null,
      });

      setPreview(null);
    }
  }, [open, actor, mode]);

  if (!open) return null;

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      alert("Vui lòng nhập tên diễn viên");
      return;
    }

    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex justify-center items-center p-5">
      <div className="bg-[#181818] rounded-2xl w-full max-w-2xl border border-[#2d2d2d] overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center border-b border-[#2d2d2d] px-6 py-5">
          <h2 className="text-xl font-bold">
            {mode === "add" ? "Thêm diễn viên" : "Chỉnh sửa diễn viên"}
          </h2>

          <button
            onClick={onClose}
            className="hover:bg-[#2b2b2b] rounded-lg p-2"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          {/* IMAGE */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-36 h-36 rounded-2xl overflow-hidden border border-[#333] bg-[#111]">
              {preview ? (
                <img
                  src={preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex justify-center items-center h-full text-gray-500">
                  Chưa có ảnh
                </div>
              )}
            </div>

            <label className="cursor-pointer bg-[#AA7D36] hover:bg-[#91682d] px-4 py-2 rounded-xl flex items-center gap-2">
              <Upload size={18} />
              Chọn ảnh
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />
            </label>
          </div>

          {/* NAME */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Tên diễn viên
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 outline-none focus:border-[#AA7D36]"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">Mô tả</label>

            <textarea
              rows={6}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 outline-none resize-none focus:border-[#AA7D36]"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 border-t border-[#2d2d2d] px-6 py-5">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#252525] hover:bg-[#333]"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-xl bg-[#AA7D36] hover:bg-[#91682d]"
          >
            {mode === "add" ? "Thêm diễn viên" : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}
