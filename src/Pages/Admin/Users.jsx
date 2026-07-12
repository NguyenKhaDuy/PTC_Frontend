import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  Filter,
  Eye,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  Shield,
  UserX,
} from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchUsers = async (pageNo = 1) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/admin/users?pageNo=${pageNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = res.data;

      const mapped = data.data.map((u) => {
        const dob = u.dob ? `${u.dob[2]}/${u.dob[1]}/${u.dob[0]}` : "";

        return {
          id: u.idUser,
          name: u.fullName,
          email: u.email,
          phone: u.phone,
          role: u.roles?.[0] || "USER",
          status: "ACTIVE", // backend bạn chưa có status thì tạm fix
          avatar: u.avatar
            ? `data:image/png;base64,${u.avatar}`
            : "https://i.pravatar.cc/150",
          created: dob,
        };
      });

      setUsers(mapped);
      setTotalPage(data.total_page || 1);
      setPage(data.current_page || pageNo);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const filteredUsers = users.filter((u) => {
    const k = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(k) ||
      u.email?.toLowerCase().includes(k) ||
      u.phone?.toLowerCase().includes(k)
    );
  });

  return (
    <div className="space-y-7">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
          <p className="text-gray-400 mt-1">
            Quản lý tài khoản trong hệ thống.
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-[#181818] p-5 rounded-2xl border border-[#2d2d2d]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm tên hoặc email..."
            className="w-full h-12 pl-11 pr-4 bg-[#101010] border border-[#2d2d2d] rounded-xl"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#202020]">
            <tr className="text-left">
              <th className="px-6 py-4">Người dùng</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Ngày sinh</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-[#2d2d2d] hover:bg-[#202020]"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.avatar}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-400">#{user.id}</p>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>
                <td>{user.phone}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.role === "ADMIN"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                    {user.status}
                  </span>
                </td>

                <td>{user.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end gap-2">
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-10 h-10 rounded-xl ${
              p === page ? "bg-[#AA7D36]" : "bg-[#202020] hover:bg-[#2b2b2b]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {loading && <div className="text-center text-gray-400">Loading...</div>}
    </div>
  );
}
