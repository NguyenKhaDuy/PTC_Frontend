import { useEffect, useState } from "react";
import axios from "axios";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useToast } from "../../Components/Common/ToastProvider";

import BookingStatsCards from "../../Components/Admin/BookingStatsCards";
import BookingFilter from "../../Components/Admin/BookingFilter";
import BookingTable from "../../Components/Admin/BookingTable";
import BookingPagination from "../../Components/Admin/BookingPagination";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    totalBills: 0,
    paidBills: 0,
    totalAmount: 0,
  });

  const { showToast } = useToast();
  const token = localStorage.getItem("token");

  const fetchBills = async (pageNo = 1) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/admin/bills?pageNo=${pageNo}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const data = res.data;

      const mapped = data.data.map((bill) => ({
        id: bill.idBill,
        customerName: bill.customerName || "N/A",
        phoneCustomer: bill.phoneCustomer || "N/A",
        movie: bill.scheduleDTO?.movieDTO?.nameMovie || "N/A",
        branch: bill.branchDTO?.nameBranch || "N/A",
        room: bill.ticketDTO?.seatDTOS?.[0]?.nameRoom || "N/A",
        seats: bill.ticketDTO?.seatDTOS
          ? bill.ticketDTO.seatDTOS.map((s) => s.name).join(", ")
          : "",
        total: bill.totalAmount || 0,
        status: bill.status,
      }));

      setBookings(mapped);
      setTotalPage(data.total_page);
      setPage(data.current_page);

      setStats({
        totalBills: data.data.length,
        paidBills: data.data.filter((b) => b.status === "PAIDED").length,
        totalAmount: data.data.reduce(
          (sum, b) => sum + (b.totalAmount || 0),
          0,
        ),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills(page);
  }, [page]);

  const filteredBookings = bookings.filter((b) => {
    const k = search.toLowerCase();
    return (
      b.id?.toLowerCase().includes(k) ||
      b.movie?.toLowerCase().includes(k) ||
      b.branch?.toLowerCase().includes(k) ||
      b.customerName?.toLowerCase().includes(k) ||
      b.phoneCustomer?.toLowerCase().includes(k)
    );
  });

  return (
    <div className="space-y-7">
      <BookingStatsCards stats={stats} />

      <BookingFilter search={search} setSearch={setSearch} />

      <BookingTable bookings={filteredBookings} />

      <BookingPagination page={page} totalPage={totalPage} setPage={setPage} />

      {loading && <GlobalLoading open text="Đang xử lý..." />}
    </div>
  );
}
