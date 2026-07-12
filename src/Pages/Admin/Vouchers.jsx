import { useEffect, useState } from "react";
import axios from "axios";

import VoucherHeader from "../../Components/Admin/VoucherHeader";
import VoucherTable from "../../Components/Admin/VoucherTable";
import VoucherPagination from "../../Components/Admin/VoucherPagination";
import VoucherModal from "../../Components/Admin/VoucherModal";
import ConfirmDeleteModal from "../../Components/Admin/ConfirmDeleteModal";

import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useToast } from "../../Components/Common/ToastProvider";

export default function Vouchers() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit
  const [selected, setSelected] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [voucherDelete, setVoucherDelete] = useState(null);

  const token = localStorage.getItem("token");

  const fetchVouchers = async (pageNo = 1) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/admin/voucher?pageNo=${pageNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = res.data;

      const mapped = data.data.map((v) => {
        const createdAt = v.createdAt
          ? `${v.createdAt[2]}/${v.createdAt[1]}/${v.createdAt[0]}`
          : "";

        const expiration = v.expiration
          ? `${v.expiration[2]}/${v.expiration[1]}/${v.expiration[0]}`
          : "";

        return {
          id: v.idVoucher,
          code: v.code,
          discount: v.discount,
          quality: v.quality,

          createdAt,
          expiration,

          // backend chưa có => tạm giả
          status: v.quality > 0 ? "Hoạt động" : "Khóa",
          type: "PERCENT", // hoặc FIXED nếu backend bạn có logic khác
        };
      });

      setVouchers(mapped);
      setTotalPage(data.total_page || 1);
      setPage(data.current_page || pageNo);
    } catch (err) {
      console.error("Fetch vouchers error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers(page);
  }, [page]);

  const handleAdd = () => {
    setMode("create");
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (voucher) => {
    setMode("edit");

    setSelected({
      ...voucher,
      expiration: convertToInputDate(voucher.expiration),
    });

    setOpen(true);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const url = "http://localhost:3000/api/admin/voucher";
      const method = mode === "create" ? "post" : "put";

      // Nếu update thì thêm idVoucher
      const payload =
        mode === "edit"
          ? {
              ...formData,
              idVoucher: selected.id,
            }
          : formData;

      const res = await axios({
        method,
        url,
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        showToast(
          mode === "create"
            ? "Thêm voucher thành công"
            : "Cập nhật voucher thành công",
          "success",
        );

        setOpen(false);
        fetchVouchers(page);
      } else {
        showToast(res.data?.message || "Thao tác thất bại", "error");
      }
    } catch (err) {
      console.error(err);
      showToast(err?.response?.data?.message || "Lỗi server", "error");
    } finally {
      setLoading(false);
    }
  };

  const convertToInputDate = (date) => {
    if (!date) return "";

    const [day, month, year] = date.split("/");

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const handleDeleteClick = (voucher) => {
    setVoucherDelete(voucher);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!voucherDelete) return;

    try {
      setDeleteLoading(true);

      const res = await axios.delete(
        `http://localhost:3000/api/admin/voucher/id-voucher=${voucherDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast(res.data?.message || "Xóa voucher thành công", "success");

      setDeleteOpen(false);
      setVoucherDelete(null);

      // Nếu xóa hết dữ liệu trang hiện tại thì lùi về trang trước
      if (vouchers.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchVouchers(page);
      }
    } catch (err) {
      console.error(err);

      showToast(err.response?.data?.message || "Xóa voucher thất bại", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <VoucherHeader onAdd={handleAdd} />

      <VoucherTable
        vouchers={vouchers}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <VoucherPagination page={page} totalPage={totalPage} onChange={setPage} />

      {open && (
        <VoucherModal
          open={open}
          mode={mode}
          voucher={selected}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      <ConfirmDeleteModal
        open={deleteOpen}
        loading={deleteLoading}
        title="Xóa voucher"
        message={
          voucherDelete
            ? `Bạn có chắc muốn xóa voucher "${voucherDelete.code}" không?`
            : ""
        }
        onCancel={() => {
          if (!deleteLoading) {
            setDeleteOpen(false);
            setVoucherDelete(null);
          }
        }}
        onConfirm={handleDelete}
      />

      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </div>
  );
}
