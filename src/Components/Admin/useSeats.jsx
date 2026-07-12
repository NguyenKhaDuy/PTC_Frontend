import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../Common/ToastProvider";

export function useSeats() {
  const { showToast } = useToast();

  const [branches, setBranches] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [seats, setSeats] = useState([]);
  const [seatTypes, setSeatTypes] = useState([]);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedSeatType, setSelectedSeatType] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [detailOpen, setDetailOpen] = useState(false);
  const [seatDetail, setSeatDetail] = useState(null);

  const [seatModalOpen, setSeatModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingSeat, setEditingSeat] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteSeat, setDeleteSeat] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBranches();
    fetchSeatTypes();
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/branch", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBranches(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchSeatTypes = async () => {
    const res = await axios.get("http://localhost:3000/api/admin/seatType", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSeatTypes(res.data.data);
  };

  const handleBranchChange = async (id) => {
    setSelectedBranch(id);
    setSelectedRoom("");
    setSeats([]);

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/admin/room/id-branch=${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setRooms(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomChange = async (idRoom) => {
    setSelectedRoom(idRoom);
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:3000/api/admin/seat/id-room=${idRoom}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSeats(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const filteredSeats = seats.filter((s) => {
    const matchName = s.name.toLowerCase().includes(search.toLowerCase());

    const matchType =
      selectedSeatType === "" ||
      s.seatTypeDTO?.idSeatType === Number(selectedSeatType);

    return matchName && matchType;
  });

  const handleViewSeat = async (idSeat) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/admin/seat/id-seat=${idSeat}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSeatDetail(res.data);
      setDetailOpen(true);
    } catch {
      showToast("Không lấy được thông tin ghế.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSeat = async (seat) => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/api/admin/seat",
        {
          name: seat.name,
          idSeatType: seat.idSeatType,
          idRoom: selectedRoom,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      showToast("Thêm ghế thành công.", "success");
      setSeatModalOpen(false);
      handleRoomChange(selectedRoom);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSeat = async (seat) => {
    setLoading(true);
    try {
      await axios.put(
        "http://localhost:3000/api/admin/seat",
        {
          idSeat: seat.idSeat,
          name: seat.name,
          idSeatType: seat.idSeatType,
          idRoom: selectedRoom,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      showToast("Cập nhật thành công.", "success");
      setSeatModalOpen(false);
      handleRoomChange(selectedRoom);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSeat = async (idSeat) => {
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/seat/id-seat=${idSeat}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      showToast("Xóa thành công.", "success");
      handleRoomChange(selectedRoom);
    } catch (err) {
      showToast(err.response?.data?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    // data
    branches,
    rooms,
    seats,
    seatTypes,

    // filter
    selectedBranch,
    selectedRoom,
    selectedSeatType,
    search,

    // setters
    setSearch,
    setSelectedSeatType,
    setSeatModalOpen,
    setModalMode,
    setEditingSeat,
    setDeleteSeat,
    setDeleteOpen,

    // modals
    detailOpen,
    seatDetail,
    seatModalOpen,
    modalMode,
    editingSeat,
    deleteOpen,
    deleteSeat,
    setDetailOpen,
    seatDetail,
    setSeatDetail,

    // loading
    loading,

    // computed
    filteredSeats,

    // actions
    handleBranchChange,
    handleRoomChange,
    handleViewSeat,
    handleAddSeat,
    handleUpdateSeat,
    handleDeleteSeat,
  };
}
