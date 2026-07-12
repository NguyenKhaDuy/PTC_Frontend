import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function MovieEditModal({
  open,
  movie,
  onClose,
  onSave,
  mode = "edit",
}) {
  const [categories, setCategories] = useState([]);
  const [oldImages, setOldImages] = useState({
    smallImage: null,
    largeImage: null,
  });
  

  const [form, setForm] = useState({
    idMovie: "",
    nameMovie: "",
    director: "",
    duration: "",
    releaseDate: "",
    language: "",
    rated: "",
    shortDescription: "",
    trailer: "",
    idCategory: "",
    showing: false,

    smallImage: null,
    largeImage: null,

    previewSmall: "",
    previewLarge: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/category");
      setCategories(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!open) return;

    // Thêm mới
    if (mode === "add") {
      setForm({
        idMovie: "",
        nameMovie: "",
        director: "",
        duration: "",
        releaseDate: "",
        language: "",
        rated: "",
        shortDescription: "",
        trailer: "",
        idCategory: "",
        showing: false,

        smallImage: null,
        largeImage: null,

        previewSmall: "",
        previewLarge: "",
      });

      setOldImages({
        smallImage: null,
        largeImage: null,
      });

      return;
    }

    // Sửa
    if (!movie) return;

    setForm({
      idMovie: movie.idMovie || "",
      nameMovie: movie.nameMovie || "",
      director: movie.director || "",
      duration: movie.duration || "",
      releaseDate: Array.isArray(movie.releaseDate)
        ? `${movie.releaseDate[0]}-${String(movie.releaseDate[1]).padStart(
            2,
            "0",
          )}-${String(movie.releaseDate[2]).padStart(2, "0")}`
        : movie.releaseDate || "",
      language: movie.language || "",
      rated: movie.rated || "",
      shortDescription: movie.shortDescription || "",
      trailer: movie.trailer || "",
      idCategory: movie.idCategory || "",
      showing: movie.showing || false,

      smallImage: movie.smallImage,
      largeImage: movie.largeImage,

      previewSmall: movie.smallImage
        ? `data:image/jpeg;base64,${movie.smallImage}`
        : "",

      previewLarge: movie.largeImage
        ? `data:image/jpeg;base64,${movie.largeImage}`
        : "",
    });
  }, [open, movie, mode]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "idCategory"
            ? Number(value)
            : value,
    }));
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      [field]: file,
      [field === "smallImage" ? "previewSmall" : "previewLarge"]: preview,
    }));
  };

  return (
    <div className="fixed inset-0 z-[49] flex items-center justify-center bg-black/70 backdrop-blur-sm p-5">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#333] bg-[#181818]">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-[#333] bg-[#202020] px-6 py-4">
          <h2 className="text-2xl font-bold text-white">
            {mode === "add" ? "Thêm phim mới" : "Cập nhật phim"}
          </h2>

          <button onClick={onClose} className="hover:text-red-400 transition">
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6 text-white">
          <div className="grid grid-cols-2 gap-5">
            {mode === "edit" && (
              <div>
                <label className="text-sm text-gray-400">Mã phim</label>

                <input
                  disabled
                  value={form.idMovie}
                  className="mt-2 w-full rounded-xl border border-[#333] bg-[#111] p-3"
                />
              </div>
            )}

            <div>
              <label className="text-sm text-gray-400">Tên phim</label>

              <input
                name="nameMovie"
                value={form.nameMovie}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#333] bg-[#111] p-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Đạo diễn</label>

              <input
                name="director"
                value={form.director}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#333] bg-[#111] p-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Thời lượng</label>

              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#333] bg-[#111] p-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Ngày khởi chiếu</label>

              <input
                type="date"
                name="releaseDate"
                value={form.releaseDate}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#333] bg-[#111] p-3 text-white [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Ngôn ngữ</label>

              <input
                name="language"
                value={form.language}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#333] bg-[#111] p-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Rated</label>

              <input
                name="rated"
                value={form.rated}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#333] bg-[#111] p-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Thể loại</label>

              <div className="relative mt-2">
                <select
                  name="idCategory"
                  value={form.idCategory}
                  onChange={handleChange}
                  className="
      w-full
      rounded-xl
      border
      border-[#333]
      bg-[#111]
      p-3
      pr-10
      text-white
      appearance-none
      outline-none
      focus:border-[#AA7D36]
    "
                >
                  <option value="">-- Chọn thể loại --</option>

                  {categories.map((item) => (
                    <option key={item.idCategory} value={item.idCategory}>
                      {item.name_category}
                    </option>
                  ))}
                </select>

                <svg
                  className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Mô tả</label>

            <textarea
              rows={5}
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-[#333] bg-[#111] p-3"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Trailer</label>

            <input
              name="trailer"
              value={form.trailer}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-[#333] bg-[#111] p-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="text-sm text-gray-400">Poster</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "smallImage")}
                className="mt-3 w-full file:rounded-lg file:border-0 file:bg-[#AA7D36] file:px-4 file:py-2 file:text-white"
              />

              {form.previewSmall && (
                <img
                  src={form.previewSmall}
                  className="mt-4 h-72 w-48 rounded-xl border border-[#333] object-cover"
                  alt=""
                />
              )}
            </div>

            <div>
              <label className="text-sm text-gray-400">Banner</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "largeImage")}
                className="mt-3 w-full file:rounded-lg file:border-0 file:bg-[#AA7D36] file:px-4 file:py-2 file:text-white"
              />

              {form.previewLarge && (
                <img
                  src={form.previewLarge}
                  className="mt-4 h-56 w-full rounded-xl border border-[#333] object-cover"
                  alt=""
                />
              )}
            </div>
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="showing"
              checked={form.showing}
              onChange={handleChange}
              className="h-5 w-5"
            />
            Đang chiếu
          </label>

          <div className="flex justify-end gap-4 border-t border-[#333] pt-6">
            <button
              onClick={onClose}
              className="rounded-xl bg-gray-600 px-6 py-3 hover:bg-gray-700"
            >
              Hủy
            </button>

            <button
              onClick={() => onSave(form)}
              className="rounded-xl bg-[#AA7D36] px-6 py-3 hover:bg-[#8b662b]"
            >
              {mode === "add" ? "Thêm phim" : "Cập nhật"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
