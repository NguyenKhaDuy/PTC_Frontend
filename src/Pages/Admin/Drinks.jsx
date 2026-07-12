import { useEffect, useState } from "react";
import axios from "axios";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useToast } from "../../Components/Common/ToastProvider";
import DrinkModal from "../../Components/Admin/DrinkModal";
import DrinkSizeModal from "../../Components/Admin/DrinkSizeModal";
import ConfirmDeleteModal from "../../Components/Admin/ConfirmDeleteModal";
import DrinkHeader from "../../Components/Admin/DrinkHeader";
import DrinkStats from "../../Components/Admin/DrinkStats";
import DrinkTable from "../../Components/Admin/DrinkTable";
import DrinkPagination from "../../Components/Admin/DrinkPagination";


export default function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [openDrinkModal, setOpenDrinkModal] = useState(false);
  const [editingDrink, setEditingDrink] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [editingSize, setEditingSize] = useState(false);
  const [openDeleteSizeModal, setOpenDeleteSizeModal] = useState(false);
  const [deletingSize, setDeletingSize] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openSizeModal, setOpenSizeModal] = useState(false);
  const [openDeleteDrinkModal, setOpenDeleteDrinkModal] = useState(false);
  const [deletingDrink, setDeletingDrink] = useState(null);
  const [deleteDrinkLoading, setDeleteDrinkLoading] = useState(false);

  const [sizeForm, setSizeForm] = useState({
    idDrink: null,
    idSize: "",
    price: "",
  });

  const [drinkForm, setDrinkForm] = useState({
    idDrink: null,
    drinkName: "",
  });

  const { showToast } = useToast();

  const fetchDrinks = async (pageNo = 1) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/admin/drink?pageNo=${pageNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setDrinks(res.data.data);
      setTotalPage(res.data.total_page);
      setPage(res.data.current_page);
    } catch (err) {
      console.log(err);

      showToast(
        err.response?.data?.message || "Không thể tải danh sách nước uống",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrinks(1);
  }, []);

  const handleAdd = () => {
    setEditingDrink(null);

    setDrinkForm({
      idDrink: null,
      drinkName: "",
    });

    setOpenDrinkModal(true);
  };

  const handleEdit = (drink) => {
    setEditingDrink(drink);

    setDrinkForm({
      idDrink: drink.idDrink,
      drinkName: drink.name,
    });

    setOpenDrinkModal(true);
  };

  const handleSubmitDrink = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (editingDrink) {
        await axios.put("http://localhost:3000/api/admin/drink", drinkForm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showToast("Cập nhật thành công", "success");
      } else {
        await axios.post("http://localhost:3000/api/admin/drink", drinkForm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showToast("Thêm thành công", "success");
      }

      setOpenDrinkModal(false);

      fetchDrinks(page);
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
    fetchDrinks(1);
    fetchSizes();
  }, []);

  const handleAddSize = (drink) => {
    setEditingSize(false);

    setSizeForm({
      idDrink: drink.idDrink,
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
        idDrink: Number(sizeForm.idDrink),
        idSize: Number(sizeForm.idSize),
        price: Number(sizeForm.price),
      };

      if (editingSize) {
        await axios.put("http://localhost:3000/api/admin/drink/size", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showToast("Cập nhật size thành công", "success");
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/admin/drink/size",
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);

        if (res.status === 200) {
          showToast("Thêm size thành công", "success");
        } else {
          showToast("Thêm size thất bại", "error");
        }
      }

      setOpenSizeModal(false);
      fetchDrinks(page);
    } catch (err) {
      showToast(err.response?.data?.message || "Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSize = (drink, size) => {
    setEditingSize(true);

    setSizeForm({
      idDrink: drink.idDrink,
      idSize: size.idSize,
      price: size.price,
    });

    setOpenSizeModal(true);
  };

  const handleDeleteSize = (drink, size) => {
    setDeletingSize({
      idDrink: drink.idDrink,
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

      await axios.delete("http://localhost:3000/api/admin/drink/size", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          idDrink: deletingSize.idDrink,
          idSize: deletingSize.idSize,
        },
      });

      showToast("Xóa size thành công", "success");

      setOpenDeleteSizeModal(false);
      setDeletingSize(null);

      fetchDrinks(page);
    } catch (err) {
      showToast(err.response?.data?.message || "Không thể xóa size", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteDrink = (drink) => {
    setDeletingDrink(drink);
    setOpenDeleteDrinkModal(true);
  };

  const confirmDeleteDrink = async () => {
    if (!deletingDrink) return;

    try {
      setDeleteDrinkLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://localhost:3000/api/admin/drink/id-drink=${deletingDrink.idDrink}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        showToast("Xóa nước uống thành công", "success");

        setOpenDeleteDrinkModal(false);
        setDeletingDrink(null);

        fetchDrinks(page);
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || "Không thể xóa nước uống",
        "error",
      );
    } finally {
      setDeleteDrinkLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <DrinkHeader onAdd={handleAdd} />

      <DrinkStats drinks={drinks} />

      <DrinkTable
        drinks={drinks}
        onEdit={handleEdit}
        onDelete={handleDeleteDrink}
        onEditSize={handleEditSize}
        onDeleteSize={handleDeleteSize}
        onAddSize={handleAddSize}
      />

      <DrinkPagination
        page={page}
        totalPage={totalPage}
        onChange={fetchDrinks}
      />

      <DrinkModal
        open={openDrinkModal}
        onClose={() => setOpenDrinkModal(false)}
        form={drinkForm}
        setForm={setDrinkForm}
        onSubmit={handleSubmitDrink}
        editing={editingDrink}
      />

      <DrinkSizeModal
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
        open={openDeleteDrinkModal}
        title="Xóa nước uống"
        message={
          deletingDrink
            ? `Bạn có chắc muốn xóa nước uống "${deletingDrink.name}" không?`
            : ""
        }
        loading={deleteDrinkLoading}
        onCancel={() => {
          setOpenDeleteDrinkModal(false);
          setDeletingDrink(null);
        }}
        onConfirm={confirmDeleteDrink}
      />

      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </div>
  );
}
