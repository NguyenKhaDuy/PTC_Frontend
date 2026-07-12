import { Plus, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useToast } from "../../Components/Common/ToastProvider";
import RoleModal from "../../Components/Admin/RoleModal";
import ConfirmDeleteModal from "../../Components/Admin/ConfirmDeleteModal";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [openDeleteRoleModal, setOpenDeleteRoleModal] = useState(false);
  const [deletingRole, setDeletingRole] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [roleForm, setRoleForm] = useState({
    idRole: null,
    role: "",
  });

  const fetchRoles = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/api/admin/role", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRoles(res.data.data);
    } catch (err) {
      console.log(err);

      showToast(
        err.response?.data?.message || "Không thể tải danh sách role",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAdd = () => {
    setEditingRole(null);

    setRoleForm({
      idRole: null,
      role: "",
    });

    setOpenRoleModal(true);
  };

  const handleEdit = (role) => {
    setEditingRole(role);

    setRoleForm({
      idRole: role.idRole,
      role: role.role,
    });

    setOpenRoleModal(true);
  };

  const handleSubmitRole = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (editingRole) {
        await axios.put("http://localhost:3000/api/admin/role", roleForm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showToast("Cập nhật role thành công", "success");
      } else {
        await axios.post("http://localhost:3000/api/admin/role", roleForm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showToast("Thêm role thành công", "success");
      }

      setOpenRoleModal(false);

      fetchRoles();
    } catch (err) {
      showToast(err.response?.data?.message || "Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (role) => {
    setDeletingRole(role);
    setOpenDeleteRoleModal(true);
  };

  const confirmDeleteRole = async () => {
    if (!deletingRole) return;

    try {
      setDeleteLoading(true);

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/admin/role/id-role=${deletingRole.idRole}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Xóa role thành công", "success");

      setOpenDeleteRoleModal(false);
      setDeletingRole(null);

      fetchRoles();
    } catch (err) {
      showToast(err.response?.data?.message || "Không thể xóa role", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Role</h1>
          <p className="text-gray-400 mt-1">
            Phân quyền và quản lý vai trò người dùng.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-[#AA7D36] hover:bg-[#91682d] px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Thêm role
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
          <p className="text-gray-400">Tổng role</p>
          <h2 className="text-3xl font-bold mt-2">{roles.length}</h2>
        </div>

        <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
          <p className="text-gray-400">ADMIN</p>
          <h2 className="text-3xl font-bold text-red-400 mt-2">
            {roles.filter((r) => r.role === "ADMIN").length}
          </h2>
        </div>

        <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
          <p className="text-gray-400">STAFF</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {roles.filter((r) => r.role === "STAFF").length}
          </h2>
        </div>

        <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] p-5">
          <p className="text-gray-400">Tổng user có role</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {roles.filter((r) => r.role === "CUSTOMER").length}
          </h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#202020]">
            <tr>
              <th className="py-4 px-5 text-left">Role</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role) => (
              <tr
                key={role.idRole}
                className="border-t border-[#2d2d2d] hover:bg-[#202020]"
              >
                <td className="py-5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#AA7D36]/20 flex items-center justify-center">
                      <ShieldCheck className="text-[#AA7D36]" size={20} />
                    </div>

                    <div>
                      <div className="font-semibold">{role.role}</div>
                      <div className="text-sm text-gray-500">
                        ID #{role.idRole}
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
                      onClick={() => handleEdit(role)}
                      className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(role)}
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

      <RoleModal
        open={openRoleModal}
        onClose={() => setOpenRoleModal(false)}
        form={roleForm}
        setForm={setRoleForm}
        editing={editingRole}
        onSubmit={handleSubmitRole}
      />

      <ConfirmDeleteModal
        open={openDeleteRoleModal}
        title="Xóa role"
        message={
          deletingRole
            ? `Bạn có chắc muốn xóa role "${deletingRole.role}" không?`
            : ""
        }
        loading={deleteLoading}
        onCancel={() => {
          setOpenDeleteRoleModal(false);
          setDeletingRole(null);
        }}
        onConfirm={confirmDeleteRole}
      />

      {loading && <GlobalLoading open={loading} text="Đang tải..." />}
    </div>
  );
}
