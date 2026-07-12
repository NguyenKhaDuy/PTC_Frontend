import { useEffect, useState } from "react";
import axios from "axios";

import BranchHeader from "../../Components/Admin/BranchHeader";
import BranchStats from "../../Components/Admin/BranchStats";
import BranchSearch from "../../Components/Admin/BranchSearch";
import BranchGrid from "../../Components/Admin/BranchGrid";
import BranchPagination from "../../Components/Admin/BranchPagination";

import BranchDetailModal from "../../Components/Admin/BranchDetailModal";
import BranchEditModal from "../../Components/Admin/BranchEditModal";
import ConfirmDeleteModal from "../../Components/Admin/ConfirmDeleteModal";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useToast } from "../../Components/Common/ToastProvider";

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [search, setSearch] = useState("");

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailBranch, setDetailBranch] = useState(null);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteBranch, setDeleteBranch] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { showToast } = useToast();

  const fetchBranches = async (page = 1) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/admin/branch?pageNo=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setBranches(res.data.data);
      setCurrentPage(res.data.current_page);
      setTotalPage(res.data.total_page);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches(currentPage);
  }, [currentPage]);

  const filteredBranches = branches.filter((branch) =>
    branch.nameBranch.toLowerCase().includes(search.toLowerCase()),
  );

  const totalRooms = branches.reduce(
    (sum, branch) => sum + (branch.roomDTOS?.length || 0),
    0,
  );

  const totalSeats = branches.reduce(
    (sum, branch) =>
      sum +
      (branch.roomDTOS?.reduce(
        (seat, room) => seat + Number(room.capacity ?? 0),
        0,
      ) || 0),
    0,
  );

  const handleViewBranch = async (idBranch) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/branch/id-brach=${idBranch}`,
      );

      setDetailBranch(res.data.data);
      setDetailOpen(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setMode("add");
    setSelectedBranch(null);
    setOpen(true);
  };

  const handleOpenEdit = (branch) => {
    setMode("edit");
    setSelectedBranch(branch);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBranch(null);
  };

  const handleAddBranch = async (branch) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/admin/branch",
        {
          nameBranch: branch.nameBranch,
          address: branch.address,
          phone: branch.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Thêm rạp thành công", "success");

      fetchBranches(currentPage);
      setOpen(false);
    } catch (err) {
      showToast(err.response?.data?.message || "Thêm rạp thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBranch = async (branch) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:3000/api/admin/branch",
        {
          idBranch: branch.idBranch,
          nameBranch: branch.nameBranch,
          address: branch.address,
          phone: branch.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Cập nhật thành công", "success");

      fetchBranches(currentPage);
      setOpen(false);
    } catch (err) {
      showToast(err.response?.data?.message || "Cập nhật thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDelete = (branch) => {
    setDeleteBranch(branch);
    setDeleteOpen(true);
  };

  const handleDeleteBranch = async () => {
    if (!deleteBranch) return;

    try {
      setDeleteLoading(true);

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/admin/branch/id-branch=${deleteBranch.idBranch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Xóa rạp thành công", "success");

      setDeleteOpen(false);
      setDeleteBranch(null);

      if (branches.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchBranches(currentPage);
      }
    } catch (err) {
      console.log(err);
      showToast(err.response?.data?.message || "Xóa rạp thất bại", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <BranchHeader onAdd={handleOpenAdd} />

      <BranchStats
        totalBranch={branches.length}
        totalRoom={totalRooms}
        totalSeat={totalSeats}
        activeBranch={branches.length}
      />

      <BranchSearch value={search} onChange={setSearch} />

      <BranchGrid
        branches={filteredBranches}
        onView={handleViewBranch}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <BranchPagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChange={setCurrentPage}
      />

      <BranchDetailModal
        open={detailOpen}
        branch={detailBranch}
        onClose={() => {
          setDetailOpen(false);
          setDetailBranch(null);
        }}
      />

      <BranchEditModal
        open={open}
        mode={mode}
        branch={selectedBranch}
        onClose={handleClose}
        onSave={(data) => {
          if (mode === "add") {
            handleAddBranch(data);
          } else {
            handleUpdateBranch(data);
          }
        }}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        title="Xóa rạp"
        message={
          deleteBranch
            ? `Bạn có chắc muốn xóa rạp "${deleteBranch.nameBranch}" không?`
            : ""
        }
        loading={deleteLoading}
        onCancel={() => {
          if (deleteLoading) return;
          setDeleteOpen(false);
          setDeleteBranch(null);
        }}
        onConfirm={handleDeleteBranch}
      />

      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </div>
  );
}
