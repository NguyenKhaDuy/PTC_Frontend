import { useEffect, useState } from "react";
import axios from "axios";
import { X, ChevronDown } from "lucide-react";
import { useToast } from "../Common/ToastProvider";

const formatDate = (date) => {
  if (!date) return "";

  if (Array.isArray(date)) {
    const [year, month, day] = date;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  return date;
};

const formatTime = (time) => {
  if (!time) return "";

  if (Array.isArray(time)) {
    const [hour, minute] = time;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  return time.slice(0, 5);
};

export default function ScheduleModal({
  open,
  mode,
  schedule,
  branches,
  onClose,
  onSuccess,
}) {
  const token = localStorage.getItem("token");
  const { showToast } = useToast();

  const [rooms, setRooms] = useState([]);
  const [movies, setMovies] = useState([]);

  const [form, setForm] = useState({
    idSchedule: null,
    idMovie: "",
    idBranch: "",
    idRoom: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    basePrice: "",
  });

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && schedule) {
      setForm({
        idSchedule: schedule.idSchedule,
        idMovie: schedule.movieDTO?.idMovie,
        idBranch: schedule.roomDTO?.branchDTO?.idBranch,
        idRoom: schedule.roomDTO?.idRoom,
        date: formatDate(schedule.date),
        timeStart: formatTime(schedule.timeStart),
        timeEnd: formatTime(schedule.timeEnd),
        basePrice: schedule.basePrice,
      });
    } else {
      setForm({
        idSchedule: null,
        idMovie: "",
        idBranch: "",
        idRoom: "",
        date: "",
        timeStart: "",
        timeEnd: "",
        basePrice: "",
      });
    }
  }, [open, schedule, mode]);

  useEffect(() => {
    if (!form.idBranch) {
      setRooms([]);
      return;
    }

    const branch = branches.find((b) => b.idBranch === Number(form.idBranch));
    setRooms(branch?.roomDTOS || []);
  }, [form.idBranch, branches]);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/movie", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMovies(res.data.data);
    } catch (err) {
      console.log(err);
      showToast("Không lấy được danh sách phim", "error");
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSubmit = async () => {
    try {
      if (
        !form.idMovie ||
        !form.idRoom ||
        !form.date ||
        !form.timeStart ||
        !form.timeEnd ||
        !form.basePrice
      ) {
        return showToast("Vui lòng nhập đầy đủ thông tin", "warning");
      }

      const body = {
        idMovie: form.idMovie,
        idRoom: Number(form.idRoom),
        date: form.date,
        timeStart: form.timeStart,
        timeEnd: form.timeEnd,
        basePrice: Number(form.basePrice),
      };
      if (mode === "edit") {
        body.idSchedule = form.idSchedule;
      }

      try {
        let res;

        if (mode === "add") {
          console.log(body);
          res = await axios.post(
            "http://localhost:3000/api/admin/schedule",
            body,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (res.status !== 200) {
            throw new Error(res.data?.message || "Thêm lịch chiếu thất bại");
          }

          showToast("Thêm lịch chiếu thành công", "success");
        } else {
          res = await axios.put(
            `http://localhost:3000/api/admin/schedule`,
            body,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (res.status !== 200) {
            throw new Error(
              res.data?.message || "Cập nhật lịch chiếu thất bại",
            );
          }

          showToast("Cập nhật lịch chiếu thành công", "success");
        }

        onSuccess();
        onClose();
      } catch (err) {
        console.error(err);

        showToast(
          err.response?.data?.message || err.message || "Có lỗi xảy ra",
          "error",
        );
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      showToast("Có lỗi xảy ra", "error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center"
      style={{ margin: 0 }}
    >
      <div className="bg-[#181818] rounded-2xl w-[700px] border border-[#2d2d2d]">
        <div className="flex justify-between items-center border-b border-[#2d2d2d] p-5">
          <h2 className="text-xl font-bold">
            {mode === "add" ? "Thêm lịch chiếu" : "Cập nhật lịch chiếu"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="p-6 space-y-5">
          {/* Chi nhánh */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Chi nhánh
            </label>

            <div className="relative">
              <select
                className="w-full appearance-none bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-[#AA7D36]"
                value={form.idBranch}
                onChange={(e) =>
                  setForm({
                    ...form,
                    idBranch: e.target.value,
                    idRoom: "",
                  })
                }
              >
                <option value="">Chọn chi nhánh</option>

                {branches.map((branch) => (
                  <option key={branch.idBranch} value={branch.idBranch}>
                    {branch.nameBranch}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Phòng */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Phòng
            </label>

            <div className="relative">
              <select
                className="w-full appearance-none bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-[#AA7D36]"
                value={form.idRoom}
                onChange={(e) =>
                  setForm({
                    ...form,
                    idRoom: e.target.value,
                  })
                }
              >
                <option value="">Chọn phòng</option>

                {rooms.map((room) => (
                  <option key={room.idRoom} value={room.idRoom}>
                    {room.name}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Phim */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Phim
            </label>

            <div className="relative">
              <select
                className="w-full appearance-none bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-[#AA7D36]"
                value={form.idMovie}
                onChange={(e) => {
                  console.log(e.target.value);
                  setForm({
                    ...form,
                    idMovie: e.target.value,
                  });
                }}
              >
                <option value="">Chọn phim</option>

                {movies.map((movie) => (
                  <option key={movie.idMovie} value={movie.idMovie}>
                    {movie.nameMovie}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Ngày chiếu - Giá vé */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Ngày chiếu
              </label>

              <input
                type="date"
                className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#AA7D36]"
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Giá vé
              </label>

              <input
                type="number"
                className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#AA7D36]"
                value={form.basePrice}
                onChange={(e) =>
                  setForm({
                    ...form,
                    basePrice: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Giờ */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Giờ bắt đầu
              </label>

              <input
                type="time"
                className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#AA7D36]"
                value={form.timeStart}
                onChange={(e) =>
                  setForm({
                    ...form,
                    timeStart: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Giờ kết thúc
              </label>

              <input
                type="time"
                className="w-full bg-[#101010] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#AA7D36]"
                value={form.timeEnd}
                onChange={(e) =>
                  setForm({
                    ...form,
                    timeEnd: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-[#2d2d2d]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-700"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-[#AA7D36]"
          >
            {mode === "add" ? "Thêm mới" : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}
