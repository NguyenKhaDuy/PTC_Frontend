import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../../Components/Common/ToastProvider";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import ConfirmDeleteModal from "../../Components/Admin/ConfirmDeleteModal";

import CategoryHeader from "../../Components/Admin/CategoryHeader";
import CategoryTable from "../../Components/Admin/CategoryTable";
import CategoryModal from "../../Components/Admin/CategoryModal";

export default function Categories() {
  const { showToast } = useToast();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [nameCategory, setNameCategory] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:3000/api/category");

      setCategories(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!nameCategory.trim()) {
      showToast("Vui lòng nhập tên thể loại!", "warning");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/admin/category",
        nameCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain",
          },
        },
      );

      showToast("Thêm thành công!", "success");

      setOpen(false);
      setNameCategory("");

      fetchCategories();
    } catch {
      showToast("Thêm thất bại!", "error");
    }
  };

  const handleOpenEdit = (category) => {
    setEditingId(category.idCategory);
    setNameCategory(category.name_category);
    setIsEdit(true);
    setOpen(true);
  };

  const handleUpdateCategory = async () => {
    if (!nameCategory.trim()) {
      showToast("Vui lòng nhập tên!", "warning");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:3000/api/admin/category",
        {
          id_category: editingId,
          name_category: nameCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Cập nhật thành công!", "success");

      setOpen(false);
      setIsEdit(false);
      setEditingId(null);
      setNameCategory("");

      fetchCategories();
    } catch {
      showToast("Cập nhật thất bại!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/admin/category/id-category=${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Xóa thành công!", "success");

      setOpenDelete(false);

      fetchCategories();
    } catch (err) {
      showToast(err.response?.data?.message || "Xóa thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-7">
      <CategoryHeader
        onAdd={() => {
          setOpen(true);
          setIsEdit(false);
          setEditingId(null);
          setNameCategory("");
        }}
      />

      <CategoryTable
        loading={loading}
        categories={categories}
        onEdit={handleOpenEdit}
        onDelete={(id) => {
          setDeleteId(id);
          setOpenDelete(true);
        }}
      />

      <CategoryModal
        open={open}
        isEdit={isEdit}
        nameCategory={nameCategory}
        setNameCategory={setNameCategory}
        onClose={() => setOpen(false)}
        onSave={isEdit ? handleUpdateCategory : handleAddCategory}
      />

      <ConfirmDeleteModal
        open={openDelete}
        loading={loading}
        title="Xóa thể loại"
        message="Bạn có chắc chắn muốn xóa?"
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleDeleteCategory}
      />

      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </div>
  );
}
