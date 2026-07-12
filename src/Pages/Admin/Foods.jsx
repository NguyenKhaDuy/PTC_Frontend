import { Search, Filter, Plus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useToast } from "../../Components/Common/ToastProvider";
import ConfirmDeleteModal from "../../Components/Admin/ConfirmDeleteModal";
import FoodHeader from "../../Components/Admin/FoodHeader";
import FoodStats from "../../Components/Admin/FoodStats";
import FoodTable from "../../Components/Admin/FoodTable";
import FoodPagination from "../../Components/Admin/FoodPagination";
import FoodModal from "../../Components/Admin/FoodModal";
import FoodSizeModal from "../../Components/Admin/FoodSizeModal";

export default function Foods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [openFoodModal, setOpenFoodModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [editingSize, setEditingSize] = useState(false);
  const [openDeleteSizeModal, setOpenDeleteSizeModal] = useState(false);
  const [deletingSize, setDeletingSize] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openSizeModal, setOpenSizeModal] = useState(false);
  const [openDeleteFoodModal, setOpenDeleteFoodModal] = useState(false);
  const [deletingFood, setDeletingFood] = useState(null);
  const [deleteFoodLoading, setDeleteFoodLoading] = useState(false);

  const [sizeForm, setSizeForm] = useState({
    idFood: null,
    idSize: "",
    price: "",
  });

  const [foodForm, setFoodForm] = useState({
    idFood: null,
    foodName: "",
  });

  const { showToast } = useToast();

  const fetchFoods = async (pageNo = 1) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/admin/food?pageNo=${pageNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFoods(res.data.data);
      setTotalPage(res.data.total_page);
      setPage(res.data.current_page);
    } catch (err) {
      console.log(err);

      showToast(
        err.response?.data?.message || "Không thể tải danh sách thức ăn",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods(1);
  }, []);

  const handleAdd = () => {
    setEditingFood(null);

    setFoodForm({
      idFood: null,
      foodName: "",
    });

    setOpenFoodModal(true);
  };

  const handleEdit = (food) => {
    setEditingFood(food);

    setFoodForm({
      idFood: food.idFood,
      foodName: food.name,
    });

    setOpenFoodModal(true);
  };

  const handleSubmitFood = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (editingFood) {
        await axios.put("http://localhost:3000/api/admin/food", foodForm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showToast("Cập nhật thành công", "success");
      } else {
        await axios.post("http://localhost:3000/api/admin/food", foodForm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showToast("Thêm thành công", "success");
      }

      setOpenFoodModal(false);

      fetchFoods(page);
    } catch (err) {
      showToast(err.response?.data?.message || "Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchSizes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/api/admin/size", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSizes(res.data.data);
    } catch (err) {
      showToast("Không thể tải danh sách size", "error");
    }
  };

  useEffect(() => {
    fetchFoods(1);
    fetchSizes();
  }, []);

  const handleAddSize = (food) => {
    setEditingSize(false);

    setSizeForm({
      idFood: food.idFood,
      idSize: "",
      price: "",
    });

    setOpenSizeModal(true);
  };

  const handleSubmitSize = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const body = {
        idFood: Number(sizeForm.idFood),
        idSize: Number(sizeForm.idSize),
        price: Number(sizeForm.price),
      };

      if (editingSize) {
        await axios.put("http://localhost:3000/api/admin/food/size", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showToast("Cập nhật size thành công", "success");
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/admin/food/size",
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.status === 200) {
          showToast("Thêm size thành công", "success");
        } else {
          showToast("Thêm size thất bại", "error");
        }
      }

      setOpenSizeModal(false);
      fetchFoods(page);
    } catch (err) {
      showToast(err.response?.data?.message || "Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSize = (food, size) => {
    setEditingSize(true);

    setSizeForm({
      idFood: food.idFood,
      idSize: size.idSize,
      price: size.price,
    });

    setOpenSizeModal(true);
  };

  const handleDeleteSize = (food, size) => {
    setDeletingSize({
      idFood: food.idFood,
      idSize: size.idSize,
      size: size.size,
    });

    setOpenDeleteSizeModal(true);
  };

  const confirmDeleteSize = async () => {
    if (!deletingSize) return;

    try {
      setDeleteLoading(true);

      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:3000/api/admin/food/size", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          idFood: deletingSize.idFood,
          idSize: deletingSize.idSize,
        },
      });

      showToast("Xóa size thành công", "success");

      setOpenDeleteSizeModal(false);
      setDeletingSize(null);

      fetchFoods(page);
    } catch (err) {
      showToast(err.response?.data?.message || "Không thể xóa size", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteFood = (food) => {
    setDeletingFood(food);
    setOpenDeleteFoodModal(true);
  };

  const confirmDeleteFood = async () => {
    if (!deletingFood) return;

    try {
      setDeleteFoodLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://localhost:3000/api/admin/food/id-food=${deletingFood.idFood}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        showToast("Xóa thức ăn thành công", "success");

        setOpenDeleteFoodModal(false);
        setDeletingFood(null);

        fetchFoods(page);
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || "Không thể xóa thức ăn",
        "error",
      );
    } finally {
      setDeleteFoodLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <FoodHeader onAdd={handleAdd} />

      {/* STATISTICS */}
      <FoodStats foods={foods} />

      <FoodTable
        foods={foods}
        onEdit={handleEdit}
        onDelete={handleDeleteFood}
        onEditSize={handleEditSize}
        onDeleteSize={handleDeleteSize}
        onAddSize={handleAddSize}
      />

      <FoodPagination page={page} totalPage={totalPage} onChange={fetchFoods} />

      <FoodModal
        open={openFoodModal}
        onClose={() => setOpenFoodModal(false)}
        form={foodForm}
        setForm={setFoodForm}
        onSubmit={handleSubmitFood}
        editing={editingFood}
      />

      <FoodSizeModal
        open={openSizeModal}
        onClose={() => setOpenSizeModal(false)}
        form={sizeForm}
        setForm={setSizeForm}
        sizes={sizes}
        onSubmit={handleSubmitSize}
        editing={editingSize}
      />

      <ConfirmDeleteModal
        open={openDeleteSizeModal}
        title="Xóa size nước uống"
        message={
          deletingSize
            ? `Bạn có chắc muốn xóa size "${deletingSize.size}" không?`
            : ""
        }
        loading={deleteLoading}
        onCancel={() => {
          setOpenDeleteSizeModal(false);
          setDeletingSize(null);
        }}
        onConfirm={confirmDeleteSize}
      />

      <ConfirmDeleteModal
        open={openDeleteFoodModal}
        title="Xóa nước uống"
        message={
          deletingFood
            ? `Bạn có chắc muốn xóa nước uống "${deletingFood.name}" không?`
            : ""
        }
        loading={deleteFoodLoading}
        onCancel={() => {
          setOpenDeleteFoodModal(false);
          setDeletingFood(null);
        }}
        onConfirm={confirmDeleteFood}
      />

      {loading && <GlobalLoading open={loading} text="Đang xử lí...." />}
    </div>
  );
}
