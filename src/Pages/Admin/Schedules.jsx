import { useEffect, useState } from "react";
import axios from "axios";

import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useToast } from "../../Components/Common/ToastProvider";

import ScheduleDetailModal from "../../Components/Admin/ScheduleDetailModal";
import ScheduleModal from "../../Components/Admin/ScheduleModal";
import ConfirmDeleteModal from "../../Components/Admin/ConfirmDeleteModal";

import ScheduleHeader from "../../Components/Admin/ScheduleHeader";
import ScheduleStats from "../../Components/Admin/ScheduleStats";
import ScheduleFilter from "../../Components/Admin/ScheduleFilter";
import ScheduleList from "../../Components/Admin/ScheduleList";

/* ================== FORMAT ================== */
const formatTime = (time) => {
  if (!time) return "";

  if (Array.isArray(time)) {
    const [h = 0, m = 0] = time;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  if (typeof time === "string") return time.slice(0, 5);

  return "";
};

const formatDate = (date) => {
  if (!date) return "";

  if (Array.isArray(date)) {
    const [y, m, d] = date;
    return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  }

  return date;
};

/* ================== PAGE ================== */
export default function Schedules() {
  const { showToast } = useToast();
  const token = localStorage.getItem("token");

  /* ===== STATE ===== */
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  /* MODAL DETAIL */
  const [detailOpen, setDetailOpen] = useState(false);
  const [scheduleDetail, setScheduleDetail] = useState(null);

  /* MODAL ADD/EDIT */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingSchedule, setEditingSchedule] = useState(null);

  /* DELETE */
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ================== API ================== */

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/branch", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBranches(res.data.data);

      if (res.data.data.length > 0) {
        setSelectedBranch(res.data.data[0].idBranch);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async (branchId) => {
    if (!branchId) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/movie/branch/id-branch=${branchId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setMovies(res.data.data);

      if (res.data.data.length > 0) {
        setSelectedMovie(res.data.data[0].idMovie);
      } else {
        setSelectedMovie("");
        setSchedules([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSchedules = async (movieId, page = pageNo) => {
    if (!movieId) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:3000/api/admin/schedule/id-movie=${movieId}?pageNo=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

    setSchedules(res.data.data);
    setTotalPages(res.data.total_page);
    setPageNo(res.data.current_page); // trang hiện tại
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMovie) {
      fetchSchedules(selectedMovie, pageNo);
    }
  }, [selectedMovie, pageNo]);

  useEffect(() => {
    setPageNo(1);
  }, [selectedMovie]);

  const fetchScheduleDetail = async (id) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/admin/schedule/id-schedule=${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setScheduleDetail(res.data.data);
      setDetailOpen(true);
    } catch (err) {
      showToast("Không lấy được chi tiết lịch chiếu", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      const res = await axios.delete(
        `http://localhost:3000/api/admin/schedule/id-schedule=${deletingId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.status !== 200) throw new Error("Xóa thất bại");

      showToast("Xóa lịch chiếu thành công", "success");

      setDeleteOpen(false);
      setDeletingId(null);

      fetchSchedules(selectedMovie);
      fetchMovies(selectedBranch);
    } catch (err) {
      showToast(err.message || "Có lỗi xảy ra", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  /* ================== EFFECT ================== */
  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    if (selectedBranch) fetchMovies(selectedBranch);
  }, [selectedBranch]);

  useEffect(() => {
    if (selectedMovie) fetchSchedules(selectedMovie);
  }, [selectedMovie]);

  /* ================== STATS ================== */
  const today = new Date().toISOString().split("T")[0];

  const totalSchedules = schedules.length;

  const todaySchedules = schedules.filter((i) => i.date === today).length;

  const openingSchedules = schedules.filter((i) => i.date >= today).length;

  const finishedSchedules = schedules.filter((i) => i.date < today).length;

  const handleToggleStatus = async (schedule) => {
    try {
      setLoading(true);

      await axios.put(
        `http://localhost:3000/api/admin/schedule/status`,
        {
          idSchedule: schedule.idSchedule,
          status: !schedule.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast(
        schedule.status ? "Đã đóng bán lịch chiếu" : "Đã mở bán lịch chiếu",
        "success",
      );

      fetchSchedules(selectedMovie);
    } catch (err) {
      showToast("Cập nhật trạng thái thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================== HANDLERS ================== */
  const handlers = {
    view: fetchScheduleDetail,
    edit: (item) => {
      setModalMode("edit");
      setEditingSchedule(item);
      setModalOpen(true);
    },
    delete: (id) => {
      setDeletingId(id);
      setDeleteOpen(true);
    },
    toggleStatus: handleToggleStatus,
  };

  /* ================== UI ================== */
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <ScheduleHeader
        onAdd={() => {
          setModalMode("add");
          setEditingSchedule(null);
          setModalOpen(true);
        }}
      />

      {/* STATS */}
      <ScheduleStats
        total={totalSchedules}
        today={todaySchedules}
        opening={openingSchedules}
        finished={finishedSchedules}
      />

      {/* FILTER */}
      <ScheduleFilter
        branches={branches}
        movies={movies}
        selectedBranch={selectedBranch}
        selectedMovie={selectedMovie}
        setSelectedBranch={setSelectedBranch}
        setSelectedMovie={setSelectedMovie}
      />

      {/* LIST */}
      <ScheduleList schedules={schedules} handlers={handlers} />

      {/* MODALS */}
      <ScheduleDetailModal
        open={detailOpen}
        schedule={scheduleDetail}
        onClose={() => setDetailOpen(false)}
      />

      <ScheduleModal
        open={modalOpen}
        mode={modalMode}
        schedule={editingSchedule}
        branches={branches}
        onClose={() => setModalOpen(false)}
        onSuccess={() => fetchSchedules(selectedMovie)}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        title="Xóa lịch chiếu"
        message="Bạn có chắc chắn muốn xóa lịch chiếu này không?"
        loading={deleteLoading}
        onCancel={() => {
          setDeleteOpen(false);
          setDeletingId(null);
        }}
        onConfirm={handleDelete}
      />

      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          disabled={pageNo === 1}
          onClick={() => setPageNo(pageNo - 1)}
          className="px-4 py-2 rounded bg-[#222] disabled:opacity-40"
        >
          Trước
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setPageNo(index + 1)}
            className={`w-10 h-10 rounded ${
              pageNo === index + 1 ? "bg-[#AA7D36]" : "bg-[#222]"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={pageNo === totalPages}
          onClick={() => setPageNo(pageNo + 1)}
          className="px-4 py-2 rounded bg-[#222] disabled:opacity-40"
        >
          Sau
        </button>
      </div>

      {/* LOADING */}
      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </div>
  );
}
