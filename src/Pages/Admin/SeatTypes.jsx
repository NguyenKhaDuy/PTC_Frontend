import { Search, Filter, Plus, Pencil, Trash2, Ticket } from "lucide-react";

import axios from "axios";
import { useEffect, useState } from "react";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import SeatTypeModal from "../../Components/Admin/SeatTypeModal";
import { useToast } from "../../Components/Common/ToastProvider";
import ConfirmDeleteModal from "../../Components/Admin/ConfirmDeleteModal";

export default function SeatTypes() {
  const [seatTypes, setSeatTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchSeatTypes();
  }, []);

  const fetchSeatTypes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/api/admin/seatType", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data?.data || res.data;
      setSeatTypes(data || []);
    } catch (error) {
      console.error("Load seat types error:", error);
      setSeatTypes([]);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditData(item);
    setModalOpen(true);
  };

  const handleSuccess = () => {
    fetchSeatTypes();
    showToast(
      editData ? "Cập nhật thành công" : "Thêm mới thành công",
      "success",
    );
  };

  const openDelete = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/admin/seatType/id-seatType=${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Xóa thành công", "success");
      fetchSeatTypes();
      setDeleteOpen(false);
    } catch (err) {
      console.error(err);
      showToast("Xóa thất bại", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý loại ghế</h1>
          <p className="text-gray-400 mt-1">
            Quản lý các loại ghế và giá vé tương ứng.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="bg-[#AA7D36] hover:bg-[#91682d] px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Thêm loại ghế
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
          <p className="text-gray-400">Tổng loại ghế</p>
          <h2 className="text-3xl font-bold mt-2">{seatTypes.length}</h2>
        </div>

        <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
          <p className="text-gray-400">Đang hoạt động</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {seatTypes.length}
          </h2>
        </div>
      </div>

      {/* TABLE (KHÔNG ĐỤNG UI) */}
      <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] overflow-hidden">
        <table className="w-full table-fixed">
          {/* HEADER */}
          <thead className="bg-[#202020]">
            <tr className="text-gray-300">
              <th className="py-4 px-5 text-left w-[40%]">Type</th>
              <th className="w-[35%] text-center">Hệ số giá</th>
              <th className="w-[25%] text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {seatTypes.map((type) => (
              <tr
                key={type.idSeatType}
                className="border-t border-[#2d2d2d] hover:bg-[#202020]"
              >
                {/* TYPE */}
                <td className="py-5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#AA7D36]/20 flex items-center justify-center shrink-0">
                      <Ticket className="text-[#AA7D36]" size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="font-semibold truncate">{type.type}</div>
                      <div className="text-xs text-gray-500">
                        #{type.idSeatType}
                      </div>
                    </div>
                  </div>
                </td>

                {/* PRICE */}
                <td className="text-center font-semibold text-green-400">
                  {type.priceMultiplier}
                </td>

                {/* ACTIONS */}
                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openEdit(type)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => openDelete(type.idSeatType)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SeatTypeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
        editData={editData}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        title="Xóa loại ghế"
        message="Bạn có chắc chắn muốn xóa loại ghế này không?"
        loading={deleteLoading}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />

      {loading && <GlobalLoading open={loading} text="Đang xử lý...." />}
    </div>
  );
}
