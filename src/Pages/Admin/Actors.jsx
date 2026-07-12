import { useEffect, useState } from "react";
import axios from "axios";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useToast } from "../../Components/Common/ToastProvider";
import ActorDetailModal from "../../Components/Admin/ActorDetailModal";
import ActorEditModal from "../../Components/Admin/ActorEditModal";
import ConfirmDeleteModal from "../../Components/Admin/ConfirmDeleteModal";
import ActorHeader from "../../Components/Admin/ActorHeader";
import ActorStats from "../../Components/Admin/ActorStatistics";
import ActorSearch from "../../Components/Admin/ActorSearch";
import ActorTable from "../../Components/Admin/ActorTable";
import ActorPagination from "../../Components/Admin/ActorPagination";

const base64ToFile = (base64, filename = "actor.jpg", mime = "image/jpeg") => {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    byteArrays.push(new Uint8Array(byteNumbers));
  }

  return new File(byteArrays, filename, { type: mime });
};

export default function Actors() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { showToast } = useToast();
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailActor, setDetailActor] = useState(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedActor, setSelectedActor] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteActor, setDeleteActor] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchActors = async (page = 1) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/admin/actor?pageNo=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data.data);

      setActors(res.data.data);
      setCurrentPage(res.data.current_page);
      setTotalPage(res.data.total_page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActors(currentPage);
  }, [currentPage]);

  const handleViewActor = async (idActor) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/actor/id-actor=${idActor}`,
      );

      setDetailActor(res.data.data);
      setDetailOpen(true);
    } catch (err) {
      console.error(err);

      showToast("Không thể tải thông tin diễn viên", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateActor = async (actor) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("idActor", actor.idActor);
      formData.append("name", actor.name);
      formData.append("description", actor.description);

      // Có chọn ảnh mới
      if (actor.image instanceof File) {
        formData.append("image", actor.image);
      }
      // Không chọn ảnh mới -> gửi lại ảnh cũ
      else if (actor.oldImage) {
        const file = base64ToFile(actor.oldImage);
        formData.append("image", file);
      }

      const res = await axios.put(
        "http://localhost:3000/api/admin/actor",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      showToast("Cập nhật thành công", "success");

      fetchActors(currentPage);
      setOpen(false);
      setSearch("");
    } catch (err) {
      console.log(err);

      showToast(err.response?.data?.message || "Cập nhật thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedActor(null);
  };

  const handleOpenAdd = () => {
    setMode("add");
    setSelectedActor(null);
    setOpen(true);
  };

  const handleOpenEdit = (actor) => {
    setMode("edit");
    setSelectedActor(actor);
    setOpen(true);
  };

  const handleOpenDelete = (actor) => {
    setDeleteActor(actor);
    setDeleteOpen(true);
  };

  const handleAddActor = async (actor) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", actor.name);
      formData.append("description", actor.description);

      if (actor.image) {
        formData.append("image", actor.image);
      }

      const res = await axios.post(
        "http://localhost:3000/api/admin/actor",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      showToast("Thêm mới thành công", "success");

      fetchActors(currentPage);
      setOpen(false);
      setSearch("");
    } catch (err) {
      showToast(err.response?.data?.message || "Thêm thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteActor = async () => {
    if (!deleteActor) return;

    try {
      setDeleteLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://localhost:3000/api/admin/actor/id-actor=${deleteActor.idActor}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Xóa thành công", "success");

      setDeleteOpen(false);
      setDeleteActor(null);
      setSearch("");

      fetchActors(currentPage);
    } catch (err) {
      console.log(err);

      showToast("Xóa diễn viên thất bại", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredActors = actors.filter((actor) =>
    actor.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <ActorHeader onAdd={handleOpenAdd} />

      <ActorStats actors={actors} />

      <ActorSearch search={search} setSearch={setSearch} />

      <ActorTable
        actors={filteredActors}
        onView={handleViewActor}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <ActorPagination
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={setCurrentPage}
      />

      <ActorDetailModal
        open={detailOpen}
        actor={detailActor}
        onClose={() => {
          setDetailOpen(false);
          setDetailActor(null);
        }}
      />

      <ActorEditModal
        open={open}
        mode={mode}
        actor={selectedActor}
        onClose={handleClose}
        onSave={(data) => {
          if (mode === "add") {
            handleAddActor(data);
          } else {
            handleUpdateActor(data);
          }
        }}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        title="Xóa diễn viên"
        message={
          deleteActor
            ? `Bạn có chắc muốn xóa diễn viên "${deleteActor.name}" không?`
            : ""
        }
        loading={deleteLoading}
        onCancel={() => {
          if (deleteLoading) return;
          setDeleteOpen(false);
          setDeleteActor(null);
        }}
        onConfirm={handleDeleteActor}
      />

      <GlobalLoading open={loading} text="Đang xử lý..." />
    </div>
  );
}
