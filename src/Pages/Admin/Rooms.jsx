import { useEffect, useState } from "react";
import axios from "axios";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useToast } from "../../Components/Common/ToastProvider";
import RoomDetailModal from "../../Components/Admin/RoomDetailModal";
import RoomEditModal from "../../Components/Admin/RoomEditModal";
import ConfirmDeleteModal from "../../Components/Admin/ConfirmDeleteModal";

import RoomHeader from "../../Components/Admin/RoomHeader";
import RoomStatistic from "../../Components/Admin/RoomStatistic";
import RoomToolbar from "../../Components/Admin/RoomToolbar";
import RoomTable from "../../Components/Admin/RoomTable";
import RoomPagination from "../../Components/Admin/RoomPagination";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailRoom, setDetailRoom] = useState(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRoomId, setDeleteRoomId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { showToast } = useToast();

  const fetchRooms = async (page = 1) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/admin/rooms?pageNo=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setRooms(res.data.data);
      setCurrentPage(res.data.current_page);
      setTotalPage(res.data.total_page);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms(currentPage);
  }, [currentPage]);

  const keyword = search.trim().toLowerCase();

  const filteredRooms =
    keyword === ""
      ? rooms
      : rooms.filter((room) => {
          return (
            room.name?.toLowerCase().includes(keyword) ||
            room.branchDTO?.nameBranch?.toLowerCase().includes(keyword)
          );
      });
  
  const handleViewRoom = async (idRoom) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/admin/room/id-room=${idRoom}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setDetailRoom(res.data.data);
      setDetailOpen(true);
    } catch (err) {
      showToast(
        err.response?.data?.message || "Không thể lấy chi tiết phòng",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setMode("add");
    setSelectedRoom(null);
    setOpen(true);
  };

  const handleOpenEdit = (room) => {
    setMode("edit");
    setSelectedRoom(room);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRoom(null);
  };

  const handleOpenDelete = (idRoom) => {
    setDeleteRoomId(idRoom);
    setDeleteOpen(true);
  };

  const handleAddRoom = async (room) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/admin/room",
        {
          name: room.name,
          capacity: Number(room.capacity),
          totalArea: room.totalArea,
          idBranch: room.idBranch,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Thêm phòng thành công", "success");

      fetchRooms(currentPage);
      handleClose();
    } catch (err) {
      showToast(err.response?.data?.message || "Thêm phòng thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRoom = async (room) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:3000/api/admin/room",
        {
          idRoom: room.idRoom,
          name: room.name,
          capacity: Number(room.capacity),
          totalArea: room.totalArea,
          idBranch: room.idBranch,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Cập nhật thành công", "success");

      fetchRooms(currentPage);
      handleClose();
    } catch (err) {
      showToast(err.response?.data?.message || "Cập nhật thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async () => {
    try {
      setDeleteLoading(true);

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/admin/room/id-room=${deleteRoomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Xóa phòng thành công", "success");

      setDeleteOpen(false);
      setDeleteRoomId(null);

      if (filteredRooms.length === 1 && currentPage > 1) {
        fetchRooms(currentPage - 1);
      } else {
        fetchRooms(currentPage);
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Xóa phòng thất bại", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <RoomHeader onAdd={handleOpenAdd} />

      <RoomStatistic rooms={rooms} />

      <RoomToolbar search={search} setSearch={setSearch} />

      <RoomTable
        rooms={filteredRooms}
        onView={handleViewRoom}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <RoomPagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChange={setCurrentPage}
      />

      <RoomDetailModal
        open={detailOpen}
        room={detailRoom}
        onClose={() => {
          setDetailOpen(false);
          setDetailRoom(null);
        }}
      />

      <RoomEditModal
        open={open}
        mode={mode}
        room={selectedRoom}
        onClose={handleClose}
        onSave={(data) =>
          mode === "add" ? handleAddRoom(data) : handleUpdateRoom(data)
        }
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        title="Xóa phòng chiếu"
        message="Bạn có chắc chắn muốn xóa phòng chiếu này? Hành động này không thể hoàn tác."
        loading={deleteLoading}
        onCancel={() => {
          if (deleteLoading) return;
          setDeleteOpen(false);
          setDeleteRoomId(null);
        }}
        onConfirm={handleDeleteRoom}
      />

      {loading && <GlobalLoading open={loading} text="Đang tải dữ liệu..." />}
    </div>
  );
}
