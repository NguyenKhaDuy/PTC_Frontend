import { Plus, Pencil, Trash2, Ruler } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useToast } from "../../Components/Common/ToastProvider";
import SizeModal from "../../Components/Admin/SizeModal";
import ConfirmDeleteModal from "../../Components/Admin/ConfirmDeleteModal";

export default function Sizes() {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSizeModal, setOpenSizeModal] = useState(false);
  const [editingSize, setEditingSize] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletingSize, setDeletingSize] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [sizeForm, setSizeForm] = useState({
    idSize: null,
    size: "",
  });

  const { showToast } = useToast();

  const fetchSizes = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/api/admin/size", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSizes(res.data.data);
    } catch (err) {
      console.log(err);

      showToast(
        err.response?.data?.message || "Không thể tải danh sách size",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  const handleAdd = () => {
    setEditingSize(null);

    setSizeForm({
      idSize: null,
      size: "",
    });

    setOpenSizeModal(true);
  };

  const handleEdit = (size) => {
    setEditingSize(size);

    setSizeForm({
      idSize: size.idSize,
      size: size.size,
    });

    setOpenSizeModal(true);
  };

  const handleSubmitSize = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (editingSize) {
        await axios.put("http://localhost:3000/api/admin/size", sizeForm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showToast("Cập nhật size thành công", "success");
      } else {
        await axios.post("http://localhost:3000/api/admin/size", sizeForm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showToast("Thêm size thành công", "success");
      }

      setOpenSizeModal(false);

      fetchSizes();
    } catch (err) {
      showToast(err.response?.data?.message || "Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (size) => {
    setDeletingSize(size);
    setOpenDeleteModal(true);
  };

  const confirmDeleteSize = async () => {
    if (!deletingSize) return;

    try {
      setDeleteLoading(true);

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/admin/size/id-size=${deletingSize.idSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Xóa size thành công", "success");

      setOpenDeleteModal(false);
      setDeletingSize(null);

      fetchSizes();
    } catch (err) {
      showToast(err.response?.data?.message || "Không thể xóa size", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Size</h1>
          <p className="text-gray-400 mt-1">
            Quản lý size áp dụng cho đồ ăn và nước uống.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-[#AA7D36] hover:bg-[#91682d] px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Thêm size
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
          <p className="text-gray-400">Tổng size</p>
          <h2 className="text-3xl font-bold mt-2">{sizes.length}</h2>
        </div>

        <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
          <p className="text-gray-400">Size đầu tiên</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {sizes[0]?.size || "--"}
          </h2>
        </div>

        <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
          <p className="text-gray-400">Size cuối</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {sizes[sizes.length - 1]?.size || "--"}
          </h2>
        </div>

        <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
          <p className="text-gray-400">ID lớn nhất</p>
          <h2 className="text-3xl font-bold text-blue-400 mt-2">
            {sizes.length ? Math.max(...sizes.map((s) => s.idSize)) : 0}
          </h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#202020]">
            <tr>
              <th className="py-4 px-5 text-left">Size</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {sizes.map((size) => (
              <tr
                key={size.idSize}
                className="border-t border-[#2d2d2d] hover:bg-[#202020]"
              >
                <td className="py-5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#AA7D36]/20 flex items-center justify-center">
                      <Ruler className="text-[#AA7D36]" size={20} />
                    </div>

                    <div>
                      <div className="font-semibold text-lg">{size.size}</div>
                      <div className="text-sm text-gray-500">
                        ID #{size.idSize}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="text-center">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                    Hoạt động
                  </span>
                </td>

                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(size)}
                      className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(size)}
                      className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center"
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

      <SizeModal
        open={openSizeModal}
        onClose={() => setOpenSizeModal(false)}
        form={sizeForm}
        setForm={setSizeForm}
        editing={editingSize}
        onSubmit={handleSubmitSize}
      />

      <ConfirmDeleteModal
        open={openDeleteModal}
        title="Xóa size"
        message={
          deletingSize
            ? `Bạn có chắc muốn xóa size "${deletingSize.size}" không?`
            : ""
        }
        loading={deleteLoading}
        onCancel={() => {
          setOpenDeleteModal(false);
          setDeletingSize(null);
        }}
        onConfirm={confirmDeleteSize}
      />

      {loading && <GlobalLoading open={loading} text="Đang tải lý..." />}
    </div>
  );
}
